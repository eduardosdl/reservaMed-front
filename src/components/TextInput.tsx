import { TextField, TextFieldProps } from "@mui/material";

export default function TextInput({ variant = 'outlined', size = 'small', ...restProps }: TextFieldProps) {

  return (
    <TextField variant={variant} size={size} {...restProps} />
  )
}