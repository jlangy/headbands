import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SNav from '../styled_components/nav/SNav';
import SLinks from '../styled_components/nav/SLinks';
import SLink from '../styled_components/nav/SLink';
import SBrand from '../styled_components/nav/SBrand';
import SIcon from '../styled_components/nav/SIcon';
import SHashLink from '../styled_components/forms/SHashLink';
import { connect } from 'react-redux';
import endGame from '../helpers/endGame';

const desktopLinks = (handleRedirect) => (
	<>
		<Link to="/" onClick={handleRedirect}>
			<SBrand>
				<SIcon src="/android-chrome-192x192.png"></SIcon>
				Headbands
			</SBrand>
		</Link>
		<SLinks>
			<li>
				<SHashLink to="/about#how-to-play" onClick={handleRedirect}>
					How-to-Play
				</SHashLink>
			</li>
			<li>
				<SLink to="/about" onClick={handleRedirect}>
					About
				</SLink>
			</li>
			<li>
				<SLink to="/contact" onClick={handleRedirect}>
					Contact
				</SLink>
			</li>
		</SLinks>
	</>
);

const mobileLinks = (handleRedirect) => (
	<>
		<Link to="/" onClick={handleRedirect}>
			<SBrand>
				<SIcon src="/android-chrome-192x192.png"></SIcon>
			</SBrand>
		</Link>
		<SLinks>
			<li>
				<SLink to="/about" onClick={handleRedirect}>
					<i className="fas fa-question"></i>
				</SLink>
			</li>
			<li>
				<SLink to="/about#how-to-play" onClick={handleRedirect}>
					<i className="fab fa-leanpub"></i>
				</SLink>
			</li>
			<li>
				<SLink to="/contact" onClick={handleRedirect}>
					<i className="fas fa-envelope"></i>
				</SLink>
			</li>
		</SLinks>
	</>
);

const Navbar = ({ game, streams, dispatch, socket }) => {
	let [screenWidth, setScreenWidth] = useState(1024);

	const handleRedirect = () => {
		try {
			const roomName = game.name;
			endGame(streams[socket.id].stream, dispatch);
			socket.emit('leave game', { roomName });
		} catch {}
	};

	useEffect(() => {
		updateWindowDimensions();
		window.addEventListener('resize', updateWindowDimensions);
		return () => {
			window.removeEventListener('resize', updateWindowDimensions);
		};
	});

	const updateWindowDimensions = () => setScreenWidth(window.innerWidth);

	return (
		<SNav>
			{screenWidth > 768
				? desktopLinks(handleRedirect)
				: mobileLinks(handleRedirect)}
		</SNav>
	);
};

const mapStateToProps = (state) => ({
	game: state.game,
	streams: state.streams
});

export default connect(mapStateToProps)(Navbar);
