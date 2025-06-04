import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PawPrint,
  Target,
  Users,
  Code,
  Globe,
  Rocket,
  Award,
  Heart,
} from "lucide-react";
import PlaceholderImage from "@/components/placeholder-image";
import Image from "next/image";

export default function SobrePage() {
  const teamMembers = [
    {
      name: "Willian Souza Alves",
      image: "/team/willian.jpg",
      role: "Full Stack Developer",
      description:
        "Responsável pela integração entre frontend e backend, desenvolvimento de funcionalidades e boas práticas com Clean Code.",
    },
    {
      name: "Louise Carnevali",
      image: "/team/louise.jpg",
      role: "Fullstack Developer",
      description:
        "Criou interfaces acessíveis e responsivas, utilizando Next.js, Tailwind e boas práticas de usabilidade.",
    },
    {
      name: "Thayane Cordeiro",
      image: "/team/tayane.jpg",
      role: "Frontend Developer",
      description:
        "Colaborou na criação de páginas dinâmicas e acessíveis com foco em formulários, fluxos de adoção e denúncias.",
    },
  ];

  const technologies = {
    frontend: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "react-hook-form",
      "Axios",
    ],
    backend: [
      "C# .NET",
      "PostgreSQL",
      "JWT",
      "Google Cloud Storage",
      "Swagger",
    ],
    apis: [
      "Google Maps API para geolocalização",
      "Google Cloud Storage para armazenamento de imagens",
      "Google Cloud Vision para reconhecimento de imagens",
      "Google Cloud Translation para tradução de conteúdo",
      "Google Cloud Functions para funções serverless",
      "Google Cloud Pub/Sub para mensagens assíncronas",
      "Google Cloud FireBase para autenticação",
      "Google Cloud AI para assitente virtual",
    ],
    hosting: ["Google Cloud Platform"],
  };

  const ods = [
    {
      number: "4",
      title: "Educação de Qualidade",
      description: "Participação em capacitações da Google Cloud.",
      icon: "🧠",
    },
    {
      number: "8",
      title: "Trabalho Decente e Crescimento Econômico",
      description: "Projeto real com potencial de empregabilidade.",
      icon: "💼",
    },
    {
      number: "9",
      title: "Indústria, Inovação e Infraestrutura",
      description: "Solução inovadora com uso de Cloud e IA.",
      icon: "💡",
    },
    {
      number: "11",
      title: "Cidades e Comunidades Sustentáveis",
      description: "Apoio ao bem-estar animal e qualidade de vida urbana.",
      icon: "🏘️",
    },
    {
      number: "13",
      title: "Ação Contra a Mudança Global do Clima",
      description: "Uso consciente de tecnologia em nuvem.",
      icon: "🌍",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="bg-pink-100 p-4 rounded-full">
            <PawPrint className="h-12 w-12 text-pink-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">🐾 Sobre o Projeto PetHelp</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Uma plataforma desenvolvida com amor e tecnologia para conectar
          corações e transformar vidas
        </p>
      </div>

      {/* O que é o PetHelp */}
      <section className="mb-16">
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-6 w-6 text-pink-500" />
              <h2 className="text-3xl font-bold">💡 O que é o PetHelp?</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  O PetHelp é uma plataforma web desenvolvida durante o{" "}
                  <strong>
                    1° Hackathon da Unicesumar em parceria com o Google Cloud
                  </strong>
                  , com o propósito de conectar ONGs, protetores independentes e
                  adotantes responsáveis.
                </p>
                <p className="text-lg leading-relaxed">
                  A aplicação também oferece um canal para denúncias de
                  maus-tratos a animais com uso de geolocalização, promovendo o
                  bem-estar animal e incentivando adoções conscientes.
                </p>
                <p className="text-lg leading-relaxed">
                  Nosso projeto busca usar a tecnologia como aliada na
                  construção de comunidades mais empáticas, seguras e
                  sustentáveis para os animais. Ao facilitar processos de adoção
                  e denúncia, contribuímos para uma sociedade mais justa — tanto
                  para pessoas quanto para animais.
                </p>
              </div>
              <div className="flex justify-center">
                <PawPrint
                  className="text-pink-600"
                  style={{ width: 400, height: 300 }}
                  aria-label="Ícone do PetHelp"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Propósito e Impacto Social */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Target className="h-6 w-6 text-pink-500" />
            <h2 className="text-3xl font-bold">
              🎯 Propósito e Impacto Social
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            O PetHelp foi idealizado com base nos Objetivos de Desenvolvimento
            Sustentável (ODS) da ONU
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ods.map((objetivo, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{objetivo.icon}</div>
                  <Badge variant="outline" className="bg-pink-50 text-pink-700">
                    ODS {objetivo.number}
                  </Badge>
                </div>
                <h3 className="font-bold text-lg mb-2">{objetivo.title}</h3>
                <p className="text-gray-600">{objetivo.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Equipe */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Users className="h-6 w-6 text-pink-500" />
            <h2 className="text-3xl font-bold">👩‍💻 Equipe</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nosso time multidisciplinar uniu habilidades de desenvolvimento
            frontend e backend para entregar uma solução sólida e de impacto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {member.image ? (
                    <Image
                      src={member.image}
                      width={100}
                      height={100}
                      alt={member.name}
                      className="rounded-full"
                    />
                  ) : (
                    <PlaceholderImage
                      width={100}
                      height={100}
                      alt={member.name}
                      className="rounded-full"
                    />
                  )}
                </div>
                <h3 className="font-bold text-xl mb-2">{member.name}</h3>
                <Badge
                  variant="outline"
                  className="mb-4 bg-pink-50 text-pink-700"
                >
                  {member.role}
                </Badge>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tecnologias */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Code className="h-6 w-6 text-pink-500" />
            <h2 className="text-3xl font-bold">🧰 Tecnologias Utilizadas</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4 text-pink-600">Frontend</h3>
              <div className="space-y-2">
                {technologies.frontend.map((tech, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4 text-pink-600">Backend</h3>
              <div className="space-y-2">
                {technologies.backend.map((tech, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4 text-pink-600">
                APIs Externas
              </h3>
              <div className="space-y-2">
                {technologies.apis.map((tech, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4 text-pink-600">
                Hospedagem
              </h3>
              <div className="space-y-2">
                {technologies.hosting.map((tech, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sobre o Hackathon */}
      <section className="mb-16">
        <Card className="bg-gradient-to-r from-pink-50 to-purple-50">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-6 w-6 text-pink-500" />
              <h2 className="text-3xl font-bold">🌐 Sobre o Hackathon</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  O <strong>1º Hackathon Unicesumar + Google Cloud</strong> foi
                  voltado a estudantes de cursos EaD da área de TI, promovendo
                  inovação, impacto social e sustentabilidade.
                </p>
                <p className="text-lg leading-relaxed">
                  Durante o evento, fomos desafiados a desenvolver um MVP
                  utilizando Google Cloud para solucionar problemas reais, como
                  acessibilidade digital e responsabilidade social — temas
                  centrais no desenvolvimento do PetHelp.
                </p>
                <p className="text-lg leading-relaxed">
                  O evento ofereceu capacitações oficiais, mentoria
                  especializada, certificação Google Cloud e oportunidades de
                  networking, como a participação na Job Fair Google, conectando
                  talentos com o mercado.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/hacakton.PNG"
                  width={400}
                  height={300}
                  alt="Hackathon Unicesumar + Google Cloud"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Nosso Compromisso */}
      <section className="mb-16">
        <Card className="bg-pink-600 text-white">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center items-center gap-3 mb-6">
              <Rocket className="h-8 w-8" />
              <h2 className="text-3xl font-bold">🚀 Nosso Compromisso</h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl leading-relaxed">
                Acreditamos que a tecnologia pode transformar realidades. O
                PetHelp é apenas o começo: nosso sonho é expandir a plataforma,
                formar parcerias com ONGs reais e continuar desenvolvendo
                soluções tecnológicas que gerem impacto social verdadeiro.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 rounded-lg p-6">
                  <Globe className="h-8 w-8 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Expansão</h3>
                  <p className="text-sm">Levar o PetHelp para todo o Brasil</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <Users className="h-8 w-8 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Parcerias</h3>
                  <p className="text-sm">
                    Conectar com ONGs e protetores reais
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <Heart className="h-8 w-8 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Impacto</h3>
                  <p className="text-sm">
                    Salvar mais vidas e criar mais lares
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            Faça parte dessa transformação!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Juntos podemos criar um mundo melhor para os animais e suas famílias
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/adotar"
              className="bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
            >
              Adotar um Pet
            </a>
            <a
              href="/denunciar"
              className="bg-white text-pink-600 border border-pink-600 px-6 py-3 rounded-lg font-medium hover:bg-pink-50 transition-colors"
            >
              Denunciar Maus-tratos
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
