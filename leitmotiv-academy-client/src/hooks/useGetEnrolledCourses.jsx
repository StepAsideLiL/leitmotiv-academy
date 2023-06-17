import { useQuery } from "react-query";
import useFirebaseAuth from "./useFirebaseAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetEnrolledCourses = () => {
  const { user } = useFirebaseAuth();
  const { axiosSecure } = useAxiosSecure();

  const {
    isLoading: isEnrolledCoursesLoading,
    refetch,
    data: enrolledCourses = [],
  } = useQuery({
    queryKey: ["enrolledCourses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/v1/payment/${user?.email}`);
      return res.data;
    },
  });

  return { isEnrolledCoursesLoading, refetch, enrolledCourses };
};

export default useGetEnrolledCourses;
