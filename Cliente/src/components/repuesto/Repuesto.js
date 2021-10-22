import React, { Component } from "react";
import DataTable from "../datatable/DataTable";
import BotonesTable from "../datatable/BotonesTable";
import BotonesModalRegistrar from "../modal/BotonesRegistrar";
import BotonesModalEliminar from "../modal/BotonesEliminar";
import { Button } from "react-bootstrap";
import ModalCU from "../modal/ModalCU";
import { Form } from "react-bootstrap";

const data = [
  {
    nombre: "Llantas pesadas",
    descripcion: "Llantas 500x200",
    precio: 160.25,
    cantidad: 4,
    marca: "Toyota",
    imagen: "../Repuestos/Llantas/Llantas_pesadas.png",
    inventario: "Neumaticos",
    descuento: 0,
    empresaProveedora: "Toyota",
  },
  {
    nombre: "Llanta livianas",
    descripcion: "Llantas 200x200",
    precio: 60,
    cantidad: 4,
    marca: "Toyota",
    imagen: "../Repuestos/Llantas/Llantas_livianas.png",
    inventario: "Neumaticos",
    descuento: 30,
    empresaProveedora: "Toyota",
  },
  {
    nombre: "Llanta para moto",
    descripcion: "Llantas dobles",
    precio: 49.25,
    cantidad: 2,
    marca: "Toyota",
    imagen: "../Repuestos/Llantas/Llantas_moto.png",
    inventario: "Neumaticos",
    descuento: 10,
    empresaProveedora: "Toyota",
  },
];

class Repuesto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repuestos: [],
      modalInsertar: false,
      modalEliminar: false,
      form: {
        nombre: "",
        descripcion: "",
        precio: 0.0,
        cantidad: 0,
        marca: "",
        imagen: "",
        descuento: 0,
        empresaProveedora: "",
        inventario: "",
        tipoModal: "",
      },
    };
  }

  /* componentDidMount() {
    axios
      .get("http://127.0.0.1:8001/api/cuentas/")
      .then((response) => {
        this.setState({ cuentas: response.data });
        axios
          .get("http://127.0.0.1:8000/api/repuestos/")
          .then((response) => {
            this.setState({ repuestos: response.data });
          })
          .catch((error) => {});
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Por el momento no hay conexión con la base de datos",
        });
      });
  } */

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  seleccionRepuesto = (repuesto) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        nombre: repuesto[0],
        descripcion: repuesto[1],
        precio: repuesto[2],
        cantidad: repuesto[3],
        marca: repuesto[4],
        imagen: repuesto[5],
        descuento: repuesto[6],
        empresaProveedora: repuesto[7],
        inventario: repuesto[8],
      },
    });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  render() {
    const { form } = this.state;
    const columns = [
      {
        name: "nombre",
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
        options:{
          display: false,
        }
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
        name: "empresaProveedora",
        label: "Proveedor",
      },
      {
        name: "inventario",
        label: "Inventario",
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
        <DataTable
          agregar={
            <Button
              variant="success"
              onClick={() => {
                this.setState({ form: null, tipoModal: "insertar" });
                this.modalInsertar();
              }}
            >
              Agregar
            </Button>
          }
          titulo="Inventario de llantas"
          noRegistro="No hay registro de repuestos"
          columnas={columns}
          datos={data}
        />
        <ModalCU
          abrirCrear={this.state.modalInsertar}
          tipoModal={this.state.tipoModal}
          titulo="repuesto"
          formulario={
            <>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Radiador"
                  required={true}
                  value={form ? form.nombre : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Automaticos pesados..."
                  required={true}
                  value={form ? form.descripcion : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="text"
                  id="precio"
                  name="precio"
                  placeholder="60.25"
                  required={true}
                  value={form ? form.precio : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Existencias</Form.Label>
                <Form.Control
                  type="text"
                  id="cantidad"
                  name="cantidad"
                  placeholder="10"
                  required={true}
                  value={form ? form.cantidad : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  type="text"
                  id="marca"
                  name="marca"
                  placeholder="Toyota"
                  required={true}
                  value={form ? form.marca : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Dirección imagen</Form.Label>
                <Form.Control
                  type="text"
                  id="imagen"
                  name="imagen"
                  placeholder="../Repuestos/..."
                  required={true}
                  value={form ? form.imagen : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Descuento</Form.Label>
                <Form.Control
                  type="text"
                  id="descuento"
                  name="descuento"
                  placeholder="50"
                  required={true}
                  value={form ? form.descuento : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Proveedor</Form.Label>
                <Form.Control
                  type="text"
                  id="empresaProveedora"
                  name="empresaProveedora"
                  placeholder="Toyota"
                  required={true}
                  value={form ? form.empresaProveedora : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Inventario</Form.Label>
                <Form.Control
                  as="select"
                  id="inventario"
                  name="inventario"
                  required={true}
                  value={form ? form.inventario : ""}
                  onChange={this.handleChange}
                >
                  <option value="" disabled={true}>
                    Seleccione..
                  </option>
                  <option value="Llantas">Llantas</option>
                  <option value="Escapes">Escapes</option>
                </Form.Control>
              </Form.Group>
            </>
          }
          pieModalCrear={
            <BotonesModalRegistrar
              tipoModal={this.state.tipoModal}
              cancelar={() => this.modalInsertar()}
            />
          }
          abrirEliminar={this.state.modalEliminar}
          pieModalEliminar={
            <BotonesModalEliminar
              cancelar={() => this.setState({ modalEliminar: false })}
            />
          }
        />
      </>
    );
  }
}

export default Repuesto;
