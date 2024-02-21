import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("User is mandatory").min(5, 'Min 5 characters required'),
  password: Yup.string().required("Password is mandatory").min(8, 'Min 8 characters required').trim()
})

export const updatePasswordSchema = Yup.object().shape({
  username: Yup.string().required("User is mandatory").min(5, 'Min 5 characters required'),
  prev_password: Yup.string().required("Old password is mandatory").min(8, 'Min 8 characters required').trim(),
  new_password: Yup.string().required("New password is mandatory").min(8, 'Min 8 characters required').trim()
})

export const createRoleSchema = Yup.object().shape({
  role: Yup.string().required("Role is mandatory").trim().min(3, 'Min 3 characters required').max(10, "Max 10 characters allowed"),
  active: Yup.boolean().required("Active status is mandatory")
})

export const createUserSchema = Yup.object().shape({
  name: Yup.string().trim()
    .required('Field is required').min(5, "Min 5 charcters is required").max(20, 'Max 20 characters allowed'),
  username: Yup.string().trim().email("Field should be an email").required("Email is mandatory").min(10, 'Min 5 characters allowed'),
  role: Yup.string().required("Role is mandatory")
})

export const azureConfigSchema = Yup.object().shape({
  tenant_id: Yup.string().trim().required("Tenant Id is mandatory"),
  client_id: Yup.string().trim().required("App key is mandatory"),
  client_secret: Yup.string().trim().required("App secret is mandatory").min(5, 'Db name must atleast be 5 characters long')
})

export const dbConfigSchema = Yup.object().shape({
  uri: Yup.string().trim().required("URI is mandatory"),
  username: Yup.string().trim().required("User name is mandatory"),
  password: Yup.string().trim().required("Password is mandatory"),
  dbname: Yup.string().trim().required("Database name is mandatory").min(5, 'Db name must atleast be 5 characters long')
})


export const emailsSchema = Yup.object().shape({
  include: Yup.boolean().required('Field is mandatory'),
  data: Yup.array().of(Yup.string().trim()),
  isEmail: Yup.boolean()
});

export const domainsSchema = Yup.object().shape({
  include: Yup.boolean().required('Field is mandatory'),
  data: Yup.array().of(Yup.string().matches(/^[a-zA-Z0-9.-]+(?:\.[a-zA-Z]{2,})+$/, 'Domain is not valid').trim()),
  isEmail: Yup.boolean(),
})

export const sourceFiltersSchema = Yup.object().shape({
  domains: domainsSchema,
  emailsfrom: emailsSchema,
  emailsto: emailsSchema,
  cc: emailsSchema,
  subject: emailsSchema
})



export const metricsSchema = Yup.object().shape({
  start_date: Yup.date().required('Field is mandatory'),
  end_date: Yup.date().required('Field is mandatory'),
  mode: Yup.string().required('Field is mandatory'),
});

// const subTagSchema = Yup.object().shape({
//   name: Yup.string().trim().max(20, "Field must be 20 characters"),
// });

// const subTagSchema = Yup.object().shape({
//   name: Yup.array()
//     .of(Yup.string()
//       .matches(/^[a-zA-Z0-9 ]*$/, 'Subtag must not contain special characters')
//       .test('not-duplicate-subtags', 'Subtags must be unique', (value, context) => {
//         console.log("The value of test and values ", value, context)
//       }
//       )
//     )
// })

export const tagsSchema = Yup.object().shape({
  name: Yup.string().trim()
    .matches(/^[a-zA-Z0-9 ]*$/, 'Tag must not contain special characters')
    .required('Tag is required').min(5, "Min 5 charcters is required").max(10, 'Max 10 characters required').test('tag-not-subtag', "Tag can't be a Sub-Tag", (value, context) => {
      const subtags = context?.parent?.subtags;
      const subtagnames = subtags?.some((subtag: { name: string }) => subtag.name === value);
      return !subtagnames;
    }),
  subtags: Yup.array()
    .of(Yup.object().shape({
      name: Yup.string().trim()
        .matches(/^[a-zA-Z0-9 ]*$/, 'Sub-Tag name must not contain special characters').min(5, 'Min 5 charcters is required').max(20, 'Max 10 characters required'),
    }).test('subtag-notequal' ,"Sub-Tags can't be equal" , (value , context)=>{
      const subtags = context?.parent;
      const currentValue = value?.name;
      const subtagsnames = subtags?.map((subtag:{name:string})=>subtag?.name);
      let count = 0;
      for(const subtag of subtagsnames){
        if(subtag===currentValue){
          count++;
        }
        if(count>1){
          return false;
        }
      }
       return true;
    })
    
    ),
  color: Yup.string().required('Field is mandatory'),
  note: Yup.string().trim().matches(/^[a-zA-Z0-9 ]*$/, 'Note must not contain special characters').max(30 , "Note can't be more than 30 characters"),
});

// export const tagsSchema = Yup.object().shape({
//   name: Yup.string().required("Field is mandatory").trim().min(5, 'Name must be atleast 5 characters').max(20, 'Name can be atmost 20 characters'),
//   subtags: Yup.array(subTagSchema),
//   note: Yup.string().trim(),
//   color: Yup.string().required('Field is mandatory'),
// });

export const opinionSchema = Yup.object().shape({
  name: Yup.string().trim()
    .matches(/^[a-zA-Z0-9 ]*$/, 'Opinion must not contain special characters')
    .required('Field is mandatory').min(5, "Min 5 charcters is required").max(10, 'Max 10 characters required'),
  note: Yup.string().trim().matches(/^[a-zA-Z0-9 ]*$/, 'Note must not contain special characters').max(30 , "Note can't be more than 30 characters"),
});

export const selectTagsSchema = Yup.object().shape({
  tagid: Yup.string().required("Field is mandatory"),
  subtagid: Yup.string()
});

export const selectProjectSchema = Yup.object().shape({
  project_id: Yup.string().required("Field is mandatory"),
  communication_mode : Yup.string().required('Field is mandatory'),
});

export const inboxFilterSchema = Yup.object().shape({
  sentiment_analysis: Yup.array(),
  start_date: Yup.date(),
  end_date: Yup.date(),
  search: Yup.string(),
  opinionid: Yup.string(),
  tagid: Yup.string(),
  subtagid: Yup.string(),
  review_status: Yup.string().nullable(),
})

export const feedbackFormSchema = Yup.object().shape({
  reasonid: Yup.string().required("Field is mandatory"),
  subreasonid: Yup.string().required("Field is mandatory"),
  solutionid: Yup.string().required("Field is mandatory"),
  context_of_issue: Yup.string().required("Field is mandatory").min(20, 'Min 20 characters required').max(500, 'Max 500 characters accepted'),
  qc_check_point_exists: Yup.boolean().nullable().required('Field is mandatory'),
  can_automate_avoid_issue: Yup.boolean().nullable().required('Field is mandatory'),
  new_report: Yup.boolean().nullable().required('Field is mandatory'),
  issue_due_to_leave: Yup.boolean().nullable().required('Field is mandatory'),
  can_avoid_issue: Yup.boolean().nullable().required('Field is mandatory'),
  action_plan_to_avoid_issue: Yup.string().required("Field is mandatory").min(20, 'Min 20 characters required').max(500, 'Max 500 characters accepted'),
})

export const commentsFormSchema = Yup.object().shape({
  comment: Yup.string().required("Field is mandatory").min(20, 'Min 20 characters required').max(500, 'Max 500 characters accepted')
})

