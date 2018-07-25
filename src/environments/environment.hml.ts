export const environment = {
  production: false,
  envName: 'hml',
  apiUrl: 'https://ccpeasyform-api.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('ccpeasyform-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};