import { Recipients } from "@/types/email";
import Divider from "@mui/material/Divider";
import format from "date-fns/format";

interface Props {
  data: {
    subject: string;
    sentDateTime: string;
    sender_email: string;
    toRecipients: string;
  };
}

const Subject = ({ data }: Props) => {
  const unparsed_recipients = data?.toRecipients;
  let recipeints: any[] = [];
  let formattedDate = "";
  try {
    recipeints = JSON.parse(unparsed_recipients) as Recipients[];
    formattedDate = format(
      new Date(data?.sentDateTime),
      "MMM dd, yyyy hh:mm:ss a"
    );
  } catch (err) {}

  const recipientsString = recipeints
    .map((recipient) => {
      return recipient?.emailAddress?.address;
    })
    .join(", ");

  return (
    <div className="text-sm w-full h-fit flex flex-col gap-small">
      <div className="flex items-center justify-between">
        <span className="text-base">
          Subject:<span className="text-base"> {data?.subject}</span>
        </span>
        <span className="text-sm">{formattedDate}</span>
      </div>
      <span id="from_email">From: {data?.sender_email}</span>
      <span id="to_emails line-clamp-1">To: {recipientsString}</span>
      <Divider className="border-[1px]" />
    </div>
  );
};

export default Subject;
