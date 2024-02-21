import FiltersInbox from "@/components/atomic/form/FiltersInbox";
export const dynamic = 'force-dynamic';
const SentimentAnalysisHomePage = async () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto w-full">
      <FiltersInbox />
    </div>
  );
};

export default SentimentAnalysisHomePage;
