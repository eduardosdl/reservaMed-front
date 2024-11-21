import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { ConsultService } from '../../../services/ConsultService';
import { getConsultTypeValue } from '../../../utils/getConsultTypeValue';
import { Consult } from '../../../types/consult/consult';
import { ConsultRequest } from '../../../types/consult/consultRequest';
import { APIError } from '../../../errors/ApiError';
import { isOlderThan24h } from '../../../utils/isBefore24h';

export function useConsult() {
  const [consults, setConsults] = useState<Consult[]>([]);
  const [loadingConsults, setLoadingConsults] = useState(true);
  const [isFormModalOpen, seIsFormModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isBefore24h, setIsBefore24h] = useState(false);
  const [consultIdToComplete, setConsultIdToComplete] = useState(0);
  const [consultIdToCancel, setConsultIdToCancel] = useState(0);
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
    setIsCancelModalOpen(false);
  }

  function handleCompleteConsult(id: number) {
    setIsCompleteModalOpen(true);
    setConsultIdToComplete(id);
  }
  async function handleCancelConsult(id: number) {
    const consultSelected = consults.find(consult => consult.id == id);
    setIsBefore24h(isOlderThan24h(consultSelected?.date || ''));

    setIsCancelModalOpen(true);
    setConsultIdToCancel(id);
  }

  return {
    consults,
    loadingConsults,
    isFormModalOpen,
    isCompleteModalOpen,
    consultIdToComplete,
    isCancelModalOpen,
    isBefore24h,
    consultIdToCancel,
    consultIdToEdit,
    formData,
    loadConsults,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleCompleteConsult,
    handleCancelConsult,
  };
}
