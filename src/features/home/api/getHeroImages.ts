import axiosInstance from "../../../api/axiosInstance";
import type { HeroImage } from "../section.types";

const getHeroImage = async () => {
  const response = await axiosInstance.get<HeroImage[]>("/hero-images/");
  return response.data;
};

export default getHeroImage;