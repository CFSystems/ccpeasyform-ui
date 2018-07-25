export const environmentHml = {
  production: true,
  envName: 'prod',
  apiUrl: 'https://ccpeasyform-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('ccpeasyform-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};

export const environmentProd = {
  production: true,
  envName: 'prod',
  apiUrl: 'http://easyform:8080/ccpeasyform-api',

  tokenWhitelistedDomains: [ new RegExp('easyform:8080') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};

export const environmentDev = {
  production: false,
  envName: 'dev',
  apiUrl: 'http://localhost:8080/ccpeasyform-api',

  tokenWhitelistedDomains: [ new RegExp('localhost:8080') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};