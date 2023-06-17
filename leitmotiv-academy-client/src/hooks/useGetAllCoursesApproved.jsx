import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const useGetAllCoursesApproved = () => {
  const {
    isLoading: isAllCoursesApprovedLoading,
    refetch,
    data: allCoursesApproved = [],
  } = useQuery({
    queryKey: ["allCoursesApproved"],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/courses/approved");
      return res.data;
    },
  });

  return { isAllCoursesApprovedLoading, refetch, allCoursesApproved };
};

export default useGetAllCoursesApproved;
