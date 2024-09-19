import {
  Icon,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavItemProps extends ListItemButtonProps {
  name: string;
  icon: string;
  path: string;
}

export function NavItem({ name, icon, path }: NavItemProps) {
  const navigate = useNavigate();

  function isActive(path: string): boolean {
    return location.pathname === path;
  }

  return (
    <ListItemButton
      selected={isActive(path)}
      sx={{
        color: theme => theme.palette.primary.contrastText,
        '&.Mui-selected': {
          backgroundColor: theme => theme.palette.primary.light,
          color: theme => theme.palette.primary.contrastText,
        },
        '&.Mui-selected:hover': {
          backgroundColor: theme => theme.palette.primary.main,
        },
      }}
      onClick={() => navigate(path)}
    >
      {icon && (
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
      )}

      <ListItemText primary={name} />
    </ListItemButton>
  );
}
