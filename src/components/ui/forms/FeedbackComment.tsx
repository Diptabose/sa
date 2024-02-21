import FormikTextField from "@/components/atomic/form/FormikTextField";
import { CommentsFeedBackForm } from "@/types/formik";
import { FormikProps } from "formik";
import React, { useEffect } from "react";

interface Props {
  formikProp: FormikProps<Partial<CommentsFeedBackForm>>;
}

const FeedbackComment = ({ formikProp }: Props) => {
  useEffect(() => {
    return () => {
      formikProp.resetForm();
    };
  }, []);
  return (
    <FormikTextField
      formikProp={formikProp}
      multiline
      minRows={3}
      label="Enter a brief description"
      name="comment"
      mandatory
      labelProps={{ className: "text-black" }}
      placeholder="Description"
    />
  );
};

export default FeedbackComment;
