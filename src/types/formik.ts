export interface StringKey {
    [key:string]:any
} 

export interface LoginValues extends StringKey{
    username: string,
    password: string,
}

export interface UpdateUserValues extends StringKey {
    username: string,
    prev_password: string,
    new_password:string,
}

export interface DBValues extends LoginValues{
    uri: string,
    dbname: string
}

export interface AzureValues extends StringKey{
    tenant_id: string,
    client_id: string,
    client_secret: string
}

export interface RoleValues extends StringKey {
    _id?:string,
    role:string,
    active:boolean,
    restricted_pages:string[],
}

export interface UserValues extends StringKey {
    _id?:string,
    name:string,
    username:string,
    role:string,
    active:boolean
}

export interface Emails  {
    include:boolean,
    data:string[],
    [key:string]:boolean|string[]
} 


export type sourcefilters  = 'cc'|'emailsfrom'|'emailsto'|'domains'|'subject'

export interface SourceFilterValues extends StringKey {
    _id?:string,
    domains:Emails,
    emailsfrom:Emails,
    emailsto:Emails,
    cc:Emails,
    subject:Emails
}

export type Mode = 'monthly'|'weekly'|'daily'

export interface MetricsValues extends StringKey {
    start_date: Date,
    end_date: Date,
    mode:string,
}

interface EmailSentimentData {
    data:{
        Positive:number,
        Negative:number,
        Neutral:number
    },
    monthly:number,
    weekly:number,
    daily:number,
    start_date:string
}

interface EmailChangeData {
    data:{
        "Positive to Negative":number,
        "Postive to Neutral":number,
        "Negative to Positive":number,
        "Negative to Neutral":number,
        "Neutral to Positive":number,
        "Neutral to Negative":number,
    }
    monthly:number,
    weekly:number,
    daily:number,
    start_date:string
}

export interface Metrics {
    email_sentiment_data:Partial<EmailSentimentData>[],
    email_sentiment_change_data: Partial<EmailChangeData>[]
}

export interface FilterFormInterface extends StringKey{
    search:string,
    tagid:string,
    subtagid:string,
    opinionid:string,
    start_date: string|Date|null,
    end_date:string|Date|null,
    review_status:string,
    [key:string]:string|Date|null
}

export interface ProjectForm extends StringKey {
    project_id: string;
    communication_mode: string;
    [key: string]: string;
  }

export interface FeedbackForm {
    reasonid: string;
    subreasonid: string;
    solutionid: string;
    context_of_issue: string;
    qc_check_point_exists: boolean | null;
    can_automate_avoid_issue: boolean | null;
    new_report: boolean | null;
    issue_due_to_leave: boolean | null;
    can_avoid_issue: boolean | null;
    action_plan_to_avoid_issue: string;
    comment: string;
    [key: string]: string | boolean | null
  }

  export interface CommentsFeedBackForm extends StringKey{
    comment?:string
  }

