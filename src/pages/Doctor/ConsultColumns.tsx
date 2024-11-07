import { GridColDef } from '@mui/x-data-grid';
import { ButtonGroup, IconButton } from '@mui/material';
import { CheckCircle as CheckIcon, Book as BookIcon } from '@mui/icons-material';

import { formatCpf } from '../../utils/formatCpf';

interface createConsultColumsProps {
  handleCompleteConsult: (id: number) => void;
  handleOpenPatientRecord: (id: number) => void;
}

export function consultColumns({
  handleCompleteConsult,
  handleOpenPatientRecord,
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
      field: 'consultType',
      headerName: 'Tipo da Consulta',
      width: 200,
      renderCell: params => params.row.type_consult,
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
      width: 150,
      renderCell: params => {
        const consult = params.row;
        const consultId = consult.id_consult || consult.id;
        if (consult.status == 'A') {
          return (
            <ButtonGroup variant="outlined">
              <IconButton aria-label="edit" onClick={() => handleOpenPatientRecord(consult.patient.id)}>
                <BookIcon color="info" />
              </IconButton>
              <IconButton aria-label="success" onClick={() => handleCompleteConsult(consultId)}>
                <CheckIcon color="success" />
              </IconButton>
            </ButtonGroup>
          );
        } else {
          return null;
        }
      },
    },
  ];

  return columns;
}
