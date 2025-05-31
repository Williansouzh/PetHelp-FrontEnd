export interface Stats {
  totalPets: number;
  adoptedPets: number;
  availablePets: number;
  pendingRequests: number;
}
export interface Pet {
  id: string;
  name: string;
  birthDate: string;
  breed: string;
  status: number;
  imageUrl: string;
  createdAt: string;
}
export interface PaginatedPets {
  data: Pet[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface Adoption {
  id: string;
  userId: string;
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
  status: number;
  createdAt: string;
}
export interface PaginatedAdoptions {
  data: Adoption[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
