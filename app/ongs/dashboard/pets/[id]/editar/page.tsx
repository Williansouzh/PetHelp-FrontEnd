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
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import PlaceholderImage from "@/components/placeholder-image"
import { useRouter } from "next/navigation"

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

// Simulação de dados de um pet específico
const mockPet = {
  id: 1,
  name: "Max",
  type: "cachorro",
  breed: "Vira-lata",
  age: "2 anos",
  gender: "macho",
  size: "medio",
  description:
    "Max é um cachorro muito dócil e brincalhão. Foi resgatado das ruas e está procurando um lar amoroso. Ele é muito sociável com outros animais e crianças.",
  vaccinated: true,
  neutered: true,
  requirements:
    "Ter espaço adequado para o animal\nTela nas janelas para segurança\nComprometer-se com a saúde e bem-estar do animal\nPassar por entrevista e visita prévia",
  status: "disponivel",
  images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
}

export default function EditarPetPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
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

  // Simulação de carregamento de dados do pet
  useEffect(() => {
    // Em um caso real, aqui faria uma chamada à API para buscar os dados do pet
    setTimeout(() => {
      form.reset({
        name: mockPet.name,
        type: mockPet.type as any,
        breed: mockPet.breed,
        age: mockPet.age,
        gender: mockPet.gender as any,
        size: mockPet.size as any,
        description: mockPet.description,
        vaccinated: mockPet.vaccinated,
        neutered: mockPet.neutered,
        requirements: mockPet.requirements,
        status: mockPet.status as any,
      })

      // Simular carregamento de imagens
      setSelectedImages(["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"])

      setIsLoading(false)
    }, 1000)
  }, [form, params.id])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulação de envio para API
    setTimeout(() => {
      console.log(values)
      console.log("Imagens selecionadas:", selectedImages)
      setIsSubmitting(false)
      toast({
        title: "Pet atualizado com sucesso!",
        description: "As informações do animal foram atualizadas.",
      })
      router.push("/ongs/dashboard")
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

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/ongs/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Editar Pet</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando informações do pet...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/ongs/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Editar Pet</h1>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Informações do Animal</CardTitle>
          <CardDescription>Atualize os dados do animal.</CardDescription>
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
                        {image.startsWith("data:") ? (
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Foto ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <PlaceholderImage
                            width={300}
                            height={300}
                            alt={`Foto ${index + 1}`}
                            className="w-full h-full"
                          />
                        )}
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
                  {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
