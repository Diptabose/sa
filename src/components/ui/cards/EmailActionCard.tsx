import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import SelectTags from "../dialogs/SelectTags";
import { useContext } from "react";
import HomeContext, { HomeContextProps } from "@/store/contexts/home.context";
import SelectProject from "../dialogs/SelectProject";

const EmailActionCard = () => {
  const { state, dispatch } = useContext<HomeContextProps>(HomeContext);

  const { emails, selectedEmailIndex } = state;
  const selectedEmail = emails[selectedEmailIndex];

   const disable = selectedEmail?.status?.sent_for_review?.status ?? false;
  // const disable = false;
  function handleChangeTag() {
    dispatch({ field: "openSelectTagDialog", value: true });
  }

  function handleChangeProject() {
    dispatch({ field: "openSelectProjectDialog", value: true });
  }

  return (
    <Card className="flex flex-col flex-none py-4 px-2 gap-small rounded-cards">
      <span className="font-medium">Actions</span>
      <div className="flex items-center gap-small flex-wrap">
        <Button
          size="small"
          variant="contained"
          className="text-sm w-full disabled"
          disabled={disable}
          onClick={handleChangeTag}
        >
          Change Tag
        </Button>
        <Button
          size="small"
          variant="contained"
          className="text-sm w-full disabled"
          disabled={disable}
          onClick={handleChangeProject}
        >
          Send for Review
        </Button>
      </div>
      <SelectTags />
      <SelectProject />
    </Card>
  );
};

export default EmailActionCard;
