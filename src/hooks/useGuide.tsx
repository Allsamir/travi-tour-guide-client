import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";

const useGuide = (role: string) => {
  const publicAxios = usePublicAxios();
  const { data: guides = [] } = useQuery({
    queryKey: ["guides"],
    queryFn: async () =>
      (await publicAxios.get(`/users/role?id=&role=${role}`)).data,
  });
  return guides;
};

export default useGuide;
