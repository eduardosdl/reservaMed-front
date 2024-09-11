import consultTypes from '../data/consultTypes';
import ConsultType from '../types/consultType';

export default function getConsultTypeValue(
  label: string,
): ConsultType | undefined {
  const consultType = consultTypes.find(type => type.label === label);
  return consultType ? (consultType.value as ConsultType) : undefined;
}
