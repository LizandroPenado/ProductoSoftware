import React, { Component } from "react";
import DataTable from "../datatable/DataTable";
import Botones from "../datatable/Botones";
import { Button } from "react-bootstrap";


const data = [
  { id: "1", nombre: "Llanta", clasificacion: "Caucho"},
  { id: "2", nombre: "Carburador", clasificacion: "Hierro"},
  { id: "3", nombre: "Escape", clasificacion: "Tubo"},
 ];

class Repuesto extends Component {
  /*constructor(props) {
    super(props);
     this.state = {
      cuentas: [],
      repuestos: [],
      modalInsertar: false,
      modalEliminar: false,
      form: {
        codigo: "",
        nombre: "",
        tipo: "",
        tipoModal: "",
      },
    }; 
  }*/

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

  render() {
    const columns = [
      {
        name: "id",
        label: "Código",
      },
      {
        name: "nombre",
        label: "Repuesto",
      },
      {
        name: "clasificacion",
        label: "Tipo",
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return <Botones />;
          },
        },
      },
    ];
    return (
      <>
        <div className="pt-3">
          <Button
            variant="success"
            /* onClick={() => {
              this.setState({ form: null, tipoModal: "insertar" });
              this.modalInsertar();
            }} */
          >
            Crear
          </Button>
        </div>
        <DataTable
          titulo="Catalogo"
          noRegistro="No hay registro de repuestos"
          columnas={columns}
          datos={data}
        />
      </>
    );
  }
}

export default Repuesto;
