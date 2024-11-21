import { ReactNode } from 'react';
import { Modal, Box, useTheme, useMediaQuery } from '@mui/material';

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

// componente para gerenciar o modal
export function ModalForm({ open, onClose, children }: ModalFormProps) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Modal open={open} onClose={onClose}>
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
        {children}
      </Box>
    </Modal>
  );
}
