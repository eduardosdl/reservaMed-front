import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Box, Container, Paper, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { consultColumns } from './ConsultColumns';
import { APIError } from '../../errors/ApiError';
import { DoctorService } from '../../services/DoctorService';
import { DoctorConsults } from '../../types/doctorConsult';
import { CompleteConsult } from '../../components/CompleteConsult';
import { MedicalConsultsRecord } from '../../components/MedicalConsultsRecord';

export function Doctor() {
  const crm = useParams<{ doctorCrm: string }>();
  const [doctorConsults, setDoctorConsults] = useState<DoctorConsults>();
  const [loadingConsults, setLoadingConsults] = useState(true);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [consultIdToComplete, setConsultIdToComplete] = useState(0);
  const [patientName, setPatientName] = useState('');
  const [showMedicalConsultsRecord, setShowMedicalConsultsRecord] =
    useState(false);
  const [patientCpf, setPatientCpf] = useState('');

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
    if (crm?.doctorCrm) {
      loadConsults(crm.doctorCrm);
    } else {
      toast.error('CRM não fornecido');
    }
  }, [crm]);

  return (
    <>
      <CompleteConsult
        consultId={consultIdToComplete}
        open={isCompleteModalOpen}
        patientName={patientName}
        onClose={() => setIsCompleteModalOpen(false)}
        reloadData={() => crm?.doctorCrm && loadConsults(crm.doctorCrm)}
      />
      <MedicalConsultsRecord
        isModalVisible={showMedicalConsultsRecord}
        onClose={() => setShowMedicalConsultsRecord(false)}
        doctorCrm={crm?.doctorCrm || ''}
        patientCpf={patientCpf}
        patientName={patientName}
      />
      <Container maxWidth="md" sx={{ paddingTop: '48px' }}>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Box sx={{ marginBottom: 2, flex: '1 1 auto', minWidth: '200px' }}>
            <Paper sx={{ padding: '4px' }} elevation={3}>
              <Typography
                gutterBottom
                variant="h6"
                component="p"
                sx={{
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                }}
              >
                Fila de espera: {doctorConsults?.pending}
              </Typography>
            </Paper>
          </Box>
          <Box sx={{ marginBottom: 2, flex: '1 1 auto', minWidth: '200px' }}>
            <Paper sx={{ padding: '4px' }} elevation={3}>
              <Typography
                gutterBottom
                variant="h6"
                component="p"
                sx={{
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                }}
              >
                Atendidos: {doctorConsults?.attended}
              </Typography>
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
            handleCompleteConsult: (patientName, consultId) => {
              setPatientName(patientName);
              setConsultIdToComplete(consultId);
              setIsCompleteModalOpen(true);
            },
            handleOpenPatientRecord: (patientName, patientCpf) => {
              setPatientName(patientName);
              setPatientCpf(patientCpf);
              setShowMedicalConsultsRecord(true);
            },
          })}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </Container>
    </>
  );
}
