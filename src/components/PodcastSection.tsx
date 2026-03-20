import { Link } from "react-router-dom";
import { Play } from "lucide-react";

const episodes = [
  {
    title: "Ep. 42 — Logos e Palavra: linguagem como dom divino na sala de aula clássica",
    duration: "45 min",
    date: "7 Mar. 2026",
    source: "The Classical Way Podcast",
    type: "Podcast",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg",
  },
  {
    title: "Introdução ao Método Socrático — como aplicar em qualquer disciplina escolar",
    duration: "38 min",
    date: "1 Mar. 2026",
    source: "Dr. Paulo Ribeiro",
    type: "Vídeo",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clementino_Inv305.jpg/800px-Plato_Pio-Clementino_Inv305.jpg",
  },
  {
    title: "Ep. 41 — Agostinho educador: aprender como movimento de amor em direção a Deus",
    duration: "52 min",
    date: "22 Fev. 2026",
    source: "The Classical Way Podcast",
    type: "Podcast",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Euphronios_krater_side_A_MET_1972.11.10.jpg/1200px-Euphronios_krater_side_A_MET_1972.11.10.jpg",
  },
];

const PodcastSection = () => (
  <section className="py-12 lg:py-16 border-t border-gy-100" id="podcast">
    <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3.5">
          <div className="w-8 h-0.5 bg-bx-700 flex-shrink-0" />
          <span className="font-display text-[0.6rem] tracking-[0.24em] uppercase text-gy-900 font-semibold">
            Podcasts e Vídeos
          </span>
        </div>
        <a href="#podcast" className="font-display text-[0.5rem] tracking-[0.14em] uppercase text-gy-300 hover:text-bx-700 transition-colors">
          Ver todos →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {episodes.map((ep) => (
          <article key={ep.title} className="group cursor-pointer transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] hover:-translate-y-[3px]">
            <div className="aspect-video relative overflow-hidden flex items-center justify-center">
              <img
                src={ep.image}
                alt={ep.title}
                className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-bx-900/48" />
              <span className="absolute top-2.5 left-2.5 font-display text-[0.44rem] tracking-[0.14em] uppercase bg-bx-700 text-white px-2 py-[3px] z-10">
                {ep.type}
              </span>
              <div className="absolute z-10 w-12 h-12 rounded-full bg-gd-600/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-gd-500 transition-all">
                <Play size={18} className="ml-[3px] fill-bx-900 text-bx-900" />
              </div>
            </div>
            <div className="pt-3.5">
              <p className="font-heading text-base font-semibold italic text-gy-900 leading-[1.3] mb-2">
                {ep.title}
              </p>
              <div className="font-display text-[0.52rem] tracking-[0.1em] uppercase text-gy-400 flex gap-2.5 flex-wrap">
                <span>{ep.duration}</span>
                <span>·</span>
                <span>{ep.date}</span>
                <span>·</span>
                <span className="whitespace-nowrap">{ep.source}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default PodcastSection;
