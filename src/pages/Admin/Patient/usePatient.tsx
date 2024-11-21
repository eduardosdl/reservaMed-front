import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { Patient } from '../../../types/patient';
import { PatientService } from '../../../services/PatientService';
import { APIError } from '../../../errors/ApiError';
import { PatientFormRefMethods } from '../../../components/PatientForm';

export function usePatient() {
  const [patients, setPatients] = useState<Patient[]>();
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditFrom, setIsEditForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patientIdToEdit, setPatientIdToEdit] = useState(0);

  const patientFormRef = useRef<PatientFormRefMethods | null>(null);

  async function loadPatients() {
    try {
      setLoadingPatients(true);
      const data = await PatientService.getInstance().getAllPatients();
      setPatients(data);
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      setLoadingPatients(false);
    }
  }

  useEffect(() => {
    loadPatients();
  }, []);

  async function handleOpenCreateModal() {
    setIsEditForm(false);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(data: Patient) {
    patientFormRef.current?.setFieldsValues(data);
    setPatientIdToEdit(data.id);
    setIsEditForm(true);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    patientFormRef.current?.resetFields();
    setIsModalOpen(false);
  }

  async function handleSubmit(data: Omit<Patient, 'id'>) {
    try {
      setIsSubmitting(true);
      if (isEditFrom) {
        await PatientService.getInstance().updatePatient(patientIdToEdit, data);
        toast.success('Paciente editado com sucesso');
      } else {
        await PatientService.getInstance().createPatient(data);
        toast.success('Paciente criado com sucesso');
      }

      await loadPatients();
      handleCloseModal();
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeletePatient(cpf: string) {
    try {
      await PatientService.getInstance().deletePatient(cpf);
      await loadPatients();
      toast.success('Paciente excluído com sucesso');
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    }
  }

  return {
    patients,
    loadingPatients,
    isModalOpen,
    isSubmitting,
    isEditFrom,
    patientFormRef,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSubmit,
    handleDeletePatient,
  };
}
