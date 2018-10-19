module.exports = {
  translation: {
    // default / fallback language
    defaultLanguage: 'vi',
    localesPath: './static/locales/',

    // needed for serverside preload
    allLanguages: ['vi', 'en'],

    // optional settings needed for subpath (/de/page1) handling
    enableSubpaths: false,
    subpathsOnNonDefaultLanguageOnly: true, // only redirect to /lng/ if not default language
  },
};
