import React from 'react';
import SPage from '../styled_components/layout/SPage';
import SHeading from '../styled_components/layout/SHeading';
import SCard from '../styled_components/layout/SCard';
import SBreak from '../styled_components/layout/SBreak';
import SForm from '../styled_components/forms/SForm';
import SInputGroup from '../styled_components/forms/SInputGroup';
import SInput from '../styled_components/forms/SInput';
import Button from '../components/Button';
import SLabel from '../styled_components/forms/SLabel';
import STextArea from '../styled_components/forms/STextArea';

// @TODO: Hook up for netlify
const Contact = (props) => {
	return (
		<SPage>
			<SCard>
				<SHeading>Contact</SHeading>
				<SBreak></SBreak>
				<SForm>
					<SInputGroup>
						<SLabel>Email: </SLabel>
						<SInput
							type="email"
							defaultValue=""
							placeholder="Enter your email"
						/>
					</SInputGroup>
					<SInputGroup>
						<SLabel>Subject:</SLabel>
						<SInput type="text" defaultValue="" placeholder="Enter a subject" />
					</SInputGroup>
					<SInputGroup>
						<SLabel>Message:</SLabel>
						<STextArea defaultValue="" placeholder="Say hello!" />
					</SInputGroup>
					<Button type="submit" to="/" label="Submit"></Button>
				</SForm>
			</SCard>
		</SPage>
	);
};

export default Contact;
