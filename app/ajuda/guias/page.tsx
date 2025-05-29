import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Heart, Utensils, Bath, Gamepad2, Home, MessageSquare, Calendar } from "lucide-react"
import Link from "next/link"
import PlaceholderImage from "@/components/placeholder-image"

export default function GuiasPage() {
  const guiasCuidados = [
    {
      categoria: "Alimentação",
      icon: <Utensils className="h-5 w-5 text-green-500" />,
      guias: [
        {
          titulo: "Alimentação para Filhotes",
          idade: "0-12 meses",
          dicas: [
            "Ração específica para filhotes",
            "3-4 refeições por dia",
            "Transição gradual de alimentos",
            "Água sempre disponível",
          ],
          importante: "Nunca dê leite de vaca para filhotes",
        },
        {
          titulo: "Alimentação para Adultos",
          idade: "1-7 anos",
          dicas: ["Ração de qualidade premium", "2 refeições por dia", "Controle de porções", "Petiscos com moderação"],
          importante: "Evite alimentos tóxicos como chocolate e cebola",
        },
        {
          titulo: "Alimentação para Idosos",
          idade: "7+ anos",
          dicas: [
            "Ração para animais seniores",
            "Alimentos mais digestíveis",
            "Suplementos se necessário",
            "Monitoramento do peso",
          ],
          importante: "Consulte o veterinário sobre necessidades especiais",
        },
      ],
    },
    {
      categoria: "Higiene",
      icon: <Bath className="h-5 w-5 text-blue-500" />,
      guias: [
        {
          titulo: "Banho e Escovação",
          frequencia: "Conforme necessário",
          dicas: [
            "Banho mensal ou quando necessário",
            "Escovação diária para pelos longos",
            "Use produtos específicos para pets",
            "Seque bem após o banho",
          ],
          importante: "Nunca use produtos humanos em animais",
        },
        {
          titulo: "Cuidados Dentais",
          frequencia: "2-3x por semana",
          dicas: [
            "Escovação dental regular",
            "Pasta de dente específica",
            "Brinquedos dentais",
            "Ração seca ajuda na limpeza",
          ],
          importante: "Mau hálito pode indicar problemas de saúde",
        },
        {
          titulo: "Cuidados com Unhas",
          frequencia: "Mensal",
          dicas: [
            "Corte regular das unhas",
            "Use cortador específico",
            "Corte apenas a ponta branca",
            "Recompense após o procedimento",
          ],
          importante: "Cuidado para não cortar a parte rosada (veia)",
        },
      ],
    },
    {
      categoria: "Exercício",
      icon: <Gamepad2 className="h-5 w-5 text-orange-500" />,
      guias: [
        {
          titulo: "Exercícios para Cães",
          duracao: "30min-2h diárias",
          dicas: ["Passeios diários", "Brincadeiras no quintal", "Jogos de buscar", "Natação (se possível)"],
          importante: "Adapte a intensidade à idade e raça",
        },
        {
          titulo: "Atividades para Gatos",
          duracao: "15-30min diárias",
          dicas: ["Brinquedos interativos", "Arranhadores", "Laser pointer", "Caça simulada"],
          importante: "Gatos precisam de estímulo mental",
        },
        {
          titulo: "Exercícios para Idosos",
          duracao: "Adaptado",
          dicas: [
            "Caminhadas mais curtas",
            "Exercícios de baixo impacto",
            "Fisioterapia se necessário",
            "Respeite os limites",
          ],
          importante: "Consulte o veterinário sobre limitações",
        },
      ],
    },
    {
      categoria: "Ambiente",
      icon: <Home className="h-5 w-5 text-purple-500" />,
      guias: [
        {
          titulo: "Preparando a Casa",
          fase: "Antes da chegada",
          dicas: [
            "Remova objetos perigosos",
            "Prepare cama e comedouros",
            "Instale telas de proteção",
            "Defina área para necessidades",
          ],
          importante: "Segurança em primeiro lugar",
        },
        {
          titulo: "Enriquecimento Ambiental",
          fase: "Dia a dia",
          dicas: ["Brinquedos variados", "Arranhadores para gatos", "Esconderijos e tocas", "Plantas seguras"],
          importante: "Ambiente estimulante previne problemas comportamentais",
        },
        {
          titulo: "Temperatura e Conforto",
          fase: "Sempre",
          dicas: ["Temperatura adequada", "Abrigo do sol e chuva", "Cama confortável", "Ventilação adequada"],
          importante: "Conforto térmico é essencial para a saúde",
        },
      ],
    },
  ]

  const calendarioCuidados = [
    {
      periodo: "Diário",
      atividades: ["Alimentação (2-3x)", "Água fresca", "Exercício/brincadeiras", "Carinho e atenção"],
    },
    {
      periodo: "Semanal",
      atividades: ["Escovação (pelos longos)", "Limpeza de orelhas", "Escovação dental", "Limpeza da caixa de areia"],
    },
    {
      periodo: "Mensal",
      atividades: ["Banho (se necessário)", "Corte de unhas", "Vermifugação", "Pesagem"],
    },
    {
      periodo: "Anual",
      atividades: ["Consulta veterinária", "Vacinação", "Exames de sangue", "Check-up geral"],
    },
  ]

  const dicasEspeciais = [
    {
      titulo: "Adaptação de Novos Pets",
      dicas: [
        "Dê tempo para adaptação (1-2 semanas)",
        "Mantenha rotina consistente",
        "Apresente gradualmente outros pets",
        "Seja paciente com acidentes",
      ],
    },
    {
      titulo: "Viagens com Pets",
      dicas: [
        "Caixa de transporte adequada",
        "Documentação em dia",
        "Medicamentos se necessário",
        "Paradas frequentes em viagens longas",
      ],
    },
    {
      titulo: "Pets Idosos",
      dicas: [
        "Consultas veterinárias mais frequentes",
        "Dieta adequada à idade",
        "Exercícios adaptados",
        "Conforto extra (camas ortopédicas)",
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
        <h1 className="text-3xl font-bold">Guias de Cuidados</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <Tabs defaultValue="alimentacao" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="alimentacao" className="flex items-center gap-1">
                <Utensils className="h-4 w-4" />
                <span className="hidden sm:inline">Alimentação</span>
              </TabsTrigger>
              <TabsTrigger value="higiene" className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span className="hidden sm:inline">Higiene</span>
              </TabsTrigger>
              <TabsTrigger value="exercicio" className="flex items-center gap-1">
                <Gamepad2 className="h-4 w-4" />
                <span className="hidden sm:inline">Exercício</span>
              </TabsTrigger>
              <TabsTrigger value="ambiente" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Ambiente</span>
              </TabsTrigger>
            </TabsList>

            {guiasCuidados.map((categoria, catIndex) => (
              <TabsContent
                key={catIndex}
                value={categoria.categoria
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")}
                className="space-y-4"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {categoria.icon}
                      Guias de {categoria.categoria}
                    </CardTitle>
                    <CardDescription>Orientações completas para cuidar bem do seu pet</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoria.guias.map((guia, index) => (
                        <Card key={index} className="h-full">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg">{guia.titulo}</CardTitle>
                            {guia.idade && (
                              <Badge variant="outline" className="w-fit">
                                {guia.idade}
                              </Badge>
                            )}
                            {guia.frequencia && (
                              <Badge variant="outline" className="w-fit">
                                {guia.frequencia}
                              </Badge>
                            )}
                            {guia.duracao && (
                              <Badge variant="outline" className="w-fit">
                                {guia.duracao}
                              </Badge>
                            )}
                            {guia.fase && (
                              <Badge variant="outline" className="w-fit">
                                {guia.fase}
                              </Badge>
                            )}
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-center">
                              <PlaceholderImage width={100} height={100} alt={guia.titulo} className="rounded-lg" />
                            </div>

                            <div>
                              <h4 className="font-medium text-sm mb-2">Dicas Importantes</h4>
                              <ul className="space-y-1">
                                {guia.dicas.map((dica, idx) => (
                                  <li key={idx} className="text-sm flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2"></div>
                                    {dica}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <p className="text-sm font-medium text-yellow-800 mb-1">💡 Lembre-se:</p>
                              <p className="text-sm text-yellow-700">{guia.importante}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
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
              <p className="text-xs text-gray-600 text-center">Tire dúvidas específicas sobre cuidados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-pink-500" />
                Calendário de Cuidados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {calendarioCuidados.map((periodo, index) => (
                <div key={index}>
                  <h4 className="font-medium text-sm mb-2 text-pink-600">{periodo.periodo}</h4>
                  <ul className="space-y-1">
                    {periodo.atividades.map((atividade, idx) => (
                      <li key={idx} className="text-xs flex items-center gap-2">
                        <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                        {atividade}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dica do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Heart className="h-5 w-5 text-pink-500 mt-0.5" />
                <div>
                  <p className="text-sm">
                    A rotina é fundamental para o bem-estar dos pets. Mantenha horários regulares para alimentação,
                    passeios e descanso.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-pink-500" />
            Dicas Especiais
          </CardTitle>
          <CardDescription>Orientações para situações específicas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dicasEspeciais.map((categoria, index) => (
              <div key={index}>
                <h3 className="font-medium mb-3 text-pink-600">{categoria.titulo}</h3>
                <ul className="space-y-2">
                  {categoria.dicas.map((dica, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2"></div>
                      {dica}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
