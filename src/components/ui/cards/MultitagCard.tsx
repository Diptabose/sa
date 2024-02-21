import Card from "@mui/material/Card";
import React, { useContext } from "react";
import { SubtagChip } from "../chips/SubTagChip";
import HomeContext, { HomeContextProps } from "@/store/contexts/home.context";
import { BotColorMapper } from "@/constants/general/constants";
import LoaderCard from "./LoaderCard";
import { LastTag } from "@/types/email";

const label = ["Bot", "Modified"];

const MultitagCard = () => {
  const { state, dispatch: homeDispatch } =
    useContext<HomeContextProps>(HomeContext);
  const { emails, selectedEmailIndex } = state;
  const selectedEmail = emails[selectedEmailIndex];

  if (selectedEmail) {
    const lastTags = selectedEmail.lastTags as LastTag[];

    let tags = [];

    if (lastTags?.length >= 2) {
      tags[1] = lastTags[0];
      tags[0] = lastTags.slice(-1)[0];
    } else {
      tags[0] = lastTags.slice(-1)[0];
    }

    return (
      <Card className="flex flex-col flex-none gap-small p-2 rounded-cards">
        <span className="font-medium">Tag</span>
        <table className="text-sm">
          <tbody>
            {tags?.map((tag, index: number) => {
              return (
                <tr key={index}>
                  <td className="p-1">{label[index]}</td>
                  <td className="p-1">:</td>
                  <td className="p-1">
                    {tag?.name ? (
                      <SubtagChip
                        subname={tag?.subtagData?.name}
                        name={tag?.name}
                        color={tag?.color ?? BotColorMapper[tag?.name]}
                      />
                    ) : (
                      <>-</>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    );
  }

  return <LoaderCard h={80} />;
};

export default MultitagCard;
