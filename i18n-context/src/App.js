import { useState } from "react";

import "./App.css";

import { DEFAULT_LANGUAGE, I18nContext } from "./I18nContext";
import i18n from "./I18n";

import Page from "./Page";

function App() {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  console.log();

  return (
    <I18nContext.Provider
      value={{
        i18n: i18n[language],
        changeLanguage: (newLanguage) => {
          setLanguage(newLanguage);
        },
      }}
    >
      <Page />
    </I18nContext.Provider>
  );
}

export default App;
