import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
	position: relative;
	top: 0;
	right: 0;
	left: 0;
	background: transparent;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2vh 5vw;

	> a:first-child {
		width: 30vw;
	}
`;

const StyledBrand = styled.span`
	max-height: 6vh;
	max-width: 40vw;
	font-size: 1.5rem;
`;

const StyledLinks = styled.ul`
	display: flex;
	justify-content: space-around;
	width: 50vw;
`;

const StyledLink = styled(Link)`
	display: block;
	text-transform: uppercase;
	font-size: 1.25rem;
	font-weight: 300;
	text-decoration: none;
	color: white;
`;

const Navbar = () => {
	return (
		<StyledNav>
			<Link to="/">
				<StyledBrand>
					Headbands <i class="fas fa-sticky-note"></i>
				</StyledBrand>
			</Link>
			<StyledLinks>
				<li>
					<StyledLink to="/instructions">How to Play</StyledLink>
				</li>
				<li>
					<StyledLink to="/donate">Donate</StyledLink>
				</li>
				<li>
					<StyledLink to="/contact">Contact</StyledLink>
				</li>
			</StyledLinks>
		</StyledNav>
	);
};

export default Navbar;
