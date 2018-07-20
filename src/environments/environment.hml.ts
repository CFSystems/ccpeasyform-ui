export const environment = {
    production: false,
    envName: 'hml',
    apiUrl: 'https://ccpeasyform-api.herokuapp.com/ccpeasyform-api',

    tokenWhitelistedDomains: [ /ccpeasyform-api.herokuapp.com/ ],
  tokenBlacklistedRoutes: [/\/oauth\/token/]
  };