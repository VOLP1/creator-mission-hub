import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Target, Users, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const surgirRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: surgirRef,
    offset: ["start end", "end start"],
  });

  const wipeHeight = useTransform(scrollYProgress, [0.3, 0.7], ["0%", "100%"]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[hsl(var(--alarm))]">
        {/* Video Background Placeholder */}
        <div className="absolute inset-0 bg-gradient-tension opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')] bg-cover bg-center opacity-20" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-hero text-background mb-6"
          >
            O Herói é Você.
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-2xl md:text-3xl text-background/90 font-light mb-12 max-w-3xl mx-auto"
          >
            O herói é quem decide sair da zona de conforto e agir. Nós somos o
            mentor, mas VOCÊ é a força da mudança.
          </motion.h2>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-background opacity-60" />
          </motion.div>
        </div>
      </section>

      {/* O Problema - Lixo Digital */}
      <section className="min-h-screen bg-[hsl(var(--alarm))] py-32 px-6">
        <div className="container mx-auto">
          <TensionSection
            title="Estamos viciados em Lixo Digital."
            description="O 'fast-food' mental. Conteúdo viciante e sem valor que gera ansiedade. Os algoritmos recompensam o choque, não a criatividade."
            imageSrc="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
          />
        </div>
      </section>

      {/* O Problema - Lixo Físico */}
      <section className="min-h-screen bg-[hsl(var(--alarm))] py-32 px-6">
        <div className="container mx-auto">
          <TensionSection
            title="E apáticos ao Lixo Físico."
            description="A desconexão digital nos torna indiferentes ao mundo real. Nossas ruas e praças estão pagando o preço."
            imageSrc="https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&q=80"
            reverse
          />
        </div>
      </section>

      {/* O Problema - Criadores Exaustos */}
      <section className="min-h-screen bg-[hsl(var(--alarm))] py-32 px-6">
        <div className="container mx-auto">
          <TensionSection
            title="Os bons criadores estão desistindo."
            description="O sistema força os bons a escolherem: fazer polêmica ou desaparecer."
            imageSrc="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"
          />
        </div>
      </section>

      {/* O Ponto de Virada - "Surgir" Animation */}
      <section ref={surgirRef} className="relative h-[200vh]">
        {/* Sticky Text */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[hsl(var(--alarm))]" />

          {/* Wipe-up Cream Background */}
          <motion.div
            style={{ height: wipeHeight }}
            className="absolute bottom-0 left-0 right-0 bg-background"
          />

          {/* Fixed Text */}
          <h1 className="relative z-20 text-hero text-primary px-6 text-center">
            ...mas existe uma solução!
          </h1>
        </div>
      </section>

      {/* A Solução - Apresentação */}
      <section className="min-h-screen bg-background py-32 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section-title text-foreground mb-8">
              Nós somos o +Creator.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-16">
              Somos um grupo de jovens que se cansou de esperar e decidiu
              construir o futuro. Nascemos da inconformidade.
            </p>
          </motion.div>

          <div className="mt-20 relative h-[60vh] rounded-2xl overflow-hidden shadow-cinematic">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      </section>

      {/* O Que Fazemos */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Megaphone,
                title: "Conscientizar",
                description:
                  "Mostramos a realidade do lixo digital e físico com dados e histórias reais.",
              },
              {
                icon: Users,
                title: "Unir",
                description:
                  "Conectamos criadores, ativistas e pessoas que querem mudança.",
              },
              {
                icon: Target,
                title: "Apoiar",
                description:
                  "Endossamos e promovemos projetos que são soluções reais.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-2xl shadow-cinematic hover:shadow-glow transition-all duration-300"
              >
                <item.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* A Missão */}
      <section className="py-32 px-6 bg-secondary">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-section-title text-secondary-foreground mb-8">
              Nossa Primeira Missão: Apoiamos a Solução Real.
            </h2>
            <p className="text-xl text-secondary-foreground/90 mb-12">
              Endossamos o crowdfunding da Influ.IA, uma ferramenta que
              acreditamos ser a solução real para o lixo digital, pois liberta
              os criadores para criarem com alma.
            </p>

            <div className="bg-secondary-foreground/10 backdrop-blur-sm rounded-2xl p-12 mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-6">
                E o seu apoio tem impacto duplo:
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-secondary-foreground">
                <CounterDisplay value={100} prefix="R$" />
                <span className="text-4xl">=</span>
                <CounterDisplay value={1} suffix="kg de lixo removido" />
              </div>
            </div>

            <Link to="/projetos">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-12 py-6 shadow-glow hover:scale-105 transition-all"
              >
                Participe da Missão
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Links de Aprofundamento */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <DeepDiveCard
              title="Quer ver todos os dados?"
              buttonText="Veja o Relatório Completo"
              link="/alarme"
            />
            <DeepDiveCard
              title="Quer conhecer nossa equipe?"
              buttonText="Leia nosso Manifesto"
              link="/quem-somos"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper Components
function TensionSection({
  title,
  description,
  imageSrc,
  reverse = false,
}: {
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
      className={`grid md:grid-cols-2 gap-12 items-center ${
        reverse ? "md:grid-flow-dense" : ""
      }`}
    >
      <div className={reverse ? "md:col-start-2" : ""}>
        <h2 className="text-section-title text-background mb-6">{title}</h2>
        <p className="text-xl text-background/80">{description}</p>
      </div>
      <div
        className={`relative h-[400px] rounded-2xl overflow-hidden shadow-cinematic ${
          reverse ? "md:col-start-1 md:row-start-1" : ""
        }`}
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover grayscale"
        />
      </div>
    </motion.div>
  );
}

function CounterDisplay({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-5xl font-bold">
      {prefix}
      {count}
      {suffix && <span className="text-2xl ml-2">{suffix}</span>}
    </div>
  );
}

function DeepDiveCard({
  title,
  buttonText,
  link,
}: {
  title: string;
  buttonText: string;
  link: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-card p-12 rounded-2xl shadow-cinematic hover:shadow-glow transition-all duration-300"
    >
      <h3 className="text-3xl font-bold mb-8">{title}</h3>
      <Link to={link}>
        <Button
          size="lg"
          variant="outline"
          className="w-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
          {buttonText}
        </Button>
      </Link>
    </motion.div>
  );
}
