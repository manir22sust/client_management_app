import React from "react";
import { ClientList } from "./components/ClientList";
import "./styles/styles.css";

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Client Management App</h1>
      <ClientList />
    </div>
  );
};

export default App;
