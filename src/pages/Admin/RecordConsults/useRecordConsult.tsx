import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { ConsultService } from '../../../services/ConsultService';
import { Consult } from '../../../types/consult/consult';
import { ConsultRequest } from '../../../types/consult/consultRequest';
import { APIError } from '../../../errors/ApiError';

export function useRecordConsult() {
  const [consults, setConsults] = useState<Consult[]>([]);
  const [loadingConsults, setLoadingConsults] = useState(true);
  const [isFormModalOpen, seIsFormModalOpen] = useState(false);
  const [descriptionData, setDescriptionData] = useState('');
  const [isPrescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [formData, setFormData] = useState<ConsultRequest | undefined>();

  async function loadConsults() {
    try {
      setLoadingConsults(true);
      const data = await ConsultService.getInstance().getHistoryConsults();
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
    setFormData(undefined);
    seIsFormModalOpen(true);
  }

  function handleCloseModal() {
    seIsFormModalOpen(false);
    setPrescriptionModalOpen(false);
  }

  async function handleShowConsultDescription(prescription?: string) {
    if (prescription != null) {
      setDescriptionData(prescription);
    } else {
      setDescriptionData('Sem descrição de consulta')
    }
    
    setPrescriptionModalOpen(true);
  }

  return {
    consults,
    loadingConsults,
    isFormModalOpen,
    descriptionData,
    isPrescriptionModalOpen,
    formData,
    loadConsults,
    handleOpenCreateModal,
    handleCloseModal,
    handleShowConsultDescription,
  };
}
