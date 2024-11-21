import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useRecordConsult } from './useRecordConsult';
import { consultColumns } from './ConsultColumns';

import { BaseDashboard } from '../../../components/BaseDashboard';
import { ConsultForm } from '../../../components/ConsultForm';
import { DescriptionConsultModal } from '../../../components/DescriptionConsultModal';

export function RecordConsults() {
  const {
    consults,
    loadingConsults,
    isFormModalOpen,
    descriptionData,
    isPrescriptionModalOpen,
    formData,
    loadConsults,
    handleOpenCreateModal,
    handleCloseModal,
    handleShowConsultDescription,
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

      <DescriptionConsultModal
        data={descriptionData}
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
          handleShowConsultDescription,
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
