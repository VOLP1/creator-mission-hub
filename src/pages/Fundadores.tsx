import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

type Fundador = {
  id: number | string
  name: string
  created_at?: string
}

async function fetchSignatures(): Promise<Fundador[]> {
  const response = await fetch('/api/v1/manifesto/signatures')
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
    return <div>Carregando fundadores...</div>
  }

  if (isError) {
    return <div>Não foi possível carregar o Muro.</div>
  }

  return (
    <section>
      <h1 className="text-3xl font-bold">O Muro dos Fundadores</h1>
      <ul className="mt-8">
        {fundadores?.map((fundador) => {
          const isNew = fundador.name === newName
          return (
            <li
              key={fundador.id}
              data-highlight={isNew ? 'true' : 'false'}
              className={isNew ? 'text-yellow-400 font-bold' : ''}
            >
              {fundador.name}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
