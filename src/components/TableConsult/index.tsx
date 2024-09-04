import { DataGrid } from '@mui/x-data-grid';
import Consult from '../../types/consult';
import createConsultColumns from './DefColumns';
import { Box, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Button from '../Button';
import ConsultService from '../../services/ConsultService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface TableConsultProps {
  consultsData: Consult[];
  realoadData?: () => void;
}

export default function TableConsult({
  consultsData,
  realoadData = () => {},
}: TableConsultProps) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [diagnostic, setDiagnostic] = useState('');
  const [prescription, setPrescription] = useState('');
  const [reasonCancel, setReasonCancel] = useState('');
  const [consultId, setConsultId] = useState(0);
  const [actionType, setActionType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleCancelConsult() {
    setIsLoading(true);
    ConsultService.cancelConsult(consultId, reasonCancel)
      .then(() => {
        toast.success('Consulta cancelada com sucesso!');
        realoadData();
        setIsModalVisible(false);
      })
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  }

  function handleCompleteConsult() {
    setIsLoading(true);
    ConsultService.completeConsult(consultId, {
      diagnostic,
      prescription,
    })
      .then(() => {
        toast.success('Consulta completa!');
        realoadData();
        setIsModalVisible(false);
      })
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  }

  function handleShowConsult(consultId: number) {
    console.log(`Numero da consulta: ${consultId}`);
    ConsultService.getPrescription(consultId)
      .then(data => {
        console.log(data);
        setDiagnostic(data.diagnostic);
        setPrescription(data.prescription);
        setActionType('prescription');
        setIsModalVisible(true);
      })
      .catch(error => toast.error(error.message));
  }

  return (
    <>
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
              <Button
                fullWidth
                onClick={handleCancelConsult}
                loading={isLoading}
              >
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
              <Button
                fullWidth
                onClick={handleCompleteConsult}
                loading={isLoading}
              >
                Completar
              </Button>
            </>
          )}
          {actionType == 'prescription' && (
            <>
              <Typography>Diagnostico: {diagnostic}</Typography>
              <Typography>Prescrição: {prescription}</Typography>
            </>
          )}
        </Box>
      </Modal>
      <DataGrid
        rows={consultsData}
        columns={createConsultColumns({
          onCompleteConsult: id => {
            setPrescription('');
            setDiagnostic('');
            setIsModalVisible(true);
            setActionType('complete');
            setConsultId(id);
          },
          onCancelConsult: id => {
            setIsModalVisible(true);
            setActionType('cancel');
            setConsultId(id);
          },
          onUpdateConsult: consultData => {
            navigate('/appointment', { state: consultData });
          },
          onShowPrecription: handleShowConsult,
        })}
      />
    </>
  );
}
