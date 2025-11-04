import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Target, Users, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home({ onOpenManifesto }: { onOpenManifesto?: () => void }) {
  const surgirRef = useRef<HTMLDivElement>(null);
  const [sectionState, setSectionState] = useState<'before' | 'sticky' | 'after'>('before');
  const [wipeProgress, setWipeProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!surgirRef.current) return;

      const rect = surgirRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Antes da seção chegar no topo
      if (sectionTop > 0) {
        setSectionState('before');
        setWipeProgress(0);
        setShowContent(false);
      }
      // Seção está grudada no topo (sticky)
      else if (sectionTop <= 0 && sectionTop + sectionHeight > windowHeight) {
        setSectionState('sticky');
        
        // Calcula o progresso do wipe (0 a 1) de forma mais suave
        const scrolled = Math.abs(sectionTop);
        const totalScroll = sectionHeight - windowHeight;
        const progress = scrolled / totalScroll;
        setWipeProgress(Math.min(Math.max(progress, 0), 1));

        // Quando o progresso passar de 70%, mostra o conteúdo e NÃO esconde mais
        if (progress > 0.7) {
          setShowContent(true);
        }
      }
      // Seção já passou - LIBERA para a próxima seção
      else if (sectionTop + sectionHeight <= windowHeight) {
        setSectionState('after');
        setWipeProgress(1);
        setShowContent(true); // Mantém o conteúdo visível
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
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
            animate={{ y: [120, 130, 120] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-background opacity-60" />
          </motion.div>
        </div>
      </section>

      {/* O Problema - Lixo Digital */}
      <section className="relative min-h-screen bg-[hsl(var(--alarm))] py-32 px-6 overflow-hidden" style={{ zIndex: 0 }}>
        <ParallaxBackground imageSrc="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&q=80" />
        <div className="container mx-auto relative z-10">
          <TensionSection
            title="Estamos viciados em Lixo Digital."
            description="O 'fast-food' mental. Conteúdo viciante e sem valor que gera ansiedade. Os algoritmos recompensam o choque, não a criatividade."
            imageSrc="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
          />
        </div>
      </section>

      {/* O Problema - Lixo Físico */}
      <section className="relative min-h-screen bg-[hsl(var(--alarm))] py-32 px-6 overflow-hidden" style={{ zIndex: 0 }}>
        <ParallaxBackground imageSrc="https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=1920&q=80" />
        <div className="container mx-auto relative z-10">
          <TensionSection
            title="E apáticos ao Lixo Físico."
            description="A desconexão digital nos torna indiferentes ao mundo real. Nossas ruas e praças estão pagando o preço."
            imageSrc="https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&q=80"
            reverse
          />
        </div>
      </section>

      {/* O Problema - Criadores Exaustos */}
      <section className="relative min-h-screen bg-[hsl(var(--alarm))] py-32 px-6 overflow-hidden" style={{ zIndex: 0 }}>
        <ParallaxBackground imageSrc="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80" />
        <div className="container mx-auto relative z-10">
          <TensionSection
            title="Os bons criadores estão desistindo."
            description="O sistema força os bons a escolherem: fazer polêmica ou desaparecer."
            imageSrc="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"
          />
        </div>
      </section>

      {/* O Ponto de Virada - "Surgir" Animation */}
      <div ref={surgirRef} style={{ height: '300vh', position: 'relative', backgroundColor: '#111111' }}>
        {/* Fixed/Absolute Content */}
        <div 
          style={{
            position: sectionState === 'before' ? 'relative' : (sectionState === 'sticky' ? 'fixed' : 'absolute'),
            top: sectionState === 'sticky' ? 0 : 'auto',
            bottom: sectionState === 'after' ? 0 : 'auto',
            left: 0,
            right: 0,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 10,
            transition: 'all 0.3s ease-out'
          }}
        >
          {/* Fundo preto */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            backgroundColor: '#111111',
            zIndex: 1
          }} />

          {/* Wipe branco que sobe */}
          <div
            style={{ 
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: `${wipeProgress * 100}%`,
              backgroundColor: '#FAF9F6',
              zIndex: 2
            }}
          />

          {/* Conteúdo da próxima seção que aparece pelas laterais e PERMANECE */}
          {showContent && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                pointerEvents: 'none',
                gap: '2rem'
              }}
            >
              {/* Texto que entra pela esquerda */}
              <motion.h2
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-section-title text-foreground"
                style={{ textAlign: 'center' }}
              >
                Nós somos o +Creator.
              </motion.h2>

              {/* Texto que entra pela direita */}
              <motion.p
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl"
                style={{ textAlign: 'center' }}
              >
                Somos um grupo de jovens que se cansou de esperar e decidiu
                construir o futuro.
              </motion.p>

              {/* Foto que entra de baixo */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                className="relative w-full max-w-4xl h-[40vh] rounded-2xl overflow-hidden shadow-cinematic"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>
            </div>
          )}

          {/* Texto "mas existe uma solução" que desaparece */}
          <h1 
            style={{ 
              position: 'relative', 
              zIndex: 20,
              color: '#FF6600',
              textAlign: 'center',
              padding: '0 1.5rem',
              transition: 'opacity 0.3s ease-out',
              opacity: showContent ? 0 : 1
            }} 
            className="text-hero"
          >
            ...mas existe uma solução!
          </h1>
        </div>
      </div>

      {/* O Que Fazemos - Desktop: Bento Box | Mobile: Full Screen */}
      
      {/* MOBILE: Full-Screen Cards */}
      <div className="block md:hidden">
        <MissionCardFullScreen
          icon={Megaphone}
          title="Conscientizar"
          description="Mostramos a realidade do lixo digital e físico com dados e histórias reais."
          bgImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80"
          accentColor="hsl(var(--alarm))"
        />
        <MissionCardFullScreen
          icon={Users}
          title="Unir"
          description="Conectamos criadores, ativistas e pessoas que querem mudança."
          bgImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
          accentColor="hsl(var(--secondary))"
        />
        <MissionCardFullScreen
          icon={Target}
          title="Apoiar"
          description="Endossamos e promovemos projetos que são soluções reais."
          bgImage="https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=1200&q=80"
          accentColor="hsl(var(--primary))"
        />
      </div>

      {/* DESKTOP: Bento Box Style */}
      <section className="hidden md:block py-20 px-6 bg-background">
        <div className="container mx-auto">
          {/* Bento Grid */}
          <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto" style={{ gridTemplateRows: 'auto auto' }}>
            
            {/* Card 1: CONSCIENTIZAR - Grande (ocupa 2 linhas na esquerda) */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl shadow-cinematic hover:shadow-glow transition-all duration-500 group cursor-pointer row-span-2"
              style={{ minHeight: '600px' }}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
              
              {/* Content */}
              <div className="relative z-10 p-12 h-full flex flex-col justify-end">
                <Megaphone className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-5xl font-bold text-background mb-4">Conscientizar</h3>
                <p className="text-xl text-background/90 max-w-md">
                  Mostramos a realidade do lixo digital e físico com dados e histórias reais.
                </p>
              </div>
            </motion.div>

            {/* Card 2: UNIR - Médio (topo direito) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl shadow-cinematic hover:shadow-glow transition-all duration-500 group cursor-pointer"
              style={{ minHeight: '290px' }}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--secondary))] via-[hsl(var(--secondary))]/80 to-[hsl(var(--secondary))]/40" />
              
              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <Users className="w-12 h-12 text-background mb-4" />
                <h3 className="text-3xl font-bold text-background mb-2">Unir</h3>
                <p className="text-lg text-background/90">
                  Conectamos criadores, ativistas e pessoas que querem mudança.
                </p>
              </div>
            </motion.div>

            {/* Card 3: APOIAR - Médio (baixo direito) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl shadow-cinematic hover:shadow-glow transition-all duration-500 group cursor-pointer"
              style={{ minHeight: '290px' }}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=1200&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))] via-[hsl(var(--primary))]/80 to-[hsl(var(--primary))]/40" />
              
              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <Target className="w-12 h-12 text-background mb-4" />
                <h3 className="text-3xl font-bold text-background mb-2">Apoiar</h3>
                <p className="text-lg text-background/90">
                  Endossamos e promovemos projetos que são soluções reais.
                </p>
              </div>
            </motion.div>

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

            <Button
              size="lg"
              onClick={() => onOpenManifesto && onOpenManifesto()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-12 py-6 shadow-glow hover:scale-105 transition-all"
            >
              Assine o Manifesto
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Links de Aprofundamento - SPLIT SCREEN CINEMATOGRÁFICO */}
      <section className="relative h-screen flex flex-col md:flex-row">
        {/* LADO ESQUERDO - Quer ver todos os dados? */}
        <Link 
          to="/alarme" 
          className="group relative flex-1 overflow-hidden transition-all duration-700 hover:flex-[1.5]"
        >
          {/* Background com Parallax */}
          <div className="absolute inset-0">
            <ParallaxBackground imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80" />
          </div>
          
          {/* Overlay escuro que clareia no hover */}
          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/40 transition-all duration-700" />
          
          {/* Overlay gradiente com cor de destaque */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--alarm))]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

          {/* Conteúdo */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-lg"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-background mb-6 group-hover:scale-110 transition-transform duration-700">
                Quer ver todos os dados?
              </h3>
              
              {/* Descrição que aparece no hover */}
              <p className="text-lg md:text-xl text-background/80 mb-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                Explore o relatório completo com todos os números, estatísticas e impacto do lixo digital e físico.
              </p>

              {/* Botão */}
              <Button
                size="lg"
                className="bg-[hsl(var(--alarm))] hover:bg-[hsl(var(--alarm))]/90 text-background text-xl px-12 py-6 shadow-glow opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              >
                Veja o Relatório Completo
              </Button>
            </motion.div>

            {/* Indicador de hover */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-background/60 group-hover:text-background transition-all duration-700">
              <p className="text-sm uppercase tracking-wider">Clique para explorar</p>
            </div>
          </div>

          {/* Linha divisória */}
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-background/30 to-transparent" />
        </Link>

        {/* LADO DIREITO - Quer conhecer nosso Manifesto? */}
        <Link 
          to="/quem-somos" 
          className="group relative flex-1 overflow-hidden transition-all duration-700 hover:flex-[1.5]"
        >
          {/* Background com Parallax */}
          <div className="absolute inset-0">
            <ParallaxBackground imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" />
          </div>
          
          {/* Overlay escuro que clareia no hover */}
          <div className="absolute inset-0 bg-black/70 group-hover:bg-black/40 transition-all duration-700" />
          
          {/* Overlay gradiente com cor de destaque */}
          <div className="absolute inset-0 bg-gradient-to-bl from-[hsl(var(--primary))]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

          {/* Conteúdo */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center max-w-lg"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-background mb-6 group-hover:scale-110 transition-transform duration-700">
                Quer conhecer nosso Manifesto?
              </h3>
              
              {/* Descrição que aparece no hover */}
              <p className="text-lg md:text-xl text-background/80 mb-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                Entenda por que lutamos contra o lixo digital, os princípios que nos orientam e como queremos reconstruir a internet.
              </p>

              {/* Botão */}
              <Button
                size="lg"
                className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-primary-foreground text-xl px-12 py-6 shadow-glow opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              >
                Leia nosso Manifesto
              </Button>
            </motion.div>

            {/* Indicador de hover */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-background/60 group-hover:text-background transition-all duration-700">
              <p className="text-sm uppercase tracking-wider">Clique para explorar</p>
            </div>
          </div>
        </Link>
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

// ParallaxBackground - Componente simples de fundo parallax
function ParallaxBackground({ imageSrc }: { imageSrc: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="absolute inset-0 w-full h-[120%] -top-[10%]"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
    </motion.div>
  );
}

// MissionCardFullScreen - Componente para Mobile (Full Screen)
function MissionCardFullScreen({
  icon: Icon,
  title,
  description,
  bgImage,
  accentColor,
}: {
  icon: any;
  title: string;
  description: string;
  bgImage: string;
  accentColor: string;
}) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background com Parallax */}
      <ParallaxBackground imageSrc={bgImage} />
      
      {/* Overlay com cor de destaque */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: `linear-gradient(180deg, ${accentColor}00 0%, ${accentColor}99 100%)` 
        }} 
      />

      {/* Conteúdo */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
        className="relative z-10 text-center px-8 max-w-lg"
      >
        <Icon className="w-20 h-20 text-background mx-auto mb-8" />
        <h2 className="text-5xl font-bold text-background mb-6">{title}</h2>
        <p className="text-2xl text-background/90">{description}</p>
      </motion.div>
    </section>
  );
}
