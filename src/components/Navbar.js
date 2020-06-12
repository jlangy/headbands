import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SNav = styled.nav`
	position: relative;
	top: 0;
	right: 0;
	left: 0;
	background: transparent;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2vh 5vw;
	height: 5vh;
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);

	> a:first-child {
		width: 30vw;
	}
`;

const SBrand = styled.span`
	max-height: 6vh;
	max-width: 40vw;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
	@media (max-width: 768px) {
		font-size: 1.25rem;
	}
`;

const SIcon = styled.img`
	height: 3rem;
	margin-right: 0.5rem;
`;

const SLinks = styled.ul`
	display: flex;
	justify-content: space-between;
	width: 50vw;

	@media (max-width: 768px) {
		width: 45vw;
	}
`;

const SLink = styled(Link)`
	display: block;
	font-size: 1.25rem;
	font-weight: 300;
	text-decoration: none;

	:hover {
		text-shadow: 1px 1px 1px rgba(150, 150, 150, 0.75);
	}

	@media (max-width: 768px) {
		font-size: 1.5rem;
	}
`;

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
				<SLink to="/instructions">How-to-Play</SLink>
			</li>
			<li>
				<SLink to="/donate">Donate</SLink>
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
				<SLink to="/instructions">
					<i className="fab fa-leanpub"></i>
				</SLink>
			</li>
			<li>
				<SLink to="/donate">
					<i class="fas fa-piggy-bank"></i>
				</SLink>
			</li>
			<li>
				<SLink to="/contact">
					<i class="fas fa-envelope"></i>
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
