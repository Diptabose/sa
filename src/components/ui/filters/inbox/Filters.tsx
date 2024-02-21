"use client";
import FormikSelectField from "@/components/atomic/form/FormikSelectField";
import FormikTextField from "@/components/atomic/form/FormikTextField";
import HomeContext, { HomeContextProps } from "@/store/contexts/home.context";
import { PostMethod } from "@/utils/app/api";
import { isNullOrUndefined } from "@/utils/app/commonMethods";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import { FormikProps } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { MdClear } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";
import { FilterFormInterface } from "@/types/formik";
import FormikDateField from "../../../atomic/form/FormikDateField";
import { CircularProgress, Icon, TextField, Tooltip } from "@mui/material";
import { set } from "date-fns";
import { inboxInitialValues } from "@/components/atomic/form/FiltersInbox";
import { MdOutlineFilterList } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";

const reviewStatuses = [
  { label: "Pending", _id: "pending" },
  { label: "Reviewed", _id: "reviewed" },
];

const MenuProps = {
  className: "menuinbox",
  sx: {
    minHeight: "45%",
  },
};

interface Props {
  formikProp: FormikProps<FilterFormInterface>;
}

const EMAIL_FETCH_LIMIT = 10;

const Filters = ({ formikProp }: Props) => {
  const { state, dispatch } = useContext<HomeContextProps>(HomeContext);
  const { opinions, tags } = state;
  const [searchLoader, setSearchLoader] = useState<boolean>(false);
  const filterApplied = useRef<boolean>(false);
  const isSearching = useRef<boolean>(false);

  const [val, setVal] = useState<string>("");

  const debounced = useDebouncedCallback((search_value) => {
    let values = formikProp.values;
    values.search = search_value;
    if (search_value?.length > 0) {
      isSearching.current = true;
    } else {
      isSearching.current = false;
    }
    getNewEmails(true, values);
  }, 700);

  function cancelSearch() {
    formikProp.setFieldValue("search", "");
    setSearchLoader(false);
    debounced(null);
  }

  async function getNewEmails(shallLoad: boolean, values: any) {
    if (shallLoad) {
      dispatch({ field: "loading", value: shallLoad });
    }
    PostMethod(`emails/adv?limit=${EMAIL_FETCH_LIMIT}&skip=${0}`, values).then(
      (res) => {
        const updatedEmails = [...res["data"]];
        dispatch({ field: "emails", value: updatedEmails });
        dispatch({ field: "total", value: res["totalCount"] });
        dispatch({ field: "skip", value: EMAIL_FETCH_LIMIT });
        dispatch({ field: "loading", value: false });
        setSearchLoader(false);
      }
    );
  }

  const handleChange = async (name: string, value: any) => {
    let values = formikProp.values;
    values[name] = value;
    await formikProp.setFieldValue(name, value);
    getNewEmails(true, values);
    filterApplied.current = true;
  };

  const [subTagData] = tags?.filter(
    (data) => data._id === formikProp.values.tagid
  );

  subTagData?.subtags?.sort((a: any, b: any) => {
    if (a?.name < b?.name) return -1;
    if (a?.name > b?.name) return 1;
    return 0;
  });

  function clearFilter() {
    Object.keys(inboxInitialValues).forEach((key) => {
      if (key === "start_date" || key === "end_date")
        formikProp.setFieldValue(key, null);
      else formikProp.setFieldValue(key, "");
    });

    filterApplied.current = false;
    isSearching.current = false;
  }
  function clearFilters() {
    if (filterApplied.current || isSearching.current) {
      clearFilter();
      getNewEmails(true, {
        search: "",
        start_date: "",
        end_date: "",
        opinionid: "",
        review_status: "",
        subtagid: "",
        tagid: "",
      });
    }
  }

  useEffect(() => {
    return () => {
      clearFilter();
    };
  }, []);

  return (
    <div className="w-full flex pt-2 px-2 gap-small items-center justify-between">
      <div className="w-1/4 mt-1">
        <FormikTextField
          name={"search"}
          useTopLabel={false}
          placeholder="Search"
          formikProp={formikProp}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="text-base" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {isNullOrUndefined(formikProp.values.search) ||
                formikProp.values.search?.length === 0 ? (
                  <div></div>
                ) : searchLoader ? (
                  <CircularProgress size={15} className="text-content-brand" />
                ) : (
                  <MdClear onClick={cancelSearch} className="cursor-pointer" />
                )}
                <IconButton></IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{
            style: { height: "10px" },
            className: "placeholder:text-sm",
          }}
          onChange={(e) => {
            formikProp.setFieldValue("search", e.target.value);
            setSearchLoader(true);
            debounced(e.target.value);
          }}
        />
      </div>

      <div className="flex gap-small w-[60%] ">
        <div className="w-full flex gap-small">
          <button className="self-center mb-3">
            <MdOutlineFilterList className="w-4 h-4 font-medium" />
          </button>

          <div className="w-2/12">
            <FormikSelectField
              formikProp={formikProp}
              name="tagid"
              selectKey="name"
              selectData={tags ?? [{ _id: "1", name: "" }]}
              placeholder="Tag"
              useTopLabel
              style={{ height: "28px" }}
              MenuProps={{ ...MenuProps }}
              onChange={async (e) => {
                await handleChange("tagid", e.target.value as string);
              }}
              placeholderProps={{ className: "text-xs" }}
            />
          </div>
          <div className="w-2/12">
            <FormikSelectField
              formikProp={formikProp}
              name="subtagid"
              selectKey="name"
              selectData={subTagData?.subtags ?? [{ name: "", id: "1" }]}
              placeholder="Sub-Tag"
              useTopLabel
              style={{ height: "28px" }}
              MenuProps={{ ...MenuProps }}
              onChange={async (e) => {
                await handleChange("subtagid", e.target.value as string);
              }}
              placeholderProps={{ className: "text-xs" }}
            />
          </div>
          <div className="w-2/12 ">
            <FormikSelectField
              formikProp={formikProp}
              name="opinionid"
              selectKey="name"
              selectData={opinions}
              placeholder="Opinion"
              useTopLabel
              style={{ height: "28px" }}
              MenuProps={{ ...MenuProps }}
              onChange={async (e) => {
                await handleChange("opinionid", e.target.value as string);
              }}
              placeholderProps={{ className: "text-xs" }}
            />
          </div>

          <div className="w-3/12 pt-1">
            <FormikDateField
              formikProp={formikProp}
              name="start_date"
              value={
                formikProp.values.start_date === null
                  ? null
                  : new Date(formikProp.values.start_date)
              }
              useTopLabel={false}
              maxDate={
                formikProp.values.end_date
                  ? new Date(formikProp.values.end_date)
                  : new Date()
              }
              slotProps={{
                textField: {
                  sx: { svg: { width: "20px", height: "20px" } },
                  inputProps: {
                    style: { height: "11px" },
                    className: "placeholder:text-xs",
                    placeholder: "Start Date",
                  },
                },
              }}
              onChange={async (value) => {
                value = set(value as Date, {
                  hours: 0,
                  minutes: 0,
                  seconds: 0,
                  milliseconds: 0,
                });
                await handleChange("start_date", value);
              }}
            />
          </div>
          {/* <div className="self-center mb-3">-</div> */}
          <div className="w-3/12 pt-1">
            <FormikDateField
              formikProp={formikProp}
              name="end_date"
              value={
                formikProp?.values?.end_date === null
                  ? null
                  : new Date(formikProp?.values?.end_date)
              }
              useTopLabel={false}
              minDate={new Date(formikProp?.values?.start_date as string)}
              maxDate={new Date()}
              slotProps={{
                textField: {
                  sx: { svg: { width: "20px", height: "20px" } },
                  inputProps: {
                    style: { height: "11px" },
                    className: "placeholder:text-xs",
                    placeholder: "End Date",
                  },
                },
              }}
              onChange={async (value) => {
                value = set(value as Date, {
                  hours: 23,
                  minutes: 59,
                  seconds: 59,
                  milliseconds: 999,
                });
                await handleChange("end_date", value);
              }}
            />
          </div>
          <div className="w-2/12">
            <FormikSelectField
              formikProp={formikProp}
              name="review_status"
              selectKey="label"
              selectData={reviewStatuses}
              placeholder="Review"
              useTopLabel
              style={{ height: "28px" }}
              MenuProps={{ ...MenuProps }}
              onChange={async (e) => {
                await handleChange("review_status", e.target.value as string);
              }}
              placeholderProps={{ className: "text-xs" }}
            />
          </div>
          <Tooltip title="Clear Filters">
            <button
              type="button"
              className="self-center mb-3"
              onClick={clearFilters}
            >
              <GrPowerReset className="w-4 h-4" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Filters;
