import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import styled, { css } from "styled-components";

const Container = styled.aside<{
  sidebarOpen: boolean
}>`
  top: 0;
  z-index: 2;
  position: sticky;
  left: -100%;
  display: initial;

  width: 108px;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.white};
  border-right: 2px solid ${({ theme }) => theme.colors.primary};
  transition: left 1.5s;


  @media screen and (max-width: 960px) {
    position: absolute;
    transition: left .5s;

    ${props => props.sidebarOpen && css`
      left: 0;
    `}
  }
`;

const Sidebar: FC<{}> = (): ReactElement => {
  return <Container sidebarOpen={useSelector((state: RootState) => state.sidebar.sidebarOpen)}>
    {Array.from(Array(30).keys()).map(n => <p>{n}</p>)}
  </Container>
}

export default Sidebar;