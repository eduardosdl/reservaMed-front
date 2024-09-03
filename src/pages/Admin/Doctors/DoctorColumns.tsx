import { GridColDef } from '@mui/x-data-grid';

import formatPhone from '../../../utils/formatPhone';
import Doctor from '../../../types/doctor';
import ActionTableButton from '../../../components/ActionTableButtons';

interface CreateColumnsProps {
  handleOpenEditModal: (doctorData: Doctor) => void;
  handleDeleteDoctor: (crm: string) => void;
}

export default function createColumns({
  handleOpenEditModal,
  handleDeleteDoctor,
}: CreateColumnsProps): GridColDef[] {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      width: 180,
    },
    {
      field: 'crm',
      headerName: 'CRM',
      width: 150,
    },
    {
      field: 'cellPhone',
      headerName: 'Telefone',
      width: 130,
      type: 'string',
      valueFormatter: value => formatPhone(value),
    },
    {
      field: 'specialty',
      headerName: 'Especialidade',
      width: 200,
    },
    {
      field: 'id',
      headerName: 'Ações',
      width: 150,
      renderCell: params => {
        const doctor = params.row;
        return (
          <ActionTableButton
            onOpenEditModal={() => handleOpenEditModal(doctor)}
            onDelete={() => handleDeleteDoctor(doctor.crm)}
          />
        );
      },
    },
  ];

  return columns;
}
