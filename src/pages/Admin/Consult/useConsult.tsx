import { useEffect, useState } from 'react';
import { ConsultService } from '../../../services/ConsultService';
import { Consult } from '../../../types/consult/consult';
import { APIError } from '../../../errors/ApiError';
import { toast } from 'react-toastify';
import { ConsultRequest } from '../../../types/consult/consultRequest';

export function useConsult() {
  const [consults, setConsults] = useState<Consult[]>([]);
  const [loadingConsults, setLoadingConsults] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [formData, setFormData] = useState<ConsultRequest | undefined>();

  async function loadConsults() {
    try {
      setLoadingConsults(true);
      const data = await ConsultService.getInstance().getAllConsults();
      setConsults(data);
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      setLoadingConsults(false);
    }
  }

  useEffect(() => {
    loadConsults();
  }, []);

  function handleOpenCreateModal() {
    setIsEditForm(false);
    setFormData(undefined);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleCompleteConsult(id: number) {
    console.log(id);
  }
  function handleUpdateConsult(data: Consult) {
    console.log(data);
  }
  function handleCancelConsult(id: number) {
    console.log(id);
  }
  function handleShowPrecription(id: number) {
    console.log(id);
  }

  return {
    consults,
    loadingConsults,
    isModalOpen,
    isEditForm,
    formData,
    handleOpenCreateModal,
    handleCloseModal,
    handleCompleteConsult,
    handleUpdateConsult,
    handleCancelConsult,
    handleShowPrecription,
  };
}
