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
    name: "Feliz Penado",
    email: "pm17021@ues.edu.sv",
    rol: "Administrador",
  },
  {
    name: "Roberto Paz",
    email: "pr17017@ues.edu.sv",
    rol: "Usuario",
  },
  {
    name: "Noel Renderos",
    email: "rm17039@ues.edu.sv",
    rol: "Usuario",
  },
];

class Usuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      modalInsertar: false,
      modalEliminar: false,
      form: {
        name: "",
        email: "",
        password: "",
        rol: "",
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

  seleccionUsuario = (usuario) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        name: usuario[0],
        email: usuario[1],
        rol: usuario[2],
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
        name: "name",
        label: "Nombre",
      },
      {
        name: "email",
        label: "Email",
      },
      {
        name: "rol",
        label: "Rol",
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <BotonesTable
                editar={() => {
                  this.seleccionUsuario(tableMeta.rowData);
                  this.modalInsertar();
                }}
                eliminar={() => {
                  this.seleccionUsuario(tableMeta.rowData);
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
          titulo="Usuarios"
          noRegistro="No hay registro de usuarios"
          columnas={columns}
          datos={data}
        />
        <ModalCU
          abrirCrear={this.state.modalInsertar}
          tipoModal={this.state.tipoModal}
          titulo="usuario"
          formulario={
            <>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Escriba su nombre"
                  required={true}
                  value={form ? form.name : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  required={true}
                  value={form ? form.email : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              {this.state.tipoModal === "insertar" ? (
                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    placeholder="*******"
                    required={true}
                    value={form ? form.password : ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              ) : (
                <></>
              )}
              <Form.Group>
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  as="select"
                  id="rol"
                  name="rol"
                  required={true}
                  value={form ? form.rol : ""}
                  onChange={this.handleChange}
                >
                  <option value="" disabled={true}>
                    Seleccione..
                  </option>
                  <option value="Usuario">Usuario</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Establecimiento">Establecimiento</option>
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

export default Usuario;
