"use client";
import FormikRadioGroup from "@/components/atomic/form/FormikRadioGroup";
import FormikSelectField from "@/components/atomic/form/FormikSelectField";
import ProjectSelectField from "@/components/atomic/form/ProjectSelectField";
import { selectProjectSchema } from "@/constants/form/yup/constants";
import AppContext, { AppContextProps } from "@/store/contexts/app.context";
import HomeContext, { HomeContextProps } from "@/store/contexts/home.context";
import { ProjectDetails, Recipients } from "@/types/email";
import { ProjectForm } from "@/types/formik";
import { PostMethod } from "@/utils/app/api";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";

const SelectProjectForm = () => {
  const { state, dispatch: homeDispatch } =
    useContext<HomeContextProps>(HomeContext);

  const { state: appState, dispatch: appDispatch } =
    useContext<AppContextProps>(AppContext);

  const { openSelectProjectDialog, emails, selectedEmailIndex } = state;

  const selectedEmail = emails[selectedEmailIndex];
  const [projectDetails, setProjectDetails] = useState<ProjectDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string | null>(null);

  const [didConfirm, setConfirm] = useState<boolean>(false);

  async function sendProjectDetails(project_details: any, isRetrying: boolean) {
    console.log("I came again", project_details);
    PostMethod("projects/add", project_details)
      .then((response) => {
        if (!isRetrying) {
          let updatedEmails = emails;
          updatedEmails[selectedEmailIndex] = response.data.updatedEmail.data;
          homeDispatch({ field: "emails", value: updatedEmails });
          homeDispatch({ field: "openSelectProjectDialog", value: false });
        }
        console.log("The details are updated successfully");
        if (openSelectProjectDialog) {
          homeDispatch({ field: "openSelectProjectDialog", value: false });
        }
        return appDispatch({
          field: "snack_bar",
          value: {
            open: true,
            message: `Notification send via ${
              project_details?.communication_mode === "desk_notify"
                ? "Desk Notify"
                : "Email"
            }`,
            alertType: "success",
          },
        });
      })
      .catch((err) => {
        console.log("The error is", err);
        return appDispatch({
          field: "snack_bar",
          value: {
            open: true,
            message: "Couldn't update project details",
            alertType: "error",
            actionText: "Retry",
            action: () => {
              return sendProjectDetails({ ...project_details }, true);
            },
          },
        });
      })
      .finally(() => {
        if (!isRetrying) {
          setLoading(false);
        }
      });
  }

  const selectProjectForm = useFormik<ProjectForm>({
    initialValues: {
      project_id: "",
      communication_mode: "",
    },
    validationSchema: selectProjectSchema,
    onSubmit: (values, helpers) => {
      const selected_project = projectDetails.find((project) => {
        return project._id === values.project_id;
      });

      setLoading(true);
      const projectSelectionDetails = {
        email_id: selectedEmail?._id ?? null,
        project_details: selected_project,
        communication_mode: values?.communication_mode,
      };
      sendProjectDetails(projectSelectionDetails, false);
    },
  });

  useEffect(() => {
    if (openSelectProjectDialog) {
      const unparsed_recipients = selectedEmail.toRecipients;
      const unparsed_cc_recipients = selectedEmail.ccRecipients;
      const recipeints = JSON.parse(unparsed_recipients) as Recipients[];
      const cc = JSON.parse(unparsed_cc_recipients);

      const emails = [...recipeints, ...cc].map((recipient) => {
        return recipient.emailAddress.address;
      });

      PostMethod("projects/all", {
        emails,
      })
        .then((data) => {
          setProjectDetails(data.staffing_details);
        })
        .catch((err) => {
          console.log("The error", err);
        });
    }

    return () => {
      selectProjectForm.resetForm();
    };
  }, [openSelectProjectDialog]);

  function generateRadioError(name: string) {
    const error =
      selectProjectForm.touched[name] && selectProjectForm.errors[name]
        ? selectProjectForm.errors[name]
        : null;
    return error;
  }

  return (
    <form
      onSubmit={selectProjectForm.handleSubmit}
      className="flex flex-col gap-small w-full"
    >
      <ProjectSelectField<ProjectForm>
        formikProp={selectProjectForm}
        inputLabel="Project"
        name="project_id"
        useTopLabel={false}
        selectData={projectDetails}
        selectKey="project_name"
        placeholder="Select Project"
        mandatory
      />

      <FormikRadioGroup
        name="communication_mode"
        label="Communication Mode"
        row
        labelProps={{
          className: "font-medium !text-black",
          error: generateRadioError("communication_mode"),
        }}
        onChange={selectProjectForm.handleChange}
        onBlur={selectProjectForm?.handleBlur}
        value={selectProjectForm?.values["comunication_mode"]}
        mandatory={true}
      >
        <FormControlLabel
          value={"email"}
          control={<Radio size="small" />}
          label="Email"
        />
        <FormControlLabel
          value={"desk_notify"}
          control={<Radio size="small" />}
          label="Desk Notify"
        />
      </FormikRadioGroup>

      <div>
        <FormControlLabel
          className="!text-sm"
          control={
            <Checkbox
              name="confirm"
              size="small"
              value={didConfirm}
              onChange={async (e) => {
                setConfirm(e.target.checked);
              }}
            />
          }
          label="I confirm that the selected project details are accurate."
          labelPlacement="end"
          disableTypography
        />
      </div>
      <div className="flex items-center gap-small justify-between pb-1">
        <span className="flex-1 text-sm text-content-error">{errMessage}</span>
        <div className="flex-[2] flex items-center gap-small justify-end">
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              homeDispatch({ field: "openSelectProjectDialog", value: false });
            }}
            className="disabled-outline"
            disabled={loading}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="small"
            className="disabled"
            disabled={!didConfirm || loading}
          >
            {loading ? (
              <CircularProgress className="text-white" size={20} />
            ) : (
              <></>
            )}
            Send for Review
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SelectProjectForm;
