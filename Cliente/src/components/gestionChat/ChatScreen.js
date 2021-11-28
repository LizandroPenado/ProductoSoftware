import React, { useState, useEffect, useRef } from "react";
import { Button, Row, Col } from "react-bootstrap";
import EncabezadoChat from "./EncabezadoChat";
import Mensaje from "./Mensaje";
import SendIcon from "@mui/icons-material/Send";
import firebaseApp from "../../Firebase";
import { Tooltip } from "@material-ui/core";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

function ChatScreen({ canalActivo, usuario }) {
  const [inputMensaje, setInputMensaje] = useState("");
  const [listaMensajes, setListaMensajes] = useState([]);

  const anchor = useRef();

  function filtrarContenido(textoOriginal) {
    const groserías = ["tonto", "hdp", "mk"];

    const array = textoOriginal.split(" ");
    array.forEach((palabra, index) => {
      if (groserías.includes(palabra)) {
        array[index] = "****";
      }
    });

    return array.join(" ");
  }

  function enviarMensaje(e) {
    e.preventDefault();
    const docuRef = doc(
      firestore,
      `canales/${canalActivo}/${new Date().getTime()}`
    );

    const mensajeFiltrado = filtrarContenido(inputMensaje);

    setDoc(docuRef, {
      foto: usuario.photoURL,
      usuario: usuario.displayName,
      mensaje: mensajeFiltrado,
      id: new Date().getTime(),
    });

    setInputMensaje("");
    getListaMensajes();
    anchor.current.scrollIntoView({ behavior: "smooth" });
  }

  async function getListaMensajes() {
    const mensajesArr = [];

    const coleccionRef = collection(
      firestore,
      `canales/${canalActivo}/`
    );
    const mensajesJeroglificos = await getDocs(coleccionRef);
    mensajesJeroglificos.forEach((mensaje) => {
      mensajesArr.push(mensaje.data());
    });

    setListaMensajes([...mensajesArr]);
  }

  useEffect(() => {
    getListaMensajes();
  }, [canalActivo]);

  return (
    <>
      <div className="chat">
        <EncabezadoChat nombreCanal={canalActivo} />

        <div className="chat__messages">
          {listaMensajes
            ? listaMensajes.map((mensaje) => {
                return <Mensaje mensajeFirebase={mensaje} />;
              })
            : null}
          <div ref={anchor} style={{ marginBottom: "75px" }}></div>
        </div>

        <div className="chat__input">
          <form onSubmit={enviarMensaje}>
            <Row>
              <Col sm={10}>
                <input
                  type="text"
                  disabled={canalActivo ? false : true}
                  value={inputMensaje}
                  onChange={(e) => setInputMensaje(e.target.value)}
                  placeholder={`Enviar mensaje a ${canalActivo || ""}`}
                  className="chat_input_mensaje"
                />
              </Col>
              <Col sm={2} align="right">
              <Tooltip title="Enviar mensaje" placement="top" arrow>
                <Button
                  disabled={canalActivo ? false : true}
                  className="chat__inputButton"
                  type="submit"
                >
                  <SendIcon />
                </Button>
                </Tooltip>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChatScreen;
