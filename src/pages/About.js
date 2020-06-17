import React from 'react';
import SPage from '../styled_components/layout/SPage';
import SHeading from '../styled_components/layout/SHeading';
import SCard from '../styled_components/layout/SCard';
import SBreak from '../styled_components/layout/SBreak';
import SPara from '../styled_components/layout/SPara';
import SInlineLink from '../styled_components/layout/SInlineLink';

const About = (props) => {
	return (
		<SPage>
			<SCard>
				<SHeading>About</SHeading>
				<SBreak></SBreak>
				<SPara>Content TBA</SPara>
			</SCard>
			<SCard>
				<SHeading id="how-to-play">How to Play</SHeading>
				<SBreak></SBreak>
				<SPara>
					Content TBA, but here's a link to
					<SInlineLink>start playing</SInlineLink> in the meantime
				</SPara>
			</SCard>
		</SPage>
	);
};

export default About;
