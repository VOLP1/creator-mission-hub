/**
 * ARQUIVO ORIGINAL DO QUIZ - BACKUP
 * 
 * Este é o código original completo do Quiz interativo.
 * Para restaurar o Quiz, renomeie este arquivo de volta para Quiz.tsx
 * e renomeie o Quiz.tsx atual para Quiz.EmConstrucao.tsx
 * 
 * Última atualização: 04/12/2025
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

// Dados do Quiz
const questions = [
  {
    id: 1,
    question: 'Ao acordar, o que você toca primeiro?',
    options: [
      { id: 'A', text: 'O celular. Notificações antes de levantar.', type: 'A', img: 'https://images.unsplash.com/photo-1555664424-778a690bb653?w=600&q=80' },
      { id: 'B', text: 'O despertador (mais 5 minutos).', type: 'B', img: 'https://images.unsplash.com/photo-1517866170356-8118bda7b947?w=600&q=80' },
      { id: 'C', text: "O celular, para postar um 'Bom dia'", type: 'C', img: 'https://images.unsplash.com/photo-1516251193000-18e65b60c61f?w=600&q=80' },
      { id: 'D', text: 'Água ou o rosto de quem amo.', type: 'D', img: 'https://images.unsplash.com/photo-1543076659-9380cdf10613?w=600&q=80' },
    ],
  },
  {
    id: 2,
    question: 'Numa fila sem fones, o que sua mente faz?',
    options: [
      { id: 'A', text: 'Pânico leve. Rolo o feed no mudo.', type: 'A', img: 'https://images.unsplash.com/photo-1523474438810-b04a2480563b?w=600&q=80' },
      { id: 'B', text: 'Observo e julgo as pessoas.', type: 'B', img: 'https://images.unsplash.com/photo-1496317556649-f930d733eea3?w=600&q=80' },
      { id: 'C', text: 'Respondo DMs para manter engajamento.', type: 'C', img: 'https://images.unsplash.com/photo-1565535997973-6260d66b2b77?w=600&q=80' },
      { id: 'D', text: 'Deixo a mente vagar.', type: 'D', img: 'https://images.unsplash.com/photo-1499244571915-4dd95ca456e6?w=600&q=80' },
    ],
  },
  {
    id: 3,
    question: "Você postou e 'flopou'. O que sente?",
    options: [
      { id: 'A', text: 'Vergonha. Apago o post.', type: 'A', img: 'https://images.unsplash.com/photo-1598550476439-c923097980dc?w=600&q=80' },
      { id: 'B', text: 'Indiferença. Postei porque gostei.', type: 'B', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
      { id: 'C', text: 'Obsessão. Analiso as métricas.', type: 'C', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
      { id: 'D', text: 'Vida que segue.', type: 'D', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80' },
    ],
  },
  {
    id: 4,
    question: 'Sábado à noite em casa.',
    options: [
      { id: 'A', text: 'FOMO. Vejo stories e me sinto mal.', type: 'A', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80' },
      { id: 'B', text: 'Netflix + Celular (Segunda tela).', type: 'B', img: 'https://images.unsplash.com/photo-1522071901873-411886a10004?w=600&q=80' },
      { id: 'C', text: 'Edito vídeos. Trabalho nunca para.', type: 'C', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 'D', text: 'Livro, filme ou nada. Modo avião.', type: 'D', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80' },
    ],
  },
  {
    id: 5,
    question: 'Se a internet acabasse hoje...',
    options: [
      { id: 'A', text: 'Vazio. O que eu faria?', type: 'A', img: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600&q=80' },
      { id: 'B', text: 'Solidão. Perderia o contato.', type: 'B', img: 'https://images.unsplash.com/photo-1467632499275-7a693a761056?w=600&q=80' },
      { id: 'C', text: 'Pânico. Perderia meu emprego.', type: 'C', img: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80' },
      { id: 'D', text: 'Alívio. Finalmente paz.', type: 'D', img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80' },
    ],
  },
];

const results: Record<string, { title: string; cardText: string; bridge: string; ctaText: string; whatsappMessage: string; img: string; }> = {
  A: {
    title: "O Cronicamente Online",
    cardText: "Minha bateria social acaba antes da bateria do celular. Eu vi o meme antes de viralizar. Minha rotina de sono é decidida pelo algoritmo.",
    bridge: "Seu sistema de recompensa foi sequestrado. Você precisa de um detox guiado.",
    ctaText: "Receber Protocolo no WhatsApp",
    whatsappMessage: "Oi, fiz o teste e sou o Cronicamente Online. Quero o protocolo.",
    img: "https://images.unsplash.com/photo-1614726365723-49ab37972c43?w=800&q=80",
  },
  B: {
    title: "O Sommelier de Vida Alheia",
    cardText: "Low profile por opção, investigador do FBI por vocação. Sei onde você passou as férias de 2019, mas você nem sabe que eu existo. Presença fantasma, consumo 24/7.",
    bridge: "Assistir a vida é fácil. Viver dá trabalho. Troque o scroll por Desafios Reais.",
    ctaText: "Aceitar Desafio Offline",
    whatsappMessage: "Oi, sou o Sommelier de Vida Alheia. Quero começar os desafios offline.",
    img: "https://images.unsplash.com/photo-1504701954957-2010ec3bbee2?w=800&q=80",
  },
  C: {
    title: "O Escravo do Engajamento",
    cardText: "Meu chefe é um robô que muda de humor todo dia. Trabalho de graça em troca de likes. Se o story flopar, meu dia acabou. Alguém me tira dessa rodinha.",
    bridge: "Você não precisa de mais esforço, precisa de autonomia. Descubra como trabalhar menos.",
    ctaText: "Ver Ferramentas de Liberdade",
    whatsappMessage: "Oi, sou o Escravo do Engajamento. Quero conhecer as ferramentas.",
    img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
  },
  D: {
    title: "O Offline Raiz",
    cardText: "Eu lembro como era o mundo antes de tudo virar conteúdo. Uso o modo avião como terapia. Meu jantar não esfria esperando a foto perfeita. Sou uma espécie em extinção.",
    bridge: "Não seja uma ilha. Precisamos da sua lucidez para liderar a regeneração.",
    ctaText: "Unir Forças no QG",
    whatsappMessage: "Oi, sou o Offline Raiz. Quero me unir ao movimento.",
    img: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80",
  },
};

interface AnswerRecord { questionId: number; type: string; }

const transitionVariants = {
  enter: {
    x: '100%',
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: '-100%',
    opacity: 0,
  },
};

const ResultVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

// Util para padronizar parâmetros do Unsplash e fallback
const enhanceUnsplash = (url: string, w = 800) => {
  // Se já é um link do Unsplash com parâmetros, não força novos para evitar 403 seletivos.
  if (url.includes('images.unsplash.com')) return url; // usa original exatamente
  const [base, query] = url.split('?');
  const existing = query ? '?' + query : '';
  const sep = existing ? '&' : '?';
  return `${base}${existing}${sep}auto=format&fit=crop&w=${w}&q=80`;
};

const FALLBACK = '/images/home/hero-bg-640.avif';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
}

const SmartImage: React.FC<SmartImageProps> = ({ src, alt, className }) => {
  const [showFallback, setShowFallback] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const original = src; // manter 100%
  const handleError = () => {
    // ativa fallback e considera como "loaded" para não manter skeleton infinito
    setShowFallback(true);
    setLoaded(true);
  };
  return (
    <div className="absolute inset-0">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#1d1d1d] via-[#252525] to-[#1d1d1d]" />
      )}
      <img
        src={showFallback ? FALLBACK : original}
        alt={alt}
        className={className + ' ' + (loaded ? 'opacity-100' : 'opacity-0')}
        style={{ transition: 'opacity .5s ease' }}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        loading="lazy"
        decoding="async"
      />
      {showFallback && (
        <span className="absolute bottom-1 right-1 rounded bg-yellow-600/70 px-1 py-0.5 text-[10px] font-medium text-black/90">
          fallback
        </span>
      )}
    </div>
  );
};

const Quiz: React.FC = () => {
  const [index, setIndex] = useState(0); // pergunta atual
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [direction, setDirection] = useState(1); // 1 direita, -1 esquerda (para possíveis navegações futuras)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const total = questions.length;
  const progress = (index / total) * 100;

  const handleSelect = useCallback((optionType: string, questionId: number) => {
    setAnswers(prev => [...prev.filter(a => a.questionId !== questionId), { questionId, type: optionType }]);
    setDirection(1);
    // avança
    if (index < total - 1) {
      setTimeout(() => setIndex(i => i + 1), 200); // pequeno delay p/ animação
    } else {
      // finalizar
      setTimeout(() => setShowResult(true), 250);
    }
  }, [index, total]);

  const restart = () => {
    setAnswers([]);
    setIndex(0);
    setShowResult(false);
    setDirection(1);
  };

  const dominantType = useMemo(() => {
    if (!showResult) return null;
    const tally: Record<string, number> = {};
    answers.forEach(a => { tally[a.type] = (tally[a.type] || 0) + 1; });
    const entries = Object.entries(tally);
    if (entries.length === 0) return null;
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0]; // primeiro maior
  }, [answers, showResult]);

  const resultData = dominantType ? results[dominantType] : null;

  // acessibilidade: permitir setas para navegar (apenas se implementarmos back futuramente)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showResult) return;
      if (e.key === 'ArrowRight' && index < total - 1) {
        setDirection(1);
        setIndex(i => i + 1);
      } else if (e.key === 'ArrowLeft' && index > 0) {
        setDirection(-1);
        setIndex(i => i - 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [index, total, showResult]);

  // Ocultar Navbar durante a tela de resultado
  useEffect(() => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    if (showResult) {
      (nav as HTMLElement).style.display = 'none';
    } else {
      (nav as HTMLElement).style.display = '';
    }
    return () => {
      (nav as HTMLElement).style.display = '';
    };
  }, [showResult]);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, quality: 0.95 });
      const link = document.createElement('a');
      link.download = `${resultData?.title.replace(/\s+/g,'-').toLowerCase()}-carta.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error('Falha ao gerar imagem da carta', e);
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white font-sans pt-20 md:pt-24">
      {/* Background dynamic (cinematic subtle noise) */}
      <div className="pointer-events-none absolute inset-0 select-none -z-10" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/95" />
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, #333 0, transparent 40%), radial-gradient(circle at 70% 70%, #222 0, transparent 55%)' }} />
      </div>

      {/* Progress Bar */}
      {!showResult && (
        <div className="sticky top-20 md:top-24 z-30 w-full bg-black/60">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-widest text-white/60">
              <span>Pergunta {index + 1} / {total}</span>
              <button onClick={restart} className="rounded bg-white/5 px-2 py-1 text-white/60 hover:bg-white/10 hover:text-white transition-colors">Reiniciar</button>
            </div>
            <div className="h-1 w-full overflow-hidden rounded bg-white/10">
              <div className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      )}
      {/* Espaçador para compensar a barra sticky */}
      {!showResult && (
        <div className="h-16 md:h-20" />
      )}

      {/* Conteúdo */}
  <div className="relative z-10 mx-auto flex max-w-5xl flex-col px-4 pb-24 pt-10 md:pt-12">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {!showResult && (
            <motion.div
              key={index}
              className="flex flex-col"
              variants={transitionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
            >
              <motion.h1
                layout
                className="mb-8 text-center text-2xl font-light tracking-tight md:text-3xl"
              >
                <span className="inline-block text-neutral-100">
                  {questions[index].question}
                </span>
              </motion.h1>
              {/* Opções */}
              <div className="grid gap-6 md:grid-cols-4">
                {questions[index].options.map(option => {
                  const selected = answers.find(a => a.questionId === questions[index].id)?.type === option.type;
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleSelect(option.type, questions[index].id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={clsx(
                        'group relative flex h-40 items-end overflow-hidden rounded-xl border border-white/10 bg-black text-left shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 md:h-64',
                        'md:aspect-[3/4]',
                        selected && 'border-indigo-400 shadow-[0_0_0_2px_rgba(99,102,241,0.6),0_0_20px_4px_rgba(99,102,241,0.3)]'
                      )}
                      aria-pressed={selected}
                    >
                      <SmartImage
                        src={option.img}
                        alt={option.text}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={clsx('absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20', selected && 'bg-black/10')} />
                      <div className="relative z-10 p-4">
                        <p className="text-sm font-medium leading-snug md:text-base">
                          <span className="mr-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px] tracking-wider text-white/70">{option.id}</span>
                          {option.text}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              {/* Dica / Footer */}
              <div className="mt-8 text-center text-xs text-white/40">
                Escolha uma carta. A próxima pergunta surgirá em seguida.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showResult && resultData && (
            <motion.div
              key="result"
              className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-6 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Fundo imersivo */}
              <div className="absolute inset-0 -z-10">
                <SmartImage src={resultData.img} alt={resultData.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              </div>
              {/* Carta central (APENAS o que será baixado) */}
              <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="relative aspect-[9/16] w-[min(340px,80vw)] overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-black/20 via-black/30 to-black/40 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_40px_-8px_rgba(0,0,0,0.7)]"
              >
                <div className="absolute inset-0 -z-10">
                  <SmartImage src={resultData.img} alt={resultData.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/45" />
                </div>
                <div className="relative flex h-full flex-col justify-between p-5">
                  <div className="space-y-3 pt-2">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        <span className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                        {resultData.title}
                      </span>
                    </h2>
                      <p className="text-sm italic leading-relaxed text-white/85 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                      "{resultData.cardText}"
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-xs font-semibold tracking-widest text-white/40">+CREATOR</span>
                  </div>
                </div>
              </motion.div>
              {/* Ações abaixo da carta */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative z-20 flex w-full max-w-[400px] flex-col gap-3"
              >
                <p className="text-center text-xs text-white/70">
                  {resultData.bridge}
                </p>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(resultData.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4 text-center text-sm font-semibold text-white shadow-lg transition-all hover:from-emerald-400 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-black"
                >
                  <span className="absolute inset-0 rounded-lg bg-emerald-300/0 blur-sm transition group-hover:bg-emerald-300/15" aria-hidden />
                  <span>{resultData.ctaText}</span>
                </a>
                <div className="flex w-full gap-2">
                  <button
                    onClick={downloadCard}
                    className="flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-3 text-xs font-medium text-white/80 backdrop-blur-sm transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    Baixar meu Card
                  </button>
                  <button
                    onClick={restart}
                    className="flex-1 rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-xs font-medium text-white/60 backdrop-blur-sm transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    Refazer
                  </button>
                </div>
                <Link
                  to="/"
                  className="mx-auto mt-1 text-center text-[11px] font-medium text-white/40 transition hover:text-white/70"
                >
                  Voltar ao Início
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
