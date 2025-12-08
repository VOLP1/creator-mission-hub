import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingDown, Brain, Heart, Trash2, LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { problemMetrics, sourcesNote } from "@/data/problem-metrics";

export default function Alarme() {
  return (
    <div className="min-h-screen pt-20 overflow-x-clip">
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

  <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl">
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
  <section className="min-h-screen bg-[hsl(var(--alarm))] py-32 px-4 md:px-6">
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
  <section className="py-32 px-4 md:px-6 bg-[hsl(var(--alarm))]/90">
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

      {/* Evidências (dinâmicas) */}
      <section className="py-32 px-4 md:px-6 bg-[hsl(var(--alarm))]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-background mb-6">O Problema, em dados</h2>
          <p className="text-background/80 mb-8">{sourcesNote}</p>

          <Tabs defaultValue="digital" className="w-full">
            <TabsList className="flex flex-wrap w-full justify-center gap-2">
              <TabsTrigger value="digital">Digital</TabsTrigger>
              <TabsTrigger value="fisico">Físico</TabsTrigger>
            </TabsList>

            {/* Digital */}
            <TabsContent value="digital" className="mt-6">
              <div className="grid md:grid-cols-4 gap-4">
                {problemMetrics.digital.kpis.map((kpi) => (
                  <KpiCard key={kpi.id} icon={Brain} value={kpi.value} unit={kpi.unit} label={kpi.label} sourceName={kpi.sourceName} sourceUrl={kpi.sourceUrl} year={kpi.year} />
                ))}
              </div>

              <div className="mt-10 grid md:grid-cols-5 gap-8 items-start">
                <div className="md:col-span-3">
                  <h3 className="text-xl text-background font-semibold mb-3">Tempo diário em redes ao longo dos anos</h3>
                  <ChartContainer
                    config={{ minutes: { label: "Minutos/dia", color: "hsl(var(--primary))" } }}
                    className="bg-background/10 rounded-2xl border border-background/20 p-4"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={problemMetrics.digital.timeOnSocial} margin={{ left: 12, right: 12, top: 8, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" stroke="currentColor" tick={{ fill: "currentColor" }} />
                        <YAxis stroke="currentColor" tick={{ fill: "currentColor" }} />
                        <Line type="monotone" dataKey="value" name="minutes" stroke="var(--color-minutes)" strokeWidth={2} dot={false} />
                        <ChartTooltip content={<ChartTooltipContent nameKey="minutes" labelKey="year" />} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                    <div className="mt-2">
                      <SourceInline name={problemMetrics.digital.kpis.find(k=>k.id==='avg-time')?.sourceName || ''} url={problemMetrics.digital.kpis.find(k=>k.id==='avg-time')?.sourceUrl || '#'} />
                    </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-xl text-background font-semibold mb-3">Volume de conteúdo por minuto (multi-plataforma)</h3>
                  <div className="space-y-3 bg-background/10 rounded-2xl border border-background/20 p-4">
                    {problemMetrics.digital.contentVolumePerMinute?.map((s) => (
                      <div key={s.id} className="flex items-center justify-between">
                        <div className="text-background/80">{s.label}</div>
                        <div className="text-background font-bold tabular-nums">{Intl.NumberFormat().format(s.value)} <span className="text-sm font-normal text-background/80">{s.unit}</span></div>
                      </div>
                    ))}
                      {problemMetrics.digital.contentVolumePerMinute?.[0] && (
                        <SourceInline name={problemMetrics.digital.contentVolumePerMinute[0].sourceName} url={problemMetrics.digital.contentVolumePerMinute[0].sourceUrl} />
                      )}
                  </div>
                </div>
              </div>

              {/* Short-form Share & Video Length Trends */}
              <div className="mt-10 grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-xl text-background font-semibold mb-3">Short-form tomou conta do watch time</h3>
                  <ChartContainer
                    config={{ share: { label: "Share curto (%)", color: "hsl(var(--primary))" } }}
                    className="bg-background/10 rounded-2xl border border-background/20 p-4"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={problemMetrics.digital.shortFormShareByYear} margin={{ left: 12, right: 12, top: 8, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" stroke="currentColor" tick={{ fill: "currentColor" }} />
                        <YAxis stroke="currentColor" tick={{ fill: "currentColor" }} />
                        <Bar dataKey="value" name="share" fill="var(--color-share)" radius={[4,4,0,0]} />
                        <ChartTooltip content={<ChartTooltipContent nameKey="share" labelKey="year" />} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                    <div className="mt-2">
                      <SourceInline name={problemMetrics.digital.kpis.find(k=>k.id==='short-form-share')?.sourceName || ''} url={problemMetrics.digital.kpis.find(k=>k.id==='short-form-share')?.sourceUrl || '#'} />
                    </div>
                </div>
                <div>
                  <h3 className="text-xl text-background font-semibold mb-3">Vídeos estão ficando mais curtos</h3>
                  <ChartContainer
                    config={{ length: { label: "Duração média (min)", color: "hsl(var(--primary))" } }}
                    className="bg-background/10 rounded-2xl border border-background/20 p-4"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={problemMetrics.digital.avgVideoLengthByYear} margin={{ left: 12, right: 12, top: 8, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" stroke="currentColor" tick={{ fill: "currentColor" }} />
                        <YAxis stroke="currentColor" tick={{ fill: "currentColor" }} />
                        <Line type="monotone" dataKey="value" name="length" stroke="var(--color-length)" strokeWidth={2} dot={false} />
                        <ChartTooltip content={<ChartTooltipContent nameKey="length" labelKey="year" />} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                    <div className="mt-2">
                      <SourceInline name={problemMetrics.digital.kpis.find(k=>k.id==='avg-video-length')?.sourceName || ''} url={problemMetrics.digital.kpis.find(k=>k.id==='avg-video-length')?.sourceUrl || '#'} />
                    </div>
                </div>
              </div>

              {/* Behavior KPIs */}
              <div className="mt-10 grid md:grid-cols-4 gap-4">
                {problemMetrics.digital.behavior?.avgSessionsPerDay && (
                  <KpiCard icon={TrendingDown} value={problemMetrics.digital.behavior.avgSessionsPerDay.value} unit={problemMetrics.digital.behavior.avgSessionsPerDay.unit} label={problemMetrics.digital.behavior.avgSessionsPerDay.label} sourceName={problemMetrics.digital.behavior.avgSessionsPerDay.sourceName} sourceUrl={problemMetrics.digital.behavior.avgSessionsPerDay.sourceUrl} year={problemMetrics.digital.behavior.avgSessionsPerDay.year} />
                )}
                {problemMetrics.digital.behavior?.avgSessionDurationMin && (
                  <KpiCard icon={TrendingDown} value={problemMetrics.digital.behavior.avgSessionDurationMin.value} unit={problemMetrics.digital.behavior.avgSessionDurationMin.unit} label={problemMetrics.digital.behavior.avgSessionDurationMin.label} sourceName={problemMetrics.digital.behavior.avgSessionDurationMin.sourceName} sourceUrl={problemMetrics.digital.behavior.avgSessionDurationMin.sourceUrl} year={problemMetrics.digital.behavior.avgSessionDurationMin.year} />
                )}
                {problemMetrics.digital.behavior?.swipeRatePerMin && (
                  <KpiCard icon={TrendingDown} value={problemMetrics.digital.behavior.swipeRatePerMin.value} unit={problemMetrics.digital.behavior.swipeRatePerMin.unit} label={problemMetrics.digital.behavior.swipeRatePerMin.label} sourceName={problemMetrics.digital.behavior.swipeRatePerMin.sourceName} sourceUrl={problemMetrics.digital.behavior.swipeRatePerMin.sourceUrl} year={problemMetrics.digital.behavior.swipeRatePerMin.year} />
                )}
                {problemMetrics.digital.behavior?.retentionFirst3s && (
                  <KpiCard icon={TrendingDown} value={problemMetrics.digital.behavior.retentionFirst3s.value} unit={problemMetrics.digital.behavior.retentionFirst3s.unit} label={problemMetrics.digital.behavior.retentionFirst3s.label} sourceName={problemMetrics.digital.behavior.retentionFirst3s.sourceName} sourceUrl={problemMetrics.digital.behavior.retentionFirst3s.sourceUrl} year={problemMetrics.digital.behavior.retentionFirst3s.year} />
                )}
              </div>
            </TabsContent>

            {/* Físico */}
            <TabsContent value="fisico" className="mt-6">
              <div className="grid md:grid-cols-4 gap-4">
                {problemMetrics.physical.kpis.map((kpi) => (
                  <KpiCard key={kpi.id} icon={Heart} value={kpi.value} unit={kpi.unit} label={kpi.label} sourceName={kpi.sourceName} sourceUrl={kpi.sourceUrl} year={kpi.year} />
                ))}
              </div>
              {/* Pie/Breakdown could be added later using Recharts.PieChart */}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Lixo Físico - Parallax Gallery */}
  <section className="py-32 px-4 md:px-6 bg-[hsl(var(--alarm))]/95">
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
      <section className="py-32 px-4 md:px-6 bg-[hsl(var(--alarm))]">
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
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-6 py-4 md:text-xl md:px-12 md:py-6 shadow-glow hover:scale-105 transition-all w-full sm:w-auto"
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
  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-background mb-4">{value}</div>
      <div className="text-xl text-background/80">{label}</div>
    </motion.div>
  );
}

function KpiCard({ icon: Icon, value, unit, label, sourceName, sourceUrl, year }: { icon: any; value: number; unit?: string; label: string; sourceName: string; sourceUrl: string; year?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-background/10 backdrop-blur-sm p-6 rounded-2xl border border-background/20"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6 text-primary" />
        <div className="text-background/80 text-sm">{label}{year ? ` · ${year}` : ''}</div>
      </div>
      <div className="mt-3 text-3xl font-bold text-background tabular-nums">
        {Intl.NumberFormat('pt-BR').format(value)} {unit && <span className="text-sm font-normal text-background/80">{unit}</span>}
      </div>
      <SourceInline name={sourceName} url={sourceUrl} />
    </motion.div>
  )
}

function SourceInline({ name, url }: { name: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-xs text-background/70 hover:text-background">
      <LinkIcon className="w-3.5 h-3.5" />
      <span>Fonte: {name}</span>
    </a>
  )
}
