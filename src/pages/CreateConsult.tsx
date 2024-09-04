import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, MenuItem, TextField, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import * as z from 'zod';

import Toast from '../components/Toast';
import FormInput from '../components/InputForm';
import Button from '../components/Button';
import DoctorService from '../services/DoctorService';
import ConsultService from '../services/ConsultService';
import Doctor from '../types/doctor';
import ConsultType from '../types/consultType';
import Consult from '../types/consult';
import CreateConsult from '../types/createConsult';
import consultTypes from '../data/consultTypes';
import formatCpf from '../utils/formatCpf';
import getConsultTypeValue from '../utils/getConsultTypeValue';

const consultSchema = z.object({
  id_doctor: z.number().min(1, 'Selecione um médico'),
  cpf_patient: z.string().min(1, 'Informe um CPF'),
  date: z.string().min(1, 'Data do agendamento é obrigatória'),
  type: z.nativeEnum(ConsultType, {
    errorMap: () => ({ message: 'Selecione o tipo de consulta' }),
  }),
});

type ConsultFormValues = z.infer<typeof consultSchema>;

export default function ConsultForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Tipagem correta para os dados da consulta
  const consultData = location.state as Consult | undefined;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ConsultFormValues>({
    resolver: zodResolver(consultSchema),
    defaultValues: {
      id_doctor: consultData?.doctor.id ?? 0,
      cpf_patient: consultData?.patient.cpf ?? '',
      date: consultData?.date ?? '',
      type:
        getConsultTypeValue(consultData?.type_consult || '') ??
        ConsultType.ROUTINE_CHECKUP,
    },
  });

  useEffect(() => {
    DoctorService.getAllDoctors()
      .then(data => {
        setDoctors(data);
        if (!consultData && data.length > 0) {
          setValue('id_doctor', data[0].id || 0);
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  }, [consultData, setValue]);

  function handleCreateConsult(consultFormData: CreateConsult) {
    setIsLoading(true);
    ConsultService.createConsult(consultFormData)
      .then(() => navigate(-1))
      .catch(error => toast.error(error.message))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateConsult(
    consultId: number,
    consultFormData: CreateConsult,
  ) {
    setIsLoading(true);
    ConsultService.updateConsult(consultId, consultFormData)
      .then(() => navigate(-1))
      .catch(error => toast.error(error.message))
      .finally(() => setIsLoading(false));
  }

  const onSubmit = async (data: ConsultFormValues) => {
    const formatData = {
      ...data,
      cpf_patient: data.cpf_patient.replace(/\D/g, ''),
    };

    if (consultData) {
      handleUpdateConsult(consultData.id, formatData);
      return;
    }

    handleCreateConsult(formatData);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Toast />
      <Grid
        container
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        rowSpacing={1}
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
            loading={isLoading}
          >
            {consultData ? 'Atualizar Consulta' : 'Agendar Consulta'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
