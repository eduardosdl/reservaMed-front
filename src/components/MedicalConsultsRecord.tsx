import { Box, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { DoctorService } from '../services/DoctorService';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Consult } from '../types/consult/consult';
import { APIError } from '../errors/ApiError';
import { toast } from 'react-toastify';

const consultRecordColumns: GridColDef[] = [
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
    field: 'description',
    headerName: 'Descrição',
    flex: 1,
    type: 'string',
    renderCell: params => (
      <div
        style={{
          whiteSpace: 'normal',
          lineHeight: 1.5,
          overflowY: 'auto',
          padding: '4px',
        }}
      >
        {params.value}
      </div>
    ),
  },
];

interface MedicalConsultsRecordProps {
  isModalVisible: boolean;
  doctorCrm: string;
  patientCpf: string;
  patientName: string;
  onClose: () => void;
}

export function MedicalConsultsRecord({
  isModalVisible,
  doctorCrm,
  patientCpf,
  patientName,
  onClose,
}: MedicalConsultsRecordProps) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [consults, setConsults] = useState<Consult[]>([]);

  async function getConsultRecord(doctorCrm: string, patientCpf: string) {
    try {
      const data = await DoctorService.getInstance().getConsultsByCrmAndCpf(
        doctorCrm,
        patientCpf,
      );
      setConsults(data);
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      } else {
        toast.error('Houve um erro ao buscar consultas');
      }
    }
  }

  useEffect(() => {
    if (isModalVisible) {
      getConsultRecord(doctorCrm, patientCpf);
    }
  }, [isModalVisible, doctorCrm, patientCpf]);

  return (
    <Modal open={isModalVisible} onClose={onClose}>
      <Box
        maxWidth={600}
        width={smDown ? `calc(100% - ${theme.spacing(2)})` : '100%'}
        padding={smDown ? theme.spacing(2) : theme.spacing(4)}
        overflow="auto"
        boxShadow={theme.shadows[24]}
        bgcolor={theme.palette.background.paper}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Nome do paciente: {patientName}
        </Typography>
        <DataGrid
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          rows={consults}
          columns={consultRecordColumns}
          autoHeight
          rowHeight={100}
        />
      </Box>
    </Modal>
  );
}
