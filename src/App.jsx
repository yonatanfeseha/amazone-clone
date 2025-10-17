import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Landing from "./Pages/Landing/Landing";
import Routing from "./Router";

function App() {
  return (
    <div className="App">
      {/* <Landing /> */}
      <Routing />
    </div>
  );
}

export default App;
