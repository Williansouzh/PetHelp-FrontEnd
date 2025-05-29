"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, MessageSquare, AlertTriangle, Stethoscope, ExternalLink, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function HelpFloatingButton() {
  const [open, setOpen] = useState(false)

  const quickHelpOptions = [
    {
      title: "Emergências",
      description: "Primeiros socorros para situações urgentes",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      link: "/ajuda/primeiros-socorros",
      color: "bg-red-50 border-red-200 hover:bg-red-100",
    },
    {
      title: "Doenças",
      description: "Identificar possíveis problemas de saúde",
      icon: <Stethoscope className="h-5 w-5 text-blue-500" />,
      link: "/ajuda/doencas",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    },
    {
      title: "Chat IA",
      description: "Converse com nosso assistente virtual",
      icon: <MessageSquare className="h-5 w-5 text-pink-500" />,
      link: "/ajuda/chatbot",
      color: "bg-pink-50 border-pink-200 hover:bg-pink-100",
      highlight: true,
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-pink-600 hover:bg-pink-700 transition-all animate-pulse hover:animate-none"
          onClick={() => setOpen(true)}
        >
          <HelpCircle className="h-6 w-6" />
          <span className="sr-only">Ajuda</span>
        </Button>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-pink-500" />
              Precisa de ajuda?
            </DialogTitle>
            <DialogDescription>Selecione uma opção abaixo ou acesse nossa central de ajuda completa</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 my-2">
            {quickHelpOptions.map((option, index) => (
              <Link key={index} href={option.link} className="block" onClick={() => setOpen(false)}>
                <Card
                  className={cn(
                    "transition-all hover:shadow-md border",
                    option.color,
                    option.highlight && "ring-2 ring-pink-500",
                  )}
                >
                  <CardHeader className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {option.icon}
                        <CardTitle className="text-base">{option.title}</CardTitle>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <CardDescription className="text-xs">{option.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-between items-center mt-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Fechar
            </Button>
            <Button asChild size="sm">
              <Link href="/ajuda" onClick={() => setOpen(false)}>
                Central de Ajuda Completa
                <ExternalLink className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
