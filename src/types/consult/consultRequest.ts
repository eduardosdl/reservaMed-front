import { ConsultType } from './consultType';

export interface ConsultRequest {
  id_doctor: number;
  cpf_patient: string;
  date: string;
  type: ConsultType;
}
