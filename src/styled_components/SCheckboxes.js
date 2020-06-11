import styled from 'styled-components';
import SInputGroup from './SInputGroup';

const SCheckboxes = styled(SInputGroup)`
	display: flex;
	flex-wrap: wrap;

	> div {
		display: flex;
		align-items: center;
		max-width: 45%;
		justify-content: space-between;

		> * {
			display: flex;
		}
	}
`;

export default SCheckboxes;
