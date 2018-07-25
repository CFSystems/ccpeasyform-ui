export const environment = {
  production: true,
  envName: 'prod',
  apiUrl: 'https://ccpeasyform-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('ccpeasyform-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};