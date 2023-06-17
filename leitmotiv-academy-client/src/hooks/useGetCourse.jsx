import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const useGetCourse = (courseId) => {
  const {
    isLoading: isCourseLoading,
    refetch,
    data: course = {},
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/v1/courses/${courseId}`);
      return res.data;
    },
  });

  return { isCourseLoading, refetch, course };
};

export default useGetCourse;
