import { FC, ReactElement } from "react";
import styled from "styled-components";
import Text from "../../common/Text";

const Container = styled.header`
  display: flex;
  justify-content: center;
  height: 28px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

const Header: FC<{}> = (): ReactElement => {
  return <Container>
    <Text
      textAlign="center"
      color="$primary"
      fontSize="24px"
    >
      Eur-Reps
    </Text>
  </Container>
}

export default Header;