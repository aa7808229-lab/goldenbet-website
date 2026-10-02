import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./styles.css";

export const LanguageContext = React.createContext(null);

function Root() {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("goldenbet-language") || "en"
  );

  useEffect(() => {
    localStorage.setItem("goldenbet-language", language);

    document.documentElement.lang = language;

    document.documentElement.dir = ["ku", "ar", "fa"].includes(language)
      ? "rtl"
      : "ltr";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
