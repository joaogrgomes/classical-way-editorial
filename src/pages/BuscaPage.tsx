import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, SlidersHorizontal } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FilterSidebar, { FilterState, FilterCounts } from "@/components/search/FilterSidebar";
import SearchResultCard from "@/components/search/SearchResultCard";
import ActiveFilterChips, { ActiveFilter } from "@/components/search/ActiveFilterChips";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type MockResult = {
  id: string;
  type: string;
  title: string;
  authors: string[];
  date: string;
  year: string;
  excerpt: string;
  href: string;
  theme: string;
};

const MOCK_RESULTS: MockResult[] = [
  {
    id: "1",
    type: "Artigo",
    title: "O Trivium e a Formação do Pensamento Clássico",
    authors: ["Rodrigo Almeida"],
    date: "2025-11-15",
    year: "2025",
    excerpt:
      "O trivium — gramática, lógica e retórica — constitui o fundamento da educação clássica. Através dessas três disciplinas, a mente aprende a perceber a realidade, raciocinar com clareza e comunicar a verdade com beleza e persuasão.",
    href: "/artigos/o-trivium-e-a-formacao",
    theme: "Trivium",
  },
  {
    id: "2",
    type: "Podcast",
    title: "O Método Socrático e a Arte de Fazer Perguntas",
    authors: ["Rodrigo Almeida"],
    date: "2025-09-03",
    year: "2025",
    excerpt:
      "Neste episódio, Rodrigo Almeida explora como o método socrático — a arte de conduzir o pensamento por meio de perguntas — pode ser aplicado na sala de aula clássica e na formação moral dos filhos em casa.",
    href: "/podcasts/metodo-socratico-arte-de-perguntas",
    theme: "Pedagogia",
  },
  {
    id: "3",
    type: "Resenha de Livro",
    title: "Resenha: Educação Clássica Cristã, de Gene Edward Veith",
    authors: ["Rodrigo Almeida"],
    date: "2025-07-20",
    year: "2025",
    excerpt:
      "Gene Edward Veith e Andrew Kern oferecem uma defesa apaixonada da educação clássica cristã, mostrando como ela forma não apenas mentes brilhantes, mas almas moldadas pela verdade, bondade e beleza.",
    href: "/resenhas/educacao-classica-crista-veith",
    theme: "Trivium",
  },
  {
    id: "4",
    type: "Artigo",
    title: "Cosmovisão Cristã e a Herança Intelectual do Ocidente",
    authors: ["Pedro Henrique Costa"],
    date: "2024-12-10",
    year: "2024",
    excerpt:
      "A cosmovisão cristã não é apenas um conjunto de crenças religiosas, mas uma maneira integral de enxergar a realidade. Os grandes pensadores do Ocidente — Agostinho, Tomás de Aquino, Calvino — moldaram uma tradição que ainda ecoa em nossa cultura.",
    href: "/artigos/cosmovisao-crista-heranca-ocidental",
    theme: "Cosmovisão",
  },
  {
    id: "5",
    type: "Artigo",
    title: "Pedagogia Clássica: Da Gramática à Dialética",
    authors: ["Ana Clara Borges"],
    date: "2024-08-05",
    year: "2024",
    excerpt:
      "A pedagogia clássica acompanha o desenvolvimento cognitivo natural da criança. Na fase da gramática, absorvemos os fatos do mundo. Na dialética, aprendemos a questioná-los. Na retórica, expressamos com eloquência o que descobrimos.",
    href: "/artigos/pedagogia-classica-gramatica-dialetica",
    theme: "Pedagogia",
  },
  {
    id: "6",
    type: "Podcast",
    title: "Literatura Clássica para Crianças — Por Onde Começar?",
    authors: ["Maria Fernanda"],
    date: "2024-03-15",
    year: "2024",
    excerpt:
      "A introdução às grandes obras da literatura ocidental pode — e deve — começar cedo. Neste episódio, discutimos listas de leitura por faixa etária, adaptações recomendadas e como criar o hábito da leitura em família.",
    href: "/podcasts/literatura-classica-para-criancas",
    theme: "Literatura Clássica",
  },
  {
    id: "7",
    type: "Artigo",
    title: "Salmos na Sala de Aula: Poesia e Formação da Alma",
    authors: ["Ana Clara Borges"],
    date: "2023-10-22",
    year: "2023",
    excerpt:
      "Os Salmos representam o ápice da poesia hebraica e oferecem um modelo inigualável para a formação da alma. Usá-los na sala de aula não é apenas instrução religiosa — é a introdução ao que há de mais profundo na linguagem humana.",
    href: "/artigos/salmos-sala-de-aula",
    theme: "Literatura Clássica",
  },
  {
    id: "8",
    type: "Resenha de Livro",
    title: "Resenha: Recovering the Lost Tools of Learning, de Douglas Wilson",
    authors: ["Pedro Henrique Costa"],
    date: "2023-05-08",
    year: "2023",
    excerpt:
      "Douglas Wilson apresenta um manifesto apaixonado pela restauração da educação clássica cristã. Com argumentos precisos e exemplos práticos, ele desafia o modelo educacional moderno e convida professores e pais a recuperarem a herança perdida do Ocidente.",
    href: "/resenhas/recovering-lost-tools",
    theme: "Pedagogia",
  },
];

const SUGGESTION_CHIPS = ["Trivium", "Pedagogia", "Literatura Clássica", "Cosmovisão", "Rodrigo Almeida"];

type SortOrder = "relevance" | "newest" | "oldest";

const EMPTY_FILTERS: FilterState = {
  authors: [],
  types: [],
  years: [],
  themes: [],
};

const BuscaPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") ?? "";

  const [inputValue, setInputValue] = useState(queryFromUrl);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [sortOrder, setSortOrder] = useState<SortOrder>("relevance");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync input → URL (debounced 300ms)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const next: Record<string, string> = {};
      if (inputValue) next.q = inputValue;
      setSearchParams(next, { replace: true });
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputValue]);

  // Sync URL → input on direct navigation to /busca?q=...
  useEffect(() => {
    setInputValue(queryFromUrl);
  }, [queryFromUrl]);

  const hasQuery = queryFromUrl.trim().length > 0;
  const hasFilters = Object.values(filters).some((v) => v.length > 0);
  const isEmptyState = !hasQuery && !hasFilters;

  // Results matching the query only (used for computing sidebar counts)
  const queryResults = useMemo(() => {
    if (!hasQuery) return MOCK_RESULTS;
    const q = queryFromUrl.toLowerCase().trim();
    return MOCK_RESULTS.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.excerpt.toLowerCase().includes(q) ||
        r.authors.some((a) => a.toLowerCase().includes(q)) ||
        r.type.toLowerCase().includes(q)
    );
  }, [queryFromUrl, hasQuery]);

  // Dynamic counts for sidebar facets, derived from query results
  const filterCounts = useMemo<FilterCounts>(() => {
    const authors: Record<string, number> = {};
    const types: Record<string, number> = {};
    const years: Record<string, number> = {};
    const themes: Record<string, number> = {};
    queryResults.forEach((r) => {
      r.authors.forEach((a) => { authors[a] = (authors[a] ?? 0) + 1; });
      types[r.type] = (types[r.type] ?? 0) + 1;
      years[r.year] = (years[r.year] ?? 0) + 1;
      themes[r.theme] = (themes[r.theme] ?? 0) + 1;
    });
    return { authors, types, years, themes };
  }, [queryResults]);

  // Final results with sidebar filters applied on top of query results
  const filteredResults = useMemo(() => {
    let results = [...queryResults];

    if (filters.types.length > 0) {
      results = results.filter((r) => filters.types.includes(r.type));
    }
    if (filters.years.length > 0) {
      results = results.filter((r) => filters.years.includes(r.year));
    }
    if (filters.themes.length > 0) {
      results = results.filter((r) => filters.themes.includes(r.theme));
    }
    if (filters.authors.length > 0) {
      results = results.filter((r) =>
        r.authors.some((a) => filters.authors.includes(a))
      );
    }

    if (sortOrder === "newest") {
      results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortOrder === "oldest") {
      results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return results;
  }, [queryResults, filters, sortOrder]);

  const activeFiltersList = useMemo<ActiveFilter[]>(
    () => [
      ...filters.authors.map((v) => ({ key: v, label: v, group: "authors" })),
      ...filters.types.map((v) => ({ key: v, label: v, group: "types" })),
      ...filters.years.map((v) => ({ key: v, label: v, group: "years" })),
      ...filters.themes.map((v) => ({ key: v, label: v, group: "themes" })),
    ],
    [filters]
  );

  const handleRemoveFilter = (key: string, group: string) => {
    setFilters((prev) => ({
      ...prev,
      [group]: (prev[group as keyof FilterState] as string[]).filter((v) => v !== key),
    }));
  };

  const handleClearAll = () => setFilters(EMPTY_FILTERS);

  const SORT_OPTIONS: { key: SortOrder; label: string }[] = [
    { key: "relevance", label: "Relevância" },
    { key: "newest", label: "Mais Recentes" },
    { key: "oldest", label: "Mais Antigos" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Page header */}
      <div className="bg-bx-900 py-14 lg:py-20">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <h1 className="font-heading text-[clamp(2rem,4.8vw,3.2rem)] italic font-semibold text-white/[0.92] leading-[1.15] mb-3">
            Busca
          </h1>
          <p className="font-body text-[1.15rem] text-white/[0.45] max-w-[52ch] leading-[1.7]">
            Encontre artigos, podcasts, resenhas e outros conteúdos do Classical Way.
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] py-10">
        <div className="flex gap-12 lg:gap-14 items-start">

          {/* Filter sidebar — desktop */}
          <aside className="hidden lg:block w-[260px] flex-shrink-0 sticky top-[70px]">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} counts={filterCounts} />
          </aside>

          {/* Results column */}
          <div className="flex-1 min-w-0">

            {/* Mobile filter button */}
            <div className="lg:hidden mb-5">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex items-center gap-2 border border-gy-200 px-4 py-2 font-display text-[0.55rem] tracking-[0.14em] uppercase text-gy-700 hover:border-gy-400 transition-colors"
              >
                <SlidersHorizontal size={13} />
                Filtrar
                {activeFiltersList.length > 0 && (
                  <span className="bg-bx-700 text-white font-display text-[0.44rem] tracking-[0.08em] w-4 h-4 flex items-center justify-center">
                    {activeFiltersList.length}
                  </span>
                )}
              </button>
            </div>

            {/* Search bar */}
            <div className="relative mb-5">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gy-400 pointer-events-none"
              />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Buscar no Classical Way..."
                className="w-full border border-gy-200 pl-10 pr-10 py-3 font-body text-[1.05rem] text-gy-800 bg-background focus:outline-none focus:border-bx-600 transition-colors placeholder:text-gy-300"
                autoFocus={!!queryFromUrl}
              />
              {inputValue && (
                <button
                  onClick={() => setInputValue("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gy-400 hover:text-bx-700 transition-colors"
                  aria-label="Limpar busca"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Empty state — no query, no filters */}
            {isEmptyState ? (
              <div className="py-16 text-center">
                <Search size={36} className="text-gy-200 mx-auto mb-5" strokeWidth={1.5} />
                <p className="font-heading italic text-[1.4rem] text-gy-700 mb-2 leading-[1.3]">
                  O que você procura?
                </p>
                <p className="font-body text-[1rem] text-gy-400 mb-8 leading-[1.7]">
                  Digite um termo acima ou explore por tema.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTION_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => setInputValue(chip)}
                      className="border border-gy-200 px-4 py-1.5 font-display text-[0.5rem] tracking-[0.14em] uppercase text-gy-600 hover:border-bx-600 hover:text-bx-700 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Result count */}
                <p className="font-body text-[0.95rem] text-gy-500 mb-4">
                  <span className="font-semibold text-gy-800">{filteredResults.length}</span>{" "}
                  {filteredResults.length === 1 ? "resultado" : "resultados"}
                  {queryFromUrl && (
                    <>
                      {" "}para{" "}
                      <span className="font-heading italic text-gy-900">
                        &ldquo;{queryFromUrl}&rdquo;
                      </span>
                    </>
                  )}
                </p>

                {/* Sort tabs */}
                <div className="flex items-center gap-6 border-b border-gy-100 mb-3">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setSortOrder(opt.key)}
                      className={`font-display text-[0.5rem] tracking-[0.16em] uppercase pb-2.5 -mb-px transition-colors ${
                        sortOrder === opt.key
                          ? "text-gd-700 border-b-2 border-gd-700"
                          : "text-gy-400 hover:text-gy-700"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Active filter chips */}
                <ActiveFilterChips
                  filters={activeFiltersList}
                  onRemove={handleRemoveFilter}
                  onClearAll={handleClearAll}
                />

                {/* Results list */}
                {filteredResults.length === 0 ? (
                  <div className="py-20 text-center border-t border-gy-100 mt-2">
                    <p className="font-body text-gy-400 text-lg mb-4">
                      Nenhum resultado encontrado.
                    </p>
                    <button
                      onClick={() => {
                        setInputValue("");
                        handleClearAll();
                      }}
                      className="font-display text-[0.55rem] tracking-[0.14em] uppercase text-bx-700 hover:text-bx-600 transition-colors"
                    >
                      Limpar busca e filtros →
                    </button>
                  </div>
                ) : (
                  <div>
                    {filteredResults.map((result) => (
                      <SearchResultCard
                        key={result.id}
                        type={result.type}
                        title={result.title}
                        authors={result.authors}
                        date={result.date}
                        excerpt={result.excerpt}
                        href={result.href}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-y-auto bg-background border-t border-gy-100"
        >
          <SheetHeader className="mb-5">
            <SheetTitle className="font-display text-[0.65rem] tracking-[0.18em] uppercase text-gy-700 text-left">
              Filtros
            </SheetTitle>
          </SheetHeader>
          <FilterSidebar filters={filters} onFiltersChange={setFilters} counts={filterCounts} />
          <div className="mt-6 pb-2 flex gap-3">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="flex-1 font-display text-[0.55rem] tracking-[0.16em] uppercase bg-bx-700 text-white py-3 hover:bg-bx-600 transition-colors"
            >
              Ver {filteredResults.length}{" "}
              {filteredResults.length === 1 ? "resultado" : "resultados"}
            </button>
            {activeFiltersList.length > 0 && (
              <button
                onClick={handleClearAll}
                className="font-display text-[0.55rem] tracking-[0.16em] uppercase border border-gy-200 text-gy-700 px-5 py-3 hover:border-gy-400 transition-colors"
              >
                Limpar
              </button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <SiteFooter />
    </div>
  );
};

export default BuscaPage;
