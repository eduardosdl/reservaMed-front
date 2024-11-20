import { toast } from 'react-toastify';
import { APIError } from '../errors/ApiError';
import { Box, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Patient } from '../types/patient';
import { Doctor } from '../types/doctor';
import { Button } from './Button';
import { getConsultTypeValue } from '../utils/getConsultTypeValue';
import { ConsultService } from '../services/ConsultService';
import { useState } from 'react';

interface ConfirmConsultModalProps {
  isVisible: boolean;
  onClose: () => void;
  doctor: Doctor;
  patient: Patient;
  date: string;
  hour: string;
  type: string;
}

export function ConfirmConsultModal({
  isVisible,
  onClose,
  doctor,
  patient,
  date,
  hour,
  type,
}: ConfirmConsultModalProps) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateConsult() {
    try {
      setIsSubmitting(true);
      const consultData = {
        doctorId: doctor.id,
        patientCpf: patient.cpf,
        type: getConsultTypeValue(type),
        date: `${date}T${hour}`,
      };

      await ConsultService.getInstance().createConsult(consultData);
      toast.success('Consulta marcada com sucesso!');
      onClose();
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      } else {
        toast.error('Houve um erro ao marcar a consulta');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal open={isVisible} onClose={onClose}>
      <Box
        maxWidth={600}
        width={smDown ? `calc(100% - ${theme.spacing(2)})` : '100%'}
        padding={smDown ? theme.spacing(2) : theme.spacing(4)}
        maxHeight="80%"
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
        <Typography variant="body1" component="p">
          Nome do médico: {doctor.name}
        </Typography>
        <Typography variant="body1" component="p">
          Especialidade: {doctor.specialty}
        </Typography>
        <Typography variant="body1" component="p">
          Paciente: {patient.name}
        </Typography>
        <Typography variant="body1" component="p">
          CPF do Paciente: {patient.cpf}
        </Typography>
        <Typography variant="body1" component="p">
          Data: {new Date(`${date}T${hour}`).toLocaleString('pt-BR')}
        </Typography>
        <Typography variant="body1" component="p">
          Tipo de Consulta: {type}
        </Typography>
        <Button
          fullWidth
          onClick={handleCreateConsult}
          loading={isSubmitting}
          sx={{ marginTop: theme.spacing(2) }}
        >
          Agendar Consulta
        </Button>
      </Box>
    </Modal>
  );
}
