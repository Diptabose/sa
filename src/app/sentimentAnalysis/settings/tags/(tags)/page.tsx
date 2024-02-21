import TagCard from "@/components/ui/cards/TagCard";
import { getAllTags } from "@/helper/pagefunctions";
import { Tags } from "@/types/email";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Masonry from "@mui/lab/Masonry";
import Link from "next/link";
import React from "react";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import TagsLoader from "./loading";

export const dynamic = "force-dynamic";
const EmptyTags = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col gap-small items-center">
        <StyleOutlinedIcon fontSize="large" />
        <span>Click {`"Create Tag"`} to add a new tag</span>
      </div>
    </div>
  );
};

const TagsPage = async () => {
  const tags = (await getAllTags()) as Tags[];

  return (
    <div className="h-full w-full bg-surface-3 flex flex-col overflow-y-auto gap-2">
      <div className="flex items-center justify-between w-full p-2">
        <div className="text-lg font-semibold">Tags</div>
        <div>
          <Button variant="contained" size="small">
            <Link href="/sentimentAnalysis/settings/tags/create_tag">
              Create Tag
            </Link>
          </Button>
        </div>
      </div>

      {!tags || tags.length === 0 ? (
        <EmptyTags />
      ) : (
        <div className="h-full overflow-y-auto p-2">
          <Grid
            rowSpacing={1}
            container
            spacing={{ xs: 2, md:1 }}
            columns={{ xs: 2, sm:8, md: 12 }}
          >
            {tags.map((tag, index) => {
              return (
                <Grid item xs={2} sm={4} md={4} key={tag?._id}>
                  <TagCard
                    actions={"Hello world"}
                    tagData={tag}
                    key={tag._id}
                  />
                </Grid>
              );
            })}
          </Grid>
          {/* <Masonry
            columns={{ xs: 1, sm: 2, md: 3 }}
            spacing={2}
            defaultHeight={450}
            defaultColumns={4}
            defaultSpacing={1}

            // Don't use flex-col here , it will break the layout to take flex direction row.
          >
            {tags.map((tag, index) => {
              return (
                <TagCard actions={"Hello world"} tagData={tag} key={tag._id} />
              );
            })}
          </Masonry> */}
        </div>
      )}
    </div>
  );
};

export default TagsPage;
