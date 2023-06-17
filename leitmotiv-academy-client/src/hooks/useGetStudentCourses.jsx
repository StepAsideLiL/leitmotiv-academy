import { useQuery } from "react-query";
import useFirebaseAuth from "./useFirebaseAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetStudentCourses = () => {
  const { user } = useFirebaseAuth();
  const { axiosSecure } = useAxiosSecure();

  const {
    isLoading: isStudentCoursesLoading,
    refetch,
    data: studentCourses = [],
  } = useQuery({
    queryKey: ["StudentCourses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/v1/users/${user?.email}/courses`);
      return res.data;
    },
  });

  return { isStudentCoursesLoading, refetch, studentCourses };
};

export default useGetStudentCourses;
