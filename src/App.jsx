import React, { useContext, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Landing from "./Pages/Landing/Landing";
import Routing from "./Router";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";
function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        // User is signed out
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="App">
      {/* <Landing /> */}
      <Routing />
    </div>
  );
}

export default App;
