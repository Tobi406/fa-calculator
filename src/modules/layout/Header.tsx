import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Icon from "../../common/Icon";
import Text from "../../common/Text";
import { RootState } from '../../store'
import { change } from './sidebarSlice'

const Container = styled.header`
  top: 0;
  z-index: 50;
  position: sticky;
  
  display: flex;
  justify-content: flex-start;

  height: 28px;

  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

const BarIcon = styled(Icon)`
  margin-right: 5px;

  @media screen and (min-width: 960px) {
    display: none;
  }
`

const Header: FC<{}> = (): ReactElement => {
  const sidebarOpen = useSelector((state: RootState) => state.sidebar.sidebarOpen)
  const dispatch = useDispatch()

  return <Container>
    <BarIcon icon={faBars} margin="0 0 0 5px" onClick={() => dispatch(change())} />
    <Text
      textAlign="center"
      color="$primary"
      fontSize="24px"
    >
      Federal Assembly Calculator
    </Text>
  </Container>
}

export default Header;