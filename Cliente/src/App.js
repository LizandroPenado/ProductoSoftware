import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Repuesto from "./components/repuesto/Repuesto";
import Inventario from "./components/inventario/Inventario";
import Establecimiento from "./components/establecimiento/Establecimiento";
import Rol from "./components/rol/Rol";
import Usuario from "./components/usuario/Usuario";
import Chat from "./components/chat/Inicio";
import Registro from "./components/login/Registro";
import BaseDatos from "./components/establecimiento/BaseDatos";
import GestionChat from "./components/gestionChat/Inicio";

function App() {
  return (
    <main /* className={classes.content} */>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/repuesto" component={Repuesto} />
          <Route path="/inventario" component={Inventario} />
          <Route path="/establecimiento" component={Establecimiento} />
          <Route path="/usuario" component={Usuario} />
          <Route path="/rol" component={Rol} />
          <Route path="/chat" component={Chat} />
          <Route path="/registro" component={Registro} />
          <Route path="/conexion" component={BaseDatos} />
          <Route path="/gestionChat" component={GestionChat} />
        </Switch>
      </Router>
      <footer className="fixed-bottom">
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          BRV
          {" " + new Date().getFullYear()}
          {"."}
        </Typography>
      </footer>
    </main>
  );
}

export default App;
