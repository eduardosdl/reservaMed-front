import { useParams } from 'react-router-dom';
import { Patient as IPatient } from '../../types/patient';
import { useEffect, useState } from 'react';
import { PatientService } from '../../services/PatientService';
import { APIError } from '../../errors/ApiError';
import { toast } from 'react-toastify';
import {
  Box,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { Doctor } from '../../types/doctor';
import { DoctorService } from '../../services/DoctorService';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/src/shared/types.js';
import { consultTypes } from '../../data/consultTypes';

export function Patient() {
  const { patientCpf } = useParams<{ patientCpf: string }>();

  const [patientData, setPatientData] = useState<IPatient>({} as IPatient);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedConsultType, setSelectedConsultType] = useState('');
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [selectedHour, setSelectedHour] = useState('');
  const [disponibility, setDisponibility] = useState<string[]>([
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ]);

  async function loadPatientData(patientCpf: string) {
    try {
      const data = await PatientService.getInstance().getPatient(patientCpf);
      setPatientData(data);
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
      toast.error('Houve um erro ao buscar consultas');
    }
  }

  async function loadDoctors() {
    try {
      const data = await DoctorService.getInstance().getAllDoctors();
      setDoctors(data);
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
      toast.error('Houve um erro ao buscar médicos');
    }
  }

  useEffect(() => {
    if (patientCpf) {
      loadPatientData(patientCpf);
      loadDoctors();
    } else {
      toast.error('Informe o seu CPF no parâmetro da URL');
    }
  }, [patientCpf]);

  function handleSelectHour(hour: string) {
    console.log('Agendamento de consulta');
    console.log({
      patientCpf,
      doctorId: selectedDoctor,
      date: selectedDate,
      hour: hour,
    });
  }

  return (
    <Container maxWidth="md" sx={{ paddingTop: '48px' }}>
      <Box display="flex" flexDirection="column" gap={4}>
        <Paper elevation={4}>
          <Box
            padding={2}
            display="flex"
            gap={4}
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Typography variant="body1" component="p">
              Nome: {patientData.name}
            </Typography>
            <Typography variant="body1" component="p">
              CPF: {patientData.cpf}
            </Typography>
            <Typography variant="body1" component="p">
              Email: {patientData.email}
            </Typography>
          </Box>
        </Paper>

        <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={4}>
          <FormControl sx={{ flex: 1, minWidth: '200px' }}>
            <InputLabel id="doctor-select-label">Selecione o Médico</InputLabel>
            <Select
              label="Selecione o Médico"
              labelId="doctor-select-label"
              value={selectedDoctor}
              onChange={e => setSelectedDoctor(e.target.value)}
            >
              {doctors.map(doctor => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {`${doctor.name} - ${doctor.specialty}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ flex: 1, minWidth: '200px' }}>
            <InputLabel id="consult-select-label">
              Selecione a consulta
            </InputLabel>
            <Select
              label="Selecione a consulta"
              labelId="consult-select-label"
              value={selectedConsultType}
              onChange={e => setSelectedConsultType(e.target.value)}
            >
              {consultTypes.map(type => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" justifyContent="center">
          <Calendar
            onChange={value => setSelectedDate(value)}
            value={selectedDate}
            minDate={new Date()}
          />

          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            padding={2}
            sx={{ overflowY: 'auto', maxHeight: '300px' }}
          >
            <Typography variant="body1" component="p">
              Escolha um horário
            </Typography>
            {disponibility.map(hour => (
              <Chip
                key={hour}
                label={hour}
                onClick={() => setSelectedHour(hour)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>

          <Box display="flex" flexDirection="column" gap={2} padding={2}>
            <Typography variant="body1" component="p"></Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
