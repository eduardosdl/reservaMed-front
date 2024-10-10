import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useRecordConsult } from './useRecordConsult';
import { consultColumns } from './ConsultColumns';

import { BaseDashboard } from '../../../components/BaseDashboard';
import { ConsultForm } from '../../../components/ConsultForm';
import { PrescriptionModal } from '../../../components/PrescriptionModal';

export function RecordConsults() {
  const {
    consults,
    loadingConsults,
    isFormModalOpen,
    prescriptionData,
    isPrescriptionModalOpen,
    formData,
    loadConsults,
    handleOpenCreateModal,
    handleCloseModal,
    handleShowPrecription,
  } = useRecordConsult();
  return (
    <BaseDashboard
      title="Consultas"
      buttonLabel="Nova Consulta"
      handleOpenCreateModal={handleOpenCreateModal}
    >
      <ConsultForm
        isModalOpen={isFormModalOpen}
        handleCloseModal={handleCloseModal}
        consultIdToEdit={undefined}
        initialData={formData}
        reloadData={loadConsults}
      />

      <PrescriptionModal
        data={prescriptionData}
        modalOpen={isPrescriptionModalOpen}
        onClose={handleCloseModal}
      />

      <DataGrid
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows={consults}
        loading={loadingConsults}
        columns={consultColumns({
          handleShowPrecription,
        })}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        getRowId={value => value.id_consult}
      />
    </BaseDashboard>
  );
}
