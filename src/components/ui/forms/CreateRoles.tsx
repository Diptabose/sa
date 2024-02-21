"use client";
import { createRoleSchema } from "@/constants/form/yup/constants";
import { RoleValues } from "@/types/formik";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as API from "@/utils/app/api";
import { revalidateRoute } from "@/app/server_actions/actions";
import { Mode } from "@/types/params";
import Dialog from "@mui/material/Dialog";
import { useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
  CircularProgress,
  DialogContent,
  FormControlLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FormikTextField from "@/components/atomic/form/FormikTextField";

interface Props {
  mode: Mode;
  initValues: RoleValues;
}

const CreateRoles = ({ initValues, mode }: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("Hello world");
  const router = useRouter();

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
          if (resp.success) {
            revalidateRoute(
              "/sentimentAnalysis/settings/roles",
              "/sentimentAnalysis/settings/redirect?to=roles"
            );
          }
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

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let heading = mode == "create" ? "Add" : "Update";

  return (
    <Dialog
      scroll="body"
      open={open}
      onClose={() => {
        router.back();
      }}
      className="flex flex-col"
      fullScreen={fullScreen}
    >
      <DialogContent
        className={`flex flex-col gap-2${
          fullScreen ? "items-center justify-center" : ""
        }`}
      >
        <span className="text-center text-xl">{heading} Role</span>
        <form
          className="flex flex-col gap-x-small"
          onSubmit={roleForm.handleSubmit}
        >
          <FormikTextField
            formikProp={roleForm}
            name="role"
            label={"Role"}
            placeholder="Role"
            mandatory
          />
          <div>
            <FormControlLabel
              className="ml-0"
              control={
                <Checkbox
                  size="small"
                  name="active"
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
          </div>

          <div className="flex items-center gap-small justify-end">
            <Button
              variant="outlined"
              type="button"
              onClick={() => {
                router.back();
              }}
            >
              Close
            </Button>
            <Button type="submit" variant="contained">
              {loading ? (
                <CircularProgress className="text-white" size={16} />
              ) : (
                <></>
              )}
              Add
            </Button>
          </div>
        </form>
        <span>{errMessage}</span>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoles;
