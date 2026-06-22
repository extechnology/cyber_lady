import { useQuery } from "@tanstack/react-query";
import getCategories from "../api/getCategories";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export default useCategories;