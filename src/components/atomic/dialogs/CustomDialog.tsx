import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";

interface Props {
  loading?: boolean;
  open: boolean;
  title: string;
  onConfirmation: () => void;
  onCancel: () => void;
  content: string;
  actionButtonLabel?: string;
  errorText?: string | null;
}



// This dialogs purpose is to show confirmation and other status...

const CustomDialog = ({
  open,
  content,
  onCancel,
  onConfirmation,
  title,
  actionButtonLabel,
  loading,
  errorText,
}: Props) => {
  return (
    <Dialog open={open} onClose={onCancel} className="confirmation">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {errorText && errorText.length > 0 && (
          <span className="text-sm text-content-error mr-auto">{errorText}</span>
        )}
        <Button size="small" variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="small" variant="contained" onClick={onConfirmation}>
          {loading ? (
            <CircularProgress size={14} sx={{ color: "white" }} />
          ) : (
            <></>
          )}
          {actionButtonLabel ?? "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
