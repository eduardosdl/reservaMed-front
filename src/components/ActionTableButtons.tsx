import { ButtonGroup, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

interface ActionTableButtonProps {
  onOpenEditModal: () => void;
  onDelete: () => void;
}

export function ActionTableButton({
  onOpenEditModal,
  onDelete,
}: ActionTableButtonProps) {
  return (
    <ButtonGroup variant="outlined">
      <IconButton aria-label="edit" onClick={() => onOpenEditModal()}>
        <EditIcon color="success" />
      </IconButton>
      <IconButton aria-label="delete" onClick={() => onDelete()}>
        <DeleteIcon color="error" />
      </IconButton>
    </ButtonGroup>
  );
}
