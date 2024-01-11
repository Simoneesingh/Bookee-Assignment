import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ShiftsProvider } from "./context/ShiftsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShiftsProvider>
      <App />
    </ShiftsProvider>
  </React.StrictMode>
);
