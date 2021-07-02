import { FC } from 'react';
import { ReactElement } from 'react';
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

const Home: FC<{}> = (): ReactElement => {
  return <Title>My page</Title>
}

export default Home;
