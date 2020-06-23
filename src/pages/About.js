import React from 'react';
import SPage from '../styled_components/layout/SPage';
import SHeading from '../styled_components/layout/SHeading';
import SCard from '../styled_components/layout/SCard';
import SBreak from '../styled_components/layout/SBreak';
import SSubheading from '../styled_components/layout/SSubheading';
import SPara from '../styled_components/layout/SPara';
import SInlineLink from '../styled_components/layout/SInlineLink';
import SInlineExternalLink from '../styled_components/layout/SInlineExternalLink';
import SAboutHenry from '../styled_components/special/SAboutHenry';

const About = (props) => {
	return (
		<SPage>
			<SCard>
				<SHeading>About</SHeading>
				<SBreak></SBreak>
				<SSubheading>What is Headbands?</SSubheading>
				<SPara>
					Headbands is a really popular game you've probably played at work
					parties. You know where everyone writes a famous name on a sticky
					note, and puts it on someone else's head? Then they have to ask
					questions to figure out who they are? Sort of like{' '}
					<SInlineExternalLink href="https://www.youtube.com/watch?v=ePbipufCPYw">
						this
					</SInlineExternalLink>{' '}
					(although hopefully your workplace's version was a bit less
					offensive.)
				</SPara>
				<SSubheading>Why did you make an online version?</SSubheading>
				<SPara>
					Due to a virus outbreak, tons of people are working from home now. So
					we made this silly game so you can play it with eachother online and
					get some face time that isn't meeting-related. You can play Headbands
					with up to six players, either playing the guesser one at a time or
					all at once while taking turns to ask questions. Questions should
					preferably have yes-or-no answers but we don't enforce that so you're
					free to go rogue.
				</SPara>
				<SSubheading>Why is the logo an octopus?</SSubheading>
				<SPara>
					What do you call an octopus born with only six tentacles?{' '}
					<SInlineExternalLink href="https://en.wikipedia.org/wiki/Henry_the_Hexapus">
						Henry, apparently.
					</SInlineExternalLink>{' '}
					Since the name of the game is figuring out names and we limit it to
					six players, coming across Henry was a nice coincidence.
				</SPara>
				<SAboutHenry src="android-chrome-192x192.png"></SAboutHenry>
			</SCard>
			<SCard>
				<SHeading id="how-to-play">How to Play</SHeading>
				<SBreak></SBreak>
				<SPara>
					Content TBA, but here's a link to{' '}
					<SInlineLink to="/">start playing</SInlineLink> in the meantime
				</SPara>
			</SCard>
		</SPage>
	);
};

export default About;
