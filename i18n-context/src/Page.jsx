import React from "react";
import { useContext } from "react";

import { I18nContext } from "./I18nContext";

function Page() {
  const { i18n, changeLanguage } = useContext(I18nContext);

  return (
    <div>
      {`${i18n.currentLanguage}`}
      <button
        onClick={() => {
          changeLanguage("fr");
        }}
      >
        Français
      </button>

      <button
        onClick={() => {
          changeLanguage("en");
        }}
      >
        English
      </button>

      <button
        onClick={() => {
          changeLanguage("de");
        }}
      >
        Deutsch
      </button>
      <ul>
        <li>{i18n.hello}</li>
        <li>{i18n.howAreYou}</li>
        <li>{i18n.whatsTheweatherLike}</li>
      </ul>
    </div>
  );
}

export default Page;
