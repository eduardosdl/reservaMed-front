export default interface Patient {
  name: string;
  dateOfBirth: string;
  cpf: string;
  phone: string;
  email: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  allergies?: string[];
  legalGuardian?: Patient;
}