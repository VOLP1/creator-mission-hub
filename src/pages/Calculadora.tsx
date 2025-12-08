import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mountain, BookOpen, Palette, Heart, Dumbbell } from 'lucide-react'

export default function Calculadora(): JSX.Element {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [selectedAge, setSelectedAge] = useState<number | null>(null)
  const [gender, setGender] = useState<'male' | 'female' | null>(null)
  const [dailyScreenHours, setDailyScreenHours] = useState<number | null>(null)
  const [lifeStyle, setLifeStyle] = useState<string | null>(null)

  // animated display for hours
  const [displayHours, setDisplayHours] = useState<number>(0)
  const rafRef = useRef<number | null>(null)

  const lifeStyleOptions = [
    { id: 'adventure', label: 'Aventura', icon: Mountain, description: 'Explorar o mundo, viajar, praticar esportes radicais', color: 'from-blue-500/20 to-cyan-500/5 border-blue-500/30 hover:border-blue-500/50' },
    { id: 'study', label: 'Estudo', icon: BookOpen, description: 'Estudar, aprender novas habilidades, ler livros', color: 'from-purple-500/20 to-indigo-500/5 border-purple-500/30 hover:border-purple-500/50' },
    { id: 'creation', label: 'Criação', icon: Palette, description: 'Arte, música, escrita, projetos criativos', color: 'from-pink-500/20 to-rose-500/5 border-pink-500/30 hover:border-pink-500/50' },
    { id: 'health', label: 'Saúde', icon: Dumbbell, description: 'Exercícios, meditação, bem-estar físico e mental', color: 'from-green-500/20 to-emerald-500/5 border-green-500/30 hover:border-green-500/50' },
    { id: 'relationships', label: 'Conexões', icon: Heart, description: 'Família, amigos, relacionamentos significativos', color: 'from-red-500/20 to-orange-500/5 border-red-500/30 hover:border-red-500/50' },
  ]

  const getLifeStyleAlternatives = (styleId: string, hours: number) => {
    const alternativesMap: Record<string, Array<{ icon: string; value: number; label: string; unit: string }>> = {
      adventure: [
        { icon: '🏔️', value: Math.floor(hours / 6), label: 'Escalar', unit: 'montanhas' },
        { icon: '🌎', value: Math.floor(hours / 720), label: 'Viajar ao redor do mundo', unit: 'vezes' },
        { icon: '🎢', value: Math.floor(hours / 8), label: 'Viver experiências em parques temáticos', unit: 'dias' },
      ],
      study: [
        { icon: '📚', value: Math.floor(hours / 15), label: 'Ler', unit: 'livros' },
        { icon: '🎓', value: Math.floor(hours / 3200), label: 'Completar', unit: 'graduações' },
        { icon: '🏆', value: Math.floor(hours / 10000), label: 'Se tornar especialista em', unit: 'áreas' },
      ],
      creation: [
        { icon: '🎨', value: Math.floor(hours / 20), label: 'Criar', unit: 'obras de arte' },
        { icon: '📝', value: Math.floor(hours / 500), label: 'Escrever', unit: 'livros completos' },
        { icon: '🎸', value: Math.floor(hours / 5000), label: 'Aprender', unit: 'instrumentos musicais' },
      ],
      health: [
        { icon: '💪', value: Math.floor(hours / 2), label: 'Fazer', unit: 'treinos completos' },
        { icon: '🏃', value: Math.floor(hours * 10), label: 'Correr', unit: 'km' },
        { icon: '🧘', value: Math.floor(hours * 2), label: 'Meditar', unit: 'sessões (30 min)' },
      ],
      relationships: [
        { icon: '🎭', value: Math.floor(hours / 3), label: 'Ir a shows e eventos', unit: 'vezes' },
        { icon: '👨‍👩‍👧‍👦', value: Math.floor(hours / 4), label: 'Passar tempo com família', unit: 'reuniões' },
        { icon: '☕', value: Math.floor(hours / 2), label: 'Ter conversas profundas', unit: 'conversas' },
      ],
    }
    return alternativesMap[styleId] || alternativesMap.study
  }

  const ageGroups = [
    { label: '0-10', min: 0, max: 10 },
    { label: '10-20', min: 10, max: 20 },
    { label: '20-30', min: 20, max: 30 },
    { label: '30-40', min: 30, max: 40 },
    { label: '40-50', min: 40, max: 50 },
    { label: '50-60', min: 50, max: 60 },
    { label: '60-70', min: 60, max: 70 },
  ]

  const totalSteps = 3
  const progress = ((currentStep + 1) / totalSteps) * 100

  function handleAgeGroupSelect(min: number, max: number) {
    const mid = Math.floor((min + max) / 2)
    setSelectedAge(mid)
    setCurrentStep(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleGenderSelect(selectedGender: 'male' | 'female') {
    setGender(selectedGender)
    setCurrentStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleScreenHoursSelect(hours: number) {
    setDailyScreenHours(hours)
    setCurrentStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleLifeStyleSelect(style: string) {
    setLifeStyle(style)
    setCurrentStep(4)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function restart() {
    setCurrentStep(0)
    setSelectedAge(null)
    setGender(null)
    setDailyScreenHours(null)
    setLifeStyle(null)
    setDisplayHours(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Derived values
  const lifeExpectancy = gender === 'male' ? 74 : gender === 'female' ? 80 : 80
  const timeAlive = selectedAge ?? 0
  const timeRemaining = Math.max(0, lifeExpectancy - (selectedAge ?? 0))
  const totalHoursLost = (dailyScreenHours ?? 0) * 365 * timeRemaining
  const hoursSpentSoFar = (dailyScreenHours ?? 0) * 365 * timeAlive
  const totalDaysLost = Math.floor(totalHoursLost / 24)
  const totalYearsLostNum = totalHoursLost / (24 * 365)
  const totalYearsLost = Number(totalYearsLostNum.toFixed(1))
  const yearsSpentSoFar = Number((hoursSpentSoFar / (24 * 365)).toFixed(1))

  const percentageAlive = selectedAge && lifeExpectancy > 0 ? (selectedAge / lifeExpectancy) * 100 : 0
  const percentScreenTime = selectedAge && selectedAge > 0 ? (yearsSpentSoFar / selectedAge) * 100 : 0
  const percentLost = lifeExpectancy > 0 ? (totalYearsLostNum / lifeExpectancy) * 100 : 0
  const percentRestante = Math.max(0, 100 - percentageAlive - percentLost)

  // Animate displayHours toward totalHoursLost
  useEffect(() => {
    if (currentStep !== 3) return
    
    const start = displayHours
    const end = Math.round(hoursSpentSoFar)
    const duration = 600
    const startTs = performance.now()

    function step(ts: number) {
      const t = Math.min(1, (ts - startTs) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const value = Math.round(start + (end - start) * eased)
      setDisplayHours(value)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoursSpentSoFar, currentStep])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white font-sans pt-20 md:pt-24">
      {/* Background dynamic */}
      <div className="pointer-events-none absolute inset-0 select-none -z-10" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/95" />
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, #333 0, transparent 40%), radial-gradient(circle at 70% 70%, #222 0, transparent 55%)' }} />
      </div>

      {/* Progress Bar */}
      {currentStep < 3 && (
        <div className="sticky top-20 md:top-24 z-30 w-full bg-black/60">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-widest text-white/60">
              <span>Pergunta {currentStep + 1} / {totalSteps}</span>
              <button onClick={restart} className="rounded bg-white/5 px-2 py-1 text-white/60 hover:bg-white/10 hover:text-white transition-colors">Reiniciar</button>
            </div>
            <div className="h-1 w-full overflow-hidden rounded bg-white/10">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      )}
      
      {/* Spacer */}
      {currentStep < 3 && <div className="h-20" />}

      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="max-w-2xl mx-auto space-y-8">
          <AnimatePresence mode="wait">
            {/* Step 0: idade */}
            {currentStep === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="p-6"
              >
                <label className="block text-3xl font-bold mb-8 text-white text-center">Qual é a sua idade?</label>
                <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
                  {ageGroups.map((group) => (
                    <motion.button
                      key={group.label}
                      onClick={() => handleAgeGroupSelect(group.min, group.max)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="py-4 px-4 rounded-lg text-base font-medium bg-white/5 text-white hover:bg-white/10 transition-colors"
                    >
                      {group.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: gênero */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="p-6"
              >
                <label className="block text-3xl font-bold mb-8 text-white text-center">Você é homem ou mulher?</label>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <motion.button
                    onClick={() => handleGenderSelect('male')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-6 px-6 rounded-lg text-lg font-medium bg-white/5 text-white hover:bg-white/10 transition-colors"
                  >
                    Homem
                  </motion.button>
                  <motion.button
                    onClick={() => handleGenderSelect('female')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-6 px-6 rounded-lg text-lg font-medium bg-white/5 text-white hover:bg-white/10 transition-colors"
                  >
                    Mulher
                  </motion.button>
                </div>
                <p className="text-xs text-white/40 mt-6 text-center">
                  {gender === 'male' && 'Expectativa de vida: 74 anos'}
                  {gender === 'female' && 'Expectativa de vida: 80 anos'}
                </p>
              </motion.div>
            )}

            {/* Step 2: screen hours */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="p-6"
              >
                <label className="block text-3xl font-bold mb-8 text-white text-center">
                  Tempo desperdiçado em tela por dia
                </label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 max-w-md mx-auto">
                  {[1, 2, 3, 5, 8, 10].map((v) => (
                    <motion.button
                      key={v}
                      onClick={() => handleScreenHoursSelect(v)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="py-6 px-4 rounded-lg text-lg font-medium bg-white/5 text-white hover:bg-white/10 transition-colors"
                    >
                      {v}h
                    </motion.button>
                  ))}
                </div>
                <p className="text-xs text-white/40 mt-6 text-center">Média brasileira: ~5 horas por dia</p>
              </motion.div>
            )}

            {/* Step 3: Result - O Passado */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-6 space-y-8"
              >
                <h2 className="text-3xl font-bold mb-6 text-white text-center">O Passado</h2>
                
                {/* Barra de tempo de tela vs idade */}
                <div className="space-y-4">
                  <div className="relative h-24 bg-white/5 rounded-lg overflow-hidden flex">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500" 
                      style={{ width: `${percentScreenTime}%`, zIndex: 2 }} 
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{yearsSpentSoFar} anos em telas</p>
                        <p className="text-sm text-white/70">de {timeAlive} anos vividos</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 text-center italic">
                    Tempo em tela vs. sua idade atual
                  </p>
                </div>

                {/* Texto reflexivo */}
                <div className="bg-white/5 rounded-lg p-6 space-y-4">
                  <p className="text-lg text-white/90 leading-relaxed text-center">
                    Até agora, você gastou aproximadamente{' '}
                    <span className="font-bold text-orange-400">{displayHours.toLocaleString()} horas</span> com telas.
                  </p>
                  <p className="text-base text-white/80 leading-relaxed text-center">
                    Quando paramos para ter uma perspectiva total, é possível notar que um pequeno ato de ficar em frente às telas 
                    gera um resultado absurdo. Veja o que você poderia ter feito com todo esse tempo:
                  </p>
                </div>

                {/* Cards do que poderia ter feito */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: '📚', value: Math.floor(hoursSpentSoFar / 15), label: 'Ler', unit: 'livros' },
                    { icon: '🎉', value: Math.floor(hoursSpentSoFar / 5), label: 'Sair', unit: 'vezes com amigos' },
                    { icon: '🏃', value: Math.floor(hoursSpentSoFar * 10), label: 'Correr', unit: 'km' },
                  ].map((alt, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30 rounded-lg p-5 text-center"
                    >
                      <div className="text-4xl mb-3">{alt.icon}</div>
                      <div className="space-y-1">
                        <div className="text-sm text-orange-300 font-medium">
                          {alt.label}
                        </div>
                        <div className="text-4xl font-bold text-white">
                          {alt.value.toLocaleString()}
                        </div>
                        <div className="text-sm text-white/70">
                          {alt.unit}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Botão para ver o futuro */}
                <div className="flex justify-center pt-4">
                  <motion.button
                    onClick={() => {
                      setCurrentStep(4)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    Veja o Futuro →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 4: O Futuro - Pergunta */}
            {currentStep === 4 && !lifeStyle && (
              <motion.div
                key="step-4-question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="p-6 space-y-8"
              >
                <h2 className="text-3xl font-bold mb-6 text-white text-center">O Futuro</h2>
                
                {/* Barra de tempo futuro */}
                <div className="space-y-4">
                  <div className="relative h-24 bg-white/5 rounded-lg overflow-hidden flex">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500" 
                      style={{ width: `${(totalYearsLostNum / timeRemaining) * 100}%`, zIndex: 2 }} 
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{totalYearsLost} anos em telas</p>
                        <p className="text-sm text-white/70">de {timeRemaining} anos restantes</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 text-center italic">
                    Tempo que você perderá se continuar com este hábito
                  </p>
                </div>

                {/* Texto reflexivo */}
                <div className="bg-white/5 rounded-lg p-6 space-y-4">
                  <p className="text-xl font-bold text-orange-400 text-center">
                    Esse é o futuro que te aguarda:
                  </p>
                  <p className="text-lg text-white/90 leading-relaxed text-center">
                    Mais <span className="font-bold text-orange-400">{Math.floor(totalHoursLost).toLocaleString()} horas</span> gastas em tela.
                  </p>
                  <p className="text-lg text-white/90 leading-relaxed text-center mt-6">
                    Mas você pode transformar esse tempo em algo extraordinário.
                  </p>
                  <p className="text-xl font-semibold text-white text-center mt-4">
                    O que você gostaria de conquistar com esse tempo?
                  </p>
                </div>

                {/* Opções de estilo de vida */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                  {lifeStyleOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => handleLifeStyleSelect(option.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-lg bg-gradient-to-br ${option.color} transition-all text-left border`}
                      >
                        <div className="mb-3">
                          <IconComponent className="w-8 h-8 text-white/80" strokeWidth={1.5} />
                        </div>
                        <div className="font-semibold text-white mb-1">{option.label}</div>
                        <div className="text-xs text-white/60">{option.description}</div>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 4: O Futuro - Resultado após escolha */}
            {currentStep === 4 && lifeStyle && (
              <motion.div
                key="step-4-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-6 space-y-8"
              >
                <h2 className="text-3xl font-bold mb-6 text-white text-center">Seu Potencial</h2>
                
                {/* Cards de alternativas */}
                <div className="space-y-4">
                  <p className="text-lg font-semibold text-white text-center">
                    Com esse tempo, você pode:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {getLifeStyleAlternatives(lifeStyle || 'study', totalHoursLost).map((alt, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 rounded-lg p-5 text-center hover:border-emerald-500/50 transition-all"
                      >
                        <div className="text-4xl mb-3">{alt.icon}</div>
                        <div className="space-y-1">
                          <div className="text-sm text-emerald-300 font-medium">
                            {alt.label}
                          </div>
                          <div className="text-4xl font-bold text-white">
                            {alt.value.toLocaleString()}
                          </div>
                          <div className="text-sm text-white/70">
                            {alt.unit}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Mensagem de esperança */}
                <div className="bg-white/5 rounded-lg p-6 space-y-3">
                  <p className="text-base text-white/90 leading-relaxed font-medium text-center">
                    Mas aqui está a boa notícia: <span className="text-emerald-400">você pode mudar isso AGORA</span>.
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed text-center">
                    Cada hora que você recupera é uma hora investida em quem você realmente quer ser. 
                    O futuro não está escrito. Ele está sendo criado neste exato momento, 
                    e você tem o poder de escolher como vai gastá-lo.
                  </p>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-white text-center">
                    Junte-se ao Movimento
                  </h3>
                  <p className="text-sm text-white/70 text-center leading-relaxed">
                    Faça parte de uma comunidade que está recuperando o controle do seu tempo 
                    e construindo uma vida com mais propósito e presença.
                  </p>
                  
                  <div className="flex flex-col gap-3 pt-2">
                    <a
                      href="https://wa.me/?text=Oi%2C%20acabei%20de%20ver%20meu%20tempo%20perdido%20e%20quero%20mudar%20isso%20agora!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-emerald-400 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      <span className="absolute inset-0 rounded-lg bg-emerald-300/0 blur-sm transition group-hover:bg-emerald-300/15" aria-hidden />
                      <span>Começar Agora</span>
                    </a>
                    
                    <div className="flex w-full gap-2">
                      <button
                        onClick={restart}
                        className="flex-1 rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-xs font-medium text-white/60 backdrop-blur-sm transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        Refazer Cálculo
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-12 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors uppercase tracking-widest">← Voltar ao Início</Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
