import React, { ReactNode } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions, { DialogActionsProps } from "@mui/material/DialogActions";
import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";
import DialogTitle, { DialogTitleProps } from "@mui/material/DialogTitle";


interface Props {
  open:boolean,
  title: ReactNode;
  content: ReactNode;
  actions?: ReactNode;
  dialogProps?:Omit<DialogProps , "open">;
  titleProps?: DialogTitleProps;
  contentProps?: DialogContentProps;
  actionProps?: DialogActionsProps;
}

const GenericDialog = ({
  open,
  content,
  title,
  dialogProps,
  titleProps,
  contentProps,
  actionProps,
  actions
}: Props) => {

  
  return (
    <Dialog open={open} {...dialogProps} keepMounted={false} >
      <DialogTitle {...titleProps}>{title}</DialogTitle>
      <DialogContent {...contentProps} >{content}</DialogContent>
      <DialogActions {...actionProps}>{actions}</DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
