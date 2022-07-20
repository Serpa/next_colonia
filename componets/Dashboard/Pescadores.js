import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Docx from '../docxGenerate/Docx'
import { Button } from '@mui/material';
export default function ToolbarGrid() {
  const [tableData, setTableData] = React.useState([])

  useEffect(() => {
    fetch("/api/pescadores")
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [])

  const columns = [
    { field: 'ficha', headerName: 'Ficha' },
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'telefone', headerName: 'Telefone', flex: 1 },
    { field: 'celular', headerName: 'Celular', flex: 1 },
    { field: 'endereco', headerName: 'Endereço', flex: 1 },
    { field: 'cidade', headerName: 'Cidade', flex: 1 },
    { field: 'vencimento', headerName: 'Vencimento', flex: 1 },
    { field: 'nascimento', headerName: 'Nascimento', flex: 1 },
    {
      field: "Alterar",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="warning"
            onClick={()=>console.log()}
          >
            Alterar
          </Button>
        );
      }, flex: 1
    },
    {
      field: "Documentos",
      renderCell: (cellValues) => {
        return (
          <Docx
            variant="contained"
            color="primary"
            dados={cellValues.row}

          >
            Documentos
          </Docx>
        );
      }, flex: 1
    }
  ]


  return (
    <DataGrid
      rows={tableData}
      columns={columns}
      allowColumnResizing={true}
      rowsPerPageOptions={[5, 10, 20, 100]}
      components={{
        Toolbar: GridToolbar,
      }}
    />
  );
}
