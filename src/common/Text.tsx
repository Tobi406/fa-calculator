import { FC, ReactElement } from "react"
import styled, { css, StyledComponentBase } from "styled-components";

interface CSSProperties {
  textAlign?: string,
  color?: string,
  fontSize?: string,
  margin?: string,
}

const CSS = css<CSSProperties>`
  ${props => props.textAlign ? css`text-align: ${props.textAlign};` : ''}
  ${props => props.color && css`color: ${props.color.startsWith('$') ? props.theme.colors[props.color.replace('$', '')] : props.color};`}
  ${props => props.fontSize && css`font-size: ${props.fontSize};`}
  ${props => props.margin && css`margin: ${props.margin};` || css`margin: 0;`}
`

const Header1 = styled.h1`${CSS}`;
const Header2 = styled.h2`${CSS}`;
const Header3 = styled.h3`${CSS}`;
const Header4 = styled.h4`${CSS}`;
const Paragraph = styled.p`${CSS}`;
const Span = styled.span`${CSS}`;

const Text: FC<{
  type?: string
} & CSSProperties> = (props): ReactElement => {
  let Selected: String & StyledComponentBase<"h1" | "h2" | "h3" | "h4" | "p" | "span", any, {}, never>;
  switch (props.type) {
    case 'h1':
      Selected = Header1;
      break;
    case 'h2':
      Selected = Header2;
      break;
    case 'h3':
      Selected = Header3;
      break;
    case 'h4':
      Selected = Header4;
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
