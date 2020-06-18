import styled from 'styled-components';

// Contains video svg element
const SVideoLabelName = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  width: 50%;

  &:hover {
    overflow: visible;
    word-wrap: break-word;
  }

	* {
		color: #222;
		font-size: 1rem;
	}
`;

export default SVideoLabelName;
