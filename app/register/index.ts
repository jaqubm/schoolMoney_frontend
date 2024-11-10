import type { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from "@/app/api";

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, passwordConfirm, name, surname } = req.body;

  try {
    const response = await axiosInstance.post("/Auth/Register", {
      email,
      password,
      passwordConfirm,
      name,
      surname,
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export default registerHandler;
