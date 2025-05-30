import api from "../lib/api";

export async function login(email: string, password: string) {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}

export async function register(payload: {
  email: string;
  password: string;
  name: string;
  lastName: string;
  role: "ONG" | "ADOTANTE";
  phone: string;
}) {
  const response = await api.post("/auth/register", payload);
  return response.data;
}
