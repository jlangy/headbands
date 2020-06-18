import styled from 'styled-components';
import SInputGroup from './SInputGroup';

const SRadioButtons = styled(SInputGroup)`
	display: flex;
	flex-wrap: wrap;

	> div {
		display: flex;
		align-items: center;
		max-width: 90%;

		@media (max-width: 768px) {
			flex-direction: column;
			align-items: flex-start;
		}

		> * {
			display: flex;
			padding-right: 1rem;
		}
	}
`;

export default SRadioButtons;
