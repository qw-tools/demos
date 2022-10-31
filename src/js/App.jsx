import React from "react";
import { DemosPage } from "./Demos.jsx";
import "../styles/index.scss";

export const App = () => {
  return (
    <div className="app-container">
      <div className="app-body">
        <DemosPage />
      </div>
    </div>
  );
};

export default App;
