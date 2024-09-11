import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import PatientColumns from './PatientColumns';
import PatientService from '../../../services/PatientService';
import Button from '../../../components/Button';
import ModalForm from '../../../components/ModalForm';
import Toast from '../../../components/Toast';
import PatientForm from '../../../components/PatientForm';
import Patient from '../../../types/patient';

export default function Patients() {
  // inicializacao dos estados
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientCpfToEdit, setPatientCpfToEdit] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialData, setInitialData] = useState<Patient | undefined>(
    undefined,
  );

  function getAllPatients() {
    setIsLoading(true);
    PatientService.getAllPatients()
      .then(data => {
        setPatients(data);
      })
      .catch(error => {
        toast('Houve um erro ao buscar pacientes, tente novamente mais tarde');
        console.error('Houve um erro ao buscar pacientes:', error);
      })
      .finally(() => setIsLoading(false));
  }

  // carregamento dos dados na tabela ao abrir
  useEffect(() => {
    getAllPatients();
  }, []);

  function handleCreatePatient(patientData: Patient) {
    setIsLoading(true);
    PatientService.createPatient(patientData)
      .then(data => {
        setPatients(prevState => [...prevState, data]);
        toast.success('Paciente criado com sucesso');
        setModalOpen(false);
      })
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdatePatient(patientData: Patient) {
    setIsLoading(true);
    PatientService.updatePatient(patientCpfToEdit, patientData)
      .then(updatedPatient => {
        setPatients(prevState =>
          prevState.map(patient =>
            patient.id === updatedPatient.id ? updatedPatient : patient,
          ),
        );
        toast.success('Paciente alterado com sucesso');
        setModalOpen(false);
      })
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  }

  function handleDeletePatient(cpfToDelete: string) {
    setIsLoading(true);
    PatientService.deletePatient(cpfToDelete)
      .then(() => {
        setPatients(prevState =>
          prevState.filter(patient => patient.cpf !== cpfToDelete),
        );
        toast.success('Paciente excluído com sucesso');
      })
      .catch(error => {
        toast(error.message);
      })
      .finally(() => setIsLoading(false));
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
      <Toast />
      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)}>
        <PatientForm
          onSubmit={handleSubmit}
          initialData={initialData}
          isLoading={isLoading}
        />
      </ModalForm>

      <Button sx={{ width: 'fit-content' }} onClick={handleOpenCreateModal}>
        Novo Paciente
      </Button>
      {/* renderiza a tabela de acordo com DefColumns */}
      <DataGrid
        rows={patients}
        loading={isLoading}
        columns={PatientColumns({
          handleOpenEditModal: handleOpenEditModal,
          handleDeletePatient: handleDeletePatient,
        })}
      />
    </Box>
  );
}
