// ============================================================
//  ARCHIVO DE CONFIGURACION SEMANAL
//  Editá este archivo para actualizar la consigna, opciones,
//  textos y settings de pago. Solo necesitás hacer deploy.
// ============================================================

export const weekConfig = {
  // ----------------------------------------------------------
  //  SEMANA ACTUAL
  // ----------------------------------------------------------
  weekId: "semana-1", // identificador único, no lo cambies una vez que arrancó la semana
  weekNumber: 1,
  startDate: "2026-09-22", // YYYY-MM-DD
  endDate: "2026-09-28", // YYYY-MM-DD (7 días)

  // ----------------------------------------------------------
  //  CONSIGNA
  // ----------------------------------------------------------
  challenge: {
    title: "¿Quien no puede faltar en la gran ultima cena argentina?",
    description:
      "Cada día el más votado entra en la foto. Al día siguiente, ese ganador ya no se puede votar.",
    hashtag: "#RecreoArgento",
  },

  // ----------------------------------------------------------
  //  OPCIONES DE VOTACION
  //  Listado inicial de opciones. Los ganadores del día se van
  //  eliminando automáticamente. Podés agregar más opciones acá.
  //  Los IDs deben ser únicos y no cambiarlos entre días.
  // ----------------------------------------------------------
  options: [
    {
      id: "opt_1",
      text: "Diego Maradona",
      description:
        "El Diez: porque una cena argentina sin Maradona no sería una cena argentina.",
    },
    {
      id: "opt_2",
      text: "Mercedes Sosa",
      description:
        "La voz de América Latina, para que en la mesa nunca falte una canción.",
    },
    {
      id: "opt_3",
      text: "Carlos Gardel",
      description:
        "El rey del tango, porque alguien tiene que ponerle música a la noche.",
    },
    {
      id: "opt_4",
      text: "René Favaloro",
      description:
        "El médico que cambió la historia, porque también necesitamos héroes fuera de la cancha.",
    },
    {
      id: "opt_5",
      text: "Jorge Luis Borges",
      description:
        "El maestro de las palabras, ideal para una sobremesa que dure siglos.",
    },
    {
      id: "opt_6",
      text: "Lionel Messi",
      description:
        "El capitán campeón del mundo, porque el fútbol no podía faltar en esta mesa.",
    },
    {
      id: "opt_7",
      text: "Jose de San Martin",
      description:
        "El Libertador, porque alguien tenía que organizar esta juntada.",
    },
    {
      id: "opt_8",
      text: "Maria Remedios del Valle",
      description:
        "Heroína de la Independencia, porque su historia merece estar en la mesa.",
    },
    {
      id: "opt_9",
      text: "Mirtha Legrand",
      description:
        "La reina de las mesas, esta vez le toca sentarse del otro lado.",
    },
    {
      id: "opt_10",
      text: "Ernesto Guevara",
      description:
        "El revolucionario argentino, porque una buena cena también necesita debate.",
    },
  ],

  // ----------------------------------------------------------
  //  IMAGEN RESULTADO
  //  URL de la imagen que se muestra en el hero.
  //  null = placeholder por defecto mientras no hay resultado.
  // ----------------------------------------------------------
  resultImage: "/hero-semana1.jpg" as string | null,

  // ----------------------------------------------------------
  //  PAGO (MercadoPago)
  // ----------------------------------------------------------
  payment: {
    currency: "ARS",
    description: "Voto en RecreoArgento",
    packs: [
      { votes: 1, price: 100, label: "1 voto", badge: null },
      { votes: 2, price: 200, label: "2 votos", badge: null },
      { votes: 5, price: 300, label: "5 votos", badge: "¡Mejor precio!" },
    ],
  },

  // ----------------------------------------------------------
  //  REDES SOCIALES
  // ----------------------------------------------------------
  social: {
    instagram: "https://instagram.com/recreoargento",
    twitter: "https://x.com/recreoargento",
    tiktok: "https://tiktok.com/@recreoargento",
  },

  // ----------------------------------------------------------
  //  SALON DE LA FAMA — semanas anteriores
  //  Agregar una entrada por cada semana que termina.
  // ----------------------------------------------------------
  // pastWeeks: [] as Array<{
  //   weekId: string;
  //   title: string;
  //   resultImage: string;
  //   totalVotes: number;
  //   winners: string[];
  // }>,

  pastWeeks: [
    {
      weekId: "semana-0",
      title: "La última gran cena argentina",
      resultImage: "/hall-of-fame1.jpg",
      totalVotes: 12345,
      winners: [""],
    },
  ],

  // ----------------------------------------------------------
  //  PROXIMAMENTE
  // ----------------------------------------------------------
  comingSoon: [
    {
      title: "La Gran Parrillada Nacional",
      hint: "Hay cosas que nunca pueden faltar en un asado... ¿o sí?",
    },
    {
      title: "Las 7 maravillas de nuestro país",
      hint: "Argentina tiene lugares increíbles. Pero solo 7 llegarán a la cima.",
    },
    {
      title: "Recreo Argento streaming",
      hint: "El panel perfecto todavía no existe... ¿a quién sentarías frente al micrófono?",
    },
  ],

  // ----------------------------------------------------------
  //  TEXTOS DE LA UI
  // ----------------------------------------------------------
  ui: {
    hero: {
      badge: "Semana 1",
      title: "¿Quiénes se sientan en la última gran cena argentina?",
      subtitle:
        "Elegí una figura por día. El más votado consigue su lugar en la mesa.",
    },
    voting: {
      closingHour: 22, // hora de cierre diario (formato 24hs, hora de Argentina)
      sectionTitle: "Votá hoy",
      customOptionPlaceholder: "¿No está lo que querés? Escribilo acá...",
      voteButton: "Votar",
      processingButton: "Procesando...",
      closedMessage:
        "La votación de hoy ya cerró. El ganador se revela a las 22hs.",
      successMessage: "¡Tu voto fue registrado!",
    },
    winners: {
      sectionTitle: "Ganadores de esta semana",
      emptyMessage: "Acá aparecerán los ganadores de cada día.",
    },
    footer: {
      text: "RecreoArgento © 2026",
    },
  },
} as const;

export type WeekConfig = typeof weekConfig;
