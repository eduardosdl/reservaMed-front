import { GridColDef } from '@mui/x-data-grid';
import formatPhone from '../../../utils/formatPhone';
import { ButtonGroup, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Doctor from '../../../types/doctor';

interface CreateColumnsProps {
  onOpenEditModal: (doctorData: Doctor) => void;
  onDeleteDoctor: (crm: string) => void;
}

export default function createColumns({
  onOpenEditModal,
  onDeleteDoctor,
}: CreateColumnsProps): GridColDef[] {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      width: 180,
    },
    {
      field: 'crm',
      headerName: 'CRM',
      width: 150,
    },
    {
      field: 'cellPhone',
      headerName: 'Telefone',
      width: 130,
      type: 'string',
      valueFormatter: value => formatPhone(value),
    },
    {
      field: 'specialty',
      headerName: 'Especialidade',
      width: 200,
    },
    {
      field: 'id',
      headerName: 'Ações',
      width: 150,
      renderCell: params => {
        const { crm } = params.row;
        return (
          <ButtonGroup variant="outlined">
            <IconButton
              aria-label="edit"
              onClick={() => onOpenEditModal(params.row)}
            >
              <EditIcon color="success" />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => onDeleteDoctor(crm)}>
              <DeleteIcon color="error" />
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ];

  return columns;
}
