import { GridColDef } from '@mui/x-data-grid';
import formatCpf from '../../utils/formatCpf';
import { ButtonGroup } from '@mui/material';
import Button from '../Button';

// interface CreateColumnsProps {
//   onOpenEditModal: (consultData: Consult) => void;
//   onCancelConsult: (id: string) => void;
// }

// export default function createColumns({
//   onOpenEditModal,
//   onCancelConsult,
// }: CreateColumnsProps): GridColDef[] {
interface createConsultColumsProps {
  onCancelConsult: (id: number) => void;
}

export default function createConsultColumns({
  onCancelConsult,
}: createConsultColumsProps): GridColDef[] {
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
    {
      field: 'id',
      headerName: 'Ações',
      width: 150,
      renderCell: params => {
        const { id } = params.row;
        return (
          <ButtonGroup variant="outlined">
            <Button onClick={() => onCancelConsult(id)}> Cancelar</Button>
          </ButtonGroup>
        );
      },
    },
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
