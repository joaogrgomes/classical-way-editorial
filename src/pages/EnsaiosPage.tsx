import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const categories = ["Todos", "O Trivium", "O Quadrivium", "Paideia Cristã", "Formação da Virtude", "Filosofia Cristã"];

const allEssays = [
  {
    num: "I",
    category: "O Trivium",
    title: "O Trivium como estrutura do pensamento ordenado",
    desc: "Gramática, dialética e retórica não são disciplinas isoladas — são modos de pensar, argumentar e comunicar que formam a alma inteira.",
    author: "Dr. Samuel Luz",
    date: "12 Mar. 2026",
    readTime: "18 min de leitura",
  },
  {
    num: "II",
    category: "O Quadrivium",
    title: "Do número ao cosmos: a beleza matemática como caminho para Deus",
    desc: "Aritmética, geometria, música e astronomia — as disciplinas matemáticas que elevam a mente do sensível ao inteligível.",
    author: "Prof. Rodrigo Castro",
    date: "5 Mar. 2026",
    readTime: "22 min de leitura",
  },
  {
    num: "III",
    category: "Paideia Cristã",
    title: "A síntese entre Atenas e Jerusalém na educação cristã",
    desc: "A síntese entre a herança helênica e a revelação bíblica que define o projeto educativo cristão ao longo dos séculos.",
    author: "Rev. Tiago Nogueira",
    date: "25 Fev. 2026",
    readTime: "25 min de leitura",
  },
  {
    num: "IV",
    category: "Formação da Virtude",
    title: "A educação como habituação do caráter",
    desc: "Como as virtudes cardeais e teologais moldam a alma ao longo do tempo — da repetição à segunda natureza.",
    author: "Dr. Samuel Luz",
    date: "18 Fev. 2026",
    readTime: "20 min de leitura",
  },
  {
    num: "V",
    category: "Filosofia Cristã",
    title: "Agostinho e a ordem do amor na educação",
    desc: "O ordo amoris como princípio pedagógico: aprender a amar as coisas certas, na ordem certa, com a intensidade certa.",
    author: "Profa. Clara Mendes",
    date: "10 Fev. 2026",
    readTime: "16 min de leitura",
  },
  {
    num: "VI",
    category: "O Trivium",
    title: "Retórica e verdade: a fala íntegra como vocação cristã",
    desc: "A arte de persuadir não é manipulação — é serviço ao próximo através da clareza, da beleza e da verdade.",
    author: "Prof. Rodrigo Castro",
    date: "1 Fev. 2026",
    readTime: "19 min de leitura",
  },
  {
    num: "VII",
    category: "Paideia Cristã",
    title: "Comenius e o ideal da escola universal",
    desc: "A visão grandiosa de Jan Amos Comenius: ensinar tudo a todos, de todas as maneiras — uma pedagogia cristã total.",
    author: "Marina Santos",
    date: "22 Jan. 2026",
    readTime: "24 min de leitura",
  },
  {
    num: "VIII",
    category: "Formação da Virtude",
    title: "Temperança e estudo: a disciplina como forma de liberdade",
    desc: "A virtude da temperança aplicada à vida intelectual — como o autodomínio liberta para a contemplação.",
    author: "Ana Beatriz Lopes",
    date: "14 Jan. 2026",
    readTime: "15 min de leitura",
  },
];

const EnsaiosPage = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  useScrollReveal();

  const filtered = activeCategory === "Todos"
    ? allEssays
    : allEssays.filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Page header */}
      <div className="bg-bx-900 py-14 lg:py-20">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <h1 className="font-heading text-[clamp(2.16rem,4.8vw,3.36rem)] italic font-semibold text-white/[0.92] leading-[1.15] mb-3">
            Ensaios
          </h1>
          <p className="font-body text-[1.26rem] text-white/[0.45] max-w-[52ch] leading-[1.7]">
            Textos longos e densos sobre os fundamentos da educação cristã clássica.
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
                className={`font-display text-[0.6rem] tracking-[0.14em] uppercase whitespace-nowrap px-4 py-3.5 border-b-2 transition-colors duration-200 ${
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

      {/* Essays list */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[820px] mx-auto px-[clamp(16px,4vw,48px)]">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-body text-gy-400 text-lg">Nenhum ensaio encontrado nesta categoria.</p>
              <button
                onClick={() => setActiveCategory("Todos")}
                className="font-display text-[0.6rem] tracking-[0.14em] uppercase text-bx-700 mt-4 hover:text-bx-600 transition-colors"
              >
                Ver todos os ensaios →
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gy-100">
              {filtered.map((essay) => (
                <article key={essay.num + essay.title} className="py-8 first:pt-0 last:pb-0 group cursor-pointer reveal">
                  <div className="flex gap-6 items-start">
                    <span className="font-display text-2xl font-bold text-gy-100 leading-none flex-shrink-0 w-10 text-right pt-1">
                      {essay.num}
                    </span>
                    <div className="flex-1">
                      <span className="font-display text-[0.53rem] tracking-[0.16em] uppercase text-gd-700 font-semibold mb-2 block">
                        {essay.category}
                      </span>
                      <h2 className="font-heading text-[1.25rem] font-semibold italic text-gy-900 leading-[1.25] mb-2.5 group-hover:text-bx-700 transition-colors">
                        {essay.title}
                      </h2>
                      <p className="font-body text-[0.95rem] text-gy-500 leading-[1.65] mb-3">
                        {essay.desc}
                      </p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-gy-400">{essay.author}</span>
                        <span className="text-gy-200">·</span>
                        <span className="font-display text-[0.55rem] tracking-[0.1em] uppercase text-gy-300">{essay.date}</span>
                        <span className="text-gy-200">·</span>
                        <span className="font-display text-[0.55rem] tracking-[0.1em] uppercase text-gy-300">{essay.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default EnsaiosPage;
