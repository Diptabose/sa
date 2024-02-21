"use server";

import { REMOTE_SERVER_URL } from "@/constants/general/constants";
import nextHttp from '@/utils/http';
import { SourceFilterValues } from "@/types/formik";
import { cookies } from "next/headers";
import { FilterParams } from "@/types/params";
import { getQueryString } from "@/utils/app/commonMethods";


export const checkDbStatus = async () => {
  try {
    const cooks = cookies().toString();
    const isConnected = await nextHttp.get(REMOTE_SERVER_URL + '/login/health', {
      credentials: "include",
      headers: {
        Cookie: cooks,
      }
    });
    const parsed_response = await isConnected?.json();
    return isConnected?.ok && parsed_response.success;
  } catch (err) {
    return false;
  }
}

export async function getMetrics(mode: string = 'monthly') {

  const cooks = cookies().toString();
  try {

    const data = await nextHttp.get(`${REMOTE_SERVER_URL}/metrics?mode=${mode}`, {
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
        Cookie: cooks,
      },
      next: {
        revalidate: 0
      }
    })


    // const data = await fetch(`${REMOTE_SERVER_URL}/metrics?mode=${mode}`, {
    //    credentials: 'include',
    //    headers: {
    //       "Content-type": "application/json",
    //       Cookie: `${cookies().toString()}`,
    //    },
    //    next: {
    //       revalidate: 0
    //    }
    // });

    const parsed_data = await data?.json();
    return parsed_data.data;
  }
  catch (err) {
    return null;
  }

}

export async function getAzureConfiguration() {

  const cooks = cookies().toString();
  try {

    const data = await nextHttp.get(REMOTE_SERVER_URL + '/azure/get_config', {
      method: 'get',
      credentials: 'include',
      headers: {
        Cookie: cooks,
      },
      next: {
        revalidate: 0,
      }
    });

    // const data = await fetch(REMOTE_SERVER_URL+'/azure/get_config', {
    //   method:'get',
    //   credentials:'include',
    //   headers:{
    //     Cookie: `${cookies().toString()}`,
    //   },
    //   next:{
    //     revalidate:0,
    //   }
    // });
    const azure_data = await data?.json();
    return azure_data.data;


  }
  catch (err) {
    return null;
  }

}

export async function getDBConfig() {

  const cooks = cookies().toString();
  try {

    const data = await nextHttp.get(REMOTE_SERVER_URL + '/db/getconfig ', {
      method: 'get',
      credentials: 'include',
      headers: {
        Cookie: cooks,
      },
      next: {
        revalidate: 0,
      }
    });

    // const data = await fetch(REMOTE_SERVER_URL+'/db/getconfig ', {
    //   method: 'get',
    //   credentials: 'include',
    //   headers: {
    //     Cookie: `${cookies().toString()}`,
    //   },
    //   next: {
    //     revalidate: 0,
    //   }
    // });
    const azure_data = await data?.json();
    return azure_data.data;
  }
  catch (err) {

    return null;
  }


}

export const getFilters = async (): Promise<null | SourceFilterValues> => {

  const cooks = cookies().toString();
  try {

    const data = await nextHttp.get(REMOTE_SERVER_URL + '/settings/filters', {
      headers: {
        "Content-type": "application/json",
        Cookie: cooks
      },
      next: {
        revalidate: 0
      }
    });
    // const data = await fetch(REMOTE_SERVER_URL+'/settings/filters', {
    //   headers: {
    //     "Content-type": "application/json",
    //     Cookie:`${cookies().toString()}`
    //   },
    //   next: {
    //     revalidate: 0
    //   }
    // });
    const parsed_data = await data?.json();
    if (data?.ok) {
      return parsed_data.data;
    }
    return null;
  }
  catch (err) {
    return null;
  }
}

export async function getRoles() {

  const cooks = cookies().toString();
  try {

    const response = await nextHttp.get(REMOTE_SERVER_URL + '/settings/roles/all?limit=25&skip=0', {
      method: 'GET',
      headers: {
        Cookie: cooks,
        "Content-type": "application/json",
      },
      next: {
        revalidate: 0,
      }
    })

    // const response = await fetch(REMOTE_SERVER_URL+'/settings/roles/all' , {
    //   method:'GET',
    //   headers:{
    //     Cookie: `${cookies().toString()}`,
    //     "Content-type":"application/json",
    //   },
    //   next:{
    //     revalidate:0,
    //   }
    // })

    const parsed_roles = await response?.json();
    return parsed_roles.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getRolesData() {

  const cooks = cookies().toString();
  try {

    const response = await nextHttp.get(REMOTE_SERVER_URL + '/settings/roles/allroles', {
      method: 'GET',
      headers: {
        Cookie: cooks,
        "Content-type": "application/json",
      },
      next: {
        revalidate: 0,
      }
    })

    // const response = await fetch(REMOTE_SERVER_URL+'/settings/roles/all' , {
    //   method:'GET',
    //   headers:{
    //     Cookie: `${cookies().toString()}`,
    //     "Content-type":"application/json",
    //   },
    //   next:{
    //     revalidate:0,
    //   }
    // })

    const parsed_roles = await response?.json();
    return parsed_roles.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getRole(role_id: string) {

  const cooks = cookies().toString();
  try {

    const role_data = await nextHttp.get(`${REMOTE_SERVER_URL}/settings/roles/${role_id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: cooks,
        "Content-type": 'application/json'
      },
      next: {
        revalidate: 0
      }
    });
    // const role_data = await fetch(`${REMOTE_SERVER_URL}/settings/roles/${role_id}`, {
    //     method: 'GET',
    //     credentials: 'include',
    //     headers: {
    //         Cookie: `${cookies().toString()}`,
    //         "Content-type": 'application/json'
    //     },
    //     next: {
    //         revalidate: 0
    //     }
    // });
    const parsed_role = await role_data?.json();
    const data = parsed_role.data;
    return data;
  }
  catch (err) {
    console.log(err);
    return null;
  }

}

export async function getUsers() {


  const cooks = cookies().toString();
  try {
    const users = await nextHttp.get(REMOTE_SERVER_URL + '/user/all?limit=25skip=0', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: cooks,
        "Content-type": "application/json",
      },
      next: {
        revalidate: 0,
      }
    });
    // const users = await fetch(REMOTE_SERVER_URL+'/user/allusers', {
    //   method: 'GET',
    //   credentials: 'include',
    //   headers: {
    //      Cookie:`${cookies().toString()}`,
    //     "Content-type": "application/json",
    //   },
    //   next: {
    //     revalidate: 0,
    //   }
    // });

    const parsed_users = await users?.json();
    return parsed_users.data;

  }
  catch (err) {
    return [];
  }
}


export async function getUser(id: string) {
  try {

    const cooks = cookies().toString();
    const response = await nextHttp.get(`${REMOTE_SERVER_URL}/user/${id}`, {
      method: 'GET',
      headers: {
        Cookie: cooks,
        "Content-type": "application/json"
      },
      next: {
        revalidate: 0
      }
    });

    // const response = await fetch(`${REMOTE_SERVER_URL}/user/${id}`,{
    //     method:'GET',
    //     headers:{
    //         Cookie: `${cookies().toString()}`,
    //         "Content-type":"application/json"
    //     },
    //     next:{
    //         revalidate:0
    //     }
    // });

    const parsed_response = await response?.json();
    if (response?.ok && parsed_response.success && parsed_response.data) {
      const { _id, username, active, name, userRole } = parsed_response.data;
      return { _id, username, active, name, role_id: userRole?._id, role: userRole?.role, role_active: userRole?.active };
    }
    return null;

  }
  catch (err) {
    console.log('Error ', err);
    return null;
  }
}


export async function getAllTags(params?: FilterParams) {

  try {
    const queryString = getQueryString(params);
    const cooks = cookies().toString();
    const response = await nextHttp.get(`${REMOTE_SERVER_URL}/settings/tags/all?${queryString}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: cooks,
        "Content-type": "application/json"
      }
    });

    const parsed_response = await response?.json();
    if (response?.ok && parsed_response.success && parsed_response.data) {
      return parsed_response.data;
    }
    return [];
  }
  catch (err) {
    console.log('Error ', err);
    return [];
  }
}

export async function getOneTag(id: string) {
  try {
    const cooks = cookies().toString();
    const response = await nextHttp.get(`${REMOTE_SERVER_URL}/settings/tags/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: cooks,
        "Content-type": "application/json"
      },
      next: {
        revalidate: 0
      }
    });

    const parsed_response = await response?.json();
    if (response?.ok && parsed_response.success && parsed_response.data) {
      return parsed_response.data;
    }
    return null;
  }
  catch (err) {
    console.log('Error ', err);
    return null;
  }
}

export async function getAllOpinion(params?: FilterParams) {
  try {
    const cooks = cookies().toString();
    const queryString = getQueryString(params);
    const response = await nextHttp.get(`${REMOTE_SERVER_URL}/settings/opinions/all?${queryString}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: cooks,
        "Content-type": "application/json"
      },
    });

    const parsed_response = await response?.json();
    if (response?.ok && parsed_response.success && parsed_response.data) {
      return parsed_response.data;
    }
    return [];
  }
  catch (err) {
    console.log('Error ', err);
    return [];
  }
}

export async function getOneOpinion(id: string) {
  try {
    const cooks = cookies().toString();
    const response = await nextHttp.get(`${REMOTE_SERVER_URL}/settings/opinions/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: cooks,
        "Content-type": "application/json"
      },
      next: {
        revalidate: 0
      }
    });

    const parsed_response = await response?.json();
    if (response?.ok && parsed_response.success && parsed_response.data) {
      return parsed_response.data;
    }
    return null;
  }
  catch (err) {
    console.log('Error ', err);
    return null;
  }
}

export async function getOneEmailOnePager(data: { email_id: string, emp_id: string }) {
  try {
    const cooks = cookies().toString();
    const response = await nextHttp.post(`${REMOTE_SERVER_URL}/cit/email`, data, {
      method: 'POST',
      headers: {
        Cookie: cooks,
        "Content-type": "application/json"
      },
      next: {
        revalidate: 0
      }
    });
    const parsed_response = await response?.json();
    if (response?.ok && parsed_response.success && parsed_response.data) {
      return parsed_response.data;
    }
    return null;
  }
  catch (err) {
    console.log('Error ', err);
    return null;
  }
}

export async function getOpinionsOnePager() {
  try {
    const cooks = cookies().toString();
    const response = await nextHttp.get(`${REMOTE_SERVER_URL}/cit/opinions`, {
      method: 'GET',
      headers: {
        Cookie: cooks,
        "Content-type": "application/json"
      },
      next: {
        revalidate: 0
      }
    });
    const parsed_response = await response?.json();
    if (response?.ok && parsed_response.success && parsed_response.data) {
      return parsed_response.data;
    }
    return [];
  }
  catch (err) {
    console.log('Error ', err);
    return [];
  }
}


