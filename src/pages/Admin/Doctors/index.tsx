import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import DoctorColums from './DoctorColumns';
import Button from '../../../components/Button';
import Toast from '../../../components/Toast';
import ModalForm from '../../../components/ModalForm';
import DoctorForm from '../../../components/DoctorForm';
import DoctorService from '../../../services/DoctorService';
import Doctor from '../../../types/doctor';

export default function Doctors() {
  // inicializacao dos estados
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorCrmToEdit, setDoctorCrmToEdit] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialData, setInitialData] = useState<Doctor | undefined>(undefined);

  function getAllDoctors() {
    setIsLoading(true);
    DoctorService.getAllDoctors()
      .then(data => {
        setDoctors(data);
      })
      .catch(error => {
        toast('Houve um erro ao buscar médicos, tente novamente mais tarde');
        console.error('Houve um erro ao buscar médicos:', error);
      })
      .finally(() => setIsLoading(false));
  }

  // carregamento dos dados na tabela
  useEffect(() => {
    getAllDoctors();
  }, []);

  function handleCreateDoctor(doctorData: Doctor) {
    setIsLoading(true);
    DoctorService.createDoctor(doctorData)
      .then(data => {
        setDoctors(prevState => [...prevState, data]);
        toast.success('Médico criado com sucesso');
        setModalOpen(false);
      })
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateDoctor(doctorData: Doctor) {
    setIsLoading(true);
    DoctorService.updateDoctor(doctorCrmToEdit, doctorData)
      .then(updatedDoctor => {
        setDoctors(prevState =>
          prevState.map(doctor =>
            doctor.id === updatedDoctor.id ? updatedDoctor : doctor,
          ),
        );
        toast.success('Médico alterado com sucesso');
        setModalOpen(false);
      })
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  }

  function handleDeleteDoctor(crmToDelete: string) {
    setIsLoading(true);
    DoctorService.deleteDoctor(crmToDelete)
      .then(() => {
        setDoctors(prevState =>
          prevState.filter(doctor => doctor.crm !== crmToDelete),
        );
        toast.success('Médico excluído com sucesso');
      })
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
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
      <Toast />

      <ModalForm open={modalOpen} onClose={() => setModalOpen(false)}>
        <DoctorForm
          onSubmit={handleSubmit}
          initialData={initialData}
          isLoading={isLoading}
        />
      </ModalForm>

      <Button
        sx={{ width: 'fit-content' }}
        onClick={() => {
          setDoctorCrmToEdit('');
          setInitialData(undefined);
          setModalOpen(true);
        }}
      >
        Novo Médico
      </Button>
      {/* renderiza a tabela de acordo com DefColumns */}
      <DataGrid
        rows={doctors}
        loading={isLoading}
        columns={DoctorColums({
          handleOpenEditModal: data => {
            setDoctorCrmToEdit(data.crm);
            setInitialData(data);
            setModalOpen(true);
          },
          handleDeleteDoctor: handleDeleteDoctor,
        })}
      />
    </Box>
  );
}
