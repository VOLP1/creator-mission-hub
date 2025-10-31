import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuth } from '../contexts/AuthContext'

// UI (Shadcn/ui)
import { Button } from '../components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'

// 1. Schema de validação (igual ao do backend)
const missionSchema = z.object({
  mission_type: z.enum(['PHYSICAL', 'DIGITAL', 'COMMUNITY'], {
    required_error: 'Selecione uma Frente.',
  }),
  suggestion: z.string().min(10, 'Sua sugestão precisa ter pelo menos 10 caracteres.'),
})

type MissionFormValues = z.infer<typeof missionSchema>

// 2. A Função de Fetch (MutationFn)
// Ela precisa do token!
async function submitMission({ data, token }: { data: MissionFormValues; token: string | null }) {
  if (!token) {
    throw new Error('Você não está autenticado.')
  }

  const response = await fetch('/api/v1/missions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 3. O "crachá" sendo usado (o teste verifica isso)
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    let message = 'Falha ao enviar missão'
    try {
      const errorData = await response.json()
      message = errorData.message || message
    } catch {}
    throw new Error(message)
  }
  return response.json()
}

export default function Assembleia() {
  // 4. Pegar o token (crachá) do AuthContext
  const auth = useAuth() as any
  // Nota: manter compatibilidade mesmo que o AuthContext ainda não exponha 'token'
  const token: string | null = (auth?.token as string | undefined) ?? null

  const form = useForm<MissionFormValues>({
    resolver: zodResolver(missionSchema),
    defaultValues: {
      suggestion: '',
    },
  })

  // 5. O hook useMutation
  const { mutate, isPending } = useMutation({
    mutationFn: (data: MissionFormValues) => submitMission({ data, token }),
    onSuccess: () => {
      toast.success('Missão enviada! Obrigado, Fundador(a).')
      form.reset()
    },
    onError: (error: any) => {
      toast.error(error?.message ?? 'Falha ao enviar missão')
    },
  })

  const onSubmit = (data: MissionFormValues) => {
    mutate(data)
  }

  return (
    <div className="container max-w-2xl py-12">
      <h1 className="text-3xl font-bold">Assembleia de Fundação</h1>
      <p className="mt-2 text-muted-foreground">
        Este é o QG. Suas ideias definem nossas próximas missões.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Campo 1: Tipo de Missão (Select) */}
          <FormField
            control={form.control}
            name="mission_type"
            render={({ field }) => (
              <FormItem>
                {/* Conectar label ao trigger para acessibilidade do combobox */}
                <FormLabel id="mission-type-label">Frente de Batalha</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger aria-labelledby="mission-type-label">
                      <SelectValue placeholder="Selecione o tipo da missão..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PHYSICAL">Ação Física</SelectItem>
                    <SelectItem value="DIGITAL">Ação Digital</SelectItem>
                    <SelectItem value="COMMUNITY">Comunidade</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo 2: Sugestão (Textarea) */}
          <FormField
            control={form.control}
            name="suggestion"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="suggestion">Sua Sugestão</FormLabel>
                <FormControl>
                  <Textarea id="suggestion" placeholder="Descreva sua ideia de missão aqui..." rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Enviando...' : 'Enviar Missão'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
