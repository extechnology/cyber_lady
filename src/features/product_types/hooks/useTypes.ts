import { useQuery } from "@tanstack/react-query";
import getTypes from "../api/getTypes";

const useTypes = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: getTypes,
  });
};

export default useTypes;