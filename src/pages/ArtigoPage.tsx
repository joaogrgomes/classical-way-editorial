import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const article = {
  category: "Gramática & Paideia",
  title: "Aprender Latim não é elitismo: é restituir o acesso à sabedoria ocidental",
  author: "Profa. Clara Mendes",
  date: "10 Mar. 2026",
  readTime: "8 min",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg",
};

const relatedArticles = [
  {
    title: "Platão na sala de aula: o mito da caverna como método pedagógico",
    category: "Filosofia",
    author: "Dr. Samuel Luz",
    date: "18 Fev. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clementino_Inv305.jpg/800px-Plato_Pio-Clementino_Inv305.jpg",
  },
  {
    title: "Homero, os heróis e a educação do coração",
    category: "Literatura Clássica",
    author: "Prof. Rodrigo Castro",
    date: "20 Fev. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Euphronios_krater_side_A_MET_1972.11.10.jpg/1200px-Euphronios_krater_side_A_MET_1972.11.10.jpg",
  },
  {
    title: "Lutero, Calvino e a reforma do ensino: uma herança protestante",
    category: "Teologia",
    author: "Rev. Tiago Nogueira",
    date: "5 Fev. 2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg",
  },
];

const ArtigoPage = () => (
  <div className="min-h-screen bg-background">
    <SiteHeader />

    {/* Hero */}
    <section
      className="relative min-h-[420px] flex items-end"
      style={{
        backgroundImage: `url(${article.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-bx-900/70" />
      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] pb-12 pt-24">
        <span className="font-display text-[0.46rem] tracking-[0.18em] uppercase text-gd-500 mb-3 block">
          {article.category}
        </span>
        <h1 className="font-heading italic text-[clamp(1.6rem,4vw,2.6rem)] text-white leading-[1.18] max-w-[680px] mb-5">
          {article.title}
        </h1>
        <div className="flex items-center gap-4">
          <span className="font-display text-[0.46rem] tracking-[0.12em] uppercase text-white/50">
            {article.author}
          </span>
          <span className="w-[3px] h-[3px] bg-white/30 rounded-full" />
          <span className="font-display text-[0.46rem] tracking-[0.12em] uppercase text-white/50">
            {article.date}
          </span>
          <span className="w-[3px] h-[3px] bg-white/30 rounded-full" />
          <span className="font-display text-[0.46rem] tracking-[0.12em] uppercase text-white/50">
            {article.readTime} de leitura
          </span>
        </div>
      </div>
    </section>

    {/* Body + Sidebar */}
    <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] py-12 lg:flex gap-12">
      {/* Article body */}
      <article className="max-w-[680px]">
        <p className="font-body text-[1.1rem] text-gy-800 leading-[1.85] mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
        </p>
        <p className="font-body text-[1.1rem] text-gy-800 leading-[1.85] mb-6">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
        </p>

        <blockquote className="border-l-4 border-gd-600 pl-6 my-8">
          <p className="font-heading italic text-[1.3rem] text-gy-700 leading-[1.6]">
            "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
          </p>
        </blockquote>

        <p className="font-body text-[1.1rem] text-gy-800 leading-[1.85] mb-6">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
        <p className="font-body text-[1.1rem] text-gy-800 leading-[1.85] mb-6">
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
        </p>
      </article>

      {/* Sidebar */}
      <aside className="hidden lg:block w-[280px] flex-shrink-0 mt-2">
        {/* Author */}
        <div className="mb-10">
          <p className="font-display text-[0.44rem] tracking-[0.18em] uppercase text-gy-400 mb-4">Sobre o autor</p>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gy-200 rounded-full flex items-center justify-center">
              <span className="font-display text-[0.5rem] text-gy-500 uppercase">CM</span>
            </div>
            <div>
              <p className="font-heading text-[0.95rem] font-semibold text-gy-900">{article.author}</p>
            </div>
          </div>
          <p className="font-body text-[0.88rem] text-gy-500 leading-[1.7]">
            Professora de Letras Clássicas e pesquisadora em pedagogia do Trivium. Escreve sobre o ensino de latim e grego na educação cristã.
          </p>
        </div>

        {/* Related */}
        <div>
          <p className="font-display text-[0.44rem] tracking-[0.18em] uppercase text-gy-400 mb-4">Artigos relacionados</p>
          <div className="space-y-4">
            {relatedArticles.map((a) => (
              <Link key={a.title} to="/artigos/exemplo" className="block group">
                <span className="font-display text-[0.4rem] tracking-[0.14em] uppercase text-bx-600 block mb-1">{a.category}</span>
                <p className="font-heading text-[0.88rem] italic text-gy-800 leading-[1.3] group-hover:text-bx-700 transition-colors">
                  {a.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>

    {/* Continue lendo */}
    <section className="bg-background pb-16">
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
        <div className="triple-rule mb-10">
          <span className="r1" />
          <span className="r2" />
          <span className="r3" />
        </div>
        <h3 className="font-heading text-[1.4rem] italic text-gy-900 mb-8">Continue lendo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {relatedArticles.map((a) => (
            <Link key={a.title} to="/artigos/exemplo" className="group">
              <div className="aspect-[4/3] overflow-hidden mb-4">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              <span className="font-display text-[0.44rem] tracking-[0.16em] uppercase text-bx-600 font-semibold mb-2 block">
                {a.category}
              </span>
              <h2 className="font-heading text-[1.15rem] font-semibold italic text-gy-900 leading-[1.25] mb-2 group-hover:text-bx-700 transition-colors">
                {a.title}
              </h2>
              <div className="flex justify-between items-center">
                <span className="font-display text-[0.46rem] tracking-[0.12em] uppercase text-gy-400">{a.author}</span>
                <span className="font-display text-[0.46rem] tracking-[0.1em] uppercase text-gy-300">{a.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default ArtigoPage;
