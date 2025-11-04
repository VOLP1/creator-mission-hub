import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Calendar, TrendingUp, Sparkles } from "lucide-react";

export default function Projetos() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-hope">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="w-16 h-16 text-primary-foreground mx-auto mb-8" />
            <h1 className="text-hero text-primary-foreground mb-6">
              Nossa Primeira Missão
            </h1>
            <h2 className="text-2xl md:text-3xl text-primary-foreground/90 font-light max-w-3xl mx-auto">
              Apoiamos a Influ.IA
            </h2>
            <p className="text-xl text-primary-foreground/80 mt-6 max-w-2xl mx-auto">
              Encontramos a primeira ferramenta que é uma solução real para o
              lixo digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* O Endosso */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Por que a Influ.IA?
              </h2>
              <h3 className="text-3xl text-primary mb-6">
                Porque ela é a solução.
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Analisamos a Influ.IA e acreditamos genuinamente que este produto
                é uma ferramenta poderosa para combater a exaustão do criador e o
                "lixo digital".
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Ela liberta o criador do trabalho operacional... para que ele
                possa criar com alma.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-cinematic"
            >
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1000&q=80"
                alt="Imagem representativa da Influ.IA"
                className="w-full h-full object-cover opacity-50"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* O Compromisso - DESTAQUE MÁXIMO */}
      <section className="py-32 px-6 bg-secondary relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-3xl" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-section-title text-secondary-foreground mb-8">
              O Compromisso +Creator com a Sua Ação
            </h2>

            <div className="bg-secondary-foreground/10 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-cinematic">
              <p className="text-2xl md:text-3xl text-secondary-foreground font-light mb-12">
                Para cada
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                <CounterDisplay value={100} prefix="R$" color="primary" />
                <span className="text-5xl text-secondary-foreground font-bold">
                  =
                </span>
                <CounterDisplay
                  value={1}
                  suffix="kg"
                  label="de lixo removido"
                  color="primary"
                />
              </div>

              <p className="text-xl text-secondary-foreground/90 max-w-2xl mx-auto">
                Que VOCÊ doar ao crowdfunding da Influ.IA, NÓS (o Movimento
                +Creator) vamos remover das ruas.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features da Influ.IA */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-section-title mb-6">
              A Ferramenta que Você Ajuda a Construir
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ao apoiar o crowdfunding, você ajuda no desenvolvimento de uma ferramenta
              poderosa. Isso é o que ela faz:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: FileText,
                title: "Apoio em Roteirização",
                description: "Gere briefings e roteiros no seu estilo",
              },
              {
                icon: Calendar,
                title: "Coordenação de Equipe",
                description: "Coordene edições e agendamentos",
              },
              {
                icon: TrendingUp,
                title: "Gestão Financeira",
                description: "Organize suas finanças de criador",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-2xl shadow-cinematic hover:shadow-glow transition-all duration-300 group"
              >
                <feature.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-section-title text-center mb-16"
          >
            Perguntas Frequentes
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-background rounded-xl px-6 shadow-md"
              >
                <AccordionTrigger className="text-lg font-semibold">
                  Para onde vai meu R$100?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  100% da sua doação vai diretamente para o crowdfunding da
                  Influ.IA. O compromisso de remover 1kg de lixo é custeado pelo
                  Movimento +Creator através de parcerias e apoiadores.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-background rounded-xl px-6 shadow-md"
              >
                <AccordionTrigger className="text-lg font-semibold">
                  Quando o lixo será removido?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Realizamos mutirões de limpeza mensais. Você receberá relatórios
                  fotográficos e métricas de impacto a cada ação.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-background rounded-xl px-6 shadow-md"
              >
                <AccordionTrigger className="text-lg font-semibold">
                  O que é a Influ.IA?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  A Influ.IA é uma ferramenta de gestão para criadores de conteúdo
                  que automatiza tarefas operacionais, liberando tempo para a
                  criação autêntica.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-background rounded-xl px-6 shadow-md"
              >
                <AccordionTrigger className="text-lg font-semibold">
                  Quem são vocês do +Creator?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Somos um movimento de jovens idealistas que acreditam em um
                  futuro digital com propósito. Conheça nossa história completa na
                  página Quem Somos.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-section-title mb-12">Pronto para sua missão?</h2>

            <a
              href="https://benfeitoria.com/projeto/influ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-2xl px-16 py-8 shadow-glow hover:scale-105 transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">Apoiar Agora</span>
                {/* Shimmer Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </Button>
            </a>

            <p className="text-sm text-muted-foreground mt-6">
              Você será redirecionado para a página da campanha na Benfeitoria
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Counter Display Component
function CounterDisplay({
  value,
  prefix = "",
  suffix = "",
  label = "",
  color = "secondary-foreground",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  color?: string;
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
    <div ref={ref} className="text-center">
      <div className={`text-6xl md:text-7xl font-bold text-${color}`}>
        {prefix}
        {count}
        {suffix && <span className="ml-2">{suffix}</span>}
      </div>
      {label && (
        <div className={`text-xl text-${color} mt-2 font-semibold`}>{label}</div>
      )}
    </div>
  );
}
