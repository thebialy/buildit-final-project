import { NhostAuthProvider, NhostApolloProvider } from "react-nhost";
import { auth } from "utils/nhost.js";
import 'styles/tailwind.css';
import 'styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <NhostAuthProvider auth={auth}>
    <NhostApolloProvider
      auth={auth}
      gqlEndpoint={`https://hasura-e0bbb392.nhost.app/v1/graphql`}
    >
      <Component {...pageProps} />  
    </NhostApolloProvider>
  </NhostAuthProvider>
  ) 
}

export default MyApp
