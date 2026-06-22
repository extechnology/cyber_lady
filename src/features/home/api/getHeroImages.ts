import axiosInstance from "../../../api/axiosInstance";

const getHeroImage = async () => {
  const response = await axiosInstance.get("/hero-images/");
  return response.data;
};

export default getHeroImage;