const express = require('express');
// require('dotenv').config();
const socket = require('socket.io');
const path = require('path');
const axios = require('axios');
const port = process.env.PORT || 3000;

const app = express();
// const server = app.listen(port, '0.0.0.0', () => console.log(`listening on port ${port}`));
const server = app.listen(port, () => console.log(`listening on port ${port}`));
const io = socket(server);

let names = [];
let rooms = {};

app.use(express.static(path.join(__dirname, 'build')));

function endGame(roomName){
  delete rooms[roomName];
  io.of('/').in(roomName).clients((error, socketIds) => {
    if (error) throw error;
    socketIds.forEach(socketId => io.sockets.sockets[socketId] && io.sockets.sockets[socketId].leave(roomName));
  });
}

function shiftNames(names) {
	const shiftedNames = [];
	names.forEach((name, i) => {
		if (i === names.length - 1) {
			shiftedNames[0] = { toId: names[0].fromId, name: name.nameToGuess };
		} else {
			shiftedNames[i + 1] = {
				toId: names[i + 1].fromId,
				name: name.nameToGuess
			};
		}
	});
	return shiftedNames;
}

io.on('connection', function (socket) {

	socket.on('make room', ({ name, totalPlayers }) => {
		totalPlayers = Number(totalPlayers);
		if (rooms[name]) {
			return socket.emit('message', { type: 'name taken' });
		}
		socket.emit('message', { type: 'room name ok', name, totalPlayers });
		rooms[name] = {
			totalPlayers,
			name,
			playersJoined: 1,
			namesToGuess: [],
			host: socket.id
		};
		socket.join(name);
	});

	socket.on('disconnecting', () => {
    const roomName = Object.keys(socket.rooms).filter(name => name != socket.id)[0];
    if(rooms[roomName] && rooms[roomName].host == socket.id){
      io.in(roomName).emit('message', {type: 'host disconnection'});
      endGame(roomName);
    }
  });
  
  // socket.on('end game')

	socket.on('xir test', () => {
    const roomName = Object.keys(socket.rooms).filter(name => name != socket.id)[0];
    console.log(Object.keys(io.sockets.adapter.rooms))
    // console.log(`clients in room: ${Object.keys(io.sockets.clients(Object.keys(socket.rooms)[1]).sockets)}`)
	});

	socket.on('join room', async ({ roomName, fromId }) => {
		let roomToJoin = rooms[roomName];
		if (roomToJoin && roomToJoin.playersJoined < roomToJoin.totalPlayers) {
			const client = require('twilio')(process.env.acct_sid, process.env.auth_token);
			const token = await client.tokens.create();
			socket
				.to(roomName)
				.emit('message', {
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
		const client = require('twilio')(process.env.acct_sid, process.env.auth_token);
		const token = await client.tokens.create();
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
		// names.push({fromId: socket.id, name: msg.name});
		const namesToGuess = rooms[roomName].namesToGuess;
		namesToGuess.push({ fromId: socket.id, nameToGuess });
		if (namesToGuess.length === rooms[roomName].totalPlayers) {
			const shiftedNames = shiftNames(namesToGuess);
			io.in(roomName).emit('message', {
				type: 'give names',
				names: shiftedNames
			});
		} else {
			io.in(roomName).emit('message', {
				type: 'update set names',
				totalNamesSet: namesToGuess.length
			});
		}
	});

	socket.on('ready', (roomName) => {
		const room = rooms[roomName];
		//There will be n-1 answers from nth joiner, so add 1/n-1.
		room.playersJoined += 1 / Math.floor(room.playersJoined);
		if (Math.round(room.playersJoined) == room.totalPlayers) {
			io.in(roomName).emit('message', { type: 'gameReady' });
		}
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'));
});
