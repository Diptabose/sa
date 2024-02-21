import React, { useState } from "react";
import MultitagCard from "../cards/MultitagCard";
import EmailStatusCard from "../cards/EmailStatusCard";
import EmailActionCard from "../cards/EmailActionCard";
import EmailInformationCard from "../cards/EmailInformationCard";
import EmailTimelineCard from "../cards/EmailTimelineCard";
import { MdTimeline } from "react-icons/md";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";

const EmailActionsSidebar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-surface-3 gap-small w-[300px] pt-2 text-sm">
      <div className="flex items-center justify-between px-2">
        <span>Information</span>
        <IconButton onClick={handleClick}>
          <MdTimeline className="text-xl cursor-pointer" />
        </IconButton>
      </div>
      <div className="overflow-y-auto flex-1 gap-small flex flex-col px-2">
        <MultitagCard />
        <EmailStatusCard />
        <EmailActionCard />
        <EmailInformationCard />
        {/* <EmailTimelineCard /> */}
      </div>

      <Menu
        id="timeline-menu"
        aria-labelledby="timeline-menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className='timeline'
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{maxHeight:'400px' }}
      >
        <EmailTimelineCard />
      </Menu>
    </div>
  );
};

export default EmailActionsSidebar;
