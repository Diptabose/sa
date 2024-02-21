import React, { useContext, useState } from "react";
import { Email, EmailStatus } from "@/types/email";
import { TbDiscountCheck } from "react-icons/tb";
import { format } from "date-fns";
import HomeContext, { HomeContextProps } from "@/store/contexts/home.context";
import { SubtagChip } from "../chips/SubTagChip";
import { BotColorMapper } from "@/constants/general/constants";
import { LiaHourglass } from "react-icons/lia";
import AddTag from "@/assets/images/add_tag.svg";
import AddTagWhite from "@/assets/images/add_tag_white.svg";
import SendReviewWhite from "@/assets/images/send_review_white.svg";
import SendReview from "@/assets/images/send_review.svg";
import Image from "next/image";

interface Props {
  isSelected: boolean;
  email: Email;
  index: number;
}

const Emailcard = ({ isSelected, email, index }: Props) => {
  const { dispatch: homeDispatch } = useContext<HomeContextProps>(HomeContext);
  const selectedEmail = email;
  const lastTags = selectedEmail?.lastTags?.[0];
  const opinions = selectedEmail?.opinions;
  const [isHover, setHover] = useState<boolean>(false);

  const status = selectedEmail?.status as EmailStatus;

  function generateCardDetails() {
    let cardData: Record<string, any> = {
      header: "",
      footer: {
        one: null,
        two: null,
        three: null,
        four: null,
      },
    };

    if (status?.approved_by_elt?.status) {
      cardData.header = "Approved by ELT";
      cardData.footer = {
        one: <TbDiscountCheck className="text-base font-medium" />,
        two: "Approved",
      };
    } else if (status?.approved_by_elt?.status) {
      cardData.header = "Approved by SLT";
      cardData.footer = {
        one: <TbDiscountCheck className="text-base font-medium" />,
        two: "Approved",
      };
    } else if (status?.approved_by_sm?.status) {
      cardData.header = "Opinion shared by SM";
      cardData.footer = {
        two: opinions?.name ?? "",
        three: "Approval Pending",
        four: <LiaHourglass className="text-base font-medium" />,
      };
    } else if (
      status?.sent_for_review?.status &&
      !status?.approved_by_elt?.status &&
      !status?.approved_by_slt?.status &&
      !status?.approved_by_sm?.status
    ) {
      cardData.header = "Project Assigned and pending with SM";
      cardData.footer = {
        one: <LiaHourglass className="text-base" />,
        two: "Opinion Pending",
      };
    } else if (status?.flag_changed?.status) {
      cardData.header = `Last Modified By: ${status?.flag_changed.modified_by}`;
    } else if (
      status?.flagged_by_bot?.status &&
      !status?.sent_for_review?.status
    ) {
      cardData.header = "Identified by Bot";
    } else {
      cardData.header = "Identified by Bot";
    }

    return cardData;
  }

  const cardData = generateCardDetails();

  const AddTagIcon = isSelected ? AddTagWhite : AddTag;
  const SendReviewIcon = isSelected ? SendReviewWhite : SendReview;

  function handleChangeTag() {
    homeDispatch({ field: "openSelectTagDialog", value: true });
  }

  function handleChangeProject() {
    homeDispatch({ field: "openSelectProjectDialog", value: true });
  }

  const hideIcons = selectedEmail?.status?.sent_for_review?.status ?? false;

  return (
    <div
      className={`email-card text-xs w-full ${
        isSelected
          ? "bg-container-brand text-white hover:bg-container-brand"
          : ""
      } `}
      onClick={() => {
        homeDispatch({ field: "selectedEmailIndex", value: index });
      }}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <div className="flex justify-between items-center text-xs">
        <span
          id="last_modified_by"
          className="line-clamp-1"
          title={cardData?.header}
        >
          {cardData?.header}
        </span>
      </div>

      <div className="flex justify-between my-2 items-center">
        <SubtagChip
          name={lastTags?.name ?? ""}
          subname={lastTags?.subtagData?.name ?? ""}
          color={lastTags?.color ?? BotColorMapper[lastTags?.name as string]}
        />
        <span id="time" className="line-clamp-1">
          {format(new Date(email?.receivedDateTime), "EEE, hh:mm a")}
        </span>
      </div>
      <div className="flex items-center gap-1 line-clamp-1 mb-2">
        <span className="line-clamp-1 font-medium">{email?.from_email}</span>
      </div>
      <div className="flex items-center gap-1 line-clamp-1">
        <span
          className={`line-clamp-2 ${
            isSelected
              ? "text-content-email-card-placeholder-selected"
              : "text-content-email-card-placeholder"
          }`}
          title={email?.subject}
        >
          {email?.subject}
        </span>
      </div>
      <div className="flex items-center justify-between mt-2 h-5">
        <div className="flex gap-1 items-center">
          {cardData.footer?.one}
          <span className={`font-medium`}>{cardData.footer?.two}</span>
        </div>

        <div
          id="actions"
          className={`flex items-center gap-small ${
            isHover && !hideIcons ? "flex" : "hidden"
          }`}
        >
          <Image
            onClick={handleChangeTag}
            src={AddTagIcon}
            alt="add tag"
            className="w-4 h-4"
          />

          <Image
            onClick={handleChangeProject}
            src={SendReviewIcon}
            alt="add tag"
            className="w-4 h-4"
          />
        </div>
        {hideIcons && (
          <div className="flex gap-1 items-center">
            {cardData.footer?.three}
            <span className={`font-medium`}>{cardData.footer?.four}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Emailcard;
