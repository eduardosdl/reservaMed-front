import { ReactNode } from 'react';
import { Button as MaterialButton, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
}

export default function Button({
  children,
  variant = 'contained',
  sx,
  ...restProps
}: CustomButtonProps) {
  return (
    <MaterialButton
      variant={variant}
      sx={{ ...sx, textTransform: 'none' }}
      {...restProps}
    >
      {children}
    </MaterialButton>
  );
}
