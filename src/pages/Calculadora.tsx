import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Calculadora(): JSX.Element {
  const [selectedAge, setSelectedAge] = useState<number | null>(null)
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(80)
  const [lifeExpectancyInput, setLifeExpectancyInput] = useState<string>('80')
  const [dailyScreenHours, setDailyScreenHours] = useState<number>(5)
  const [screenHoursInput, setScreenHoursInput] = useState<string>('5')

  // animated display for hours
  const [displayHours, setDisplayHours] = useState<number>(0)
  const rafRef = useRef<number | null>(null)

  const ageGroups = [
    { label: '0-10', min: 0, max: 10 },
    { label: '10-20', min: 10, max: 20 },
    { label: '20-30', min: 20, max: 30 },
    { label: '30-40', min: 30, max: 40 },
    { label: '40-50', min: 40, max: 50 },
    { label: '50-60', min: 50, max: 60 },
    { label: '60-70', min: 60, max: 70 },
  ]

  function handleAgeGroupSelect(min: number, max: number) {
    const mid = Math.floor((min + max) / 2)
    setSelectedAge(mid)
  }

  function handleExactAgeInput(val: string) {
    if (val === '') {
      setSelectedAge(null)
      return
    }
    const n = Math.max(0, Math.min(120, Number(val)))
    if (Number.isNaN(n)) return
    setSelectedAge(n)
  }

  function decrementLifeExpectancy() {
    setLifeExpectancy((v) => Math.max(1, v - 1))
  }
  function incrementLifeExpectancy() {
    setLifeExpectancy((v) => Math.min(150, v + 1))
  }
  function handleLifeExpectancyChange(val: string) {
    const n = Number(val)
    if (Number.isNaN(n)) return
    setLifeExpectancy(Math.max(1, Math.min(150, Math.floor(n))))
    setLifeExpectancyInput(String(Math.floor(n)))
  }

  function decrementScreenHours() {
    setDailyScreenHours((v) => Math.max(0, Math.round((v - 0.5) * 2) / 2))
  }
  function incrementScreenHours() {
    setDailyScreenHours((v) => Math.min(24, Math.round((v + 0.5) * 2) / 2))
  }
  function handleScreenHoursChange(val: string) {
    const n = Number(val)
    if (Number.isNaN(n)) return
    const clamped = Math.max(0, Math.min(24, n))
    setDailyScreenHours(clamped)
    setScreenHoursInput(String(clamped))
  }

  // Derived values
  const timeAlive = selectedAge ?? 0
  const timeRemaining = Math.max(0, lifeExpectancy - (selectedAge ?? 0))
  const totalHoursLost = dailyScreenHours * 365 * timeRemaining
  const totalDaysLost = Math.floor(totalHoursLost / 24)
  const totalYearsLostNum = totalHoursLost / (24 * 365)
  const totalYearsLost = Number(totalYearsLostNum.toFixed(1))

  const percentageAlive = selectedAge && lifeExpectancy > 0 ? (selectedAge / lifeExpectancy) * 100 : 0
  const percentLost = lifeExpectancy > 0 ? (totalYearsLostNum / lifeExpectancy) * 100 : 0
  const percentRestante = Math.max(0, 100 - percentageAlive - percentLost)

  // Animate displayHours toward totalHoursLost
  useEffect(() => {
    const start = displayHours
    const end = Math.round(totalHoursLost)
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
  }, [totalHoursLost])

  return (
    <div className="min-h-[60vh] py-12 bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <motion.div
            key={`${String(selectedAge)}-${lifeExpectancy}-${dailyScreenHours}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-neutral-800 border border-neutral-700 rounded-xl p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xs text-neutral-300">Pergunta</div>
              <div className="text-xs text-neutral-400">Preencha e avance</div>
            </div>

            {/* Step 0: idade */}
            {selectedAge === null && (
              <div>
                <label className="block text-xl font-bold mb-4 text-white">1. Qual é a sua idade?</label>
                <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                  {ageGroups.map((group) => (
                    <motion.button
                      key={group.label}
                      onClick={() => handleAgeGroupSelect(group.min, group.max)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="py-3 px-2 rounded-lg text-sm font-medium bg-neutral-700 border border-neutral-500 text-white hover:bg-neutral-600"
                    >
                      {group.label}
                    </motion.button>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <input
                    type="number"
                    min={0}
                    max={120}
                    value={selectedAge ?? ''}
                    onChange={(e) => handleExactAgeInput(e.target.value)}
                    placeholder="Idade exata"
                    className="flex-1 bg-neutral-700 border border-neutral-500 rounded-lg px-3 py-2 text-white text-sm placeholder:text-neutral-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  />
                </div>
              </div>
            )}

            {/* Step 1: expectativa */}
            {selectedAge !== null && (
              <div>
                <label className="block text-xl font-bold mb-4 text-white">2. Expectativa de vida</label>
                <div className="flex gap-2 items-center">
                  <button onClick={decrementLifeExpectancy} className="p-2 rounded-lg bg-neutral-700 border border-neutral-500 text-white">-</button>
                  <input
                    type="number"
                    min={1}
                    max={150}
                    value={lifeExpectancyInput}
                    onChange={(e) => handleLifeExpectancyChange(e.target.value)}
                    className="flex-1 bg-neutral-700 border border-neutral-500 rounded-lg px-3 py-2 text-white text-center text-sm"
                  />
                  <button onClick={incrementLifeExpectancy} className="p-2 rounded-lg bg-neutral-700 border border-neutral-500 text-white">+</button>
                </div>
                <div className="mt-3 flex gap-2">
                  {[75, 80, 85, 90].map((v) => (
                    <button
                      key={v}
                      onClick={() => {
                        setLifeExpectancy(v)
                        setLifeExpectancyInput(String(v))
                      }}
                      className={`px-3 py-1 rounded text-xs ${lifeExpectancy === v ? 'bg-indigo-700 text-white' : 'bg-neutral-700 text-neutral-300'} border border-neutral-500`}
                    >
                      {v}a
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: screen hours */}
            {selectedAge !== null && (
              <div className="mt-6">
                <label className="block text-xl font-bold mb-4 text-white">3. Tempo disperdicado em tela por dia</label>
                <div className="flex gap-2 items-center">
                  <button onClick={decrementScreenHours} className="p-2 rounded-lg bg-neutral-700 border border-neutral-500 text-white">-</button>
                  <input
                    type="number"
                    min={0}
                    max={24}
                    step={0.5}
                    value={screenHoursInput}
                    onChange={(e) => handleScreenHoursChange(e.target.value)}
                    className="flex-1 bg-neutral-700 border border-neutral-500 rounded-lg px-3 py-2 text-white text-center text-sm"
                  />
                  <button onClick={incrementScreenHours} className="p-2 rounded-lg bg-neutral-700 border border-neutral-500 text-white">+</button>
                </div>
                <div className="mt-3 flex gap-2">
                  {[2, 5, 8, 12].map((v) => (
                    <button
                      key={v}
                      onClick={() => {
                        setDailyScreenHours(v)
                        setScreenHoursInput(String(v))
                      }}
                      className={`px-3 py-1 rounded text-xs ${dailyScreenHours === v ? 'bg-orange-700 text-white' : 'bg-neutral-700 text-neutral-300'} border border-neutral-500`}
                    >
                      {v}h
                    </button>
                  ))}
                </div>
                <p className="text-xs text-neutral-400 mt-2">Média brasileira: ~5 horas por dia</p>
              </div>
            )}
          </motion.div>

          {/* Graph always below the question */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
            <div className="space-y-4">
              <div className="relative h-28 bg-neutral-700 rounded-lg overflow-hidden border border-neutral-600 flex">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300" style={{ width: `${percentageAlive}%`, zIndex: 2 }} />
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500" style={{ left: `${percentageAlive}%`, width: `${percentLost}%`, zIndex: 3 }} />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{selectedAge ?? '--'} / {lifeExpectancy}</p>
                    <p className="text-xs text-neutral-300">{displayHours.toLocaleString()} horas perdidas</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-neutral-400">Vivido</div>
                  <div className="font-bold text-indigo-300">{timeAlive} anos</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Perdido</div>
                  <div className="font-bold text-orange-400">{totalYearsLost} anos</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Restante</div>
                  <div className="font-bold text-neutral-200">{(timeRemaining - totalYearsLostNum).toFixed(1)} anos</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-12 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors">← Voltar ao Início</Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
