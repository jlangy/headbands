import styled from 'styled-components';

const SCard = styled.article`
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: 0.3s;
	min-width: 40%;
	max-width: 70%;
	max-height: 70%;
	margin: 1.5rem;

	:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 768px) {
		width: 80%;
		height: auto;
		padding: 1rem;
	}
`;

export default SCard;
