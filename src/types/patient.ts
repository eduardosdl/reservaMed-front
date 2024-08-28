export default interface Patient {
  id?: number;
  name: string;
  birthDate: string;
  cpf: string;
  cellPhone: string;
  email: string;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  cep?: string | null;
  allergy?: string | null;
  medicalHistory?: string | null;
  guardianCpf?: string | null;
}
