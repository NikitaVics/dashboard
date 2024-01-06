module.exports = {
    locales: ["en"],
    defaultLocale: "en",
    pages: {
      "*": ["home", "common"],
      "/": ["home", "common"],
      "/login":["auth"],
      "/dashboard":["dashboard"],
      "/bookings":["bookings"]
    },
    loadLocaleFrom: async (lang, ns) => {
      const translations = await import(`./public/locales/${lang}/${ns}.json`);
      return translations.default || translations;
    },
    
  }
  