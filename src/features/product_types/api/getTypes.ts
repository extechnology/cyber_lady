import axiosInstance from "../../../api/axiosInstance";
import type { ProductTypes } from "../types/productTypes.types";


const getTypes=async():Promise<ProductTypes[]>=>{
    const response=await axiosInstance.get<ProductTypes[]>("/types/");
    return response.data;
}

export default getTypes;
