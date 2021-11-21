import React, { Component } from "react";
import { Card, Container, Form, Button, FloatingLabel } from "react-bootstrap";
import "./Login.css";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      respuesta: "",
      form: {
        email: "",
        password: "",
      },
    };
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

  render() {
    const { form } = this.state;
    return (
      <Container className="form-container">
        <Card className="login-form">
          <Card.Body>
            <Card.Title className="text-center titulo">
              Inicio sesión
            </Card.Title>
            <Card.Text>
              <Form className="formulario" validated={true}>
                <Form.Group>
                  <FloatingLabel label="Correo electrónico" className="mb-4">
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
                  <FloatingLabel label="Contraseña">
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
              </Form>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-center">
              <Button className="boton d-flex justify-content-center">
                <LoginIcon />
                <span className="texto-boton">Ingresar</span>
              </Button>
            </div>
            <div className="obligatorio">
              <Link to="/registro">
                <Button variant="link">Registrarse</Button>
              </Link>
            </div>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

export default Login;
