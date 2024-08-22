import { ReactNode } from 'react';
import {
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavItemProps extends ListItemButtonProps {
  name: string;
  icon: ReactNode;
  path: string;
}

export default function NavItem({
  name,
  icon,
  path,
  sx,
  ...restProps
}: NavItemProps) {
  const navigate = useNavigate();

  function isActive(path: string): boolean {
    return location.pathname === path;
  }

  return (
    <ListItemButton
      selected={isActive(path)}
      sx={{
        ...sx,
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
      {...restProps}
    >
      {icon && (
        <ListItemIcon>
          <span style={{ color: 'inherit' }}>{icon}</span>
        </ListItemIcon>
      )}

      <ListItemText primary={name} />
    </ListItemButton>
  );
}
