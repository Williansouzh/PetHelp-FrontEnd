export interface Animal {
  age: string;
  image: any;
  id: string;
  name: string;
  species: string;
  breed: string;
  birthDate: string; // pode ser Date, se você converter ao receber
  gender: Gender;
  size: Size;
  description: string;
  isVaccinated: boolean;
  isNeutered: boolean;
  adoptionRequirements: string;
  status: AnimalStatus;
  imageUrl: string; // URL da imagem principal
  photoUrls?: string[]; // lista de URLs adicionais
  city: string;
  state: string;
  createdByUserId: string;
  createdAt: string; // ou Date
}
export interface AnimalResponse {
  id: string;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  gender: Gender;
  size: Size;
  description: string;
  isVaccinated: boolean;
  isNeutered: boolean;
  adoptionRequirements: string;
  status: AnimalStatus;
  photoUrls: string[];
  imageUrl?: string;
  city: string;
  state: string;
  createdByUserId: string;
  createdAt: string;
}
export interface AnimalRequest {
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  gender: Gender;
  size: Size;
  description: string;
  isVaccinated: boolean;
  isNeutered: boolean;
  adoptionRequirements?: string;
  status?: AnimalStatus;
  image?: File | null;
  city: string;
  state: string;
  createdByUserId: string;
}
export enum Gender {
  Macho = 0,
  Femea = 1,
}

export enum Size {
  Pequeno = 0,
  Medio = 1,
  Grande = 2,
}

export enum AnimalStatus {
  Disponivel = 0,
  Adotado = 1,
  EmAdocao = 2,
}
