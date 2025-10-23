import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuemSomos() {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ["start 0.8", "end 0.2"],
  });

  // Multi-phase scroll animation: pause -> scroll -> pause
  const x = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.75, 1], 
    ["0%", "0%", "-75%", "-75%"]
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[hsl(var(--alarm))]/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-hero text-background mb-6"
          >
            Nós não somos uma empresa.
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-4xl text-background/90 font-light"
          >
            Somos jovens com um propósito.
          </motion.h2>
        </div>
      </section>

      {/* Timeline - Nossa História */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-section-title text-center mb-20"
          >
            Onde a Inconformidade Ganhou Vida
          </motion.h2>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

            {/* Timeline Items */}
            <TimelineItem
              year="2023"
              title="A Inquietação"
              description="Vimos nossos amigos criadores exaustos e nossos parques sujos."
              side="left"
            />
            <TimelineItem
              year="2024"
              title="A Ideia"
              description="E se pudéssemos conectar o combate ao lixo digital com o lixo real?"
              side="right"
              imageSrc="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80"
            />
            <TimelineItem
              year="2025"
              title="O Movimento"
              description="O +Creator nasce oficialmente."
              side="left"
            />
          </div>
        </div>
      </section>

      {/* Manifesto - Horizontal Scroll */}
      <section ref={horizontalRef} className="h-[300vh] bg-background">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <motion.div style={{ x }} className="flex gap-12 px-6">
            {/* Pilar 1 */}
            <div className="min-w-screen flex items-center justify-center px-12">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Lightbulb className="w-16 h-16 text-primary mb-8" />
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">
                    Nosso Sonho
                  </h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Acreditamos em um ecossistema digital com alma, onde os
                    criadores têm tempo para criar com propósito, e o público
                    consome conteúdo que realmente agrega valor.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Pilar 2 - Imagem */}
            <div className="min-w-screen flex items-center justify-center px-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative w-full max-w-2xl h-[70vh] rounded-2xl overflow-hidden shadow-cinematic"
              >
                <img
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1000&q=80"
                  alt="Artista criando"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Pilar 3 */}
            <div className="min-w-screen flex items-center justify-center px-12">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Sparkles className="w-16 h-16 text-primary mb-8" />
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">
                    A Inconformidade
                  </h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Nascemos da inconformidade com o status quo. Não aceitamos
                    que o sistema force os bons criadores a escolherem entre
                    polêmica e invisibilidade.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Pilar 4 - Imagem */}
            <div className="min-w-screen flex items-center justify-center px-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative w-full max-w-2xl h-[70vh] rounded-2xl overflow-hidden shadow-cinematic"
              >
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1000&q=80"
                  alt="Mutirão de limpeza"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-32 px-6 bg-background">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-section-title text-center mb-16"
          >
            Os Inconformados
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "Ana Silva",
                role: "Fundadora",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
              },
              {
                name: "Carlos Mendes",
                role: "Ativista Digital",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
              },
              {
                name: "Juliana Costa",
                role: "Designer",
                image:
                  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
              },
              {
                name: "Pedro Santos",
                role: "Desenvolvedor",
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
              },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-cinematic">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--alarm))] to-transparent opacity-0 group-hover:opacity-90 transition-all duration-300 flex items-end justify-center pb-8">
                    <span className="text-primary text-xl font-bold">
                      {member.role}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center">{member.name}</h3>
              </motion.div>
            ))}
          </div>
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
            className="max-w-3xl mx-auto"
          >
            <Target className="w-16 h-16 text-primary mx-auto mb-8" />
            <h2 className="text-section-title mb-8">
              Agora que você conhece nosso sonho, veja nossa ação.
            </h2>
            <Link to="/projetos">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-12 py-6 shadow-glow hover:scale-105 transition-all"
              >
                Conheça Nossa Primeira Missão
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Timeline Item Component
function TimelineItem({
  year,
  title,
  description,
  side,
  imageSrc,
}: {
  year: string;
  title: string;
  description: string;
  side: "left" | "right";
  imageSrc?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`relative flex items-center mb-24 ${
        side === "right" ? "flex-row-reverse" : ""
      }`}
    >
      {/* Content */}
      <div className={`w-1/2 ${side === "left" ? "pr-12 text-right" : "pl-12"}`}>
        <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold mb-4">
          {year}
        </div>
        <h3 className="text-3xl font-bold mb-3">{title}</h3>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      {/* Center Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background z-10" />

      {/* Image or Spacer */}
      <div className={`w-1/2 ${side === "right" ? "pr-12" : "pl-12"}`}>
        {imageSrc && (
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-cinematic">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
