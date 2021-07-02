import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import Sidebar from '../modules/layout/Sidebar'
import Header from '../modules/layout/Header'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`

const theme = {
  colors: {
    primary: '#004494',
    secondary: '#FFD617',
    white: '#FFFFFF',
  },
}

const Page = styled.div`
  display: flex;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fill-available;
`;
const Content = styled.div``;

export default function App({ Component, pageProps }: AppProps): ReactElement  {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Page>
          <Sidebar />
          <Container>
            <Header />
            <Content>
              {[0,0,0,0,0,0,0,0,0,0,0,0,0,0].map(n => <Component {...pageProps} />)}
            </Content>
          </Container>
        </Page>
      </ThemeProvider>
    </>
  )
}
