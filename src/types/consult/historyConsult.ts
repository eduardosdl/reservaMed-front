import { ConsultType } from './consultType';
import { Doctor } from '../doctor';
import { Patient } from '../patient';

export interface HistoryConsult {
  id: number;
  doctor: Doctor;
  patient: Patient;
  type_consult: ConsultType;
  date: string;
  dateCancellation?: string;
  reasonCancellation?: string;
  status: string;
}
