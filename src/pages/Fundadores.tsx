import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

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
    <div className="pt-24 px-6">
      <div className="container mx-auto max-w-4xl py-8">
        <WIPBanner />

        <section className="mt-10">
          <h1 className="text-3xl md:text-4xl font-bold">O Muro dos Fundadores</h1>
          <p className="text-muted-foreground mt-2">
            Seu nome aparecerá aqui após assinar o Manifesto. Obrigado por fazer parte da primeira fase.
          </p>

          <ul className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {fundadores?.map((fundador) => {
              const isNew = fundador.name === newName
              return (
                <li
                  key={fundador.id}
                  data-highlight={isNew ? 'true' : 'false'}
                  className={`rounded-md border px-4 py-2 ${isNew ? 'border-primary bg-primary/10 font-semibold' : ''}`}
                >
                  {fundador.name}
                </li>
              )
            })}
          </ul>

          <div className="mt-8 flex gap-3">
            <Link to="/quem-somos#manifesto"><Button variant="outline">Ler o Manifesto</Button></Link>
            <Link to="/projetos"><Button>Ver a 1ª Missão</Button></Link>
          </div>
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
