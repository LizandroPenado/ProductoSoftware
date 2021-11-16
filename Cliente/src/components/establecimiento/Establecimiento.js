import React, { Component } from "react";
import DataTable from "../datatable/DataTable";
import BotonesTable from "../datatable/BotonesTable";
import { Button } from "react-bootstrap";
import ModalCU from "../modal/ModalCU";
import { Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

class Establecimiento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      establecimientos: [],
      departamentos: [],
      municipios: [],
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
        "http://127.0.0.1:8004/api/establecimientos/" +
          this.state.form.id +
          "/",
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
      .delete(
        "http://127.0.0.1:8004/api/establecimientos/" + this.state.form.id
      )
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
        {/* Componente tabla */}
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
            <>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  id="nombre_establecimiento"
                  name="nombre_establecimiento"
                  placeholder="Empresa Repuesto"
                  required={true}
                  value={form ? form.nombre_establecimiento : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Telefóno</Form.Label>
                <Form.Control
                  type="text"
                  id="telefono"
                  name="telefono"
                  placeholder="9999-9999"
                  required={true}
                  value={form ? form.telefono : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Encargado</Form.Label>
                <Form.Control
                  type="text"
                  id="encargado"
                  name="encargado"
                  placeholder="Jesus Rodriguez"
                  required={true}
                  value={form ? form.encargado : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Departamento</Form.Label>
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
                <Form.Label>Municipio</Form.Label>
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
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  id="direccion"
                  name="direccion"
                  required={true}
                  value={form ? form.direccion : ""}
                  onChange={this.handleChange}
                ></Form.Control>
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

export default Establecimiento;
