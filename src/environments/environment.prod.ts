export const environment = {
  production: true,
  envName: 'prod',
  apiUrl: 'http://easyform.ccp.local:8080/ccpeasyform-api',

  tokenWhitelistedDomains: [ new RegExp('easyform.ccp.local:8080') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
