import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const useGetInstructorCourses = (user) => {
  const {
    isLoading: isInstructorCoursesLoading,
    refetch,
    data: instructorCourses = [],
  } = useQuery({
    queryKey: ["instructorCourses", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/v1/courses/instructor/${user?.email}`
      );
      return res.data;
    },
  });

  return { isInstructorCoursesLoading, refetch, instructorCourses };
};

export default useGetInstructorCourses;
