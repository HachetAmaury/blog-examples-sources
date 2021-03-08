import React from "react";

import i18n from "./I18n";

export const DEFAULT_LANGUAGE = "fr";

export const I18nContext = React.createContext();

function useI18n() {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error(`useI18n must be used within a I18NProvider`);
  }
  return context;
}

function I18nProvider(props) {
  const [language, setLanguage] = React.useState(DEFAULT_LANGUAGE);

  const value = React.useMemo(() => [i18n[language], setLanguage], [language]);

  return <I18nContext.Provider value={value} {...props} />;
}

export { I18nProvider, useI18n };
