const essays = [
  {
    num: "I",
    title: "O Trivium",
    desc: "O coração do método clássico: gramática, dialética e retórica como estrutura do pensamento ordenado e da fala íntegra.",
  },
  {
    num: "II",
    title: "O Quadrivium",
    desc: "Aritmética, geometria, música e astronomia — as disciplinas matemáticas que elevam a mente do sensível ao inteligível.",
  },
  {
    num: "III",
    title: "Paideia Cristã",
    desc: "A síntese entre a herança helênica e a revelação bíblica que define o projeto educativo cristão ao longo dos séculos.",
  },
  {
    num: "IV",
    title: "Formação da Virtude",
    desc: "A educação como habituação do caráter: como as virtudes cardeais e teologais moldam a alma ao longo do tempo.",
  },
];

const EssaysSection = () => (
  <section className="relative bg-bx-900 py-16 overflow-hidden" id="ensaios">
    {/* Background texture */}
    <div
      className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Folio_27r_-_The_Book_of_Kells.jpg/800px-Folio_27r_-_The_Book_of_Kells.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />

    <div className="relative max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
      {/* Header */}
      <div className="flex items-end justify-between mb-9 pb-3.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-0.5 bg-gd-600 flex-shrink-0" />
          <span className="font-display text-[0.6rem] tracking-[0.24em] uppercase text-white/65 font-semibold">
            Ensaios Fundamentais
          </span>
        </div>
        <a href="/ensaios" className="font-display text-[0.6rem] tracking-[0.14em] uppercase text-white/35 hover:text-gd-500 transition-colors">
          Ver biblioteca →
        </a>
      </div>

      <h2 className="font-heading text-[clamp(1.4rem,2.8vw,2rem)] italic font-semibold text-white/[0.88] mb-9 leading-[1.25]">
        Os Pilares da Educação Cristã Clássica
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {essays.map((essay) => (
          <article
            key={essay.num}
            className="bg-white/[0.04] border border-white/[0.07] p-7 cursor-pointer transition-all duration-200 hover:bg-white/[0.07] hover:border-gd-600/30"
          >
            <p className="font-display text-[0.6rem] tracking-[0.22em] uppercase text-gd-700 mb-3">
              {essay.num}
            </p>
            <h3 className="font-heading text-[1.32rem] font-semibold text-white/[0.88] mb-2.5">
              {essay.title}
            </h3>
            <p className="font-body text-[0.9rem] text-white/[0.42] leading-[1.65]">
              {essay.desc}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default EssaysSection;
