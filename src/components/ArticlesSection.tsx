import { Link } from "react-router-dom";

const articles = [
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
];

const sideArticles = [
  { category: "Currículo", title: "Como estruturar um currículo clássico do zero", author: "Marina Santos" },
  { category: "Filosofia", title: "Virtude em Aristóteles e sua relevância para a educação cristã hoje", author: "Dr. Samuel Luz" },
  { category: "Teologia", title: "Lutero, Calvino e a reforma do ensino: uma herança protestante", author: "Rev. Tiago Nogueira" },
];

const ArticlesSection = () => (
  <section className="py-12 lg:py-16" id="artigos">
    <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
      {/* Section header */}
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

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">
        <div>
          {/* Featured grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {articles.map((article) => (
              <article key={article.title} className="group cursor-pointer flex flex-col">
                <div className="aspect-[4/3] overflow-hidden mb-3.5 flex-shrink-0">
                  <img
                    src={article.image}
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
                <p className="font-body text-[1.32rem] text-gy-500 leading-[1.65] mb-2.5">
                  {article.excerpt}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-gy-400">{article.author}</span>
                  <span className="font-display text-[0.55rem] tracking-[0.1em] uppercase text-gy-300">{article.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar list */}
        <aside className="border-t-2 border-gy-900 pt-4">
          <span className="font-display text-[0.6rem] tracking-[0.22em] uppercase text-gy-900 font-semibold mb-4 block">
            Mais Lidos
          </span>
          {sideArticles.map((a, i) => (
            <article key={a.title} className="flex gap-4 py-3.5 border-b border-gy-100 last:border-b-0 cursor-pointer hover:opacity-70 transition-opacity items-start">
              <span className="font-display text-xl font-bold text-gy-100 leading-none flex-shrink-0 w-6 text-right">
                {i + 1}
              </span>
              <div>
                <span className="font-display text-[0.55rem] tracking-[0.14em] uppercase text-gy-400 mb-1 block">{a.category}</span>
                <span className="font-heading text-[1.32rem] font-semibold text-gy-800 leading-[1.25]">{a.title}</span>
              </div>
            </article>
          ))}
        </aside>
      </div>
    </div>
  </section>
);

export default ArticlesSection;
