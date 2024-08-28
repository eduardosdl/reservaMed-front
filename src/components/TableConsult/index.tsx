import { DataGrid } from '@mui/x-data-grid';
import Consult from '../../types/consult';
import createConsultColumns from './DefColumns';
import { AlertColor, Box, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import Button from '../Button';
import ConsultService from '../../services/ConsultService';
import Toast from '../Toast';

interface TableConsultProps {
  consultsData: Consult[];
  realoadData: () => void;
}

export default function TableConsult({
  consultsData,
  realoadData,
}: TableConsultProps) {
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [reasonCancel, setReasonCancel] = useState('');
  const [consultId, setConsultId] = useState(0);
  const [toastIsVisible, setToastIsVisible] = useState(false);
  const [toastType, setToastType] = useState<AlertColor>('error');
  const [toastMessage, setToastMessage] = useState(
    'Houve um erro ao buscar médicos',
  );

  function handleCancelConsult() {
    ConsultService.cancelConsult(consultId, reasonCancel)
      .then(() => {
        setToastType('success');
        setToastMessage('Consulta cancelada!');
        setToastIsVisible(true);
        realoadData();
      })
      .catch(error => {
        setToastType('error');
        setToastMessage(error.message);
        setToastIsVisible(true);
      });
  }

  return (
    <>
      <Toast
        isVisible={toastIsVisible}
        onClose={() => setToastIsVisible(false)}
        type={toastType}
        description={toastMessage}
      />
      <Modal
        open={isCancelModalVisible}
        onClose={() => setIsCancelModalVisible(false)}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            maxHeight: '90%',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            label="Motivo do cancelamento"
            value={reasonCancel}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setReasonCancel(event.target.value);
            }}
            fullWidth
            sx={{ mb: 4 }}
          />
          <Button fullWidth onClick={handleCancelConsult}>
            Cancelar
          </Button>
        </Box>
      </Modal>
      <DataGrid
        rows={consultsData}
        // columns={createColumns({
        //   onOpenEditModal: handleOpenEditModal,
        //   onDeleteDoctor: handleDeleteDoctor,
        // })}
        columns={createConsultColumns({
          onCancelConsult: (id: number) => {
            setIsCancelModalVisible(true);
            setConsultId(id);
          },
        })}
      />
    </>
  );
}
