import { consultTypes } from '../data/consultTypes';
import { ConsultType } from '../types/consult/consultType';

export function getConsultTypeValue(label?: string): ConsultType {
  const consultType = consultTypes.find(type => type.label === label);
  return consultType
    ? (consultType.value as ConsultType)
    : ConsultType.ROUTINE_CHECKUP;
}
