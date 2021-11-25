import React, { Component } from "react";
import DataTable from "../datatable/DataTable";
import BotonesTable from "../datatable/BotonesTable";
import { Button, Form, Row, Col, Image } from "react-bootstrap";
import ModalCU from "../modal/ModalCU";
import axios from "axios";
import Swal from "sweetalert2";
import { Label } from "reactstrap";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@material-ui/core";

class Repuesto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repuestos: [],
      inventarios: [],
      modalInsertar: false,
      modalEliminar: false,
      respuesta: "",
      image: null,
      inventario: this.props.location.data[0],
      nombreInventario: this.props.location.data[1],
      empresa: this.props.location.data[3],
      empresa_id: this.props.location.data[2],
      form: {
        id: "",
        nombre_repuesto: "",
        descripcion: "",
        precio: 0.0,
        cantidad: 0,
        marca: "",
        imagen: "",
        descuento: 0,
        empresa_proveedora: "",
        inventario_id: "",
        precio_normal: 0.0,
      },
    };
  }

  //Metodo para cargar inicial de datos
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8004/api/repuestos/inventario/", {
        params: {
          inventario: this.state.inventario,
        },
      })
      .then((response) => {
        this.setState({ repuestos: response.data });
      })
      .catch((error) => {
        console.log("Sucedio un error");
      });

    axios
      .get("http://127.0.0.1:8004/api/inventarios/establecimiento/", {
        params: {
          establecimiento: this.state.empresa_id,
        },
      })
      .then((response) => {
        this.setState({ inventarios: response.data });
      })
      .catch((error) => {
        console.log("Sucedio un error");
      });
  }

  //Metodo para almacenar cambios hechos por el usuario
  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    //calcular el precio final con descuento
    var precio_descuento = 0;
    if (
      this.state.form.precio_normal > 0 &&
      this.state.form.descuento >= 0 &&
      e.target.name === "descuento"
    ) {
      precio_descuento =
        this.state.form.precio_normal -
        this.state.form.precio_normal * (this.state.form.descuento / 100);
      this.setState({ form: { ...this.state.form, precio: precio_descuento } });
    }
  };

  //Metodo para seleccionar y mostrar los datos del repuesto
  seleccionRepuesto = (repuesto) => {
    var precio_no_descuento = this.invertirDescuento(repuesto[3], repuesto[7]);
    console.log(repuesto);
    this.setState({
      tipoModal: "actualizar",
      form: {
        id: repuesto[0],
        nombre_repuesto: repuesto[1],
        descripcion: repuesto[2],
        precio: repuesto[3],
        cantidad: repuesto[4],
        marca: repuesto[5],
        imagen: repuesto[6],
        descuento: repuesto[7],
        empresa_proveedora: repuesto[8],
        inventario_id: repuesto[9],
        precio_normal: precio_no_descuento,
      },
    });
  };

  //Metodo para controlar los modales
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  //Metodo para guardar
  peticionPost = async () => {
    await axios
      .post("http://127.0.0.1:8004/api/repuestos/", this.asignarDatos())
      .then((response) => {
        this.modalInsertar();
        this.exito("Se a guardado con exito");
      })
      .catch((error) => {
        this.errores(error.request.status);
      });
  };

  //Metodo para actualizar
  peticionPut = () => {
    console.log(this.state.form);
    axios
      .put(
        "http://127.0.0.1:8004/api/repuestos/" + this.state.form.id + "/",
        this.asignarDatos()
      )
      .then((response) => {
        this.modalInsertar();
        this.exito("Se a guardado con exito");
      })
      .catch((error) => {
        this.errores(error.request.status);
      });
  };

  //Metodo para eliminar
  peticionDelete = () => {
    axios
      .delete("http://127.0.0.1:8004/api/repuestos/" + this.state.form.id)
      .then((response) => {
        this.setState({ modalEliminar: false });
        this.exito("Se a eliminado con exito");
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

  hanldeImagen = (e) => {
    var imagenes = e.target.files[0];
    this.setState({ image: imagenes });
  };

  asignarDatos = () => {
    var formData = new FormData();
    formData.append("nombre_repuesto", this.state.form.nombre_repuesto);
    formData.append("descripcion", this.state.form.descripcion);
    formData.append("precio", this.state.form.precio);
    formData.append("cantidad", this.state.form.cantidad);
    formData.append("marca", this.state.form.marca);
    formData.append("imagen", this.state.image);
    formData.append("descuento", this.state.form.descuento);
    formData.append("empresa_proveedora", this.state.form.empresa_proveedora);
    formData.append("inventario_id", this.state.form.inventario_id);
    return formData;
  };

  invertirDescuento = (precio_descuento, descuento) => {
    //Obtener el precio nomal, quitandole descuento
    var precio_sin_descuento = 0;
    precio_sin_descuento = (1 * precio_descuento) / (1 - descuento / 100);
    return precio_sin_descuento;
  };

  render() {
    const { form } = this.state;
    /* Datos de las columnas */
    const columns = [
      {
        name: "id",
        label: "Id",
        options: {
          display: false,
        },
      },
      {
        name: "nombre_repuesto",
        label: "Nombre",
      },
      {
        name: "descripcion",
        label: "Descripción",
      },
      {
        name: "precio",
        label: "Precio",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return "$ " + value;
          },
        },
      },
      {
        name: "cantidad",
        label: "Existencias",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return value + " unidades";
          },
        },
      },
      {
        name: "marca",
        label: "Marca",
      },
      {
        name: "imagen",
        label: "Imagen",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return <Image src={value} />;
          },
        },
      },
      {
        name: "descuento",
        label: "Descuento",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return value + " %";
          },
        },
      },
      {
        name: "empresa_proveedora",
        label: "Proveedor",
      },
      {
        name: "inventario_id",
        label: "Id inventario",
        options: {
          display: false,
        },
      },
      {
        name: "tipo",
        label: "Inventario",
        options: {
          display: false,
        },
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <BotonesTable
                editar={() => {
                  this.seleccionRepuesto(tableMeta.rowData);
                  this.modalInsertar();
                }}
                eliminar={() => {
                  this.seleccionRepuesto(tableMeta.rowData);
                  this.setState({ modalEliminar: true });
                }}
              />
            );
          },
          print: false,
        },
      },
    ];

    return (
      <>
        {/* Tabla */}
        <DataTable
          agregar={
            <Tooltip title="Agregar repuesto" placement="left" arrow>
              <Button
                variant="success"
                onClick={() => {
                  this.setState({ form: null, tipoModal: "insertar" });
                  this.modalInsertar();
                }}
              >
                <AddIcon />
              </Button>
            </Tooltip>
          }
          regresar={
            <Tooltip title="Regresar a inventarios" placement="left" arrow>
              <Link to="/inventario">
                <Button variant="warning">
                  <ArrowBackIcon />
                </Button>
              </Link>
            </Tooltip>
          }
          empresa={this.state.empresa}
          titulo={" Inventario de " + this.state.nombreInventario}
          noRegistro="No hay registro de repuestos"
          columnas={columns}
          datos={this.state.repuestos}
        />

        {/* Modales */}
        <ModalCU
          abrirCrear={this.state.modalInsertar}
          tipoModal={this.state.tipoModal}
          titulo="repuesto"
          formulario={
            <Form validated={true} enctype="multipart/form-data">
              <Form.Group>
                <Form.Label>Nombre*</Form.Label>
                <Form.Control
                  type="text"
                  id="nombre_repuesto"
                  name="nombre_repuesto"
                  placeholder="Radiador"
                  maxLength="200"
                  autoComplete="nope"
                  required={true}
                  value={form ? form.nombre_repuesto : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Descripción*</Form.Label>
                <Form.Control
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Automaticos pesados..."
                  maxLength="250"
                  autoComplete="nope"
                  required={true}
                  value={form ? form.descripcion : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Precio*</Form.Label>
                    <Form.Control
                      type="number"
                      id="precio_normal"
                      name="precio_normal"
                      placeholder="60.25"
                      min="0.01"
                      max="9999999999"
                      step="0.01"
                      autoComplete="nope"
                      required={true}
                      value={form ? form.precio_normal : ""}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Descuento*</Form.Label>
                    <Form.Control
                      type="number"
                      id="descuento"
                      name="descuento"
                      placeholder="50"
                      autoComplete="nope"
                      min="0"
                      max="100"
                      step="1"
                      required={true}
                      value={form ? form.descuento : ""}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Precio final</Form.Label>
                <Form.Control
                  type="number"
                  id="precio"
                  name="precio"
                  placeholder="60.25"
                  min="0.01"
                  readOnly={true}
                  max="9999999999"
                  step="0.01"
                  autoComplete="nope"
                  required={true}
                  value={form ? form.precio : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Existencias*</Form.Label>
                <Form.Control
                  type="number"
                  id="cantidad"
                  name="cantidad"
                  placeholder="10"
                  autoComplete="nope"
                  min="1"
                  max="100000"
                  step="1"
                  required={true}
                  value={form ? form.cantidad : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Marca*</Form.Label>
                <Form.Control
                  type="text"
                  id="marca"
                  name="marca"
                  placeholder="Toyota"
                  maxLength="50"
                  autoComplete="nope"
                  required={true}
                  value={form ? form.marca : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Imagen*</Form.Label>
                <Tooltip
                  title="Archivo formato: png, jpg..."
                  placement="top"
                  arrow
                >
                  <Form.Control
                    type="file"
                    id="imagen"
                    name="imagen"
                    required={true}
                    onChange={this.hanldeImagen}
                  />
                </Tooltip>
              </Form.Group>
              <Form.Group>
                <Form.Label>Proveedor*</Form.Label>
                <Form.Control
                  type="text"
                  id="empresa_proveedora"
                  name="empresa_proveedora"
                  placeholder="Toyota"
                  maxLength="200"
                  autoComplete="nope"
                  required={true}
                  value={form ? form.empresa_proveedora : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Inventario*</Form.Label>
                <Form.Select
                  id="inventario_id"
                  name="inventario_id"
                  required={true}
                  value={form ? form.inventario_id : ""}
                  onChange={this.handleChange}
                >
                  <option value="" disabled={true}>
                    Seleccione..
                  </option>
                  {this.state.inventarios.map((elemento) => (
                    <option key={elemento.id} value={elemento.id}>
                      {elemento.tipo}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <div className="obligatorio">
                <Label>Datos requeridos (*)</Label>
              </div>
            </Form>
          }
          pieModalCrear={
            <>
              {this.state.tipoModal === "insertar" ? (
                <Button variant="primary" onClick={() => this.peticionPost()}>
                  Guardar
                </Button>
              ) : (
                <Button variant="primary" onClick={() => this.peticionPut()}>
                  Actualizar
                </Button>
              )}
              <Button variant="secondary" onClick={() => this.modalInsertar()}>
                Cancelar
              </Button>
            </>
          }
          abrirEliminar={this.state.modalEliminar}
          pieModalEliminar={
            <>
              <Button variant="danger" onClick={() => this.peticionDelete()}>
                Aceptar
              </Button>
              <Button
                variant="secondary"
                onClick={() => this.setState({ modalEliminar: false })}
              >
                Cancelar
              </Button>
            </>
          }
        />
      </>
    );
  }
}

export default Repuesto;
