import styled from 'styled-components';

const SCard = styled.article`
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: 0.3s;
	width: 80%;
	max-width: 800px;
	max-height: 70%;
	margin: 2rem auto;
	padding: 1rem 0 2rem 0;
	background-color: white;
	position: relative;

	:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 768px) {
		width: 80%;
	}
`;

export default SCard;
