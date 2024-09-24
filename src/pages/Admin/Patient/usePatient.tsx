import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Patient } from '../../../types/patient';
import { PatientService } from '../../../services/PatientService';
import { APIError } from '../../../errors/ApiError';

export function usePatient() {
  const [patients, setPatients] = useState<Patient[]>();
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditFrom, setIsEditForm] = useState(false);
  const [formData, setFormData] = useState<Patient | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setFormData(undefined);
    setIsEditForm(false);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(data: Patient) {
    setFormData(data);
    setIsEditForm(true);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleSubmit(data: Omit<Patient, 'id'>) {
    try {
      setIsSubmitting(true);
      if (isEditFrom && formData) {
        await PatientService.getInstance().updatePatient(formData.cpf, data);
        toast.success('Paciente editado com sucesso');
      } else {
        await PatientService.getInstance().createPatient(data);
        toast.success('Paciente criado com sucesso');
      }

      await loadPatients();
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      handleCloseModal();
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
    formData,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSubmit,
    handleDeletePatient,
  };
}
