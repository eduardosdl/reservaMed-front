import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import PatientService from '../../services/PatientService';
import Patient from '../../types/patient';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import ModalForm from './ModalForm';
import createColumns from './DefColumns';

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [formModalIsVisible, setFormModalIsVisible] = useState(false);
  const [deleteSuccessIsVisible, setDeleteSuccessIsVisible] = useState(false);
  const [errorIsVisible, setErrorIsVisible] = useState(false);
  const [errorText, setErrorText] = useState(
    'Houve um erro ao buscar pacientes',
  );
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(
    undefined,
  );

  function getAllPatients() {
    PatientService.getAllPatients()
      .then(data => setPatients(data))
      .catch(error => {
        console.error('Houve um erro ao buscar pacientes:', error);
        setErrorText('Houve um erro ao buscar pacientes');
        setErrorIsVisible(true);
      });
  }

  useEffect(() => {
    getAllPatients();
  }, []);

  function handleSubmitCreatePatient(patientData: Patient) {
    PatientService.createPatient(patientData)
      .then(data => {
        setPatients(prevState => [...prevState, data]);
      })
      .catch(error => {
        console.log(`Houve um erro ao criar paciente: ${error}`);
        setErrorText(
          'Houve um erro ao criar paciente, tente novamente mais tarde',
        );
        setErrorIsVisible(true);
      });
  }

  function handleSubmitUpdatePatient(patientData: Patient) {
    PatientService.updatePatient(patientData)
      .then(updatedPatient => {
        setPatients(prevState =>
          prevState.map(patient =>
            patient.cpf === updatedPatient.cpf ? updatedPatient : patient,
          ),
        );
        setFormModalIsVisible(false);
      })
      .catch(error => {
        console.log(`Houve um erro ao atualizar paciente: ${error}`);
        setErrorText(
          'Houve um erro ao atualizar paciente, tente novamente mais tarde',
        );
        setErrorIsVisible(true);
      });
  }

  function handleDeletePatient(cpfToDelete: string) {
    PatientService.deletePatient(cpfToDelete)
      .then(() => {
        setPatients(prevState =>
          prevState.filter(patient => patient.cpf !== cpfToDelete),
        );
      })
      .catch(error => {
        console.log(`Houve um erro ao excluir paciente: ${error}`);
        setErrorText(
          'Houve um erro ao excluir paciente, tente novamente mais tarde',
        );
        setErrorIsVisible(true);
      });
  }

  function openCreateForm() {
    setSelectedPatient(undefined);
    setFormModalIsVisible(true);
  }

  function openEditForm(patient: Patient) {
    setSelectedPatient(patient);
    setFormModalIsVisible(true);
  }

  return (
    <Box
      sx={{
        position: 'relative',
        height: '90%',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Toast
        isVisible={errorIsVisible}
        onClose={() => setErrorIsVisible(false)}
        type="error"
        description={errorText}
      />
      <Toast
        isVisible={deleteSuccessIsVisible}
        onClose={() => setDeleteSuccessIsVisible(false)}
        type="success"
        description="Paciente exclído com sucesso"
      />
      <ModalForm
        isVisible={formModalIsVisible}
        onClose={() => {
          setFormModalIsVisible(false);
          setSelectedPatient(undefined);
        }}
        onSubmit={
          selectedPatient
            ? handleSubmitUpdatePatient
            : handleSubmitCreatePatient
        }
        patient={selectedPatient}
      />

      <Button sx={{ width: 'fit-content' }} onClick={openCreateForm}>
        Novo Paciente
      </Button>
      <DataGrid
        rows={patients}
        columns={createColumns({
          onOpenEditForm: openEditForm,
          onOpenDeleteModal: handleDeletePatient,
        })}
      />
    </Box>
  );
}
