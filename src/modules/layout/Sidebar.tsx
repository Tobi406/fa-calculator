import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import styled, { css } from "styled-components";

const Container = styled.aside<{
  sidebarOpen: boolean
}>`
  flex: 1 1 15%;
  top: 0;
  z-index: 2;
  position: sticky;
  left: -100%;
  display: initial;
  overflow-y: auto;

  min-width: 108px;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.white};
  border-right: 2px solid ${({ theme }) => theme.colors.primary};
  transition: left 1.5s;

  &::-webkit-scrollbar {
    width: 6px;
    background-color: ${({ theme }) => theme.colors.white};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.white};
    border-radius: 20px;
  }


  @media screen and (max-width: 960px) {
    position: absolute;
    transition: left .5s;
    height: 100%;

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