import { BaseDashboard } from '../../../components/BaseDashboard';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { specialtyColumns } from './SpecialitiesColumns';
import { useSpecialty } from './useSpecialty';
import { SpecialtyForm } from '../../../components/SpecialtyForm';

export function Specialty() {
  const {
    specialties,
    loadingSpecialties,
    isSubmitting,
    isModalOpen,
    isEditForm,
    specialtyFormRef,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleSubmit,
    handleCloseModal,
    handleDelete,
  } = useSpecialty();

  return (
    <BaseDashboard
      title="Especialidades"
      buttonLabel="Nova Especialidade"
      handleOpenCreateModal={handleOpenCreateModal}
    >
      <SpecialtyForm
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        isEditForm={isEditForm}
        ref={specialtyFormRef}
      />

      <DataGrid
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows={specialties}
        loading={loadingSpecialties}
        columns={specialtyColumns({
          handleOpenEditModal,
          handleDelete,
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
