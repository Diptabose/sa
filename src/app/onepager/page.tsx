import React from "react";
import { getOneEmailOnePager } from "@/helper/pagefunctions";
import { Email } from "@/types/email";
import OnepagerProvider from "@/store/providers/OnepagerProvider";
import OnepagerEmail from "./OnepagerEmail";
import { Params } from "@/types/params";
import { validateJWT } from "../server_actions/serveronly";
import { LuMailX } from "react-icons/lu";
import FeedbackFormDataWrapper from "@/components/ui/forms/FeedbackFormDataWrapper";

export const dynamic = "force-dynamic";

const OnepagerPage = async ({ searchParams }: Params<string>) => {
  //const token = searchParams["token"] as string;

  // SM : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBfaWQiOiIyMjI4MSIsImVtYWlsX2lkIjoiNjViOGJjZWY0NTBlZTljOWM1NDBhZWJmIn0.WzTnKWW4d2kfKp9HHku_SQ0Z4HUPUSsHdr227ohy4Fw
   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBfaWQiOiIyMjI4MSIsImVtYWlsX2lkIjoiNjViOGJjZWY0NTBlZTljOWM1NDBhZWJmIn0.WzTnKWW4d2kfKp9HHku_SQ0Z4HUPUSsHdr227ohy4Fw";

  const verifData = validateJWT(token);

  const payload = {
    email_id: verifData?.data?.email_id as string,
    emp_id: verifData?.data?.emp_id as string,
  };

  const emailData = (await getOneEmailOnePager(payload)) as Email;

  if (!emailData || !verifData?.success) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-small">
          <LuMailX className="text-3xl" />
          <span className="text-sm">Cant find the requested email</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full w-full flex flex-col px-2 pt-2 overflow-y-auto gap-2">
      <div className="flex items-center justify-between w-full">
        <div className="text-lg font-semibold">Quality Review</div>
      </div>
      <hr />
      <OnepagerProvider data={emailData}>
        <div className="h-full flex flex-col overflow-y-auto sm:flex-row">
          <div className="flex flex-col w-full h-full overflow-y-auto sm:w-[75%]">
            <div id="summary" className="text-sm">
              We have identified the following mail could potentially be
              highlighting an opportunity to better serve our client. We would
              like to better understand the issue and support you in identifying
              sustainable solutions. Please fill the feedback by EOD tomorrow to
              close the loop. Please note that we will be sharing a desk alert
              the following day for pending RCAs.
            </div>
            <OnepagerEmail />
          </div>
          <div className="flex flex-col h-full overflow-y-auto w-full pl-2 sm:w-[35%]">
            <div className="py-2 text-center font-semibold w-full">
              Feedback
            </div>
            <FeedbackFormDataWrapper />
          </div>
        </div>
      </OnepagerProvider>
    </div>
  );
};

export default OnepagerPage;
