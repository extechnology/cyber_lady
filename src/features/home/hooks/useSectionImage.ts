import getSectionImage from "../api/getSectionImages";
import { useQuery } from "@tanstack/react-query";

export default function useSectionImage() {
  return useQuery({
    queryKey: ["sectionImage"],
    queryFn: getSectionImage,
  });
}