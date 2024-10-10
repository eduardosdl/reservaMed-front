import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { ConsultService } from '../../../services/ConsultService';
import { Consult } from '../../../types/consult/consult';
import { ConsultRequest } from '../../../types/consult/consultRequest';
import { APIError } from '../../../errors/ApiError';
import { Prescription } from '../../../types/prescription';

export function useRecordConsult() {
  const [consults, setConsults] = useState<Consult[]>([]);
  const [loadingConsults, setLoadingConsults] = useState(true);
  const [isFormModalOpen, seIsFormModalOpen] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState<Prescription>();
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

  async function handleShowPrecription(id: number) {
    try {
      const prescription =
        await ConsultService.getInstance().getPrescription(id);
      setPrescriptionData(prescription);
      setPrescriptionModalOpen(true);
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    }
  }

  return {
    consults,
    loadingConsults,
    isFormModalOpen,
    prescriptionData,
    isPrescriptionModalOpen,
    formData,
    loadConsults,
    handleOpenCreateModal,
    handleCloseModal,
    handleShowPrecription,
  };
}
