import React, { Component } from "react";
import DataTable from "../datatable/DataTable";
import BotonesTable from "../datatable/BotonesTable";
import { Button } from "react-bootstrap";
import ModalCU from "../modal/ModalCU";
import { Form } from "react-bootstrap";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Tooltip } from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Repuesto from "../repuesto/Repuesto";

class Inventario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventarios: [],
      establecimientos: [],
      modalInsertar: false,
      modalEliminar: false,
      form: {
        tipo: "",
        establecimiento_id: "",
        establecimiento: "",
      },
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://127.0.0.1:8004/api/inventarios/" /* , {
      params: {
        usuario: 1, debe traer los datos por usuario
      },
    } */
      )
      .then((response) => {
        const inicial_data = response.data;
        const inventario = [];
        for (var i = 0; i < inicial_data.length; i++) {
          inventario[i] = {
            id: inicial_data[i].id,
            tipo: inicial_data[i].tipo,
            establecimiento:
              inicial_data[i].establecimiento.nombre_establecimiento,
            establecimiento_id: inicial_data[i].establecimiento_id,
            encargado: inicial_data[i].establecimiento.encargado,
          };
        }
        this.setState({ inventarios: inventario });
      })
      .catch((error) => {
        console.log("Sucedio un error");
      });

    axios
      .get(
        "http://127.0.0.1:8004/api/establecimientos/" /* , {
      params: {
        usuario: 1, debe traer los datos por usuario
      },
    } */
      )
      .then((response) => {
        this.setState({ establecimientos: response.data });
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

  seleccionInventario = (inventario) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        id: inventario[0],
        tipo: inventario[1],
        establecimiento_id: inventario[2],
        establecimiento: inventario[3],
      },
    });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  peticionPost = async () => {
    await axios
      .post("http://127.0.0.1:8004/api/inventarios/", this.state.form)
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
        "http://127.0.0.1:8004/api/inventarios/" + this.state.form.id + "/",
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
      .delete("http://127.0.0.1:8004/api/inventarios/" + this.state.form.id)
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

  handleSeleccion = () => {
    <Repuesto />;
  };

  render() {
    const { form } = this.state;
    const columns = [
      {
        name: "id",
        label: "Id",
        options: {
          display: false,
        },
      },
      {
        name: "tipo",
        label: "Tipo",
      },
      {
        name: "establecimiento_id",
        label: "Id establecimiento",
        options: {
          display: false,
        },
      },
      {
        name: "establecimiento",
        label: "Establecimiento",
      },
      {
        name: "encargado",
        label: "Encargado",
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          print: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                <BotonesTable
                  editar={() => {
                    this.seleccionInventario(tableMeta.rowData);
                    this.modalInsertar();
                  }}
                  eliminar={() => {
                    this.seleccionInventario(tableMeta.rowData);
                    this.setState({ modalEliminar: true });
                  }}
                />

                <Tooltip title="Gestionar">
                  <Link to={{pathname: '/repuesto', data: tableMeta.rowData}}>
                    <Button size="sm" variant="outline-secondary">
                      <AssignmentIcon></AssignmentIcon>
                    </Button>
                  </Link>
                </Tooltip>
              </>
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
          titulo="Inventario de establecimientos"
          noRegistro="No hay registro de inventarios"
          columnas={columns}
          datos={this.state.inventarios}
        />
        <ModalCU
          abrirCrear={this.state.modalInsertar}
          tipoModal={this.state.tipoModal}
          titulo="inventario"
          formulario={
            <>
              <Form.Group>
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  type="text"
                  id="tipo"
                  name="tipo"
                  placeholder="Neumaticos"
                  required={true}
                  value={form ? form.tipo : ""}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Establecimiento</Form.Label>
                <Form.Select
                  id="establecimiento_id"
                  name="establecimiento_id"
                  required={true}
                  value={form ? form.establecimiento_id : ""}
                  onChange={this.handleChange}
                >
                  <option value="" disabled={true}>
                    Seleccione..
                  </option>
                  {this.state.establecimientos.map((elemento) => (
                    <option key={elemento.id} value={elemento.id}>
                      {elemento.nombre_establecimiento}
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

export default Inventario;
