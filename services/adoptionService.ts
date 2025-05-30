import api from "@/lib/api";

export interface AdoptionRequest {
  animalId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  hasOtherPets: boolean;
  housingType: string;
  numberOfResidents: number;
  workSchedule: string;
  reasonForAdoption: string;
  agreedToTerms: boolean;
}

export interface AdoptionResponse {
  id: string;
  userId: string;
  animalId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  hasOtherPets: boolean;
  housingType: string;
  numberOfResidents: number;
  workSchedule: string;
  reasonForAdoption: string;
  agreedToTerms: boolean;
  createdAt: string;
}

export async function createAdoption(data: AdoptionRequest) {
  const response = await api.post<AdoptionResponse>("/adoptions", data);
  return response.data;
}

export async function getAdoptionById(id: string) {
  const response = await api.get<AdoptionResponse>(`/adoptions/${id}`);
  return response.data;
}

export async function updateAdoption(id: string, data: AdoptionRequest) {
  const response = await api.put<AdoptionResponse>(`/adoptions/${id}`, data);
  return response.data;
}

export async function deleteAdoption(id: string) {
  await api.delete(`/adoptions/${id}`);
}

export async function getAllAdoptions(pageNumber = 1, pageSize = 10) {
  const response = await api.get<AdoptionResponse[]>(`/adoptions`, {
    params: { pageNumber, pageSize },
  });
  return response.data;
}
