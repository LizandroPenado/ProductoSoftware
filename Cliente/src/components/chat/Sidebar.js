import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "react-bootstrap";
import { Tooltip } from "@material-ui/core";
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
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

function Sidebar({ usuarioGlobal, setCanalActivo }) {
  const cookies = new Cookies();
  const [listaCanales, setListaCanales] = useState([]);

  async function getCanales() {
    const canalesArr = [];
    const collectionRef = collection(firestore, "canales");
    const canalesCifrados = await getDocs(collectionRef);
    canalesCifrados.forEach((canalCifrado) => {
      if (canalCifrado.data().nombre === cookies.get("establecimiento")) {
        canalesArr.push(canalCifrado.data());
      }
    });
    setListaCanales(canalesArr);
  }

  function agregarCanal() {
    const nombreCanal = cookies.get("establecimiento");
    const docuRef = doc(firestore, `canales/${nombreCanal}`);
    setDoc(docuRef, {
      id: new Date().getTime(),
      nombre: nombreCanal,
    });
    getCanales();
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
        <div className="text-center pt-3 pb-3">
          <Tooltip
            title="Al crear la sala, debe seleccionarla"
            placement="top"
            arrow
          >
            <Button variant="success" onClick={agregarCanal}>
              <Add />
              Crear sala de chat
            </Button>
          </Tooltip>
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
          <Tooltip title="Cerrar chat"
            placement="top"
            arrow>
            <Link to="/">
              <Button variant="danger" onClick={() => signOut(auth)}>
                <LogoutIcon />
              </Button>
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
