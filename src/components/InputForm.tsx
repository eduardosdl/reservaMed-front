// src/components/FormInput.tsx
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField, FormControl, FormHelperText } from '@mui/material';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: boolean;
  errorMessage?: string;
  maxLength?: number;
  type?: string;
  helpText?: string;
  formatValue?: (value: string) => string;
  onBlur?: () => void;
}

function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  errorMessage,
  maxLength,
  helpText,
  error = false,
  type = 'text',
  formatValue,
  onBlur,
}: FormInputProps<T>) {
  return (
    <FormControl fullWidth margin="normal" error={error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            size="small"
            {...field}
            label={label}
            type={type}
            error={error}
            onChange={e => {
              field.onChange(
                formatValue ? formatValue(e.target.value) : e.target.value,
              );
            }}
            onBlur={() => {
              if (onBlur) onBlur();
            }}
            inputProps={{ maxLength }}
            InputLabelProps={type === 'date' ? { shrink: true } : undefined}
          />
        )}
      />
      {helpText && <FormHelperText>{helpText}</FormHelperText>}
      {error && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

export default FormInput;
