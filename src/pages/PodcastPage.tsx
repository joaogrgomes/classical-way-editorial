import { useState } from "react";
import { Play } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const categories = ["Todos", "Podcast", "Vídeo", "Entrevista"];

const allEpisodes = [
  {
    title: "Ep. 42 — Logos e Palavra: linguagem como dom divino na sala de aula clássica",
    duration: "45 min",
    date: "7 Mar. 2026",
    source: "The Classical Way Podcast",
    type: "Podcast",
    desc: "Uma conversa sobre como a linguagem — dom de Deus ao homem — deve ser tratada no ensino clássico com reverência e rigor.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg",
  },
  {
    title: "Introdução ao Método Socrático — como aplicar em qualquer disciplina escolar",
    duration: "38 min",
    date: "1 Mar. 2026",
    source: "Dr. Paulo Ribeiro",
    type: "Vídeo",
    desc: "Uma aula prática sobre o método socrático e sua aplicação nas mais diversas disciplinas do currículo clássico.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clementino_Inv305.jpg/800px-Plato_Pio-Clementino_Inv305.jpg",
  },
  {
    title: "Ep. 41 — Agostinho educador: aprender como movimento de amor em direção a Deus",
    duration: "52 min",
    date: "22 Fev. 2026",
    source: "The Classical Way Podcast",
    type: "Podcast",
    desc: "A pedagogia agostiniana revisitada: o desejo, a inquietude e o repouso em Deus como motor da aprendizagem.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Euphronios_krater_side_A_MET_1972.11.10.jpg/1200px-Euphronios_krater_side_A_MET_1972.11.10.jpg",
  },
  {
    title: "Ep. 40 — Narração e Formação Moral: Charlotte Mason encontra os clássicos",
    duration: "41 min",
    date: "15 Fev. 2026",
    source: "The Classical Way Podcast",
    type: "Podcast",
    desc: "Como a prática da narração oral forma o caráter e a memória, unindo Mason à tradição retórica clássica.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg",
  },
  {
    title: "Entrevista: A experiência de fundar uma escola clássica no Brasil",
    duration: "1h 12min",
    date: "8 Fev. 2026",
    source: "Profa. Clara Mendes",
    type: "Entrevista",
    desc: "Uma conversa franca sobre os desafios, alegrias e lições aprendidas ao fundar uma escola de orientação clássica no contexto brasileiro.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clementino_Inv305.jpg/800px-Plato_Pio-Clementino_Inv305.jpg",
  },
  {
    title: "Ep. 39 — A música como disciplina liberal: mais que arte, caminho para a ordem",
    duration: "48 min",
    date: "1 Fev. 2026",
    source: "The Classical Way Podcast",
    type: "Podcast",
    desc: "A música no Quadrivium: não como entretenimento, mas como ciência da proporção e harmonia cósmica.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Euphronios_krater_side_A_MET_1972.11.10.jpg/1200px-Euphronios_krater_side_A_MET_1972.11.10.jpg",
  },
  {
    title: "Como montar um grupo de estudo clássico na sua comunidade",
    duration: "28 min",
    date: "25 Jan. 2026",
    source: "Marina Santos",
    type: "Vídeo",
    desc: "Um guia prático em vídeo para iniciar um grupo de estudo de textos clássicos na sua igreja ou comunidade local.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg",
  },
  {
    title: "Entrevista: Educação clássica e famílias numerosas — relato de experiência",
    duration: "55 min",
    date: "18 Jan. 2026",
    source: "Ana Beatriz Lopes",
    type: "Entrevista",
    desc: "Como uma família com seis filhos organiza o dia a dia do homeschooling clássico com alegria e realismo.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clementino_Inv305.jpg/800px-Plato_Pio-Clementino_Inv305.jpg",
  },
];

const PodcastPage = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  useScrollReveal();

  const filtered = activeCategory === "Todos"
    ? allEpisodes
    : allEpisodes.filter((e) => e.type === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Page header */}
      <div className="bg-bx-900 py-14 lg:py-20">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <h1 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] italic font-semibold text-white/[0.92] leading-[1.15] mb-3">
            Podcasts & Vídeos
          </h1>
          <p className="font-body text-[1.05rem] text-white/[0.45] max-w-[52ch] leading-[1.7]">
            Conversas, aulas e entrevistas sobre educação clássica e formação cristã.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-gy-100 sticky top-[58px] z-40 bg-background/95 backdrop-blur-sm">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide py-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-display text-[0.5rem] tracking-[0.14em] uppercase whitespace-nowrap px-4 py-3.5 border-b-2 transition-colors duration-200 ${
                  activeCategory === cat
                    ? "border-bx-700 text-bx-700 font-semibold"
                    : "border-transparent text-gy-400 hover:text-gy-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Episodes grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-body text-gy-400 text-lg">Nenhum episódio encontrado nesta categoria.</p>
              <button
                onClick={() => setActiveCategory("Todos")}
                className="font-display text-[0.5rem] tracking-[0.14em] uppercase text-bx-700 mt-4 hover:text-bx-600 transition-colors"
              >
                Ver todos →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((ep) => (
                <article key={ep.title} className="group cursor-pointer reveal flex gap-5">
                  <div className="w-[140px] lg:w-[180px] flex-shrink-0 aspect-square relative overflow-hidden">
                    <img
                      src={ep.image}
                      alt={ep.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-bx-900/40" />
                    <span className="absolute top-2 left-2 font-display text-[0.42rem] tracking-[0.14em] uppercase bg-bx-700 text-white px-2 py-[2px] z-10">
                      {ep.type}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-10 h-10 rounded-full bg-gd-600/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-gd-500 transition-all">
                        <Play size={15} className="ml-[2px] fill-bx-900 text-bx-900" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 py-1">
                    <h2 className="font-heading text-[1.05rem] font-semibold italic text-gy-900 leading-[1.3] mb-2 group-hover:text-bx-700 transition-colors">
                      {ep.title}
                    </h2>
                    <p className="font-body text-[0.88rem] text-gy-500 leading-[1.6] mb-3 line-clamp-2">
                      {ep.desc}
                    </p>
                    <div className="font-display text-[0.46rem] tracking-[0.1em] uppercase text-gy-400 flex gap-2 flex-wrap">
                      <span>{ep.duration}</span>
                      <span className="text-gy-200">·</span>
                      <span>{ep.date}</span>
                      <span className="text-gy-200">·</span>
                      <span className="whitespace-nowrap">{ep.source}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default PodcastPage;
