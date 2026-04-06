import { useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const categories = ["Todos", "Gramática & Paideia", "Filosofia", "Literatura Clássica", "Teologia", "Currículo", "Família"];

const allArticles = [
  {
    category: "Gramática & Paideia",
    title: "Aprender Latim não é elitismo: é restituir o acesso à sabedoria ocidental",
    excerpt: "A língua latina não é um luxo arcaico, mas a chave para uma herança intelectual e espiritual que moldou a civilização.",
    author: "Profa. Clara Mendes",
    date: "10 Mar. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg",
  },
  {
    category: "Filosofia",
    title: "Platão na sala de aula: o mito da caverna como método pedagógico",
    excerpt: "Da alegoria platônica à prática docente contemporânea — como a filosofia clássica transforma o ensino.",
    author: "Dr. Samuel Luz",
    date: "18 Fev. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clementino_Inv305.jpg/800px-Plato_Pio-Clementino_Inv305.jpg",
  },
  {
    category: "Literatura Clássica",
    title: "Homero, os heróis e a educação do coração",
    excerpt: "A Ilíada e a Odisseia como mapas da condição humana que ressoam com a antropologia cristã.",
    author: "Prof. Rodrigo Castro",
    date: "20 Fev. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Euphronios_krater_side_A_MET_1972.11.10.jpg/1200px-Euphronios_krater_side_A_MET_1972.11.10.jpg",
  },
  {
    category: "Teologia",
    title: "Lutero, Calvino e a reforma do ensino: uma herança protestante",
    excerpt: "Como a Reforma moldou uma nova visão de educação centrada na Escritura, na leitura e na formação do caráter.",
    author: "Rev. Tiago Nogueira",
    date: "5 Fev. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg",
  },
  {
    category: "Currículo",
    title: "Como estruturar um currículo clássico do zero",
    excerpt: "Um guia prático para famílias e escolas que desejam iniciar a jornada da educação clássica com clareza e método.",
    author: "Marina Santos",
    date: "28 Jan. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clementino_Inv305.jpg/800px-Plato_Pio-Clementino_Inv305.jpg",
  },
  {
    category: "Filosofia",
    title: "Virtude em Aristóteles e sua relevância para a educação cristã hoje",
    excerpt: "A ética das virtudes como fundamento da formação integral do aluno — prudência, justiça, temperança e fortaleza.",
    author: "Dr. Samuel Luz",
    date: "15 Jan. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Euphronios_krater_side_A_MET_1972.11.10.jpg/1200px-Euphronios_krater_side_A_MET_1972.11.10.jpg",
  },
  {
    category: "Família",
    title: "A leitura em voz alta como liturgia familiar",
    excerpt: "Ler juntos não é apenas pedagogia — é um ato de amor, memória e formação do imaginário moral.",
    author: "Ana Beatriz Lopes",
    date: "8 Jan. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg",
  },
  {
    category: "Gramática & Paideia",
    title: "O papel da memorização na formação clássica",
    excerpt: "Decorar não é decorativo: a memória como faculdade essencial no Trivium e na tradição cristã.",
    author: "Profa. Clara Mendes",
    date: "2 Jan. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clementino_Inv305.jpg/800px-Plato_Pio-Clementino_Inv305.jpg",
  },
  {
    category: "Literatura Clássica",
    title: "Virgílio e a educação do desejo: a Eneida como itinerário da alma",
    excerpt: "A epopeia romana como narrativa de formação — do exílio à pátria, da errância à vocação.",
    author: "Prof. Rodrigo Castro",
    date: "20 Dez. 2025",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Euphronios_krater_side_A_MET_1972.11.10.jpg/1200px-Euphronios_krater_side_A_MET_1972.11.10.jpg",
  },
];

const ArtigosPage = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  useScrollReveal();

  const filtered = activeCategory === "Todos"
    ? allArticles
    : allArticles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Page header */}
      <div className="bg-bx-900 py-14 lg:py-20">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <h1 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] italic font-semibold text-white/[0.92] leading-[1.15] mb-3">
            Artigos
          </h1>
          <p className="font-body text-[1.05rem] text-white/[0.45] max-w-[52ch] leading-[1.7]">
            Reflexões sobre educação clássica, formação cristã e a herança intelectual do Ocidente.
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

      {/* Articles grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-body text-gy-400 text-lg">Nenhum artigo encontrado nesta categoria.</p>
              <button
                onClick={() => setActiveCategory("Todos")}
                className="font-display text-[0.5rem] tracking-[0.14em] uppercase text-bx-700 mt-4 hover:text-bx-600 transition-colors"
              >
                Ver todos os artigos →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filtered.map((article) => (
                <Link key={article.title} to="/artigos/exemplo" className="group cursor-pointer reveal block">
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-display text-[0.44rem] tracking-[0.16em] uppercase text-bx-600 font-semibold mb-2 block">
                    {article.category}
                  </span>
                  <h2 className="font-heading text-[1.15rem] font-semibold italic text-gy-900 leading-[1.25] mb-2 group-hover:text-bx-700 transition-colors">
                    {article.title}
                  </h2>
                  <p className="font-body text-[0.92rem] text-gy-500 leading-[1.65] mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-display text-[0.46rem] tracking-[0.12em] uppercase text-gy-400">{article.author}</span>
                    <span className="font-display text-[0.46rem] tracking-[0.1em] uppercase text-gy-300">{article.date}</span>
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
