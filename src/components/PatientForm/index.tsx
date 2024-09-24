import { Grid } from '@mui/material';

import { usePatientForm } from './usePatientForm';

import { Button } from '../Button';
import { ModalForm } from '../ModalForm';
import { FormInput } from '../InputForm';

import { isMinor } from '../../utils/isMinor';
import { formatCpf } from '../../utils/formatCpf';
import { formatPhone } from '../../utils/formatPhone';
import { formatCep } from '../../utils/formatCep';
import { Patient } from '../../types/patient';

interface PatientFormProps {
  isModalOpen: boolean;
  initialData?: Patient;
  isLoading: boolean;
  isEditForm: boolean;
  handleCloseModal: () => void;
  onSubmit: (data: Patient) => void;
}

export function PatientForm({
  isModalOpen,
  initialData,
  isLoading,
  handleCloseModal,
  onSubmit,
}: PatientFormProps) {
  const {
    control,
    errors,
    watchBirthDate,
    handleSubmit,
    handleCepBlur,
    handleFormSubmit,
  } = usePatientForm({ initialData, onSubmit });

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
            name="birthDate"
            control={control}
            label="Data de Nascimento"
            type="date"
            error={!!errors.birthDate}
            errorMessage={errors.birthDate?.message}
          />
        </Grid>
        {isMinor(watchBirthDate) && (
          <Grid item xs={12}>
            <FormInput
              name="guardianCpf"
              control={control}
              label="CPF do Responsável"
              error={!!errors.guardianCpf}
              errorMessage={errors.guardianCpf?.message}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <FormInput
            name="cpf"
            control={control}
            label="CPF"
            error={!!errors.cpf}
            errorMessage={errors.cpf?.message}
            formatValue={formatCpf}
            maxLength={14}
          />
        </Grid>
        <Grid item xs={6}>
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
            name="email"
            control={control}
            label="Email"
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            name="cep"
            control={control}
            label="CEP"
            error={!!errors.cep}
            errorMessage={errors.cep?.message}
            onBlur={handleCepBlur}
            formatValue={formatCep}
            maxLength={9}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput name="street" control={control} label="Rua" />
        </Grid>
        <Grid item xs={12}>
          <FormInput name="city" control={control} label="Cidade" />
        </Grid>
        <Grid item xs={12}>
          <FormInput name="state" control={control} label="Estado" />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            name="allergy"
            control={control}
            label="Alergias"
            helpText="Informe as alergias separadas por virgula"
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            name="medicalHistory"
            control={control}
            label="Histórico Médico"
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
    </ModalForm>
  );
}
