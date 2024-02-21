import { ProjectDetails } from "@/types/email";
import { AlertColor } from "@mui/material";



export interface AppInitialState {
   status_dialog: {
      open: boolean,
      message: string,
      onClose: () => void,
      onCancel: () => void
   },

   snack_bar: {
      open: boolean,
      message: string,
      alertType: AlertColor,
      onCancel?: () => void,
      actionText?: string,
      action?: () => Promise<void>
   },

   project_selection?: {
      communication_mode: string,
      project_details: ProjectDetails,
      email_id: string
   }

}

export const initialState: AppInitialState = {
   status_dialog: {
      open: false,
      message: "",
      onClose: () => { },
      onCancel: () => { }
   },
   snack_bar: {
      open: false,
      message: "",
      alertType: "info",
   }
};
