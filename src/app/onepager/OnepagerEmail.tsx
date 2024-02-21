"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Subject from "../sentimentAnalysis/home/Subject";
import { FormikProps } from "formik";
import { FilterFormInterface } from "@/types/formik";
import OnepagerContext, {
  OnepagerContextProps,
} from "@/store/contexts/onepager.context";
import { SubtagChip } from "@/components/ui/chips/SubTagChip";

interface Props {
  formikProp: FormikProps<FilterFormInterface>;
}

const OnepagerEmail = () => {
  const { state, dispatch } = useContext<OnepagerContextProps>(OnepagerContext);
  const { email } = state;
  const emailref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | null>("0px");

  const formattedEmail = email?.body?.replace(
    /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
    ""
  );

  const [showEmail, setShowEmail] = useState(false);

  function EmailRenderHeightFunc() {
    const parentHeight: number = emailref.current?.getBoundingClientRect()
      .height as number;

    if (parentHeight) {
      const firstChild = emailref.current?.firstChild as HTMLDivElement;

      const firstChildHeight = firstChild?.clientHeight;
      const calHeight = parentHeight - firstChildHeight;
      setHeight(`${calHeight}px`);
      setShowEmail(true);
    }
  }

  useEffect(() => {
    EmailRenderHeightFunc();
    window.addEventListener("resize", EmailRenderHeightFunc);
    return () => {
      window.removeEventListener("resize", EmailRenderHeightFunc);
    };
  }, [showEmail]);

  const subject_data = {
    subject: email?.subject,
    sender_email: email?.sender_email,
    toRecipients: email?.toRecipients,
    sentDateTime: email?.sentDateTime,
  };

  const lastTag = email?.lastTags?.[0];

  return (
    <div className="h-full py-2 overflow-y-auto">
      <>
        <div
          className="h-full w-full p-2 flex flex-col overflow-y-auto bg-container-brand-lite"
          ref={emailref}
        >
          <div className="flex flex-col gap-small firstchild">
            <SubtagChip
              color={lastTag?.color ?? ""}
              name={lastTag?.name ?? ""}
              subname={lastTag?.subtagData?.name ?? ""}
            />
            <Subject data={subject_data} />
          </div>

          {showEmail ? (
            <div
              style={{ height: height ?? "0px" }}
              className="w-full overflow-auto !text-sm pt-2"
              dangerouslySetInnerHTML={{
                __html: formattedEmail,
              }}
            ></div>
          ) : (
            <></>
          )}
        </div>
      </>
    </div>
  );
};

export default OnepagerEmail;
