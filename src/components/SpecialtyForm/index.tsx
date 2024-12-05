import { Grid } from '@mui/material';
import { ModalForm } from '../ModalForm';
import { useSpecialtyForm } from './useSpecialtyForm';
import { FormInput } from '../InputForm';
import { Button } from '../Button';
import { forwardRef } from 'react';
import { Specialty } from '../../types/Specialty';

export interface SpecialtyFormRefMathods {
  setFieldsValues: (data: Specialty) => void;
  resetFields: () => void;
}

interface SpecialtyFormProps {
  isModalOpen: boolean;
  isLoading: boolean;
  isEditForm: boolean;
  handleCloseModal: () => void;
  onSubmit: (data: Specialty) => void;
}

export const SpecialtyForm = forwardRef(
  (
    {
      isModalOpen,
      isLoading,
      isEditForm,
      handleCloseModal,
      onSubmit,
    }: SpecialtyFormProps,
    ref: React.Ref<SpecialtyFormRefMathods>,
  ) => {
    const { control, handleSubmit, errors, handleFormSubmit } =
      useSpecialtyForm(
        {
          onSubmit,
        },
        ref,
      );

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
              name="specialty"
              control={control}
              label="Nome"
              error={!!errors.specialty}
              errorMessage={errors.specialty?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name="description"
              control={control}
              label="Descrição"
              error={!!errors.description}
              errorMessage={errors.description?.message}
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
  },
);
