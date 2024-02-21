"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as API from "@/utils/app/api";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import Link from "next/link";
import FormikTextField from "@/components/atomic/form/FormikTextField";
import { DBValues } from "@/types/formik";
import { dbConfigSchema } from "@/constants/form/yup/constants";
import { removeCookies, revalidateRoute } from "@/app/server_actions/actions";

interface Props {
  initVal: DBValues;
  editing?: boolean;
  setup?: boolean;
}

const DbConfig = ({ initVal, setup, editing = true }: Props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isValidConfig, setIsValidConfig] = useState<boolean>(false);
  const [validating, setValidating] = useState<boolean>(false);
  const router = useRouter();

  const dbconfigForm = useFormik<DBValues>({
    initialValues: initVal,
    validationSchema: dbConfigSchema,
    onSubmit: (values) => {
      setValidating(true);

      API.PostMethod("db/configure_db", values).then(
        async (resp: any) => {
          setIsValidConfig(true);
          setErrorMessage(null);
          setTimeout(async () => {
            if (editing) {
            await removeCookies()
            revalidateRoute('/login');
            } else {
              setValidating(false);
            }
          }, 10000); // This allows the server to restart using the given db credentials.
        },
        (error) => {
          setValidating(false);
          setIsValidConfig(false);
          setErrorMessage(error.response.data.message);
        }
      );
    },
  });

  useEffect(() => {
    setIsValidConfig(false);
    setErrorMessage(null);
  }, [dbconfigForm.values]);

  return (
    <div className="h-full flex flex-1 flex-col gap-3 items-center justify-center bg-surface-3 overflow-y-auto pb-1">
      <span className="self-center">{editing ? "" : "Step:1/2"}</span>
      <span className="self-center text-2xl">Database Configuration</span>
      {/* {editing ? <span className='text-sm'><b>Note:</b>Editing the Database will force log you out.</span> : <></>} */}
      <div className="flex flex-col gap-3">
        <Card className="sm:min-w-[350px] rounded-cards">
          <form
            className="flex flex-col p-5"
            onSubmit={dbconfigForm.handleSubmit}
          >
            <FormikTextField<DBValues>
              formikProp={dbconfigForm}
              name="uri"
              placeholder="URI"
              label="URI"
              mandatory
            />

            <FormikTextField<DBValues>
              formikProp={dbconfigForm}
              name="username"
              placeholder="Username"
              label="Username"
              autoComplete="off"
              mandatory
            />

            <FormikTextField<DBValues>
              formikProp={dbconfigForm}
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
              autoComplete="off"
              mandatory
            />

            <FormikTextField<DBValues>
              formikProp={dbconfigForm}
              name="dbname"
              placeholder="Database name"
              label="Database name"
              mandatory
            />

            <div className="flex flex-row items-center justify-end">
              <div className="flex flex-1 justify-start">
                {!validating &&
                  (isValidConfig ? (
                    <div className="flex gap-1 items-center text-sm">
                      <CheckCircleOutlined fontSize="small" color="success" />
                      <span>Database configured</span>
                    </div>
                  ) : (
                    errorMessage && (
                      <div className="text-red-500 text-sm flex gap-1 items-center">
                        <CancelOutlined fontSize="small" />
                        {errorMessage}
                      </div>
                    )
                  ))}
              </div>
              <Button type="submit" variant="contained" color="primary">
                {validating ? (
                  <div className="flex items-center gap-1">
                    <div>Validating</div>
                    <CircularProgress size={16} sx={{ color: "white" }} />
                  </div>
                ) : (
                  "Edit"
                )}
              </Button>
            </div>
          </form>
        </Card>
        {!validating && isValidConfig && !editing && (
          <div className="flex justify-end">
            <Button variant="contained" color="primary">
              <Link href="/setup/azureconfig">Next: Azure Configuration</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DbConfig;
