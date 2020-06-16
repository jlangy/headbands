import styled from 'styled-components';
import SInput from '../forms/SInput';

const SNameInput = styled(SInput)`
	padding: 0.5rem;
	margin: 0.5rem auto;
	flex-grow: 3;
	flex-basis: 50%;
	@media (max-width: 768px) {
		max-width: 100%;
		margin: 0.5rem auto;
	}
`;

export default SNameInput;
