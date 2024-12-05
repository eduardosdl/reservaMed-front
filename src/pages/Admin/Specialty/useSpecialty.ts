import { useEffect, useRef, useState } from 'react';
import { Specialty } from '../../../types/Specialty';
import { SpecialtyService } from '../../../services/SpecialtyService';
import { APIError } from '../../../errors/ApiError';
import { toast } from 'react-toastify';
import { SpecialtyFormRefMathods } from '../../../components/SpecialtyForm';

export function useSpecialty() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loadingSpecialties, setLoadingSpecialties] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [specialtyIdToEdit, setSpecialtyIdToEdit] = useState(0);

  const specialtyFormRef = useRef<SpecialtyFormRefMathods | null>(null);

  async function loadSpecialties() {
    try {
      setLoadingSpecialties(true);
      const response = await SpecialtyService.getInstance().getAllSpecialty();
      setSpecialties(response);
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      setLoadingSpecialties(false);
    }
  }

  useEffect(() => {
    loadSpecialties();
  }, []);

  function handleOpenCreateModal() {
    setIsEditForm(false);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(data: Specialty) {
    console.log('edit', data);
    specialtyFormRef.current?.setFieldsValues(data);
    setSpecialtyIdToEdit(data.id);
    setIsEditForm(true);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    specialtyFormRef.current?.resetFields();
    setIsModalOpen(false);
  }

  async function handleSubmit(data: Omit<Specialty, 'id'>) {
    setIsSubmitting(true);
    try {
      if (isEditForm) {
        await SpecialtyService.getInstance().updateSpecialty(
          specialtyIdToEdit,
          data,
        );
        toast.success('Médico atualizado com sucesso');
      } else {
        await SpecialtyService.getInstance().createSpecialty(data);
        toast.success('Médico criado com sucesso');
      }
      await loadSpecialties();
      handleCloseModal();
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    console.log('delete', id);
    try {
      setIsSubmitting(true);
      await SpecialtyService.getInstance().deleteSpecialty(id);
      await loadSpecialties();
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
    specialties,
    loadingSpecialties,
    isSubmitting,
    isModalOpen,
    isEditForm,
    specialtyFormRef,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleSubmit,
    handleCloseModal,
    handleDelete,
  };
}
