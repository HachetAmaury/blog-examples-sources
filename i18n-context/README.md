## React, i18n & Context

https://reactjs.org/docs/context.html

> "Context provides a way to pass data through the component tree without having to pass props down manually at every level."

Let's create an empty react application :

```bash
yarn create react-app react-i18n-context
```

Let's now create a file called I18N.js to store the translation data :

```javascript
// I18n.js

const i18n = {
  en: {
    currentLanguage: "english",
  },
  fr: {
    currentLanguage: "français",
  },
};

export default i18n;
```

And I18nContext.jsx for the Context

```javascript
// I18nContext.jsx

import React from "react";

export const DEFAULT_LANGUAGE = "fr";

export const I18nContext = React.createContext();
```

```javascript
//App.js
import { useState } from "react";

// ...

import { DEFAULT_LANGUAGE, I18nContext } from "./I18nContext";
import i18n from "./I18n";

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
      {/*...*/}
    </I18nContext.Provider>
  );
}

export default App;
```

Now every components inside I18nContext.Provider can access the i18n data

Let's try with a new component Page.jsx :

```javascript
// Page.jsx

import React from "react";

function Page() {
  return <div>This is a page component</div>;
}

export default Page;
```

Add the Page to the App :

```javascript
// App.jsx

// ...

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
```

Page is included, let's add I18nContext to it :

```javascript
//Page.jsx

import React from "react";
import { useContext } from "react";

import { I18nContext } from "./I18nContext";

function Page() {
  const { i18n } = useContext(I18nContext);

  return <div>{`${i18n.currentLanguageName}`}</div>;
}

export default Page;
```

In the browser we can see "english" since the default language in I18nContext.jsx is set to "en" :

```javascript
//I18nContext.jsx

export const DEFAULT_LANGUAGE = "en";
```

if you change it to "fr" :

```javascript
//I18nContext.jsx

export const DEFAULT_LANGUAGE = "fr";
```

After refreshing the browser, "français" should be displayed.

Let's add a button to change the language programmatically

```javascript
//Page.jsx

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
    </div>
  );
}

export default Page;
```

The page now contains "français", a button with "Français" and another with "English".

Clicking on English will automatically change the language of the app to english and "english" will be written instead of "français".

Let's add more transaltions to test it :

```javascript
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
};

export default i18n;
```

```javascript
//Page.jsx

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

Again, clicking on each button change the translations

To add a new language, all you have to do is change I18n.js and add a new entry :

```javascript
// I18n.js

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

New button added to Page.jsx :

```javascript
<button
  onClick={() => {
    changeLanguage("de");
  }}
>
  Deutsch
</button>
```

And voila !!! Another language !!!

How does this work ?

In Page.jsx, when you call :

```javascript
changeLanguage("de");
```

actually in App.js it calls setLanguage with "de" :

```javascript
//App.js

changeLanguage: (newLanguage) => {
   setLanguage(newLanguage); // <=  setLanguage("de")
},
```

and refresh i18n

```javascript
//App.js
i18n: i18n[language], // <= i18n["de"], load the new data
```

The next data are injected in the context and all the component using the context are refreshed

```javascript
// Page.jsx
<li>{i18n.hello}</li> // <= now contains the data in german
```

# FINAL SOURCES :

```js
// App.js

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

// I18nContext.jsx

import React from "react";

export const DEFAULT_LANGUAGE = "fr";

export const I18nContext = React.createContext();

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
