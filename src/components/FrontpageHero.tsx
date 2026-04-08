import heroImage from "@/assets/hero-school-of-athens.jpg";

const sidebarItems = [
  {
    category: "Filosofia da Educação",
    title: "Agostinho e o Fundamento da Educação Liberal",
    excerpt: "A ordem do amor como princípio pedagógico na obra do bispo de Hipona.",
    author: "Profa. Ana Cavalcante",
  },
  {
    category: "Trivium",
    title: "A Gramática como Amor pela Linguagem Ordenada",
    excerpt: "Aprender a língua é aprender a reconhecer a ordem inscrita na criação.",
    author: "Rev. Pedro Nóbrega",
  },
  {
    category: "Família & Lar",
    title: "Como Criar uma Cultura Clássica no Lar Cristão",
    excerpt: "Práticas concretas para pais que desejam educar com profundidade e beleza.",
    author: "Fernanda Morais",
  },
  {
    category: "Literatura Clássica",
    title: "Homero, Virgílio e a Imaginação Cristã",
    excerpt: "O que os poemas épicos podem ainda ensinar a jovens cristãos.",
    author: "Carlos Eduardo Lins",
  },
];

const FrontpageHero = () => (
  <section className="bg-background border-b-2 border-gy-900">
    <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] grid grid-cols-1 lg:grid-cols-[1fr_1px_340px] gap-0 items-start">
      {/* Main article */}
      <div className="py-5 lg:pr-8">
        <div className="font-display text-[0.62rem] tracking-[0.22em] uppercase text-bx-700 flex items-center gap-3 mb-3.5">
          Artigo em Destaque
          <span className="flex-1 h-px bg-gy-100" />
        </div>

        <div className="w-full aspect-video overflow-hidden mb-5 relative">
          <img
            src={heroImage}
            alt="A Escola de Atenas — representação da tradição intelectual clássica"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bx-900/10 to-bx-900/35" />
        </div>

        <h2 className="font-heading text-[clamp(22px,2.8vw,36px)] font-bold italic leading-[1.15] text-gy-900 mb-3.5">
          A Formação da <em className="text-bx-700 italic">Alma</em> pelo Logos:
          <br />
          Por Que o Trivium Importa Hoje
        </h2>

        <p className="font-body text-base leading-[1.72] text-gy-600 mb-4 max-w-[65ch]">
          A educação clássica não é uma pedagogia nostálgica — é o reconhecimento de que a criança é, acima de tudo, uma alma destinada ao conhecimento de Deus e ao exercício da virtude. Gramática, dialética e retórica não são disciplinas: são a arquitetura do pensamento cristão.
        </p>

        <div className="flex items-center flex-wrap gap-3.5 font-display text-[0.62rem] tracking-[0.14em] uppercase text-gy-400">
          <span>Dr. Marcos Albuquerque</span>
          <span className="opacity-35">·</span>
          <span>Gramática & Paideia</span>
          <span className="opacity-35">·</span>
          <span>8 min de leitura</span>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block bg-gy-100 self-stretch" />

      {/* Sidebar */}
      <div className="py-5 lg:pl-7 border-t lg:border-t-0 border-gy-100">
        <p className="font-display text-[0.6rem] tracking-[0.22em] uppercase text-gy-300 mb-4 pb-2.5 border-b border-gy-100">
          Outros Destaques
        </p>
        {sidebarItems.map((item) => (
          <article
            key={item.title}
            className="flex flex-col gap-1 py-3.5 border-b border-gy-100 last:border-b-0 cursor-pointer transition-opacity hover:opacity-75"
          >
            <span className="font-display text-[0.53rem] tracking-[0.18em] uppercase text-bx-600">
              {item.category}
            </span>
            <span className="font-heading text-[0.95rem] font-semibold text-gy-900 leading-[1.25]">
              {item.title}
            </span>
            <span className="font-body text-[0.85rem] text-gy-500 leading-[1.5]">
              {item.excerpt}
            </span>
            <span className="font-display text-[0.53rem] tracking-[0.12em] uppercase text-gy-300">
              {item.author}
            </span>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default FrontpageHero;
