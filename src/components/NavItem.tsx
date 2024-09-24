import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Icon,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

interface NavItemProps extends ListItemButtonProps {
  name: string;
  icon: ReactNode;
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
