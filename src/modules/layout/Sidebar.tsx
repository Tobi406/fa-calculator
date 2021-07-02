import { FC, ReactElement } from "react";
import styled from "styled-components";

const Container = styled.aside`
  width: 48px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  border-right: 2px solid ${({ theme }) => theme.colors.primary};
`;

const Sidebar: FC<{}> = (): ReactElement => {
  return <Container>

  </Container>
}

export default Sidebar;