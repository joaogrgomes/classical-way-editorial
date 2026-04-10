import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { supabase } from "@/lib/supabase";

const themes = ["Todos os temas", "Sala de Aula", "Família", "Trivium", "Quadrivium", "Arte & Cultura", "Teologia & Pedagogia", "Negócios & Marketing", "Gestão"];

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  cover_url: string;
  published_at: string;
  created_at: string;
  authors: { name: string } | null;
};

const ArtigosPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTheme, setActiveTheme] = useState("Todos os temas");
  const [activeAuthor, setActiveAuthor] = useState("Todos os autores");
  const [themeOpen, setThemeOpen] = useState(false);
  const [authorOpen, setAuthorOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  useScrollReveal();

  useEffect(() => {
    async function fetchArticles() {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, category, cover_url, published_at, created_at, authors(name)")
        .eq("status", "published")
        .order("created_at", { ascending: false });
      setArticles((data as unknown as Article[]) || []);
      setLoading(false);
    }
    fetchArticles();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) setThemeOpen(false);
      if (authorRef.current && !authorRef.current.contains(e.target as Node)) setAuthorOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const uniqueAuthors = ["Todos os autores", ...Array.from(new Set(articles.map((a) => a.authors?.name).filter(Boolean)))];

  const filtered = articles.filter((a) => {
    const matchTheme = activeTheme === "Todos os temas" || a.category === activeTheme;
    const matchAuthor = activeAuthor === "Todos os autores" || a.authors?.name === activeAuthor;
    return matchTheme && matchAuthor;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  };

  const dropdownBtnClass = "border border-gy-200 text-gy-700 font-display text-[0.58rem] tracking-[0.14em] uppercase px-4 py-2 flex items-center gap-2 hover:border-gy-400 transition-colors";
  const dropdownMenuClass = "absolute top-full left-0 mt-1 bg-background border border-gy-100 shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-50 min-w-[200px]";
  const dropdownItemClass = "px-4 py-2.5 font-display text-[0.58rem] tracking-[0.14em] uppercase text-gy-700 hover:bg-surface-warm cursor-pointer block w-full text-left transition-colors";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="bg-bx-900 py-14 lg:py-20">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <h1 className="font-heading text-[clamp(2.16rem,4.8vw,3.36rem)] italic font-semibold text-white/[0.92] leading-[1.15] mb-3">
            Artigos
          </h1>
          <p className="font-body text-[1.26rem] text-white/[0.45] max-w-[52ch] leading-[1.7]">
            Reflexões sobre educação clássica, formação cristã e a herança intelectual do Ocidente.
          </p>
        </div>
      </div>

      <div className="border-b border-gy-100 sticky top-[58px] z-40 bg-background/95 backdrop-blur-sm">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] py-3">
          <div className="flex gap-3 flex-wrap">
            <div className="relative" ref={themeRef}>
              <button onClick={() => { setThemeOpen(!themeOpen); setAuthorOpen(false); }} className={dropdownBtnClass}>
                {activeTheme} <ChevronDown size={12} className={`transition-transform ${themeOpen ? "rotate-180" : ""}`} />
              </button>
              {themeOpen && (
                <div className={dropdownMenuClass}>
                  {themes.map((t) => (
                    <button key={t} onClick={() => { setActiveTheme(t); setThemeOpen(false); }}
                      className={`${dropdownItemClass} ${activeTheme === t ? "bg-surface-warm text-bx-900 font-semibold" : ""}`}>
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={authorRef}>
              <button onClick={() => { setAuthorOpen(!authorOpen); setThemeOpen(false); }} className={dropdownBtnClass}>
                {activeAuthor} <ChevronDown size={12} className={`transition-transform ${authorOpen ? "rotate-180" : ""}`} />
              </button>
              {authorOpen && (
                <div className={dropdownMenuClass}>
                  {uniqueAuthors.map((a) => (
                    <button key={a} onClick={() => { setActiveAuthor(a as string); setAuthorOpen(false); }}
                      className={`${dropdownItemClass} ${activeAuthor === a ? "bg-surface-warm text-bx-900 font-semibold" : ""}`}>
                      {a}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          {loading ? (
            <div className="py-20 text-center">
              <p className="font-body text-gy-400 text-lg">Carregando artigos...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-body text-gy-400 text-lg">Nenhum artigo encontrado.</p>
              <button onClick={() => { setActiveTheme("Todos os temas"); setActiveAuthor("Todos os autores"); }}
                className="font-display text-[0.6rem] tracking-[0.14em] uppercase text-bx-700 mt-4 hover:text-bx-600 transition-colors">
                Limpar filtros →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filtered.map((article) => (
                <Link key={article.id} to={`/artigos/${article.slug}`} className="group cursor-pointer block">
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img
                      src={article.cover_url || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg"}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-display text-[0.53rem] tracking-[0.16em] uppercase text-bx-600 font-semibold mb-2 block">
                    {article.category}
                  </span>
                  <h2 className="font-heading text-[1.38rem] font-semibold italic text-gy-900 leading-[1.25] mb-2 group-hover:text-bx-700 transition-colors">
                    {article.title}
                  </h2>
                  <div className="flex justify-between items-center">
                    <span className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-gy-400">{article.authors?.name}</span>
                    <span className="font-display text-[0.55rem] tracking-[0.1em] uppercase text-gy-300">{formatDate(article.published_at || article.created_at)}</span>
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