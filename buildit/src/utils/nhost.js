import nhost from "nhost-js-sdk";

const config = {
  base_url: "https://backend-e0bbb392.nhost.app",
  ssr: typeof windown === 'undefined'
};

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };