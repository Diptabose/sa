"use client";
import React from "react";
import { FilterFormInterface } from "@/types/formik";
import { useFormik } from "formik";
import InboxContent from "./InboxContent";
import Filters from "../../ui/filters/inbox/Filters";
import { inboxFilterSchema } from "@/constants/form/yup/constants";

export const inboxInitialValues = {
  search: "",
  start_date: null,
  end_date: null,
  opinionid: "",
  review_status: "",
  subtagid: "",
  tagid: "",
};

const FiltersInbox = () => {
  const formikProp = useFormik<FilterFormInterface>({
    initialValues: inboxInitialValues,
    validationSchema: inboxFilterSchema,
    onSubmit: () => {},
  });

  return (
    <form
      className="flex flex-col h-full overflow-y-auto"
    >
      <Filters formikProp={formikProp} />
      <InboxContent formikProp={formikProp} />
    </form>
  );
};

export default FiltersInbox;
