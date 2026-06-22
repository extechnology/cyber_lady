import axiosInstance from "../../../api/axiosInstance";
import type { Category } from "../types/category.types";


const getCategories=async():Promise<Category[]>=>{
    const response=await axiosInstance.get<Category[]>("/categories/");
    return response.data;
}

export default getCategories;