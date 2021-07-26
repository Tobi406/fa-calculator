import styled from "styled-components";

const ColorDisplay = styled.div<{
  color: string,
}>`
  width: 12px;
  height: 12px;
  margin: 0 2px 0 0;
  background-color: ${props => props.color};
`;

export default ColorDisplay;
