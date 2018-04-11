import { AUTH_TOKEN, SERVER_URL } from '../constants';

export const jwtModuleConfig = {
  tokenGetter: () => localStorage.getItem(AUTH_TOKEN),
  whitelistedDomains: [ 'localhost:3001' ],
  blacklistedRoutes: ['http://localhost:3001/admin/sign-in']
};
