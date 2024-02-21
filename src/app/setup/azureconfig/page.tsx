// Server component to get the Azure configuration data.
import AzureConfig from "../../../components/ui/config/AzureConfig";
import { getAzureConfiguration } from "@/helper/pagefunctions";
import { tempTokenName } from "@/constants/general/constants";

import { cookies } from "next/headers";

const AzureConfigPage = async () => {



  let data = await getAzureConfiguration();

  const isFirstTimeConfiguring = cookies().has(tempTokenName);
  
  if(!data){
    data = {
      tenant_id: '',
      client_id: '',
      client_secret: ''
    }
  }
  return (
   <AzureConfig  initVal={data} editing={false}  isFirstTimeConfiguring={isFirstTimeConfiguring} />
  )
}

export default AzureConfigPage;
