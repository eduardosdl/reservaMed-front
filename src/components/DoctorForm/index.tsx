import { Grid } from '@mui/material';
import FormInput from '../InputForm';

import Button from '../Button';
import useDoctorForm from './useDoctorForm';
import Doctor from '../../types/doctor';
import formatPhone from '../../utils/formatPhone';

interface DoctorFormProps {
  initialData?: Doctor;
  onSubmit: (data: Doctor) => void;
  isLoading: boolean;
}

export default function DoctorForm({
  initialData,
  onSubmit,
  isLoading,
}: DoctorFormProps) {
  const { control, handleSubmit, errors, handleFormSubmit } = useDoctorForm({
    initialData,
    onSubmit,
  });

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
          loading={isLoading}
        >
          Enviar
        </Button>
      </Grid>
    </Grid>
  );
}
