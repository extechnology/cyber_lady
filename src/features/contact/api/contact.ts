import axiosInstance from "../../../api/axiosInstance";
import type { Contact } from "../types/contact.types";

export async function contact(data:Contact){
    const response = await axiosInstance.post("/contact/", data);
    return response.data;
}