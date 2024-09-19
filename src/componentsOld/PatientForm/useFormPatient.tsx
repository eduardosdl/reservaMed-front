import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import isMinor from '../../utils/isMinor';
import Patient from '../../types/patient';
import CepService from '../../services/CepService';

const patientSchema = z.object({
  name: z.string().min(1, 'Nome completo é obrigatório'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória.'),
  cpf: z.string().min(1, 'CPF é obrigatório.'),
  cellPhone: z.string().min(1, 'Telefone é obrigatório.'),
  email: z
    .string()
    .email({ message: 'Email inválido.' })
    .min(1, 'Email é obrigatório.'),
  cep: z.string().nullable(),
  street: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  allergy: z.string().nullable(),
  medicalHistory: z.string().nullable(),
  guardianCpf: z.string().nullable(),
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

export default function usePatientForm({
  initialData,
  onSubmit,
}: UsePatientFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<PatientFormValues>({
    defaultValues: {
      ...emptyPatient,
      ...initialData,
    },
    resolver: zodResolver(patientSchema),
  });

  const watchBirthDate = watch('birthDate');

  const watchCep = watch('cep');

  const fetchAddressData = useCallback(
    (cep: string) => {
      CepService.getAddressFromCep(cep)
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
    onSubmit(formatData);
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
    errors,
    watchBirthDate,
    isMinor,
    handleFormSubmit,
    handleCepBlur,
  };
}
