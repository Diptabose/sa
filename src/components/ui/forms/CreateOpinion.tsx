"use client";
import { useFormik } from "formik";
import { Button, CircularProgress, useMediaQuery } from "@mui/material";
import { Opinion } from "@/types/email";
import { opinionSchema } from "@/constants/form/yup/constants";
import FormikTextField from "@/components/atomic/form/FormikTextField";
import { Mode } from "@/types/params";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import * as API from "@/utils/app/api";
import { revalidateRoute } from "@/app/server_actions/actions";
import GenericDialog from "@/components/atomic/dialogs/GenericDialog";

interface Props {
  initialValues: Opinion;
  mode: Mode;
}

const CreateOpinion = ({ initialValues, mode }: Props) => {
  const [errMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const opinionForm = useFormik<Opinion>({
    initialValues: initialValues ?? {
      name: "",
      notes: "",
    },
    validationSchema: opinionSchema,
    onSubmit: (values, helpers) => {
      const APIMethod = mode === "create" ? API.PostMethod : API.PutMethod;
      const url =
        mode === "create"
          ? `settings/opinions/create`
          : `settings/opinions/update/${initialValues?._id}`;

      setLoading(true);
      APIMethod(url, values)
        .then((data) => {
          if (data.success) {
            revalidateRoute(
              "/sentimentAnalysis/settings/opinions",
              "/sentimentAnalysis/settings/redirect?to=opinions"
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

  const fullScreen = useMediaQuery("(max-width:300px)");
  const router = useRouter();

  const Title = useMemo(() => {
    return (
      <div className="text-center text-xl">
        {mode === "create" ? "Create" : "Edit"} Opinion
      </div>
    );
  }, []);

  const Content = useMemo(() => {
    return (
      <form
        className={`flex flex-col gap-2 ${fullScreen ? "w-full" : ""}`}
        onSubmit={opinionForm.handleSubmit}
      >
        <FormikTextField
          name="name"
          label="Opinion Name"
          formikProp={opinionForm}
          useTopLabel
          placeholder="Create Opinion"
        />
        <FormikTextField
          formikProp={opinionForm}
          name="notes"
          label="Notes"
          multiline
          placeholder="Enter notes on opinion here"
          inputProps={{ maxLength: 20 }}
          mandatory={false}
        />
        <div className="flex items-center">
          <span className="text-content-error text-sm flex-1 line-clamp-2">
            {errMessage}
          </span>
          <div className="flex items-center gap-small flex-1 justify-end">
            <Button
              variant="outlined"
              onClick={() => {
                router.back();
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
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
    );
  }, [opinionForm]);

  return (
    <GenericDialog
      open={true}
      dialogProps={{
        onClose: (event, reason) => {
          router.back();
        },
        className: "flex flex-col",
        fullScreen,
      }}
      title={Title}
      content={Content}
      contentProps={{
        className: `flex flex-col gap-2${
          fullScreen ? "items-center justify-center" : ""
        }`,
      }}
    />
  );
};

export default CreateOpinion;
