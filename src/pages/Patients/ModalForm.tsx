import React, { useEffect, useState } from 'react';
import { Box, Grid, Modal, MenuItem } from '@mui/material';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import isEmailValid from '../../utils/isEmailValid';
import formatCpf from '../../utils/formatCpf';
import formatPhone from '../../utils/formatPhone';
import formatCep from '../../utils/formatCep';
import Patient from '../../types/patient';
import cities from '../../data/cities';
import CepService from '../../services/CepService';

interface ModalFormProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: Patient) => void;
  patient?: Patient;
}

interface FormErrors {
  name?: string;
  birthDate?: string;
  cpf?: string;
  cellPhone?: string;
  email?: string;
  cep?: string;
}

export default function ModalForm({
  isVisible,
  onClose,
  onSubmit,
  patient,
}: ModalFormProps) {
  const emptyForm = {
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
    responsibleCpf: '',
  };

  const [formData, setFormData] = useState<Patient>(emptyForm);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isMinor, setIsMinor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));

    setFormErrors(prev => ({
      ...prev,
      [id]: undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    const errors: FormErrors = {};

    if (!formData.name) errors.name = 'Nome completo é obrigatório.';
    if (!formData.birthDate)
      errors.birthDate = 'Data de nascimento é obrigatória.';
    if (!formData.cpf) errors.cpf = 'CPF é obrigatório.';
    if (!formData.cellPhone) errors.cellPhone = 'Telefone é obrigatório.';
    if (!formData.email) {
      errors.email = 'Email é obrigatório.';
    } else if (!isEmailValid(formData.email)) {
      errors.email = 'Email inválido.';
    }
    if (formData.cep && formData.cep.length !== 8)
      errors.cep = 'CEP deve ter 8 dígitos.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    onSubmit(formData);
    setIsLoading(false);
    setFormData(emptyForm);
    onClose();
  };

  function getAddressFromCep(cep: string) {
    CepService.getAddressFromCep(cep)
      .then(data => {
        setFormData(prevFormData => ({
          ...prevFormData,
          city: data.localidade,
          state: data.uf,
          street: data.logradouro,
        }));
      })
      .catch(error => console.log(error));
  }

  function checkIsMinor() {
    const birthDate = new Date(formData.birthDate);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    setIsMinor(age < 18);
  }

  return (
    <Modal
      open={isVisible}
      onClose={() => {
        onClose();
        setFormData(emptyForm);
        setFormErrors({});
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxHeight: '90%',
          overflow: 'auto',
        }}
      >
        <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <TextInput
              id="name"
              label="Nome completo"
              value={formData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              id="birthDate"
              label="Aniversário"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: new Date().toISOString().split('T')[0],
              }}
              onBlur={checkIsMinor}
              error={!!formErrors.birthDate}
              helperText={formErrors.birthDate}
            />
          </Grid>
          {isMinor && (
            <Grid item xs={12}>
              <TextInput
                id="legalGuardian"
                label="CPF do resposável"
                inputProps={{
                  maxLength: 11,
                }}
                value={formatCpf(formData.cpf)}
                onChange={handleChange}
                error={!!formErrors.cpf}
                helperText={formErrors.cpf}
              />
            </Grid>
          )}
          <Grid item xs={6}>
            <TextInput
              id="cpf"
              label="CPF"
              inputProps={{
                maxLength: 11,
              }}
              value={formatCpf(formData.cpf)}
              onChange={handleChange}
              error={!!formErrors.cpf}
              helperText={formErrors.cpf}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              id="cellPhone"
              label="Telefone"
              inputProps={{
                maxLength: 15,
              }}
              value={formatPhone(formData.cellPhone)}
              onChange={handleChange}
              error={!!formErrors.cellPhone}
              helperText={formErrors.cellPhone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              id="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              id="allergy"
              label="Alergias"
              value={formData.allergy}
              onChange={handleChange}
              helperText="Adicione mais de uma separando por virgula(,)"
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              id="cep"
              label="CEP"
              value={formatCep(formData.cep || '')}
              onChange={handleChange}
              onBlur={() => {
                if (formData.cep && formData.cep.length === 8) {
                  getAddressFromCep(formData.cep);
                }
              }}
              inputProps={{
                maxLength: 8,
              }}
              error={!!formErrors.cep}
              helperText={formErrors.cep}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              id="street"
              label="Rua"
              value={formData.street}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              id="state"
              label="Estado"
              select
              value={formData.state}
              onChange={handleChange}
            >
              {cities.map(state => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextInput>
          </Grid>
          <Grid item xs={6}>
            <TextInput
              id="city"
              label="Cidade"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button sx={{ width: 1 }} type="submit" loading={isLoading}>
              Criar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
