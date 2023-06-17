import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUsers = () => {
  const { axiosSecure } = useAxiosSecure();

  const {
    isLoading: isAllUsersLoading,
    refetch,
    data: allUsers = [],
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/v1/users");
      return res.data;
    },
  });

  return { isAllUsersLoading, refetch, allUsers };
};

export default useAllUsers;
