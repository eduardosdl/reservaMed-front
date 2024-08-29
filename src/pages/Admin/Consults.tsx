import { useEffect, useState } from 'react';
import { AlertColor, Box } from '@mui/material';

import Button from '../../components/Button';
import Toast from '../../components/Toast';
import Consult from '../../types/consult';
import ConsultService from '../../services/ConsultService';
import TableConsult from '../../components/TableConsult';
import { useNavigate } from 'react-router-dom';

export default function Consults() {
  const navigate = useNavigate();
  // inicializacao dos estados
  const [consults, setConsults] = useState<Consult[]>([]);
  const [toastIsVisible, setToastIsVisible] = useState(false);
  const [toastType, setToastType] = useState<AlertColor>('error');
  const [toastMessage, setToastMessage] = useState(
    'Houve um erro ao buscar consultas',
  );

  function getAllConsults() {
    ConsultService.getAllConsults()
      .then(data => {
        setConsults(data);
      })
      .catch(error => {
        console.error('Houve um erro ao buscar consultas:', error);
        setToastType('error');
        setToastMessage('Houve um erro ao buscar consultas');
        setToastIsVisible(true);
      });
  }

  // carregamento dos dados na tabela
  useEffect(() => {
    getAllConsults();
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '90%',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Toast
        isVisible={toastIsVisible}
        onClose={() => setToastIsVisible(false)}
        type={toastType}
        description={toastMessage}
      />

      <Button
        sx={{ width: 'fit-content' }}
        onClick={() => {
          navigate('/appointment');
        }}
      >
        Nova consulta
      </Button>
      <TableConsult consultsData={consults} />
    </Box>
  );
}
