import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { ArrowDownRight, ChevronDown, Quote, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

type QuemSomosProps = {
  onOpenManifesto?: () => void;
};

// Small helper for smooth reveal
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7 },
};

export default function QuemSomos({ onOpenManifesto }: QuemSomosProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.3 });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.25]);

  return (
    <div ref={containerRef} className="min-h-screen pt-20 bg-background overflow-x-clip">
  {/* Reading progress bar */}
      <motion.div style={{ scaleX: progress }} className="fixed left-0 top-0 h-1 origin-left bg-primary/80 z-40" />
      {/* Ambient animated blobs (desktop only) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden hidden md:block">
        <motion.div
          aria-hidden
          className="absolute -top-24 -left-24 w-[50vw] h-[50vw] rounded-full blur-3xl bg-primary/10"
          animate={{ x: [0, 40, -20, 0], y: [0, -20, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-24 -right-24 w-[45vw] h-[45vw] rounded-full blur-3xl bg-primary/5"
          animate={{ x: [0, -30, 10, 0], y: [0, 30, -10, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,hsl(var(--primary)/0.12),transparent_60%)]" />
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.p style={{ opacity: headerOpacity }} className="mb-3 text-sm uppercase tracking-widest text-primary">
            O Manifesto +Creator
          </motion.p>
          <motion.h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Uma página viva, não sobre quem somos, mas sobre o que defendemos.
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            Este é um convite para sentir, questionar e agir. Role com calma. Leia com presença. No fim, assine apenas se fizer sentido para você.
          </motion.p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" className="px-6" onClick={onOpenManifesto}>
              Assinar o Manifesto
            </Button>
            <a href="#manifesto" className="inline-flex items-center gap-2 text-primary hover:underline">
              Ler o manifesto <ArrowDownRight className="w-4 h-4" />
            </a>
          </div>
          <ScrollHint />
        </div>
      </section>

      {/* Removed pinned visual to avoid confusion and improve flow */}

      {/* Scrollytelling manifesto */}
      <section id="manifesto" className="py-10 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl space-y-24">
          <ManifestoBlock
            title="O que é a essência de criar conteúdo?"
            paragraphs={[
              "Por que as pessoas se expõem nas redes e colocam tempo e energia para criar algo e comunicar isso ao público?",
              "Existem pessoas genuínas — que se interessam tanto por um tema que sentem a necessidade de compartilhar conhecimento, experiência, vivência. Pessoas que querem construir uma comunidade, criar algo novo, inspirar, se conectar.",
              "Essas pessoas vêm perdendo espaço.",
            ]}
          />

          <ManifestoQuote quote="A ética foi substituída pela métrica." />
          <div className="hidden md:block">
            <Marquee text="A ética foi substituída pela métrica." />
          </div>

          <ManifestoBlock
            title="O sistema sabotou a qualidade"
            paragraphs={[
              "Criar para algoritmos passou a estimular a produção de conteúdo superficial.",
              "Quando o próprio sistema abusa do mecanismo de recompensa do cérebro humano, viciando-o em estímulos vazios, a qualidade deixa de competir de igual para igual.",
              "O conteúdo virou um empilhamento de técnicas, gatilhos e métodos com um único objetivo: capturar e reter atenção.",
            ]}
          />

          <ManifestoBlock
            title="A essência, sem os ruídos"
            icon={<Sparkles className="w-6 h-6 text-primary" />}
            paragraphs={[
              "Se deixarmos de lado esse sistema artificial que molda as redes hoje, o que sobra é a essência da criação.",
              "Pessoas apaixonadas por um tema, uma mensagem, um propósito. Isso conecta, alimenta emocionalmente e devolve propósito à vida.",
            ]}
            accent
          />

          <StepsBlock
            title="O processo humano da criação"
            steps={[
              { title: "Fascínio", desc: "A faísca. O encantamento puro pelo tema." },
              { title: "Paixão", desc: "Aprofundar, encontrar outros, formar comunidade." },
              { title: "Compartilhar", desc: "Quando transborda, nasce o desejo de dividir com o mundo." },
            ]}
          />

          <ManifestoBlock
            title="Quem é o culpado?"
            paragraphs={[
              "A internet não se tornou fútil do nada. Ideias ruins sempre existiram. O que mudou foi a facilidade de manipular mentes em escala — porque isso se tornou o modelo mais rentável.",
              "O ‘mal’ venceu ao se infiltrar nas engrenagens do sistema de incentivos.",
            ]}
          />

          <ManifestoBlock
            title="Como lutamos de volta?"
            icon={<ShieldCheck className="w-6 h-6 text-primary" />}
            paragraphs={[
              "Precisamos nos unir. Juntar quem ainda cria, inspira e conecta. Fortalecer esses grupos. Criar ferramentas, dar munição, abrir espaço.",
              "O movimento +Creator surge como esse canal — para canalizar a atenção de quem quer lutar de volta e oferecer novas alternativas.",
            ]}
          />

          {/* Steps already presented acima; evitar duplicação */}

          <TwoColBlock
            title="A Influ.IA: co-piloto anti-preguiça"
            bullets={[
              "Não terceiriza sua criatividade; parte da sua essência.",
              "Questiona ideias, organiza, cuida da burocracia para você focar na arte.",
              "Não cria do zero: trabalha a partir do seu áudio, rascunho ou ideia bruta.",
              "Objetivo: tornar o conteúdo genuíno tão rápido e competitivo quanto o lixo digital.",
            ]}
            body="Com o avanço das inteligências artificiais, já é possível ‘não criar e ser um criador’. Nossa resposta é usar a IA para potencializar criadores de verdade — não para substituí-los."
          />

          <QASection />

          <PledgeSection onOpenManifesto={onOpenManifesto} />

          <CalloutAction onOpenManifesto={onOpenManifesto} />
        </div>
      </section>
    </div>
  );
}

function ScrollHint() {
  return (
    <a href="#manifesto" className="group absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-14 inline-flex flex-col items-center gap-2 text-primary/90">
      <span className="text-xs uppercase tracking-widest opacity-80">Role para ler</span>
      <motion.span
        aria-hidden
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-full border border-primary/50 p-1.5"
      >
        <ChevronDown className="w-4 h-4" />
      </motion.span>
    </a>
  );
}

function ManifestoBlock({ title, paragraphs, accent, icon }: { title: string; paragraphs: string[]; accent?: boolean; icon?: React.ReactNode }) {
  return (
    <div className={`rounded-3xl border ${accent ? "bg-primary/5 border-primary/20" : "bg-card border-border"} p-6 md:p-10 shadow-sm`}>
      <motion.h2 {...fadeUp as any} className="text-2xl md:text-4xl font-bold flex items-center gap-3">
        {icon}
        <span>{title}</span>
      </motion.h2>
      <div className="mt-5 space-y-4">
        {paragraphs.map((p, i) => (
          <motion.p key={i} {...fadeUp as any} transition={{ duration: 0.6, delay: i * 0.05 }} className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {p}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

function ManifestoQuote({ quote }: { quote: string }) {
  return (
    <motion.blockquote {...fadeUp as any} className="relative p-8 md:p-12 rounded-3xl border bg-muted/30">
      <Quote className="absolute -top-4 -left-4 w-10 h-10 text-primary/30" />
      <p className="text-2xl md:text-3xl font-semibold leading-snug">{quote}</p>
    </motion.blockquote>
  );
}

function Marquee({ text }: { text: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <div className="py-3 whitespace-nowrap">
        <motion.div
          aria-hidden
          className="inline-block will-change-transform"
          animate={{ x: [0, -600] }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-6 text-primary/80 font-semibold">
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function StepsBlock({ title, steps }: { title: string; steps: { title: string; desc: string }[] }) {
  return (
    <div className="rounded-3xl border bg-card p-6 md:p-10">
      <motion.h3 {...fadeUp as any} className="text-xl md:text-2xl font-semibold mb-6">
        {title}
      </motion.h3>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <motion.div key={s.title} {...fadeUp as any} transition={{ duration: 0.5, delay: i * 0.05 }} className="rounded-2xl border bg-background p-5">
            <div className="text-4xl font-black text-primary/20">{i + 1}</div>
            <div className="mt-2 font-bold text-lg">{s.title}</div>
            <div className="text-muted-foreground">{s.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TwoColBlock({ title, body, bullets }: { title: string; body: string; bullets: string[] }) {
  return (
    <div className="rounded-3xl border bg-card p-6 md:p-10">
      <motion.h3 {...fadeUp as any} className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
        <Rocket className="w-6 h-6 text-primary" /> {title}
      </motion.h3>
      <div className="grid md:grid-cols-5 gap-6 items-start">
        <motion.p {...fadeUp as any} className="md:col-span-3 text-muted-foreground leading-relaxed">
          {body}
        </motion.p>
        <ul className="md:col-span-2 space-y-3">
          {bullets.map((b, i) => (
            <motion.li key={i} {...fadeUp as any} transition={{ duration: 0.5, delay: i * 0.04 }} className="flex items-start gap-3">
              <div className="mt-1 w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm md:text-base">{b}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CalloutAction({ onOpenManifesto }: { onOpenManifesto?: () => void }) {
  return (
    <div className="rounded-3xl border bg-gradient-to-br from-primary/10 via-transparent to-primary/5 p-6 md:p-10 text-center">
      <motion.h3 {...fadeUp as any} className="text-2xl md:text-4xl font-extrabold">
        Não queremos viralizar. Queremos regenerar.
      </motion.h3>
      <motion.p {...fadeUp as any} className="mt-4 text-muted-foreground max-w-2xl mx-auto">
        Começamos com uma Ação de Lançamento: uma limpeza física real, bancada por nós, para provar nosso caráter. Depois, lançaremos o crowdfunding para financiar a Influ.IA e ajudar a limpar o digital.
      </motion.p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button size="lg" onClick={onOpenManifesto}>Assinar o Manifesto</Button>
        <Link to="/projetos">
          <Button size="lg" variant="outline">Participar da Limpeza</Button>
        </Link>
      </div>
    </div>
  );
}

function QASection() {
  return (
    <div className="rounded-3xl border bg-card p-6 md:p-10">
      <motion.h3 {...fadeUp as any} className="text-2xl md:text-3xl font-bold mb-4">
        Perguntas que importam
      </motion.h3>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="q1">
          <AccordionTrigger>Onde está o conteúdo? Pra onde foi a conexão humana?</AccordionTrigger>
          <AccordionContent>
            Ela existe onde as paixões são autênticas. Nosso objetivo é devolver palco, ferramentas e incentivo a quem cria com propósito.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>O que está na raiz do problema?</AccordionTrigger>
          <AccordionContent>
            Um sistema de incentivos que recompensa ruído e vicia atenção. Combatemos com comunidade, ética e ferramentas certas.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger>IA vai matar a criatividade?</AccordionTrigger>
          <AccordionContent>
            Não se usada como co‑piloto. A Influ.IA existe para elevar a arte — não para substituí-la.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function PledgeSection({ onOpenManifesto }: { onOpenManifesto?: () => void }) {
  const [value, setValue] = useState<number>(0);
  const unlocked = value >= 100;
  return (
    <div className="rounded-3xl border bg-card p-6 md:p-10">
      <motion.h3 {...fadeUp as any} className="text-2xl md:text-3xl font-bold mb-2">
        Compromisso real
      </motion.h3>
      <motion.p {...fadeUp as any} className="text-muted-foreground mb-6">
        Arraste para 100% se você acredita que arte, verdade e propósito valem mais que métricas.
      </motion.p>
      <div className="max-w-xl mx-auto">
        <Slider value={[value]} max={100} step={1} onValueChange={(v) => setValue(v[0] ?? 0)} />
        <div className="mt-2 text-center text-sm text-muted-foreground">{value}%</div>
        <div className="mt-6 text-center">
          <Button size="lg" disabled={!unlocked} onClick={onOpenManifesto} className={unlocked ? "" : "opacity-60"}>
            {unlocked ? "Assinar o Manifesto agora" : "Confirme seu compromisso"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function PinnedScrolly({
  steps,
}: {
  steps: { title: string; desc: string; tint?: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.04, 0.98]);
  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          {/* Visual */}
          <motion.div style={{ rotate, scale }} className="aspect-[4/3] rounded-3xl border overflow-hidden bg-gradient-to-br from-muted to-background relative">
            <motion.div
              className="absolute inset-0"
              style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0.8]) }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,hsl(var(--primary)/.15),transparent)]" />
            </motion.div>
          </motion.div>
          {/* Steps */}
          <div className="space-y-10 py-16">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                className={`rounded-2xl border p-5 bg-background/70 backdrop-blur ${s.tint ? `bg-gradient-to-br ${s.tint}` : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <div className="text-xs uppercase tracking-widest text-primary/70">Etapa {i + 1}</div>
                <div className="text-xl font-bold mt-1">{s.title}</div>
                <div className="text-muted-foreground">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
