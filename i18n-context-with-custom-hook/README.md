# React, i18n & Context + Custom Hook

Theses are the sources of the previous post about React, i18n & Context API :

```js
// App.js

import { useState } from "react";

import "./App.css";

import { DEFAULT_LANGUAGE, I18nContext } from "./I18nContext";
import i18n from "./I18n";

import Page from "./Page";

function App() {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

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
```

```js
//I18n.js

const i18n = {
  en: {
    currentLanguage: "english",
    hello: "Hello",
    howAreYou: "How are you ?",
    whatsTheWeatherLike: "What's the weather like ?",
  },
  fr: {
    currentLanguage: "français",
    hello: "Bonjour",
    howAreYou: "Comment allez vous ?",
    whatsTheWeatherLike: "Quel temps fait-t-il ?",
  },
  de: {
    currentLanguage: "deutsch",
    hello: "Guten tag",
    howAreYou: "Wie geht es dir ?",
    whatsTheWeatherLike: "Wie ist das Wetter ?",
  },
};

export default i18n;
```

```js
// I18nContext.jsx

import React from "react";

export const DEFAULT_LANGUAGE = "fr";

export const I18nContext = React.createContext();
```

```js
// Page.jsx

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
        <li>{i18n.whatsTheWeatherLike}</li>
      </ul>
    </div>
  );
}

export default Page;
```

It works as intended but thanks to this [post](https://kentcdodds.com/blog/application-state-management-with-react) from Kent C. Dodds I realised using a custom hook for the context would significantly improve the readability of the code !

So let's do it !

- https://reactjs.org/docs/hooks-intro.html
- https://reactjs.org/docs/hooks-custom.html

Without the custom hook this is how the code was handled :

- I18N.js : Contains and exports the translations
- I18NContext.jsx : Creates and exports the I18NContext
- App.js : Create the Context Provider + allows the childs components to access the Context + handle the language change
- Page.js : Use the context

With the custom hook that's the goal :

- I18N.js : Contains and exports the translations
- I18NContext.jsx : Creates and exports the I18NContext, the provider and handle the language change
- App.js : Allows the childs components to access the Context
- Page.js : Use the context

So most of the logic is now centered in I18NContext.jsx, all the other files are just using the context

```js
// I18NContext.jsx

// BEFORE

import React from "react";

export const DEFAULT_LANGUAGE = "fr";

export const I18nContext = React.createContext();

// AFTER

import React from "react";

import i18n from "./I18n";

// DEFAULT_LANGUAGE moved here to centered here as much logic as possible
export const DEFAULT_LANGUAGE = "fr";

// Context creation
export const I18nContext = React.createContext();

// Custome hook
function useI18n() {
  const context = React.useContext(I18nContext);

  //  throw Error if useI18n is used outside of an I18NProvider
  if (!context) {
    throw new Error(`useI18n must be used within a I18NProvider`);
  }
  return context;
}

// Context Provider
function I18nProvider(props) {
  const [language, setLanguage] = React.useState(DEFAULT_LANGUAGE);

  // useMemo will only recompute the memoized value when one of the deps has changed.
  // => Only recompute if the language is changed
  const value = React.useMemo(() => [i18n[language], setLanguage], [language]);

  // value contains an array of the translated data and the function to set the language
  // this will allows us to call useI18n like a any other hook :
  //   const [i18n, setLanguage] = useI18n();
  return <I18nContext.Provider value={value} {...props} />;
}

export { I18nProvider, useI18n };
```

```js
// App.js

// BEFORE

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

// AFTER

// As few logic as possible, just
//   <I18nProvider>
//      <Page />
//  </I18nProvider>
// to allow Page to use "useI18n"

import "./App.css";

import { I18nProvider } from "./I18nContext";

import Page from "./Page";

function App() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  );
}

export default App;
```

```js
// Page.jsx

// BEFORE :

import { I18nContext } from "./I18nContext";

//(...)
const { i18n, changeLanguage } = useContext(I18nContext);
//(...)

// AFTER :

import { useI18n } from "./I18nContext";

//(...)
const [i18n, setLanguage] = useI18n();
//(...)
```

# FINAL SOURCES with custom Hook

```js
// App.js

import "./App.css";

import { I18nProvider } from "./I18nContext";

import Page from "./Page";

function App() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  );
}

export default App;
```

```js
//I18n.js

const i18n = {
  en: {
    currentLanguage: "english",
    hello: "Hello",
    howAreYou: "How are you ?",
    whatsTheWeatherLike: "What's the weather like ?",
  },
  fr: {
    currentLanguage: "français",
    hello: "Bonjour",
    howAreYou: "Comment allez vous ?",
    whatsTheWeatherLike: "Quel temps fait-t-il ?",
  },
  de: {
    currentLanguage: "deutsch",
    hello: "Guten tag",
    howAreYou: "Wie geht es dir ?",
    whatsTheWeatherLike: "Wie ist das Wetter ?",
  },
};

export default i18n;
```

```js
// I18nContext.jsx

import React from "react";

import i18n from "./I18n";

export const DEFAULT_LANGUAGE = "de";

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
```

```js
// Page.jsx

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
```
