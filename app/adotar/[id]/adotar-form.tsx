"use client";

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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { AdoptionRequest, createAdoption } from "@/services/adoptionService";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  phone: z.string().min(10, {
    message: "Por favor, insira um telefone válido.",
  }),
  address: z.string().min(5, {
    message: "Por favor, insira um endereço válido.",
  }),
  hasOtherPets: z.enum(["sim", "nao"], {
    required_error: "Por favor, selecione uma opção.",
  }),
  otherPetsDetails: z.string().optional(),
  houseType: z.enum(["casa", "apartamento", "outro"], {
    required_error: "Por favor, selecione uma opção.",
  }),
  familySize: z.string().min(1, {
    message: "Por favor, informe quantas pessoas moram com você.",
  }),
  workHours: z.string().min(1, {
    message: "Por favor, informe suas horas de trabalho.",
  }),
  motivation: z.string().min(10, {
    message: "Por favor, conte-nos mais sobre sua motivação para adotar.",
  }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({
      message: "Você deve aceitar os termos para continuar.",
    }),
  }),
});

export default function AdotarForm({
  petId,
  petName,
}: {
  petId: string;
  petName: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      hasOtherPets: "nao",
      otherPetsDetails: "",
      houseType: "casa",
      familySize: "",
      workHours: "",
      motivation: "",
      termsAccepted: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const adoptionData = {
      animalId: petId,
      fullName: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      hasOtherPets: values.hasOtherPets === "sim", // converte string para boolean
      housingType: values.houseType, // já deve ser um dos valores válidos
      numberOfResidents: Number(values.familySize), // converte string para number
      workSchedule: values.workHours,
      reasonForAdoption: values.motivation,
      agreedToTerms: values.termsAccepted,
    };

    createAdoption(adoptionData)
      .then(() => {
        toast({
          title: "Formulário enviado com sucesso!",
          description: `Recebemos seu interesse em adotar ${petName}. Entraremos em contato em breve.`,
        });
        form.reset();
      })
      .catch((error) => {
        toast({
          title: "Erro ao enviar o formulário.",
          description:
            error?.response?.data?.message || "Tente novamente mais tarde.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="seu.email@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input placeholder="Seu endereço completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="hasOtherPets"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Você tem outros animais de estimação?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="sim" />
                    </FormControl>
                    <FormLabel className="font-normal">Sim</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="nao" />
                    </FormControl>
                    <FormLabel className="font-normal">Não</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("hasOtherPets") === "sim" && (
          <FormField
            control={form.control}
            name="otherPetsDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quais animais você tem?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva quais animais você tem, suas idades e como é a convivência entre eles."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="houseType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Tipo de moradia</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="casa" />
                    </FormControl>
                    <FormLabel className="font-normal">Casa</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="apartamento" />
                    </FormControl>
                    <FormLabel className="font-normal">Apartamento</FormLabel>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="familySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantas pessoas moram com você?</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 3 pessoas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário de trabalho</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 8h às 18h" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="motivation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Por que você quer adotar este pet?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte-nos sua motivação para adotar este animal e como você planeja cuidar dele."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Concordo com os termos de adoção responsável
                </FormLabel>
                <FormDescription>
                  Ao marcar esta caixa, você concorda em fornecer um lar amoroso
                  e responsável para o animal, seguindo todas as diretrizes de
                  adoção.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar Formulário de Adoção"}
        </Button>
      </form>
    </Form>
  );
}
