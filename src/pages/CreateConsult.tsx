import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Container,
  MenuItem,
  TextField,
  AlertColor,
  Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import DoctorService from '../services/DoctorService';
import Toast from '../components/Toast';
import Doctor from '../types/doctor';
import FormInput from '../components/InputForm';
import formatCpf from '../utils/formatCpf';
import consultTypes from '../data/consultTypes';
import Button from '../components/Button';
import ConsultService from '../services/ConsultService';
import { useNavigate } from 'react-router-dom';
import ConsultType from '../types/consultType';

const createConsultSchema = z.object({
  id_doctor: z.number().min(1, 'Selecione um médico'),
  cpf_patient: z.string().min(1, 'Informe um CPF'),
  date: z.string().min(1, 'Data do agendamento é obrigatória'),
  type: z.nativeEnum(ConsultType, {
    errorMap: () => ({ message: 'Selecione o tipo de consulta' }),
  }),
  speciality: z.string().min(1, 'Especialidade não pode ser nula'),
});

type CreateConsultFormValues = z.infer<typeof createConsultSchema>;

export default function CreateConsult() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [toastIsVisible, setToastIsVisible] = useState(false);
  const [toastType, setToastType] = useState<AlertColor>('error');
  const [toastMessage, setToastMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateConsultFormValues>({
    resolver: zodResolver(createConsultSchema),
    defaultValues: {
      id_doctor: 0,
      cpf_patient: '',
      date: '',
      type: ConsultType.ROUTINE_CHECKUP,
    },
  });

  useEffect(() => {
    DoctorService.getAllDoctors()
      .then(data => {
        setDoctors(data);
        if (data.length > 0) {
          setValue('id_doctor', data[0].id || 0);
        }
      })
      .catch(error => {
        setToastType('error');
        setToastMessage(error.message);
        setToastIsVisible(true);
      });
  }, [setValue]);

  const onSubmit = (data: CreateConsultFormValues) => {
    const formatData = {
      ...data,
      cpf_patient: data.cpf_patient.replace(/\D/g, ''),
    };
    ConsultService.createConsult(formatData)
      .then(() => {
        setToastType('success');
        setToastMessage('Consulta marcada com sucesso');
        setToastIsVisible(true);
        navigate(-1);
      })
      .catch(error => {
        setToastType('error');
        setToastMessage(error.message);
        setToastIsVisible(true);
      });
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
      <Toast
        isVisible={toastIsVisible}
        onClose={() => setToastIsVisible(false)}
        type={toastType}
        description={toastMessage}
      />
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
                    {`${doctor.name}`}
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
          <FormInput
            name="speciality"
            control={control}
            label="Especialidade do médico"
            error={!!errors.speciality}
            errorMessage={errors.speciality?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ width: 1, mt: 2 }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Agendar Consulta
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
