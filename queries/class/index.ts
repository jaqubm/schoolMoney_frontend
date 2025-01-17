import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/queries/axios";
import { toast } from "@/hooks/use-toast";
import {
  CreateClassPayload,
  UpdateClassPayload,
  ClassDetails,
  SearchClassResult,
} from "@/app/class/Class.types";
import { handleError } from "@/utils/handleError";

export const useCreateClass = () => {
  return useMutation({
    mutationFn: async (data: CreateClassPayload): Promise<void> => {
      await axiosInstance.post("/Class/Create", data);
    },
    onSuccess: () => {
      toast({
        title: "Class created",
        description: "The class has been successfully created.",
      });
    },
    onError: handleError,
  });
};

export const useGetClassById = (classId: string) => {
  return useQuery<ClassDetails>({
    queryKey: ["class", classId],
    queryFn: async (): Promise<ClassDetails> => {
      const response = await axiosInstance.get(`/Class/Get/${classId}`);
      return response.data;
    },
    onError: handleError,
  });
};

export const useSearchClasses = (className: string) => {
  return useQuery<SearchClassResult>({
    queryKey: ["searchClasses", className],
    queryFn: async (): Promise<SearchClassResult> => {
      const response = await axiosInstance.get(`/Class/Search/${className}`);
      return response.data;
    },
    onError: handleError,
    enabled: !!className,
  });
};

export const useUpdateClass = () => {
  return useMutation({
    mutationFn: async ({
      classId,
      data,
    }: {
      classId: string;
      data: UpdateClassPayload;
    }): Promise<void> => {
      await axiosInstance.put(`/Class/Update/${classId}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Class updated",
        description: "The class has been successfully updated.",
      });
    },
    onError: handleError,
  });
};

export const useDeleteClass = () => {
  return useMutation({
    mutationFn: async (classId: string): Promise<void> => {
      await axiosInstance.delete(`/Class/Delete/${classId}`);
    },
    onSuccess: () => {
      toast({
        title: "Class deleted",
        description: "The class has been successfully deleted.",
      });
    },
    onError: handleError,
  });
};
