module.exports = {
  locales: ["en"],
  defaultLocale: "en",
  pages: {
    "*": ["home", "common"],
    "/": ["home", "common"],
    "/login": ["auth"],
    "/dashboard": ["dashboard"],
    "/members": ["members"],
    "/reports": ["reports"],
    "/announcement": ["announcement"],
    "/application": ["application", "members"],
  },
  loadLocaleFrom: async (lang, ns) => {
    const translations = await import(`./public/locales/${lang}/${ns}.json`);
    return translations.default || translations;
  },
};
