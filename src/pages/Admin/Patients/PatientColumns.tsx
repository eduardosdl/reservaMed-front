import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

import formatCpf from '../../../utils/formatCpf';
import formatPhone from '../../../utils/formatPhone';
import formatCep from '../../../utils/formatCep';
import Patient from '../../../types/patient';
import ActionTableButton from '../../../components/ActionTableButtons';

interface PatientColumnsProps {
  handleOpenEditModal: (patientData: Patient) => void;
  handleDeletePatient: (cpf: string) => void;
}

export default function PatientColumns({
  handleOpenEditModal,
  handleDeletePatient,
}: PatientColumnsProps): GridColDef[] {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      width: 180,
    },
    {
      field: 'birthDate',
      headerName: 'Data de Nascimento',
      width: 150,
      type: 'string',
      valueFormatter: value => new Date(value).toLocaleDateString('pt-BR'),
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      width: 130,
      type: 'string',
      valueFormatter: value => formatCpf(value),
    },
    {
      field: 'cellPhone',
      headerName: 'Telefone',
      width: 130,
      type: 'string',
      valueFormatter: value => formatPhone(value),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'street',
      headerName: 'Rua',
      width: 200,
    },
    {
      field: 'city',
      headerName: 'Cidade',
      width: 130,
    },
    {
      field: 'state',
      headerName: 'Estado',
      width: 80,
    },
    {
      field: 'cep',
      headerName: 'CEP',
      width: 100,
      type: 'string',
      valueFormatter: value => formatCep(value || ''),
    },
    {
      field: 'allergy',
      headerName: 'Alergias',
      width: 150,
      renderCell: params => (
        <>
          {params.value &&
            params.value
              .split(',')
              ?.map((allergy: string, index: number) => (
                <Chip key={index} label={allergy} sx={{ mr: 1 }} />
              ))}
        </>
      ),
    },
    {
      field: 'medicalHistory',
      headerName: 'Historico medico',
      width: 150,
    },
    {
      field: 'guardianCpf',
      headerName: 'Responsável Legal',
      width: 150,
      valueFormatter: value => formatCpf(value || ''),
    },
    {
      field: 'id',
      headerName: 'Ações',
      width: 150,
      renderCell: params => {
        const patient = params.row;
        return (
          <ActionTableButton
            onOpenEditModal={() => handleOpenEditModal(patient)}
            onDelete={() => handleDeletePatient(patient.cpf)}
          />
        );
      },
    },
  ];

  return columns;
}
