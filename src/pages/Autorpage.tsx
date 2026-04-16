import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";

type Author = {
  id: string;
  name: string;
  bio: string;
  photo_url: string;
  slug: string;
};

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  cover_url: string;
  published_at: string;
  created_at: string;
};

const FALLBACK_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg";

const AutorPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) fetchAuthor();
  }, [slug]);

  async function fetchAuthor() {
    const { data: authorData } = await supabase
      .from("authors")
      .select("*")
      .eq("slug", slug)
      .single();

    if (!authorData) { navigate("/artigos"); return; }
    setAuthor(authorData as Author);

    const { data: articlesData } = await supabase
      .from("articles")
      .select("id, title, slug, category, cover_url, published_at, created_at")
      .eq("author_id", authorData.id)
      .eq("status", "published")
      .order("created_at", { ascending: false });

    setArticles((articlesData as Article[]) || []);
    setLoading(false);
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  if (loading)
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="flex items-center justify-center py-40">
          <p className="font-body text-gy-400 text-lg">Carregando...</p>
        </div>
        <SiteFooter />
      </div>
    );

  if (!author) return null;

  const seoDescription = author.bio
    ? author.bio.slice(0, 155)
    : `Artigos de ${author.name} no The Classical Way.`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${author.name} — The Classical Way`}
        description={seoDescription}
        canonical={`https://theclassicalway.com.br/autores/${author.slug}`}
        ogImage={author.photo_url || undefined}
        ogType="website"
      />
      <SiteHeader />

      {/* Hero do autor */}
      <div className="bg-surface-warm border-b border-gy-100 py-14 lg:py-20">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <p className="font-display text-[0.5rem] tracking-[0.18em] uppercase text-bx-600 mb-6">
            Autor
          </p>
          <div className="flex items-start gap-8 flex-col sm:flex-row">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {author.photo_url ? (
                <img
                  src={author.photo_url}
                  alt={author.name}
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gd-700 flex items-center justify-center shadow-md">
                  <span className="font-display text-[1.2rem] text-white uppercase">
                    {getInitials(author.name)}
                  </span>
                </div>
              )}
            </div>
            {/* Info */}
            <div className="flex-1">
              <h1 className="font-heading italic text-[clamp(1.8rem,4vw,2.6rem)] text-gy-900 leading-[1.15] mb-4">
                {author.name}
              </h1>
              {author.bio && (
                <p className="font-body text-[1.05rem] text-gy-600 leading-[1.75] max-w-[600px]">
                  {author.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Artigos do autor */}
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] py-14">
        <div className="triple-rule mb-10">
          <span className="r1" />
          <span className="r2" />
          <span className="r3" />
        </div>

        <h2 className="font-heading italic text-[1.5rem] text-gy-900 mb-8">
          Artigos de {author.name}
        </h2>

        {articles.length === 0 ? (
          <p className="font-body text-gy-400 text-lg py-12 text-center">
            Nenhum artigo publicado ainda.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {articles.map((article) => (
              <Link key={article.id} to={`/artigos/${article.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden mb-4">
                  <img
                    src={article.cover_url || FALLBACK_IMAGE}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <span className="font-display text-[0.5rem] tracking-[0.16em] uppercase text-bx-600 font-semibold mb-2 block">
                  {article.category}
                </span>
                <h3 className="font-heading text-[1.2rem] font-semibold italic text-gy-900 leading-[1.25] mb-2 group-hover:text-bx-700 transition-colors">
                  {article.title}
                </h3>
                <span className="font-display text-[0.5rem] tracking-[0.1em] uppercase text-gy-300">
                  {formatDate(article.published_at || article.created_at)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
};

export default AutorPage;