import React from 'react';
import { Link } from 'react-router-dom';
import SPage from '../styled_components/SPage';
import SHeading from '../styled_components/SHeading';
import SCard from '../styled_components/SCard';
import SBreak from '../styled_components/SBreak';
import SPara from '../styled_components/SPara';
import styled from 'styled-components';

const SLink = styled(Link)`
	display: block;
	font-size: 1.25rem;
	font-weight: 300;
	text-decoration: none;
	font-family: 'Lobster', Georgia, Times, serif;
	display: inline;

	:hover {
		text-shadow: 1px 1px 1px rgba(150, 150, 150, 0.75);
	}
`;

const Instructions = (props) => {
	return (
		<SPage>
			<SCard>
				<SHeading>How to Play Headbands</SHeading>
				<SBreak></SBreak>
				<SPara>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
					praesentium quisquam facilis provident soluta ipsum, consequuntur
					reprehenderit maiores architecto laborum? And when you're ready to
					play? <SLink to="/">Click here!</SLink>
				</SPara>
			</SCard>
		</SPage>
	);
};

export default Instructions;
