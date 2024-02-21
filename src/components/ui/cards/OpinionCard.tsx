import Link from "next/link";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import EditOutline from "@mui/icons-material/EditOutlined";
import { Opinion } from "@/types/email";
import DeleteDialog from "../dialogs/DeleteDialog";

interface Props {
  opinionData: Opinion;
}

const OpinionCard = ({ opinionData }: Props) => {
  const { name, notes, _id, can_delete } = opinionData;

  return (
    <Card className="flex flex-col py-4 px-2 gap-4 rounded-cards">
      <div className="flex items-center justify-between">
        <div id="tag_name" className="capitalize">
          Opinion:<span className="capitalize">{name}</span>
        </div>
        <div className="flex items-center">
          <IconButton
            LinkComponent={Link}
            href={`/sentimentAnalysis/settings/opinions/create_opinion?id=${_id}`}
            size="small"
          >
            {can_delete && <EditOutline />}
          </IconButton>
          {can_delete && (
            <DeleteDialog deleteItem="opinions" deleteId={_id as string} />
          )}
        </div>
      </div>
      <hr />
      {
        <div className="flex flex-col gap-1 text-sm">
          <span>Notes</span>
          {notes && notes?.length > 0 ? (
            <span className="text-sm line-clamp-3">{notes}</span>
          ) : (
            <>-</>
          )}
        </div>
      }
    </Card>
  );
};

export default OpinionCard;
