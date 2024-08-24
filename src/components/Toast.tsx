import { Alert, AlertColor, Snackbar } from '@mui/material';

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  description: string;
  type: AlertColor;
}

export default function Toast({
  isVisible,
  onClose,
  description,
  type,
}: ToastProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isVisible}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {description}
      </Alert>
    </Snackbar>
  );
}
