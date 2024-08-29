import ConsultType from './consultType';

export default interface CreateConsult {
  id_doctor: number;
  cpf_patient: string;
  date: string;
  type: ConsultType;
  speciality: string;
}
