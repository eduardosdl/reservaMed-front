import { AlertColor, Container } from '@mui/material';
import PatientService from '../services/PatientService';
import Toast from '../components/Toast';
import { useEffect, useState } from 'react';
import DoctorService from '../services/DoctorService';
import Doctor from '../types/doctor';
import Patient from '../types/patient';

export default function CreateConsult() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [toastIsVisible, setToastIsVisible] = useState(false);
  const [toastType, setToastType] = useState<AlertColor>('error');
  const [toastMessage, setToastMessage] = useState(
    'Houve um erro ao buscar médicos',
  );

  function getAllPatients() {
    PatientService.getAllPatients()
      .then(data => {
        setPatients(data);
      })
      .catch(error => {
        console.error('Houve um erro ao buscar pacientes:', error);
        setToastType('error');
        setToastMessage('Houve um erro ao buscar pacientes');
        setToastIsVisible(true);
      });
  }

  function getAllDoctors() {
    DoctorService.getAllDoctors()
      .then(data => {
        setDoctors(data);
      })
      .catch(error => {
        console.error('Houve um erro ao buscar médicos:', error);
        setToastType('error');
        setToastMessage('Houve um erro ao buscar médicos');
        setToastIsVisible(true);
      });
  }

  useEffect(() => {
    getAllDoctors();
    getAllPatients();
  }, []);

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Toast
        isVisible={toastIsVisible}
        onClose={() => setToastIsVisible(false)}
        type={toastType}
        description={toastMessage}
      />
      <h1>Hello</h1>
    </Container>
  );
}
