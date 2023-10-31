/** @type {import('next-i18next').UserConfig} */
// const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'default',
    locales: ['default', 'ja', 'pt', 'en'],
    localeDetection: false,
  },
  // localePath: path.resolve('./public/locales'),
  trailingSlash: true,
};
