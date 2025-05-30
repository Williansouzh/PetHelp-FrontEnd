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
export interface AdoptionDTO {
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
}
