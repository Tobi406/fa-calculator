import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from 'styled-components';

const Icon = styled(FontAwesomeIcon)<{
  margin?: string,
  color?: string,
}>`
  align-self: center;
  ${props => props.margin && css`margin: ${props.margin};`}
  ${props => props.color && css`color: ${props.color.startsWith('$') ? props.theme.colors[props.color.replace('$', '')] : props.color};`}
`

export default Icon;