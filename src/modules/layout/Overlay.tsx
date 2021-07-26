import { FC } from "react";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { RootState, store } from '../../store';
import { change } from "./sidebarSlice";

const Container = styled.div<{
  sidebarOpen: boolean
}>`
  top: 0;
  left: 0;
  z-index: 75;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);

  ${props => props.sidebarOpen && css`
    position: fixed;
  `}
`;

const Overlay: FC<{}> = (): ReactElement => {
  const dispatch = useDispatch();

  return <Container
    sidebarOpen={useSelector((state: RootState) => state.sidebar.sidebarOpen)}
    onClick={() => dispatch(change())}
  />
}

export default Overlay;
