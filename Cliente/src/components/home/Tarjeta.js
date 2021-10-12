import React from "react";
import { Card } from "react-bootstrap";

export default function tarjeta(props) {
  return (
    <Card className="tarjeta">
      <Card.Img variant="top" src={props.url} className="card-imagen" />
      <Card.Body>
        <Card.Title>{props.repuesto}</Card.Title>
        <Card.Text>
          Descripción: {props.descripcion}
          <br />
          Precio: $ {props.precio}
          <br />
          Existencias: {props.cantidad} unidades
          <br />
          Marca: {props.marca}
          <br />
          Establecimiento: {props.establecimiento}
        </Card.Text>
      </Card.Body>
      <Card.Footer>{props.botones}</Card.Footer>
    </Card>
  );
}
