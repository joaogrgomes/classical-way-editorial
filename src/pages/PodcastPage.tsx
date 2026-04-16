import { useState, useEffect, useRef } from "react";
import { Play, ChevronDown, ExternalLink } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import podcastCover from "@/assets/podcast-cover.jpg";

const categories = ["Mais recentes", "Mais vistos"];

const allEpisodes = [
  {
    title: "Ep. 42 — Logos e Palavra: linguagem como dom divino na sala de aula clássica",
    duration: "45 min",
    date: "7 Mar. 2026",
    source: "Classical Founders",
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
    source: "Classical Founders",
    type: "Podcast",
    desc: "A pedagogia agostiniana revisitada: o desejo, a inquietude e o repouso em Deus como motor da aprendizagem.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Euphronios_krater_side_A_MET_1972.11.10.jpg/1200px-Euphronios_krater_side_A_MET_1972.11.10.jpg",
  },
  {
    title: "Ep. 40 — Narração e Formação Moral: Charlotte Mason encontra os clássicos",
    duration: "41 min",
    date: "15 Fev. 2026",
    source: "Classical Founders",
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
    source: "Classical Founders",
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

const ITEMS_PER_PAGE = 6;

const PodcastPage = () => {
  const [activeCategory, setActiveCategory] = useState("Mais recentes");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [subOpen, setSubOpen] = useState(false);
  const subRef = useRef<HTMLDivElement>(null);
  useScrollReveal();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (subRef.current && !subRef.current.contains(e.target as Node)) setSubOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = activeCategory === "Mais vistos"
    ? [...allEpisodes].reverse()
    : allEpisodes;

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Classical Founders Podcast — The Classical Way"
        description="Conversas semanais sobre educação clássica, artes liberais e formação cristã. Porque ensinar é uma vocação que exige sabedoria."
        canonical="https://theclassicalway.com.br/podcasts"
        ogType="website"
      />
      <SiteHeader />

      {/* Hero */}
      <div className="bg-bx-900 py-14 lg:py-20">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
            {/* Info */}
            <div className="flex-1 order-2 md:order-1">
              <h1 className="font-heading text-[clamp(2.16rem,4.8vw,3.36rem)] italic font-semibold text-white/[0.92] leading-[1.15] mb-3">
                Classical Founders
              </h1>
              <p className="font-body text-[1.26rem] text-white/[0.45] max-w-[480px] leading-[1.7] mb-6">
                Conversas semanais sobre educação clássica, artes liberais e formação cristã. Porque ensinar é uma vocação que exige sabedoria.
              </p>

              {/* Subscribe + YouTube */}
              <div className="flex items-center gap-5">
                <div className="relative" ref={subRef}>
                  <button
                    onClick={() => setSubOpen(!subOpen)}
                    className="bg-gd-700 text-white font-display text-[0.6rem] tracking-[0.16em] uppercase px-4 py-2 flex items-center gap-2 transition-colors hover:bg-gd-600"
                  >
                    Inscrever-se <ChevronDown size={12} />
                  </button>
                  {subOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-gy-900 text-white z-20 min-w-[180px]">
                      {["Apple Podcasts", "Spotify", "RSS"].map((p) => (
                        <a key={p} href="#" className="flex items-center gap-2 py-2 px-4 font-display text-[0.6rem] tracking-[0.14em] uppercase hover:bg-gy-700 cursor-pointer transition-colors">
                          <ExternalLink size={12} /> {p}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <a href="#" className="font-display text-[0.6rem] tracking-[0.14em] uppercase text-white/[0.45] hover:text-white/[0.7] transition-colors flex items-center gap-2">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>
                  Assistir no YouTube
                </a>
              </div>
            </div>

            {/* Cover */}
            <div className="w-[200px] lg:w-[240px] flex-shrink-0 order-1 md:order-2">
              <img
                src={podcastCover}
                alt="Classical Founders"
                className="w-full aspect-square object-cover shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                width={512}
                height={512}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div id="episodios" className="border-b border-gy-100 sticky top-[58px] z-40 bg-background/95 backdrop-blur-sm">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide py-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(ITEMS_PER_PAGE); }}
                className={`font-display text-[0.6rem] tracking-[0.14em] uppercase whitespace-nowrap px-4 py-3.5 border-b-2 transition-colors duration-200 ${
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
          {visible.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {visible.map((ep) => (
                  <article key={ep.title} className="group cursor-pointer reveal flex gap-5">
                    <div className="w-[140px] lg:w-[180px] flex-shrink-0 aspect-square relative overflow-hidden">
                      <img
                        src={ep.image}
                        alt={ep.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-bx-900/40" />
                      <span className="absolute top-2 left-2 font-display text-[0.6rem] tracking-[0.14em] uppercase bg-bx-700 text-white px-2 py-[2px] z-10">
                        {ep.type}
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-10 h-10 rounded-full bg-gd-600/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-gd-500 transition-all">
                          <Play size={15} className="ml-[2px] fill-bx-900 text-bx-900" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 py-1">
                      <h2 className="font-heading text-[1.26rem] font-semibold italic text-gy-900 leading-[1.3] mb-2 group-hover:text-bx-700 transition-colors">
                        {ep.title}
                      </h2>
                      <p className="font-body text-[1.06rem] text-gy-500 leading-[1.6] mb-3 line-clamp-2">
                        {ep.desc}
                      </p>
                      <div className="font-display text-[0.55rem] tracking-[0.1em] uppercase text-gy-400 flex gap-2 flex-wrap">
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

              {hasMore && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                    className="font-display text-[0.6rem] tracking-[0.16em] uppercase border border-gy-200 text-gy-600 px-6 py-[9px] hover:border-gy-400 hover:text-gy-800 transition-colors"
                  >
                    Carregar mais episódios
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default PodcastPage;
