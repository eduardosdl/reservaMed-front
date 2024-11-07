import { Consult } from "./consult/consult";

export interface DoctorConsults {
  attended: number;
  pending: number;
  data: Consult[];
}