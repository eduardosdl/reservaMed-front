import { TextField, TextFieldProps } from '@mui/material';

export default function TextInput({
  variant = 'outlined',
  size = 'small',
  error = false,
  helperText = '',
  inputProps,
  ...restProps
}: TextFieldProps) {
  return (
    <TextField
      variant={variant}
      size={size}
      fullWidth
      InputProps={{ inputProps }}
      error={error}
      helperText={helperText}
      {...restProps}
    />
  );
}
