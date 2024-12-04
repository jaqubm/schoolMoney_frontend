import axiosInstance from "@/app/api";
import { User } from "@/app/user/User.types";
import { useQuery } from "@tanstack/react-query";

export const fetchUserData = async (): Promise<User> => {
  const response = await axiosInstance.get("/User/Get");
  return response.data;
};

export const useUserData = () => {
  return useQuery<User>({
    queryFn: fetchUserData,
    queryKey: ["userData"],
  });
};
