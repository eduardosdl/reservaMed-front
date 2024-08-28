import ConsultType from './consultType';
import Doctor from './doctor';
import Patient from './patient';

export default interface Consult {
  id: string;
  doctor: Doctor;
  patient: Patient;
  type_consult: ConsultType;
  date: Date;
  dateCancellation?: Date;
  reasonCancellation?: string;
  status: string;
}
