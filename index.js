const express = require('express');
// require('dotenv').config();
const socket = require('socket.io');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();
const server = app.listen(port, () => console.log(`listening on port ${port}`));
const io = socket(server);

let rooms = {};

app.use(express.static(path.join(__dirname, 'build')));

function endGame(roomName) {
	delete rooms[roomName];
	io.of('/')
		.in(roomName)
		.clients((error, socketIds) => {
			if (error) throw error;
			socketIds.forEach(
				(socketId) =>
					io.sockets.sockets[socketId] &&
					io.sockets.sockets[socketId].leave(roomName)
			);
		});
}

function shiftNames(players) {
	Object.keys(players).forEach((id, i, keys) => {
		if (i === Object.keys(players).length - 1) {
			players[id].nameToGuess = players[keys[0]].sentName;
			players[id].receivedNameFrom = keys[0];
		} else {
			players[id].receivedNameFrom = keys[i + 1];
			players[id].nameToGuess = players[keys[i + 1]].sentName;
		}
	});
	return players;
}

io.on('connection', function (socket) {
	socket.on('make room', ({ name, totalPlayers, useCategories }) => {
		totalPlayers = Number(totalPlayers);
		if (rooms[name]) {
			return socket.emit('message', { type: 'name taken' });
		}
		socket.emit('message', { type: 'room name ok', name, totalPlayers });
		rooms[name] = {
			totalPlayers,
			name,
			playersJoined: 1,
			players: { [socket.id]: { nameToGuess: null, sentName: null } },
			host: socket.id
		};
		socket.join(name);
	});

	socket.on('disconnecting', () => {
		const roomName = Object.keys(socket.rooms).filter(
			(name) => name != socket.id
		)[0];
		if (rooms[roomName] && rooms[roomName].host == socket.id) {
			io.in(roomName).emit('message', { type: 'host disconnection' });
			endGame(roomName);
		} else if (rooms[roomName]) {
			io.in(roomName).emit('message', { type: 'disconnection', id: socket.id });
			rooms[roomName].playersJoined -= 1;
		}
	});

	socket.on('restart game', ({ roomName }) => {
		Object.keys(rooms[roomName].players).forEach((key) => {
			rooms[roomName].players[key] = {};
		});
		io.in(roomName).emit('message', { type: 'restart' });
	});

	socket.on('end game', ({ roomName }) => {
		endGame(roomName);
		socket.to(roomName).emit('message', { type: 'host disconnection' });
	});

	socket.on('xir test', () => {
		const roomName = Object.keys(socket.rooms).filter(
			(name) => name != socket.id
		)[0];
		console.log(Object.keys(io.sockets.adapter.rooms));
		console.log(rooms);
	});

	socket.on('join room', async ({ roomName, fromId }) => {
		let roomToJoin = rooms[roomName];
		if (roomToJoin && roomToJoin.playersJoined < roomToJoin.totalPlayers) {
			// const client = require('twilio')(process.env.acct_sid, process.env.auth_token);
			// const token = await client.tokens.create();
			const token = { iceServers: null }; //await client.tokens.create();
			socket.to(roomName).emit('message', {
				type: 'joinRequest',
				roomName,
				fromId,
				iceServers: token.iceServers
			});
			socket.emit('message', {
				type: 'joining',
				totalPlayers: roomToJoin.totalPlayers,
				playersJoined: roomToJoin.playersJoined + 1,
				name: roomName
			});
			socket.join(roomName);
		} else {
			socket.emit('message', { type: 'cannot join' });
		}
	});

	socket.on('description', async ({ description, toId, fromId }) => {
		// const client = require('twilio')(process.env.acct_sid, process.env.auth_token);
		// const token = await client.tokens.create();
		const token = { iceServers: null }; // await client.tokens.create();
		io.sockets.sockets[toId].emit('message', {
			type: 'offer',
			description,
			toId,
			fromId,
			iceServers: token.iceServers
		});
	});

	socket.on('answer', ({ answer, fromId, toId }) => {
		io.sockets.sockets[toId].emit('message', {
			type: 'answer',
			answer,
			fromId
		});
	});

	socket.on('iceCandidate', ({ candidate, fromId, toId }) => {
		io.sockets.sockets[toId].emit('message', {
			type: 'iceCandidate',
			candidate,
			fromId
		});
	});

	socket.on('setName', ({ nameToGuess, roomName }) => {
		rooms[roomName].players[socket.id].sentName = nameToGuess;
		if (Object.values(rooms[roomName].players).every((val) => val.sentName)) {
			const shiftedNames = shiftNames(rooms[roomName].players);
			io.in(roomName).emit('message', {
				type: 'give names',
				names: shiftedNames
			});
		} else {
			io.in(roomName).emit('message', {
				type: 'update set names',
				totalNamesSet: Object.values(rooms[roomName].players).filter(
					(player) => player.sentName
				).length
			});
		}
	});

	socket.on('ready', ({ roomName, joinerId }) => {
		const room = rooms[roomName];
		//There will be n-1 answers from nth joiner, so add 1/n-1.
		room.playersJoined += 1 / Math.floor(room.playersJoined);
		room.players[joinerId] = { nameToGuess: null, sentName: null };
		if (Math.round(room.playersJoined) == room.totalPlayers) {
			room.turn = 0;
			room.turnOrder = Object.keys(room.players);
			io.in(roomName).emit('message', {
				type: 'gameReady',
				turn: room.turnOrder[room.turn]
			});
		}
	});

	socket.on('next turn', ({ roomName }) => {
		const room = rooms[roomName];
		room.turn = room.turn == room.totalPlayers - 1 ? 0 : room.turn + 1;
		io.in(roomName).emit('message', {
			type: 'new turn',
			turn: room.turnOrder[room.turn]
		});
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'));
});
