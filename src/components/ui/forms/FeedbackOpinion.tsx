"use client";
import FeedbackForm from "@/components/ui/forms/FeedbackForm";
import FeedbackSummaryTable from "@/components/ui/tables/FeedbackSummaryTable";
import FormikRadioGroup from "@/components/atomic/form/FormikRadioGroup";

import {
  commentsFormSchema,
  feedbackFormSchema,
} from "@/constants/form/yup/constants";
import OnepagerContext, {
  OnepagerContextProps,
} from "@/store/contexts/onepager.context";
import { Opinion } from "@/types/email";
import {
  CommentsFeedBackForm,
  FeedbackForm as IFeedbackForm,
} from "@/types/formik";
import { GetMethod, PostMethod } from "@/utils/app/api";
import {
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import FeedbackComment from "./FeedbackComment";

interface Props {
  opinionsData: Opinion[];
}

const FeedbackOpinion = ({ opinionsData }: Props) => {
  const [opinions, setOpinions] = useState<Opinion[]>(opinionsData);
  const [loading, setLoading] = useState<boolean>(false);

  const { state, dispatch } = useContext<OnepagerContextProps>(OnepagerContext);
  const { email } = state;

  const feedBackForm = useFormik<Partial<IFeedbackForm>>({
    initialValues: {
      reasonid: "",
      subreasonid: "",
      solutionid: "",
      context_of_issue: "",
      qc_check_point_exists: null,
      can_automate_avoid_issue: null,
      new_report: null,
      issue_due_to_leave: null,
      can_avoid_issue: null,
      action_plan_to_avoid_issue: "",
    },
    validationSchema: feedbackFormSchema,
    onSubmit: (values) => {},
  });

  const commentFeedbackForm = useFormik<CommentsFeedBackForm>({
    initialValues: {
      comment: "",
    },
    validationSchema: commentsFormSchema,
    onSubmit: () => {
      // Do nothing.
    },
  });

  const feedbackOpinionForm = useFormik({
    initialValues: {
      opinion: null,
    },
    onSubmit: async (formData) => {
      let sendData = {};
      let isError = false;
      if (selectedOpinion.name === "Yes") {
        await feedBackForm.setTouched(
          {
            action_plan_to_avoid_issue: true,
            can_automate_avoid_issue: true,
            can_avoid_issue: true,
            comment: true,
            context_of_issue: true,
            issue_due_to_leave: true,
            new_report: true,
            qc_check_point_exists: true,
            reasonid: true,
            solutionid: true,
            subreasonid: true,
          },
          true
        );
        const errors = await feedBackForm.validateForm();
        feedBackForm.setErrors(errors);
        console.log(errors);
        if (Object.keys(errors).length === 0) {
          const values = {
            opinionid: formData.opinion,
            ...feedBackForm.values,
            role: email.current_accessing_role,
            email_id: email._id,
            project_details: email?.project_details,
          };
          sendData = values;
        } else {
          isError = true;
        }
      } else if (selectedOpinion.name === "No") {
        await commentFeedbackForm.setTouched(
          {
            comment: true,
          },
          true
        );
        const errors = await commentFeedbackForm.validateForm();
        commentFeedbackForm.setErrors(errors);
        console.log(errors);
        if (Object.keys(errors).length === 0) {
          const values = {
            opinionid: formData.opinion,
            ...commentFeedbackForm.values,
            role: email?.current_accessing_role,
            email_id: email?._id,
            project_details: email?.project_details,
          };
          sendData = values;
        } else {
          isError = true;
        }
      }

      if (!isError) {
        setLoading(true);
        PostMethod("feedback/add", sendData)
          .then((response) => {
            if (response.success) {
              dispatch({ field: "email", value: response?.data?.updatedEmail });
            }
          })
          .catch((err) => {})
          .finally(() => {
            setLoading(false);
          });
      }
    },
  });

  const [selectedOpinion] = opinions.filter((opinion) => {
    return opinion._id === feedbackOpinionForm.values.opinion;
  });

  async function handleApprove() {
    PostMethod("feedback/add", {
      email_id: email?._id,
      role: email?.current_accessing_role,
      project_details: email?.project_details,
    })
      .then((response) => {
        if (response.success) {
          dispatch({ field: "email", value: response.data.updatedEmail ?? {} });
        }
      })
      .catch((err) => {});
  }

  return (
    <div className="w-full flex-1 overflow-y-auto shadow-md px-2">
      {email?.status?.approved_by_sm?.status ? (
        <div className="flex flex-col gap-small justify-between h-full pb-2">
          <FeedbackSummaryTable
            data={email?.feedback}
            comments={email?.feedback?.comment?.length > 0}
          />

          {((!email.status?.approved_by_elt?.status &&
            email.current_accessing_role === "elt") ||
            (!email.status?.approved_by_slt?.status &&
              email.current_accessing_role === "slt")) && (
            <Button
              variant="contained"
              size="small"
              className="self-end w-fit disabled"
              onClick={handleApprove}
            >
              Approve
            </Button>
          )}
        </div>
      ) : (
        <>
          {email?.current_accessing_role === "sm" ? (
            <form
              className="flex flex-col justify-between h-full"
              onSubmit={feedbackOpinionForm.handleSubmit}
            >
              <div className="flex flex-col gap-small">
                <FormikRadioGroup
                  name={"opinion"}
                  label={"Opinion"}
                  labelProps={{ className: "font-medium text-black" }}
                  row
                  onChange={async (event, value) => {
                    await feedbackOpinionForm?.setFieldValue("opinion", value);
                  }}
                  onBlur={feedbackOpinionForm?.handleBlur}
                  value={feedbackOpinionForm?.values["opinion"]}
                  mandatory
                >
                  {opinions.map((opinion) => {
                    return (
                      <FormControlLabel
                        key={opinion._id}
                        value={opinion._id}
                        control={<Radio size="small" />}
                        label={opinion.name}
                      />
                    );
                  })}
                </FormikRadioGroup>
                <Divider />
                {selectedOpinion?.name === "Yes" ? (
                  <FeedbackForm formikProp={feedBackForm} />
                ) : (
                  <></>
                )}
                {selectedOpinion?.name === "No" ? (
                  <FeedbackComment formikProp={commentFeedbackForm} />
                ) : (
                  <></>
                )}
              </div>

              {feedbackOpinionForm.values.opinion !== null ? (
                <div className="flex gap-small justify-end">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      feedbackOpinionForm.resetForm();
                      commentFeedbackForm.resetForm();
                      feedBackForm.resetForm();
                    }}
                  >
                    Reset
                  </Button>
                  <Button variant="contained" size="small" type="submit">
                    {loading && (
                      <CircularProgress size={14} sx={{ color: "white" }} />
                    )}
                    Submit
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </form>
          ) : (
            <>You cant take an action. SM has not submitted the review.</>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackOpinion;
