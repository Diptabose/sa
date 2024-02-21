import OpinionCard from "@/components/ui/cards/OpinionCard";
import { getAllOpinion } from "@/helper/pagefunctions";
import { Opinion } from "@/types/email";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import React from "react";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import Masonry from "@mui/lab/Masonry";

export const dynamic = "force-dynamic";

const EmptyOpinions = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col gap-small items-center">
        <CommentsDisabledIcon fontSize="large" />
        <span>Click {`"Create Opinion"`} to add a new opinion</span>
      </div>
    </div>
  );
};

const OpinionsPage = async () => {
  const opinions = (await getAllOpinion()) as Opinion[];
  return (
    <div className="h-full w-full bg-surface-3 flex flex-col p-2 overflow-y-auto gap-2">
      <div className="flex items-center justify-between w-full">
        <div className="text-lg font-semibold">Opinions</div>
        <div>
          <Button
            variant="contained"
            disabled
            className="disabled"
            size="small"
          >
            <Link href="/sentimentAnalysis/settings/opinions/create_opinion">
              Create Opinion
            </Link>
          </Button>
        </div>
      </div>
      {!opinions || opinions.length === 0 ? (
        <EmptyOpinions />
      ) : (
        <div className="h-full overflow-y-auto">
          {/* <Masonry
            columns={{ xs: 1, sm: 2, md: 3 }}
            spacing={2}
            defaultHeight={450}
            defaultColumns={4}
            defaultSpacing={1}
            // Even by mistake don't use flex-col here , it will break the layout to take flex direction row.
          > */}
          <Grid
            rowSpacing={1}
            container
            spacing={{ xs: 2, md: 1 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            {opinions.map((opinion, index) => {
              return (
                <Grid item xs={2} sm={4} md={4} key={opinion._id}>
                  <OpinionCard opinionData={opinion} />
                </Grid>
              );
            })}
          </Grid>

          {/* </Masonry> */}
        </div>
      )}
    </div>
  );
};

export default OpinionsPage;
