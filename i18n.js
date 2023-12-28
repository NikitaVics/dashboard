module.exports = {
    locales: ["en"],
    defaultLocale: "en",
    pages: {
      "*": ["home", "common"],
      "/": ["home", "common"],
      "/login":["auth"]
     
    },
    loadLocaleFrom: async (lang, ns) => {
      const translations = await import(`./public/locales/${lang}/${ns}.json`);
      return translations.default || translations;
    },
    
  }
  