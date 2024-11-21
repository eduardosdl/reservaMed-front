import { Box, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';

interface PrescriptionModalProps {
  data: string;
  modalOpen: boolean;
  onClose: () => void;
}

export function DescriptionConsultModal({
  data,
  modalOpen,
  onClose,
}: PrescriptionModalProps) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Modal open={modalOpen} onClose={onClose}>
      <Box
        maxWidth={600}
        width={smDown ? `calc(100% - ${theme.spacing(2)})` : '100%'}
        padding={smDown ? theme.spacing(2) : theme.spacing(4)}
        maxHeight="80%"
        overflow="auto"
        boxShadow={theme.shadows[24]}
        bgcolor={theme.palette.background.paper}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography
                gutterBottom
                variant="h6"
                component="h6"
                sx={{
                  paddingBottom: theme.spacing(2),
                }}
              >
                Descrição da Consulta
              </Typography>
        <Typography>{data}</Typography>
      </Box>
    </Modal>
  );
}
