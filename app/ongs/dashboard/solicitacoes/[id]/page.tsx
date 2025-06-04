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
import {
  AdoptionResponse,
  getAdoptionById,
  updateAdoptionStatus,
} from "@/services/adoptionService";
import { AdoptionStatus } from "@/interfaces/adoptionInterface";
import Image from "next/image";
import { getAnimalById } from "@/services/animalService";

export default function SolicitacaoDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [request, setRequest] = useState<AdoptionResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchAdoptionRequest = async () => {
      try {
        const adoptionRequest = await getAdoptionById(params.id);
        const animalDetails = await getAnimalById(adoptionRequest.animalId);
        setRequest({
          ...adoptionRequest,
          animalImageUrl: animalDetails.imageUrl,
        });
      } catch (error) {
        console.error("Failed to fetch adoption request:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados da solicitação.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdoptionRequest();
  }, [params.id]);

  const handleStatusUpdate = async (status: AdoptionStatus) => {
    setIsProcessing(true);
    try {
      if (!request) return;

      await updateAdoptionStatus(request.id, status);
      const updatedRequest = await getAdoptionById(params.id);
      setRequest(updatedRequest);

      toast({
        title:
          status === AdoptionStatus.Aprovado
            ? "Solicitação aprovada"
            : "Solicitação recusada",
        description: `O solicitante será notificado sobre a ${
          status === AdoptionStatus.Aprovado ? "aprovação" : "recusa"
        }.`,
      });
      router.push("/ongs/dashboard");
    } catch (error) {
      console.error("Failed to update adoption status:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o status da solicitação.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const statusMap = {
    [AdoptionStatus.Pendente]: {
      label: "Pendente",
      bg: "bg-yellow-100",
      text: "text-yellow-800",
    },
    [AdoptionStatus.Aprovado]: {
      label: "Aprovado",
      bg: "bg-green-100",
      text: "text-green-800",
    },
    [AdoptionStatus.Rejeitado]: {
      label: "Rejeitado",
      bg: "bg-red-100",
      text: "text-red-800",
    },
    // [AdoptionStatus.EM_ANALISE]: {
    //   label: "Em análise",
    //   bg: "bg-blue-100",
    //   text: "text-blue-800",
    // },
  };

  const getStatusBadge = (status: AdoptionStatus) => {
    const info = statusMap[status];
    return (
      <Badge
        variant="outline"
        className={`${info.bg} ${info.text} hover:${info.bg}`}
      >
        {info.label}
      </Badge>
    );
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
          {request.status === AdoptionStatus.Pendente && (
            <>
              <Button
                variant="outline"
                className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                onClick={() => handleStatusUpdate(AdoptionStatus.Aprovado)}
                disabled={isProcessing}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {isProcessing ? "Processando..." : "Aprovar"}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
                    disabled={isProcessing}
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
                      {request.fullName} para o pet {request.animalId}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isProcessing}>
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        handleStatusUpdate(AdoptionStatus.Rejeitado)
                      }
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
                    <p>{request.fullName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p>{request.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Telefone
                    </p>
                    <p>{request.phone}</p>
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
                    <p>{request.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Home className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Tipo de moradia
                    </p>
                    <p className="capitalize">
                      {request.housingType.toLowerCase()}
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
                      Número de residentes
                    </p>
                    <p>{request.numberOfResidents}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Horário de trabalho
                    </p>
                    <p>{request.workSchedule}</p>
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
                    <p>{request.hasOtherPets ? "Sim" : "Não"}</p>
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
                    <p className="text-sm">{request.reasonForAdoption}</p>
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
                  {request.animalImageUrl ? (
                    <Image
                      src={request.animalImageUrl}
                      alt={`Pet ${request.animalId}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 128px) 100vw, 128px"
                    />
                  ) : (
                    <PlaceholderImage
                      width={128}
                      height={128}
                      alt={`Pet ${request.animalId}`}
                      className="w-full h-full"
                    />
                  )}
                </div>
                <h3 className="text-xl font-bold">Pet #{request.animalId}</h3>
                <Link
                  href={`/ongs/dashboard/pets/${request.animalId}`}
                  className="text-sm text-pink-600 hover:underline mt-1"
                >
                  Ver detalhes do pet
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" asChild>
                <Link href={`/ongs/dashboard/pets/${request.animalId}`}>
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
