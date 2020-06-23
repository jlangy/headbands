const express = require('express');
const socket = require('socket.io');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();
const server = app.listen(port, () => console.log(`listening on port ${port}`));
const io = socket(server);

const rooms = {};
const possibleCategories = [
	'Sports',
	'Music',
	'Movies',
	'Historical leaders',
	'TV characters',
	'Books',
	'Monuments or buildings'
];

app.use(express.static(path.join(__dirname, 'build')));

const endGame = (roomName) => {
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
};

const shiftNames = (players) => {
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
};

io.on('connection', (socket) => {
	// turnMode === false ? consecutive (normal) : concurrent (back and forth);
	socket.on('make room', ({ name, totalPlayers, useCategories, turnMode }) => {
		totalPlayers = Number(totalPlayers);
		if (rooms[name]) {
			return socket.emit('message', { type: 'name taken' });
		}

		const category = useCategories
			? possibleCategories[
					Math.floor(Math.random() * possibleCategories.length)
			  ]
			: null;

		socket.emit('message', {
			name,
			totalPlayers,
			useCategories,
			category,
			turnMode,
			type: 'room name ok'
		});
		rooms[name] = {
			name,
			host: socket.id,
			totalPlayers,
			playersJoined: 1,
			useCategories,
			category,
			turnMode,
			players: { [socket.id]: { nameToGuess: null, sentName: null } }
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
		const room = rooms[roomName];
		room.turn = 0;
		room.gameOn = false;
		room.category = room.useCategories
			? possibleCategories[
					Math.floor(Math.random() * possibleCategories.length)
			  ]
			: null;
		Object.keys(room.players).forEach((key) => {
			room.players[key] = {};
		});
		io.in(roomName).emit('message', { type: 'restart' });
	});

	socket.on('leave game', ({ roomName }) => {
		if (rooms[roomName] && rooms[roomName].host == socket.id) {
			socket.to(roomName).emit('message', { type: 'host disconnection' });
			endGame(roomName);
		} else {
			socket
				.to(roomName)
				.emit('message', { type: 'disconnection', id: socket.id });
			rooms[roomName].playersJoined -= 1;
		}
	});

	socket.on('media on', async ({ roomName, fromId }) => {
		const roomToJoin = rooms[roomName];
		if (roomToJoin && roomToJoin.playersJoined < roomToJoin.totalPlayers) {
			// 	const client = require('twilio')(process.env.acct_sid, process.env.auth_token);
			// const token = await client.tokens.create();
			const token = { iceServers: null };
			socket.to(roomName).emit('message', {
				type: 'joinRequest',
				roomName,
				fromId,
				iceServers: token.iceServers
			});
		}
	});

	socket.on('join room', ({ roomName, fromId }) => {
		const roomToJoin = rooms[roomName];
		if (roomToJoin && roomToJoin.playersJoined < roomToJoin.totalPlayers) {
			socket.emit('message', {
				name: roomName,
				host: roomToJoin.host,
				totalPlayers: roomToJoin.totalPlayers,
				playersJoined: roomToJoin.playersJoined + 1,
				useCategories: roomToJoin.useCategories,
				category: roomToJoin.category,
				turnMode: roomToJoin.turnMode,
				type: 'joining'
			});
			socket.join(roomName);
		} else {
			socket.emit('message', { type: 'room DNE' });
		}
	});

	socket.on('description', async ({ description, toId, fromId }) => {
		// const client = require('twilio')(process.env.acct_sid, process.env.auth_token);
		// const token = await client.tokens.create();
		const token = { iceServers: null };
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

	socket.on('setName', ({ nameToPass, roomName }) => {
		const room = rooms[roomName];
		room.players[socket.id].sentName = nameToPass;
		if (Object.values(room.players).every((val) => val.sentName)) {
			const shiftedNames = shiftNames(room.players);
			room.gameOn = true;
			io.in(roomName).emit('message', {
				type: 'give names',
				names: shiftedNames,
				turn: room.turnOrder[room.turn]
			});
		} else {
			io.in(roomName).emit('message', {
				type: 'update set names',
				totalNamesSet: Object.values(room.players).filter(
					(player) => player.sentName
				).length
			});
		}
	});

	socket.on('ready', ({ roomName, joinerId }) => {
		const room = rooms[roomName];
		//There will be n-1 answers from nth joiner, so add 1/n-1.
		room.playersJoined += 1 / Math.floor(room.playersJoined);
		room.players[joinerId] = room.players[joinerId] || {
			nameToGuess: null,
			sentName: null
		};
		if (Math.round(room.playersJoined) == room.totalPlayers) {
			//handle rejoining
			if (room.gameOn) {
				const shiftedNames = shiftNames(room.players);
				io.in(roomName).emit('message', {
					type: 'rejoin',
					turn: room.turnOrder[room.turn],
					names: shiftedNames,
					revealed: room.turnOrder.slice(0, room.turn)
				});
			} else {
				room.turn = 0;
				room.turnOrder = Object.keys(room.players);
				io.in(roomName).emit('message', {
					type: 'gameReady'
				});
			}
		}
	});

	socket.on('next turn', ({ roomName }) => {
		const room = rooms[roomName];
		//Last turn over check
		if (room.turn === room.turnOrder.length - 1) {
			room.turn = 0;
			return io.in(roomName).emit('message', {
				type: 'game end',
				revealed: room.turnOrder,
				turn: room.turnOrder[0]
			});
		}
		room.turn += 1;
		io.in(roomName).emit('message', {
			type: 'new turn',
			turn: room.turnOrder[room.turn],
			revealed: room.turnOrder.slice(0, room.turn)
		});
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'));
});
