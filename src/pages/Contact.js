import React from 'react';
import SPage from '../styled_components/SPage';
import SHeading from '../styled_components/SHeading';
import SCard from '../styled_components/SCard';
import SBreak from '../styled_components/SBreak';
import SForm from '../styled_components/SForm';
import SInputGroup from '../styled_components/SInputGroup';
import SInput from '../styled_components/SInput';
import SButton from '../styled_components/SButton';
import SLabel from '../styled_components/SLabel';
import STextArea from '../styled_components/STextArea';

const Contact = (props) => {
	return (
		<SPage>
			<SCard>
				<SHeading>Contact</SHeading>
				<SBreak></SBreak>
				<SForm>
					<SInputGroup>
						<SLabel>Email: </SLabel>
						<SInput type="email" value="" placeholder="Enter your email" />
					</SInputGroup>
					<SInputGroup>
						<SLabel>Subject:</SLabel>
						<SInput type="text" value="" placeholder="Enter a subject" />
					</SInputGroup>
					<SInputGroup>
						<SLabel>Message:</SLabel>
						<STextArea value="" placeholder="Say hello!" />
					</SInputGroup>
					<SButton type="submit" label="Submit"></SButton>
				</SForm>
			</SCard>
		</SPage>
	);
};

export default Contact;
