import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useImperativeHandle } from 'react';
import { SpecialtyFormRefMathods } from '.';
import { Specialty } from '../../types/Specialty';

const specialtySchema = z.object({
  specialty: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
});

type SpecialtyFormValues = z.infer<typeof specialtySchema>;

interface UseSpecialtyFormProps {
  onSubmit: (data: Specialty) => void;
}

const emptySpecialty = {
  specialty: '',
  description: '',
};

export function useSpecialtyForm(
  { onSubmit }: UseSpecialtyFormProps,
  ref: React.Ref<SpecialtyFormRefMathods>,
) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SpecialtyFormValues>({
    defaultValues: {
      ...emptySpecialty,
    },
    resolver: zodResolver(specialtySchema),
  });

  useImperativeHandle(ref, () => ({
    setFieldsValues: (data: Specialty) => {
      reset({
        specialty: data.specialty,
        description: data.description,
      });
    },
    resetFields: () => {
      reset({
        ...emptySpecialty,
      });
    },
  }));

  function handleFormSubmit(data: SpecialtyFormValues) {
    onSubmit(data as Specialty);
  }

  return {
    control,
    errors,
    handleSubmit,
    handleFormSubmit,
  };
}
