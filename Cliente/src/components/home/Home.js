import React, { Component } from "react";
import { Container, Row, Col, Form, Button, FormLabel } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import Tarjeta from "./Tarjeta";
import "./Home.css";
import axios from "axios";
import Filtrado from "./Filtrado";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CompareIcon from "@mui/icons-material/Compare";
import { Tooltip } from "@material-ui/core";
import Navbar from "../layout/Navbar";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repuestos: [],
      form: {
        filtro: "todo",
        busqueda: "",
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
  };

  handleBusqueda = async () => {
    /* Esto tiene que ser un bucle con todas las api de los vendedores
       Para obtener todo los repuestos */
    axios
      .get("http://127.0.0.1:8004/api/repuestos/mostrar/", {
        params: {
          busqueda: this.state.form.busqueda,
          filtrado: this.state.form.filtro,
        },
      })
      .then((response) => {
        const data_inicial = response.data;
        const repuesto = [];
        for (var i = 0; i < data_inicial.length; i++) {
          repuesto[i] = {
            nombre_repuesto: data_inicial[i].nombre_repuesto,
            descripcion: data_inicial[i].descripcion,
            precio: data_inicial[i].precio,
            cantidad: data_inicial[i].cantidad,
            marca: data_inicial[i].marca,
            imagen: data_inicial[i].imagen,
            tipo: data_inicial[i].tipo,
            establecimiento: data_inicial[i].nombre_establecimiento,
            departamento: data_inicial[i].nombre_departamento,
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

  handleComparacion = async (inventario, costo) => {
    /* Esto tiene que ser un bucle con todas las api de los vendedores
       Para obtener todo los repuestos */
    axios
      .get("http://127.0.0.1:8004/api/repuestos/comparar/", {
        params: {
          tipo: inventario,
          precio: costo,
        },
      })
      .then((response) => {
        const data_inicial = response.data;
        const repuesto = [];
        for (var i = 0; i < data_inicial.length; i++) {
          repuesto[i] = {
            nombre_repuesto: data_inicial[i].nombre_repuesto,
            descripcion: data_inicial[i].descripcion,
            precio: data_inicial[i].precio,
            cantidad: data_inicial[i].cantidad,
            marca: data_inicial[i].marca,
            imagen: data_inicial[i].imagen,
            tipo: data_inicial[i].tipo,
            establecimiento: data_inicial[i].nombre_establecimiento,
            departamento: data_inicial[i].nombre_departamento,
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

  guardarEstablecimiento = async (establecimiento) => {
    const cookies = new Cookies();
    cookies.set('establecimiento', establecimiento, { path: '/chat' });
    console.log("cookie:" + cookies.get('establecimiento'));
  };

  render() {
    const { form } = this.state;
    return (
      <>
        <Navbar />
        <div className="pb-4"></div>
        {/* Menu de busqueda */}
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
                  <span className="texto-boton">Buscar</span>
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="pt-2 pb-2"></Row>
        </Container>

        {/* Tarjetas de repuestos */}
        <Container className="pt-4">
          <Row>
            <Col sm={12} className="">
              <Row className="" id="cambiar">
                {this.state.repuestos.map((elemento) => (
                  <Col className="pb-4 pt-4 d-flex justify-content-center alig-items-center">
                    <Tarjeta
                      url={elemento.imagen}
                      repuesto={elemento.nombre_repuesto}
                      descripcion={elemento.descripcion}
                      precio={elemento.precio}
                      cantidad={elemento.cantidad}
                      tipo={elemento.tipo}
                      marca={elemento.marca}
                      establecimiento={elemento.establecimiento}
                      departamento={elemento.departamento}
                      botones={
                        <>
                          <Row>
                            <Col className="pt-2" align="left">
                              <Tooltip
                                title="Contactar establecimiento"
                                placement="right"
                                arrow
                              >
                                <Link
                                  to={{
                                    pathname: "/chat",
                                    data: elemento.establecimiento,
                                  }}
                                >
                                  <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() =>
                                      this.guardarEstablecimiento(
                                        elemento.establecimiento
                                      )
                                    }
                                  >
                                    <ContactMailIcon />
                                  </Button>
                                </Link>
                              </Tooltip>
                            </Col>
                            <Col className="pt-2" align="right">
                              <Tooltip
                                title="Comparar repuesto (Precio y tipo)"
                                placement="left"
                                arrow
                              >
                                <Button
                                  variant="secondary"
                                  onClick={() =>
                                    this.handleComparacion(
                                      elemento.tipo,
                                      elemento.precio
                                    )
                                  }
                                >
                                  <CompareIcon />
                                </Button>
                              </Tooltip>
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
