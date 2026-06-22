import { useQuery } from "@tanstack/react-query";
import getHeroImage from "../api/getHeroImages";

export const useHeroImage = () => {
  return useQuery({
    queryKey: ["hero-image"],
    queryFn: getHeroImage,
  });
};
