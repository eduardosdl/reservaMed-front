import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import Button from '../../components/Button';
import Toast from '../../components/Toast';
import Consult from '../../types/consult';
import ConsultService from '../../services/ConsultService';
import TableConsult from '../../components/TableConsult';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function HistoryConsults() {
  const navigate = useNavigate();
  // inicializacao dos estados
  const [consults, setConsults] = useState<Consult[]>([]);

  function getAllConsults() {
    ConsultService.getHistoryConsults()
      .then(data => {
        setConsults(data);
      })
      .catch(error => {
        console.error('Houve um erro ao buscar consultas:', error);
        toast.error('Houve um erro ao buscar consultas');
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
      <Toast />

      <Button
        sx={{ width: 'fit-content' }}
        onClick={() => {
          navigate('/appointment');
        }}
      >
        Nova consulta
      </Button>
      <TableConsult consultsData={consults} realoadData={getAllConsults} />
    </Box>
  );
}
