import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Mail, Share2 } from "lucide-react";
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
  authors: { name: string; bio: string; slug?: string; photo_url?: string } | null;
  featured_book_title?: string;
  featured_book_author?: string;
  featured_book_cover_url?: string;
  featured_book_amazon_url?: string;
  featured_book_description?: string;
  editors_note?: string;
};

const FALLBACK_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg";

const ArtigoPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Adiciona botões de compartilhar nos blockquotes após renderizar
  useEffect(() => {
    if (!article) return;
    const timer = setTimeout(() => {
      const blockquotes = document.querySelectorAll("article blockquote");
      blockquotes.forEach((bq) => {
        if (bq.querySelector(".bq-share")) return;
        const text = bq.textContent?.trim().slice(0, 200) || "";
        const shareDiv = document.createElement("div");
        shareDiv.className = "bq-share";
        shareDiv.style.cssText = "display:flex;align-items:center;gap:12px;margin-top:12px;";
        shareDiv.innerHTML = `
          <a href="https://twitter.com/share?text=${encodeURIComponent('"' + text + '" — Classical Way')}&url=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener noreferrer" style="color:#9ca3af;display:flex;" aria-label="Compartilhar no Twitter">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://wa.me/?text=${encodeURIComponent('"' + text + '" — Classical Way ' + window.location.href)}" target="_blank" rel="noopener noreferrer" style="color:#9ca3af;display:flex;" aria-label="Compartilhar no WhatsApp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        `;
        bq.appendChild(shareDiv);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [article]);

  useEffect(() => {
    if (slug) fetchArticle();
  }, [slug]);

  async function fetchArticle() {
    const { data } = await supabase
      .from("articles")
      .select("*, authors(name, bio, slug, photo_url)")
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
    new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

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

  if (!article) return null;

  const authorLink = article.authors?.slug ? `/autores/${article.authors.slug}` : null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] pt-5 pb-2">
        <nav className="flex items-center gap-2 font-display text-[0.5rem] tracking-[0.12em] uppercase text-gy-400">
          <Link to="/" className="hover:text-bx-700 transition-colors">Início</Link>
          <span>/</span>
          <Link to="/artigos" className="hover:text-bx-700 transition-colors">Artigos</Link>
          <span>/</span>
          <span className="text-bx-600">{article.category}</span>
        </nav>
      </div>

      {/* Hero */}
      <section
        className="relative min-h-[480px] lg:min-h-[540px] flex items-end overflow-hidden"
        style={{
          backgroundImage: `url(${article.cover_url || FALLBACK_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-bx-900/95 via-bx-900/60 to-bx-900/20" />
        <div className="relative z-10 w-full max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] pb-12 pt-24">
          <Link
            to={`/artigos?categoria=${encodeURIComponent(article.category)}`}
            className="font-display text-[0.55rem] tracking-[0.18em] uppercase text-gd-500 mb-3 block hover:text-gd-300 transition-colors"
          >
            {article.category}
          </Link>
          <h1 className="font-heading italic text-[clamp(1.7rem,4vw,2.8rem)] text-white leading-[1.18] max-w-[760px] mb-5">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            {article.authors?.name && (
              <div className="flex items-center gap-3">
                {/* Avatar do autor — clicável se tiver slug */}
                {authorLink ? (
                  <Link to={authorLink} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-full bg-gd-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {article.authors?.photo_url ? (
                        <img src={article.authors.photo_url} alt={article.authors.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-display text-[0.46rem] text-white uppercase">
                          {getInitials(article.authors.name)}
                        </span>
                      )}
                    </div>
                    <span className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-white/70 group-hover:text-white transition-colors">
                      {article.authors.name}
                    </span>
                  </Link>
                ) : (
                  <>
                    <div className="w-9 h-9 rounded-full bg-gd-700 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-[0.46rem] text-white uppercase">
                        {getInitials(article.authors.name)}
                      </span>
                    </div>
                    <span className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-white/70">
                      {article.authors.name}
                    </span>
                  </>
                )}
              </div>
            )}
            <span className="w-[3px] h-[3px] bg-white/30 rounded-full hidden sm:block" />
            <span className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-white/50">
              {formatDate(article.published_at || article.created_at)}
            </span>
            <span className="w-[3px] h-[3px] bg-white/30 rounded-full hidden sm:block" />
            <span className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-white/50">
              {Math.max(1, Math.ceil(article.content.replace(/<[^>]+>/g, "").split(/\s+/).length / 200))} min de leitura
            </span>
          </div>
        </div>
      </section>

      {/* Share bar */}
      <div className="border-b border-gy-100 bg-background sticky top-[58px] z-30">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] h-[46px] flex items-center justify-between">
          <span className="font-display text-[0.48rem] tracking-[0.14em] uppercase text-gy-400">
            Compartilhar
          </span>
          <div className="flex items-center gap-1">
            <a
              href={`https://twitter.com/share?url=${shareUrl}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center text-gy-400 hover:text-bx-700 transition-colors"
              aria-label="Compartilhar no X"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(article.title + " " + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center text-gy-400 hover:text-bx-700 transition-colors"
              aria-label="Compartilhar no WhatsApp"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${shareUrl}`}
              className="w-8 h-8 flex items-center justify-center text-gy-400 hover:text-bx-700 transition-colors"
              aria-label="Compartilhar por email"
            >
              <Mail size={14} />
            </a>
            <button
              onClick={handleCopy}
              className="w-8 h-8 flex items-center justify-center text-gy-400 hover:text-bx-700 transition-colors relative"
              aria-label="Copiar link"
            >
              <Share2 size={14} />
              {copied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gy-900 text-white font-display text-[0.4rem] tracking-[0.1em] px-2 py-1 whitespace-nowrap">
                  Copiado!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Body + Sidebar */}
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] py-12 lg:flex gap-16">

        {/* Article body */}
        <article className="flex-1 min-w-0 max-w-[720px]">
          <div
            className="font-body text-[1.32rem] text-gy-800 leading-[1.9] prose prose-lg max-w-none
              prose-headings:font-heading prose-headings:italic prose-headings:text-gy-900
              prose-h2:text-[1.5rem] prose-h2:mt-10 prose-h2:mb-5
              prose-h3:text-[1.25rem] prose-h3:mt-8 prose-h3:mb-4
              prose-blockquote:border-l-4 prose-blockquote:border-gd-600 prose-blockquote:pl-6
              prose-blockquote:bg-surface-warm prose-blockquote:py-4 prose-blockquote:pr-4
              prose-blockquote:font-heading prose-blockquote:italic prose-blockquote:text-gy-700
              prose-a:text-bx-700 prose-a:no-underline hover:prose-a:text-bx-600
              prose-strong:text-gy-900"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Editor's Note */}
          {article.editors_note && (
            <div className="bg-gy-50 border-l-4 border-gy-300 px-6 py-5 my-8">
              <p className="font-body text-[1rem] text-gy-700 leading-[1.7]">
                <span className="font-heading italic font-semibold text-gy-900">Nota do editor: </span>
                {article.editors_note}
              </p>
            </div>
          )}

          {/* Indicação de livro */}
          {article.featured_book_title && (
            <div className="border border-gy-100 p-6 my-10 flex gap-6 items-start bg-surface-warm">
              {article.featured_book_cover_url ? (
                <img
                  src={article.featured_book_cover_url}
                  alt={article.featured_book_title}
                  className="w-[90px] flex-shrink-0 aspect-[2/3] object-cover shadow-md"
                />
              ) : (
                <div className="w-[90px] flex-shrink-0 aspect-[2/3] bg-bx-800 flex items-center justify-center">
                  <span className="font-heading italic text-white text-[0.65rem] text-center px-2 leading-[1.3]">
                    {article.featured_book_title}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <p className="font-display text-[0.48rem] tracking-[0.18em] uppercase text-bx-600 mb-2">
                  Indicação de leitura
                </p>
                <h4 className="font-heading italic text-[1.2rem] text-gy-900 leading-[1.3] mb-1">
                  {article.featured_book_title}
                </h4>
                <p className="font-display text-[0.48rem] tracking-[0.14em] uppercase text-gy-400 mb-3">
                  {article.featured_book_author}
                </p>
                {article.featured_book_description && (
                  <p className="font-body text-[0.95rem] text-gy-500 leading-[1.7] mb-4">
                    {article.featured_book_description}
                  </p>
                )}
                {article.featured_book_amazon_url && (
                  <a
                    href={article.featured_book_amazon_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-display text-[0.48rem] tracking-[0.16em] uppercase bg-bx-700 text-white px-4 py-2 hover:bg-bx-600 transition-colors"
                  >
                    Comprar na Amazon →
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Triple rule */}
          <div className="triple-rule my-10">
            <span className="r1" />
            <span className="r2" />
            <span className="r3" />
          </div>

          {/* Newsletter CTA */}
          <div className="bg-surface-warm p-8 mb-10">
            <p className="font-display text-[0.52rem] tracking-[0.18em] uppercase text-bx-700 mb-2">
              Newsletter
            </p>
            <h3 className="font-heading italic text-[1.4rem] text-gy-900 mb-3 leading-[1.3]">
              Receba os melhores artigos do Classical Way
            </h3>
            <p className="font-body text-[1rem] text-gy-500 mb-5 leading-[1.7]">
              Toda semana, os conteúdos mais relevantes sobre Educação Cristã Clássica diretamente no seu email.
            </p>
            <div className="flex gap-3 flex-wrap">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 min-w-[200px] border border-gy-200 px-4 py-2 font-body text-[1rem] text-gy-700 bg-background focus:outline-none focus:border-bx-600"
              />
              <button className="font-display text-[0.5rem] tracking-[0.16em] uppercase bg-bx-700 text-white px-5 py-2 hover:bg-bx-600 transition-colors whitespace-nowrap">
                Inscrever-se
              </button>
            </div>
          </div>

          {/* Author bio */}
          {article.authors && (
            <div className="border-t border-gy-100 pt-8">
              <p className="font-display text-[0.48rem] tracking-[0.18em] uppercase text-gy-400 mb-5">
                Sobre o autor
              </p>
              <div className="flex items-start gap-5">
                {authorLink ? (
                  <Link to={authorLink} className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gd-700 flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity">
                      {article.authors.photo_url ? (
                        <img src={article.authors.photo_url} alt={article.authors.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-display text-[0.6rem] text-white uppercase">
                          {getInitials(article.authors.name)}
                        </span>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gd-700 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-[0.6rem] text-white uppercase">
                      {getInitials(article.authors.name)}
                    </span>
                  </div>
                )}
                <div>
                  {authorLink ? (
                    <Link to={authorLink} className="hover:text-bx-700 transition-colors">
                      <p className="font-heading text-[1.15rem] font-semibold text-gy-900 mb-2">
                        {article.authors.name}
                      </p>
                    </Link>
                  ) : (
                    <p className="font-heading text-[1.15rem] font-semibold text-gy-900 mb-2">
                      {article.authors.name}
                    </p>
                  )}
                  {article.authors.bio && (
                    <p className="font-body text-[1rem] text-gy-500 leading-[1.7]">
                      {article.authors.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block w-[260px] flex-shrink-0">
          <div className="sticky top-[106px]">

            {/* Author card */}
            {article.authors && (
              <div className="mb-10 pb-10 border-b border-gy-100">
                <p className="font-display text-[0.48rem] tracking-[0.18em] uppercase text-gy-400 mb-4">Autor</p>
                {authorLink ? (
                  <Link to={authorLink} className="flex items-center gap-3 mb-3 group">
                    <div className="w-11 h-11 rounded-full bg-gd-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {article.authors.photo_url ? (
                        <img src={article.authors.photo_url} alt={article.authors.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-display text-[0.5rem] text-white uppercase">
                          {getInitials(article.authors.name)}
                        </span>
                      )}
                    </div>
                    <p className="font-heading text-[0.95rem] font-semibold text-gy-900 leading-[1.3] group-hover:text-bx-700 transition-colors">
                      {article.authors.name}
                    </p>
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-gd-700 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-[0.5rem] text-white uppercase">
                        {getInitials(article.authors.name)}
                      </span>
                    </div>
                    <p className="font-heading text-[0.95rem] font-semibold text-gy-900 leading-[1.3]">
                      {article.authors.name}
                    </p>
                  </div>
                )}
                {article.authors.bio && (
                  <p className="font-body text-[0.9rem] text-gy-500 leading-[1.7] line-clamp-4">
                    {article.authors.bio}
                  </p>
                )}
              </div>
            )}

            {/* Related */}
            {related.length > 0 && (
              <div>
                <p className="font-display text-[0.48rem] tracking-[0.18em] uppercase text-gy-400 mb-5">
                  Artigos relacionados
                </p>
                <div className="space-y-5">
                  {related.map((a) => (
                    <Link key={a.id} to={`/artigos/${a.slug}`} className="block group">
                      <div className="aspect-[16/9] overflow-hidden mb-2">
                        <img
                          src={a.cover_url || FALLBACK_IMAGE}
                          alt={a.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <span className="font-display text-[0.4rem] tracking-[0.14em] uppercase text-bx-600 block mb-1">
                        {a.category}
                      </span>
                      <p className="font-heading text-[0.9rem] italic text-gy-800 leading-[1.3] group-hover:text-bx-700 transition-colors">
                        {a.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Continue lendo */}
      {related.length > 0 && (
        <section className="bg-surface-warm py-16">
          <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
            <div className="triple-rule mb-10">
              <span className="r1" />
              <span className="r2" />
              <span className="r3" />
            </div>
            <h3 className="font-heading text-[1.5rem] italic text-gy-900 mb-8">Continue lendo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {related.map((a) => (
                <Link key={a.id} to={`/artigos/${a.slug}`} className="group">
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img
                      src={a.cover_url || FALLBACK_IMAGE}
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
                    <span className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-gy-400">
                      {(a.authors as any)?.name}
                    </span>
                    <span className="font-display text-[0.55rem] tracking-[0.1em] uppercase text-gy-300">
                      {formatDate(a.created_at)}
                    </span>
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