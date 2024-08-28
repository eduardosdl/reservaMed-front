import { Modal, Box } from '@mui/material';
import FormDoctor from './FormDoctor';
import Doctor from '../../types/doctor';
import CreateConsult from '../../../types/createConsult';

interface ConsultModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateConsult) => void;
}

// componente para gerenciar o modal
export default function DoctorModal({
  open,
  onClose,
  onSubmit,
}: ConsultModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
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
        <FormDoctor onSubmit={onSubmit} />
      </Box>
    </Modal>
  );
}
