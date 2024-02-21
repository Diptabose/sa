"use client";

import {
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as API from "@/utils/app/api";
import { RoleValues } from "@/types/formik";
import FormikTextField from "@/components/atomic/form/FormikTextField";
import { Mode } from "@/types/params";
import { createRoleSchema } from "@/constants/form/yup/constants";
import { revalidateRoute } from "@/app/server_actions/actions";

interface Props {
  mode: Mode;
  initValues: RoleValues;
}

const CreateRole = ({ mode, initValues }: Props) => {
  const router = useRouter();
  const [errMessage, setErrMessage] = useState<string>("");

  const roleForm = useFormik<RoleValues>({
    initialValues: initValues,
    validationSchema: createRoleSchema,
    onSubmit: (values) => {
      setLoading(true);
      let APIMethod = mode === "create" ? API.PostMethod : API.PutMethod;
      let endpoint =
        mode === "create"
          ? "settings/roles/create"
          : `settings/roles/update/${initValues._id}`;
      APIMethod(endpoint, values)
        .then((resp) => {
          revalidateRoute(
            "/sentimentAnalysis/settings/roles",
            "/sentimentAnalysis/settings/roles"
          );
          //router.push('/sentimentAnalysis/settings/roles');
        })
        .catch((err) => {
          setErrMessage(err?.response?.data?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  useEffect(() => {
    setErrMessage("");
  }, [roleForm.values]);

  const [loading, setLoading] = useState<boolean>(false);

  let heading = mode == "create" ? "Add" : "Update";
  return (
    <div className="h-full overflow-hidden">
      <div className="py-2 px-4">
        <span className="text-xl font-medium">{heading} Role</span>
      </div>
      <div className="h-full overflow-y-auto p-4">
        <Card
          sx={{ minWidth: 350, maxWidth: 600, padding: 2 }}
          className="bg-container-default"
        >
          <form
            className="flex gap-x-2 items-center "
            onSubmit={roleForm.handleSubmit}
          >
            <FormikTextField
              formikProp={roleForm}
              name="role"
              label={"Role"}
              placeholder="Role"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="active"
                  size="small"
                  onChange={async (e) => {
                    roleForm.setFieldValue("active", e.target.checked);
                  }}
                  onBlur={roleForm.handleBlur}
                  checked={roleForm.values.active}
                />
              }
              label="Active"
              labelPlacement="start"
            />
            <Button sx={{ marginX: 2 }} variant="contained" type="submit">
              {loading ? (
                <CircularProgress
                  size={16}
                  sx={{ color: "white", marginRight: 1 }}
                />
              ) : (
                <></>
              )}
              {heading}
            </Button>
          </form>
          {errMessage.length > 0 ? (
            <span className="text-sm text-red-500">{errMessage}</span>
          ) : (
            <></>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CreateRole;
