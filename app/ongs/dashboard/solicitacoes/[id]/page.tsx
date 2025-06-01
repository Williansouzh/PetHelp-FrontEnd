"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  CheckCircle2,
  Trash2,
  User,
  Mail,
  Phone,
  Calendar,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  PawPrint,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import PlaceholderImage from "@/components/placeholder-image";

// Simulação de dados de uma solicitação específica
const mockRequest = {
  id: 1,
  petId: 1,
  petName: "Max",
  petImage: "/placeholder.svg?height=300&width=300",
  requesterName: "João Silva",
  requesterEmail: "joao@example.com",
  requesterPhone: "(11) 98765-4321",
  requesterAddress: "Rua das Flores, 123 - São Paulo, SP",
  hasOtherPets: "sim",
  otherPetsDetails: "Tenho um gato de 3 anos, muito dócil e sociável.",
  houseType: "casa",
  familySize: "3 pessoas",
  workHours: "8h às 18h",
  motivation:
    "Sempre quis adotar um cachorro e tenho condições de oferecer um lar amoroso e responsável. Moro em uma casa com quintal e toda a família está animada para receber um novo membro.",
  status: "pendente",
  createdAt: "2023-08-10",
};

export default function SolicitacaoDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [request, setRequest] = useState<typeof mockRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulação de carregamento de dados da solicitação
  useEffect(() => {
    // Em um caso real, aqui faria uma chamada à API para buscar os dados da solicitação
    setTimeout(() => {
      setRequest(mockRequest);
      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  const handleApprove = () => {
    setIsProcessing(true);

    // Simulação de aprovação
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Solicitação aprovada",
        description: "O solicitante será notificado sobre a aprovação.",
      });
      router.push("/ongs/dashboard");
    }, 1500);
  };

  const handleReject = () => {
    setIsProcessing(true);

    // Simulação de rejeição
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Solicitação recusada",
        description: "O solicitante será notificado sobre a recusa.",
      });
      router.push("/ongs/dashboard");
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "disponível":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 hover:bg-green-50"
          >
            Disponível
          </Badge>
        );
      case "adotado":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 hover:bg-blue-50"
          >
            Adotado
          </Badge>
        );
      case "em processo":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
          >
            Em processo
          </Badge>
        );
      case "pendente":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
          >
            Pendente
          </Badge>
        );
      case "aprovado":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 hover:bg-green-50"
          >
            Aprovado
          </Badge>
        );
      case "em análise":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 hover:bg-blue-50"
          >
            Em análise
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/ongs/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Detalhes da Solicitação</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-500">
              Carregando informações da solicitação...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/ongs/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Detalhes da Solicitação</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-gray-500">Solicitação não encontrada.</p>
            <Button asChild className="mt-4">
              <Link href="/ongs/dashboard">Voltar para o Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/ongs/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Detalhes da Solicitação</h1>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 mr-2">
            Status: {getStatusBadge(request.status)}
          </p>
          {request.status === "pendente" && (
            <>
              <Button
                variant="outline"
                className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                onClick={handleApprove}
                disabled={isProcessing}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Aprovar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Recusar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Você está prestes a recusar a solicitação de adoção de{" "}
                      {request.requesterName} para o pet {request.petName}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleReject}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processando..." : "Sim, recusar"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informações do solicitante */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Solicitante</CardTitle>
              <CardDescription>
                Dados pessoais de quem solicitou a adoção
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nome</p>
                    <p>{request.requesterName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p>{request.requesterEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Telefone
                    </p>
                    <p>{request.requesterPhone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Data da solicitação
                    </p>
                    <p>
                      {new Date(request.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Home className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Endereço
                    </p>
                    <p>{request.requesterAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Home className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Tipo de moradia
                    </p>
                    <p>
                      {request.houseType === "casa"
                        ? "Casa"
                        : request.houseType === "apartamento"
                        ? "Apartamento"
                        : "Outro"}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Tamanho da família
                    </p>
                    <p>{request.familySize}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Horário de trabalho
                    </p>
                    <p>{request.workHours}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <PawPrint className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Possui outros animais?
                    </p>
                    <p>{request.hasOtherPets === "sim" ? "Sim" : "Não"}</p>
                    {request.hasOtherPets === "sim" &&
                      request.otherPetsDetails && (
                        <p className="text-sm text-gray-600 mt-1">
                          {request.otherPetsDetails}
                        </p>
                      )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Motivação para adoção
                    </p>
                    <p className="text-sm">{request.motivation}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Informações do pet */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Pet Solicitado</CardTitle>
              <CardDescription>Informações sobre o animal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden mb-4">
                  <PlaceholderImage
                    width={128}
                    height={128}
                    alt={request.petName}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold">{request.petName}</h3>
                <Link
                  href={`/ongs/dashboard/pets/${request.petId}`}
                  className="text-sm text-pink-600 hover:underline mt-1"
                >
                  Ver detalhes do pet
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" asChild>
                <Link href={`/ongs/dashboard/pets/${request.petId}`}>
                  Ver todas as solicitações para este pet
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
