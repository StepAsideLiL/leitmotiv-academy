import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";

const useGetInstructor = (userId) => {
  const {
    isLoading: isInstructorLoading,
    refetch,
    data: instructor = {},
  } = useQuery({
    queryKey: ["instructor", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/v1/instructors/${userId}`);
      return res.data;
    },
  });

  return { isInstructorLoading, refetch, instructor };
};

export default useGetInstructor;
