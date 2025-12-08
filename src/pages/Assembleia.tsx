import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

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
import { Textarea } from '../components/ui/textarea'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Leaf, Signal, Users } from 'lucide-react'

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

  const base = import.meta.env.VITE_API_BASE_URL || ''

  const response = await fetch(`${base}/api/v1/missions`, {
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
      mission_type: 'PHYSICAL',
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

  const selectedType = form.watch('mission_type') || 'PHYSICAL'
  const bgForType: Record<string, string> = {
    PHYSICAL: '/images/home/mission-support-1600.avif',
    DIGITAL: '/images/home/mission-awareness-1600.avif',
    COMMUNITY: '/images/home/mission-unite-1600.avif',
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic background based on selected tab */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedType}
            src={bgForType[selectedType]}
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.08, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -8 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        {/* Cinematic readability overlays (sem blur para manter nitidez) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />
      </div>

      <div className="container max-w-2xl pt-24 pb-12 px-6 relative z-10">
        <WIPBanner />
        <h1 className="text-3xl md:text-4xl font-bold mt-8 text-background">Assembleia de Fundação</h1>
        <p className="mt-2 text-background/90">
          Este é o QG. Suas ideias definem nossas próximas missões.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Campo 1: Tipo de Missão (Tabs) */}
          <FormField
            control={form.control}
            name="mission_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-background">1. Escolha sua Frente de Batalha</FormLabel>
                <FormControl>
                  <Tabs
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="PHYSICAL">
                        <Leaf className="w-4 h-4 mr-2" />
                        Ação Física
                      </TabsTrigger>
                      <TabsTrigger value="DIGITAL">
                        <Signal className="w-4 h-4 mr-2" />
                        Ação Digital
                      </TabsTrigger>
                      <TabsTrigger value="COMMUNITY">
                        <Users className="w-4 h-4 mr-2" />
                        Comunidade
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </FormControl>
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
                <FormLabel htmlFor="suggestion" className="text-background">2. Descreva sua Sugestão de Missão</FormLabel>
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
    </div>
  )
}

function WIPBanner() {
  return (
    <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-transparent to-primary/5 p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <div className="text-xs md:text-sm uppercase tracking-widest text-primary font-semibold">Em desenvolvimento</div>
        <div className="text-sm md:text-base text-background/90">
          Estamos abrindo espaço para as primeiras propostas de missão. Enquanto isso, conheça o Manifesto e participe da Ação de Lançamento.
        </div>
      </div>
      <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center">
        <Link to="/quem-somos#manifesto">
          <Button variant="outline" className="w-full md:w-auto">
            Ler o Manifesto
          </Button>
        </Link>
        <Button asChild variant="outline" className="w-full md:w-auto whitespace-normal break-words text-center h-auto py-3">
          <Link to="/influ-ia">
            Conheça a Influ.IA (Em Breve)
          </Link>
        </Button>
      </div>
    </div>
  )
}
