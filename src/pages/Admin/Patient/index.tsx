import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { PatientColumns } from './PatientColumns';
import { usePatient } from './usePatient';

import { BaseDashboard } from '../../../components/BaseDashboard';
import { PatientForm } from '../../../components/PatientForm';

export function Patient() {
  const {
    patients,
    loadingPatients,
    isModalOpen,
    formData,
    isEditFrom,
    isSubmitting,
    handleSubmit,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleDeletePatient,
  } = usePatient();

  return (
    <BaseDashboard
      title="Pacientes"
      buttonLabel="Novo Paciente"
      handleOpenCreateModal={handleOpenCreateModal}
    >
      <PatientForm
        isModalOpen={isModalOpen}
        initialData={formData}
        isLoading={isSubmitting}
        isEditForm={isEditFrom}
        handleCloseModal={handleCloseModal}
        onSubmit={handleSubmit}
      />

      <DataGrid
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows={patients}
        loading={loadingPatients}
        columns={PatientColumns({
          handleOpenEditModal,
          handleDeletePatient,
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
