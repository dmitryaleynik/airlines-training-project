import { AUTH_TOKEN } from '../constants';

export const jwtModuleConfig = {
  tokenGetter: () => localStorage.getItem(AUTH_TOKEN),
  whitelistedDomains: [ 'http://localhost:3001' ]
};
