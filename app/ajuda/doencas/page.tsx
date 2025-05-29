import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Stethoscope, AlertTriangle, Heart, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function DoencasPage() {
  const doencasComuns = {
    caes: [
      {
        nome: "Cinomose",
        gravidade: "alta",
        sintomas: ["Febre", "Secreção nasal", "Tosse", "Vômito", "Diarreia", "Convulsões"],
        prevencao: ["Vacinação", "Evitar contato com animais doentes"],
        tratamento: "Suporte veterinário intensivo",
        contagioso: true,
      },
      {
        nome: "Parvovirose",
        gravidade: "alta",
        sintomas: ["Vômito", "Diarreia com sangue", "Desidratação", "Letargia", "Perda de apetite"],
        prevencao: ["Vacinação", "Higiene do ambiente"],
        tratamento: "Hospitalização e fluidoterapia",
        contagioso: true,
      },
      {
        nome: "Displasia Coxofemoral",
        gravidade: "média",
        sintomas: ["Claudicação", "Dificuldade para levantar", "Dor no quadril", "Redução da atividade"],
        prevencao: ["Controle de peso", "Exercício adequado", "Genética"],
        tratamento: "Fisioterapia, medicamentos, cirurgia",
        contagioso: false,
      },
      {
        nome: "Otite",
        gravidade: "baixa",
        sintomas: ["Coceira na orelha", "Secreção", "Odor", "Balançar a cabeça"],
        prevencao: ["Limpeza regular", "Manter orelhas secas"],
        tratamento: "Medicamentos tópicos",
        contagioso: false,
      },
      {
        nome: "Dermatite",
        gravidade: "baixa",
        sintomas: ["Coceira", "Vermelhidão", "Descamação", "Perda de pelo"],
        prevencao: ["Higiene", "Controle de alérgenos"],
        tratamento: "Medicamentos, shampoos especiais",
        contagioso: false,
      },
    ],
    gatos: [
      {
        nome: "Rinotraqueíte Felina",
        gravidade: "média",
        sintomas: ["Espirros", "Secreção nasal", "Conjuntivite", "Febre", "Perda de apetite"],
        prevencao: ["Vacinação", "Redução do estresse"],
        tratamento: "Antivirais, suporte",
        contagioso: true,
      },
      {
        nome: "Doença Renal Crônica",
        gravidade: "alta",
        sintomas: ["Aumento da sede", "Urinar muito", "Perda de peso", "Vômito", "Mau hálito"],
        prevencao: ["Dieta adequada", "Hidratação", "Consultas regulares"],
        tratamento: "Dieta especial, medicamentos",
        contagioso: false,
      },
      {
        nome: "Cistite",
        gravidade: "média",
        sintomas: ["Dificuldade para urinar", "Sangue na urina", "Urinar fora da caixa", "Dor"],
        prevencao: ["Hidratação", "Limpeza da caixa", "Redução do estresse"],
        tratamento: "Antibióticos, analgésicos",
        contagioso: false,
      },
      {
        nome: "Gengivite",
        gravidade: "baixa",
        sintomas: ["Gengivas vermelhas", "Mau hálito", "Dificuldade para comer", "Salivação"],
        prevencao: ["Escovação dental", "Ração seca", "Brinquedos dentais"],
        tratamento: "Limpeza dental, antibióticos",
        contagioso: false,
      },
      {
        nome: "Obesidade",
        gravidade: "média",
        sintomas: ["Peso excessivo", "Dificuldade para se mover", "Respiração ofegante"],
        prevencao: ["Dieta balanceada", "Exercício", "Controle de porções"],
        tratamento: "Dieta restritiva, exercício",
        contagioso: false,
      },
    ],
  }

  const sinaisAlerta = [
    {
      sintoma: "Vômito persistente",
      urgencia: "alta",
      descricao: "Vômito por mais de 24 horas ou com sangue",
    },
    {
      sintoma: "Diarreia com sangue",
      urgencia: "alta",
      descricao: "Fezes líquidas com presença de sangue",
    },
    {
      sintoma: "Dificuldade respiratória",
      urgencia: "crítica",
      descricao: "Respiração ofegante, boca aberta, língua azulada",
    },
    {
      sintoma: "Convulsões",
      urgencia: "crítica",
      descricao: "Movimentos involuntários, perda de consciência",
    },
    {
      sintoma: "Não consegue urinar",
      urgencia: "crítica",
      descricao: "Tentativas de urinar sem sucesso",
    },
    {
      sintoma: "Letargia extrema",
      urgencia: "alta",
      descricao: "Animal muito apático, sem resposta",
    },
    {
      sintoma: "Perda de apetite",
      urgencia: "média",
      descricao: "Não come por mais de 24-48 horas",
    },
    {
      sintoma: "Mudança de comportamento",
      urgencia: "média",
      descricao: "Agressividade, isolamento, inquietação",
    },
  ]

  const prevencaoGeral = [
    {
      categoria: "Vacinação",
      dicas: [
        "Mantenha o calendário vacinal em dia",
        "Vacine filhotes conforme orientação veterinária",
        "Reforce vacinas anualmente",
        "Consulte sobre vacinas opcionais",
      ],
    },
    {
      categoria: "Higiene",
      dicas: [
        "Banhos regulares com produtos adequados",
        "Escovação dental 2-3 vezes por semana",
        "Limpeza de orelhas semanalmente",
        "Corte de unhas mensalmente",
      ],
    },
    {
      categoria: "Alimentação",
      dicas: [
        "Ração de qualidade adequada à idade",
        "Controle de porções",
        "Água fresca sempre disponível",
        "Evite alimentos tóxicos",
      ],
    },
    {
      categoria: "Exercício",
      dicas: [
        "Passeios diários para cães",
        "Brincadeiras interativas",
        "Estímulo mental",
        "Respeite os limites do animal",
      ],
    },
  ]

  const getGravidadeBadge = (gravidade: string) => {
    switch (gravidade) {
      case "crítica":
        return <Badge className="bg-red-600 hover:bg-red-700">Crítica</Badge>
      case "alta":
        return <Badge className="bg-red-500 hover:bg-red-600">Alta</Badge>
      case "média":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Média</Badge>
      case "baixa":
        return <Badge className="bg-green-500 hover:bg-green-600">Baixa</Badge>
      default:
        return <Badge variant="outline">{gravidade}</Badge>
    }
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/ajuda">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Doenças Comuns em Animais</h1>
      </div>

      <Alert className="mb-8 border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-800">Importante</AlertTitle>
        <AlertDescription className="text-yellow-700">
          As informações aqui são apenas educativas. Sempre consulte um veterinário para diagnóstico e tratamento
          adequados.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <Tabs defaultValue="caes" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="caes">Doenças em Cães</TabsTrigger>
              <TabsTrigger value="gatos">Doenças em Gatos</TabsTrigger>
            </TabsList>

            <TabsContent value="caes" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doencasComuns.caes.map((doenca, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{doenca.nome}</CardTitle>
                        {getGravidadeBadge(doenca.gravidade)}
                      </div>
                      {doenca.contagioso && (
                        <Badge variant="outline" className="w-fit bg-orange-50 text-orange-700">
                          Contagioso
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-pink-500" />
                          Sintomas
                        </h4>
                        <ul className="text-sm space-y-1">
                          {doenca.sintomas.map((sintoma, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              {sintoma}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2">Prevenção</h4>
                        <ul className="text-sm space-y-1">
                          {doenca.prevencao.map((prev, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              {prev}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-1">Tratamento</h4>
                        <p className="text-sm text-gray-600">{doenca.tratamento}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gatos" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doencasComuns.gatos.map((doenca, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{doenca.nome}</CardTitle>
                        {getGravidadeBadge(doenca.gravidade)}
                      </div>
                      {doenca.contagioso && (
                        <Badge variant="outline" className="w-fit bg-orange-50 text-orange-700">
                          Contagioso
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-pink-500" />
                          Sintomas
                        </h4>
                        <ul className="text-sm space-y-1">
                          {doenca.sintomas.map((sintoma, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              {sintoma}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2">Prevenção</h4>
                        <ul className="text-sm space-y-1">
                          {doenca.prevencao.map((prev, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              {prev}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-1">Tratamento</h4>
                        <p className="text-sm text-gray-600">{doenca.tratamento}</p>
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
              <p className="text-xs text-gray-600 text-center">Descreva os sintomas do seu pet para nossa IA</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Sinais de Alerta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sinaisAlerta.map((sinal, index) => (
                <div key={index} className="border-l-4 border-red-500 pl-3">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm">{sinal.sintoma}</h4>
                    {getGravidadeBadge(sinal.urgencia)}
                  </div>
                  <p className="text-xs text-gray-600">{sinal.descricao}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            Prevenção é o Melhor Remédio
          </CardTitle>
          <CardDescription>Dicas essenciais para manter seu pet saudável</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {prevencaoGeral.map((categoria, index) => (
              <div key={index}>
                <h3 className="font-medium mb-3 text-pink-600">{categoria.categoria}</h3>
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
