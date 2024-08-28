import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Grid } from '@mui/material';

import formatCpf from '../../../utils/formatCpf';
import formatPhone from '../../../utils/formatPhone';
import formatCep from '../../../utils/formatCep';
import isMinor from '../../../utils/isMinor';
import Patient from '../../../types/patient';
import CepService from '../../../services/CepService';
import FormInput from '../../../components/InputForm';
import Button from '../../../components/Button';

// monta as validacoes com zod
const patientSchema = z.object({
  name: z.string().min(1, 'Nome completo é obrigatório'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória.'),
  cpf: z.string().min(1, 'CPF é obrigatório.'),
  cellPhone: z.string().min(1, 'Telefone é obrigatório.'),
  email: z
    .string()
    .email({ message: 'Email inválido.' })
    .min(1, 'Email é obrigatório.'),
  cep: z.string().nullable(),
  street: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  allergy: z.string().nullable(),
  medicalHistory: z.string().nullable(),
  guardianCpf: z.string().nullable(),
});

type PatientFormValues = z.infer<typeof patientSchema>;

interface FormPatientProps {
  initialData?: Patient;
  onSubmit: (data: Patient) => void;
}

const emptyPatient = {
  name: '',
  birthDate: '',
  cpf: '',
  cellPhone: '',
  email: '',
  cep: '',
  street: '',
  city: '',
  state: '',
  allergy: '',
  guardianCpf: '',
  medicalHistory: '',
};

// renderiza o formulario de paciente
export default function FormPatient({
  initialData,
  onSubmit,
}: FormPatientProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<PatientFormValues>({
    // inicializa os campos como vazio para que não haja erro de controled para uncontroled components
    defaultValues: {
      ...emptyPatient,
      ...initialData,
    },
    resolver: zodResolver(patientSchema),
  });

  const watchBirthDate = watch('birthDate');

  function fetchAddressData(cep: string) {
    CepService.getAddressFromCep(cep)
      .then(data => {
        setValue('street', data.logradouro);
        setValue('city', data.localidade);
        setValue('state', data.uf);
      })
      .catch(error => console.log(`Houve um erro ao buscar CEP: ${error}`));
  }

  function handleFormSubmit(data: PatientFormValues) {
    const formatData = {
      ...data,
      cpf: data.cpf.replace(/\D/g, ''),
      cellPhone: data.cellPhone.replace(/\D/g, ''),
      cep: data.cep?.replace(/\D/g, ''),
      guardianCpf: data.guardianCpf?.replace(/\D/g, ''),
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
            formatValue={formatCpf}
            maxLength={14}
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
          formatValue={formatCep}
          maxLength={14}
          onBlur={() => {
            const cleanedCep = watch('cep')?.replace(/\D/g, '');
            if (cleanedCep != null && cleanedCep.length === 8) {
              fetchAddressData(cleanedCep);
            }
          }}
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
        >
          Enviar
        </Button>
      </Grid>
    </Grid>
  );
}
