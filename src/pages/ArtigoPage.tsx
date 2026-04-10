import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  cover_url: string;
  content: string;
  published_at: string;
  created_at: string;
  authors: { name: string; bio: string } | null;
};

const ArtigoPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) fetchArticle();
  }, [slug]);

  async function fetchArticle() {
    const { data } = await supabase
      .from("articles")
      .select("*, authors(name, bio)")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (!data) { navigate("/artigos"); return; }
    setArticle(data as unknown as Article);

    const { data: relatedData } = await supabase
      .from("articles")
      .select("id, title, slug, category, cover_url, created_at, authors(name)")
      .eq("status", "published")
      .neq("slug", slug)
      .limit(3);

    setRelated((relatedData as unknown as Article[]) || []);
    setLoading(false);
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  if (loading) return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="flex items-center justify-center py-40">
        <p className="font-body text-gy-400 text-lg">Carregando...</p>
      </div>
      <SiteFooter />
    </div>
  );

  if (!article) return null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section
        className="relative min-h-[420px] flex items-end"
        style={{
          backgroundImage: `url(${article.cover_url || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-bx-900/70" />
        <div className="relative z-10 w-full max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] pb-12 pt-24">
          <span className="font-display text-[0.55rem] tracking-[0.18em] uppercase text-gd-500 mb-3 block">
            {article.category}
          </span>
          <h1 className="font-heading italic text-[clamp(1.6rem,4vw,2.6rem)] text-white leading-[1.18] max-w-[680px] mb-5">
            {article.title}
          </h1>
          <div className="flex items-center gap-4">
            <span className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-white/50">
              {article.authors?.name}
            </span>
            <span className="w-[3px] h-[3px] bg-white/30 rounded-full" />
            <span className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-white/50">
              {formatDate(article.published_at || article.created_at)}
            </span>
          </div>
        </div>
      </section>

      {/* Body + Sidebar */}
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] py-12 lg:flex gap-12">
        <article className="max-w-[680px]">
          <div
            className="font-body text-[1.32rem] text-gy-800 leading-[1.85] prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        <aside className="hidden lg:block w-[280px] flex-shrink-0 mt-2">
          {article.authors && (
            <div className="mb-10">
              <p className="font-display text-[0.53rem] tracking-[0.18em] uppercase text-gy-400 mb-4">Sobre o autor</p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gy-200 rounded-full flex items-center justify-center">
                  <span className="font-display text-[0.6rem] text-gy-500 uppercase">
                    {getInitials(article.authors.name)}
                  </span>
                </div>
                <div>
                  <p className="font-heading text-[0.95rem] font-semibold text-gy-900">{article.authors.name}</p>
                </div>
              </div>
              {article.authors.bio && (
                <p className="font-body text-[1.06rem] text-gy-500 leading-[1.7]">
                  {article.authors.bio}
                </p>
              )}
            </div>
          )}

          {related.length > 0 && (
            <div>
              <p className="font-display text-[0.53rem] tracking-[0.18em] uppercase text-gy-400 mb-4">Artigos relacionados</p>
              <div className="space-y-4">
                {related.map((a) => (
                  <Link key={a.id} to={`/artigos/${a.slug}`} className="block group">
                    <span className="font-display text-[0.4rem] tracking-[0.14em] uppercase text-bx-600 block mb-1">{a.category}</span>
                    <p className="font-heading text-[1.06rem] italic text-gy-800 leading-[1.3] group-hover:text-bx-700 transition-colors">
                      {a.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="bg-background pb-16">
          <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
            <div className="triple-rule mb-10">
              <span className="r1" />
              <span className="r2" />
              <span className="r3" />
            </div>
            <h3 className="font-heading text-[1.4rem] italic text-gy-900 mb-8">Continue lendo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {related.map((a) => (
                <Link key={a.id} to={`/artigos/${a.slug}`} className="group">
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img
                      src={a.cover_url || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg"}
                      alt={a.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-display text-[0.53rem] tracking-[0.16em] uppercase text-bx-600 font-semibold mb-2 block">
                    {a.category}
                  </span>
                  <h2 className="font-heading text-[1.38rem] font-semibold italic text-gy-900 leading-[1.25] mb-2 group-hover:text-bx-700 transition-colors">
                    {a.title}
                  </h2>
                  <div className="flex justify-between items-center">
                    <span className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-gy-400">{(a.authors as any)?.name}</span>
                    <span className="font-display text-[0.55rem] tracking-[0.1em] uppercase text-gy-300">{formatDate(a.created_at)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
};

export default ArtigoPage;