import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";
import useAuth from "./useAuth";

const useRole = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const { data: role, isLoading } = useQuery({
    queryKey: ["roleOfCurrentUser", user?.email],
    queryFn: async () =>
      (await secureAxios.get(`/users/roleOfUser?email=${user?.email}`)).data,
    enabled: !!user,
  });

  return { role, isLoading };
};

export default useRole;
