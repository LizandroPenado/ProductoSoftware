import React from "react";
import { auth } from "../../Firebase.js";
import { Button, Col, Row } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { Label } from "reactstrap";
import PersonIcon from "@mui/icons-material/Person";

function SignOut() {
  return (
    <Row
      style={{
        display: "flex",
        width: "100%",
        backgroundColor: "#fafafa",
        borderTop: "1px solid lightgray",
        borderBottom: "1px solid lightgray",
        marginLeft: "-5px",
      }}
    >
      <Col sm={2} align="letf">
        <Label>BRV Chat</Label>
      </Col>
      <Col sm={9} align="center">
        <PersonIcon />
        <Label>Super Repuestos</Label>
      </Col>
      <Col sm={1} align="right" className="pb-1 pt-1">
        <Button variant="danger"  onClick={() => auth.signOut()}>
          Salir
          <CloseIcon />
        </Button>
      </Col>
    </Row>
  );
}

export default SignOut;
