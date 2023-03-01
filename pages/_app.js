import { CartProvider } from '../contexts';

import '../public/css/boxicons.min.css';
import '../public/css/style.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <CartProvider>
        <Component {...pageProps} />;
      </CartProvider>
    </>
  );
}
