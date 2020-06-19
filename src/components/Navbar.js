import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SNav from '../styled_components/nav/SNav';
import SLinks from '../styled_components/nav/SLinks';
import SLink from '../styled_components/nav/SLink';
import SBrand from '../styled_components/nav/SBrand';
import SIcon from '../styled_components/nav/SIcon';

const desktopLinks = () => (
	<>
		<Link to="/">
			<SBrand>
				<SIcon src="/android-chrome-192x192.png"></SIcon>
				Headbands
			</SBrand>
		</Link>
		<SLinks>
			<li>
				<SLink to="/about#how-to-play">How-to-Play</SLink>
			</li>
			<li>
				<SLink to="/about">About</SLink>
			</li>
			<li>
				<SLink to="/contact">Contact</SLink>
			</li>
		</SLinks>
	</>
);

const mobileLinks = () => (
	<>
		<Link to="/">
			<SBrand>
				<SIcon src="/android-chrome-192x192.png"></SIcon>
			</SBrand>
		</Link>
		<SLinks>
			<li>
				<SLink to="/about">
					<i className="fas fa-question"></i>
				</SLink>
			</li>
			<li>
				<SLink to="/about#how-to-play">
					<i className="fab fa-leanpub"></i>
				</SLink>
			</li>
			<li>
				<SLink to="/contact">
					<i className="fas fa-envelope"></i>
				</SLink>
			</li>
		</SLinks>
	</>
);

const Navbar = () => {
	let [screenWidth, setScreenWidth] = useState(1024);

	useEffect(() => {
		updateWindowDimensions();
		window.addEventListener('resize', updateWindowDimensions);
		return () => {
			window.removeEventListener('resize', updateWindowDimensions);
		};
	});

	const updateWindowDimensions = () => setScreenWidth(window.innerWidth);

	return <SNav>{screenWidth > 768 ? desktopLinks() : mobileLinks()}</SNav>;
};

export default Navbar;
