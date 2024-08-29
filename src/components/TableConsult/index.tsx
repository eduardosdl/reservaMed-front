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
  realoadData?: () => void;
}

export default function TableConsult({
  consultsData,
  realoadData = () => {},
}: TableConsultProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [diagnostic, setDiagnostic] = useState('');
  const [prescription, setPrescription] = useState('');
  const [reasonCancel, setReasonCancel] = useState('');
  const [consultId, setConsultId] = useState(0);
  const [toastIsVisible, setToastIsVisible] = useState(false);
  const [actionType, setActionType] = useState('');
  const [toastType, setToastType] = useState<AlertColor>('error');
  const [toastMessage, setToastMessage] = useState(
    'Houve um erro ao buscar médicos',
  );

  function handleCancelConsult() {
    ConsultService.cancelConsult(consultId, reasonCancel)
      .then(() => {
        setToastType('success');
        setToastMessage('Consulta cancelada com sucesso!');
        setToastIsVisible(true);
        realoadData();
      })
      .catch(error => {
        setToastType('error');
        setToastMessage(error.message);
        setToastIsVisible(true);
      });
  }

  function handleCompleteConsult() {
    ConsultService.completeConsult(consultId, {
      diagnostic,
      prescription,
    })
      .then(() => {
        setToastType('success');
        setToastMessage('Consulta completa!');
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
      <Modal open={isModalVisible} onClose={() => setIsModalVisible(false)}>
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
          {actionType == 'cancel' && (
            <>
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
            </>
          )}
          {actionType == 'complete' && (
            <>
              <TextField
                label="Diagnostico"
                value={diagnostic}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDiagnostic(event.target.value);
                }}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Prescrição"
                value={prescription}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPrescription(event.target.value);
                }}
                fullWidth
                sx={{ mb: 4 }}
              />
              <Button fullWidth onClick={handleCompleteConsult}>
                Completar
              </Button>
            </>
          )}
          {actionType == 'edit' && (
            <>
              <TextField
                label="Diagnostico"
                value={diagnostic}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDiagnostic(event.target.value);
                }}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button fullWidth onClick={handleCompleteConsult}>
                Completar
              </Button>
            </>
          )}
        </Box>
      </Modal>
      <DataGrid
        rows={consultsData}
        // columns={createColumns({
        //   onOpenEditModal: handleOpenEditModal,
        //   onDeleteDoctor: handleDeleteDoctor,
        // })}
        columns={createConsultColumns({
          onCompleteConsult: id => {
            setIsModalVisible(true);
            setActionType('complete');
            setConsultId(id);
          },
        })}
      />
    </>
  );
}
