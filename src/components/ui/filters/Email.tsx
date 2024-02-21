"use client";
import FilterCard from "@/components/atomic/cards/Card";
import { Emails } from "@/types/formik";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import IncludeExlude from "./IncludeExclude";
import { domainsSchema, emailsSchema } from "@/constants/form/yup/constants";
import EmailFilter from "./EmailFilter";
import { Button, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import * as API from "@/utils/app/api";
import { AzureUser } from "@/types/user";
import { revalidateRoute } from "@/app/server_actions/actions";
import AppContext, { AppContextProps } from "@/store/contexts/app.context";

interface Props {
  label: string;
  initialValues: Emails;
  value: AzureUser[];
}

const Email = ({ label, value, initialValues }: Props) => {
  const { slug } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const { state, dispatch } = useContext<AppContextProps>(AppContext);
  const [errMessage, setErrMessage] = useState<string>("");

  const formik = useFormik<Emails>({
    initialValues: initialValues ?? {
      include: false,
      data: [],
      isEmail: label === "Domains" || label === "Subject" ? false : true,
    },
    validationSchema: label === "Domains" ? domainsSchema : emailsSchema,
    onSubmit: (values) => {
      const map = new Map();
      map.set(slug, values);
      setLoading(true);
      API.PatchMethod("settings/filters", Object.fromEntries(map))
        .then((data) => {
            dispatch({field:'snack_bar' , value:{
                open:true,
                message:'Filter updated',
                alertType:'success'
              }})
          revalidateRoute("/sentimentAnalysis/settings/filters/[slug]");
        })
        .catch((err) => {
          dispatch({
            field: "snack_bar",
            value: {
              open: true,
              message: "Couldn't update filter",
              alertType: "error",
            },
          });
          console.log(err);
          // setErrMessage(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  useEffect(() => {
    setErrMessage("");
  }, [formik.values]);

  return (
    <FilterCard
      title={label}
      content={
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          <IncludeExlude
            formikProp={formik}
            name="include"
            label={""}
          ></IncludeExlude>
          <EmailFilter
            value={value}
            formikProp={formik}
            name="data"
            label={label}
          />
          <div className="flex items-center justify-between mt-2">
            {errMessage.length > 0 ? (
              <span className="text-red-500 text-sm">{errMessage}</span>
            ) : (
              <></>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginLeft: "auto" }}
              disabled={loading}
              className="disabled"
            >
              Save
              {loading ? (
                <CircularProgress size={16} sx={{ color: "white" }} />
              ) : (
                <></>
              )}
            </Button>
          </div>
        </form>
      }
    />
  );
};

export default Email;
