import React, { Component } from "react";
import DataTable from "../datatable/DataTable";
import BotonesTable from "../datatable/BotonesTable";
import { Button } from "react-bootstrap";
import ModalCU from "../modal/ModalCU";
import { Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";


class Repuesto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repuestos: [],
      inventario_id: "",
      inventarios: [], 
      modalInsertar: false,
      modalEliminar: false,
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
      },
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://127.0.0.1:8004/api/repuestos/" /* , {
      params: {
        inventario: 1, debe traer los datos por inventario selecionado
      },
    } */
      )
      .then((response) => {
        this.setState({ repuestos: response.data });
      })
      .catch((error) => {
        console.log("Sucedio un error");
      });

      axios
      .get(
        "http://127.0.0.1:8004/api/inventarios/" /* , {
      params: {
        empresa: 1, debe traer los datos por inventario selecionado
      },
    } */
      )
      .then((response) => {
        this.setState({ inventarios: response.data });
      })
      .catch((error) => {
        console.log("Sucedio un error");
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
  };

  seleccionRepuesto = (repuesto) => {
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
      },
    });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  peticionPost = async () => {
    await axios
      .post("http://127.0.0.1:8004/api/repuestos/", this.state.form)
      .then((response) => {
        this.modalInsertar();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se a guardado con exito",
          showConfirmButton: false,
          timer: 2500,
        });
        this.componentDidMount();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrio un error en el registro del sector",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Metodo para actualizar
  peticionPut = () => {
    axios
      .put(
        "http://127.0.0.1:8004/api/repuestos/" + this.state.form.id + "/",
        this.state.form
      )
      .then((response) => {
        this.modalInsertar();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se a guardado con exito",
          showConfirmButton: false,
          timer: 2500,
        });
        this.componentDidMount();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrio un error en actualizar el sector",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Metodo para eliminar
  peticionDelete = () => {
    axios
      .delete("http://127.0.0.1:8004/api/repuestos/" + this.state.form.id)
      .then((response) => {
        this.setState({ modalEliminar: false });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se a eliminado con exito",
          showConfirmButton: false,
          timer: 2500,
        });
        this.componentDidMount();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrio un error en el eliminar el sector",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  render() {
    const { form } = this.state;
    const columns = [
      {
        name: "id",
        label: "Id",
        options:{
          display: false,
        }
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
        options:{
          display: false,
        }
      },
      {
        name: "tipo",
        label: "Inventario",
        options:{
          display: false,
        }
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
          datos={this.state.repuestos}
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
                  id="nombre_repuesto"
                  name="nombre_repuesto"
                  placeholder="Radiador"
                  required={true}
                  value={form ? form.nombre_repuesto : ""}
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
                  id="empresa_proveedora"
                  name="empresa_proveedora"
                  placeholder="Toyota"
                  required={true}
                  value={form ? form.empresa_proveedora : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Inventario</Form.Label>
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
            </>
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
