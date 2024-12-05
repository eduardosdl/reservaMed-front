import { GridColDef } from '@mui/x-data-grid';
import { ActionTableButton } from '../../../components/ActionTableButtons';
import { Specialty } from '../../../types/Specialty';

interface SpecialtyColumnsProps {
  handleOpenEditModal: (data: Specialty) => void;
  handleDelete: (id: number) => void;
}

export function specialtyColumns({
  handleOpenEditModal,
  handleDelete,
}: SpecialtyColumnsProps): GridColDef[] {
  const columns: GridColDef[] = [
    {
      field: 'specialty',
      headerName: 'Nome',
      width: 200,
      renderCell: params => params.row.speciality,
    },
    {
      field: 'description',
      headerName: 'Descrição',
      width: 150,
      renderCell: params => params.row.description,
    },
    {
      field: 'id',
      headerName: 'Ações',
      width: 150,
      renderCell: params => {
        return (
          <ActionTableButton
            onOpenEditModal={() => handleOpenEditModal(params.row)}
            onDelete={() => handleDelete(params.row.id)}
          />
        );
      },
    },
  ];

  return columns;
}
