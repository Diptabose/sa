"use client";
import React, { useState } from "react";
import CustomDialog from "@/components/atomic/dialogs/CustomDialog";
import { IconButton } from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { DeleteMethod } from "@/utils/app/api";
import { revalidateRoute } from "@/app/server_actions/actions";

interface Props {
  deleteId: string;
  deleteItem: "tags" | "opinions";
}

const DeleteDialog = ({ deleteId, deleteItem }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  function handleDialogToggle() {
    setOpen(!open);
    setLoading(false);
    setErrMsg(null);
  }

  async function handleDelete() {
    setLoading(true);

    DeleteMethod(`settings/${deleteItem}/delete/${deleteId}`)
      .then((data) => {
        handleDialogToggle();
        revalidateRoute(`/sentimentAnalysis/settings/${deleteItem}`)
      })
      .catch((err) => {
        setErrMsg(err?.response?.data?.message);
      }).finally(()=>{
        setLoading(false);
      });
  }

  return (
    <>
      <IconButton onClick={handleDialogToggle} size="small">
        <DeleteOutline />
      </IconButton>
      <CustomDialog
        open={open}
        errorText={errMsg}
        loading={loading}
        content="Do you want to delete the item ?"
        onCancel={handleDialogToggle}
        onConfirmation={handleDelete}
        title="Delete"
        actionButtonLabel="Delete"
      ></CustomDialog>
    </>
  );
};

export default DeleteDialog;
