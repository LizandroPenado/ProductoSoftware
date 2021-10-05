import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { Container, Row, Col } from "react-bootstrap";

class DataTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const options = {
      download: "false",
      print: "false",
      responsive: "simple",
      selectableRows: false,
      rowsPerPage: 10,
      rowsPerPageOptions: [10, 20, 30],
      tableBodyHeight: "100%",
      tableBodyMaxHeight: "100%",
      textLabels: {
        body: {
          noMatch: this.props.noRegistro,
          toolTip: "Sort",
          columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
        },
        pagination: {
          next: "Página siguiente",
          previous: "Página previa",
          rowsPerPage: "Filas por página:",
          displayRows: "de",
        },
        toolbar: {
          search: "Búsqueda",
          downloadCsv: "Download CSV",
          print: "Print",
          viewColumns: "Ver columnas",
          filterTable: "Filtros de tabla",
        },
        filter: {
          all: "TODOS",
          title: "FILTROS",
          reset: "REINICIAR",
        },
        viewColumns: {
          title: "Mostrar columnas",
          titleAria: "Mostrar/Ocultar columnas de tabla",
        },
        selectedRows: {
          text: "fila(s) seleccionada",
          delete: "Eliminar",
          deleteAria: "Eliminar filas seleccionadas",
        },
      },
    };
    return (
      <Container className="pt-5">
        <Row className="justify-content-md-center">
          <Col xs lg="2"></Col>
          <Col>
            <MUIDataTable
              title={this.props.titulo}
              data={this.props.datos}
              columns={this.props.columnas}
              options={options}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DataTable;
