import api from "@/lib/api";

// Estatísticas do Dashboard
export async function getDashboardStats() {
  const response = await api.get("/dashboard/stats");
  return response.data;
}

// Pets recentes
export async function getRecentPets() {
  const response = await api.get("/dashboard/recent-pets");
  return response.data;
}

// Relatórios recentes
export async function getRecentReports() {
  const response = await api.get("/dashboard/recent-reports");
  return response.data;
}

// Todos os pets
export async function getAllPets() {
  const response = await api.get("/dashboard/pets");
  return response.data;
}

// Pets disponíveis
export async function getAvailablePets() {
  const response = await api.get("/dashboard/pets/available");
  return response.data;
}

// Pets por espécie
export async function getPetsBySpecies(species: string) {
  const response = await api.get(`/dashboard/pets/species/${species}`);
  return response.data;
}

// Pets por tamanho
export async function getPetsBySize(size: string) {
  const response = await api.get(`/dashboard/pets/size/${size}`);
  return response.data;
}

// Relatórios por nível de urgência
export async function getReportsByUrgency(urgencyLevel: string) {
  const response = await api.get(`/dashboard/reports/urgency/${urgencyLevel}`);
  return response.data;
}

// Relatórios por tipo de animal
export async function getReportsByAnimalType(animalType: string) {
  const response = await api.get(
    `/Dashboard/reports/animal-type/${animalType}`
  );
  return response.data;
}
export async function fetchPets() {
  const response = await fetch("/api/pets");
  if (!response.ok) throw new Error("Erro ao buscar pets");
  return response.json();
}

export async function fetchAdoptionRequests() {
  const response = await fetch("/api/adoption-requests");
  if (!response.ok) throw new Error("Erro ao buscar solicitações de adoção");
  return response.json();
}
