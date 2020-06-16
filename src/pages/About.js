import React from 'react';
// import { Link } from 'react-router-dom';
import SPage from '../styled_components/layout/SPage';
import SHeading from '../styled_components/layout/SHeading';
import SCard from '../styled_components/layout/SCard';
import SBreak from '../styled_components/layout/SBreak';
import SPara from '../styled_components/layout/SPara';
// import styled from 'styled-components';

// const SLink = styled(Link)`
// 	display: block;
// 	font-size: 1.25rem;
// 	font-weight: 300;
// 	text-decoration: none;
// 	font-family: 'Lobster', Georgia, Times, serif;
// 	display: inline;

// 	:hover {
// 		text-shadow: 1px 1px 1px rgba(150, 150, 150, 0.75);
// 	}
// `;

const About = (props) => {
	return (
		<SPage>
			<SCard>
				<SHeading>About</SHeading>
				<SBreak></SBreak>
				<SPara>
					Overview of the idea, maybe mention covid, explanation of octopus, put
					Henry behind the card with his eyes peeking over?
				</SPara>
			</SCard>
			<SCard>
				<SHeading id="how-to-play">How to Play</SHeading>
				<SBreak></SBreak>
				<SPara>Instructions (maybe with photos) here</SPara>
			</SCard>
		</SPage>
	);
};

export default About;
