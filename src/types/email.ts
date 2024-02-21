import { JwtPayload } from "jsonwebtoken";


export interface Email {
  _id?: string,
  etag: string;
  id: string;
  to: string;
  subject: string;
  body_type: string;
  bodyPreview: string;
  body: string;
  emailText: string;
  createdDateTime: string;
  lastModifiedDateTime: string;
  changeKey: string;
  categories: string;
  receivedDateTime: string;
  sentDateTime: string;
  hasAttachments: boolean;
  internetMessageId: string;
  importance: string;
  parentFolderId: string;
  conversationId: string;
  conversationIndex: string;
  isDeliveryReceiptRequested: boolean;
  isReadReceiptRequested: boolean;
  isRead: boolean;
  isDraft: boolean;
  weblink: string;
  inferenceClassification: string;
  sender_name: string;
  sender_email: string;
  from_name: string;
  from_email: string;
  toRecipients: string;
  ccRecipients: string;
  bccRecipients: string;
  replyTo: string;
  flag: string;
  sentiment_flag: string;
  timelines?: TimeLineAction[],
  lastTags?: LastTag[],
  status?: EmailStatus,
  current_accessing_role?: "sm" | "slt" | "elt",
  feedback: Feedback,
  project_details?: ProjectDetails,
  [key: string]: boolean | string | undefined | any
}



export interface LastTag {
  name: string
  tag?: string,
  subtag?: string,
  color?: string,
  subtagData: SubTags,
  modified_by?: string,
  modified_by_id?: string,
  modified_on?: string
}

export interface Feedback {
  opinion: string
  reason: string;
  subreason: string;
  solution: string;
  context_of_issue: string;
  qc_check_point_exists: boolean;
  can_automate_avoid_issue: boolean;
  new_report: boolean;
  issue_due_to_leave: boolean;
  can_avoid_issue: boolean;
  action_plan_to_avoid_issue: string;
  comment: string;
  [key: string]: string | boolean;
}








export type EmailAction = "Flagged by Bot" | "Reviewed by SM" | "Opiniated by SLT" | "Opiniated by ELT";
export interface TimeLineAction {
  action: EmailAction,
  modified_on: Date,
  modified_by: string     // Mostly name as users are not registered to the url.
}
export interface SubTags {
  _id?: string,
  name: string | null,
}
export interface Tags {
  _id?: string,
  name: string,
  subtags: SubTags[],
  color: string,
  notes?: string,
  can_delete?: boolean
  [key: string]: any
}

export interface Opinion {
  _id?: string,
  name: string,
  notes?: string,
  can_delete?: boolean
  [key: string]: any
}


export interface Recipients {
  emailAddress: {
    name: string,
    address: string,
  }
}

export interface Approvers {
  _id: string,
  name: string,
  email: string
}

export interface ProjectDetails {
  _id: string,
  project_name: string,
  client_name:string,
  client_id:string,
  elt: Approvers,
  slt: Approvers,
  sm: Approvers,
  bandwidth:string,
  employee_count:number,
  [key:string]:any
}

export interface EmailSubStatus {
  status: boolean;
  modified_on: Date;
  modified_by: string;
  modified_by_id: string;
}
export interface EmailStatus {
  flagged_by_bot: EmailSubStatus
  flag_changed: EmailSubStatus;
  sent_for_review: EmailSubStatus;
  approved_by_sm: EmailSubStatus;
  approved_by_slt: EmailSubStatus;
  approved_by_elt: EmailSubStatus;
  [key: string]: EmailSubStatus;
}


export interface CitPayload extends JwtPayload {
  email_id: string,
  emp_id: string
}
