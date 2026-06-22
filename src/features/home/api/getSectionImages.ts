import axiosInstance from "../../../api/axiosInstance";
import type { Section } from "../section.types";

const getSectionImage = async () => {
  const response = await axiosInstance.get<Section[]>("/section-images/");
  return response.data;
};

export default getSectionImage;
