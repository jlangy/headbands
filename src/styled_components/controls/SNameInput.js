import styled from 'styled-components';
import SInput from '../forms/SInput';

const SNameInput = styled(SInput)`
	padding: 0.5rem 2%;
	margin: 0;
	width: 45%;

	@media (max-width: 768px) {
		width: 96%;
		padding: 0.5rem 2%;
		margin: 1rem 0;
	}
`;

export default SNameInput;
