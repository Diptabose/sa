import { RoleValues } from "./formik"

export interface User {
    _id:string,
    name:string,
    username:string,
    active:boolean,
    userRole:RoleValues,
    [key:string]:string|boolean|RoleValues
}




export interface AzureUser {
    _id: string,
    businessPhones: number[],
    displayName:string,
    givenName: string|null,
    jobTitle: string,
    mail: string,
    mobilePhone: string,
    officeLocation: null,
    preferredLanguage: null,
    surname: string|null,
    userPrincipalName: string,
    id: string,
    [key:string]:string|number[]|null
}


