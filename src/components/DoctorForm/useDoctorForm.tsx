import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import formatPhone from '../../utils/formatPhone';
import Doctor from '../../types/doctor';

// Define a validação com Zod
const doctorSchema = z.object({
  name: z.string().min(1, 'Nome completo é obrigatório'),
  crm: z
    .string()
    .min(4, 'deve ter no mínimo 4 digitos.')
    .max(6, 'deve ter no máximo 6 digitos'),
  cellPhone: z.string().min(1, 'Telefone é obrigatório.'),
  specialty: z.string().min(1, 'Especialidade é obrigatória.'),
});

type DoctorFormValues = z.infer<typeof doctorSchema>;

interface UseDoctorFormProps {
  initialData?: Doctor;
  onSubmit: (data: Doctor) => void;
}

const emptyDoctor = {
  name: '',
  crm: '',
  cellPhone: '',
  specialty: '',
};

export default function useDoctorForm({
  initialData,
  onSubmit,
}: UseDoctorFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DoctorFormValues>({
    defaultValues: {
      ...emptyDoctor,
      ...initialData,
    },
    resolver: zodResolver(doctorSchema),
  });

  function handleFormSubmit(data: DoctorFormValues) {
    const formatData = {
      ...data,
      cellPhone: data.cellPhone.replace(/\D/g, ''),
    };
    onSubmit(formatData);
  }

  function handlePhoneChange(value: string) {
    setValue('cellPhone', formatPhone(value));
  }

  return {
    control,
    handleSubmit,
    errors,
    handleFormSubmit,
    handlePhoneChange,
  };
}
