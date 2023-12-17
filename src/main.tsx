import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import App from "./App.tsx";
import "./index.css";
import { Provider,rootStore } from "./hooks/RootStore";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider value={rootStore}>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
    </Provider>
  </React.StrictMode>
);