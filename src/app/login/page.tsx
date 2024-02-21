import Login from "@/components/ui/log/Login";
import Oauth from "@/components/ui/log/Oauth";
import { checkDbStatus } from "@/helper/pagefunctions";



const LoginPage = async () => {

  const users = await checkDbStatus(); 
  if(!users){
        return <Login />
  }
  else{
    return <Oauth />
  }
}


export default LoginPage;
