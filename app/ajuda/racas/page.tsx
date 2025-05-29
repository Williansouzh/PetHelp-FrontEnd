import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Dog, Cat, Ruler, Heart, MessageSquare } from "lucide-react"
import Link from "next/link"
import PlaceholderImage from "@/components/placeholder-image"

export default function RacasPage() {
  const racasCaes = [
    {
      nome: "Labrador Retriever",
      tamanho: "Grande",
      temperamento: ["Amigável", "Ativo", "Leal"],
      caracteristicas: [
        "Pelagem curta e densa",
        "Cores: amarelo, chocolate, preto",
        "Orelhas caídas",
        "Cauda grossa e forte",
      ],
      cuidados: ["Exercício diário", "Escovação semanal", "Controle de peso"],
      expectativaVida: "10-12 anos",
      peso: "25-36 kg",
    },
    {
      nome: "Golden Retriever",
      tamanho: "Grande",
      temperamento: ["Gentil", "Inteligente", "Amigável"],
      caracteristicas: ["Pelagem longa e dourada", "Dupla camada de pelo", "Orelhas caídas", "Expressão doce"],
      cuidados: ["Escovação diária", "Exercício regular", "Banhos mensais"],
      expectativaVida: "10-12 anos",
      peso: "25-34 kg",
    },
    {
      nome: "Pastor Alemão",
      tamanho: "Grande",
      temperamento: ["Corajoso", "Confiante", "Versátil"],
      caracteristicas: ["Pelagem dupla", "Cores: preto e castanho", "Orelhas eretas", "Corpo atlético"],
      cuidados: ["Exercício intenso", "Escovação regular", "Treinamento"],
      expectativaVida: "9-13 anos",
      peso: "22-40 kg",
    },
    {
      nome: "Bulldog Francês",
      tamanho: "Pequeno",
      temperamento: ["Afetuoso", "Alerta", "Adaptável"],
      caracteristicas: ["Focinho achatado", "Orelhas de 'morcego'", "Corpo compacto", "Pelagem curta"],
      cuidados: ["Exercício moderado", "Cuidado com calor", "Limpeza facial"],
      expectativaVida: "10-12 anos",
      peso: "8-14 kg",
    },
    {
      nome: "Poodle",
      tamanho: "Varia",
      temperamento: ["Inteligente", "Ativo", "Elegante"],
      caracteristicas: ["Pelagem cacheada", "Não solta pelo", "Várias cores", "Três tamanhos"],
      cuidados: ["Tosa regular", "Exercício diário", "Estímulo mental"],
      expectativaVida: "12-15 anos",
      peso: "4-32 kg",
    },
    {
      nome: "Vira-lata",
      tamanho: "Varia",
      temperamento: ["Adaptável", "Resistente", "Único"],
      caracteristicas: ["Características mistas", "Grande diversidade", "Geralmente saudáveis", "Únicos e especiais"],
      cuidados: ["Cuidados básicos", "Amor e carinho", "Consultas veterinárias"],
      expectativaVida: "12-16 anos",
      peso: "Varia",
    },
  ]

  const racasGatos = [
    {
      nome: "Siamês",
      tamanho: "Médio",
      temperamento: ["Vocal", "Social", "Inteligente"],
      caracteristicas: ["Pelagem clara com pontas escuras", "Olhos azuis", "Corpo esguio", "Cauda longa"],
      cuidados: ["Escovação semanal", "Interação social", "Estímulo mental"],
      expectativaVida: "12-15 anos",
      peso: "3-5 kg",
    },
    {
      nome: "Persa",
      tamanho: "Médio",
      temperamento: ["Calmo", "Doce", "Tranquilo"],
      caracteristicas: ["Pelagem longa e densa", "Focinho achatado", "Olhos grandes", "Corpo robusto"],
      cuidados: ["Escovação diária", "Limpeza dos olhos", "Banhos regulares"],
      expectativaVida: "12-17 anos",
      peso: "3-6 kg",
    },
    {
      nome: "Maine Coon",
      tamanho: "Grande",
      temperamento: ["Gentil", "Amigável", "Brincalhão"],
      caracteristicas: ["Pelagem longa", "Tufos nas orelhas", "Cauda peluda", "Porte grande"],
      cuidados: ["Escovação regular", "Exercício", "Espaço adequado"],
      expectativaVida: "12-15 anos",
      peso: "4-8 kg",
    },
    {
      nome: "British Shorthair",
      tamanho: "Médio",
      temperamento: ["Calmo", "Independente", "Afetuoso"],
      caracteristicas: ["Pelagem curta e densa", "Corpo robusto", "Cabeça redonda", "Olhos grandes"],
      cuidados: ["Escovação semanal", "Exercício moderado", "Dieta balanceada"],
      expectativaVida: "12-17 anos",
      peso: "4-8 kg",
    },
    {
      nome: "Ragdoll",
      tamanho: "Grande",
      temperamento: ["Dócil", "Relaxado", "Afetuoso"],
      caracteristicas: ["Pelagem semi-longa", "Olhos azuis", "Corpo grande", "Temperamento calmo"],
      cuidados: ["Escovação regular", "Ambiente interno", "Carinho"],
      expectativaVida: "12-17 anos",
      peso: "4-9 kg",
    },
    {
      nome: "Vira-lata",
      tamanho: "Varia",
      temperamento: ["Adaptável", "Resistente", "Carinhoso"],
      caracteristicas: ["Características mistas", "Grande diversidade", "Geralmente saudáveis", "Únicos e especiais"],
      cuidados: ["Cuidados básicos", "Amor e atenção", "Consultas veterinárias"],
      expectativaVida: "13-17 anos",
      peso: "Varia",
    },
  ]

  const guiaIdentificacao = [
    {
      categoria: "Tamanho",
      dicas: ["Pequeno: até 10kg", "Médio: 10-25kg", "Grande: 25-45kg", "Gigante: acima de 45kg"],
    },
    {
      categoria: "Pelagem",
      dicas: [
        "Curta: lisa e próxima ao corpo",
        "Média: alguns centímetros",
        "Longa: vários centímetros",
        "Cacheada: pelos enrolados",
      ],
    },
    {
      categoria: "Orelhas",
      dicas: ["Eretas: ficam em pé", "Caídas: pendem para baixo", "Semi-eretas: meio termo", "Dobradas: com dobras"],
    },
    {
      categoria: "Cauda",
      dicas: [
        "Longa: proporcional ao corpo",
        "Curta: menor que o normal",
        "Enrolada: curvada sobre o dorso",
        "Cortada: artificialmente encurtada",
      ],
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
        <h1 className="text-3xl font-bold">Identificação de Raças</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Buscar Raça</CardTitle>
              <CardDescription>Digite características do animal para encontrar possíveis raças</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input placeholder="Ex: pelagem dourada, porte grande, orelhas caídas..." className="flex-1" />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="caes" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="caes" className="flex items-center gap-2">
                <Dog className="h-4 w-4" />
                Cães
              </TabsTrigger>
              <TabsTrigger value="gatos" className="flex items-center gap-2">
                <Cat className="h-4 w-4" />
                Gatos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="caes" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {racasCaes.map((raca, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{raca.nome}</CardTitle>
                        <Badge variant="outline">{raca.tamanho}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {raca.temperamento.map((trait, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-center">
                        <PlaceholderImage width={120} height={120} alt={raca.nome} className="rounded-lg" />
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-1">Características</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {raca.caracteristicas.map((char, idx) => (
                            <li key={idx} className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                              {char}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-medium">Peso:</span> {raca.peso}
                        </div>
                        <div>
                          <span className="font-medium">Vida:</span> {raca.expectativaVida}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-1">Cuidados</h4>
                        <div className="flex flex-wrap gap-1">
                          {raca.cuidados.map((cuidado, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {cuidado}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gatos" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {racasGatos.map((raca, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{raca.nome}</CardTitle>
                        <Badge variant="outline">{raca.tamanho}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {raca.temperamento.map((trait, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-center">
                        <PlaceholderImage width={120} height={120} alt={raca.nome} className="rounded-lg" />
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-1">Características</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {raca.caracteristicas.map((char, idx) => (
                            <li key={idx} className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                              {char}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-medium">Peso:</span> {raca.peso}
                        </div>
                        <div>
                          <span className="font-medium">Vida:</span> {raca.expectativaVida}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-1">Cuidados</h4>
                        <div className="flex flex-wrap gap-1">
                          {raca.cuidados.map((cuidado, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {cuidado}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Precisa de Ajuda?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" asChild>
                <Link href="/ajuda/chatbot">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat com IA
                </Link>
              </Button>
              <p className="text-xs text-gray-600 text-center">
                Converse com nosso assistente para identificar a raça do seu pet
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Guia de Identificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {guiaIdentificacao.map((guia, index) => (
                <div key={index}>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-pink-500" />
                    {guia.categoria}
                  </h4>
                  <ul className="space-y-1">
                    {guia.dicas.map((dica, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        {dica}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dica Importante</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Heart className="h-5 w-5 text-pink-500 mt-0.5" />
                <div>
                  <p className="text-sm">
                    Lembre-se: o mais importante não é a raça, mas o amor e cuidado que você pode oferecer ao seu pet!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
