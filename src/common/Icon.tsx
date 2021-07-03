import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from 'styled-components';

const Icon = styled(FontAwesomeIcon)<{
  margin?: string,
}>`
  align-self: center;
  ${props => props.margin && css`margin: ${props.margin};`}
`

export default Icon;