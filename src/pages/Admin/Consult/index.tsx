import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useConsult } from './useConsult';
import { consultColumns } from './ConsultColumns';

import { BaseDashboard } from '../../../components/BaseDashboard';
import { ConsultForm } from '../../../components/ConsultForm';
import { CompleteConsult } from '../../../components/CompleteConsult';

export function Consult() {
  const {
    consults,
    loadingConsults,
    isFormModalOpen,
    isCompleteModalOpen,
    consultIdToComplete,
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
        isModalOpen={isFormModalOpen}
        handleCloseModal={handleCloseModal}
        consultIdToEdit={consultIdToEdit}
        initialData={formData}
        reloadData={loadConsults}
      />

      <CompleteConsult
        consultId={consultIdToComplete}
        open={isCompleteModalOpen}
        onClose={handleCloseModal}
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
