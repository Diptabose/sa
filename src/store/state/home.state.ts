import { Email, Opinion, Tags } from "@/types/email";
import { FormikHelpers, FormikProps } from "formik";


export interface HomeInitialState {
  emails: Email[],
  selectedEmailIndex: number,
  openSelectTagDialog: boolean,
  openSelectProjectDialog: boolean,
  openFormSummaryDialog: boolean,
  page: number,
  loading: boolean,
  stillScrollable: boolean,
  opinions: Opinion[],
  tags: Tags[],
  skip: number,
  total: number,
}

export const initialState: HomeInitialState = {
  emails: [],
  openSelectTagDialog: false,
  openSelectProjectDialog: false,
  openFormSummaryDialog: false,
  selectedEmailIndex: 0,
  page: 1,
  loading: true,
  stillScrollable: true,
  opinions: [],
  tags: [],
  skip: 0,
  total: 0,
};
