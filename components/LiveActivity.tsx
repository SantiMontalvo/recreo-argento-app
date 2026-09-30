"use client";

import { useEffect, useState } from "react";
import { weekConfig } from "@/config/week.config";
import { cn } from "@/lib/utils";

const NOMBRES = [
  "Martín",
  "Lucía",
  "Federico",
  "Valentina",
  "Gonzalo",
  "Camila",
  "Sebastián",
  "Florencia",
  "Matías",
  "Agustina",
  "Nicolás",
  "Romina",
  "Leandro",
  "Micaela",
  "Hernán",
  "Natalia",
  "Rodrigo",
  "Sofía",
  "Gustavo",
  "Paula",
  "Diego",
  "Lorena",
  "Pablo",
  "Gabriela",
  "Tomás",
  "Santiago",
  "Mariana",
  "Facundo",
  "Julieta",
  "Franco",
  "Carolina",
  "Lucas",
  "Victoria",
  "Joaquín",
  "Agustina",
  "Ignacio",
  "Pilar",
  "Emiliano",
  "Malena",
  "Bruno",
  "Candela",
  "Ramiro",
  "Rocío",
  "Ezequiel",
  "Clara",
  "Maximiliano",
  "Josefina",
  "Agustín",
  "Belén",
  "Nahuel",
  "Marina",
  "Alejandro",
  "Milagros",
  "Damián",
  "Lautaro",
  "Antonella",
  "Germán",
  "Abril",
  "Juan",
  "Carla",
];

const UBICACIONES = [
  "Buenos Aires",
  "La Plata",
  "Mar del Plata",
  "Bahía Blanca",
  "San Isidro",
  "Quilmes",
  "Tigre",
  "Morón",
  "Lomas de Zamora",
  "Avellaneda",
  "Córdoba",
  "Villa Carlos Paz",
  "Río Cuarto",
  "Rosario",
  "Santa Fe",
  "Rafaela",
  "Mendoza",
  "San Rafael",
  "San Juan",
  "Salta",
  "San Miguel de Tucumán",
  "Jujuy",
  "Neuquén",
  "Bariloche",
  "Comodoro Rivadavia",
  "Puerto Madryn",
  "Posadas",
  "Resistencia",
  "Corrientes",
  "Paraná",
  "Ushuaia",
  "La Rioja",
  "Catamarca",
  "San Luis",
  "Santiago del Estero",
];

const COMENTARIOS = [
  "No puede faltar.",
  "Es obvio.",
  "Banco fuerte.",
  "Tiene que estar.",
  "Para mí, sí o sí.",
  "No hay debate.",
  "Imprescindible.",
  "¿Cómo no va a estar?",
  "Tiene que entrar.",
  "Lo voté de una.",
  "Es fija.",
  "Para mí es número uno.",
  "No puede quedar afuera.",
  "Hay que meterlo.",
  "Mi voto va por acá.",
  "Si no está, no es lo mismo.",
  "Se lo ganó.",
  "Sin dudas.",
  "Vengo a bancar esta.",
  "No podía votar otra cosa.",
  "Esto tiene que estar.",
  "Me parece fundamental.",
  "Esta es mi humilde opinión.",
  "Banco a muerte.",
  "Recontra sí.",
  "Olvidate.",
  "De una.",
  "Mil veces sí.",
  "Es por acá.",
  "No tengo dudas.",
  "Para mí, gana caminando.",
  "Hay que darle un lugar.",
  "No se discute.",
  "Es necesaria.",
  "Tiene todo para estar.",
  "Esta tiene mi voto.",
  "Acá no hay discusión.",
  "Era esta.",
  "No podía faltar.",
  "Es una fija.",
  "Banco muchísimo.",
  "Tiene que aparecer.",
  "Yo vine por esta.",
  "La banco.",
  "Me representa.",
  "Es un montón.",
  "Esto es Argentina.",
  "Muy difícil elegir otra.",
  "Para mí, entra seguro.",
  "Tiene que estar en la mesa.",
  "No puede quedar afuera de esto.",
  "Acá estoy de acuerdo.",
  "Firmo acá.",
  "Listo, ya está.",
  "Caso cerrado.",
  "Tema terminado.",
  "No hace falta discutirlo.",
  "Creo que está bastante claro.",
  "¿Qué más hay que pensar?",
  "No hay mucho para discutir.",
  "Esto se cae de maduro.",
  "Era cantado.",
  "Se veía venir.",
  "Más claro imposible.",
  "Está clarísimo.",
  "No necesito pensarlo.",
  "Fue mi primera opción.",
  "Voté sin dudar.",
  "Ni lo pensé.",
  "La tenía clarísima.",
  "Entré y voté esta.",
  "Esta fue fácil.",
  "No me costó nada elegir.",
  "Me quedo con esta.",
  "Voy con esta.",
  "Elijo esta.",
  "Esta es la mía.",
  "Acá estoy.",
  "Pongo mi voto acá.",
  "Todo dicho.",
  "Hasta acá llegamos.",
  "Que pase a la mesa.",
  "Que entre.",
  "Dale, que entre.",
  "Necesitamos esto.",
  "Esto no puede faltar.",
  "Sería un papelón dejarlo afuera.",
  "No podemos hacer como que no existe.",
  "Hay que reconocerlo.",
  "Tiene ganado el lugar.",
  "Se merece estar.",
  "Tiene que tener su lugar.",
  "Acá tiene que estar.",
  "Para mí, entra.",
  "Yo lo pongo.",
  "Yo la pongo.",
  "Yo voy con esta.",
  "Me la juego por esta.",
  "Apuesto por esta.",
  "Esta es mi apuesta.",
  "Vamos con esta.",
  "Que sea esta.",
  "Ojalá quede.",
  "Necesito verla en la mesa.",
  "Quiero verla ahí.",
  "Quiero esto en la lista.",
  "Esto tiene que pasar.",
  "No puede ser que quede afuera.",
  "Sería raro que no esté.",
  "Algo me dice que tiene que estar.",
  "Tiene pinta de finalista.",
  "Tiene pinta de entrar.",
  "Acá hay algo.",
  "Hay que darle una chance.",
  "Merece una oportunidad.",
  "Yo le doy mi voto.",
  "Mi voto está acá.",
  "Voto cantado.",
  "Voto fácil.",
  "Voto obvio.",
  "Voto seguro.",
  "Voto con convicción.",
  "No me arrepiento de este voto.",
  "Banco la elección.",
  "Banco esta decisión.",
  "Estoy para esta.",
  "Estoy de acuerdo.",
  "Coincido totalmente.",
  "100% de acuerdo.",
  "No puedo estar más de acuerdo.",
  "Exactamente.",
  "Tal cual.",
  "Totalmente.",
  "Así sí.",
  "Por fin alguien lo propone.",
  "Alguien tenía que decirlo.",
  "Era hora.",
  "Se tenía que votar.",
  "Este debate me representa.",
  "Acá se viene a votar.",
  "Vine a cerrar este debate.",
  "Hay que resolver esto de una vez.",
  "Después de tantos años, acá estamos.",
  "Bueno, finalmente.",
  "Llegó el momento.",
  "Que empiece el debate.",
  "Que se defina de una vez.",
  "A ver qué dice la gente.",
  "Quiero ver cómo termina esto.",
  "Esto se va a poner interesante.",
  "Acá hay debate.",
  "Se picó.",
  "Esto va a traer discusión.",
  "Se vienen los comentarios.",
  "No sé qué va a pasar, pero voto esta.",
  "Que sea lo que tenga que ser.",
  "Hice mi parte.",
  "Yo ya cumplí.",
  "Voto y me voy.",
  "Listo, cumplí.",
  "Una menos para decidir.",
  "Debate cerrado para mí.",
  "Mi parte está hecha.",
];

type Activity = {
  id: number;
  name: string;
  location: string;
  option: string;
  comment?: string;
  visible: boolean;
};

let counter = 0;

function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDelay(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min));
}

function createActivity(): Activity {
  const hasComment = Math.random() > 0.25;

  return {
    id: counter++,
    name: randomFrom(NOMBRES),
    location: randomFrom(UBICACIONES),
    option: randomFrom(weekConfig.options).text as string,
    comment: hasComment ? randomFrom(COMENTARIOS) : undefined,
    visible: true,
  };
}

// Versión inline (sidebar desktop)
export function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    function addActivity() {
      const newItem = createActivity();

      setActivities((prev) => [newItem, ...prev].slice(0, 6));
    }

    addActivity();

    let timeout: ReturnType<typeof setTimeout>;

    function scheduleNext() {
      timeout = setTimeout(() => {
        addActivity();
        scheduleNext();
      }, randomDelay(4000, 9000));
    }

    scheduleNext();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-[#141414]/6 overflow-hidden">
      <div className="px-4 py-3 border-b border-[#141414]/6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-bold text-[#141414] uppercase tracking-wider">
          En vivo
        </span>
      </div>

      <div className="divide-y divide-[#141414]/4">
        {activities.length === 0 && (
          <div className="px-4 py-4 text-xs text-[#141414]/30 text-center">
            Cargando actividad...
          </div>
        )}

        {activities.map((a, i) => (
          <div
            key={a.id}
            className={cn(
              "px-4 py-3 flex items-start gap-3 transition-all duration-500",
              i === 0 ? "bg-[#ffdd4a]/10" : "bg-white"
            )}
          >
            {/* Avatar inicial */}
            <div className="w-7 h-7 rounded-full bg-[#77b6ea]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-[#77b6ea]">
                {a.name[0]}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#141414] leading-snug">
                <span className="font-semibold">{a.name}</span>
                {" votó por "}
                <span className="font-semibold text-[#141414]">
                  "{a.option}"
                </span>
              </p>

              {a.comment && (
                <p className="text-[10px] text-[#141414]/45 mt-0.5 italic">
                  “{a.comment}”
                </p>
              )}

              <p className="text-[10px] text-[#141414]/35 mt-0.5">
                {a.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Versión popup flotante (mobile)
export function LiveActivityPopup() {
  const [popup, setPopup] = useState<Activity | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout>;
    let showTimeout: ReturnType<typeof setTimeout>;

    function showPopup() {
      const item = createActivity();

      setPopup(item);
      setVisible(true);

      hideTimeout = setTimeout(() => {
        setVisible(false);
      }, 3500);

      showTimeout = setTimeout(() => {
        showPopup();
      }, randomDelay(8000, 15000));
    }

    showTimeout = setTimeout(() => {
      showPopup();
    }, 2000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  if (!popup) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-4 z-40 transition-all duration-500 lg:hidden",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <div className="bg-[#141414] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl max-w-[280px]">
        <div className="w-8 h-8 rounded-full bg-[#77b6ea]/20 flex items-center justify-center flex-shrink-0">
          <span className="text-[11px] font-bold text-[#77b6ea]">
            {popup.name[0]}
          </span>
        </div>

        <div>
          <p className="text-white text-xs leading-snug">
            <span className="font-semibold">{popup.name}</span> votó por{" "}
            <span className="text-[#ffdd4a] font-semibold">
              "{popup.option}"
            </span>
          </p>

          {popup.comment && (
            <p className="text-white/40 text-[10px] italic mt-0.5">
              “{popup.comment}”
            </p>
          )}

          <p className="text-white/30 text-[10px]">{popup.location}</p>
        </div>
      </div>
    </div>
  );
}
