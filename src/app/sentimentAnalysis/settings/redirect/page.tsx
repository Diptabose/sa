import { Params } from "@/types/params";
import { notFound, redirect } from "next/navigation";

const redirectMapper: Record<string, string> = {
  users: "/users",
  tags: "/tags",
  opinions: "/opinions",
  roles:'/roles'
};

const TestPage = ({ params, searchParams }: Params<string>) => {
  const to = searchParams.to as string;
  if (!(to in redirectMapper)) {
    return notFound();
  }

  redirect(`/sentimentAnalysis/settings${redirectMapper[to]}`);
};

export default TestPage;
