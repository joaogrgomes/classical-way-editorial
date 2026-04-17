import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  authors: { name: string } | null;
};

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5 text-gd-600 text-sm">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? "text-gd-600" : "text-gy-200"}>★</span>
    ))}
  </div>
);

const BookReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      const { data } = await supabase
        .from("reviews")
        .select("id, title, slug, book_title, book_author, cover_url, created_at, authors(name)")
        .eq("status", "published")
        .order("created_at", { ascending: false });
      setReviews((data as unknown as Review[]) || []);
      setLoading(false);
    }
    fetchReviews();
  }, []);

  const coverColors = ["bg-bx-800", "bg-bx-600", "bg-gd-700"];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="bg-bx-900 py-14 lg:py-20">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <h1 className="font-heading text-[clamp(2.16rem,4.8vw,3.36rem)] italic font-semibold text-white/[0.92] leading-[1.15] mb-3">
            Book Reviews
          </h1>
          <p className="font-body text-[1.26rem] text-white/[0.45] max-w-[52ch] leading-[1.7]">
            Resenhas de obras clássicas, teológicas e formativas — selecionadas pela equipe editorial do Classical Way.
          </p>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          {loading ? (
            <div className="py-20 text-center">
              <p className="font-body text-gy-400 text-lg">Carregando resenhas...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-body text-gy-400 text-lg">Nenhuma resenha publicada ainda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {reviews.map((review, i) => (
                <div key={review.id} className="group">
                  <div className={`aspect-[2/3] ${coverColors[i % coverColors.length]} relative flex flex-col items-center justify-center p-8 mb-4 overflow-hidden`}>
                    {review.cover_url && (
                      <img
                        src={review.cover_url}
                        alt={review.book_title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                      />
                    )}
                    <div className="relative z-10 text-center">
                      <h3 className="font-heading text-[1.2rem] italic font-semibold text-white text-center leading-[1.3] mb-2">
                        {review.book_title || review.title}
                      </h3>
                      <p className="font-display text-[0.55rem] tracking-[0.14em] uppercase text-white/60">
                        {review.book_author}
                      </p>
                    </div>
                  </div>

                  <StarRating count={5} />
                  <h2 className="font-heading text-[1.38rem] font-semibold italic text-gy-900 leading-[1.25] mt-1 mb-1">
                    {review.title}
                  </h2>
                  <p className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-gy-400 mb-2">
                    {review.book_author}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-gy-400">
                      {review.authors?.name}
                    </span>
                    <Link
                      to={`/resenhas/${review.slug}`}
                      className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-bx-700 hover:text-bx-600 transition-colors"
                    >
                      Ler Resenha →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default BookReviewsPage;