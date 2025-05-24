import React from 'react';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from './CloseIcon';

interface NotificationProps {
  open: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ open, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={1000}
    onClose={onClose}
    message="Цена скопирована в буфер обмена"
    action={
      <IconButton size="small" color="inherit" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    }
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  />
);

export default Notification;
