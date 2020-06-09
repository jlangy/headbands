import styled from 'styled-components';

const Card = styled.main`
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	transition: 0.3s;

	:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}
`;

export default Card;
