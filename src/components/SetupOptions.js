import React, { useState } from 'react';
import { connect } from 'react-redux';
import turnOnLocalMedia from '../helpers/turnOnLocalMedia';
import SHeading from '../styled_components/layout/SHeading';
import SForm from '../styled_components/forms/SForm';
import SBreak from '../styled_components/layout/SBreak';
import SInputGroup from '../styled_components/forms/SInputGroup';
import SRadioButtons from '../styled_components/forms/SRadioButtons';
import SInput from '../styled_components/forms/SInput';
import Button from '../components/Button';
import SLabel from '../styled_components/forms/SLabel';
import SSelect from '../styled_components/forms/SSelect';
import addAlert from '../helpers/addAlert';

const SetupOptions = ({ socket, createStream, streams }) => {
	const [makeRoomName, setMakeRoomName] = useState('');
	const [numPlayers, setNumPlayers] = useState(2);
	const [useCategories, setUseCategories] = useState(false);
	const [turnMode, setTurnMode] = useState(false);

	const makeRoom = async (e) => {
		e.preventDefault();
		if (makeRoomName.trim().length > 0) {
			socket.emit('make room', {
				name: makeRoomName,
				totalPlayers: numPlayers,
				useCategories,
				turnMode
			});
			turnOnLocalMedia(streams, socket);
		} else {
			addAlert('Invalid lobby name');
		}
	};

	return (
		<>
			<SHeading>Create Game</SHeading>
			<SBreak></SBreak>
			<SForm>
				<SInputGroup>
					<SLabel htmlFor="players-number">Total Players: </SLabel>
					<SSelect
						id="players-number"
						onChange={(e) => setNumPlayers(Number(e.target.value))}
					>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						<option>6</option>
					</SSelect>
				</SInputGroup>
				<SRadioButtons>
					<SLabel>Pre-selected Categories: </SLabel>
					<div>
						<div>
							<input
								type="radio"
								id="no-categories"
								name="categories"
								value="no"
								defaultChecked
								onClick={(e) => setUseCategories(false)}
							/>
							<SLabel htmlFor="no-categories">No</SLabel>
						</div>

						<div>
							<input
								type="radio"
								id="categories"
								name="categories"
								value="yes"
								onClick={(e) => setUseCategories(true)}
							/>
							<SLabel htmlFor="categories">Yes</SLabel>
						</div>
					</div>
				</SRadioButtons>
				<SRadioButtons>
					<SLabel>Turn Mode: </SLabel>
					<div>
						<div>
							<input
								type="radio"
								id="consecutive"
								name="mode"
								value="consecutive"
								defaultChecked
								disabled
								onClick={(e) => setTurnMode(false)}
							/>
							<SLabel htmlFor="consecutive">Consecutive</SLabel>
						</div>

						<div>
							<input
								type="radio"
								id="concurrent"
								name="mode"
								value="concurrent"
								disabled
								onClick={(e) => setTurnMode(true)}
							/>
							<SLabel htmlFor="concurrent">Concurrent</SLabel>
						</div>
					</div>
				</SRadioButtons>
				<SInputGroup>
					<SLabel>Name of Lobby:</SLabel>
					<SInput
						type="text"
						onChange={(e) => {
							setMakeRoomName(e.target.value);
							window.roomName = e.target.value;
						}}
						placeholder="Enter a lobby name"
					/>
				</SInputGroup>
				<Button label={'Create Game'} onClick={makeRoom}></Button>
			</SForm>
		</>
	);
};

const mapStateToProps = (state) => ({
	streams: state.streams
});

export default connect(mapStateToProps)(SetupOptions);
