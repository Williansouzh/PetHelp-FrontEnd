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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  type: z.enum(["cachorro", "gato", "outro"], {
    required_error: "Por favor, selecione o tipo de animal.",
  }),
  breed: z.string().min(2, {
    message: "Por favor, informe a raça do animal.",
  }),
  age: z.string().min(1, {
    message: "Por favor, informe a idade do animal.",
  }),
  gender: z.enum(["macho", "femea"], {
    required_error: "Por favor, selecione o sexo do animal.",
  }),
  size: z.enum(["pequeno", "medio", "grande"], {
    required_error: "Por favor, selecione o porte do animal.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  vaccinated: z.boolean().default(false),
  neutered: z.boolean().default(false),
  requirements: z.string().min(10, {
    message: "Por favor, informe os requisitos para adoção.",
  }),
  status: z.enum(["disponivel", "adotado", "em_processo"], {
    required_error: "Por favor, selecione o status do animal.",
  }),
})

export default function NovoPetPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      breed: "",
      age: "",
      description: "",
      requirements: "",
      vaccinated: false,
      neutered: false,
      status: "disponivel",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulação de envio para API
    setTimeout(() => {
      console.log(values)
      console.log("Imagens selecionadas:", selectedImages)
      setIsSubmitting(false)
      toast({
        title: "Pet cadastrado com sucesso!",
        description: "O animal foi adicionado à sua lista de pets disponíveis para adoção.",
      })
      form.reset()
      setSelectedImages([])
    }, 1500)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages: string[] = []

      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string)
            if (newImages.length === files.length) {
              setSelectedImages((prev) => [...prev, ...newImages])
            }
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/ongs/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Cadastrar Novo Pet</h1>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Informações do Animal</CardTitle>
          <CardDescription>Preencha os dados do animal que você deseja disponibilizar para adoção.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do animal</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Rex, Luna, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de animal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cachorro">Cachorro</SelectItem>
                          <SelectItem value="gato">Gato</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raça</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Vira-lata, Siamês, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 2 anos, 6 meses, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Sexo</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="macho" />
                            </FormControl>
                            <FormLabel className="font-normal">Macho</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="femea" />
                            </FormControl>
                            <FormLabel className="font-normal">Fêmea</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Porte</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o porte" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pequeno">Pequeno</SelectItem>
                          <SelectItem value="medio">Médio</SelectItem>
                          <SelectItem value="grande">Grande</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva o animal, seu comportamento, personalidade, etc."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="vaccinated"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Vacinado</FormLabel>
                        <FormDescription>O animal está com as vacinas em dia.</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="neutered"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Castrado</FormLabel>
                        <FormDescription>O animal já foi castrado.</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requisitos para adoção</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Informe os requisitos necessários para adotar este animal."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Ex: Ter telas nas janelas, espaço adequado, etc.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="disponivel">Disponível para adoção</SelectItem>
                        <SelectItem value="em_processo">Em processo de adoção</SelectItem>
                        <SelectItem value="adotado">Adotado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormLabel>Fotos do animal</FormLabel>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    Adicionar fotos
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <FormDescription>
                    Adicione até 5 fotos do animal. Recomendamos fotos claras e que mostrem bem o animal.
                  </FormDescription>
                </div>

                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative h-32 rounded-md overflow-hidden border">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {selectedImages.length < 5 && (
                      <div
                        className="h-32 border border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
                        onClick={() => document.getElementById("image-upload")?.click()}
                      >
                        <Upload className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                )}

                {selectedImages.length === 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    <div
                      className="h-32 border border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
                      onClick={() => document.getElementById("image-upload")?.click()}
                    >
                      <Upload className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" asChild>
                  <Link href="/ongs/dashboard">Cancelar</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Cadastrando..." : "Cadastrar Pet"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
