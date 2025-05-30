"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MapPin, Calendar, Info, PawPrint } from "lucide-react";
import Image from "next/image";
import AdotarForm from "./adotar-form";
import PlaceholderImage from "@/components/placeholder-image";
import { useState, useEffect, use } from "react";
import { getAnimalById } from "@/services/animalService";
import { Animal, Gender, Size } from "@/interfaces/animalInterface";
import { getUserById } from "@/services/userService";
import { User } from "@/interfaces/userInterface";
import { calcularIdade } from "@/utils/dateUtils";

export default function PetDetailsPage({ params }: { params: { id: string } }) {
  const [pet, setPet] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState<User | null>(null);
  const fetchPetDetails = async () => {
    try {
      setLoading(true);
      const response = await getAnimalById(params.id);
      setPet(response);
      if (response.createdByUserId) {
        const user = await getUserById(response.createdByUserId);
        setCreator(user);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do pet:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPetDetails();
  }, [params.id]);

  if (loading) return <p>Carregando...</p>;
  if (!pet) return <p>Pet não encontrado.</p>;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative rounded-lg overflow-hidden h-[400px] lg:h-[500px]">
          {pet.imageUrl ? (
            <Image
              src={pet.imageUrl}
              alt={pet.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <PlaceholderImage
              width={500}
              height={500}
              alt={pet.name}
              className="w-full h-full"
            />
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{pet.name}</h1>
            <div className="flex items-center mt-2 text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              {pet.city}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <PawPrint className="h-5 w-5 text-pink-500 mb-1" />
                <span className="text-sm font-medium">{pet.breed}</span>
                <span className="text-xs text-gray-500">Raça</span>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Calendar className="h-5 w-5 text-pink-500 mb-1" />
                <span className="text-sm font-medium">
                  {calcularIdade(pet.birthDate)}
                </span>
                <span className="text-xs text-gray-500">Idade</span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Info className="h-5 w-5 text-pink-500 mb-1" />
                <span className="text-sm font-medium">
                  {Gender[pet.gender]}
                </span>
                <span className="text-xs text-gray-500">Sexo</span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Heart className="h-5 w-5 text-pink-500 mb-1" />
                <span className="text-sm font-medium">{Size[pet.size]}</span>
                <span className="text-xs text-gray-500">Porte</span>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">Sobre</TabsTrigger>
              <TabsTrigger value="requirements">Requisitos</TabsTrigger>
              <TabsTrigger value="contact">Contato</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4 mt-4">
              <p>{pet.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      pet.isVaccinated ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span>{pet.isVaccinated ? "Vacinado" : "Não vacinado"}</span>
                </div>

                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      pet.isNeutered ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span>{pet.isNeutered ? "Castrado" : "Não castrado"}</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="mt-4">
              <p>{pet.adoptionRequirements || "Nenhum requisito informado."}</p>
            </TabsContent>

            <TabsContent value="contact" className="mt-4">
              {creator ? (
                <div className="space-y-2">
                  <p>
                    <strong>Responsável:</strong> {creator.name}
                  </p>
                  <p>
                    <strong>Telefone:</strong>{" "}
                    {creator.phone || "Não informado"}
                  </p>
                  <p>
                    <strong>Email:</strong> {creator.email}
                  </p>
                </div>
              ) : (
                <p>Informações de contato indisponíveis.</p>
              )}
            </TabsContent>
          </Tabs>

          <Button size="lg" className="w-full">
            Quero Adotar
          </Button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Formulário de Pré-adoção</h2>
        <Card>
          <CardContent className="p-6">
            <AdotarForm petId={params.id} petName={pet.name} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
