import React, { Component } from "react";
import { Container, Row, Col, Form, Button, FormLabel } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import Tarjeta from "./Tarjeta";
import "./Home.css";
import axios from "axios";
import Imagen1 from "./img/llantas_pesadas.jpg";
import Filtrado from "./Filtrado";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repuestos: [],
      repuestosBuqueda: "",
      repuestosFiltrado: "",
      departamentos: [],
      establecimientos: [],
      form: {
        filtro: "todo",
        busqueda: "",
      },
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8008/api/departamentos/")
      .then((response) => {
        this.setState({ departamentos: response.data });
      })
      .catch((error) => {
        console.log("Sucedio un error");
      });

    /*  axios
      .get("http://127.0.0.1:8000/api/usuarios/")
      .then((response) => {
        this.setState({ establecimientos: response.data });
      })
      .catch((error) => {
        console.log("Sucedio un error");
      }); */
  }

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleBusqueda = async () => {
    /* Esto tiene que ser un bucle con todas las api de los vendedores */
    axios
      .get("http://127.0.0.1:8004/api/repuestos/mostrar/", {
        params: {
          busqueda: this.state.form.busqueda,
          filtrado: this.state.form.filtro,
        },
      })
      .then((response) => {
        console.log(response.data);
        const data_inicial = response.data;
        const repuesto = [];
        for (var i = 0; i < data_inicial.length; i++) {
          repuesto[i] = {
            nombre_repuesto: data_inicial[i].nombre_repuesto,
            descripcion: data_inicial[i].descripcion,
            precio: data_inicial[i].precio,
            cantidad: data_inicial[i].cantidad,
            marca: data_inicial[i].marca,
            establecimiento: data_inicial[i].nombre_establecimiento,
          };
        }
        this.setState({ repuestos: repuesto });
      })
      .catch((error) => {
        console.log("Sucedio un error");
        const repuesto = [];
        this.setState({ repuestos: repuesto });
      });
  };

  render() {
    const { form } = this.state;
    return (
      <>
        <Container className="menu-busqueda">
          <Row className="pt-4">
            <Col sm={3} className="pb-2">
              <Form.Group>
                <FormLabel>Filtros</FormLabel>
                <Form.Select
                  id="filtro"
                  name="filtro"
                  value={form.filtro}
                  onChange={this.handleChange}
                >
                  <Filtrado />
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={7}>
              <Form.Group>
                <FormLabel>Busqueda</FormLabel>
                <Form.Control
                  type="text"
                  id="busqueda"
                  name="busqueda"
                  value={form.busqueda}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Label>Acción</Form.Label>
              <div>
                <Button variant="success" onClick={() => this.handleBusqueda()}>
                  <SearchIcon />
                  Buscar
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="pt-2 pb-2"></Row>
        </Container>
        <Container className="pt-4">
          <Row>
            <Col sm={12} className="">
              <Row className="" id="cambiar">
                {this.state.repuestos.map((elemento) => (
                  <Col className="pb-3 pt-3 d-flex justify-content-center alig-items-center">
                    <Tarjeta
                      url={Imagen1}
                      repuesto={elemento.nombre_repuesto}
                      descripcion={elemento.descripcion}
                      precio={elemento.precio}
                      cantidad={elemento.cantidad}
                      marca={elemento.marca}
                      establecimiento={elemento.establecimiento}
                      botones={
                        <>
                          <Row>
                            <Col className="pt-2">
                              <Button variant="primary">Contactar</Button>
                            </Col>
                            <Col className="pt-2">
                              <Button variant="secondary">Comparar</Button>
                            </Col>
                          </Row>
                        </>
                      }
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;
