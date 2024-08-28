import ConsultType from './consultType';

export default interface CreateConsult {
  doctor_id: string;
  patient_id: string;
  date: Date;
  type: ConsultType;
}
