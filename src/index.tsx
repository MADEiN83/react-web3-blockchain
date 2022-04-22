import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/home";
import Player from "./pages/player";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Player />
  </React.StrictMode>
);
