import { ReactNode } from 'react';
import {
  Button as MaterialButton,
  ButtonProps,
  CircularProgress,
} from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
  loading?: boolean;
}

export function Button({
  children,
  loading,
  variant = 'contained',
  sx,
  ...restProps
}: CustomButtonProps) {
  return (
    <MaterialButton
      variant={variant}
      sx={{ ...sx, textTransform: 'none' }}
      {...restProps}
      endIcon={loading && <CircularProgress size={24} />}
      disabled={loading}
    >
      {loading ? '' : children}
    </MaterialButton>
  );
}
