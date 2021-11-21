import React, { Component } from "react";
import DataTable from "../datatable/DataTable";
import BotonesTable from "../datatable/BotonesTable";
import BotonesModalRegistrar from "../modal/BotonesRegistrar";
import BotonesModalEliminar from "../modal/BotonesEliminar";
import { Button } from "react-bootstrap";
import ModalCU from "../modal/ModalCU";
import { Form } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@material-ui/core";

const data = [
  {
    codigo: "ADMIN",
    nombre: "Administrador",
  },
  {
    codigo: "USER",
    nombre: "Usuario",
  },
  {
    codigo: "EST",
    nombre: "Establecimiento",
  },
];

class Rol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      modalInsertar: false,
      modalEliminar: false,
      form: {
        codigo: "",
        nombre: "",
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

  seleccionRol = (rol) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        codigo: rol[0],
        nombre: rol[1],
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
        name: "codigo",
        label: "Código",
      },
      {
        name: "nombre",
        label: "Nombre Rol",
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <BotonesTable
                editar={() => {
                  this.seleccionRol(tableMeta.rowData);
                  this.modalInsertar();
                }}
                eliminar={() => {
                  this.seleccionRol(tableMeta.rowData);
                  this.setState({ modalEliminar: true });
                }}
              />
            );
          },
        },
      },
    ];
    return (
      <>
        <DataTable
          agregar={
            <Tooltip title="Agregar rol" placement="left" arrow>
              <Button
                variant="success"
                onClick={() => {
                  this.setState({ form: null, tipoModal: "insertar" });
                  this.modalInsertar();
                }}
              >
                <AddIcon/>
              </Button>
            </Tooltip>
          }
          titulo="Roles"
          noRegistro="No hay registro de roles"
          columnas={columns}
          datos={data}
        />
        <ModalCU
          abrirCrear={this.state.modalInsertar}
          tipoModal={this.state.tipoModal}
          titulo="rol"
          formulario={
            <>
              <Form.Group>
                <Form.Label>Codigo</Form.Label>
                <Form.Control
                  type="text"
                  id="codigo"
                  name="codigo"
                  placeholder="Digite un código..."
                  required={true}
                  value={form ? form.codigo : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nombre Rol</Form.Label>
                <Form.Control
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Digite un nombre de Rol..."
                  required={true}
                  value={form ? form.nombre : ""}
                  onChange={this.handleChange}
                />
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

export default Rol;
