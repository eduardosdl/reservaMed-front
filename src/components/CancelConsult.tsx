import {
  Box,
  Grid,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FormInput } from './InputForm';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from './Button';
import { useState } from 'react';
import { ConsultService } from '../services/ConsultService';
import { toast } from 'react-toastify';
import { APIError } from '../errors/ApiError';

interface CancelConsultProps {
  consultId: number;
  open: boolean;
  isOlderThen24h: boolean;
  onClose: () => void;
  reloadData: () => void;
}

const cancelConsultSchema = z.object({
  reason: z.string().min(1, 'Justificativa é obrigatória'),
});

type CancelConsultFormValues = z.infer<typeof cancelConsultSchema>;

export function CancelConsult({
  consultId,
  open,
  isOlderThen24h,
  onClose,
  reloadData,
}: CancelConsultProps) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CancelConsultFormValues>({
    defaultValues: { reason: '' },
    resolver: zodResolver(cancelConsultSchema),
  });

  async function handleCancelConsult({ reason }: CancelConsultFormValues) {
    try {
      setIsLoading(true);
      await ConsultService.getInstance().cancelConsult(consultId, reason);
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
          onSubmit={handleSubmit(handleCancelConsult)}
          autoComplete="off"
        >
          {isOlderThen24h && (
            <Grid item xs={12}>
              <Typography color="red">
                Caso você cancele será cobrada uma taxa pois a consulta está a
                menos de 24h
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <FormInput
              name="reason"
              control={control}
              label="Justificativa"
              error={!!errors.reason}
              errorMessage={errors.reason?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{ width: 1, mt: 2 }}
              type="submit"
              variant="contained"
              color="error"
              loading={isLoading}
            >
              Cancelar consulta
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
