import axiosInstance from "../../../api/axiosInstance";

const getSectionImage = async () => {
  const response = await axiosInstance.get("/section-images/");
  return response.data;
};

export default getSectionImage;
