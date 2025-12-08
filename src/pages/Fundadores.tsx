import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Rocket, ClipboardList } from 'lucide-react'

type Fundador = {
  id: number | string
  name: string
  created_at?: string
}

async function fetchSignatures(): Promise<Fundador[]> {
  const base = import.meta.env.VITE_API_BASE_URL || ''
  const response = await fetch(`${base}/api/v1/manifesto/signatures`)
  if (!response.ok) {
    throw new Error('Falha ao buscar fundadores')
  }
  return response.json()
}

export default function Fundadores() {
  const { state } = useLocation() as { state?: { newName?: string } } | any
  const newName = state?.newName

  const { data: fundadores, isLoading, isError } = useQuery({
    queryKey: ['manifestoSignatures'],
    queryFn: fetchSignatures,
  })

  if (isLoading) {
    return (
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-3xl py-8">
          <WIPBanner />
          <div className="mt-8 text-muted-foreground">Carregando fundadores...</div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-3xl py-8">
          <WIPBanner />
          <div className="mt-8 text-destructive">Não foi possível carregar o Muro.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 px-6 overflow-x-hidden">
      <div className="container mx-auto max-w-4xl py-8">
        <WIPBanner />

        <section className="mt-10">
          <h1 className="text-3xl md:text-4xl font-bold text-center">O Muro dos Fundadores</h1>
          <p className="text-muted-foreground mt-2">
            Seu nome aparecerá aqui após assinar o Manifesto. Obrigado por fazer parte da primeira fase.
          </p>

          {/* Muro em formato de nuvem de tags com animação */}
          <motion.div
            className="mt-8 flex flex-wrap gap-3 justify-center w-full max-w-4xl mx-auto overflow-x-hidden"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {fundadores?.map((fundador) => {
              const isNew = fundador.name === newName
              return (
                <motion.div
                  className="max-w-full"
                  key={fundador.id}
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  animate={isNew ? { scale: [1, 1.1, 1], transition: { duration: 0.8, ease: 'easeInOut' } } : {}}
                >
                  <Badge
                    variant={isNew ? 'default' : 'secondary'}
                    className="text-base md:text-lg px-4 py-1 break-words break-all max-w-full"
                    data-highlight={isNew ? 'true' : 'false'}
                  >
                    {fundador.name}
                  </Badge>
                </motion.div>
              )
            })}
          </motion.div>

          {/* --- INÍCIO DA REFORMA (BLOCO DE MISSÃO EM CARDS) --- */}
          <div className="mt-12 md:mt-20 py-16 border-t border-border">
            {/* 1. Título do Bloco */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary">Bem-vindo(a), Fundador(a).</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Seu nome está no Muro. Sua primeira missão (Ato 1) começa agora.
              </p>
            </div>

            {/* 2. O Grid de Ações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
              {/* Card 1: Assembleia (Ação Principal) */}
              <Card className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-primary" />
                    Ato 1: O QG (Sua Primeira Missão)
                  </CardTitle>
                  <CardDescription>
                    O plano de batalha está em branco. Como você leu na Home, precisamos da sua inteligência <em>agora</em> para definir os próximos passos do movimento.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild size="lg" className="w-full">
                    <Link to="/assembleia">Ir para a Assembleia</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Card 2: Influ.IA (Ação Secundária) */}
              <Card className="flex flex-col justify-between border-dashed">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-muted-foreground" />
                    Ato 2: A Ferramenta (Em Breve)
                  </CardTitle>
                  <CardDescription>
                    Conheça a Influ.IA – a arma digital que estamos construindo. Veja o <em>roadmap</em> e entenda por que ela é o "co-piloto anti-preguiça" (o crowdfunding começa em breve).
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild size="lg" variant="outline" className="w-full">
                    <Link to="/influ-ia">Conheça a Influ.IA</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          {/* --- FIM DA REFORMA --- */}

          {/* Botões redundantes removidos para priorizar os Cards acima */}
        </section>
      </div>
    </div>
  )
}

function WIPBanner() {
  return (
    <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-transparent to-primary/5 p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <div className="text-xs md:text-sm uppercase tracking-widest text-primary font-semibold">Em desenvolvimento</div>
        <div className="text-sm md:text-base text-muted-foreground">
          Construindo juntos: este espaço evolui com a sua participação. Assine o Manifesto e faça parte das primeiras decisões.
        </div>
      </div>
    </div>
  )
}
