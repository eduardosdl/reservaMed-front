import { useCallback, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { CepService } from '../../services/CepService';
import { isValidCpf } from '../../utils/isValidCpf';
import { Patient } from '../../types/patient';
import { PatientFormRefMethods } from '.';

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

export function usePatientForm(
  { onSubmit }: UsePatientFormProps,
  ref: React.Ref<PatientFormRefMethods>,
) {
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

  useImperativeHandle(ref, () => ({
    setFieldsValues: (patient: Patient) => {
      reset({
        name: patient?.name || '',
        birthDate: patient?.birthDate || '',
        cpf: patient?.cpf || '',
        cellPhone: patient?.cellPhone || '',
        email: patient?.email || '',
        cep: patient?.cep || '',
        street: patient?.street || '',
        city: patient?.city || '',
        state: patient?.state || '',
        allergy: patient?.allergy || '',
        guardianCpf: patient?.guardianCpf || '',
        medicalHistory: patient?.medicalHistory || '',
      });
    },
    resetFields: () => reset(),
  }));

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
  }

  function handleCepBlur() {
    const cleanedCep = watchCep?.replace(/\D/g, '');
    if (cleanedCep && cleanedCep.length === 8) {
      fetchAddressData(cleanedCep);
    }
  }

  return {
    control,
    errors,
    watchBirthDate,
    handleSubmit,
    setValue,
    handleFormSubmit,
    handleCepBlur,
  };
}
