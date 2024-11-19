import { ConsultType } from './consultType';

export interface ConsultRequest {
  doctorId: number;
  patientCpf: string;
  date: string;
  type: ConsultType;
}
