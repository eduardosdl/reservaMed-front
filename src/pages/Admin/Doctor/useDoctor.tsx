import { useEffect, useState } from 'react';
import { Doctor } from '../../../types/doctor';
import { DoctorService } from '../../../services/DoctorService';
import { toast } from 'react-toastify';
import { APIError } from '../../../errors/ApiError';

export function useDoctor() {
  const [doctors, setDoctors] = useState<Doctor[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingDoctors, setLoadingDoctor] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doctorCrmToEdit, setDoctorCrmToEdit] = useState<string>();
  const [formInitialData, setFormInitialData] = useState<Doctor | undefined>(
    undefined,
  );

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
    setFormInitialData(undefined);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(data: Doctor) {
    setDoctorCrmToEdit(data.crm);
    setFormInitialData(data);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleSubmit(data: Doctor) {
    try {
      if (doctorCrmToEdit) {
        await DoctorService.getInstance().updateDoctor(doctorCrmToEdit, data);
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
    isModalOpen,
    loadingDoctors,
    isSubmitting,
    formInitialData,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSubmit,
    handleDeleteDoctor,
  };
}
