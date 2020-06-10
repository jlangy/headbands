import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import handleSocketMsg from './helpers/handleSocketMsg';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Game from './pages/Game';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Instructions from './pages/Instructions';

import './global_scss/App.scss';

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
			<Navbar></Navbar>
			<Switch>
				<Route path="/">
					<Landing socket={socket} />
				</Route>
				<Route path="/instructions">
					<Instructions />
				</Route>
				<Route path="/donate">
					<Donate />
				</Route>
				<Route path="/contact">
					<Contact />
				</Route>
				<Route path="/game">{game.gamePhase && <Game socket={socket} />}</Route>
			</Switch>
		</Router>
	);
};

const mapStateToProps = (state) => ({
	game: state.game
});

export default connect(mapStateToProps, null)(App);
