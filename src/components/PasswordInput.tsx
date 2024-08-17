import { useState } from "react";
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function PasswordInput({ variant = 'outlined', size = 'small', ...restProps }: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField variant={variant} size={size} {...restProps}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>,
      }}
    />
  )
}