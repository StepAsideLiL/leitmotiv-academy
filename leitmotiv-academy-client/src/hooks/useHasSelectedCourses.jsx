import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";
import useFirebaseAuth from "./useFirebaseAuth";

const useHasSelectedCourses = (courseId) => {
  const { user } = useFirebaseAuth();

  const {
    isLoading: isCoueseSelectedLoading,
    refetch,
    data: hasCoueseSelected,
  } = useQuery({
    queryKey: ["hasCoueseSelected", courseId, user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/v1/users/${user?.email}/course/${courseId}`
      );
      return res.data.hasSelected;
    },
  });

  return { isCoueseSelectedLoading, refetch, hasCoueseSelected };
};

export default useHasSelectedCourses;
