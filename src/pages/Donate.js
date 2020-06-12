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

const Donate = (props) => {
	return (
		<SPage>
			<SCard>
				<SHeading>Donate</SHeading>
				<SBreak></SBreak>
				<SPara>
					We appreciate you coming to this page, but at this time no donations
					are needed. If enough people like the game we might pay for beefier
					servers but until then just have fun with it. Do feel free to send us
					any suggestions you have through our{' '}
					<SLink to="/contact">Contact</SLink> page though!
				</SPara>
			</SCard>
		</SPage>
	);
};

export default Donate;
