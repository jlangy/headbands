import styled from 'styled-components';
import SInput from '../forms/SInput';

const SNameInput = styled(SInput)`
	padding: 0.5rem;
	margin-right: 0.5rem;
	width: 50%;

	@media (max-width: 768px) {
		width: 95%;
		padding: 0.5rem;
		margin: 1rem 0;
	}
`;

export default SNameInput;
