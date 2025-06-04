"use client";
import { Animal, AnimalRequest } from "@/interfaces/animalInterface";
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

export async function createAnimal(
  animalData: any,
  images: File[]
): Promise<{ data: any; location: string | null }> {
  const formData = new FormData();

  formData.append("Name", animalData.Name);
  formData.append("Species", animalData.Species);
  formData.append("Breed", animalData.Breed);
  formData.append("BirthDate", animalData.BirthDate);
  formData.append("Gender", animalData.Gender.toString());
  formData.append("Size", animalData.Size.toString());
  formData.append("Description", animalData.Description);
  formData.append("IsVaccinated", animalData.IsVaccinated.toString());
  formData.append("IsNeutered", animalData.IsNeutered.toString());
  formData.append("AdoptionRequirements", animalData.AdoptionRequirements);
  formData.append("City", animalData.City);
  formData.append("State", animalData.State);
  formData.append("CreatedByUserId", animalData.CreatedByUserId);

  if (images.length > 0) {
    formData.append("Image", images[0]);

    for (let i = 1; i < images.length; i++) {
      formData.append("PhotoUrls", images[i]);
    }
  }

  const response = await api.post("Animals/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const location = response.headers["location"] || null;

  return { data: response.data, location };
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
