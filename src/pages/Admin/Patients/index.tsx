import { useEffect, useState } from 'react';
import { AlertColor, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import PatientService from '../../../services/PatientService';
import Patient from '../../../types/patient';
import Button from '../../../components/Button';
import Toast from '../../../components/Toast';
import ModalForm from './ModalForm';
import createColumns from './DefColumns';

export default function Patients() {
  // inicializacao dos estados
  const [patients, setPatients] = useState<Patient[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [patientCpfToEdit, setPatientCpfToEdit] = useState('');
  const [toastIsVisible, setToastIsVisible] = useState(false);
  const [toastType, setToastType] = useState<AlertColor>('error');
  const [toastMessage, setToastMessage] = useState(
    'Houve um erro ao buscar pacientes',
  );
  const [initialData, setInitialData] = useState<Patient | undefined>(
    undefined,
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

  // carregamento dos dados na tabela
  useEffect(() => {
    getAllPatients();
  }, []);

  function handleCreatePatient(patientData: Patient) {
    PatientService.createPatient(patientData)
      .then(data => {
        setPatients(prevState => [...prevState, data]);
        setToastType('success');
        setToastMessage('Paciente criado com sucesso');
        setToastIsVisible(true);
        setModalOpen(false);
      })
      .catch(error => {
        setToastType('error');
        setToastMessage(error.message);
        setToastIsVisible(true);
      });
  }

  function handleUpdatePatient(patientData: Patient) {
    console.log(patientData);
    PatientService.updatePatient(patientCpfToEdit, patientData)
      .then(updatedPatient => {
        setPatients(prevState =>
          prevState.map(patient =>
            patient.id === updatedPatient.id ? updatedPatient : patient,
          ),
        );
        setToastType('success');
        setToastMessage('Paciente alterado com sucesso');
        setToastIsVisible(true);
        setModalOpen(false);
      })
      .catch(error => {
        setToastType('error');
        setToastMessage(error.message);
        setToastIsVisible(true);
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
        setToastType('error');
        setToastMessage(
          'Houve um erro ao excluir paciente, tente novamente mais tarde',
        );
        setToastIsVisible(true);
      });
  }

  function handleOpenCreateModal() {
    setPatientCpfToEdit('');
    setInitialData(undefined);
    setModalOpen(true);
  }

  function handleOpenEditModal(data: Patient) {
    setPatientCpfToEdit(data.cpf);
    setInitialData(data);
    setModalOpen(true);
  }

  // valida se for criacao ou atualizacao de paciente
  function handleSubmit(data: Patient) {
    if (patientCpfToEdit) {
      handleUpdatePatient(data);
      return;
    }
    handleCreatePatient(data);
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
        isVisible={toastIsVisible}
        onClose={() => setToastIsVisible(false)}
        type={toastType}
        description={toastMessage}
      />
      <ModalForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={initialData}
        onSubmit={handleSubmit}
      />

      <Button sx={{ width: 'fit-content' }} onClick={handleOpenCreateModal}>
        Novo Paciente
      </Button>
      {/* renderiza a tabela de acordo com DefColumns */}
      <DataGrid
        rows={patients}
        columns={createColumns({
          onOpenEditModal: handleOpenEditModal,
          onDeletePatient: handleDeletePatient,
        })}
      />
    </Box>
  );
}
