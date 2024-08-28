import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Grid } from '@mui/material';
import Doctor from '../../../types/doctor';
import FormInput from '../../../components/InputForm';
import formatPhone from '../../../utils/formatPhone';
import Button from '../../../components/Button';

// monta as validacoes com zod
const doctorSchema = z.object({
  name: z.string().min(1, 'Nome completo é obrigatório'),
  crm: z
    .string()
    .min(4, 'deve ter no mínimo 4 digitos.')
    .max(6, 'deve ter no máximo 6 digitos'),
  cellPhone: z.string().min(1, 'Telefone é obrigatório.'),
  specialty: z.string().min(1, 'Especilidade é obrigatório.'),
});

type DoctorFormValues = z.infer<typeof doctorSchema>;

interface FormDoctorProps {
  initialData?: Doctor;
  onSubmit: (data: Doctor) => void;
}

const emptyDoctor = {
  name: '',
  crm: '',
  cellPhone: '',
  specialty: '',
};

// renderiza o formulario de paciente
export default function FormDoctor({ initialData, onSubmit }: FormDoctorProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorFormValues>({
    // inicializa os campos como vazio para que não haja erro de controled para uncontroled components
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

  return (
    <Grid
      container
      spacing={0}
      columnSpacing={1}
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Grid item xs={12}>
        <FormInput
          name="name"
          control={control}
          label="Nome Completo"
          error={!!errors.name}
          errorMessage={errors.name?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          name="crm"
          control={control}
          label="CRM"
          error={!!errors.crm}
          errorMessage={errors.crm?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          name="cellPhone"
          control={control}
          label="Telefone"
          error={!!errors.cellPhone}
          errorMessage={errors.cellPhone?.message}
          formatValue={formatPhone}
          maxLength={15}
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          name="specialty"
          control={control}
          label="Especialidade"
          error={!!errors.specialty}
          errorMessage={errors.specialty?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          sx={{ width: 1, mt: 2 }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Enviar
        </Button>
      </Grid>
    </Grid>
  );
}
