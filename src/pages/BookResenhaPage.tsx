import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";

type Review = {
  id: string;
  title: string;
  slug: string;
  book_title: string;
  book_author: string;
  cover_url: string;
  content: string;
  created_at: string;
  authors: { name: string; bio: string } | null;
};

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5 text-gd-600 text-sm">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? "text-gd-600" : "text-gy-200"}>★</span>
    ))}
  </div>
);

const coverColors = ["bg-bx-800", "bg-bx-600", "bg-gd-700"];

const BookResenhaPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState<Review | null>(null);
  const [related, setRelated] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) fetchReview();
  }, [slug]);

  async function fetchReview() {
    const { data } = await supabase
      .from("reviews")
      .select("*, authors(name, bio)")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (!data) { navigate("/resenhas"); return; }
    setReview(data as unknown as Review);

    const { data: relatedData } = await supabase
      .from("reviews")
      .select("id, title, slug, book_title, book_author, cover_url, created_at, authors(name)")
      .eq("status", "published")
      .neq("slug", slug)
      .limit(3);

    setRelated((relatedData as unknown as Review[]) || []);
    setLoading(false);
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

  if (loading) return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="flex items-center justify-center py-40">
        <p className="font-body text-gy-400 text-lg">Carregando...</p>
      </div>
      <SiteFooter />
    </div>
  );

  if (!review) return null;

  const seoDescription = `Resenha de "${review.book_title}", de ${review.book_author}. ${
    review.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 110)
  }`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${review.title} — The Classical Way`}
        description={seoDescription}
        canonical={`https://theclassicalway.com.br/resenhas/${review.slug}`}
        ogImage={review.cover_url || undefined}
      />
      <SiteHeader />

      {/* Hero */}
      <div className="bg-surface-warm py-12 lg:py-16">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <div className="flex-1">
              <h1 className="font-heading text-[clamp(1.6rem,3.5vw,2rem)] italic font-semibold text-gy-900 leading-[1.15] mb-2">
                {review.title}
              </h1>
              <p className="font-display text-[0.6rem] tracking-[0.14em] uppercase text-gy-400 mb-3">
                {review.book_author}
              </p>
              <StarRating count={5} />
              <div className="w-full h-px bg-gy-200 my-4" />
              <p className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-gy-400">
                Resenha por {review.authors?.name} · {formatDate(review.created_at)}
              </p>
            </div>
            <div className="w-[180px] shrink-0 aspect-[2/3] bg-bx-800 relative flex flex-col items-center justify-center p-6 overflow-hidden">
              {review.cover_url && (
                <img
                  src={review.cover_url}
                  alt={review.book_title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
              )}
              <div className="relative z-10 text-center">
                <h3 className="font-heading text-[1.2rem] italic font-semibold text-white text-center leading-[1.3] mb-1">
                  {review.book_title || review.title}
                </h3>
                <p className="font-display text-[0.6rem] tracking-[0.14em] uppercase text-white/60">
                  {review.book_author}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="triple-rule" />

      {/* Body */}
      <article className="max-w-[680px] mx-auto py-12 px-[clamp(16px,4vw,48px)]">
        <div
          className="font-body text-[1.32rem] text-gy-800 leading-[1.85] prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: review.content }}
        />
      </article>

      {/* Book CTA */}
      <div className="max-w-[680px] mx-auto px-[clamp(16px,4vw,48px)] pb-12">
        <div className="bg-surface-warm p-6 flex gap-5 items-start">
          <div className="w-[80px] shrink-0 aspect-[2/3] bg-bx-800 relative overflow-hidden flex flex-col items-center justify-center p-3">
            {review.cover_url && (
              <img src={review.cover_url} alt={review.book_title} className="absolute inset-0 w-full h-full object-cover opacity-70" />
            )}
            <h4 className="relative z-10 font-heading text-[0.6rem] italic font-semibold text-white text-center leading-[1.3]">
              {review.book_title}
            </h4>
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-[1.32rem] italic font-semibold text-gy-900 leading-[1.25] mb-1">
              {review.book_title || review.title}
            </h3>
            <p className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-gy-400 mb-3">
              {review.book_author}
            </p>
          </div>
        </div>
      </div>

      <div className="triple-rule" />

      {related.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
            <h2 className="font-heading text-[1.4rem] italic font-semibold text-gy-900 mb-8">Mais Resenhas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((r, i) => (
                <Link to={`/resenhas/${r.slug}`} key={r.id} className="group">
                  <div className={`aspect-[2/3] ${coverColors[i % coverColors.length]} relative flex flex-col items-center justify-center p-8 mb-4 overflow-hidden`}>
                    {r.cover_url && (
                      <img src={r.cover_url} alt={r.book_title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    )}
                    <div className="relative z-10 text-center">
                      <h3 className="font-heading text-[1.2rem] italic font-semibold text-white text-center leading-[1.3] mb-2">
                        {r.book_title || r.title}
                      </h3>
                      <p className="font-display text-[0.55rem] tracking-[0.14em] uppercase text-white/60">
                        {r.book_author}
                      </p>
                    </div>
                  </div>
                  <StarRating count={5} />
                  <h4 className="font-heading text-[1.38rem] font-semibold italic text-gy-900 leading-[1.25] mt-1 mb-1">
                    {r.title}
                  </h4>
                  <p className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-gy-400">
                    {r.book_author}
                  </p>
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

export default BookResenhaPage;