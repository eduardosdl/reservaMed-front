import { Modal, Box } from '@mui/material';
import { ReactNode } from 'react';

interface DoctorModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

// componente para gerenciar o modal
export default function DoctorModal({
  open,
  onClose,
  children,
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
        {children}
      </Box>
    </Modal>
  );
}
