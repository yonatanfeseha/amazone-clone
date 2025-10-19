import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "./Components/DataProvider/DataProvider.jsx";
import { reducer, initialState } from "./Utility/reducer.js";

createRoot(document.getElementById("root")).render(
  <DataProvider reducer={reducer} initialState={initialState}>
    <App />
  </DataProvider>
);
