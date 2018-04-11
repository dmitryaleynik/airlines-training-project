import { AUTH_TOKEN, SERVER_URL } from '../constants';

export const jwtModuleConfig = {
  tokenGetter: () => localStorage.getItem(AUTH_TOKEN),
  whitelistedDomains: [new URL(SERVER_URL).host],
  blacklistedRoutes: [`${SERVER_URL}/sign-in`],
};
