// Server component to get the Azure configuration data.
import AzureConfig from "@/components/ui/config/AzureConfig";
import { getAzureConfiguration } from "@/helper/pagefunctions";





const AzureConfigPage = async () => {


  let data = await getAzureConfiguration();
  if(!data){
    data = {
      tenant_id: '',
      client_id: '',
      client_secret: ''
    }
  }
  delete data._id;
  return (
   <AzureConfig  initVal={data}/>
  )
}

export default AzureConfigPage;
