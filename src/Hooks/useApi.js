import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useApi(endPoint) {
  
  let { data, isError, error, isLoading } = useQuery({
    queryKey: [endPoint],
    queryFn: () => {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`);
    },
  });
  return { data, isError, error, isLoading };
}
