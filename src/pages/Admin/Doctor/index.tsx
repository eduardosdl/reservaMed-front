import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { DoctorColumns } from './DoctorColumns';
import { BaseDashboard } from '../../../components/BaseDashboard';
import { useDoctor } from './useDoctor';
import { DoctorForm } from '../../../components/DoctorForm';

export function Doctor() {
  const {
    doctors,
    isModalOpen,
    loadingDoctors,
    isSubmitting,
    formInitialData,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSubmit,
    handleDeleteDoctor,
  } = useDoctor();

  return (
    <BaseDashboard
      title="Médicos"
      buttonLabel="Novo Médico"
      handleOpenCreateModal={handleOpenCreateModal}
    >
      <DoctorForm
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        initialData={formInitialData}
      />

      <DataGrid
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows={doctors}
        loading={loadingDoctors}
        columns={DoctorColumns({
          handleOpenEditModal,
          handleDeleteDoctor,
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
