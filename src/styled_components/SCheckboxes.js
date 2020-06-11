import styled from 'styled-components';
import SInputGroup from './SInputGroup';

const SCheckboxes = styled(SInputGroup)`
	display: flex;
	flex-wrap: wrap;

	> div {
		display: flex;
		align-items: center;
		max-width: 45%;

		> * {
			display: flex;
			padding-right: 1rem;
		}
	}
`;

export default SCheckboxes;
