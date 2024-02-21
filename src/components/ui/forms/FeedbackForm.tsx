"use client";
import FormikRadioGroup from "@/components/atomic/form/FormikRadioGroup";
import FormikSelectField from "@/components/atomic/form/FormikSelectField";
import FormikTextField from "@/components/atomic/form/FormikTextField";
import { FormControlLabel, Radio } from "@mui/material";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { GetMethod } from "@/utils/app/api";
import { FeedbackForm } from "@/types/formik";

interface Props {
  formikProp: FormikProps<Partial<FeedbackForm>>;
}

const FeedbackForm = ({ formikProp: feedBackForm }: Props) => {
  interface Reason {
    _id?: string;
    name: string;
  }

  const [reason, setReason] = useState<Reason[]>([]);
  const [subreason, setSubReason] = useState<Reason[]>([]);
  const [solution, setSolution] = useState<Reason[]>([]);

  useEffect(() => {
    GetMethod("feedback/all")
      .then((response) => {
        const { reasons, subreasons, solutions } = response.data;
        setReason(reasons);
        setSubReason(subreasons);
        setSolution(solutions);
      })
      .catch((err) => {});

    return () => {
      feedBackForm.resetForm();
    };
  }, []);


  function generateRadioError(name:string){
    const error = feedBackForm.touched[name] && feedBackForm.errors[name] ? feedBackForm.errors[name] : null
    return error;
  }

  return (
    <div className="flex flex-col">
      <FormikSelectField
        formikProp={feedBackForm}
        name="reasonid"
        inputLabel="Reason"
        selectData={reason}
        placeholder="Select Reason"
        selectKey="name"
        useTopLabel
        mandatory
        labelProps={{ className: "text-black" }}
      />
      <FormikSelectField
        formikProp={feedBackForm}
        name="subreasonid"
        inputLabel="Sub Reason"
        selectData={subreason}
        placeholder="Select Sub Reason"
        selectKey="name"
        useTopLabel
        mandatory
        labelProps={{ className: "text-black" }}
      />

      <FormikSelectField
        formikProp={feedBackForm}
        name="solutionid"
        inputLabel="Solution"
        selectData={solution}
        placeholder="Select Solution"
        selectKey="name"
        useTopLabel
        mandatory
        labelProps={{ className: "text-black" }}
      />

      <FormikTextField
        name="context_of_issue"
        multiline
        minRows={3}
        formikProp={feedBackForm}
        placeholder="Context"
        label={"Context on what is the nature of issue the client is facing"}
        useTopLabel
        mandatory
        labelProps={{ className: "text-black" }}
      />

      <div className="flex flex-col gap-medium">
        <FormikRadioGroup
          name={"qc_check_point_exists"}
          label={"Does a QC check point exists for this issue ?"}
          row
          labelProps={{
            className: "font-medium !text-black",
            error: generateRadioError('qc_check_point_exists'),
          }}
          onChange={async (event, value) => {
            await feedBackForm?.setFieldValue(
              "qc_check_point_exists",
              value === "false" ? false : true
            );
          }}
          onBlur={feedBackForm?.handleBlur}
          value={feedBackForm?.values["qc_check_point_exists"]}
          mandatory={true}
        >
          <FormControlLabel
            value={true}
            control={<Radio size="small" />}
            label="Yes"
          />
          <FormControlLabel
            value={false}
            control={<Radio size="small" />}
            label="No"
          />
        </FormikRadioGroup>
        <FormikRadioGroup
          name={"can_automate_avoid_issue"}
          label={"Can automating this step avoid the issue ?"}
          row
          labelProps={{
            className: "font-medium text-black",
            error: generateRadioError('can_automate_avoid_issue'),
          }}
          onChange={async (event, value) => {
            await feedBackForm?.setFieldValue(
              "can_automate_avoid_issue",
              value === "false" ? false : true
            );
          }}
          onBlur={feedBackForm?.handleBlur}
          value={feedBackForm?.values["can_automate_avoid_issue"]}
          mandatory
        >
          <FormControlLabel
            value={true}
            control={<Radio size="small" />}
            label="Yes"
          />
          <FormControlLabel
            value={false}
            control={<Radio size="small" />}
            label="No"
          />
        </FormikRadioGroup>

        <FormikRadioGroup
          name={"new_report"}
          label={"Is this issue with new Report/ Request ?"}
          row
          labelProps={{
            className: "font-medium text-black",
            error: generateRadioError('new_report'),
          }}
          onChange={async (event, value) => {
            await feedBackForm?.setFieldValue(
              "new_report",
              value === "false" ? false : true
            );
          }}
          onBlur={feedBackForm?.handleBlur}
          value={feedBackForm?.values["new_report"]}
          mandatory
        >
          <FormControlLabel
            value={true}
            control={<Radio size="small" />}
            label="Yes"
          />
          <FormControlLabel
            value={false}
            control={<Radio size="small" />}
            label="No"
          />
        </FormikRadioGroup>
        <FormikRadioGroup
          name={"issue_due_to_leave"}
          label={
            "Is this issue somehow related to bandwidth/ context gap due to anyone on leave on the day of deliverable ?"
          }
          row
          labelProps={{
            className: "font-medium text-black",
            error: generateRadioError('issue_due_to_leave'),
          }}
          onChange={async (event, value) => {
            await feedBackForm?.setFieldValue(
              "issue_due_to_leave",
              value === "false" ? false : true
            );
          }}
          onBlur={feedBackForm?.handleBlur}
          value={feedBackForm?.values["issue_due_to_leave"]}
          mandatory
        >
          <FormControlLabel
            value={true}
            control={<Radio size="small" />}
            label="Yes"
          />
          <FormControlLabel
            value={false}
            control={<Radio size="small" />}
            label="No"
          />
        </FormikRadioGroup>
        <FormikRadioGroup
          name={"can_avoid_issue"}
          label={
            "Could we have done anything to avoid client facing this issue ?"
          }
          labelProps={{
            className: "font-medium !text-black",
            error: generateRadioError('can_avoid_issue'),
          }}
          row
          onChange={async (event, value) => {
            await feedBackForm?.setFieldValue(
              "can_avoid_issue",
              value === "false" ? false : true
            );
          }}
          onBlur={feedBackForm?.handleBlur}
          value={feedBackForm?.values["can_avoid_issue"]}
          mandatory
        >
          <FormControlLabel
            value={true}
            control={<Radio size="small" />}
            label="Yes"
          />
          <FormControlLabel
            value={false}
            control={<Radio size="small" />}
            label="No"
          />
        </FormikRadioGroup>
      </div>

      <div className="mt-2">
        <FormikTextField
          formikProp={feedBackForm}
          name="action_plan_to_avoid_issue"
          label="What action plan will be taken to avoid a repetition of this issue and by when ?"
          useTopLabel
          multiline
          minRows={3}
          placeholder="Write here"
          labelProps={{ className: "font-medium text-black" }}
          mandatory
        />
      </div>
    </div>
  );
};

export default FeedbackForm;
