export default interface Patient {
  name: string;
  birthDate: string;
  cpf: string;
  cellPhone: string;
  email: string;
  street?: string;
  city?: string;
  state?: string;
  cep?: string;
  allergies?: string[];
  legalGuardian?: Patient;
  ativo: boolean;
}