export const environment = {
  production: true,
  envName: 'prod',
  apiUrl: 'http://easyform:8080/ccpeasyform-api',

  tokenWhitelistedDomains: [ new RegExp('easyform:8080') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
