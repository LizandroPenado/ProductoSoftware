import React, { Component } from "react";
import DataTable from "../datatable/DataTable";
import BotonesTable from "../datatable/BotonesTable";
import { Button, Form } from "react-bootstrap";
import ModalCU from "../modal/ModalCU";
import axios from "axios";
import Swal from "sweetalert2";
import { Label } from "reactstrap";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@material-ui/core";
import Navbar from "../layout/Navbar";

class Establecimiento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      establecimientos: [],
      departamentos: [],
      municipios: [],
      respuesta: "",
      modalInsertar: false,
      modalEliminar: false,
      form: {
        id: "",
        nombre_establecimiento: "",
        telefono: "",
        encargado: "",
        direccion: "",
        departamento: "",
        municipio_id: "",
      },
    };
  }

  //Metodo para cargar los datos inciales de la intefaz
  componentDidMount() {
    axios
      .get(
        "http://127.0.0.1:8004/api/establecimientos/" /* , {
        params: {
          usuario: 1, debe traer los datos por usuario
        },
      } */
      )
      .then((response) => {
        const inicial_data = response.data;
        const establecimiento = [];
        for (var i = 0; i < inicial_data.length; i++) {
          establecimiento[i] = {
            id: inicial_data[i].id,
            nombre_establecimiento: inicial_data[i].nombre_establecimiento,
            telefono: inicial_data[i].telefono,
            encargado: inicial_data[i].encargado,
            departamento:
              inicial_data[i].municipio.departamento.nombre_departamento,
            departamento_id: inicial_data[i].municipio.departamento_id,
            municipio: inicial_data[i].municipio.nombre_municipio,
            municipio_id: inicial_data[i].municipio_id,
            direccion: inicial_data[i].direccion,
          };
        }
        this.setState({ establecimientos: establecimiento });
      })
      .catch((error) => {
        console.log("Sucedio un error");
      });

    axios
      .get("http://127.0.0.1:8004/api/departamentos/")
      .then((response) => {
        this.setState({ departamentos: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  //Metodo para select anidado de departamento-municipio
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

  //Metodo para guardar el establecimiento seleccionado
  seleccionEstablecimiento = (establecimiento) => {
    axios
      .get("http://127.0.0.1:8004/api/municipios/departamentos/", {
        params: {
          departamento: establecimiento[4],
        },
      })
      .then((response) => {
        this.setState({ municipios: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      tipoModal: "actualizar",
      form: {
        id: establecimiento[0],
        nombre_establecimiento: establecimiento[1],
        telefono: establecimiento[2],
        encargado: establecimiento[3],
        departamento: establecimiento[4],
        municipio_id: establecimiento[6],
        direccion: establecimiento[7],
      },
    });
  };

  //Metodo para abrir el modal y vaciar municipios acumulados
  modalInsertar = () => {
    const vaciar = [];
    this.setState({
      modalInsertar: !this.state.modalInsertar,
      municipios: vaciar,
    });
  };

  //Metodo para guardar
  peticionPost = async () => {
    await axios
      .post("http://127.0.0.1:8004/api/establecimientos/", this.state.form)
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
    axios
      .put(
        "http://127.0.0.1:8004/api/establecimientos/" +
          this.state.form.id +
          "/",
        this.state.form
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
      .delete(
        "http://127.0.0.1:8004/api/establecimientos/" + this.state.form.id
      )
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

  render() {
    const { form } = this.state;
    /* Columnas de la tabla */
    const columns = [
      {
        name: "id",
        label: "Id",
        options: {
          display: false,
        },
      },
      {
        name: "nombre_establecimiento",
        label: "Nombre",
      },
      {
        name: "telefono",
        label: "Teléfono",
      },
      {
        name: "encargado",
        label: "Encargado",
      },
      {
        name: "departamento_id",
        label: "Id departamento",
        options: {
          display: false,
        },
      },
      {
        name: "departamento",
        label: "Departamento",
      },
      {
        name: "municipio_id",
        label: "Id municipio",
        options: {
          display: false,
        },
      },
      {
        name: "municipio",
        label: "Municipio",
      },
      {
        name: "direccion",
        label: "Dirección",
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          print: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <BotonesTable
                editar={() => {
                  this.seleccionEstablecimiento(tableMeta.rowData);
                  this.modalInsertar();
                }}
                eliminar={() => {
                  this.seleccionEstablecimiento(tableMeta.rowData);
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
        <Navbar />
        <div className="pb-4"></div>
        {/* Componente tabla */}
        <DataTable
          agregar={
            <Tooltip title="Agregar establecimiento" placement="top" arrow>
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
          titulo="Establecimientos"
          noRegistro="No hay registro de establecimientos"
          columnas={columns}
          datos={this.state.establecimientos}
        />

        {/* Modales */}
        <ModalCU
          abrirCrear={this.state.modalInsertar}
          tipoModal={this.state.tipoModal}
          titulo="establecimiento"
          formulario={
            <Form validated={true}>
              <Form.Group>
                <Form.Label>Nombre*</Form.Label>
                <Form.Control
                  type="text"
                  id="nombre_establecimiento"
                  name="nombre_establecimiento"
                  placeholder="Empresa Repuesto"
                  maxLength="100"
                  autoComplete="nope"
                  required={true}
                  value={form ? form.nombre_establecimiento : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Telefóno*</Form.Label>
                <Form.Control
                  type="text"
                  id="telefono"
                  name="telefono"
                  placeholder="77778888"
                  maxLength="8"
                  minLength="8"
                  autoComplete="nope"
                  required={true}
                  value={form ? form.telefono : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Encargado*</Form.Label>
                <Form.Control
                  type="text"
                  id="encargado"
                  name="encargado"
                  placeholder="Jesus Rodriguez"
                  maxLength="50"
                  autoComplete="nope"
                  required={true}
                  value={form ? form.encargado : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Departamento*</Form.Label>
                <Form.Select
                  id="departamento"
                  name="departamento"
                  required={true}
                  value={form ? form.departamento : ""}
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
                  value={form ? form.municipio_id : ""}
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
              <Form.Group>
                <Form.Label>Dirección*</Form.Label>
                <Form.Control
                  type="text"
                  id="direccion"
                  name="direccion"
                  maxLength="200"
                  autoComplete="nope"
                  required={true}
                  value={form ? form.direccion : ""}
                  onChange={this.handleChange}
                ></Form.Control>
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

export default Establecimiento;
