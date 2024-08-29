import { GridColDef } from '@mui/x-data-grid';
import formatCpf from '../../utils/formatCpf';
import { Box } from '@mui/material';
import Button from '../Button';

interface createConsultColumsProps {
  onCompleteConsult: (id: number) => void;
}

export default function createConsultColumns({
  onCompleteConsult,
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
      width: 350,
      renderCell: params => {
        const { id, status } = params.row;
        return (
          <Box>
            {status != 'P' && (
              <Button onClick={() => onCompleteConsult(id)} color="success">
                Completar
              </Button>
            )}
          </Box>
        );
      },
    },
  ];

  return columns;
}
