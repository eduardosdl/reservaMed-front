import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { BaseDashboard } from '../../../components/BaseDashboard';
import { ConsultForm } from '../../../components/ConsultForm';

import { useConsult } from './useConsult';
import { consultColumns } from './ConsultColumns';

export function Consult() {
  const {
    consults,
    loadingConsults,
    isModalOpen,
    isEditForm,
    formData,
    handleOpenCreateModal,
    handleCloseModal,
    handleCompleteConsult,
    handleUpdateConsult,
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
        isEditForm={isEditForm}
        initialData={formData}
      />

      <DataGrid
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows={consults}
        loading={loadingConsults}
        columns={consultColumns({
          handleCompleteConsult,
          handleUpdateConsult,
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
