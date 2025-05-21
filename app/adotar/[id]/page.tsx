import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MapPin, Calendar, Info, PawPrint } from "lucide-react"
import Image from "next/image"
import AdotarForm from "./adotar-form"
import PlaceholderImage from "@/components/placeholder-image"

// Simulação de dados de um pet específico
const pet = {
  id: 1,
  name: "Max",
  age: "2 anos",
  breed: "Vira-lata",
  city: "São Paulo, SP",
  image: "/placeholder.svg?height=500&width=500",
  type: "dog",
  description:
    "Max é um cachorro muito dócil e brincalhão. Foi resgatado das ruas e está procurando um lar amoroso. Ele é muito sociável com outros animais e crianças.",
  gender: "Macho",
  size: "Médio",
  vaccinated: true,
  neutered: true,
  requirements: [
    "Ter espaço adequado para o animal",
    "Tela nas janelas para segurança",
    "Comprometer-se com a saúde e bem-estar do animal",
    "Passar por entrevista e visita prévia",
  ],
  organization: {
    name: "Amigos dos Animais",
    phone: "(11) 99999-9999",
    email: "contato@amigosanimais.org",
  },
}

export default function PetDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imagem do pet */}
        <div className="relative rounded-lg overflow-hidden h-[400px] lg:h-[500px]">
          {pet.image ? (
            <Image src={pet.image || "/placeholder.svg"} alt={pet.name} fill className="object-cover" priority />
          ) : (
            <PlaceholderImage width={500} height={500} alt={pet.name} className="w-full h-full" />
          )}
        </div>

        {/* Informações do pet */}
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
                <span className="text-sm font-medium">{pet.age}</span>
                <span className="text-xs text-gray-500">Idade</span>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Info className="h-5 w-5 text-pink-500 mb-1" />
                <span className="text-sm font-medium">{pet.gender}</span>
                <span className="text-xs text-gray-500">Sexo</span>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Heart className="h-5 w-5 text-pink-500 mb-1" />
                <span className="text-sm font-medium">{pet.size}</span>
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
                  <div className={`w-3 h-3 rounded-full mr-2 ${pet.vaccinated ? "bg-green-500" : "bg-red-500"}`}></div>
                  <span>{pet.vaccinated ? "Vacinado" : "Não vacinado"}</span>
                </div>

                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${pet.neutered ? "bg-green-500" : "bg-red-500"}`}></div>
                  <span>{pet.neutered ? "Castrado" : "Não castrado"}</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="mt-4">
              <ul className="list-disc pl-5 space-y-2">
                {pet.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="contact" className="mt-4">
              <div className="space-y-2">
                <p>
                  <strong>Organização:</strong> {pet.organization.name}
                </p>
                <p>
                  <strong>Telefone:</strong> {pet.organization.phone}
                </p>
                <p>
                  <strong>Email:</strong> {pet.organization.email}
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Button size="lg" className="w-full">
            Quero Adotar
          </Button>
        </div>
      </div>

      {/* Formulário de adoção */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Formulário de Pré-adoção</h2>
        <Card>
          <CardContent className="p-6">
            <AdotarForm petId={params.id} petName={pet.name} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
