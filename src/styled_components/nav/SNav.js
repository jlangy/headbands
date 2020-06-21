import styled from 'styled-components';

const SNav = styled.nav`
	position: relative;
	top: 0;
	right: 0;
	left: 0;
	background: transparent;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2vh 5vw;
	height: 5vh;
	min-height: 4rem;
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);

	> a:first-child {
		width: 30vw;
	}
`;

export default SNav;
