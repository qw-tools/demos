import React from "react";
import { RecentDemosPage } from "./features/RecentDemos/RecentDemos.jsx";
import { SiteHeader } from "./Site/SiteHeader.jsx";
import { SiteFooter } from "./Site/SiteFooter.jsx";
import "../styles/index.scss";

export const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <SiteHeader />

      <div className="bg-gray-100 border-b border-gray-300 flex flex-col grow">
        <div className="bg-white shadow border-b border-gray-300">
          <div className="container py-3 font-bold text-lg">
            <h1>Recent Demos</h1>
          </div>
        </div>

        <div className="container fadeIn grow">
          <RecentDemosPage />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default App;
