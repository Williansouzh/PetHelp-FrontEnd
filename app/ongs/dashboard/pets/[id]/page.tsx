"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MapPin, Calendar, Info, PawPrint, ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import PlaceholderImage from "@/components/placeholder-image"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

// Simulação de dados de um pet específico
const mockPet = {
  id: 1,
  name: "Max",
  age: "2 anos",
  breed: "Vira-lata",
  city: "São Paulo, SP",
  type: "dog",
  description:
    "Max é um cachorro muito dócil e brincalhão. Foi resgatado das ruas e está procurando um lar amoroso. Ele é muito sociável com outros animais e crianças.",
  gender: "Macho",
  size: "Médio",
  vaccinated: true,
  neutered: true,
  status: "disponível",
  createdAt: "2023-05-15",
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
  images: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
}

// Simulação de solicitações de adoção para este pet
const mockRequests = [
  {
    id: 1,
    petId: 1,
    requesterName: "João Silva",
    requesterEmail: "joao@example.com",
    requesterPhone: "(11) 98765-4321",
    status: "pendente",
    createdAt: "2023-08-10",
  },
  {
    id: 2,
    petId: 1,
    requesterName: "Maria Oliveira",
    requesterEmail: "maria@example.com",
    requesterPhone: "(11) 91234-5678",
    status: "em análise",
    createdAt: "2023-08-15",
  },
]

export default function PetDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [pet, setPet] = useState<typeof mockPet | null>(null)
  const [requests, setRequests] = useState<typeof mockRequests>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Simulação de carregamento de dados do pet
  useEffect(() => {
    // Em um caso real, aqui faria uma chamada à API para buscar os dados do pet
    setTimeout(() => {
      setPet(mockPet)
      setRequests(mockRequests)
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulação de exclusão
    setTimeout(() => {
      setIsDeleting(false)
      toast({
        title: "Pet excluído com sucesso",
        description: "O animal foi removido da sua lista de pets.",
      })
      router.push("/ongs/dashboard")
    }, 1500)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "disponível":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            Disponível
          </Badge>
        )
      case "adotado":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            Adotado
          </Badge>
        )
      case "em processo":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
            Em processo
          </Badge>
        )
      case "pendente":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
            Pendente
          </Badge>
        )
      case "em análise":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            Em análise
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/ongs/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Detalhes do Pet</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando informações do pet...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!pet) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/ongs/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Detalhes do Pet</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-gray-500">Pet não encontrado.</p>
            <Button asChild className="mt-4">
              <Link href="/ongs/dashboard">Voltar para o Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/ongs/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Detalhes do Pet</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/ongs/dashboard/pets/${params.id}/editar`}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso excluirá permanentemente o pet {pet.name} e removerá seus dados
                  do sistema.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Excluindo..." : "Sim, excluir pet"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galeria de imagens */}
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden h-[400px]">
            {pet.images && pet.images.length > 0 ? (
              <PlaceholderImage width={500} height={500} alt={pet.name} className="w-full h-full" />
            ) : (
              <PlaceholderImage width={500} height={500} alt={pet.name} className="w-full h-full" />
            )}
            <div className="absolute top-4 right-4">{getStatusBadge(pet.status)}</div>
          </div>

          {pet.images && pet.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {pet.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative rounded-md overflow-hidden h-20 cursor-pointer border-2 ${selectedImage === index ? "border-pink-500" : "border-transparent"}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <PlaceholderImage
                    width={100}
                    height={100}
                    alt={`${pet.name} - foto ${index + 1}`}
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informações do pet */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{pet.name}</h1>
              <p className="text-sm text-gray-500">
                Cadastrado em {new Date(pet.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
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
              <TabsTrigger value="requests">Solicitações ({requests.length})</TabsTrigger>
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

            <TabsContent value="requests" className="mt-4">
              {requests.length > 0 ? (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{request.requesterName}</h3>
                            <p className="text-sm text-gray-500">{request.requesterEmail}</p>
                            <p className="text-sm text-gray-500">{request.requesterPhone}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              Solicitado em {new Date(request.createdAt).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {getStatusBadge(request.status)}
                            <Link
                              href={`/ongs/dashboard/solicitacoes/${request.id}`}
                              className="text-sm text-pink-600 hover:underline"
                            >
                              Ver detalhes
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Ainda não há solicitações de adoção para este pet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
