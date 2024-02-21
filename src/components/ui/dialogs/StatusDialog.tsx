"use client";

import CustomDialog from "@/components/atomic/dialogs/CustomDialog";
import AppContext, { AppContextProps } from "@/store/contexts/app.context";
import { useContext } from "react";

const StatusDialog = () => {
  const { state, dispatch } = useContext<AppContextProps>(AppContext);

  const { status_dialog } = state;
  const { open, onCancel, onClose, message } = status_dialog;

  function handleClose() {
    dispatch({
      field: "status_dialog",
      value: {
        open: false,
        message: "",
        onClose: () => {},
      },
    });
  }

  return (
    <>
      <CustomDialog
        open={open}
        content={message}
        onCancel={async () => {
          await onCancel();
          handleClose();
        }}
        onConfirmation={async () => {
          await onClose();
          handleClose();
        }}
        title="Warning"
        actionButtonLabel="Okay"
      ></CustomDialog>
    </>
  );
};

export default StatusDialog;
