import styled from 'styled-components';

const SNameInputGroup = styled.div`
	font-family: 'Cabin', Helvetica, Arial, sans-serif;
	display: flex;
	flex-direction: row;
	width: 90%;
	margin: 1rem auto;
	justify-content: space-between;
	align-items: center;

	> button {
		margin: 0;
	}

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}
`;

export default SNameInputGroup;
