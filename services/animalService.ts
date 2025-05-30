import api from "../lib/api";

export async function getAnimals() {
  const response = await api.get("/animals");
  return response.data;
}
export async function getAnimalById(id: string) {
  const response = await api.get(`/animals/${id}`);
  return response.data;
}
