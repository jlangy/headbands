import styled from 'styled-components';
import SInput from './SInput';

const SNameInput = styled(SInput)`
	padding: 0.5rem;
	margin: 0.5rem 0;
	flex-grow: 3;
	justify-content: space-around;
	align-items: center;

	@media (max-width: 768px) {
		max-width: 100%;
		margin: 0.5rem auto;
	}
`;

export default SNameInput;
