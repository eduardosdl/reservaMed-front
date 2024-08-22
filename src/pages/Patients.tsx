import { Box, ButtonGroup, Chip, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import { useEffect, useState } from 'react';
import PatientService from '../services/PatientService';
import Patient from '../models/patient';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Nome',
    width: 180,
  },
  {
    field: 'birthDate',
    headerName: 'Data de Nascimento',
    width: 180,
    // type: 'string',
    // valueFormatter: (value) => new Date(value).toLocaleDateString('pt-BR'),
  },
  {
    field: 'cpf',
    headerName: 'CPF',
    width: 150,
  },
  {
    field: 'cellPhone',
    headerName: 'Telefone',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
  },
  {
    field: 'street',
    headerName: 'Rua',
    width: 200,
  },
  {
    field: 'city',
    headerName: 'Cidade',
    width: 150,
  },
  {
    field: 'state',
    headerName: 'Estado',
    width: 100,
  },
  {
    field: 'cep',
    headerName: 'CEP',
    width: 120,
  },
  {
    field: 'allergies',
    headerName: 'Alergias',
    width: 200,
    renderCell: (params) => (
      <>
        {params.value?.map((allergy: string, index: number) => (
          <Chip key={index} label={allergy} />
        ))}
      </>
    ),
  },
  {
    field: 'legalGuardian',
    headerName: 'Responsável Legal',
    width: 250,
    renderCell: (params) => {
      const guardian = params.value;
      return guardian ? (
        <div>
          <div><strong>Nome:</strong> {guardian.name}</div>
          <div><strong>Telefone:</strong> {guardian.phone}</div>
          <div><strong>Relação:</strong> {guardian.relationship}</div>
        </div>
      ) : (
        'Não informado'
      );
    },
  },
  {
    field: 'id',
    headerName: 'Ações',
    width: 250,
    renderCell: (params) => {
      const { cpf } = params.row;
      return (
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <IconButton aria-label="edit" onClick={() => console.log(cpf)}>
            <EditIcon color='success' />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => PatientService.deletePatient(cpf)}>
            <DeleteIcon color='error' />
          </IconButton>
        </ButtonGroup>
      );
    },
  },
];


export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>()

  useEffect(() => {
    PatientService.getAllPatients()
      .then((data) => setPatients(data))
      .catch((error) => console.error('Error fetching patients:', error));
  }, []);

  return (
    <Box sx={{ height: '90%', width: '80%' }}
    >
      <DataGrid
        rows={patients}
        columns={columns}
      />
    </Box>
  );
}
