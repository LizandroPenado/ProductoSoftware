import React, { useState } from "react";
import Login from "./Login";
import Sidebar from "./Sidebar";
import ChatScreen from "./ChatScreen";
import firebaseApp from "../../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./global.css";

const auth = getAuth(firebaseApp);

function Inicio() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
  const [canalActivo, setCanalActivo] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    //revisar si se inició o se cerró sesión
    if (usuarioFirebase) {
      setUsuarioGlobal(usuarioFirebase);
    } else {
      setUsuarioGlobal(null);
    }
  });

  return (
    <div className="app">
      {usuarioGlobal ? (
        <>
          {" "}
          <Sidebar
            usuarioGlobal={usuarioGlobal}
            setCanalActivo={setCanalActivo}
          />{" "}
          <ChatScreen canalActivo={canalActivo} usuario={usuarioGlobal} />{" "}
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default Inicio;
