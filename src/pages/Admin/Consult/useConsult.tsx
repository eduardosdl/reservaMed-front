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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consultIdToEdit, setConsultIdToEdit] = useState<number | undefined>(
    10,
  );
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
    setIsModalOpen(true);
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
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleCompleteConsult(id: number) {
    console.log(id);
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
