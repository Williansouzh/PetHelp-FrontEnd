import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Phone, Clock, Heart, Thermometer, Droplets, ArrowLeft, MessageSquare } from "lucide-react"
import Link from "next/link"
import PlaceholderImage from "@/components/placeholder-image"

export default function PrimeirosSocorrosPage() {
  const emergencias = [
    {
      titulo: "Envenenamento",
      sintomas: ["Vômito", "Diarreia", "Salivação excessiva", "Convulsões", "Dificuldade respiratória"],
      acoes: [
        "NÃO induza vômito sem orientação veterinária",
        "Remova qualquer resto do produto tóxico da boca",
        "Leve imediatamente ao veterinário",
        "Se possível, leve a embalagem do produto ingerido",
      ],
      urgencia: "crítica",
    },
    {
      titulo: "Atropelamento",
      sintomas: ["Ferimentos visíveis", "Dificuldade para se mover", "Respiração irregular", "Sangramento"],
      acoes: [
        "Mantenha o animal calmo e imóvel",
        "Cubra ferimentos com pano limpo",
        "Transporte com cuidado em superfície rígida",
        "Procure atendimento veterinário imediatamente",
      ],
      urgencia: "crítica",
    },
    {
      titulo: "Convulsões",
      sintomas: ["Movimentos involuntários", "Perda de consciência", "Salivação", "Perda de controle"],
      acoes: [
        "Mantenha-se calmo e afaste objetos perigosos",
        "NÃO coloque a mão na boca do animal",
        "Cronometre a duração da convulsão",
        "Procure veterinário após a convulsão parar",
      ],
      urgencia: "alta",
    },
    {
      titulo: "Queimaduras",
      sintomas: ["Pele vermelha ou escura", "Bolhas", "Dor", "Perda de pelo"],
      acoes: [
        "Resfrie a área com água fria (não gelada)",
        "NÃO aplique gelo diretamente",
        "Cubra com pano limpo e úmido",
        "Procure atendimento veterinário",
      ],
      urgencia: "alta",
    },
    {
      titulo: "Engasgo",
      sintomas: ["Dificuldade para respirar", "Tosse", "Patas na boca", "Agitação"],
      acoes: [
        "Abra a boca e verifique se vê o objeto",
        "Se visível, tente remover com pinça",
        "Para cães pequenos: segure de cabeça para baixo",
        "Para cães grandes: levante as patas traseiras",
        "Procure veterinário imediatamente",
      ],
      urgencia: "crítica",
    },
    {
      titulo: "Sangramento",
      sintomas: ["Sangue visível", "Ferimento aberto", "Palidez", "Fraqueza"],
      acoes: [
        "Aplique pressão direta no ferimento",
        "Use pano limpo ou gaze",
        "Mantenha pressão constante",
        "Se sangramento não parar, procure veterinário",
      ],
      urgencia: "alta",
    },
  ]

  const kitPrimeirosSocorros = [
    "Gaze estéril",
    "Bandagens",
    "Fita adesiva",
    "Antisséptico (iodo ou clorexidina)",
    "Termômetro digital",
    "Seringa (sem agulha) para administrar medicamentos",
    "Luvas descartáveis",
    "Tesoura",
    "Pinça",
    "Manta térmica",
    "Número do veterinário de emergência",
  ]

  const sinaisVitais = {
    temperatura: {
      normal: "38°C a 39°C",
      como: "Inserir termômetro no reto por 1-2 minutos",
    },
    frequenciaCardiaca: {
      caes: "60-140 bpm (varia com o tamanho)",
      gatos: "120-140 bpm",
      como: "Sentir pulso na parte interna da coxa",
    },
    respiracao: {
      normal: "10-30 respirações por minuto",
      como: "Observar movimento do peito",
    },
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/ajuda">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Primeiros Socorros para Animais</h1>
      </div>

      <Alert className="mb-8 border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-800">Aviso Importante</AlertTitle>
        <AlertDescription className="text-red-700">
          Estas orientações são para primeiros socorros apenas. Em qualquer emergência, procure imediatamente um médico
          veterinário. O atendimento profissional é essencial para a saúde do seu pet.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Situações de Emergência
            </CardTitle>
            <CardDescription>Aprenda como agir nas principais emergências veterinárias</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="envenenamento">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-6">
                {emergencias.map((emergencia, index) => (
                  <TabsTrigger
                    key={index}
                    value={emergencia.titulo.toLowerCase().replace(/\s+/g, "")}
                    className="text-xs"
                  >
                    {emergencia.titulo}
                  </TabsTrigger>
                ))}
              </TabsList>

              {emergencias.map((emergencia, index) => (
                <TabsContent
                  key={index}
                  value={emergencia.titulo.toLowerCase().replace(/\s+/g, "")}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Sintomas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {emergencia.sintomas.map((sintoma, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              {sintoma}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">O que fazer</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-2">
                          {emergencia.acoes.map((acao, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                                {idx + 1}
                              </span>
                              {acao}
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  </div>

                  <Alert
                    className={`${
                      emergencia.urgencia === "crítica" ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"
                    }`}
                  >
                    <Clock
                      className={`h-4 w-4 ${emergencia.urgencia === "crítica" ? "text-red-600" : "text-yellow-600"}`}
                    />
                    <AlertTitle className={emergencia.urgencia === "crítica" ? "text-red-800" : "text-yellow-800"}>
                      Urgência: {emergencia.urgencia === "crítica" ? "CRÍTICA" : "ALTA"}
                    </AlertTitle>
                    <AlertDescription
                      className={emergencia.urgencia === "crítica" ? "text-red-700" : "text-yellow-700"}
                    >
                      {emergencia.urgencia === "crítica"
                        ? "Procure atendimento veterinário IMEDIATAMENTE. Cada minuto conta!"
                        : "Procure atendimento veterinário o mais rápido possível."}
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="h-5 w-5 text-green-500" />
                Emergência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Veterinário de Emergência</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar Agora
                </Button>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Precisa de orientação?</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/ajuda/chatbot">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat IA
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sinais Vitais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  <span className="font-medium text-sm">Temperatura</span>
                </div>
                <p className="text-sm text-gray-600">{sinaisVitais.temperatura.normal}</p>
                <p className="text-xs text-gray-500">{sinaisVitais.temperatura.como}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <span className="font-medium text-sm">Frequência Cardíaca</span>
                </div>
                <p className="text-sm text-gray-600">Cães: {sinaisVitais.frequenciaCardiaca.caes}</p>
                <p className="text-sm text-gray-600">Gatos: {sinaisVitais.frequenciaCardiaca.gatos}</p>
                <p className="text-xs text-gray-500">{sinaisVitais.frequenciaCardiaca.como}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-sm">Respiração</span>
                </div>
                <p className="text-sm text-gray-600">{sinaisVitais.respiracao.normal}</p>
                <p className="text-xs text-gray-500">{sinaisVitais.respiracao.como}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Kit de Primeiros Socorros</CardTitle>
            <CardDescription>Itens essenciais para ter sempre em casa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {kitPrimeirosSocorros.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prevenção</CardTitle>
            <CardDescription>Dicas para evitar emergências</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <PlaceholderImage width={60} height={60} alt="Prevenção" className="rounded" />
                <div>
                  <h4 className="font-medium text-sm">Ambiente Seguro</h4>
                  <p className="text-xs text-gray-600">
                    Mantenha produtos tóxicos, medicamentos e objetos pequenos fora do alcance dos pets.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <PlaceholderImage width={60} height={60} alt="Supervisão" className="rounded" />
                <div>
                  <h4 className="font-medium text-sm">Supervisão</h4>
                  <p className="text-xs text-gray-600">
                    Supervisione seu pet durante passeios e brincadeiras para evitar acidentes.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <PlaceholderImage width={60} height={60} alt="Consultas regulares" className="rounded" />
                <div>
                  <h4 className="font-medium text-sm">Consultas Regulares</h4>
                  <p className="text-xs text-gray-600">
                    Mantenha as consultas veterinárias em dia para detectar problemas precocemente.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
