import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

type Review = {
  id: string;
  title: string;
  slug: string;
  book_title: string;
  book_author: string;
  cover_url: string;
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

const coverColors = ["bg-bx-800", "bg-bx-600", "bg-gd-700"];

const BookReviewSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      const { data } = await supabase
        .from("reviews")
        .select("id, title, slug, book_title, book_author, cover_url, created_at, authors(name)")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(3);
      setReviews((data as unknown as Review[]) || []);
      setLoading(false);
    }
    fetchReviews();
  }, []);

  if (loading || reviews.length === 0) return null;

  return (
    <section className="py-14 lg:py-20">
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[3px] bg-bx-700" />
            <span className="font-display uppercase text-[0.6rem] tracking-[0.18em] text-gy-900">
              Book Review
            </span>
          </div>
          <Link to="/resenhas" className="font-display uppercase text-[0.6rem] tracking-[0.14em] text-bx-700 hover:text-bx-900 transition-colors">
            Ver todas as resenhas →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={review.id} className="flex flex-col">
              <div className={`relative aspect-[2/3] ${coverColors[i % coverColors.length]} flex items-center justify-center p-6 mb-4 overflow-hidden`}>
                {review.cover_url && (
                  <img src={review.cover_url} alt={review.book_title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                )}
                <div className="relative z-10 text-center">
                  <p className="font-heading italic text-white text-lg leading-tight mb-2">{review.book_title || review.title}</p>
                  <p className="font-display uppercase text-white/60 text-[0.6rem] tracking-[0.14em]">{review.book_author}</p>
                </div>
              </div>

              <StarRating count={5} />
              <h3 className="font-heading italic font-semibold text-gy-900 mt-1">{review.title}</h3>
              <p className="font-display uppercase text-gy-400 text-[0.55rem] tracking-[0.12em] mt-1">{review.book_author}</p>

              <div className="flex items-center justify-between mt-4">
                <span className="font-display uppercase text-gy-400 text-[0.55rem] tracking-[0.1em]">
                  {review.authors?.name}
                </span>
                <Link to={`/resenhas/${review.slug}`} className="font-display uppercase text-[0.55rem] tracking-[0.1em] text-bx-700 hover:text-bx-900 transition-colors">
                  Ler Resenha →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookReviewSection;