import { Container, TextField } from '@mui/material';
import Button from '../componentsOld/Button';
import TableConsult from '../componentsOld/TableConsult';
import Consult from '../types/consult';
import { useState } from 'react';
import ConsultService from '../services/ConsultService';
import Toast from '../componentsOld/Toast';
import formatCpf from '../utils/formatCpf';
import { toast } from 'react-toastify';

export default function ShowConsults() {
  const [consults, setConsults] = useState<Consult[]>([]);
  const [patientCpf, setPatientCpf] = useState('');

  function handleSearchCpf() {
    ConsultService.getConsultsByCpf(patientCpf.replace(/\D/g, ''))
      .then(consultsData => setConsults(consultsData))
      .catch(error => {
        toast.error(error.message);
      });
  }

  return (
    <Container maxWidth="md" sx={{ maxHeight: '100vh', py: 4 }}>
      <Toast />
      <TextField
        name="CPF do paciente"
        size="small"
        inputProps={{ maxLength: 14 }}
        value={formatCpf(patientCpf)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPatientCpf(event.target.value);
        }}
        sx={{ mb: 4, mr: 2 }}
      />
      <Button onClick={handleSearchCpf}>Buscar</Button>
      <TableConsult consultsData={consults} realoadData={handleSearchCpf} />
    </Container>
  );
}
