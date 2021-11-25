import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "react-bootstrap";
import CanalEnSidebar from "./CanalEnSidebar";
import firebaseApp from "../../Firebase";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import Logo from "../layout/Logo";

const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

function Sidebar({ usuarioGlobal, setCanalActivo }) {
  const [listaCanales, setListaCanales] = useState([]);

  async function getCanales() {
    const canalesArr = [];
    const collectionRef = collection(firestore, "canales");
    const canalesCifrados = await getDocs(collectionRef);
    canalesCifrados.forEach((canalCifrado) => {
      canalesArr.push(canalCifrado.data());
    });

    setListaCanales(canalesArr);
  }

  function agregarCanal() {
    const nombreCanal = prompt("¿Cuál es el nombre del canal?");
    if (nombreCanal) {
      const docuRef = doc(firestore, `canales/${nombreCanal}`);
      setDoc(docuRef, {
        id: new Date().getTime(),
        nombre: nombreCanal,
      });

      getCanales();
    }
  }

  useEffect(() => {
    getCanales();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3> BRV </h3>
        <Logo />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <h4>Mensajes de usuarios</h4>
          </div>
          <Add className="sidebar__addChannel" onClick={agregarCanal} />
        </div>
        <div className="sidebar__channelsList">
          {listaCanales
            ? listaCanales.map((canal) => {
                return (
                  <div onClick={() => setCanalActivo(canal.nombre)}>
                    <CanalEnSidebar nombre={canal.nombre} id={canal.id} />
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar src={usuarioGlobal.photoURL} />
        <div className="sidebar__profileInfo">
          <span className="nombre_usuario">{usuarioGlobal.displayName}</span>
        </div>
        <div className="sidebar__profileIcons">
          <Button variant="danger" onClick={() => signOut(auth)}>
            <LogoutIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
