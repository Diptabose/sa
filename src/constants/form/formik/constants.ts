import { FormikConfig } from "formik"
import { sourceFiltersSchema } from "../yup/constants";
import { SourceFilterValues } from "@/types/formik";

const emailsStructure = {
    include:true,
    data:[],
}

export const sourceFiltersFormik:FormikConfig<SourceFilterValues> = {
    initialValues:{
        domains:{
            include:true,
            data:[]
        },
        emailsfrom:emailsStructure,
        emailsto: emailsStructure,
        cc:emailsStructure,
        subject:emailsStructure
    },
    validationSchema:sourceFiltersSchema,
    onSubmit: async (values)=>{
        // Call apis here
    }
}







