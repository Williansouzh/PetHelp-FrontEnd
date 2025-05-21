"use client"

import type React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { Shield, Upload, MapPin } from "lucide-react"
import Image from "next/image"

const formSchema = z.object({
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  location: z.string().min(5, {
    message: "Por favor, forneça um endereço ou localização.",
  }),
  animalType: z.enum(["cachorro", "gato", "outro"], {
    required_error: "Por favor, selecione um tipo de animal.",
  }),
  urgencyLevel: z.enum(["baixa", "media", "alta"], {
    required_error: "Por favor, selecione o nível de urgência.",
  }),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z
    .string()
    .email({
      message: "Por favor, insira um email válido.",
    })
    .optional(),
  isAnonymous: z.boolean().default(false),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "Você deve aceitar os termos para continuar." }),
  }),
})

export default function DenunciarPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      location: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      isAnonymous: false,
      termsAccepted: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulação de envio para API
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      toast({
        title: "Denúncia enviada com sucesso!",
        description:
          "Agradecemos sua contribuição para o bem-estar animal. Sua denúncia será analisada com prioridade.",
      })
      form.reset()
      setSelectedImage(null)
    }, 1500)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Denunciar Maus-tratos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sua denúncia é fundamental para combatermos os maus-tratos contra animais. Todas as informações são tratadas
            com confidencialidade.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-pink-500" />
              Formulário de Denúncia
            </CardTitle>
            <CardDescription>
              Preencha os campos abaixo com o máximo de detalhes possível para ajudarmos os animais em situação de
              risco.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição da situação</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva detalhadamente a situação de maus-tratos que você presenciou."
                          className="resize-none min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Inclua informações como: o que está acontecendo, há quanto tempo, quantos animais estão
                        envolvidos, etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Localização
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Endereço ou referência do local" {...field} />
                      </FormControl>
                      <FormDescription>Forneça o endereço completo ou uma referência clara do local.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="animalType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Tipo de animal</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="cachorro" />
                              </FormControl>
                              <FormLabel className="font-normal">Cachorro</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="gato" />
                              </FormControl>
                              <FormLabel className="font-normal">Gato</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="outro" />
                              </FormControl>
                              <FormLabel className="font-normal">Outro</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="urgencyLevel"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Nível de urgência</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="baixa" />
                              </FormControl>
                              <FormLabel className="font-normal">Baixa</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="media" />
                              </FormControl>
                              <FormLabel className="font-normal">Média</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="alta" />
                              </FormControl>
                              <FormLabel className="font-normal">Alta</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Evidências</h3>
                    <FormField
                      control={form.control}
                      name="isAnonymous"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Denúncia anônima</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">
                        Envie fotos ou vídeos que comprovem a situação (opcional)
                      </p>
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => document.getElementById("image-upload")?.click()}
                        >
                          <Upload className="h-4 w-4" />
                          Enviar imagem
                        </Button>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>

                    {selectedImage && (
                      <div className="relative h-40 w-full md:w-1/2 border rounded-md overflow-hidden">
                        <Image
                          src={selectedImage || "/placeholder.svg"}
                          alt="Imagem selecionada"
                          fill
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setSelectedImage(null)}
                        >
                          Remover
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {!form.watch("isAnonymous") && (
                  <div className="space-y-6">
                    <h3 className="font-medium">Seus dados de contato (opcional)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input placeholder="(00) 00000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="seu.email@exemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Declaro que as informações fornecidas são verdadeiras</FormLabel>
                        <FormDescription>
                          Ao enviar esta denúncia, você concorda com nossos termos de uso e política de privacidade.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar Denúncia"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
