import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const useGetAllInstructors = () => {
  const {
    isLoading: isAllInstructorsLoading,
    refetch,
    data: allInstructors = [],
  } = useQuery({
    queryKey: ["allInstructors"],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/instructors");
      return res.data;
    },
  });

  return { isAllInstructorsLoading, refetch, allInstructors };
};

export default useGetAllInstructors;
