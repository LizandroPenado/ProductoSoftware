import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Card, Container } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Navbar from "../layout/Navbar";

class BaseDatos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      respuesta: "",
      form: {
        gestor: "",
        host: "",
        port: "",
        usuario: "",
        password: "",
        database: "",
      },
    };
  }

  //Metodo para cargar los datos inciales de la intefaz
  componentDidMount() {}

  //Metodo que captura los cambios realizados en los formularios
  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  //Metodo para guardar
  peticionPost = async () => {
    await axios
      .post("http://127.0.0.1:8004/api/conexion/", this.state.form)
      .then((response) => {
        this.exito("Se a guardado con exito");
      })
      .catch((error) => {
        this.errores(error.request.status);
      });
  };

  errores = (estado) => {
    if (estado === 422) {
      this.setState({ respuesta: "Debe ingresar todos los campos requeridos" });
    } else {
      this.setState({ respuesta: "No hay conexion con la Base de Datos" });
    }
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Error",
      html: this.state.respuesta,
      showConfirmButton: true,
    });
  };

  exito = (mensaje) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: mensaje,
      showConfirmButton: false,
      timer: 2500,
    });
    this.componentDidMount();
  };

  render() {
    const { form } = this.state;
    return (
      <>
      <Navbar />
        <div className="pb-4"></div>
      <Container className="form-container">
        <Card className="bd-form">
          <Card.Body>
            <Card.Title className="text-center titulo">
              Conectar a Base de Datos
            </Card.Title>
            <Card.Text>
              <Form className="formulario" validated={true}>
                <Row>
                  <Form.Group>
                    <Form.Label>Gestor*</Form.Label>
                    <Form.Select
                      id="gestor"
                      name="gestor"
                      required={true}
                      value={form.gestor}
                      onChange={this.handleChange}
                    >
                      <option value="" disabled={true} selected={true}>
                        Seleccione..
                      </option>
                      <option key="MySQL" value="MySQL">
                        MySQL
                      </option>
                      <option key="pgsql" value="pgsql">
                        PostgreSQL
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Host*</Form.Label>
                      <Form.Control
                        type="text"
                        id="host"
                        name="host"
                        placeholder="127.0.0.1"
                        maxLength="15"
                        required={true}
                        value={form.host}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Port*</Form.Label>
                      <Form.Control
                        type="text"
                        id="port"
                        name="port"
                        placeholder="3306"
                        maxLength="8"
                        required={true}
                        value={form.port}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Usuario*</Form.Label>
                      <Form.Control
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="root"
                        maxLength="30"
                        required={true}
                        value={form.root}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Password*</Form.Label>
                      <Form.Control
                        type="password"
                        id="password"
                        name="password"
                        placeholder="*******"
                        maxLength="30"
                        required={true}
                        value={form.password}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Database*</Form.Label>
                      <Form.Control
                        type="text"
                        id="database"
                        name="database"
                        placeholder="product"
                        maxLength="30"
                        required={true}
                        value={form.database}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-center">
              <Button
                className="boton d-flex justify-content-center"
                onClick={() => this.peticionPost()}
              >
                <ChangeCircleIcon />
                <span className="texto-boton">Guardar</span>
              </Button>
            </div>
            {/* <div className="obligatorio">
              <Link to="/registro">
                <Button variant="link">Registrarse</Button>
              </Link>
            </div> */}
          </Card.Footer>
        </Card>
      </Container>
      </>
    );
  }
}

export default BaseDatos;
