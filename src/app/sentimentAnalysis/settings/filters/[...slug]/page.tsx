import { FilterSlug, Params } from "@/types/params";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { Emails } from "@/types/formik";
import User from "@/components/ui/filters/User";
import Email from "@/components/ui/filters/Email";
import { getFilters } from "@/helper/pagefunctions";
import { AzureUser } from "@/types/user";
import SourceFilterLoaders from "./loading";

interface Extras {
  ccval: AzureUser[];
  emailsfromval: AzureUser[];
  emailstoval: AzureUser[];
}

function getComponent(key: FilterSlug, feedData: Emails, extras: any) {
  const componentMap: Record<FilterSlug, ReactNode> = {
    domains: <User label="Domains" initialValues={feedData} />,
    emailsfrom: (
      <Email
        label="Emails from"
        initialValues={feedData}
        value={extras.emailsfromval}
      />
    ),
    emailsto: (
      <Email
        label="Emails to"
        initialValues={feedData}
        value={extras.emailstoval}
      />
    ),
    cc: <Email label="CC" initialValues={feedData} value={extras.ccval} />,
    subject: <User label="Subject" initialValues={feedData} />,
  };

  return componentMap[key];
}

const FiltersPage = async ({ params, searchParams }: Params<FilterSlug>) => {
  const { slug } = params;
  const data = await getFilters();

  if (!slug || data === null) {
    return notFound();
  }

  let component: ReactNode;

  if (data) {
    component = getComponent(slug, data[slug], {
      ccval: data.ccArray,
      emailsfromval: data.emailsFromArray,
      emailstoval: data.emailsToArray,
    });
  }

  
   return <div className="h-full">{component ?? <>No data to display</>}</div>;
};

export default FiltersPage;
