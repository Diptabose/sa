"use client";
import Emailcard from "@/components/ui/cards/Emailcard";
import EmailActionsSidebar from "@/components/ui/sidebars/EmailActionsSidebar";
import HomeContext, { HomeContextProps } from "@/store/contexts/home.context";
import { useContext, useEffect, useRef, useState } from "react";
import { LuMailX } from "react-icons/lu";
import Subject from "../../../app/sentimentAnalysis/home/Subject";
import { PostMethod } from "@/utils/app/api";
import { FormikProps } from "formik";
import { FilterFormInterface } from "@/types/formik";
import HomeLoader from "../loader/HomeLoader";
import { Email } from "@/types/email";
import InfiniteScrollComponent from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import Loader from "../loader/Loader";

interface Props {
  formikProp: FormikProps<FilterFormInterface>;
}

const EMAIL_FETCH_LIMIT = 10;

const InboxContent = ({ formikProp }: Props) => {
  const { state, dispatch } = useContext<HomeContextProps>(HomeContext);
  const { emails, selectedEmailIndex, page, loading, skip, total } = state;
  const emailref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");
  const [scrollLoader, setScrollLoader] = useState<boolean>(false);
  const emailsListRef = useRef<HTMLDivElement>(null);

  const selectedEmail = emails[selectedEmailIndex];
  const formattedEmail = selectedEmail?.body?.replace(
    /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
    ""
  );

  function EmailRenderHeightFunc() {
    const parentHeight: number = emailref.current?.getBoundingClientRect()
      .height as number;

    if (parentHeight) {
      const firstChildHeight: number = (
        emailref.current?.firstChild as HTMLDivElement
      ).clientHeight as number;
      setHeight(parentHeight - firstChildHeight + "px");
    }
  }

  useEffect(() => {
    EmailRenderHeightFunc();
    window.addEventListener("resize", EmailRenderHeightFunc);
    return () => {
      window.removeEventListener("resize", EmailRenderHeightFunc);
    };
  }, [loading]);

  function getEmails(page_arg: number) {
    dispatch({ field: "loading", value: true });

    PostMethod(
      `emails/adv?limit=${page * EMAIL_FETCH_LIMIT}`,
      formikProp.values
    )
      .then((res) => {
        dispatch({ field: "emails", value: res["data"] });
        if (res["data"].length === 0) {
          dispatch({ field: "stillScrollable", value: false });
        } else {
          dispatch({ field: "stillScrollable", value: true });
        }
      })
      .finally(() => {
        dispatch({ field: "loading", value: false });
      });
    // GetMethod(`emails/all?limit=${page_arg * limit}`)
    //   .then((res) => {
    //     dispatch({ field: "emails", value: res["data"] });
    //     if (res["data"].length === 0) {
    //       dispatch({ field: "stillScrollable", value: false });
    //       dispatch({ field: "page", value: page_arg - 1 });
    //     }
    //     dispatch({ field: "loading", value: false });
    //   })
    //   .catch((err) => {});
  }

  function getScrolledEmails(page_arg: number) {
    PostMethod(
      `emails/adv?limit=${page_arg * EMAIL_FETCH_LIMIT}`,
      formikProp.values
    ).then((res) => {
      dispatch({ field: "emails", value: res["data"] });
      if (res["data"].length === 0) {
        dispatch({ field: "stillScrollable", value: false });
      } else {
        dispatch({ field: "stillScrollable", value: true });
        dispatch({ field: "page", value: page_arg - 1 });
      }
    });
  }

  // function getScrolledEmails(page_arg: number) {

  //   GetMethod(`emails/all?limit=${page_arg * limit}`)
  //     .then((res) => {
  //       dispatch({ field: "emails", value: res["data"] });
  //       if (res["data"].length === 0) {
  //         dispatch({ field: "stillScrollable", value: false });
  //         dispatch({ field: "page", value: page_arg - 1 });
  //       }

  //     })
  //     .catch((err) => {});
  // }

  function scrollNext(e: any) {
    if (
      e.target.offsetHeight + Math.ceil(e.target.scrollTop) >=
      e.target.scrollHeight
    ) {
      getEmailsOnScroll();
    }
  }

  async function getNewEmails(shallLoad: boolean, scrollLoad?: boolean) {
    if (shallLoad) {
      dispatch({ field: "loading", value: true });
    }

    if (scrollLoad) {
      setScrollLoader(true);
    }
    PostMethod(
      `emails/adv?limit=${EMAIL_FETCH_LIMIT}&skip=${skip}`,
      formikProp.values
    )
      .then((res) => {
        const updatedEmails = [...emails, ...res["data"]];

        console.log("The totol count is ", res["totalCount"]);
        dispatch({ field: "emails", value: updatedEmails });
        dispatch({ field: "total", value: res["totalCount"] });
        dispatch({ field: "skip", value: skip + EMAIL_FETCH_LIMIT });
      })
      .finally(() => {
        if (shallLoad) {
          dispatch({ field: "loading", value: false });
        }
        setScrollLoader(false);
      });
  }

  async function getEmailsOnScroll() {
    // Check the length to determine if the emails are recieved;
    console.log("Im in get Emails on scroll");
    if (scrollLoader) {
      return;
    }
    if (emails.length >= total) {
      return;
    }

    getNewEmails(false, true);
  }

  // useEffect(() => {
  //   getEmails(page);
  // }, []);

  // About to use
  useEffect(() => {
    getNewEmails(true);
  }, []);

  const handleDown = (event: KeyboardEvent) => {
    if (scrollLoader) {
      return;
    }
    let revisedIndex = 0;
    if (event.key === "ArrowUp" && selectedEmailIndex !== 0) {
      event.preventDefault();
      revisedIndex = selectedEmailIndex - 1;
    }
    if (event.key === "ArrowDown" && selectedEmailIndex < emails.length) {
      event.preventDefault();
      revisedIndex = selectedEmailIndex + 1;
    }
    if (revisedIndex >= 0 && revisedIndex <= emails.length - 1) {
      // Change the stuff;
      dispatch({ field: "selectedEmailIndex", value: revisedIndex });
      const selectedItem = emailsListRef?.current?.children[revisedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleDown);
    return () => {
      document.removeEventListener("keydown", handleDown);
    };
  }, [selectedEmailIndex, total, scrollLoader]);

  const subject_data = {
    subject: selectedEmail?.subject,
    sender_email: selectedEmail?.sender_email,
    toRecipients: selectedEmail?.toRecipients,
    sentDateTime: selectedEmail?.sentDateTime,
  };

  return (
    <div className="relative flex flex-[11] overflow-y-auto px-2 h-full">
      {loading ? (
        <HomeLoader />
      ) : // <CircularProgress
      //   size={24}
      //   className="text-content-brand absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      // />
      emails.length === 0 ? (
        <div className="text-content-placeholder absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-small m-auto items-center">
          <LuMailX className="text-3xl" />
          <span className="text-sm">No emails here</span>
        </div>
      ) : (
        <>
          <div className="h-full overflow-y-auto flex flex-col">
            <div
              className="relative flex-[11] overflow-y-auto h-full w-[300px]"
              onScroll={(e) => {
                scrollNext(e);
              }}
              ref={emailsListRef}
            >
              {emails != null &&
                (emails as Email[]).map((email, index) => {
                  return (
                    <Emailcard
                      email={email}
                      index={index}
                      isSelected={
                        emails[selectedEmailIndex] !== null &&
                        email["_id"] === emails[selectedEmailIndex]?.["_id"]
                      }
                      key={email._id}
                    />
                  );
                })}
              {scrollLoader && (
                <div className="flex items-center justify-center bottom-0 w-full bg-white h-10 ">
                  <CircularProgress size={20} className="text-content-brand" />
                </div>
              )}
            </div>
          </div>

          <div
            className="select-none w-full flex-[7] p-2 h-full flex flex-col overflow-y-auto bg-container-brand-lite"
            ref={emailref}
          >
            <Subject data={subject_data} />
            <div
              className="w-full overflow-auto !text-sm pt-2"
              style={{ height }}
              dangerouslySetInnerHTML={{
                __html: formattedEmail,
              }}
            ></div>
          </div>
          <EmailActionsSidebar />
        </>
      )}
    </div>
  );
};

export default InboxContent;
