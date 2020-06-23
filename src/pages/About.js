import React from 'react';
import SPage from '../styled_components/layout/SPage';
import SHeading from '../styled_components/layout/SHeading';
import SCard from '../styled_components/layout/SCard';
import SBreak from '../styled_components/layout/SBreak';
import SSubheading from '../styled_components/layout/SSubheading';
import SPara from '../styled_components/layout/SPara';
import SInlineLink from '../styled_components/layout/SInlineLink';
import SInlineExternalLink from '../styled_components/layout/SInlineExternalLink';
import SInfoImage from '../styled_components/layout/SInfoImage';
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
				<SAboutHenry src="android-chrome-192x192.png" alt="henry"></SAboutHenry>
			</SCard>
			<SCard>
				<SHeading id="how-to-play">How to Play</SHeading>
				<SBreak></SBreak>
				<SSubheading>Creating a Game</SSubheading>
				<SPara>
					<SInfoImage src="img/creating.png" alt="creating a game" />
					To create a game, go to the main page, select your options from the
					create game menu, choose a name for the lobby, and press Create Game.
					Here you can choose whether or not to use pre-selected categories. If
					you do, you will be given a category to choose relevant names from.
					Once the game is created, all other players can join the game by
					entering the lobby name into the join game menu, and pressing Join
					Game. After all players have connected, you can begin selecting your
					names to pass.
				</SPara>
				<SSubheading>Selecting a Name</SSubheading>
				<SPara>
					<SInfoImage src="img/choose-name.png" alt="choose a name" />
					Once all players have joined, you will have a menu to select a name
					below the streams. Enter your name and click confirm. Once all players
					have selected their names the game will begin, with the host going
					first. Players will be able to see all other players names in a label
					on their stream, with their own blocked out. If you are using
					pre-selected categories make sure you choose a relevant name.
				</SPara>
				<SSubheading>Guessing Names</SSubheading>
				<SPara>
					<SInfoImage src="img/guessing.png" alt="guessing phase" />
					The player whose turn it is will have a blue highlight around their
					stream, and the Reveal button enabled. They can begin asking questions
					to the lobby, for example, "Am I a superhero?" Once the player has
					figured out their identity, or given up, they can press the reveal
					button to end their turn. Gameplay is intentionally free-form, make
					the rules around guessing as strict or relaxed as your group prefers.
				</SPara>
				<SSubheading>Ending Your Turn</SSubheading>
				<SPara>
					<SInfoImage src="img/reveal-backup.png" alt="ending your turn" />
					Once a player has revealed their name, their turn is complete. The
					streams of finished players will be greyed out to indicate this, and
					the next player can begin guessing.
				</SPara>
				<SSubheading>Game Over</SSubheading>
				<SPara>
					<SInfoImage src="img/end-game.png" alt="end of game" />
					The host of the game will have the option to restart or end the game
					at any time. If the players wish to play again after the game has
					finished, the host can click restart to go back to the choosing names
					phase.
				</SPara>
				<SSubheading>Ready to Play?</SSubheading>
				<SPara>
					Once you're semi-confident in the rules,{' '}
					<SInlineLink to="/">
						click here to create your first game!
					</SInlineLink>
				</SPara>
			</SCard>
		</SPage>
	);
};

export default About;
