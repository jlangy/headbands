import styled from 'styled-components';

const SNameInputGroup = styled.fieldset`
	font-family: 'Cabin', Helvetica, Arial, sans-serif;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	width: 100%;
	margin: 1rem 0;
	justify-content: space-around;
	align-items: center;

	@media (max-width: 768px) {
		display: flex;
		justify-content: center;
	}
`;

export default SNameInputGroup;
