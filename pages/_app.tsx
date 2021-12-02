import { ThemeProvider } from 'next-themes';
import { MdxComponentsProvider } from '../context/MdxComponents';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <MdxComponentsProvider>
        <Component {...pageProps} />
      </MdxComponentsProvider>
    </ThemeProvider>
  );
}

export default MyApp;
