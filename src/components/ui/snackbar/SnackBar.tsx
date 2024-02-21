"use client";
import React, { useContext } from "react";
import { Alert, Button, Snackbar, SnackbarContent } from "@mui/material";
import AppContext, { AppContextProps } from "@/store/contexts/app.context";

const SnackBar = () => {
  const { state, dispatch } = useContext<AppContextProps>(AppContext);
  const { open, message, alertType, action, actionText, onCancel } =
    state?.snack_bar;

  const handleClose = () => {
    onCancel && onCancel();
    dispatch({
      field: "snack_bar",
      value: {
        open: false,
        message: "",
        alertType,
        actionText: "",
        action: () => {},
        onCancel: () => {},
      },
    });
  };

  const Action = () => {
    if (actionText && actionText.length > 0) {
      console.log("Im inside this snack bar actions");
      return (
        <Button
          size="small"
          onClick={async () => {
            action && (await action());
            handleClose();
          }}
          color="inherit"
        >
          {actionText}
        </Button>
      );
    }

    return null;
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={alertType}
        variant="filled"
        sx={{ width: "100%" }}
        action={<Action />}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
