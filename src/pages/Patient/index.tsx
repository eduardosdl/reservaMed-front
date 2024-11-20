import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import { Value as DateType } from 'react-calendar/src/shared/types.js';
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

import { PatientService } from '../../services/PatientService';
import { APIError } from '../../errors/ApiError';
import { Doctor } from '../../types/doctor';
import { DoctorService } from '../../services/DoctorService';
import { consultTypes } from '../../data/consultTypes';
import { Patient as IPatient } from '../../types/patient';
import { ConsultService } from '../../services/ConsultService';
import { ConfirmConsultModal } from '../../components/ConfirmConsultModal';

export function Patient() {
  const { patientCpf } = useParams<{ patientCpf: string }>();

  const [patientData, setPatientData] = useState<IPatient>({} as IPatient);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>({} as Doctor);
  const [selectedConsultType, setSelectedConsultType] = useState('');
  const [selectedDate, setSelectedDate] = useState<DateType>(new Date());
  const [selectedFormattedDate, setSelectedFormattedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [disponibility, setDisponibility] = useState<string[]>([]);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

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

  async function handleSelectDate(date: DateType) {
    try {
      setSelectedDate(date);

      if (!(selectedDoctorId != '' && selectedConsultType != '')) {
        toast.error('Selecione um médico e o tipo de consulta');
        return;
      }

      if (date == null) {
        toast.error('Informe uma data');
        return;
      }

      const formattedDate = new Date(date.toString()).toJSON().split('T')[0];
      setSelectedFormattedDate(formattedDate);

      const data = await ConsultService.getInstance().getAvailability(
        selectedDoctorId,
        formattedDate,
      );

      setDisponibility(data);
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
      toast.error('Houve um erro ao buscar disponibilidade');
    }
  }

  function handleSelectHour(hour: string) {
    const selectedDoctor = doctors.find(
      doc => doc.id.toString() == selectedDoctorId,
    );

    setSelectedHour(hour);
    setSelectedDoctor(selectedDoctor as Doctor);
    setIsConfirmModalVisible(true);
  }

  return (
    <Container maxWidth="md" sx={{ paddingTop: '48px' }}>
      <ConfirmConsultModal
        doctor={selectedDoctor}
        patient={patientData}
        type={selectedConsultType}
        isVisible={isConfirmModalVisible}
        onClose={() => setIsConfirmModalVisible(false)}
        date={selectedFormattedDate}
        hour={selectedHour}
      />

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

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          gap={4}
        >
          <FormControl sx={{ flex: 1, minWidth: '200px' }}>
            <InputLabel id="doctor-select-label">Selecione o Médico</InputLabel>
            <Select
              label="Selecione o Médico"
              labelId="doctor-select-label"
              value={selectedDoctorId}
              onChange={e => setSelectedDoctorId(e.target.value)}
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
            onChange={value => handleSelectDate(value)}
            value={selectedDate}
            minDate={new Date()}
            calendarType="gregory"
          />

          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            padding={2}
            sx={{ overflowY: 'auto', maxHeight: '300px' }}
          >
            <Typography variant="body1" component="p">
              Escolha uma hora
            </Typography>
            {disponibility.map(hour => (
              <Chip
                key={hour}
                label={hour}
                onClick={() => handleSelectHour(hour)}
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
