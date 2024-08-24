import { GridColDef } from '@mui/x-data-grid';
import formatCpf from '../../utils/formatCpf';
import formatPhone from '../../utils/formatPhone';
import formatCep from '../../utils/formatCep';
import { ButtonGroup, Chip, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Patient from '../../types/patient';

interface CreateColumnsProps {
  onOpenEditForm: (cpf: Patient) => void;
  onOpenDeleteModal: (cpf: string) => void;
}

export default function createColumns({
  onOpenEditForm,
  onOpenDeleteModal,
}: CreateColumnsProps): GridColDef[] {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      width: 180,
    },
    {
      field: 'birthDate',
      headerName: 'Data de Nascimento',
      width: 150,
      type: 'string',
      valueFormatter: value => new Date(value).toLocaleDateString('pt-BR'),
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      width: 130,
      type: 'string',
      valueFormatter: value => formatCpf(value),
    },
    {
      field: 'cellPhone',
      headerName: 'Telefone',
      width: 130,
      type: 'string',
      valueFormatter: value => formatPhone(value),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'street',
      headerName: 'Rua',
      width: 200,
    },
    {
      field: 'city',
      headerName: 'Cidade',
      width: 130,
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
      type: 'string',
      valueFormatter: value => formatCep(value || ''),
    },
    {
      field: 'allergy',
      headerName: 'Alergias',
      width: 150,
      renderCell: params => (
        <>
          {params.value
            .split(',')
            ?.map((allergy: string, index: number) => (
              <Chip key={index} label={allergy} sx={{ mr: 1 }} />
            ))}
        </>
      ),
    },
    {
      field: 'responsibleCpf',
      headerName: 'Responsável Legal',
      width: 250,
      valueFormatter: value => formatCpf(value || '') || 'Maior de idade',
    },
    {
      field: 'id',
      headerName: 'Ações',
      width: 150,
      renderCell: params => {
        const { cpf } = params.row;
        return (
          <ButtonGroup variant="outlined">
            <IconButton
              aria-label="edit"
              onClick={() => onOpenEditForm(params.row)}
            >
              <EditIcon color="success" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => onOpenDeleteModal(cpf)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ];

  return columns;
}
