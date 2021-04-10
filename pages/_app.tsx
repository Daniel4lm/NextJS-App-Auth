import '@styles/globals.css';
import { Layout } from "@components/Layout";
import { AuthProvider, useAuth } from "@contexts/auth";

function MyApp({ Component, pageProps }) {

  return (
    <>
    <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </AuthProvider>      
    </>
  );
}

export default MyApp
