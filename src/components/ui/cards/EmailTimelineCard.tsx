import HomeContext, { HomeContextProps } from "@/store/contexts/home.context";
import Card from "@mui/material/Card";
import { format } from "date-fns";
import React, { useContext } from "react";
import LoaderCard from "./LoaderCard";

const EmailTimelineCard = () => {
  const { state, dispatch: homeDispatch } =
    useContext<HomeContextProps>(HomeContext);

  const { emails, selectedEmailIndex } = state;
  const selectedEmail = emails[selectedEmailIndex];

  if (selectedEmail) {
    console.log("The timelines are", selectedEmail?.timelines);
    return (
      // <Card className="flex flex-col flex-none py-4 px-2 gap-small rounded-cards max-w-[300px]">
      <div className="flex flex-col flex-none py-2 text-content-white px-2 gap-small max-w-[300px]">
        <span>Timeline</span>
        <ul className="text-sm gap-small flex flex-col">
          {selectedEmail?.timelines
            ?.toReversed()
            .map((timeline: any, index) => {
              return (
                <li className="text-sm" key={index}>
                  {timeline?.action} by {timeline?.modified_by}{" "}
                  {timeline?.role && `( ${timeline?.role} ) `} on{" "}
                  {format(
                    new Date(timeline?.modified_on),
                    "d MMM, EEE h:mm a yyyy"
                  )}
                </li>
              );
            })}
          {(!selectedEmail?.timelines ||
            selectedEmail?.timelines?.length === 0) && (
            <span>No timelines recorded</span>
          )}
        </ul>
      </div>
      // </Card>
    );
  }
  return <LoaderCard h={150} />;
};

export default EmailTimelineCard;
