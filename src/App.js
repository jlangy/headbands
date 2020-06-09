import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import handleSocketMsg from './helpers/handleSocketMsg';
import './App.scss';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Game from './pages/Game';

const App = ({ game }) => {
	const [socket, setSocket] = useState();

	useEffect(() => {
		//connection for local
		const socket = io.connect('http://localhost:3000');

		//connection for production
		// const socket = io.connect(window.location.hostname);

		socket.on('message', (msg) => {
			handleSocketMsg(msg, socket);
		});
		setSocket(socket);
	}, []);

	return (
		<Router>
			<div className="App">
				<Navbar></Navbar>
				{/* <button onClick={() => socket.emit('xir test')}>log rooms</button> */}
				<Switch>
					<Route path="/game">
						{game.gamePhase && <Game socket={socket} />}
					</Route>

					<Route path="/">
						<Landing socket={socket} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

const mapStateToProps = (state) => ({
	game: state.game
});

export default connect(mapStateToProps, null)(App);
