import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { CepService } from '../../services/CepService';
import { isValidCpf } from '../../utils/isValidCpf';
import { Patient } from '../../types/patient';

const patientSchema = z.object({
  name: z.string().min(1, 'Nome completo é obrigatório'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória.'),
  cpf: z
    .string()
    .min(1, 'CPF é obrigatório.')
    .refine(isValidCpf, { message: 'CPF inválido.' }),
  cellPhone: z.string().min(1, 'Telefone é obrigatório.'),
  email: z
    .string()
    .email({ message: 'Email inválido.' })
    .min(1, 'Email é obrigatório.'),
  cep: z.string().nullish(),
  street: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  allergy: z.string().nullish(),
  medicalHistory: z.string().nullish(),
  guardianCpf: z.string().nullish(),
});

type PatientFormValues = z.infer<typeof patientSchema>;

interface UsePatientFormProps {
  initialData?: Patient;
  onSubmit: (data: Patient) => void;
}

const emptyPatient = {
  name: '',
  birthDate: '',
  cpf: '',
  cellPhone: '',
  email: '',
  cep: '',
  street: '',
  city: '',
  state: '',
  allergy: '',
  guardianCpf: '',
  medicalHistory: '',
};

export function usePatientForm({ initialData, onSubmit }: UsePatientFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<PatientFormValues>({
    defaultValues: {
      ...emptyPatient,
    },
    resolver: zodResolver(patientSchema),
  });

  const watchBirthDate = watch('birthDate');

  const watchCep = watch('cep');

  useEffect(() => {
    const sanitizedData = {
      ...initialData,
      cep: initialData?.cep || '',
      street: initialData?.street || '',
      city: initialData?.city || '',
      state: initialData?.state || '',
      allergy: initialData?.allergy || '',
      guardianCpf: initialData?.guardianCpf || '',
      medicalHistory: initialData?.medicalHistory || '',
    };
    reset({ ...emptyPatient, ...sanitizedData });
  }, [initialData, reset]);

  const fetchAddressData = useCallback(
    (cep: string) => {
      CepService.getInstance()
        .getAddressFromCep(cep)
        .then(data => {
          setValue('street', data.logradouro);
          setValue('city', data.localidade);
          setValue('state', data.uf);
        })
        .catch(error => console.log(`Houve um erro ao buscar CEP: ${error}`));
    },
    [setValue],
  );

  useEffect(() => {
    const cleanedCep = watchCep?.replace(/\D/g, '');
    if (cleanedCep && cleanedCep.length === 8) {
      fetchAddressData(cleanedCep);
    }
  }, [watchCep, fetchAddressData]);

  function handleFormSubmit(data: PatientFormValues) {
    const formatData = {
      ...data,
      cpf: data.cpf.replace(/\D/g, ''),
      cellPhone: data.cellPhone.replace(/\D/g, ''),
      cep: data.cep?.replace(/\D/g, ''),
      guardianCpf: data.guardianCpf?.replace(/\D/g, ''),
    };
    onSubmit(formatData as Patient);
    reset();
  }

  function handleCepBlur() {
    const cleanedCep = watchCep?.replace(/\D/g, '');
    if (cleanedCep && cleanedCep.length === 8) {
      fetchAddressData(cleanedCep);
    }
  }

  return {
    control,
    handleSubmit,
    setValue,
    errors,
    reset,
    watchBirthDate,
    handleFormSubmit,
    handleCepBlur,
  };
}
