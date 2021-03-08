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
