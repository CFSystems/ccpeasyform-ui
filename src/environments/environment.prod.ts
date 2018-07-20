export const environment = {
  production: true,
  envName: 'prod',
  apiUrl: 'http://easyform:8080/ccpeasyform-api',

  tokenWhitelistedDomains: [ /easyform:8080/ ],
  tokenBlacklistedRoutes: [/\/oauth\/token/]
};
