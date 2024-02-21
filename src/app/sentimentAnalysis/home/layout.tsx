import { getAllOpinion, getAllTags } from "@/helper/pagefunctions";
import HomeProvider from "@/store/providers/HomeProvider";
import { Opinion, Tags } from "@/types/email";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox - Sentiment Analysis",
  description: "Home page for sentiment analysis. Changing Tags , assigning projects and several tasks can be done here.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  let data = {opinions:[] as Opinion[] , tags:[] as Tags[]};
  try{
    const response = await Promise.all([getAllOpinion({
      sortby:'name asc'
    }), getAllTags({
      sortby:'name asc'
    })]);

    data = { opinions: response[0] as Opinion[], tags: response[1] as Tags[]};
  }
  catch(err){

  }
  

  return (
    <div className="w-full flex h-full">
      <div className="h-full overflow-hidden w-full">
        <HomeProvider data={data}>{children}</HomeProvider>
      </div>
    </div>
  );
}
