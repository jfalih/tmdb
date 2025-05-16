import {Route} from '../route';

export const serverRedirect = (path: Route) => ({
  redirect: {
    permanent: false,
    destination: path,
  },
});

export default serverRedirect;
