import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useConsult } from './useConsult';
import { consultColumns } from './ConsultColumns';

import { BaseDashboard } from '../../../components/BaseDashboard';
import { ConsultForm } from '../../../components/ConsultForm';

export function Consult() {
  const {
    consults,
    loadingConsults,
    isModalOpen,
    consultIdToEdit,
    formData,
    loadConsults,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleCompleteConsult,
    handleCancelConsult,
    handleShowPrecription,
  } = useConsult();
  return (
    <BaseDashboard
      title="Consultas"
      buttonLabel="Nova Consulta"
      handleOpenCreateModal={handleOpenCreateModal}
    >
      <ConsultForm
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        consultIdToEdit={consultIdToEdit}
        initialData={formData}
        reloadData={loadConsults}
      />

      <DataGrid
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows={consults}
        loading={loadingConsults}
        columns={consultColumns({
          handleCompleteConsult,
          handleOpenEditModal,
          handleCancelConsult,
          handleShowPrecription,
        })}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </BaseDashboard>
  );
}
