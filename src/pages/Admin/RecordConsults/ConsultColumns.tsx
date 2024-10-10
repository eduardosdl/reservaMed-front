import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

import { Button } from '../../../components/Button';

import { formatCpf } from '../../../utils/formatCpf';

interface createConsultColumsProps {
  handleShowPrecription: (id: number) => void;
}

export function consultColumns({
  handleShowPrecription,
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
      width: 150,
      renderCell: params => formatCpf(params.row.patient.cpf),
    },
    {
      field: 'date',
      headerName: 'Data da consulta',
      width: 150,
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
      field: 'specialty',
      headerName: 'Especialidade',
      width: 200,
      renderCell: params => params.row.doctor.specialty,
    },
    {
      field: 'id',
      headerName: 'Ações',
      width: 300,
      renderCell: params => {
        const consult = params.row;
        const consultId = consult.id_consult || consult.id;
        switch (consult.status) {
          case 'C':
            return <Chip color="error" label="Cancelada" />;
          case 'P':
            return (
              <Button
                color="secondary"
                onClick={() => handleShowPrecription(consultId)}
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
