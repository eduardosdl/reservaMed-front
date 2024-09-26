import { useEffect, useState } from 'react';
import { Doctor } from '../../../types/doctor';
import { DoctorService } from '../../../services/DoctorService';
import { toast } from 'react-toastify';
import { APIError } from '../../../errors/ApiError';

export function useDoctor() {
  const [doctors, setDoctors] = useState<Doctor[]>();
  const [loadingDoctors, setLoadingDoctor] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Doctor | undefined>(undefined);

  async function loadDoctors() {
    try {
      setLoadingDoctor(true);
      const data = await DoctorService.getInstance().getAllDoctors();
      setDoctors(data);
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      setLoadingDoctor(false);
    }
  }

  useEffect(() => {
    loadDoctors();
  }, []);

  function handleOpenCreateModal() {
    setFormData(undefined);
    setIsEditForm(false);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(data: Doctor) {
    setFormData(data);
    setIsEditForm(true);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleSubmit(data: Omit<Doctor, 'id'>) {
    try {
      if (isEditForm) {
        await DoctorService.getInstance().updateDoctor(data.crm, data);
        toast.success('Médico atualizado com sucesso');
      } else {
        await DoctorService.getInstance().createDoctor(data);
        toast.success('Médico criado com sucesso');
      }
      await loadDoctors();
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
      handleCloseModal();
    }
  }

  async function handleDeleteDoctor(crm: string) {
    try {
      setIsSubmitting(true);
      await DoctorService.getInstance().deleteDoctor(crm);
      toast.success('Médico excluído com sucesso');
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    }
  }

  return {
    doctors,
    loadingDoctors,
    isModalOpen,
    isEditForm,
    formData,
    isSubmitting,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSubmit,
    handleDeleteDoctor,
  };
}
