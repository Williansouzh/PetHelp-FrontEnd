import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MapPin, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import PlaceholderImage from "@/components/placeholder-image"

// Simulação de dados de pets para adoção
const pets = [
  {
    id: 1,
    name: "Max",
    age: "2 anos",
    breed: "Vira-lata",
    city: "São Paulo, SP",
    image: "/placeholder.svg?height=300&width=300",
    type: "dog",
  },
  {
    id: 2,
    name: "Luna",
    age: "1 ano",
    breed: "Siamês",
    city: "Rio de Janeiro, RJ",
    image: "/placeholder.svg?height=300&width=300",
    type: "cat",
  },
  {
    id: 3,
    name: "Thor",
    age: "3 anos",
    breed: "Golden Retriever",
    city: "Belo Horizonte, MG",
    image: "/placeholder.svg?height=300&width=300",
    type: "dog",
  },
  {
    id: 4,
    name: "Nina",
    age: "6 meses",
    breed: "Persa",
    city: "Curitiba, PR",
    image: "/placeholder.svg?height=300&width=300",
    type: "cat",
  },
  {
    id: 5,
    name: "Bob",
    age: "4 anos",
    breed: "Bulldog",
    city: "Brasília, DF",
    image: "/placeholder.svg?height=300&width=300",
    type: "dog",
  },
  {
    id: 6,
    name: "Mia",
    age: "2 anos",
    breed: "Maine Coon",
    city: "Salvador, BA",
    image: "/placeholder.svg?height=300&width=300",
    type: "cat",
  },
]

export default function AdotarPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-3xl font-bold text-center mb-4">Adote um Pet</h1>
        <p className="text-gray-600 text-center max-w-2xl mb-8">
          Encontre seu novo melhor amigo! Todos os animais estão disponíveis para adoção responsável.
        </p>

        {/* Filtros de busca */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Buscar por nome</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input id="search" placeholder="Nome do pet" className="pl-8" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select>
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
              <Select>
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
              <Button className="w-full">Filtrar</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de pets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <Link href={`/adotar/${pet.id}`} key={pet.id}>
            <Card className="overflow-hidden h-full transition-transform hover:scale-[1.02]">
              <div className="relative h-48">
                {pet.image ? (
                  <Image src={pet.image || "/placeholder.svg"} alt={pet.name} fill className="object-cover" />
                ) : (
                  <PlaceholderImage width={300} height={200} alt={pet.name} className="w-full h-full" />
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
                  <Button variant="ghost" size="icon" className="text-pink-500">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {pet.city}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
