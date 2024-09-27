import { Grid, MenuItem, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import { useConsultForm } from './useConsultForm';
import { ModalForm } from '../ModalForm';
import { FormInput } from '../InputForm';
import { Button } from '../Button';

import { formatCpf } from '../../utils/formatCpf';
import { consultTypes } from '../../data/consultTypes';
import { ConsultRequest } from '../../types/consult/consultRequest';

interface ConsultFormProps {
  isModalOpen: boolean;
  initialData?: ConsultRequest;
  consultIdToEdit?: number;
  handleCloseModal: () => void;
  reloadData: () => void;
}

export function ConsultForm({
  isModalOpen,
  initialData,
  consultIdToEdit,
  handleCloseModal,
  reloadData,
}: ConsultFormProps) {
  const {
    doctors,
    isSubmitting,
    control,
    errors,
    handleSubmit,
    handleFormSubmit,
  } = useConsultForm({
    initialData,
    consultIdToEdit,
    handleCloseModal,
    reloadData,
  });

  return (
    <ModalForm open={isModalOpen} onClose={handleCloseModal}>
      <Grid
        container
        spacing={0}
        columnSpacing={1}
        rowSpacing={1}
        component={'form'}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Grid item xs={12}>
          <Controller
            name="id_doctor"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                select
                label="Médico"
                fullWidth
                error={!!errors.id_doctor}
                helperText={errors.id_doctor?.message}
                {...field}
                value={field.value || ''}
              >
                {doctors.map(doctor => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {`${doctor.name} - ${doctor.specialty}`}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            disabled={!!consultIdToEdit}
            name="cpf_patient"
            control={control}
            label="CPF do paciente"
            error={!!errors.cpf_patient}
            errorMessage={errors.cpf_patient?.message}
            formatValue={formatCpf}
            maxLength={14}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            name="date"
            control={control}
            label="Data do Agendamento"
            type="datetime-local"
            error={!!errors.date}
            errorMessage={errors.date?.message}
            formatValue={value => {
              return value.replace(/^(\d{4})\d*/, '$1');
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField
                size="small"
                select
                label="Tipo de Consulta"
                fullWidth
                error={!!errors.type}
                helperText={errors.type?.message}
                {...field}
              >
                {consultTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ width: 1, mt: 2 }}
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
          >
            {consultIdToEdit ? 'Salvar' : 'Agendar'}
          </Button>
        </Grid>
      </Grid>
    </ModalForm>
  );
}
