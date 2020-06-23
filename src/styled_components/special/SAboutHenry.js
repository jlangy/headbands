import styled from 'styled-components';

const SIcon = styled.img`
	max-width: 50%;
	position: absolute;
	bottom: -10%;
	right: -12%;
	overflow: hidden;

	@media (max-width: 490px) {
		right: 5%;
		bottom: -50px;
		max-width: none;
		width: 100px;
	}
`;

export default SIcon;
