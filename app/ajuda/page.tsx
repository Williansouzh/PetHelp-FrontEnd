import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertTriangle, Search, Stethoscope, MessageSquare, BookOpen, MapPin, PawPrint } from "lucide-react"
import PlaceholderImage from "@/components/placeholder-image"

export default function AjudaPage() {
  const resources = [
    {
      title: "Primeiros Socorros",
      description: "Guias e orientações para situações de emergência com animais",
      icon: <AlertTriangle className="h-6 w-6 text-pink-500" />,
      link: "/ajuda/primeiros-socorros",
      color: "bg-red-50",
    },
    {
      title: "Identificação de Raças",
      description: "Aprenda a identificar diferentes raças de cães e gatos",
      icon: <Search className="h-6 w-6 text-pink-500" />,
      link: "/ajuda/racas",
      color: "bg-blue-50",
    },
    {
      title: "Doenças Comuns",
      description: "Informações sobre doenças comuns em animais domésticos",
      icon: <Stethoscope className="h-6 w-6 text-pink-500" />,
      link: "/ajuda/doencas",
      color: "bg-green-50",
    },
    {
      title: "Assistente Virtual",
      description: "Converse com nosso assistente de IA para tirar dúvidas",
      icon: <MessageSquare className="h-6 w-6 text-pink-500" />,
      link: "/ajuda/chatbot",
      color: "bg-purple-50",
      highlight: true,
    },
    {
      title: "Guias de Cuidados",
      description: "Dicas para cuidar melhor do seu pet no dia a dia",
      icon: <BookOpen className="h-6 w-6 text-pink-500" />,
      link: "/ajuda/guias",
      color: "bg-yellow-50",
    },
    {
      title: "Clínicas Próximas",
      description: "Encontre clínicas veterinárias perto de você",
      icon: <MapPin className="h-6 w-6 text-pink-500" />,
      link: "/ajuda/clinicas",
      color: "bg-indigo-50",
    },
  ]

  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="bg-pink-100 p-3 rounded-full">
            <PawPrint className="h-8 w-8 text-pink-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Central de Ajuda</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Encontre recursos, guias e assistência para cuidar melhor dos animais. Nossa missão é ajudar você a
          proporcionar o melhor cuidado possível para os pets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {resources.map((resource, index) => (
          <Link href={resource.link} key={index} className="h-full">
            <Card
              className={`h-full transition-all hover:shadow-md ${resource.color} ${resource.highlight ? "ring-2 ring-pink-500 ring-offset-2" : ""}`}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  {resource.icon}
                  <CardTitle>{resource.title}</CardTitle>
                </div>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant={resource.highlight ? "default" : "outline"} className="w-full">
                  {resource.highlight ? "Conversar Agora" : "Acessar"}
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Emergências Veterinárias</CardTitle>
            <CardDescription>O que fazer em situações de emergência com seu pet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <PlaceholderImage width={100} height={100} alt="Emergência veterinária" className="rounded-lg" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Mantenha a calma</h3>
                <p className="text-sm text-gray-600">
                  Em situações de emergência, manter a calma é essencial para ajudar seu pet de forma eficaz. Respire
                  fundo e avalie a situação.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <PlaceholderImage width={100} height={100} alt="Contato veterinário" className="rounded-lg" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Contate um veterinário</h3>
                <p className="text-sm text-gray-600">
                  Tenha sempre à mão o contato do seu veterinário e de clínicas de emergência próximas à sua residência.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <PlaceholderImage width={100} height={100} alt="Kit de primeiros socorros" className="rounded-lg" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Kit de primeiros socorros</h3>
                <p className="text-sm text-gray-600">
                  Mantenha um kit de primeiros socorros para pets em casa, com itens básicos como bandagens, gaze e
                  antisséptico.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/ajuda/primeiros-socorros">Ver Guia Completo</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Perguntas Frequentes</CardTitle>
            <CardDescription>Respostas para as dúvidas mais comuns sobre cuidados com pets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b pb-3">
              <h3 className="font-medium mb-1">Quando devo levar meu pet ao veterinário?</h3>
              <p className="text-sm text-gray-600">
                Além das consultas de rotina, leve seu pet ao veterinário se notar mudanças no comportamento, apetite,
                sede, ou se apresentar sintomas como vômito, diarreia, tosse ou dificuldade para respirar.
              </p>
            </div>

            <div className="border-b pb-3">
              <h3 className="font-medium mb-1">Como saber se meu animal está com dor?</h3>
              <p className="text-sm text-gray-600">
                Animais com dor podem apresentar mudanças de comportamento, agressividade, isolamento, alterações na
                postura, gemidos, lambedura excessiva de uma área específica e resistência ao toque.
              </p>
            </div>

            <div className="border-b pb-3">
              <h3 className="font-medium mb-1">O que fazer se meu pet ingeriu algo tóxico?</h3>
              <p className="text-sm text-gray-600">
                Entre em contato imediatamente com um veterinário. Não induza vômito sem orientação profissional, pois
                isso pode piorar a situação em alguns casos.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/ajuda/faq">Ver Todas as Perguntas</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Precisa de ajuda personalizada?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Nosso assistente virtual está disponível 24/7 para responder suas dúvidas sobre cuidados com animais,
          primeiros socorros e identificação de possíveis problemas.
        </p>
        <Button size="lg" asChild>
          <Link href="/ajuda/chatbot">
            <MessageSquare className="mr-2 h-5 w-5" />
            Conversar com o Assistente
          </Link>
        </Button>
      </div>
    </div>
  )
}
