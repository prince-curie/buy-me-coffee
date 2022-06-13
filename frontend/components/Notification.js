import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function Notification({
  alertType, 
  alertContent, 
  isSnackBarOpen, 
  setIsSnackBarOpen, 
  setAlertType, 
  setAlertContent
}) {
  const closeAlert = () => {
    setAlertType(''); 
    setAlertContent('');
  }
  
  const closeSnackBar = () => {
    setIsSnackBarOpen(false);
  }
  
  return (
    <Snackbar 
      open={isSnackBarOpen} 
      autoHideDuration={5000} 
      onClose={ closeSnackBar } 
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      key={'top' + 'right'}
    > 
      <Alert 
          onClose={ closeAlert } 
          severity={alertType}
      > 
        {alertContent} 
      </Alert> 
    </Snackbar>
  )
}
