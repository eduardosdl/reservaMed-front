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

const consultSchema = z.object({
  id_doctor: z.number().min(1, 'Selecione um médico'),
  cpf_patient: z.string().min(1, 'Informe um CPF'),
  date: z.string().min(1, 'Data do agendamento é obrigatória'),
  type: z.nativeEnum(ConsultType, {
    errorMap: () => ({ message: 'Selecione o tipo de consulta' }),
  }),
});

type ConsultFormValues = z.infer<typeof consultSchema>;

interface UseConsultFormProps {
  initialData?: ConsultRequest;
  isEditForm: boolean;
}

// defaultValues: {
//   id_doctor: initialData?.doctor.id ?? 0,
//   cpf_patient: initialData?.patient.cpf ?? '',
//   date: initialData?.date ?? '',
//   type:
//     getConsultTypeValue(initialData?.type_consult || '') ??
//     ConsultType.ROUTINE_CHECKUP,
// },

const emptyConsult = {
  id_doctor: 0,
  cpf_patient: '',
  date: '',
  type: ConsultType.ROUTINE_CHECKUP,
};

export function useConsultForm({
  initialData,
  isEditForm,
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
        setValue('id_doctor', data[0].id || 0);
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
    console.log('Criar consulta');
    console.log(data);
  }

  async function handleUpdateConsult(data: ConsultRequest) {
    console.log('Editar consulta');
    console.log(data);
  }

  function handleFormSubmit(data: ConsultRequest) {
    setIsSubmitting(true);
    if (isEditForm) {
      handleUpdateConsult(data);
      return;
    }

    handleCreateConsult(data);
    setIsSubmitting(true);
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
