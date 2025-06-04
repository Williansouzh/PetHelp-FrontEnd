"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import { createAnimal } from "@/services/animalService";
import { Gender, Size, AnimalStatus } from "@/interfaces/animalInterface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  species: z.enum(["cachorro", "gato", "outro"], {
    required_error: "Por favor, selecione o tipo de animal.",
  }),
  breed: z.string().min(2, {
    message: "Por favor, informe a raça do animal.",
  }),
  birthDate: z.string().min(1, {
    message: "Por favor, informe a data de nascimento.",
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
  isVaccinated: z.boolean(),
  isNeutered: z.boolean(),
  adoptionRequirements: z.string().min(10, {
    message: "Por favor, informe os requisitos para adoção.",
  }),
  city: z.string().min(2, {
    message: "Por favor, informe a cidade.",
  }),
  state: z.string().length(2, {
    message: "Por favor, informe o estado com 2 caracteres (ex: SP).",
  }),
});

export default function NovoPetPage() {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      species: "cachorro",
      breed: "",
      birthDate: "",
      gender: "macho",
      size: "pequeno",
      description: "",
      isVaccinated: false,
      isNeutered: false,
      adoptionRequirements: "",
      city: "",
      state: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: File[] = [];

      // Limitar a 5 imagens
      const remainingSlots = 5 - selectedImages.length;
      const filesToAdd = Math.min(remainingSlots, files.length);

      for (let i = 0; i < filesToAdd; i++) {
        newImages.push(files[i]);
      }

      setSelectedImages((prev) => [...prev, ...newImages]);

      if (files.length > remainingSlots) {
        toast({
          title: "Aviso",
          description:
            "Você pode adicionar no máximo 5 imagens. As imagens excedentes foram ignoradas.",
          variant: "default",
        });
      }
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Usuário não autenticado. Faça login novamente.");
      }
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const createdByUserId = decodedToken.id;
      if (!createdByUserId) {
        throw new Error("Não foi possível identificar o usuário.");
      }

      if (
        !values.name ||
        !values.species ||
        !values.breed ||
        !values.birthDate ||
        !values.description ||
        !values.adoptionRequirements ||
        !values.city ||
        !values.state
      ) {
        throw new Error("Por favor, preencha todos os campos obrigatórios");
      }

      const animalData = {
        Name: values.name,
        Species: values.species,
        Breed: values.breed,
        BirthDate: new Date(values.birthDate).toISOString(),
        Gender: values.gender === "macho" ? 0 : 1,
        Size: values.size === "pequeno" ? 0 : values.size === "medio" ? 1 : 2,
        Description: values.description,
        IsVaccinated: values.isVaccinated,
        IsNeutered: values.isNeutered,
        AdoptionRequirements: values.adoptionRequirements,
        Status: 0,
        City: values.city,
        State: values.state.toUpperCase(),
        CreatedByUserId: createdByUserId,
      };

      const { data, location } = await createAnimal(animalData, selectedImages);

      console.log("Animal:", await createAnimal(animalData, selectedImages));
      await createAnimal(animalData, selectedImages);

      toast({
        title: "Sucesso!",
        description: "Pet cadastrado com sucesso",
      });
      if (location) {
        // Redireciona para a URL do animal criado
        router.push(location);
      } else {
        // fallback, vai pro dashboard
        router.push("/ongs/dashboard");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Erro detalhado:", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <CardDescription>
            Preencha os dados do animal que você deseja disponibilizar para
            adoção.
          </CardDescription>
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
                  name="species"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de animal</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                        <Input
                          placeholder="Ex: Vira-lata, Siamês, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Nascimento</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: São Paulo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado (UF)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: SP"
                          maxLength={2}
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                        />
                      </FormControl>
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
                  name="isVaccinated"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Vacinado</FormLabel>
                        <FormDescription>
                          O animal está com as vacinas em dia.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isNeutered"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Castrado</FormLabel>
                        <FormDescription>
                          O animal já foi castrado.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="adoptionRequirements"
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
                    <FormDescription>
                      Ex: Ter telas nas janelas, espaço adequado, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormLabel>Fotos do animal (Máx. 5)</FormLabel>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
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
                    A primeira imagem será a principal.
                  </FormDescription>
                </div>

                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                    {selectedImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative h-32 rounded-md overflow-hidden border"
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
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
                  </div>
                )}

                {selectedImages.length < 5 && (
                  <div
                    className="h-32 border border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
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
  );
}
