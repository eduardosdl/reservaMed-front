import { GridColDef } from '@mui/x-data-grid';
import formatCpf from '../../utils/formatCpf';
import { Box, Chip } from '@mui/material';
import Button from '../Button';
import Consult from '../../types/consult';

interface createConsultColumsProps {
  onCompleteConsult: (id: number) => void;
  onUpdateConsult: (data: Consult) => void;
  onCancelConsult: (id: number) => void;
  onShowPrecription: (id: number) => void;
}

export default function createConsultColumns({
  onCompleteConsult,
  onUpdateConsult,
  onCancelConsult,
  onShowPrecription,
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
      headerName: 'CPF do paciente',
      width: 200,
      renderCell: params => formatCpf(params.row.patient.cpf),
    },
    {
      field: 'date',
      headerName: 'Data da consulta',
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
        const consult = params.row;
        switch (consult.status) {
          case 'A':
            return (
              <Box>
                <Button
                  onClick={() => onCompleteConsult(consult.id)}
                  color="success"
                >
                  Completar
                </Button>
                <Button sx={{ mx: 1 }} onClick={() => onUpdateConsult(consult)}>
                  Alterar
                </Button>
                <Button
                  onClick={() => onCancelConsult(consult.id)}
                  color="error"
                >
                  Cancelar
                </Button>
              </Box>
            );
          case 'C':
            return <Chip color="error" label="Cancelada" />;
          case 'P':
            return (
              <Button
                color="secondary"
                onClick={() => onShowPrecription(consult.id)}
              >
                Diagnostico
              </Button>
            );
          default:
            return null;
        }
      },
    },
  ];

  return columns;
}
