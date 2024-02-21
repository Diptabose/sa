"use client";
import { FormikProps, useFormik } from "formik";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  FormLabel,
  IconButton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Tags } from "@/types/email";
import { tagsSchema } from "@/constants/form/yup/constants";
import FormikTextField from "@/components/atomic/form/FormikTextField";
import Delete from "@mui/icons-material/Delete";
import { Mode } from "@/types/params";
import FormikColorInput from "@/components/atomic/form/FormikColorInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as API from "@/utils/app/api";
import { revalidateRoute } from "@/app/server_actions/actions";

interface Props {
  initialValues: Tags;
  mode: Mode;
}

interface SubTagProps {
  index: number;
  tagsForm: FormikProps<Tags>;
  onDelete: () => void;
  name: string;
  setErrorMessage: any;
}

const CreateSubTag = ({
  index,
  tagsForm,
  onDelete,
  name,
  setErrorMessage,
}: SubTagProps) => {
  const handleTextFieldChange = (index: number, value: string) => {
    setErrorMessage(null);
    let newSubtags = [...tagsForm.values.subtags];
    newSubtags[index].name = value;
    tagsForm.setFieldValue("subtags", newSubtags);
  };

  const err = tagsForm?.errors?.subtags?.[index];

  let errText = null;
  if (typeof err === "object") {
    console.log("Yes array instance" , err);
    errText = err?.name;
  } else if (typeof err === 'string') {
    console.log("Yes instance of String" , err);
    errText = err;
  }
  else{
    console.log("In else" , err , typeof err);
  }

  console.log("The text is " , errText);

  return (
    <div className="flex flex-col">
      <div className="flex items-center w-full">
        <TextField
          size="small"
          className="w-full"
          onBlur={tagsForm.handleBlur}
          name={name}
          inputProps={{ maxLength: 20 }}
          value={tagsForm.values.subtags[index].name}
          onChange={(e) => {
            handleTextFieldChange(index, e.target.value);
          }}
        />

        <IconButton onClick={onDelete} color="error" className="">
          <Delete />
        </IconButton>
      </div>
      <span className="text-red-500 text-xs leading-3 mt-1">{errText}</span>
    </div>
  );
};

const CreateTag = ({ initialValues, mode }: Props) => {
  const [errMessage, setErrorMessage] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const tagsForm = useFormik<Tags>({
    initialValues: initialValues,
    validationSchema: tagsSchema,
    onSubmit: (values, helpers) => {
      let valuesToSend = values;
      valuesToSend.subtags = values.subtags.filter((subtag) => {
        if (subtag.name && subtag?.name?.length > 0) {
          return true;
        }
        return false;
      });

      const subtagnames = valuesToSend.subtags.map((subtag) =>
        subtag.name?.trim()
      );
      const setofsubtags = new Set(subtagnames);

      if (setofsubtags.size !== subtagnames.length) {
        setErrorMessage("Can't have same subtags");
        return;
      }

      const APIMethod = mode === "create" ? API.PostMethod : API.PutMethod;
      const url =
        mode === "create"
          ? `settings/tags/create`
          : `settings/tags/update/${initialValues?._id}`;

      setLoading(true);
      APIMethod(url, valuesToSend)
        .then((data) => {
          if (data.success) {
            revalidateRoute(
              "/sentimentAnalysis/settings/tags",
              "/sentimentAnalysis/settings/redirect?to=tags"
            );
            setLoading(false);
          }
        })
        .catch((err) => {
          setErrorMessage(err["response"]["data"]["message"]);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const fullScreen = useMediaQuery("(max-width:350px)");

  const addTextField = () => {
    tagsForm.setFieldValue("subtags", [
      ...tagsForm?.values?.subtags,
      { name: "" },
    ]);
  };

  const removeTextField = (index: number) => {
    const subTags = tagsForm?.values?.subtags;
    // if (subTags.length === 2) {
    //   return;
    // }
    const newSubtags = [...subTags];
    newSubtags.splice(index, 1);
    tagsForm.setFieldValue("subtags", newSubtags);
  };

  const router = useRouter();

  return (
    <Dialog
      scroll="body"
      open={true}
      onClose={() => {
        router.back();
      }}
      className="tags flex flex-col"
      fullScreen={fullScreen}
    >
      <DialogContent
        className={`flex flex-col gap-2${
          fullScreen ? "items-center justify-center" : ""
        }`}
      >
        {" "}
        <div className="text-center text-xl">
          {mode === "create" ? "Create" : "Edit"} Tag
        </div>
        <form
          className={`flex flex-col gap-2 ${fullScreen ? "w-full" : ""}`}
          onSubmit={tagsForm.handleSubmit}
        >
          <FormikTextField
            name="name"
            label="Tag Name"
            formikProp={tagsForm}
            useTopLabel
            placeholder="Enter tag name"
          />
          <hr />
          <div className="flex flex-col gap-2 mb-2">
            <FormLabel className="text-sm relative w-fit">Sub-Tags</FormLabel>
            {tagsForm.values.subtags.map((value, index) => {
              return (
                <CreateSubTag
                  key={index}
                  index={index}
                  tagsForm={tagsForm}
                  name={`subtags-${index}`}
                  onDelete={() => {
                    removeTextField(index);
                  }}
                  setErrorMessage={setErrorMessage}
                />
              );
            })}
            <Button
              variant="contained"
              className="w-fit"
              size="small"
              onClick={() => {
                addTextField();
              }}
            >
              + Add subtag
            </Button>
          </div>
          <FormikColorInput
            value={tagsForm.values.color}
            formikProp={tagsForm}
            name="color"
            label="Color"
            onChange={(value, colors) => {
              tagsForm.setFieldValue("color", value);
            }}
            placeholder="#FFFFFF"
          />
          <FormikTextField
            formikProp={tagsForm}
            name="notes"
            label="Notes"
            multiline
            placeholder="Enter notes on tag here"
            inputProps={{ maxLength: 50 }}
            mandatory={false}
          />
          <div className="flex items-center gap-small justify-between">
            <span className="text-content-error text-sm line-clamp-2 flex-1">
              {errMessage}
            </span>
            <div className="flex gap-small items-center flex-1 justify-end">
              <Button
                variant="outlined"
                type="button"
                onClick={() => {
                  router.back();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="button"
                onClick={() => {
                  console.log(
                    "The values and error is",
                    tagsForm?.values,
                    tagsForm?.errors
                  );
                }}
              >
                {loading ? (
                  <CircularProgress size={16} style={{ color: "white" }} />
                ) : (
                  <></>
                )}
                {mode === "create" ? "Create" : "Edit"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTag;
