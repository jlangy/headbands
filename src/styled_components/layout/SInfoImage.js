import styled from 'styled-components';

const SInfoImage = styled.img`
  src: url(${props => props.src});
  float: right;
  width: 65%;
  margin-left: 20px;
  border: 1px solid #3ca7d2;

  @media (max-width: 480px) {
    float: unset;
    width: 100%;
    margin: 0;
	}
`;

export default SInfoImage;
