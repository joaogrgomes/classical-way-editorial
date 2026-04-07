import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const themes = ["Todos os temas", "Sala de Aula", "Família", "Trivium", "Quadrivium", "Arte & Cultura", "Teologia & Pedagogia", "Negócios & Marketing", "Gestão"];

const allArticles = [
  {
    category: "Sala de Aula",
    title: "Aprender Latim não é elitismo: é restituir o acesso à sabedoria ocidental",
    excerpt: "A língua latina não é um luxo arcaico, mas a chave para uma herança intelectual e espiritual que moldou a civilização.",
    author: "Profa. Clara Mendes",
    date: "10 Mar. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg",
  },
  {
    category: "Trivium",
    title: "Platão na sala de aula: o mito da caverna como método pedagógico",
    excerpt: "Da alegoria platônica à prática docente contemporânea — como a filosofia clássica transforma o ensino.",
    author: "Dr. Samuel Luz",
    date: "18 Fev. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clementino_Inv305.jpg/800px-Plato_Pio-Clementino_Inv305.jpg",
  },
  {
    category: "Arte & Cultura",
    title: "Homero, os heróis e a educação do coração",
    excerpt: "A Ilíada e a Odisseia como mapas da condição humana que ressoam com a antropologia cristã.",
    author: "Prof. Rodrigo Castro",
    date: "20 Fev. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Euphronios_krater_side_A_MET_1972.11.10.jpg/1200px-Euphronios_krater_side_A_MET_1972.11.10.jpg",
  },
  {
    category: "Teologia & Pedagogia",
    title: "Lutero, Calvino e a reforma do ensino: uma herança protestante",
    excerpt: "Como a Reforma moldou uma nova visão de educação centrada na Escritura, na leitura e na formação do caráter.",
    author: "Rev. Tiago Nogueira",
    date: "5 Fev. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg",
  },
  {
    category: "Sala de Aula",
    title: "Como estruturar um currículo clássico do zero",
    excerpt: "Um guia prático para famílias e escolas que desejam iniciar a jornada da educação clássica com clareza e método.",
    author: "Marina Santos",
    date: "28 Jan. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clementino_Inv305.jpg/800px-Plato_Pio-Clementino_Inv305.jpg",
  },
  {
    category: "Trivium",
    title: "Virtude em Aristóteles e sua relevância para a educação cristã hoje",
    excerpt: "A ética das virtudes como fundamento da formação integral do aluno — prudência, justiça, temperança e fortaleza.",
    author: "Dr. Samuel Luz",
    date: "15 Jan. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Euphronios_krater_side_A_MET_1972.11.10.jpg/1200px-Euphronios_krater_side_A_MET_1972.11.10.jpg",
  },
  {
    category: "Família",
    title: "A leitura em voz alta como liturgia familiar",
    excerpt: "Ler juntos não é apenas pedagogia — é um ato de amor, memória e formação do imaginário moral.",
    author: "Ana Beatriz Lopes",
    date: "8 Jan. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg",
  },
  {
    category: "Sala de Aula",
    title: "O papel da memorização na formação clássica",
    excerpt: "Decorar não é decorativo: a memória como faculdade essencial no Trivium e na tradição cristã.",
    author: "Profa. Clara Mendes",
    date: "2 Jan. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clementino_Inv305.jpg/800px-Plato_Pio-Clementino_Inv305.jpg",
  },
  {
    category: "Arte & Cultura",
    title: "Virgílio e a educação do desejo: a Eneida como itinerário da alma",
    excerpt: "A epopeia romana como narrativa de formação — do exílio à pátria, da errância à vocação.",
    author: "Prof. Rodrigo Castro",
    date: "20 Dez. 2025",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Euphronios_krater_side_A_MET_1972.11.10.jpg/1200px-Euphronios_krater_side_A_MET_1972.11.10.jpg",
  },
];

const uniqueAuthors = ["Todos os autores", ...Array.from(new Set(allArticles.map((a) => a.author)))];

const ArtigosPage = () => {
  const [activeTheme, setActiveTheme] = useState("Todos os temas");
  const [activeAuthor, setActiveAuthor] = useState("Todos os autores");
  const [themeOpen, setThemeOpen] = useState(false);
  const [authorOpen, setAuthorOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  useScrollReveal();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) setThemeOpen(false);
      if (authorRef.current && !authorRef.current.contains(e.target as Node)) setAuthorOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = allArticles.filter((a) => {
    const matchTheme = activeTheme === "Todos os temas" || a.category === activeTheme;
    const matchAuthor = activeAuthor === "Todos os autores" || a.author === activeAuthor;
    return matchTheme && matchAuthor;
  });

  const dropdownBtnClass =
    "border border-gy-200 text-gy-700 font-display text-[0.48rem] tracking-[0.14em] uppercase px-4 py-2 flex items-center gap-2 hover:border-gy-400 transition-colors";

  const dropdownMenuClass =
    "absolute top-full left-0 mt-1 bg-background border border-gy-100 shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-50 min-w-[200px]";

  const dropdownItemClass =
    "px-4 py-2.5 font-display text-[0.48rem] tracking-[0.14em] uppercase text-gy-700 hover:bg-surface-warm cursor-pointer block w-full text-left transition-colors";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Page header */}
      <div className="bg-bx-900 py-14 lg:py-20">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <h1 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] italic font-semibold text-white/[0.92] leading-[1.15] mb-3">
            Artigos
          </h1>
          <p className="font-body text-[1.05rem] text-white/[0.45] max-w-[52ch] leading-[1.7]">
            Reflexões sobre educação clássica, formação cristã e a herança intelectual do Ocidente.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-gy-100 sticky top-[58px] z-40 bg-background/95 backdrop-blur-sm">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] py-3">
          <div className="flex gap-3 flex-wrap">
            {/* Theme dropdown */}
            <div className="relative" ref={themeRef}>
              <button onClick={() => { setThemeOpen(!themeOpen); setAuthorOpen(false); }} className={dropdownBtnClass}>
                {activeTheme} <ChevronDown size={12} className={`transition-transform ${themeOpen ? "rotate-180" : ""}`} />
              </button>
              {themeOpen && (
                <div className={dropdownMenuClass}>
                  {themes.map((t) => (
                    <button
                      key={t}
                      onClick={() => { setActiveTheme(t); setThemeOpen(false); }}
                      className={`${dropdownItemClass} ${activeTheme === t ? "bg-surface-warm text-bx-900 font-semibold" : ""}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Author dropdown */}
            <div className="relative" ref={authorRef}>
              <button onClick={() => { setAuthorOpen(!authorOpen); setThemeOpen(false); }} className={dropdownBtnClass}>
                {activeAuthor} <ChevronDown size={12} className={`transition-transform ${authorOpen ? "rotate-180" : ""}`} />
              </button>
              {authorOpen && (
                <div className={dropdownMenuClass}>
                  {uniqueAuthors.map((a) => (
                    <button
                      key={a}
                      onClick={() => { setActiveAuthor(a); setAuthorOpen(false); }}
                      className={`${dropdownItemClass} ${activeAuthor === a ? "bg-surface-warm text-bx-900 font-semibold" : ""}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-body text-gy-400 text-lg">Nenhum artigo encontrado com esses filtros.</p>
              <button
                onClick={() => { setActiveTheme("Todos os temas"); setActiveAuthor("Todos os autores"); }}
                className="font-display text-[0.5rem] tracking-[0.14em] uppercase text-bx-700 mt-4 hover:text-bx-600 transition-colors"
              >
                Limpar filtros →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filtered.map((article) => (
                <Link key={article.title} to="/artigos/exemplo" className="group cursor-pointer reveal block">
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-display text-[0.44rem] tracking-[0.16em] uppercase text-bx-600 font-semibold mb-2 block">
                    {article.category}
                  </span>
                  <h2 className="font-heading text-[1.15rem] font-semibold italic text-gy-900 leading-[1.25] mb-2 group-hover:text-bx-700 transition-colors">
                    {article.title}
                  </h2>
                  <p className="font-body text-[0.92rem] text-gy-500 leading-[1.65] mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-display text-[0.46rem] tracking-[0.12em] uppercase text-gy-400">{article.author}</span>
                    <span className="font-display text-[0.46rem] tracking-[0.1em] uppercase text-gy-300">{article.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ArtigosPage;
