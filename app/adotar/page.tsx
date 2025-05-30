"use client";

import { useEffect, useState } from "react";
import { getAnimals } from "@/services/animalService";
import { Animal } from "@/interfaces/animalInterface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, MapPin, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PlaceholderImage from "@/components/placeholder-image";

export default function AdotarPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const fetchAnimals = async () => {
    try {
      setLoading(true);
      const filters: any = {};
      if (nameFilter) filters.name = nameFilter;
      if (typeFilter && typeFilter !== "all") filters.type = typeFilter;
      if (locationFilter && locationFilter !== "all")
        filters.location = locationFilter;

      const response = await getAnimals(1, 12, filters);
      setAnimals(response.data);
    } catch (error) {
      console.error("Erro ao buscar animais:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-3xl font-bold text-center mb-4">Adote um Pet</h1>
        <p className="text-gray-600 text-center max-w-2xl mb-8">
          Encontre seu novo melhor amigo! Todos os animais estão disponíveis
          para adoção responsável.
        </p>

        {/* Filtros de busca */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Buscar por nome</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Nome do pet"
                  className="pl-8"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                onValueChange={(value) => setTypeFilter(value)}
                defaultValue="all"
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="dog">Cachorros</SelectItem>
                  <SelectItem value="cat">Gatos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Select
                onValueChange={(value) => setLocationFilter(value)}
                defaultValue="all"
              >
                <SelectTrigger id="location">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="sp">São Paulo</SelectItem>
                  <SelectItem value="rj">Rio de Janeiro</SelectItem>
                  <SelectItem value="mg">Minas Gerais</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full" onClick={fetchAnimals}>
                Filtrar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de pets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center col-span-3">Carregando animais...</p>
        ) : animals.length === 0 ? (
          <p className="text-center col-span-3">Nenhum pet encontrado.</p>
        ) : (
          animals.map((pet) => (
            <Link href={`/adotar/${pet.id}`} key={pet.id}>
              <Card className="overflow-hidden h-full transition-transform hover:scale-[1.02]">
                <div className="relative h-48">
                  {pet.imageUrl ? (
                    <Image
                      src={pet.imageUrl}
                      alt={pet.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <PlaceholderImage
                      width={300}
                      height={200}
                      alt={pet.name}
                      className="w-full h-full"
                    />
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{pet.name}</h3>
                      <p className="text-sm text-gray-500">
                        {pet.breed} • {pet.age}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-pink-500"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {pet.city}, {pet.state}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
