import { Box, ButtonGroup, Chip, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import { mockPatientsList } from '../mock/dataPatients';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Nome',
    width: 180,
  },
  {
    field: 'dateOfBirth',
    headerName: 'Data de Nascimento',
    width: 180,
    type: 'date',
    valueFormatter: (value) => new Date(value).toLocaleDateString('pt-BR'),
  },
  {
    field: 'cpf',
    headerName: 'CPF',
    width: 150,
  },
  {
    field: 'phone',
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
    field: 'postalCode',
    headerName: 'CEP',
    width: 120,
  },
  {
    field: 'country',
    headerName: 'País',
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
    renderCell: ({ value }) => (
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <IconButton aria-label="edit" onClick={() => console.log(value)}>
          <EditIcon color='success' />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => console.log(value)}>
          <DeleteIcon color='error' />
        </IconButton>
      </ButtonGroup>
    ),
  },
];


export default function Patients() {
  return (
    <Box sx={{ height: '90%', width: '80%' }}
    >
      <DataGrid
        rows={mockPatientsList}
        columns={columns}
      />
    </Box>
  );
}
