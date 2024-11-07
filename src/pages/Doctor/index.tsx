import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Box, Container, Paper, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { consultColumns } from './ConsultColumns';
import { APIError } from '../../errors/ApiError';
import { DoctorService } from '../../services/DoctorService';
import { DoctorConsults } from '../../types/doctorConsult';

export function Doctor() {
  const crm = useParams<{ doctorCrm: string }>();
  const [doctorConsults, setDoctorConsults] = useState<DoctorConsults>();
  const [loadingConsults, setLoadingConsults] = useState(true);

  async function loadConsults(doctorCrm: string) {
    try {
      setLoadingConsults(true);
      const data = await DoctorService.getInstance().getAllConsults(doctorCrm);
      setDoctorConsults(data);
      setLoadingConsults(false);
    } catch (error) {
      setLoadingConsults(false);
      if (error instanceof APIError) {
        toast.error(error.message);
      }
      toast.error('Houve um erro ao buscar consultas');
    }
  }

  useEffect(() => {
    if (crm.doctorCrm) {
      loadConsults(crm.doctorCrm);
    } else {
      toast.error('CRM não fornecido');
    }
  }, [crm.doctorCrm]);

  return (
    <Container maxWidth="md" sx={{ paddingTop: '48px'}}>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ marginBottom: 2 }} width="100%">
          <Paper sx={{ padding: 2 }} elevation={3}>
            <Typography gutterBottom variant="h6" component="p">Fila de espera: {doctorConsults?.pending}</Typography>
          </Paper>
        </Box>
        <Box sx={{ marginBottom: 2 }} width="100%">
          <Paper sx={{ padding: 2 }} elevation={3}>
            <Typography gutterBottom variant="h6" component="p">Atendidos: {doctorConsults?.attended}</Typography>
          </Paper>
        </Box>
      </Box>
      <DataGrid
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows={doctorConsults?.data}
        loading={loadingConsults}
        columns={consultColumns({
          handleCompleteConsult: () => {},
          handleOpenPatientRecord: () => {},
        })}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Container>
  );
}
