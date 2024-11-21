import {
  Box,
  Grid,
  Modal,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FormInput } from './InputForm';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from './Button';
import { useState } from 'react';
import { ClinicalRecord } from '../types/clinicalRecord';
import { ConsultService } from '../services/ConsultService';
import { toast } from 'react-toastify';
import { APIError } from '../errors/ApiError';

interface CompleteConsultProps {
  consultId: number;
  open: boolean;
  patientName: string;
  onClose: () => void;
  reloadData: () => void;
}

const medicalRecordSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
});

type MedicalRecordFormValues = z.infer<typeof medicalRecordSchema>;

export function CompleteConsult({
  consultId,
  open,
  patientName,
  onClose,
  reloadData,
}: CompleteConsultProps) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MedicalRecordFormValues>({
    defaultValues: { description: '' },
    resolver: zodResolver(medicalRecordSchema),
  });

  async function handleCompleteConsult(data: ClinicalRecord) {
    try {
      setIsLoading(true);
      await ConsultService.getInstance().completeConsult(consultId, data);
      reloadData();
      handleClose();
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    onClose();
    reset();
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        maxWidth={600}
        width={smDown ? `calc(100% - ${theme.spacing(2)})` : '100%'}
        padding={smDown ? theme.spacing(2) : theme.spacing(4)}
        maxHeight="80%"
        overflow="auto"
        boxShadow={theme.shadows[24]}
        bgcolor={theme.palette.background.paper}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Grid
          container
          spacing={0}
          columnSpacing={1}
          component="form"
          onSubmit={handleSubmit(handleCompleteConsult)}
          autoComplete="off"
        >
          <Grid item xs={12}>
            <TextField
            fullWidth
              size="small"
              label="Nome do paciente"
              disabled={true}
              value={patientName}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name="description"
              control={control}
              type="textarea"
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
              Completar consulta
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
