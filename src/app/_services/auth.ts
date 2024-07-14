import axios from "axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interfaces
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  // Add other fields returned by your API
}

export interface RegisterHospitalData {
  name: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
}

// Login function
export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/hospitals/login",
    credentials
  );
  return response.data;
};

// Token management functions
export const setToken = (token: string): void => {
  setCookie("accessToken", token, {
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: !"Strict",
  }); // Set cookie for 1 day
};

export const getToken = (): string | null => {
  return getCookie("accessToken") as string | null;
};

export const removeToken = (): void => {
  deleteCookie("accessToken", { path: "/" });
};

// New function to register hospital
export const registerHospital = async (
  hospitalData: RegisterHospitalData
): Promise<void> => {
  await api.post("/hospitals/register", hospitalData);
};
