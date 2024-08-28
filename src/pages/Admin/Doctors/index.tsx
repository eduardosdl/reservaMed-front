import { useEffect, useState } from 'react';
import { AlertColor, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import Button from '../../../components/Button';
import Toast from '../../../components/Toast';
import ModalForm from './ModalForm';
import createColumns from './DefColumns';
import Doctor from '../../../types/doctor';
import DoctorService from '../../../services/DoctorService';

export default function Doctors() {
  // inicializacao dos estados
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [doctorCrmToEdit, setDoctorCrmToEdit] = useState('');
  const [toastIsVisible, setToastIsVisible] = useState(false);
  const [toastType, setToastType] = useState<AlertColor>('error');
  const [toastMessage, setToastMessage] = useState(
    'Houve um erro ao buscar médicos',
  );
  const [initialData, setInitialData] = useState<Doctor | undefined>(undefined);

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

  // carregamento dos dados na tabela
  useEffect(() => {
    getAllDoctors();
  }, []);

  function handleCreateDoctor(doctorData: Doctor) {
    DoctorService.createDoctor(doctorData)
      .then(data => {
        setDoctors(prevState => [...prevState, data]);
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

  function handleUpdateDoctor(doctorData: Doctor) {
    console.log(doctorData);
    DoctorService.updateDoctor(doctorCrmToEdit, doctorData)
      .then(updatedDoctor => {
        setDoctors(prevState =>
          prevState.map(doctor =>
            doctor.id === updatedDoctor.id ? updatedDoctor : doctor,
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

  function handleDeleteDoctor(crmToDelete: string) {
    DoctorService.deleteDoctor(crmToDelete)
      .then(() => {
        setDoctors(prevState =>
          prevState.filter(doctor => doctor.crm !== crmToDelete),
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
    setDoctorCrmToEdit('');
    setInitialData(undefined);
    setModalOpen(true);
  }

  function handleOpenEditModal(data: Doctor) {
    setDoctorCrmToEdit(data.crm);
    setInitialData(data);
    setModalOpen(true);
  }

  // valida se for criacao ou atualizacao de paciente
  function handleSubmit(data: Doctor) {
    if (doctorCrmToEdit) {
      handleUpdateDoctor(data);
      return;
    }
    handleCreateDoctor(data);
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
        rows={doctors}
        columns={createColumns({
          onOpenEditModal: handleOpenEditModal,
          onDeleteDoctor: handleDeleteDoctor,
        })}
      />
    </Box>
  );
}
