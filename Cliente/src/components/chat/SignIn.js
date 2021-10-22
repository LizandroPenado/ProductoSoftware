import React from "react";
import { auth } from "../../Firebase.js";
import firebase from "firebase";
import { Button } from "react-bootstrap";
import GoogleIcon from "@mui/icons-material/Google";

function SignIn() {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "50vh",
        alignItems: "center",
      }}
    >
      <Button
        variant="outline-primary"
        style={{ fontSize: "20px", borderRadius: "0", fontWeight: "600" }}
        onClick={signInWithGoogle}
      >
        <GoogleIcon />
        Ingresa con cuenta de Google
      </Button>
    </div>
  );
}

export default SignIn;
