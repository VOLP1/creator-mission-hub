import React, { useRef } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

const signManifestoSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  // Order matters so empty value triggers the required message before email format
  email: z.string().min(1, 'E-mail é obrigatório').email('Formato de e-mail inválido'),
})

type SignManifestoData = z.infer<typeof signManifestoSchema>

interface ManifestoSignModalProps {
  onClose?: () => void
}

export default function ManifestoSignModal({ onClose }: ManifestoSignModalProps) {
  const navigate = useNavigate()

  const form = useForm<SignManifestoData>({
    resolver: zodResolver(signManifestoSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  async function signManifesto(data: SignManifestoData) {
    const response = await fetch('/api/v1/manifesto/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      let message = 'Falha ao assinar'
      try {
        const errorData = await response.json()
        message = errorData?.message || message
      } catch {}
      throw new Error(message)
    }

    return response.json() as Promise<{ id: string; name: string; created_at?: string }>
  }

  const toastIdRef = useRef<string | number | undefined>(undefined)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signManifesto,
  })

  async function onSubmit(data: SignManifestoData) {
    toastIdRef.current = toast.loading('Enviando assinatura...')
    try {
      const result = await mutateAsync(data)
      const newName = (result as any)?.name ?? data.name
      toast.success('Bem-vindo, Fundador(a)!', { id: toastIdRef.current })
      navigate('/fundadores', { state: { newName } })
      onClose && onClose()
    } catch (error: any) {
      const message = error?.message || 'Falha ao assinar'
      toast.error(message, { id: toastIdRef.current })
    } finally {
      toastIdRef.current = undefined
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Assine o Manifesto. Torne-se um Fundador.</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground mt-2">
          Seu nome aparecerá publicamente no "Muro dos Fundadores". Seu e-mail permanecerá privado.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome ou Pseudônimo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Seu nome ou pseudônimo" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="seu@exemplo.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="submit" disabled={isPending}>Confirmar Assinatura</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
