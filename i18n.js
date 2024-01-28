module.exports = {
    locales: ["en"],
    defaultLocale: "en",
    pages: {
      "*": ["home", "common"],
      "/": ["home", "common"],
      "/login":["auth"],
      "/dashboard":["dashboard"],
      "/members":["members"],
      "/reports":["reports"],
      "/announcement":["announcement"],
      "/coach":["coach"],
      "/bookings":["bookings"],
      "/application":["members", "application"],
     
    },
    loadLocaleFrom: async (lang, ns) => {
      const translations = await import(`./public/locales/${lang}/${ns}.json`);
      return translations.default || translations;
    },
    
  }
  
