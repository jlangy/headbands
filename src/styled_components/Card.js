import styled from 'styled-components';

const Card = styled.article`
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	transition: 0.3s;
	width: 30%;
	height: 50%;
	margin: 1.5rem;

	:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}
`;

export default Card;
