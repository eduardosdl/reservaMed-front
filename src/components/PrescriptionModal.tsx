import { Box, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Prescription } from '../types/prescription';

interface PrescriptionModalProps {
  data?: Prescription;
  modalOpen: boolean;
  onClose: () => void;
}

export function PrescriptionModal({
  data,
  modalOpen,
  onClose,
}: PrescriptionModalProps) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Modal open={modalOpen} onClose={onClose}>
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
        <Typography>Prescrição: {data?.prescription}</Typography>
        <Typography>Diagnostico: {data?.diagnostic}</Typography>
      </Box>
    </Modal>
  );
}
