import React from "react";
import MUIDataTable from "mui-datatables";
import { Container, Row, Col } from "react-bootstrap";
import "./Tabla.css";

export default function dataTable(props) {
  const options = {
    download: "false",
    responsive: "simple",
    selectableRows: "none",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30],
    tableBodyHeight: "100%",
    tableBodyMaxHeight: "100%",
    textLabels: {
      body: {
        noMatch: props.noRegistro,
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
    <Container fluid="xxl">
      <Row>
        <div className="text-center titulo-empresa">{props.empresa}</div>
      </Row>
      <Row>
        <Col sm={2} className="pt-3">
          <Row>
            <Col align="left">
              <div className="pb-4">{props.regresar}</div>
            </Col>
            <Col align="right">
              <div className="pb-4">{props.agregar}</div>
            </Col>
          </Row>
        </Col>
        <Col sm={10}>
          <MUIDataTable
            title={props.titulo}
            data={props.datos}
            columns={props.columnas}
            options={options}
          />
        </Col>
      </Row>
    </Container>
  );
}
