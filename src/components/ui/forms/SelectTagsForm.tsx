import FormikSelectField from "@/components/atomic/form/FormikSelectField";
import { selectTagsSchema } from "@/constants/form/yup/constants";
import HomeContext, { HomeContextProps } from "@/store/contexts/home.context";
import { Button, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as API from "@/utils/app/api";

interface Props {
  fullScreen: boolean;
}

const SelectTagsForm = ({ fullScreen }: Props) => {
  const { state, dispatch: homeDispatch } =
    useContext<HomeContextProps>(HomeContext);
  const [loading, setLoading] = useState<boolean>(false);

  const { selectedEmailIndex, emails, openSelectTagDialog, tags } = state;
  const selectedEmail = emails[selectedEmailIndex];
  const [errMessage, setErrMessage] = useState<string | null>(null);

  const lastTags = selectedEmail?.lastTags?.[0];

  useEffect(() => {
    if (openSelectTagDialog) {
      selectTagsForm.setValues({
        tagid: lastTags?.tag ?? "",
        subtagid: lastTags?.subtag ?? "",
      });
    }
  }, [openSelectTagDialog]);

  const selectTagsForm = useFormik({
    initialValues: {
      tagid: "",
      subtagid: "",
    },
    validationSchema: selectTagsSchema,
    onSubmit: (values, helpers) => {
      API.PutMethod("settings/tags/add_tag", {
        ...values,
        email_id: selectedEmail?._id ?? null,
      })
        .then(async (response) => {
          if (response.success) {
            let updatedEmails = emails;
            updatedEmails[selectedEmailIndex] =
              response?.data?.updatedEmail?.data;
            homeDispatch({ field: "emails", value: updatedEmails });
            homeDispatch({ field: "openSelectTagDialog", value: false });
          }
        })
        .catch((err) => {
          console.log("I set error");
          console.log("Error is ", err?.response?.data?.message);
          setErrMessage(err?.response?.data?.message);
        })
        .finally(() => {});
    },
  });


  const [subTagData] = tags.filter(
    (data) => data._id === selectTagsForm.values.tagid
  );

  return (
    <form
      onSubmit={selectTagsForm.handleSubmit}
      className={`flex flex-col gap-2 ${fullScreen ? "w-full" : ""}`}
    >
      <FormikSelectField
        formikProp={selectTagsForm}
        name="tagid"
        selectKey="name"
        selectData={tags ?? [{ _id: "1", name: "" }]}
        placeholder="Select Tag"
        inputLabel="Tag"
        useTopLabel
        mandatory
      />
      <FormikSelectField
        formikProp={selectTagsForm}
        name="subtagid"
        selectKey="name"
        selectData={subTagData?.subtags ?? [{ name: "", id: "1" }]}
        placeholder="Select Sub-Tag"
        inputLabel="Sub-Tag"
        useTopLabel
      />
      <div className="flex items-center gap-small justify-between">
        <span className="text-sm text-content-error">{errMessage}</span>
        <div className="flex items-center gap-small">
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              homeDispatch({ field: "openSelectTagDialog", value: false });
            }}
          >
            Close
          </Button>
          <Button type="submit" variant="contained" size="small">
            {loading ? (
              <CircularProgress className="text-white" size={20} />
            ) : (
              <></>
            )}
            Select
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SelectTagsForm;
