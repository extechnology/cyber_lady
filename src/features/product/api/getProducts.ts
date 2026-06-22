import axiosInstance from "../../../api/axiosInstance";
import type { Product } from "../types/types.product";

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>("/products/");
  return data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const { data } = await axiosInstance.get<Product>(`/products/${id}/`);
  return data;
};