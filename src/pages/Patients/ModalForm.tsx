import { Modal, Box } from '@mui/material';
import FormPatient from './FormPatient';
import Patient from '../../types/patient';

interface PatientModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Patient;
  onSubmit: (data: Patient) => void;
}

// componente para gerenciar o modal
export default function PatientModal({
  open,
  onClose,
  initialData,
  onSubmit,
}: PatientModalProps) {
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
        <FormPatient initialData={initialData} onSubmit={onSubmit} />
      </Box>
    </Modal>
  );
}
