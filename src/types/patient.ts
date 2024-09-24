export interface Patient {
  id: number;
  name: string;
  birthDate: string;
  cpf: string;
  cellPhone: string;
  email: string;
  street?: string;
  city?: string;
  state?: string;
  cep?: string;
  allergy?: string;
  medicalHistory?: string;
  guardianCpf?: string;
}
