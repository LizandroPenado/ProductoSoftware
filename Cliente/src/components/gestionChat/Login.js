import React from "react";
import { Button } from "@material-ui/core";
import GoogleIcon from "@mui/icons-material/Google";
import firebaseApp from "../../Firebase";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { Link } from "react-router-dom";
const auth = getAuth(firebaseApp);
const gProvider = new GoogleAuthProvider();

function Login() {
  function logInConGoogle() {
    signInWithRedirect(auth, gProvider);
  }

  return (
    <>
      <div className="login">
        <div className="login__logo pb-4">
          <GoogleIcon style={{ fontSize: "100px", borderRadius: "0" }} />
        </div>
        <Button onClick={logInConGoogle}>Acceder con Google</Button>
        <Link to="/" className="pt-4">
          <Button color="secondary">Regresar al inicio</Button>
        </Link>
      </div>
    </>
  );
}

export default Login;
