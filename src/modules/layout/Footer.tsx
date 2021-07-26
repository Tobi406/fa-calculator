import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import React, { FC, ReactElement } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  
  @media screen and (min-width: 960px) {
    position: sticky;
  }
`;

const Footer: FC<{}> = ({ children }): ReactElement => {
  return <Container>
    {children}
  </Container>
}

export default Footer;