import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TrendingDown, Brain, Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Alarme() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[hsl(var(--alarm))]">
        <div className="absolute inset-0 bg-gradient-tension">
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(255,102,0,0.3) 0%, transparent 70%)",
              backgroundSize: "200% 200%",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-hero text-background mb-6"
          >
            Você também está cansado do{" "}
            <span className="text-glitch inline-block text-primary">lixo</span>.
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-3xl text-background/90 font-light"
          >
            O lixo digital que vicia. O lixo físico que suja.
          </motion.h2>
        </div>
      </section>

      {/* O Lixo Digital */}
      <section className="min-h-screen bg-[hsl(var(--alarm))] py-32 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-background mb-6">
                O "Fast-Food" Mental que adoece.
              </h3>
              <p className="text-xl text-background/80 leading-relaxed">
                O que chamam de "conteúdo de baixa qualidade" não é "bobeira". É
                um sistema projetado por algoritmos para viciar, diminuir a
                capacidade de atenção e gerar ansiedade.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              {[
                "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&q=80",
                "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&q=80",
                "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&q=80",
              ].map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="aspect-[9/16] rounded-lg overflow-hidden shadow-cinematic"
                >
                  <img
                    src={src}
                    alt="Digital content"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-32 px-6 bg-[hsl(var(--alarm))]/90">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-section-title text-background text-center mb-16"
          >
            A Exaustão é Real
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Como criador, sinto a pressão de criar polêmica ou desaparecer.",
                author: "Criador de Conteúdo",
              },
              {
                quote:
                  "Como pai, vejo meu filho hipnotizado por vídeos que não ensinam nada.",
                author: "Pai preocupado",
              },
              {
                quote:
                  "A internet costumava ser sobre conexão. Agora é sobre exaustão.",
                author: "Desenvolvedora",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-background/10 backdrop-blur-sm p-8 rounded-2xl border border-background/20"
              >
                <p className="text-lg text-background/90 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <p className="text-background/60 font-semibold">
                  — {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-32 px-6 bg-[hsl(var(--alarm))]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <StatCard
              icon={Brain}
              value="40%"
              label="Queda na Capacidade de Atenção"
            />
            <StatCard
              icon={Heart}
              value="65%"
              label="Aumento em Ansiedade Digital"
            />
            <StatCard
              icon={TrendingDown}
              value="80%"
              label="Criadores Relatam Exaustão"
            />
          </div>
        </div>
      </section>

      {/* Lixo Físico - Parallax Gallery */}
      <section className="py-32 px-6 bg-[hsl(var(--alarm))]/95">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-background mb-6">
              A Desconexão com o Mundo Real.
            </h3>
            <p className="text-xl text-background/80 max-w-3xl mx-auto">
              Enquanto estamos hipnotizados pelo lixo digital, o lixo real se
              acumula. A desconexão online nos torna apáticos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                src: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&q=80",
                delay: 0,
              },
              {
                src: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&q=80",
                delay: 0.2,
              },
              {
                src: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&q=80",
                delay: 0.4,
              },
              {
                src: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&q=80",
                delay: 0.6,
              },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: img.delay }}
                viewport={{ once: true }}
                className="relative h-[400px] rounded-2xl overflow-hidden shadow-cinematic group"
              >
                <img
                  src={img.src}
                  alt="Poluição urbana"
                  className="w-full h-full object-cover grayscale group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--alarm))] to-transparent opacity-60" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6 bg-[hsl(var(--alarm))]">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Trash2 className="w-16 h-16 text-primary mx-auto mb-8" />
            <h2 className="text-section-title text-background mb-8">
              Sentir raiva não basta.
            </h2>
            <p className="text-xl text-background/80 mb-12">
              A mudança precisa de um propósito.
            </p>
            <Link to="/quem-somos">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-12 py-6 shadow-glow hover:scale-105 transition-all"
              >
                Conheça quem está agindo
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: any;
  value: string;
  label: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-background/10 backdrop-blur-sm p-12 rounded-2xl text-center border border-background/20"
    >
      <Icon className="w-16 h-16 text-primary mx-auto mb-6" />
      <div className="text-6xl font-bold text-background mb-4">{value}</div>
      <div className="text-xl text-background/80">{label}</div>
    </motion.div>
  );
}
