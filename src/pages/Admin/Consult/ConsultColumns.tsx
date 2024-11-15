import { GridColDef } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import { Cancel as CancelIcon, Edit as EditIcon, Check as CheckIcon } from '@mui/icons-material';

import { formatCpf } from '../../../utils/formatCpf';
import { Consult } from '../../../types/consult/consult';

interface createConsultColumsProps {
  handleCompleteConsult: (id: number) => void;
  handleOpenEditModal: (data: Consult) => void;
  handleCancelConsult: (id: number) => void;
}

export function consultColumns({
  handleCompleteConsult,
  handleOpenEditModal,
  handleCancelConsult,
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
      width: 300,
      renderCell: params => {
        const consult = params.row;
        const consultId = consult.id_consult || consult.id;
        if (consult.status == 'A') {
          return (
            <Box>
              <IconButton
                aria-label="success"
                onClick={() =>
                  handleCompleteConsult(consultId)
                }
              >
                <CheckIcon color="success" />
              </IconButton>
              <IconButton aria-label="edit" 
                onClick={() => handleOpenEditModal(consult)}>
                <EditIcon color="info" />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => handleCancelConsult(consultId)}>
                <CancelIcon color="error" />
              </IconButton>
            </Box>
          );
        } else {
          return null;
        }
      },
    },
  ];

  return columns;
}
