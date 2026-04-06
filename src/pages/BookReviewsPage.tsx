import { useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const categories = ["Todos", "Educação", "Empreendedorismo", "Literatura Clássica"];

const allBooks = [
  {
    title: "A Escola Clássica Cristã",
    author: "Douglas Wilson",
    category: "Educação",
    badge: "Recomendado",
    stars: 5,
    reviewer: "Dr. Marcos Albuquerque",
    excerpt: "Uma defesa vigorosa e prática da educação clássica cristã como modelo pedagógico para a igreja contemporânea.",
    coverBg: "bg-bx-800",
  },
  {
    title: "Norms & Nobility",
    author: "David Hicks",
    category: "Educação",
    badge: "Clássico",
    stars: 4,
    reviewer: "Profa. Ana Cavalcante",
    excerpt: "Um tratado sobre o ideal educacional clássico e sua relevância para a formação moral e intelectual.",
    coverBg: "bg-bx-600",
  },
  {
    title: "The Lost Tools of Learning",
    author: "Dorothy L. Sayers",
    category: "Educação",
    badge: "Clássico",
    stars: 4,
    reviewer: "Rev. Pedro Nóbrega",
    excerpt: "O ensaio seminal que relançou o Trivium como modelo pedagógico no século XX.",
    coverBg: "bg-gd-700",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Empreendedorismo",
    badge: "Recomendado",
    stars: 5,
    reviewer: "João Mendes",
    excerpt: "Uma reflexão original sobre inovação, monopólios criativos e o futuro da civilização tecnológica.",
    coverBg: "bg-bx-800",
  },
  {
    title: "A Ilíada",
    author: "Homero",
    category: "Literatura Clássica",
    badge: "Clássico",
    stars: 5,
    reviewer: "Prof. Rodrigo Castro",
    excerpt: "A epopeia fundadora da literatura ocidental — um drama sobre honra, ira e a condição humana.",
    coverBg: "bg-bx-600",
  },
  {
    title: "A República",
    author: "Platão",
    category: "Literatura Clássica",
    badge: "Clássico",
    stars: 5,
    reviewer: "Profa. Clara Mendes",
    excerpt: "O diálogo platônico sobre justiça, educação e a alma — pedra angular do pensamento ocidental.",
    coverBg: "bg-gd-700",
  },
];

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5 text-gd-600 text-sm">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? "text-gd-600" : "text-gy-200"}>★</span>
    ))}
  </div>
);

const BookReviewsPage = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  useScrollReveal();

  const filtered = activeCategory === "Todos"
    ? allBooks
    : allBooks.filter((b) => b.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <div className="bg-bx-900 py-14 lg:py-20">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <h1 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] italic font-semibold text-white/[0.92] leading-[1.15] mb-3">
            Book Reviews
          </h1>
          <p className="font-body text-[1.05rem] text-white/[0.45] max-w-[52ch] leading-[1.7]">
            Resenhas de obras clássicas, teológicas e formativas — selecionadas pela equipe editorial do Classical Way.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-gy-100 sticky top-[58px] z-40 bg-background/95 backdrop-blur-sm">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide py-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-display text-[0.5rem] tracking-[0.14em] uppercase whitespace-nowrap px-4 py-3.5 border-b-2 transition-colors duration-200 ${
                  activeCategory === cat
                    ? "border-bx-700 text-bx-700 font-semibold"
                    : "border-transparent text-gy-400 hover:text-gy-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-body text-gy-400 text-lg">Nenhuma resenha encontrada nesta categoria.</p>
              <button
                onClick={() => setActiveCategory("Todos")}
                className="font-display text-[0.5rem] tracking-[0.14em] uppercase text-bx-700 mt-4 hover:text-bx-600 transition-colors"
              >
                Ver todas as resenhas →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filtered.map((book) => (
                <div key={book.title} className="group reveal">
                  {/* Cover */}
                  <div className={`aspect-[2/3] ${book.coverBg} relative flex flex-col items-center justify-center p-8 mb-4`}>
                    {/* Badge */}
                    <span
                      className={`absolute top-3 left-3 font-display text-[0.42rem] tracking-[0.14em] uppercase text-white px-2.5 py-1 ${
                        book.badge === "Recomendado" ? "bg-gd-700" : "bg-gy-700"
                      }`}
                    >
                      {book.badge}
                    </span>
                    <h3 className="font-heading text-[1.2rem] italic font-semibold text-white text-center leading-[1.3] mb-2">
                      {book.title}
                    </h3>
                    <p className="font-display text-[0.46rem] tracking-[0.14em] uppercase text-white/60">
                      {book.author}
                    </p>
                  </div>

                  {/* Info */}
                  <StarRating count={book.stars} />
                  <span className="font-display text-[0.44rem] tracking-[0.16em] uppercase text-bx-600 font-semibold mt-2 block">
                    {book.category}
                  </span>
                  <h2 className="font-heading text-[1.15rem] font-semibold italic text-gy-900 leading-[1.25] mt-1 mb-1">
                    {book.title}
                  </h2>
                  <p className="font-display text-[0.46rem] tracking-[0.12em] uppercase text-gy-400 mb-2">
                    {book.author}
                  </p>
                  <p className="font-body text-[0.92rem] text-gy-500 leading-[1.65] mb-3">
                    {book.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[0.46rem] tracking-[0.12em] uppercase text-gy-400">
                      {book.reviewer}
                    </span>
                    <Link
                      to="#"
                      className="font-display text-[0.46rem] tracking-[0.12em] uppercase text-bx-700 hover:text-bx-600 transition-colors"
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
