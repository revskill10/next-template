module.exports = {
  translation: {
    // default / fallback language
    defaultLanguage: 'en',
    localesPath: './static/locales/',

    // needed for serverside preload
    allLanguages: ['en', 'vi'],

    // optional settings needed for subpath (/de/page1) handling
    enableSubpaths: false,
    subpathsOnNonDefaultLanguageOnly: true, // only redirect to /lng/ if not default language
  },
};
