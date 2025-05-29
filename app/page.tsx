import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PawPrint, Shield, Heart, ArrowRight } from "lucide-react"
import PlaceholderImage from "@/components/placeholder-image"
import HelpFloatingButton from "@/components/help-floating-button"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Adote com</span>
                <span className="block text-pink-600">Amor e Responsabilidade</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Ajude a transformar vidas! Na PetHelp, conectamos animais que precisam de um lar com pessoas que querem
                fazer a diferença. Adote, denuncie maus-tratos e faça parte dessa corrente do bem.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/adotar">
                    Adotar um Pet <Heart className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/denunciar">
                    Denunciar Maus-tratos <Shield className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <PlaceholderImage
                width={500}
                height={500}
                alt="Cachorro e gato juntos"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Como a PetHelp funciona</h2>
            <p className="mt-4 text-lg text-gray-600">
              Facilitamos o processo de adoção e denúncia para ajudar mais animais
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-pink-100 p-3">
                    <PawPrint className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
                <h3 className="mt-4 text-center text-lg font-medium text-gray-900">Adoção Responsável</h3>
                <p className="mt-2 text-center text-gray-600">
                  Encontre o pet ideal para sua família através de um processo seguro e responsável.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-pink-100 p-3">
                    <Shield className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
                <h3 className="mt-4 text-center text-lg font-medium text-gray-900">Denúncias de Maus-tratos</h3>
                <p className="mt-2 text-center text-gray-600">
                  Faça denúncias de forma anônima e segura para proteger animais em situação de risco.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-pink-100 p-3">
                    <Heart className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
                <h3 className="mt-4 text-center text-lg font-medium text-gray-900">Apoio a ONGs</h3>
                <p className="mt-2 text-center text-gray-600">
                  Conectamos ONGs e protetores independentes com pessoas interessadas em adotar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-pink-600">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Pronto para fazer a diferença?</span>
            <span className="block text-pink-200">Comece hoje mesmo.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/adotar">
                Ver Pets Disponíveis <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Histórias de Sucesso</h2>
            <p className="mt-4 text-lg text-gray-600">Veja como a adoção transformou a vida dessas famílias</p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center">
                  <PlaceholderImage width={100} height={100} alt="Foto de perfil" className="rounded-full" />
                </div>
                <h3 className="mt-4 text-center text-lg font-medium text-gray-900">Maria e Thor</h3>
                <p className="mt-2 text-center text-gray-600">
                  "Adotar o Thor foi a melhor decisão que tomamos. Ele trouxe tanta alegria para nossa família!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center">
                  <PlaceholderImage width={100} height={100} alt="Foto de perfil" className="rounded-full" />
                </div>
                <h3 className="mt-4 text-center text-lg font-medium text-gray-900">João e Luna</h3>
                <p className="mt-2 text-center text-gray-600">
                  "A Luna estava em situação de rua quando a encontramos através da PetHelp. Hoje ela é parte da
                  família."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center">
                  <PlaceholderImage width={100} height={100} alt="Foto de perfil" className="rounded-full" />
                </div>
                <h3 className="mt-4 text-center text-lg font-medium text-gray-900">Ana e Simba</h3>
                <p className="mt-2 text-center text-gray-600">
                  "O Simba estava em um abrigo há mais de 2 anos. Graças à PetHelp, encontramos um ao outro."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Botão de ajuda flutuante */}
      <HelpFloatingButton />
    </div>
  )
}
