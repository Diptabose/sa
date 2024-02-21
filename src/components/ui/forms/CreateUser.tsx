"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import FormikTextField from "@/components/atomic/form/FormikTextField";
import { RoleValues, UserValues } from "@/types/formik";
import * as API from "@/utils/app/api";
import FormikSelectField from "@/components/atomic/form/FormikSelectField";
import { createUserSchema } from "@/constants/form/yup/constants";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { revalidateRoute } from "@/app/server_actions/actions";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface Props {
  initValues: UserValues;
  rolesData: RoleValues[];
  mode: "create" | "edit";
  isFirstTimeConfiguring?: boolean;
}

const CreateUser = ({
  mode,
  initValues,
  rolesData,
  isFirstTimeConfiguring,
}: Props) => {
  const [openDialog, setDialog] = useState<boolean>(false);
  const [errMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const params = useSearchParams();

  const [open, setOpen] = useState(true);

  const userForm = useFormik<UserValues>({
    initialValues: initValues,
    validationSchema: createUserSchema,
    onSubmit: (values) => {
      const APIMethod = mode === "create" ? API.PutMethod : API.PatchMethod;
      const endpoint =
        mode === "create"
          ? "user/createUser"
          : `user/updateUser/${params.get("id")}`;
      setLoading(true);
      if (isFirstTimeConfiguring) {
        setDialog(true);
      } else {
        setLoading(true);
        APIMethod(endpoint, values, {})
          .then(async (data) => {
            if (data?.success) {
              // This is an escape hatch to revalidate the 1st route and come to the same route via the test route.
              // The test route is required to escape the modal.
              await revalidateRoute(
                "/sentimentAnalysis/settings/users",
                "/sentimentAnalysis/settings/redirect?to=users"
              );
            }
          })
          .catch((err) => {
            console.log(err);
            setErrorMessage(err.response.data.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
  });

  useEffect(() => {
    setErrorMessage("");
  }, [userForm.values]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState<boolean>(false);

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
        <div className="text-center text-xl">
          {mode === "create" ? "Add" : "Update"} User
        </div>
        <form
          className="flex flex-col gap-y-2 "
          onSubmit={userForm.handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <FormikTextField<UserValues>
              label={"Name"}
              name="name"
              formikProp={userForm}
              placeholder="Name"
              className="w-full"
              useTopLabel={true}
            />
            <FormikTextField<UserValues>
              label={"Email"}
              name="username"
              formikProp={userForm}
              placeholder="Email"
              type="email"
              className="w-full"
              useTopLabel={true}
            />
            <FormikSelectField<UserValues>
              name="role"
              formikProp={userForm}
              inputLabel="Role"
              selectData={rolesData}
              selectKey="role"
              className="w-full"
              useTopLabel={true}
              placeholder="Select a role"
            />
            <div>
              <FormControlLabel
                className="ml-0"
                control={
                  <Checkbox
                    size="small"
                    name="active"
                    onChange={async (e) => {
                      userForm.setFieldValue("active", e.target.checked);
                    }}
                    onBlur={userForm.handleBlur}
                    checked={userForm.values.active}
                  />
                }
                label="Active"
                labelPlacement="start"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-2 items-start mb-2">
              {mode === "create" ? (
                <span className="text-sm">
                  <b>Note:</b> The user created shall login via Microsoft Oauth
                </span>
              ) : (
                <></>
              )}
              {errMessage.length > 0 ? (
                <span className="text-sm text-red-500">{errMessage}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="flex items-center self-end gap-2">
              <Button
                variant="outlined"
                onClick={() => {
                  router.back();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  userForm.handleSubmit();
                  // router.back();
                }}
              >
                {loading && (
                  <CircularProgress size={16} className="text-white" />
                )}
                {mode === "create" ? "Create" : "Edit"}
              </Button>
            </div>
            {/* <Button variant='contained' type='submit' >
              {
                loading ? <CircularProgress size={22} sx={{ color: "white", marginRight: 1 }} /> : <></>
              }
              {mode === 'create' ? 'Add' : 'Update'}
            </Button> */}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUser;
