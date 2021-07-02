import { FC, ReactElement } from "react"
import styled, { css, StyledComponentBase } from "styled-components";

interface CSSProperties {
  textAlign?: string,
  color?: string,
  fontSize?: string,
}

const CSS = css<CSSProperties>`
  ${props => props.textAlign ? css`text-align: ${props.textAlign};` : ''}
  ${props => css`color: ${props.color.startsWith('$') ? props.theme.colors[props.color.replace('$', '')] : props.color};`}
  ${props => props.fontSize && css`font-size: ${props.fontSize};`}
`

const Header = styled.h1`${CSS}`;
const Paragraph = styled.p`${CSS}`;
const Span = styled.span`${CSS}`;

const Text: FC<{
  type?: string
} & CSSProperties> = (props, { type = 'span' }): ReactElement => {
  let Selected: String & StyledComponentBase<"h1" | "p" | "span", any, {}, never>;
  switch (type) {
    case 'h1':
      Selected = Header;
      break;
    case 'p':
      Selected = Paragraph;
      break;
    default:
      Selected = Span;
      break;
  }
  return <Selected {...props} />
}

export default Text;
