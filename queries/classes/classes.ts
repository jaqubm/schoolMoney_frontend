import axiosInstance from "@/app/api";
import { useQuery } from "@tanstack/react-query";
import { ClassData } from "@/app/classes/classes";

export const fetchClassesByName = async (
  className: string,
): Promise<ClassData[]> => {
  const { data } = await axiosInstance.get(`/Class/Search/${className}`);
  return data;
};

export const useClassesData = (className: string) => {
  return useQuery<ClassData[]>({
    queryFn: () => fetchClassesByName(className),
    queryKey: ["classesData", className],
    enabled: className.length > 0,
  });
};
