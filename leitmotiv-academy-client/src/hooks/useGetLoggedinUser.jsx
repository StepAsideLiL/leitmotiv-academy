import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";
import useFirebaseAuth from "./useFirebaseAuth";

const useGetLoggedinUser = () => {
  const { user } = useFirebaseAuth();

  const { data: loggedinUser = {} } = useQuery({
    queryKey: ["userRole", user?.emial],
    queryFn: async () => {
      const res = await axiosInstance.get(`/v1/users/${user?.email}`);
      return res?.data;
    },
  });

  return { loggedinUser };
};

export default useGetLoggedinUser;
