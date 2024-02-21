import HomeContext, { HomeContextProps } from "@/store/contexts/home.context";
import { getClientFromEmail } from "@/utils/app/commonMethods";
import Card from "@mui/material/Card";
import React, { useContext } from "react";
import LoaderCard from "./LoaderCard";
import GenericDialog from "@/components/atomic/dialogs/GenericDialog";
import FeedbackSummaryTable from "@/components/ui/tables/FeedbackSummaryTable";
import { Button } from "@mui/material";

const keys = [
  "Tag",
  "Sub-Tag",
  "Client",
  "Project",
  "SM",
  "SLT",
  "ELT",
  "Review",
  "Form",
  "Approval",
  "Reason",
  "Sub-Reason",
  "Solution",
];

const EmailInformationCard = () => {
  const { state, dispatch: homeDispatch } =
    useContext<HomeContextProps>(HomeContext);

  const { emails, selectedEmailIndex, openFormSummaryDialog } = state;
  const selectedEmail = emails[selectedEmailIndex];

  const handleFeedbackDialog = () => {
    homeDispatch({
      field: "openFormSummaryDialog",
      value: !openFormSummaryDialog,
    });
  };

  function FormButton() {
    return (
      <button
        type="button"
        className="underline"
        onClick={handleFeedbackDialog}
      >
        Form
      </button>
    );
  }

  if (selectedEmail) {
    const { lastTags, project_details, feedback, status } = selectedEmail ?? {};
    const { project_name, client_name, elt, slt, sm } = project_details ?? {};

    const values = [
      lastTags?.[0]?.name,
      lastTags?.[0]?.subtagData?.name,
      client_name,
      project_name,
      sm?.name,
      slt?.name,
      elt?.name,
      feedback?.opinion,
      status?.approved_by_sm?.status ? FormButton() : null,
      status?.approved_by_elt?.status || status?.approved_by_slt?.status
        ? "Approved"
        : "Pending",
      feedback?.reason,
      feedback?.subreason,
      feedback?.solution,
    ];
    return (
      <Card className="w-full flex flex-col flex-none py-4 px-2 gap-small rounded-cards max-w-[300px]">
        <span className="font-medium">Information</span>
        <table className="text-sm">
          <tbody className="w-full ">
            {keys.map((key, index) => {
              const value = values[index] ?? "-";

              return (
                <tr key={index}>
                  <td className="p-1 font-medium">{key}</td>
                  <td className="p-1">:</td>
                  <td className="p-1 line-clamp-1" title={value as string}>
                    {value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <GenericDialog
          open={openFormSummaryDialog}
          dialogProps={{
            onClose: handleFeedbackDialog,
            className: "opinions flex flex-col",
            scroll: "paper",
          }}
          titleProps={{
            textAlign: "center",
          }}
          title={"Feedback Form"}
          content={
            <FeedbackSummaryTable
              data={feedback}
              comments={feedback?.comment?.length > 0}
            />
          }
          actions={
            <div>
              <Button
                variant="contained"
                size="small"
                onClick={handleFeedbackDialog}
              >
                Close
              </Button>
            </div>
          }
          contentProps={{}}
        />
      </Card>
    );
  }
  return <LoaderCard h={300} />;
};

export default EmailInformationCard;
