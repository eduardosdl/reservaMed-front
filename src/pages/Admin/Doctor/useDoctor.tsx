import { useEffect, useRef, useState } from 'react';
import { Doctor } from '../../../types/doctor';
import { DoctorService } from '../../../services/DoctorService';
import { toast } from 'react-toastify';
import { APIError } from '../../../errors/ApiError';
import { DoctorFormRefMethods } from '../../../components/DoctorForm';

export function useDoctor() {
  const [doctors, setDoctors] = useState<Doctor[]>();
  const [loadingDoctors, setLoadingDoctor] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doctorCrmToEdit, setDoctorCrmToEdit] = useState('');

  const doctorFormRef = useRef<DoctorFormRefMethods | null>(null);

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
    setIsEditForm(false);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(data: Doctor) {
    doctorFormRef.current?.setFieldsValues(data);
    setDoctorCrmToEdit(data.crm);
    setIsEditForm(true);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    doctorFormRef.current?.resetFields();
    setIsModalOpen(false);
  }

  async function handleSubmit(data: Omit<Doctor, 'id'>) {
    try {
      if (isEditForm) {
        await DoctorService.getInstance().updateDoctor(doctorCrmToEdit, data);
        toast.success('Médico atualizado com sucesso');
      } else {
        await DoctorService.getInstance().createDoctor(data);
        toast.success('Médico criado com sucesso');
      }
      await loadDoctors();
      handleCloseModal();
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteDoctor(crm: string) {
    try {
      setIsSubmitting(true);
      await DoctorService.getInstance().deleteDoctor(crm);
      await loadDoctors();
      toast.success('Médico excluído com sucesso');
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    doctors,
    loadingDoctors,
    isModalOpen,
    isEditForm,
    isSubmitting,
    doctorFormRef,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSubmit,
    handleDeleteDoctor,
  };
}
