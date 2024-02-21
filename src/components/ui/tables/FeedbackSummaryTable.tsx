import { Feedback } from "@/types/email";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const feedbackkeys = [
  "Opinion",
  "Reason",
  "Subreason",
  "Solution",
  "Context on what is the nature of the issue the client is facing ?",
  "Does a QC checkpoint exist for the issue ?",
  "Can automating the step avoid the issue ?",
  "Is the issue with new report/ new request ?",
  "Is the issue somehow related to bandwidth/ context gap due to anyone on leave on the day of deliverable ?",
  "Could we have done anything to avoid client facing this issue ?",
  "What action will be taken to avoid a repition of this issue and by when ?",
];

const feedbackvalues = [
  "opinion",
  "reason",
  "subreason",
  "solution",
  "context_of_issue",
  "qc_check_point_exists",
  "can_automate_avoid_issue",
  "new_report",
  "issue_due_to_leave",
  "can_avoid_issue",
  "action_plan_to_avoid_issue",
];

const commentkeys = ["Opinion", "Comments"];
const commentvalues = ["opinion", "comment"];
interface Props {
  data: Feedback;
  comments?: boolean;
}

function booleanResolver(data: any) {
  if (typeof data === "boolean") {
    return data ? "Yes" : "No";
  }
  return data?.length > 0 ? data : "-";
}

const FeedbackSummaryTable = ({ data, comments = false }: Props) => {
  const keys = comments ? commentkeys : feedbackkeys;
  const values = comments ? commentvalues : feedbackvalues;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow className="mx-1">
            <TableCell className="font-semibold w-1/2 " style={{width:"50%"}}>Query</TableCell>
            <TableCell className="font-semibold w-1/2" style={{width:"50%"}}>Remarks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {keys.map((key, index) => {
            return (
              <TableRow key={index} className="mx-1">
                <TableCell width={"50%"}>{keys[index]}</TableCell>
                <TableCell width={"50%"}>
                  {booleanResolver(data[values[index]])}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeedbackSummaryTable;
