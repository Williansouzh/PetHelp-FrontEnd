"use client";
import {
  getDashboardStats,
  getRecentPets,
  fetchPets,
  fetchAdoptionRequests,
} from "@/services/dashboardService";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle2,
  PawPrint,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import PlaceholderImage from "@/components/placeholder-image";

type Stat = {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
};

export default function OngDashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [stats, setStats] = useState<Stat[]>([]);
  const [pets, setPets] = useState<any[]>([]);
  const [adoptionRequests, setAdoptionRequests] = useState<any[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [statsData, recentPetsData, allRequests] = await Promise.all([
          getDashboardStats(),
          getRecentPets(),
          fetchAdoptionRequests(),
        ]);
        setStats(statsData);
        setPets(recentPetsData);
        setAdoptionRequests(allRequests);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      }
    }

    loadDashboardData();
  }, []);

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
  if (!stats.length || !pets.length || !adoptionRequests.length) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard da ONG</h1>
          <p className="text-gray-500">
            Gerencie seus pets e solicitações de adoção
          </p>
        </div>
        <Button asChild>
          <Link href="/ongs/dashboard/pets/novo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Cadastrar Novo Pet
          </Link>
        </Button>
      </div>

      <Tabs
        defaultValue="overview"
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="pets">Meus Pets</TabsTrigger>
          <TabsTrigger value="requests">Solicitações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Estatísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pets recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Pets Recentes</CardTitle>
              <CardDescription>
                Os últimos pets cadastrados na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pets.slice(0, 4).map((pet) => (
                  <Card key={pet.id} className="overflow-hidden">
                    <div className="relative h-32">
                      {pet.image ? (
                        <Image
                          src={pet.image || "/placeholder.svg"}
                          alt={pet.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <PlaceholderImage
                          width={100}
                          height={100}
                          alt={pet.name}
                          className="w-full h-full"
                        />
                      )}
                      {getStatusBadge(pet.status)}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold">{pet.name}</h3>
                      <p className="text-sm text-gray-500">
                        {pet.breed} • {pet.age}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" onClick={() => setSelectedTab("pets")}>
                Ver todos os pets
              </Button>
            </CardFooter>
          </Card>

          {/* Solicitações recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Solicitações Recentes</CardTitle>
              <CardDescription>
                As últimas solicitações de adoção recebidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pet</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adoptionRequests.slice(0, 3).map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.petName}
                      </TableCell>
                      <TableCell>{request.requesterName}</TableCell>
                      <TableCell>
                        {new Date(request.createdAt).toLocaleDateString(
                          "pt-BR"
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link
                            href={`/ongs/dashboard/solicitacoes/${request.id}`}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver detalhes</span>
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setSelectedTab("requests")}
              >
                Ver todas as solicitações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meus Pets</CardTitle>
              <CardDescription>
                Gerencie todos os pets cadastrados pela sua ONG
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pet</TableHead>
                    <TableHead>Raça</TableHead>
                    <TableHead>Idade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Cadastro</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pets.map((pet) => (
                    <TableRow key={pet.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            {pet.image ? (
                              <Image
                                src={pet.image || "/placeholder.svg"}
                                alt={pet.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <PlaceholderImage
                                width={32}
                                height={32}
                                alt={pet.name}
                                className="w-full h-full"
                              />
                            )}
                          </div>
                          {pet.name}
                        </div>
                      </TableCell>
                      <TableCell>{pet.breed}</TableCell>
                      <TableCell>{pet.age}</TableCell>
                      <TableCell>{getStatusBadge(pet.status)}</TableCell>
                      <TableCell>
                        {new Date(pet.createdAt).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Abrir menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/ongs/dashboard/pets/${pet.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver detalhes
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/ongs/dashboard/pets/${pet.id}/editar`}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Anterior</Button>
              <Button variant="outline">Próximo</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Solicitações de Adoção</CardTitle>
              <CardDescription>
                Gerencie todas as solicitações de adoção recebidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Pet</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adoptionRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        #{request.id}
                      </TableCell>
                      <TableCell>{request.petName}</TableCell>
                      <TableCell>{request.requesterName}</TableCell>
                      <TableCell>{request.requesterEmail}</TableCell>
                      <TableCell>
                        {new Date(request.createdAt).toLocaleDateString(
                          "pt-BR"
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span className="sr-only">Abrir menu</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/ongs/dashboard/solicitacoes/${request.id}`}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Ver detalhes
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Aprovar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Recusar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Anterior</Button>
              <Button variant="outline">Próximo</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
