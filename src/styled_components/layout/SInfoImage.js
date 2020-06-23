import styled from 'styled-components';

const SInfoImage = styled.img`
  src: url(${props => props.src});
  float: right;
  width: 65%;
  margin-left: 20px;
  border: 1px solid #3ca7d2;
  min-width: 200px;
`;

export default SInfoImage;
