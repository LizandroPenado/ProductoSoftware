import React, { Component } from "react";
import { Form  } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal isOpen={this.props.abrir} centered>
        <ModalHeader style={{ display: "block" }}>
          {this.props.tipoModal === "insertar" ? (
            <span>Crear {this.props.titulo}</span>
          ) : (
            <span>Actualizar {this.props.titulo}</span>
          )}
        </ModalHeader>
        <ModalBody>
          <Form.Group>
            {this.props.formulario}
          </Form.Group>
          <ModalFooter>
            {this.props.pieModal}
          </ModalFooter>
        </ModalBody>
      </Modal>
    );
  }
}

export default Home;
