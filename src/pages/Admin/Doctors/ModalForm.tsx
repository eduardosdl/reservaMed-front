import { Modal, Box } from '@mui/material';
import FormDoctor from './FormDoctor';
import Doctor from '../../types/doctor';

interface DoctorModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Doctor;
  onSubmit: (data: Doctor) => void;
}

// componente para gerenciar o modal
export default function DoctorModal({
  open,
  onClose,
  initialData,
  onSubmit,
}: DoctorModalProps) {
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
        <FormDoctor initialData={initialData} onSubmit={onSubmit} />
      </Box>
    </Modal>
  );
}
