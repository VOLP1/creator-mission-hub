// src/pages/InfluIA.tsx
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { motion } from 'framer-motion'
import { Database, MessageSquare, ArrowRight, Clock, ClipboardList } from 'lucide-react'

export default function InfluIA() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  return (
    <div className="container max-w-4xl py-20 min-h-screen">
      {/* 1. TÍTULO */}
      <motion.div
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-4xl font-bold">Ato 2: A Ferramenta</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Conheça a Influ.IA — o "co-piloto anti-preguiça".
        </p>
      </motion.div>

      {/* 2. ALERTA */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          ...fadeIn,
          visible: { ...fadeIn.visible, transition: { ...fadeIn.visible.transition, delay: 0.2 } },
        }}
      >
        <Alert variant="default" className="my-12">
          <Clock className="h-4 w-4" />
          <AlertTitle>O Crowdfunding Começa em Breve!</AlertTitle>
          <AlertDescription>
            O vídeo completo do pitch (onde explicarei o RAG e o N8N) estará aqui em breve. Estamos 100% focados em construir o QG primeiro.
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* 3. VISUALIZAÇÃO DO FLUXO */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center"
        initial="hidden"
        animate="visible"
        variants={{
          ...fadeIn,
          visible: { ...fadeIn.visible, transition: { ...fadeIn.visible.transition, delay: 0.4 } },
        }}
      >
        {/* Bloco 1: O Cérebro */}
        <motion.div
          className="flex flex-col items-center p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Database className="w-12 h-12 text-primary" />
          <h3 className="mt-4 text-xl font-semibold">O Cérebro (RAG)</h3>
          <p className="text-muted-foreground">Nossa "Biblioteca Aberta" de táticas éticas, curada por humanos.</p>
        </motion.div>

        {/* Conector animado */}
        <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowRight className="w-10 h-10 text-muted-foreground hidden md:block" />
        </motion.div>

        {/* Bloco 2: Interface WhatsApp */}
        <motion.div
          className="flex flex-col items-center p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <MessageSquare className="w-12 h-12 text-green-500" />
          <h3 className="mt-4 text-xl font-semibold">A Interface (WhatsApp)</h3>
          <p className="text-muted-foreground">Acesso instantâneo a esse "cérebro" 24/7, onde você já está.</p>
        </motion.div>
      </motion.div>

      {/* 4. CTA: Voltar ao QG */}
      <motion.div
        className="mt-16"
        initial="hidden"
        animate="visible"
        variants={{
          ...fadeIn,
          visible: { ...fadeIn.visible, transition: { ...fadeIn.visible.transition, delay: 0.6 } },
        }}
      >
        <Card className="border-dashed">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <ClipboardList className="w-5 h-5 text-muted-foreground" />
              Sua Missão Atual (Ato 1)
            </CardTitle>
            <CardDescription>
              Enquanto o Ato 2 está sendo forjado, sua missão no QG é crucial. Volte para a Assembleia e nos ajude a definir o futuro.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild size="lg" className="w-full">
              <Link to="/assembleia">Voltar ao QG</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
