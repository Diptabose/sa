import { Tags } from "@/types/email";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import EditOutline from "@mui/icons-material/EditOutlined";
import { SubtagChip } from "../chips/SubTagChip";
import DeleteDialog from "../dialogs/DeleteDialog";

interface Props {
  tagData: Tags;
  actions: any;
}

const TagCard = ({ tagData }: Props) => {
  const { _id, name, subtags, color, notes, can_delete } = tagData;
  return (
    <Card className="h-full flex flex-col py-4 px-2 gap-medium rounded-cards ">
      <div className="flex items-center justify-between">
        <div id="tag_name" className="capitalize" style={{ color: color }}>
          {name}
        </div>
        <div className="flex items-center">
          <IconButton
            LinkComponent={Link}
            href={`/sentimentAnalysis/settings/tags/create_tag?id=${_id}`}
            size="small"
          >
            <EditOutline />
          </IconButton>
          {can_delete && (
            <DeleteDialog deleteId={_id as string} deleteItem={"tags"} />
          )}
        </div>
      </div>
      <hr />

      <div className="flex flex-col gap-2">
        <span>Subtags</span>
        <div className="flex flex-wrap items-start gap-1">
          {subtags && subtags.length > 0 ? (
            subtags?.map((subtag, index) => {
              return (
                <SubtagChip
                  color={color}
                  name={subtag.name ?? "unknown"}
                  key={index}
                />
              );
            })
          ) : (
            <>-</>
          )}
        </div>
      </div>

      <div id="color_container" className="flex flex-col gap-1">
        <span>Color</span>
        <span id="tag_color" className="text-sm">
          {color ?? "-"}
        </span>
      </div>
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

export default TagCard;
