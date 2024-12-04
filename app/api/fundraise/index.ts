import axiosInstance from "@/app/api";

export const createFundraiser = async (data: any) => {
  const response = await axiosInstance.post("/Fundraise/Create", data);
  return response.data;
};

export const getFundraiserById = async (fundraiserId: string) => {
  const response = await axiosInstance.get(`/Fundraise/Get/${fundraiserId}`);
  return response.data;
};

export const updateFundraiser = async ({
  fundraiserId,
  data,
}: {
  fundraiserId: string;
  data: any;
}) => {
  const response = await axiosInstance.put(
    `/Fundraise/Update/${fundraiserId}`,
    data,
  );
  return response.data;
};
