import api from "../lib/api";

export async function getUserById(id: string) {
  const response = await api.get(`/auth/${id}`);
  return response.data;
}
