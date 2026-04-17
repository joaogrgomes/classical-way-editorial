import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  cover_url: string;
  created_at: string;
  authors: { name: string } | null;
};

const ArticlesSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      const { data } = await supabase
        .from("articles")
        .select("id, title, slug, category, cover_url, created_at, authors(name)")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(3);
      setArticles((data as unknown as Article[]) || []);
      setLoading(false);
    }
    fetchArticles();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

  if (loading) return (
    <section className="py-12 lg:py-16">
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-0.5 bg-bx-700 flex-shrink-0" />
            <span className="font-display text-[0.6rem] tracking-[0.24em] uppercase text-gy-900 font-semibold">
              Artigos Recentes
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col animate-pulse">
              <div className="aspect-[4/3] bg-gray-200 mb-3.5" />
              <div className="h-2 bg-gray-200 w-1/3 mb-2" />
              <div className="h-5 bg-gray-200 w-full mb-1" />
              <div className="h-5 bg-gray-200 w-4/5 mb-3" />
              <div className="flex justify-between mt-auto">
                <div className="h-2 bg-gray-200 w-1/4" />
                <div className="h-2 bg-gray-200 w-1/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (articles.length === 0) return null;

  return (
    <section className="py-12 lg:py-16" id="artigos">
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-0.5 bg-bx-700 flex-shrink-0" />
            <span className="font-display text-[0.6rem] tracking-[0.24em] uppercase text-gy-900 font-semibold">
              Artigos Recentes
            </span>
          </div>
          <Link to="/artigos" className="font-display text-[0.6rem] tracking-[0.14em] uppercase text-gy-300 hover:text-bx-700 transition-colors flex items-center gap-1.5">
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.id} to={`/artigos/${article.slug}`} className="group cursor-pointer flex flex-col">
              <div className="aspect-[4/3] overflow-hidden mb-3.5 flex-shrink-0">
                <img
                  src={article.cover_url || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg"}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              <span className="font-display text-[0.53rem] tracking-[0.16em] uppercase text-bx-600 font-semibold mb-2">
                {article.category}
              </span>
              <h3 className="font-heading text-[1.32rem] font-semibold italic text-gy-900 leading-[1.25] mb-2 group-hover:text-bx-700 transition-colors">
                {article.title}
              </h3>
              <div className="flex justify-between items-center mt-auto">
                <span className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-gy-400">{article.authors?.name}</span>
                <span className="font-display text-[0.55rem] tracking-[0.1em] uppercase text-gy-300">{formatDate(article.created_at)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;