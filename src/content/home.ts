// Centralized copy for the Home page to enable quick iterations/A-B tests

export type HomeCopy = {
  hero: {
    h1A: string; // alternative headline A
    h1B: string; // alternative headline B (chosen)
    subtitle: string;
  };
  diagnosis: {
    title: string;
    paragraph: string;
  };
  symptoms: {
    mind: { title: string; description: string };
    world: { title: string; description: string };
    creation: { title: string; description: string };
  };
  turningPoint: {
    transient: string; // transitional line shown before reveal
    weAre: string; // "Nós somos o +Creator."
    paragraph: string;
  };
};

export const homeCopy: HomeCopy = {
  hero: {
    h1A: "A ética foi substituída pela métrica.",
    h1B: "O ruído está vencendo. O propósito está em extinção.",
    subtitle:
      "Um sistema artificial recompensa o 'fast-food' mental e pune a criação genuína. O +Creator é a nossa linha de frente para lutar de volta. Juntos.",
  },
  diagnosis: {
    title: "Os Sintomas da Mesma Doença: A Desconexão.",
    paragraph:
      "A 'poluição digital' e a 'poluição física' não são problemas separados. São o resultado de um sistema que nos treinou para a apatia. Quando a atenção humana é leiloada, a realidade perde o valor.",
  },
  symptoms: {
    mind: {
      title: "A Mente Adoece",
      description:
        "O 'fast-food' mental. Conteúdo viciante e sem valor que gera ansiedade. Os algoritmos recompensam o choque, não a criatividade.",
    },
    world: {
      title: "O Mundo Real Sofre",
      description:
        "A apatia online transborda. Nossas ruas e praças pagam o preço.",
    },
    creation: {
      title: "A Criação Morre",
      description:
        "E os bons criadores? São forçados a escolher: fazer polêmica ou desaparecer.",
    },
  },
  turningPoint: {
    transient: "Se o sistema premia a falta de foco, nossa comunidade te ajuda a retomá-lo",
    weAre: "Nós somos o +Creator.",
    paragraph:
      "Somos um grupo de jovens que se cansou de esperar e decidiu construir o futuro.",
  },
};
