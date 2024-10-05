import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { ConsultService } from '../../../services/ConsultService';
import { getConsultTypeValue } from '../../../utils/getConsultTypeValue';
import { Consult } from '../../../types/consult/consult';
import { ConsultRequest } from '../../../types/consult/consultRequest';
import { APIError } from '../../../errors/ApiError';

export function useConsult() {
  const [consults, setConsults] = useState<Consult[]>([]);
  const [loadingConsults, setLoadingConsults] = useState(true);
  const [isFormModalOpen, seIsFormModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [consultIdToComplete, setConsultIdToComplete] = useState(0);
  const [consultIdToEdit, setConsultIdToEdit] = useState<number | undefined>();
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
    setConsultIdToEdit(undefined);
    setFormData(undefined);
    seIsFormModalOpen(true);
  }

  function handleOpenEditModal(data: Consult) {
    const requestData: ConsultRequest = {
      id_doctor: data.doctor.id,
      cpf_patient: data.patient.cpf,
      date: data.date,
      type: getConsultTypeValue(data.type_consult),
    };

    setConsultIdToEdit(data.id);
    setFormData(requestData);
    seIsFormModalOpen(true);
  }

  function handleCloseModal() {
    seIsFormModalOpen(false);
    setIsCompleteModalOpen(false);
  }

  function handleCompleteConsult(id: number) {
    setIsCompleteModalOpen(true);
    setConsultIdToComplete(id);
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
    isFormModalOpen,
    isCompleteModalOpen,
    consultIdToComplete,
    consultIdToEdit,
    formData,
    loadConsults,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleCompleteConsult,
    handleCancelConsult,
    handleShowPrecription,
  };
}
