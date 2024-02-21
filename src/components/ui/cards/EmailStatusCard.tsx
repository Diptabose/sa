import Card from "@mui/material/Card";
import React, { useContext } from "react";
import CheckCircle from "@mui/icons-material/CheckCircle";
import CheckCancel from "@mui/icons-material/Cancel";
import HomeContext, { HomeContextProps } from "@/store/contexts/home.context";
import { EmailStatus } from "@/types/email";
import LoaderCard from "./LoaderCard";

interface EmailStatusMessages {
  true: string;
  false: string;
  [key: string]: string;
}

const Mapper: Record<keyof EmailStatus, EmailStatusMessages> = {
  approved_by_elt: {
    true: "Approved by SLT",
    false: "Approval pending by ELT",
  },
  approved_by_slt: {
    true: "Approved by SLT",
    false: "Approval pending by SLT",
  },
  approved_by_sm: {
    true: "Approved by SM",
    false: "Review pending by SM",
  },
  sent_for_review: {
    true: "Sent for review",
    false: "Yet to send for review",
  },
  flag_changed: {
    true: "Flaged changed",
    false: "Flag not changed",
  },
};

const loopOver = ["sent_for_review", "approved_by_sm", "approved_by_slt"];

const renderStatusIcon = (booleanStatus: boolean) => {
  return booleanStatus ? (
    <CheckCircle fontSize="small" color="success" />
  ) : (
    <CheckCancel fontSize="small" color="error" />
  );
};

const EmailStatusCard = () => {
  const { state, dispatch: homeDispatch } =
    useContext<HomeContextProps>(HomeContext);
  const { emails, selectedEmailIndex } = state;
  const selectedEmail = emails[selectedEmailIndex];

  const statuses = (selectedEmail?.status as EmailStatus) ?? {};
  if (selectedEmail) {
    return (
      <Card className="flex flex-col flex-none border-cards p-2 gap-small rounded-cards">
        <span className="font-medium">Status</span>
        {loopOver.map((loopon, index) => {
          const booleanStatus = statuses?.[loopon]?.status ?? false;
          const mapperStatus = Mapper[loopon];
          if (loopon in statuses) {
            return (
              <div className="flex items-center gap-small text-sm" key={index}>
                {renderStatusIcon(booleanStatus)}
                <span >{mapperStatus[String(booleanStatus)]}</span> 
              </div>
            );
          }
          return (
            <div className="flex items-center gap-small text-sm" key={index}>
              {renderStatusIcon(booleanStatus)}
             <span >{mapperStatus[String(booleanStatus)]}</span> 
            </div>
          );
        })}
      </Card>
    );
  }
  return <LoaderCard  h={100} />;
};

export default EmailStatusCard;
