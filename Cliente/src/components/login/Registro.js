import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import "./Login.css";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departamentos: [],
      municipios: [],
      respuesta: "",
      form: {
        name: "",
        email: "",
        password: "",
        establecimiento: false,
        departamento: "",
        nombre_establecimiento: "",
        telefono: "",
        encargado: "",
        dirección: "",
        municipio_id: "",
      },
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8004/api/departamentos/")
      .then((response) => {
        this.setState({ departamentos: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  handleMunicipio = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });

    axios
      .get("http://127.0.0.1:8004/api/municipios/departamentos/", {
        params: {
          departamento: this.state.form.departamento,
        },
      })
      .then((response) => {
        this.setState({ municipios: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChangeCheck = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.checked,
      },
    });
    console.log(this.state.form);
  };

  usuario = async () => {
    this.registroUsuario();
  };

  usuarioEstablecimiento = async () => {
    this.registroUsuario();
    //Obtener el usuario registrado, para asignarlo al establecimiento
    await axios
      .post("http://127.0.0.1:8000/api/usuarios/establecimiento", {
        params: {
          name: this.state.form.name,
          email: this.state.form.email,
        },
      })
      .then((response) => {
        axios
          .post("http://127.0.0.1:8004/api/establecimiento/", {
              nombre_establecimiento: this.state.form.nombre_establecimiento,
              telefono: this.state.form.telefono,
              encargado: this.state.form.encargado,
              dirección: this.state.form.dirección,
              municipio_id: this.state.form.municipio_id,
              usuario_id: response.data.id,
          })
          .then((response) => {
            this.exito("Se a guardado con exito");
          })
          .catch((error) => {
            this.errores(error.request.status);
          });
      })
      .catch((error) => {});
  };

  registroUsuario = async () => {
    await axios
      .post("http://127.0.0.1:8000/api/usuarios/", this.state.form)
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
      <Container className="form-container">
        <Row>
          <Col md="auto">
            <Card className="login-form">
              <Card.Body>
                <Card.Title className="text-center titulo">
                  Registro de usuario
                </Card.Title>
                <Card.Text>
                  <Form className="formulario" validated={true}>
                    <Form.Group>
                      <FloatingLabel label="Nombre*" className="mb-4">
                        <Form.Control
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Bessy"
                          maxLength="50"
                          autoComplete="nope"
                          required={true}
                          value={form.name}
                          onChange={this.handleChange}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                      <FloatingLabel
                        label="Correo electrónico*"
                        className="mb-4"
                      >
                        <Form.Control
                          type="email"
                          id="email"
                          name="email"
                          placeholder="correo@gmail.com"
                          maxLength="100"
                          required={true}
                          value={form.email}
                          onChange={this.handleChange}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                      <FloatingLabel label="Contraseña*">
                        <Form.Control
                          type="password"
                          id="password"
                          name="password"
                          placeholder="*******"
                          maxLength="30"
                          autoComplete="nope"
                          required={true}
                          value={form.password}
                          onChange={this.handleChange}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-end pt-3">
                      <Form.Check
                        id="establecimiento"
                        type="switch"
                        name="establecimiento"
                        label="Establecimiento"
                        value={form.establecimiento}
                        checked={form.establecimiento}
                        onChange={this.handleChangeCheck}
                      />
                    </Form.Group>
                  </Form>
                </Card.Text>
              </Card.Body>
              {this.state.form.establecimiento === false ? (
                <Card.Footer>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="boton d-flex justify-content-center"
                      /* onClick={() => this.usuario()} */
                    >
                      <PersonAddIcon />
                      <span className="texto-boton">Registrarse</span>
                    </Button>
                  </div>
                  <div className="obligatorio">
                    <Link to="/login">
                      <Button variant="link">Iniciar sesión</Button>
                    </Link>
                  </div>
                </Card.Footer>
              ) : (
                <></>
              )}
            </Card>
          </Col>
          {this.state.form.establecimiento === true ? (
            <Col md="auto">
              <Card className="login-form">
                <Card.Body>
                  <Card.Title className="text-center titulo">
                    Datos establecimiento
                  </Card.Title>
                  <Card.Text>
                    <Form className="formulario" validated={true}>
                      <Form.Group>
                        <Form.Label>Nombre Establecimiento*</Form.Label>
                        <Form.Control
                          type="text"
                          id="nombre_establecimiento"
                          name="nombre_establecimiento"
                          placeholder="Ideas"
                          maxLength="100"
                          autoComplete="nope"
                          required={true}
                          value={form.nombre_establecimiento}
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Télefono*</Form.Label>
                        <Form.Control
                          type="text"
                          id="telefono"
                          name="telefono"
                          placeholder="77778888"
                          maxLength="8"
                          minLength="8"
                          required={true}
                          value={form.telefono}
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Encargado*</Form.Label>
                        <Form.Control
                          type="text"
                          id="encargado"
                          name="encargado"
                          placeholder="Miguel"
                          maxLength="50"
                          autoComplete="nope"
                          required={true}
                          value={form.encargado}
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Departamento*</Form.Label>
                        <Form.Select
                          id="departamento"
                          name="departamento"
                          required={true}
                          value={form.departamento}
                          onChange={this.handleMunicipio}
                        >
                          <option value="" disabled={true}>
                            Seleccione..
                          </option>
                          {this.state.departamentos.map((elemento) => (
                            <option key={elemento.id} value={elemento.id}>
                              {elemento.nombre_departamento}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Municipio*</Form.Label>
                        <Form.Select
                          id="municipio_id"
                          name="municipio_id"
                          required={true}
                          value={form.municipio_id}
                          onChange={this.handleChange}
                        >
                          <option value="" disabled={true}>
                            Seleccione..
                          </option>
                          {this.state.municipios.map((elemento) => (
                            <option key={elemento.id} value={elemento.id}>
                              {elemento.nombre_municipio}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Form>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="boton d-flex justify-content-center"
                      /* onClick={() => this.usuarioEstablecimiento()} */
                    >
                      <PersonAddIcon />
                      <span className="texto-boton">Registrarse</span>
                    </Button>
                  </div>
                  <div className="obligatorio">
                    <Link to="/login">
                      <Button variant="link">Iniciar sesión</Button>
                    </Link>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </Container>
    );
  }
}

export default Registro;
