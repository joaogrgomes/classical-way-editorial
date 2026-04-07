import { useState } from "react";
import { Link } from "react-router-dom";

const books = [
  { title: "A Escola Clássica Cristã", author: "Douglas Wilson", category: "Educação", badge: "Recomendado", stars: 5, reviewer: "Dr. Marcos Albuquerque", coverBg: "bg-bx-800", excerpt: "Uma defesa robusta e prática da educação clássica cristã como modelo formativo para a próxima geração." },
  { title: "Norms & Nobility", author: "David Hicks", category: "Educação", badge: "Clássico", stars: 4, reviewer: "Profa. Ana Cavalcante", coverBg: "bg-bx-600", excerpt: "Hicks apresenta uma visão profunda do ideal clássico de educação e seu poder transformador na formação do caráter." },
  { title: "The Lost Tools of Learning", author: "Dorothy L. Sayers", category: "Educação", badge: "Clássico", stars: 4, reviewer: "Rev. Pedro Nóbrega", coverBg: "bg-gd-700", excerpt: "O ensaio seminal que reavivou o interesse moderno pelo Trivium como estrutura pedagógica." },
  { title: "Zero to One", author: "Peter Thiel", category: "Empreendedorismo", badge: "Recomendado", stars: 5, reviewer: "João Mendes", coverBg: "bg-bx-800", excerpt: "Thiel desafia convenções e propõe uma visão ousada sobre inovação e criação de valor no mundo dos negócios." },
  { title: "O Dilema da Inovação", author: "Clayton Christensen", category: "Empreendedorismo", badge: "Clássico", stars: 4, reviewer: "Marina Santos", coverBg: "bg-bx-600", excerpt: "Uma análise brilhante de como empresas estabelecidas falham diante de inovações disruptivas." },
  { title: "Shoe Dog", author: "Phil Knight", category: "Empreendedorismo", badge: "Recomendado", stars: 5, reviewer: "Dr. Marcos Albuquerque", coverBg: "bg-gd-700", excerpt: "A memória pessoal do fundador da Nike — uma história de risco, perseverança e visão empreendedora." },
  { title: "A Ilíada", author: "Homero", category: "Literatura Clássica", badge: "Clássico", stars: 5, reviewer: "Prof. Rodrigo Castro", coverBg: "bg-bx-800", excerpt: "A epopeia fundacional da literatura ocidental — honra, guerra e a condição humana em versos imortais." },
  { title: "A República", author: "Platão", category: "Literatura Clássica", badge: "Clássico", stars: 5, reviewer: "Profa. Clara Mendes", coverBg: "bg-bx-600", excerpt: "O diálogo platônico que definiu os fundamentos da filosofia política e da busca pela justiça." },
  { title: "As Confissões", author: "Agostinho", category: "Literatura Clássica", badge: "Clássico", stars: 5, reviewer: "Rev. Pedro Nóbrega", coverBg: "bg-gd-700", excerpt: "A autobiografia espiritual mais influente da história — a jornada de uma alma em busca de Deus." },
];

const categories = ["Educação", "Empreendedorismo", "Literatura Clássica"];

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5 text-gd-600 text-sm">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? "text-gd-600" : "text-gy-200"}>★</span>
    ))}
  </div>
);

const BookReviewSection = () => {
  const [activeCategory, setActiveCategory] = useState("Educação");

  const filtered = books.filter((b) => b.category === activeCategory);

  return (
    <section className="py-14 lg:py-20">
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[3px] bg-bx-700" />
            <span className="font-display uppercase text-[0.5rem] tracking-[0.18em] text-gy-900">
              Book Review
            </span>
          </div>
          <Link
            to="/resenhas"
            className="font-display uppercase text-[0.5rem] tracking-[0.14em] text-bx-700 hover:text-bx-900 transition-colors"
          >
            Ver todas as resenhas →
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-6 border-b border-gy-100 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-display uppercase text-[0.5rem] tracking-[0.14em] pb-3 transition-colors ${
                activeCategory === cat
                  ? "border-b-2 border-bx-700 text-bx-700"
                  : "text-gy-400 hover:text-gy-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filtered.map((book) => (
            <div key={book.title} className="flex flex-col">
              {/* Cover */}
              <div className={`relative aspect-[2/3] ${book.coverBg} flex items-center justify-center p-6 mb-4`}>
                <div className="text-center">
                  <p className="font-heading italic text-white text-lg leading-tight mb-2">{book.title}</p>
                  <p className="font-display uppercase text-white/60 text-[0.42rem] tracking-[0.14em]">{book.author}</p>
                </div>
                <span
                  className={`absolute top-3 left-3 px-2 py-0.5 font-display uppercase text-[0.42rem] tracking-[0.1em] text-white ${
                    book.badge === "Recomendado" ? "bg-gd-700" : "bg-gy-700"
                  }`}
                >
                  {book.badge}
                </span>
              </div>

              <StarRating count={book.stars} />

              <span className="font-display uppercase text-bx-600 text-[0.44rem] tracking-[0.14em] mt-2">
                {book.category}
              </span>
              <h3 className="font-heading italic font-semibold text-gy-900 mt-1">{book.title}</h3>
              <p className="font-display uppercase text-gy-400 text-[0.46rem] tracking-[0.12em] mt-1">{book.author}</p>
              <p className="font-body text-[0.9rem] text-gy-500 leading-relaxed mt-2 flex-1">{book.excerpt}</p>

              <div className="flex items-center justify-between mt-4">
                <span className="font-display uppercase text-gy-400 text-[0.46rem] tracking-[0.1em]">
                  {book.reviewer}
                </span>
                <Link
                  to="/resenhas/exemplo"
                  className="font-display uppercase text-[0.46rem] tracking-[0.1em] text-bx-700 hover:text-bx-900 transition-colors"
                >
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
