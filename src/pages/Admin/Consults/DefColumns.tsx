import { GridColDef } from '@mui/x-data-grid';
import formatPhone from '../../../utils/formatPhone';
import { ButtonGroup, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Consult from '../../../types/consult';
import formatCpf from '../../../utils/formatCpf';

// interface CreateColumnsProps {
//   onOpenEditModal: (consultData: Consult) => void;
//   onCancelConsult: (id: string) => void;
// }

// export default function createColumns({
//   onOpenEditModal,
//   onCancelConsult,
// }: CreateColumnsProps): GridColDef[] {
export default function createColumns(): GridColDef[] {
  const columns: GridColDef[] = [
    {
      field: 'patientName',
      headerName: 'Nome do paciente',
      width: 200,
      renderCell: params => params.row.patient.name,
    },
    {
      field: 'patientCpf',
      headerName: 'Nome do paciente',
      width: 200,
      renderCell: params => formatCpf(params.row.patient.cpf),
    },
    {
      field: 'date',
      headerName: 'Nome do paciente',
      width: 200,
      type: 'string',
      valueFormatter: value => {
        const date = new Date(value).toLocaleDateString('pt-BR');
        const time = new Date(value).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });
        return `${date} - ${time}`;
      },
    },
    {
      field: 'doctorName',
      headerName: 'Nome do médico',
      width: 200,
      renderCell: params => params.row.doctor.name,
    },
    // {
    //   field: 'crm',
    //   headerName: 'CRM',
    //   width: 150,
    //   type: 'string',
    //   valueFormatter: value => new Date(value).toLocaleDateString('pt-BR'),
    // },
    // {
    //   field: 'cellPhone',
    //   headerName: 'Telefone',
    //   width: 130,
    //   type: 'string',
    //   valueFormatter: value => formatPhone(value),
    // },
    // {
    //   field: 'specialty',
    //   headerName: 'Especialidade',
    //   width: 200,
    // },
    // {
    //   field: 'id',
    //   headerName: 'Ações',
    //   width: 150,
    //   renderCell: params => {
    //     const { crm } = params.row;
    //     return (
    //       <ButtonGroup variant="outlined">
    //         <IconButton
    //           aria-label="edit"
    //           onClick={() => onOpenEditModal(params.row)}
    //         >
    //           <EditIcon color="success" />
    //         </IconButton>
    //         <IconButton
    //           aria-label="delete"
    //           onClick={() => onCancelConsult(crm)}
    //         >
    //           <DeleteIcon color="error" />
    //         </IconButton>
    //       </ButtonGroup>
    //     );
    //   },
    // },
  ];

  return columns;
}
