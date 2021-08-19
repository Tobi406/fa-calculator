import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import Header from '../modules/layout/Header'
import { Provider } from 'react-redux'
import { store } from '../store';
import Overlay from 'src/modules/layout/Overlay'
import Footer from 'src/modules/layout/Footer'
import Head from 'next/head';

import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'styles.scss';


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`;

const theme = {
  // for some colours see:
  // https://ec.europa.eu/component-library/v1.14.2/ec/components/detail/ec-style-color/
  colors: {
    primaryDark: '#003776',
    primary: '#004494',
    primaryLight: '#7FA1C9',
    secondary: '#FFD617',
    white: '#FFFFFF',
  },
};

const Page = styled.div`
  display: flex;
  position: relative;
`;
const Container = styled.div`
  display: flex;
  flex: 1 1 85%;
  flex-direction: column;
  width: fill-available;
`;
const Content = styled.div``;

export default function App({ Component, pageProps }: AppProps): ReactElement  {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Calculate the current Federal Assembly composition"
        />
        <meta
          name="theme-color"
          content="#004494"
        />
        <meta
          name="keywords"
          content="Federal Assembly, Bundesversammlung, Calculator, Rechner"
        />
        <meta
          name="robots"
          content="noindex,follow"
        />
        <title>FA-Calculator</title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <GlobalStyle />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Overlay />
          <Page>
            {/*<Sidebar />*/}
            <Container>
              <Header />
              <Content>
                <Component {...pageProps} />
              </Content>
              <Footer>
                Made with &lt;3 (and apple juice) <br /> Deviations to be expected
              </Footer>
            </Container>
          </Page>
        </ThemeProvider>
      </Provider>
    </>
  )
}
