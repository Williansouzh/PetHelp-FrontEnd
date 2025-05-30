"use client";
import { Animal } from "@/interfaces/animalInterface";
import api from "../lib/api";
import { PaginationResponse } from "@/interfaces/paginationInterface";

export async function getAnimals(
  pageNumber = 1,
  pageSize = 10,
  filters?: {
    name?: string;
    type?: string;
    location?: string;
  }
): Promise<PaginationResponse<Animal>> {
  const params: any = { pageNumber, pageSize };

  if (filters?.name) params.name = filters.name;
  if (filters?.type) params.type = filters.type;
  if (filters?.location) params.location = filters.location;

  const response = await api.get("/animals", { params });
  return response.data;
}

export async function getAnimalById(id: string): Promise<Animal> {
  const response = await api.get(`/animals/${id}`);
  return response.data;
}

export async function createAnimal(formData: FormData): Promise<Animal> {
  const response = await api.post("/animals", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function updateAnimal(
  id: string,
  updateData: Partial<Animal>
): Promise<Animal> {
  const response = await api.put(`/animals/${id}`, updateData);
  return response.data;
}

export async function deleteAnimal(id: string): Promise<void> {
  await api.delete(`/animals/${id}`);
}
