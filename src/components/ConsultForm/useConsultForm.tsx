import { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { DoctorService } from '../../services/DoctorService';

import { ConsultType } from '../../types/consult/consultType';
import { Doctor } from '../../types/doctor';
import { ConsultRequest } from '../../types/consult/consultRequest';
import { APIError } from '../../errors/ApiError';
import { ConsultService } from '../../services/ConsultService';

const consultSchema = z.object({
  doctorId: z.number().min(1, 'Selecione um médico'),
  patientCpf: z.string().min(1, 'Informe um CPF'),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, 'Formato de data inválido')
    .refine(value => {
      const inputDate = new Date(value);
      const currentDate = new Date();
      return inputDate > currentDate;
    }, 'A data deve ser posterior ao dia atual'),
  type: z.nativeEnum(ConsultType, {
    errorMap: () => ({ message: 'Selecione o tipo de consulta' }),
  }),
});

type ConsultFormValues = z.infer<typeof consultSchema>;

interface UseConsultFormProps {
  initialData?: ConsultRequest;
  consultIdToEdit?: number;
  handleCloseModal: () => void;
  reloadData: () => void;
}

const emptyConsult = {
  id_doctor: 0,
  cpf_patient: '',
  date: '',
  type: ConsultType.ROUTINE_CHECKUP,
};

export function useConsultForm({
  initialData,
  consultIdToEdit,
  handleCloseModal,
  reloadData,
}: UseConsultFormProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ConsultFormValues>({
    resolver: zodResolver(consultSchema),
    defaultValues: {
      ...emptyConsult,
      ...initialData,
    },
  });

  const setConsultDoctor = useCallback(async () => {
    try {
      const data = await DoctorService.getInstance().getAllDoctors();
      setDoctors(data);
      if (!initialData && data.length > 0) {
        setValue('doctorId', data[0].id || 0);
      }
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    }
  }, [initialData, setValue]);

  useEffect(() => {
    setConsultDoctor();
  }, [setConsultDoctor]);

  useEffect(() => {
    reset({ ...emptyConsult, ...initialData });
  }, [initialData, reset]);

  async function handleCreateConsult(data: ConsultRequest) {
    try {
      const formatedData = {
        ...data,
        patientCpf: data.patientCpf.replace(/\D/g, ''),
      };
      setIsSubmitting(true);
      await ConsultService.getInstance().createConsult(formatedData);
      toast.success('Consulta agendada com sucesso');
      handleCloseModal();
      reloadData();
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdateConsult(consultId: number, data: ConsultRequest) {
    try {
      const formatedData = {
        ...data,
        patientCpf: data.patientCpf.replace(/\D/g, ''),
      };
      setIsSubmitting(true);
      await ConsultService.getInstance().updateConsult(consultId, formatedData);
      toast.success('Consulta alterada com sucesso');
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
      handleCloseModal();
      reloadData();
    }
  }

  function handleFormSubmit(data: ConsultRequest) {
    if (consultIdToEdit) {
      handleUpdateConsult(consultIdToEdit, data);
      reset();
      return;
    }

    handleCreateConsult(data);
    reset();
  }

  return {
    doctors,
    isSubmitting,
    control,
    errors,
    handleSubmit,
    handleFormSubmit,
  };
}
