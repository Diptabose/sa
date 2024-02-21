import { User } from "@/types/user";



export interface SentimentInitialState {
   userData: User
}

export const initialState: SentimentInitialState = {
   userData: {
      _id: "",
      active: true,
      name: "",
      username: "",
      userRole: {
         active: true,
         restricted_pages: [],
         role: "",
         _id: ""
      }
   }
};
