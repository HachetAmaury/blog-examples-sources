import React from "react";
import { useI18n } from "./I18nContext";

function Page() {
  const [i18n, setLanguage] = useI18n();

  return (
    <div>
      {`${i18n.currentLanguage}`}
      <button
        onClick={() => {
          setLanguage("fr");
        }}
      >
        Français
      </button>

      <button
        onClick={() => {
          setLanguage("en");
        }}
      >
        English
      </button>

      <button
        onClick={() => {
          setLanguage("de");
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
