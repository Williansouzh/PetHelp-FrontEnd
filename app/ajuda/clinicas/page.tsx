"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, Clock, Star, Search, Navigation, MessageSquare, AlertTriangle } from "lucide-react"
import Link from "next/link"
import PlaceholderImage from "@/components/placeholder-image"

export default function ClinicasPage() {
  const [searchLocation, setSearchLocation] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  // Dados simulados de clínicas veterinárias
  const clinicasExemplo = [
    {
      id: 1,
      nome: "Clínica Veterinária PetCare",
      endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
      telefone: "(11) 3456-7890",
      whatsapp: "(11) 99876-5432",
      horario: "Seg-Sex: 8h-18h | Sáb: 8h-12h",
      emergencia: true,
      avaliacao: 4.8,
      especialidades: ["Clínica Geral", "Cirurgia", "Dermatologia"],
      distancia: "1.2 km",
      preco: "$$",
    },
    {
      id: 2,
      nome: "Hospital Veterinário Animal Life",
      endereco: "Av. Paulista, 456 - Bela Vista, São Paulo - SP",
      telefone: "(11) 2345-6789",
      whatsapp: "(11) 98765-4321",
      horario: "24 horas",
      emergencia: true,
      avaliacao: 4.9,
      especialidades: ["Emergência", "UTI", "Cardiologia", "Oncologia"],
      distancia: "2.5 km",
      preco: "$$$",
    },
    {
      id: 3,
      nome: "Clínica Veterinária Bichos & Cia",
      endereco: "Rua dos Animais, 789 - Vila Madalena, São Paulo - SP",
      telefone: "(11) 4567-8901",
      whatsapp: "(11) 97654-3210",
      horario: "Seg-Sex: 7h-19h | Sáb: 7h-15h",
      emergencia: false,
      avaliacao: 4.6,
      especialidades: ["Clínica Geral", "Vacinação", "Banho e Tosa"],
      distancia: "3.1 km",
      preco: "$",
    },
    {
      id: 4,
      nome: "Centro Veterinário Especializado",
      endereco: "Rua Veterinária, 321 - Jardins, São Paulo - SP",
      telefone: "(11) 5678-9012",
      whatsapp: "(11) 96543-2109",
      horario: "Seg-Sex: 8h-17h",
      emergencia: false,
      avaliacao: 4.7,
      especialidades: ["Ortopedia", "Oftalmologia", "Neurologia"],
      distancia: "4.2 km",
      preco: "$$$",
    },
    {
      id: 5,
      nome: "Pet Shop e Clínica Amigo Fiel",
      endereco: "Av. dos Pets, 654 - Moema, São Paulo - SP",
      telefone: "(11) 6789-0123",
      whatsapp: "(11) 95432-1098",
      horario: "Seg-Sáb: 8h-20h | Dom: 9h-17h",
      emergencia: false,
      avaliacao: 4.4,
      especialidades: ["Clínica Geral", "Pet Shop", "Estética"],
      distancia: "5.8 km",
      preco: "$$",
    },
  ]

  const handleSearch = () => {
    // Simulação de busca - em um app real, isso faria uma chamada à API
    setSearchResults(clinicasExemplo)
  }

  const getPrecoIcon = (preco: string) => {
    return preco
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const emergencyContacts = [
    {
      nome: "Pronto Socorro Veterinário 24h",
      telefone: "(11) 3030-4040",
      endereco: "Av. Emergência, 100 - Centro",
    },
    {
      nome: "Hospital Veterinário de Emergência",
      telefone: "(11) 2020-3030",
      endereco: "Rua Socorro, 200 - Vila Nova",
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/ajuda">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Clínicas Veterinárias Próximas</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-pink-500" />
                Buscar Clínicas
              </CardTitle>
              <CardDescription>Digite sua localização para encontrar clínicas veterinárias próximas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite seu CEP, endereço ou bairro..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </CardContent>
          </Card>

          {searchResults.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{searchResults.length} clínicas encontradas</h2>
                <div className="flex gap-2">
                  <Badge variant="outline">Ordenar por distância</Badge>
                </div>
              </div>

              {searchResults.map((clinica) => (
                <Card key={clinica.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-1">
                        <PlaceholderImage width={150} height={120} alt={clinica.nome} className="rounded-lg w-full" />
                      </div>

                      <div className="md:col-span-2 space-y-3">
                        <div>
                          <div className="flex items-start justify-between">
                            <h3 className="text-lg font-semibold">{clinica.nome}</h3>
                            <div className="flex items-center gap-1">
                              {renderStars(clinica.avaliacao)}
                              <span className="text-sm text-gray-600 ml-1">{clinica.avaliacao}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {clinica.distancia}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {getPrecoIcon(clinica.preco)}
                            </Badge>
                            {clinica.emergencia && <Badge className="bg-red-600 hover:bg-red-700 text-xs">24h</Badge>}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                            <span className="text-sm text-gray-600">{clinica.endereco}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{clinica.telefone}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{clinica.horario}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-1">Especialidades:</h4>
                          <div className="flex flex-wrap gap-1">
                            {clinica.especialidades.map((esp, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {esp}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-1 flex flex-col gap-2">
                        <Button className="w-full" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Ligar
                        </Button>

                        <Button variant="outline" className="w-full" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>

                        <Button variant="outline" className="w-full" size="sm">
                          <Navigation className="h-4 w-4 mr-2" />
                          Rota
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {searchResults.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Encontre clínicas próximas</h3>
                <p className="text-gray-600 mb-4">
                  Digite sua localização no campo acima para encontrar clínicas veterinárias na sua região.
                </p>
                <Button onClick={handleSearch}>Buscar Clínicas</Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                Emergência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-red-700 mb-3">Em caso de emergência, ligue imediatamente:</p>

              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-red-200">
                  <h4 className="font-medium text-sm text-red-800">{contact.nome}</h4>
                  <p className="text-sm text-red-600">{contact.telefone}</p>
                  <p className="text-xs text-red-500">{contact.endereco}</p>
                </div>
              ))}

              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Phone className="h-4 w-4 mr-2" />
                Ligar Emergência
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Precisa de Orientação?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" asChild>
                <Link href="/ajuda/chatbot">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat com IA
                </Link>
              </Button>
              <p className="text-xs text-gray-600 text-center">Tire dúvidas sobre quando procurar um veterinário</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dicas para a Consulta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Leve sempre:</h4>
                <ul className="text-xs space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                    Carteira de vacinação
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                    Histórico médico
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                    Lista de medicamentos
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                    Amostra de fezes/urina (se solicitado)
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Prepare-se para informar:</h4>
                <ul className="text-xs space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                    Sintomas observados
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                    Quando começaram
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                    Mudanças no comportamento
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                    Alimentação e apetite
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
