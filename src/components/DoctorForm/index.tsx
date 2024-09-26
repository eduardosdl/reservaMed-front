import { Grid } from '@mui/material';
import { ModalForm } from '../ModalForm';
import { useDoctorForm } from './useDoctorForm';
import { Doctor } from '../../types/doctor';
import { FormInput } from '../InputForm';
import { formatPhone } from '../../utils/formatPhone';
import { Button } from '../Button';

interface DoctorFormProps {
  isModalOpen: boolean;
  initialData?: Doctor;
  isLoading: boolean;
  isEditForm: boolean;
  handleCloseModal: () => void;
  onSubmit: (data: Doctor) => void;
}

export function DoctorForm({
  isModalOpen,
  initialData,
  isLoading,
  isEditForm,
  handleCloseModal,
  onSubmit,
}: DoctorFormProps) {
  const { control, handleSubmit, errors, handleFormSubmit } = useDoctorForm({
    initialData,
    onSubmit,
  });

  return (
    <ModalForm open={isModalOpen} onClose={handleCloseModal}>
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
            {isEditForm ? 'Salvar' : 'Enviar'}
          </Button>
        </Grid>
      </Grid>
    </ModalForm>
  );
}
