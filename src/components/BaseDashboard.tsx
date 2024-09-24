import { ReactNode } from 'react';
import { Menu } from '@mui/icons-material';
import {
  Box,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { Button } from './Button';

import { useDrawerContext } from '../contexts/drawerContext';

interface BaseDashboardProps {
  title: string;
  buttonLabel?: string;
  handleOpenCreateModal: () => void;
  children: ReactNode;
}

export function BaseDashboard({
  title,
  buttonLabel,
  handleOpenCreateModal,
  children,
}: BaseDashboardProps) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" gap={1}>
          {smDown && (
            <IconButton
              onClick={() => {
                toggleDrawerOpen();
              }}
            >
              <Icon>
                <Menu />
              </Icon>
            </IconButton>
          )}

          <Typography
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipses"
            variant={smDown ? 'h6' : 'h5'}
          >
            {title}
          </Typography>
        </Box>

        {!smDown && buttonLabel && (
          <Button sx={{ width: 'fit-content' }} onClick={handleOpenCreateModal}>
            {buttonLabel}
          </Button>
        )}
      </Box>
      {children}
      {smDown && buttonLabel && (
        <Button
          fullWidth
          sx={{ paddingBottom: '8px' }}
          onClick={handleOpenCreateModal}
        >
          {buttonLabel}
        </Button>
      )}
    </Box>
  );
}
