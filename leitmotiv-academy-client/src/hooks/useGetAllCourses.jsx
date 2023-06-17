import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const useGetAllCourses = () => {
  const {
    isLoading: isAllCoursesLoading,
    refetch,
    data: allCourses = [],
  } = useQuery({
    queryKey: ["allCourses"],
    queryFn: async () => {
      const res = await axiosInstance.get("/v1/courses");
      return res.data;
    },
  });

  return { isAllCoursesLoading, refetch, allCourses };
};

export default useGetAllCourses;
