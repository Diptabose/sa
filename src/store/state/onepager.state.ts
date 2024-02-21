import { Email, Opinion } from "@/types/email";



export interface OnepagerInitialState {
    email: Email,
    opinions: Opinion[]
}

export const initialState: OnepagerInitialState = {
    email: {} as Email,
    opinions: []
};
