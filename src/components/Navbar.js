import React from 'react';
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
`;

const SLinks = styled.ul`
	display: flex;
	justify-content: space-around;
	width: 50vw;
`;

const SLink = styled(Link)`
	display: block;
	font-size: 1.25rem;
	font-weight: 300;
	text-decoration: none;
`;

const Navbar = () => {
	return (
		<SNav>
			<Link to="/">
				<SBrand>
					Headbands <i className="fas fa-sticky-note"></i>
				</SBrand>
			</Link>
			<SLinks>
				<li>
					<SLink to="/instructions">How to Play</SLink>
				</li>
				<li>
					<SLink to="/donate">Donate</SLink>
				</li>
				<li>
					<SLink to="/contact">Contact</SLink>
				</li>
			</SLinks>
		</SNav>
	);
};

export default Navbar;
