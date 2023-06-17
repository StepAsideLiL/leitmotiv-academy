import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const useGetEnrolledStudentsNum = (courseId) => {
  const {
    isLoading: isEnrolledCoursesNumLoading,
    refetch,
    data: enrolledCoursesNum = 0,
  } = useQuery({
    queryKey: ["enrolledCoursesNum", courseId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/v1/payment/courses/${courseId}`);
      return res.data.total;
    },
  });

  return { isEnrolledCoursesNumLoading, refetch, enrolledCoursesNum };
};

export default useGetEnrolledStudentsNum;
