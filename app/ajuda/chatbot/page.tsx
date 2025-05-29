"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PawPrint, Send, AlertTriangle, Search, Stethoscope } from "lucide-react"
import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ChatbotPage() {
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content:
          "Olá! Sou o assistente virtual do PetHelp. Posso ajudar com primeiros socorros para animais, identificação de raças e possíveis doenças. Como posso ajudar você hoje?",
      },
    ],
  })

  // Scroll para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const suggestedQuestions = [
    {
      category: "primeiros-socorros",
      icon: <AlertTriangle className="h-4 w-4 mr-2" />,
      questions: [
        "O que fazer se meu cachorro ingeriu chocolate?",
        "Como ajudar um gato que está com dificuldade para respirar?",
        "Primeiros socorros para um animal atropelado",
        "Como tratar uma queimadura em um animal?",
        "O que fazer se meu pet está tendo convulsões?",
      ],
    },
    {
      category: "identificacao",
      icon: <Search className="h-4 w-4 mr-2" />,
      questions: [
        "Como identificar a raça do meu cachorro?",
        "Quais são as características de um gato siamês?",
        "Como saber se meu cachorro é de raça pura?",
        "Diferenças entre um labrador e um golden retriever",
        "Características de um gato persa",
      ],
    },
    {
      category: "doencas",
      icon: <Stethoscope className="h-4 w-4 mr-2" />,
      questions: [
        "Sintomas de cinomose em cães",
        "Como identificar se meu gato está com gripe?",
        "Sinais de diabetes em animais",
        "Meu cachorro está com diarreia, o que pode ser?",
        "Sintomas de problemas renais em gatos",
      ],
    },
  ]

  const handleSuggestedQuestion = (question: string) => {
    const fakeEvent = {
      preventDefault: () => {},
      currentTarget: {
        elements: {
          message: {
            value: question,
          },
        },
        reset: () => {},
      },
    } as unknown as React.FormEvent<HTMLFormElement>

    // @ts-ignore
    handleSubmit(fakeEvent)
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Assistente Virtual PetHelp</h1>
          <p className="text-gray-600">
            Tire suas dúvidas sobre primeiros socorros, identificação de raças e doenças em animais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <PawPrint className="h-5 w-5 text-pink-500" />
                  Chat Veterinário
                </CardTitle>
                <CardDescription>
                  Converse com nosso assistente virtual para obter orientações sobre cuidados com animais
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden">
                <div className="h-[500px] overflow-y-auto pr-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-start gap-3 rounded-lg p-4",
                        message.role === "user" ? "bg-muted ml-10" : "bg-pink-50 border border-pink-100 mr-10",
                      )}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt="PetHelp Assistant" />
                          <AvatarFallback className="bg-pink-100 text-pink-800">PH</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex-1">
                        <div className="text-sm font-medium mb-1">
                          {message.role === "user" ? "Você" : "Assistente PetHelp"}
                        </div>
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gray-200 text-gray-800">EU</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start gap-3 rounded-lg p-4 bg-pink-50 border border-pink-100 mr-10">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="PetHelp Assistant" />
                        <AvatarFallback className="bg-pink-100 text-pink-800">PH</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium mb-1">Assistente PetHelp</div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 bg-pink-400 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-pink-400 rounded-full animate-bounce delay-150"></div>
                          <div className="h-2 w-2 bg-pink-400 rounded-full animate-bounce delay-300"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="rounded-lg p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                      Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    placeholder="Digite sua pergunta aqui..."
                    value={input}
                    onChange={handleInputChange}
                    className="flex-grow"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Enviar</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <CardHeader className="pb-4">
                <CardTitle>Perguntas Sugeridas</CardTitle>
                <CardDescription>Selecione uma pergunta para começar</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="primeiros-socorros" onValueChange={handleTabChange}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="primeiros-socorros" className="text-xs">
                      Socorros
                    </TabsTrigger>
                    <TabsTrigger value="identificacao" className="text-xs">
                      Raças
                    </TabsTrigger>
                    <TabsTrigger value="doencas" className="text-xs">
                      Doenças
                    </TabsTrigger>
                  </TabsList>
                  {suggestedQuestions.map((category) => (
                    <TabsContent key={category.category} value={category.category} className="space-y-3 mt-4">
                      {category.questions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start text-left h-auto py-3 px-4 text-sm whitespace-normal"
                          onClick={() => handleSuggestedQuestion(question)}
                          disabled={isLoading}
                        >
                          <div className="flex items-start gap-2 w-full">
                            {category.icon}
                            <span className="flex-1 text-left">{question}</span>
                          </div>
                        </Button>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium mb-1">Aviso importante</p>
              <p>
                Este assistente virtual fornece apenas orientações gerais e não substitui o atendimento veterinário
                profissional. Em casos de emergência, procure imediatamente um médico veterinário.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
