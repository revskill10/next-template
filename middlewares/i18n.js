const path = require('path');
const express = require('express')
function initI18n() {
  const i18nextMiddleware = require('i18next-express-middleware')
  const Backend = require('i18next-node-fs-backend')
  const config = require('../modules/core/lib/i18n/config');
  const i18n = require('../modules/core/lib/i18n');
  const getAllNamespaces = require('../modules/core/lib/i18n/get-all-namespaces');
  const { localesPath, allLanguages, defaultLanguage } = config.translation;
  const serverSideOptions = {
    fallbackLng: defaultLanguage,
    preload: allLanguages, // preload all langages
    ns: getAllNamespaces(`${localesPath}${defaultLanguage}`), // need to preload all the namespaces
    backend: {
      loadPath: path.join(__dirname, '../static/locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '../static/locales/{{lng}}/{{ns}}.missing.json'),
    },
    detection: {
      caches: ['cookie', 'querystring'] // default: false
    },
  };
  return {i18n, Backend, i18nextMiddleware, serverSideOptions}
}

function i18nMiddleware({server, i18next}) {
  const {i18nextMiddleware, i18n} = i18next
  // enable middleware for i18next
  server.use(i18nextMiddleware.handle(i18n));

  // serve locales for client
  server.use('/locales', express.static(path.join(__dirname, '/locales')));

  // missing keys
  server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));
}

module.exports = {
  initI18n,
  i18nMiddleware,
}