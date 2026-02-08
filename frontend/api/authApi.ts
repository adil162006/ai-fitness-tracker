import axiosInstance from "@/lib/axios";

// Types
export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authApi={
    signup:async(data:SignupData)=>{
        const response = await axiosInstance.post("/auth/signup",data);
        return response.data
    },
    login:async (data:LoginData)=>{
        const response = await axiosInstance.post("auth/login",data)
        return response.data
    },
    logout:async()=>{
        const response = axiosInstance.post("auth/logout")
        return response;
    }
}