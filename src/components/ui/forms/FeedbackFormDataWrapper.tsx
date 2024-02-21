import { getOpinionsOnePager } from "@/helper/pagefunctions";
import FeedbackOpinion from "./FeedbackOpinion";

const FeedbackFormDataWrapper = async () => {
  const opinions = await getOpinionsOnePager();

  return (
    <>
      <FeedbackOpinion opinionsData={opinions} />
    </>
  );
};

export default FeedbackFormDataWrapper;
