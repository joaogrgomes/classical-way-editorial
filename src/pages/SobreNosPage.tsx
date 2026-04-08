import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const beliefs = [
  "A educação é formação da alma, não apenas transferência de informação.",
  "O Trivium e o Quadrivium são caminhos comprovados para mentes cultivadas.",
  "A fé cristã reformada é o fundamento de toda verdadeira sabedoria.",
  "Pais, professores e escolas são parceiros no mesmo chamado.",
];

const SobreNosPage = () => (
  <div className="min-h-screen flex flex-col">
    <SiteHeader />

    {/* Hero */}
    <section className="bg-bx-900 py-20 px-[clamp(16px,4vw,48px)]">
      <div className="max-w-[720px] mx-auto text-center">
        <h1 className="font-heading italic text-[clamp(2rem,5vw,3rem)] text-white mb-4">
          Sobre Nós
        </h1>
        <p className="font-body text-[1.32rem] text-white/60 leading-[1.8] max-w-[52ch] mx-auto">
          Somos um portal editorial dedicado à Educação Cristã Clássica — guiando famílias e educadores no caminho da sabedoria.
        </p>
      </div>
    </section>

    {/* Missão */}
    <section className="bg-background py-16 px-[clamp(16px,4vw,48px)]">
      <div className="max-w-[720px] mx-auto">
        <h2 className="font-heading text-[clamp(1.4rem,3vw,1.8rem)] text-bx-900 mb-6">
          Nossa Missão
        </h2>
        <p className="font-body text-[1.26rem] text-gy-700 leading-[1.85]">
          Nossa missão é guiar famílias e educadores no caminho da sabedoria, ajudando-os a dar os primeiros passos — e a aprofundar-se — na Educação Cristã Clássica. Promovemos o ensino como formação da alma, oferecendo recursos e referências confiáveis que unem o Trivium e o Quadrivium à fé cristã reformada.
        </p>
      </div>
    </section>

    {/* O que acreditamos */}
    <section className="bg-background pb-16 px-[clamp(16px,4vw,48px)]">
      <div className="max-w-[720px] mx-auto">
        <h2 className="font-heading text-[clamp(1.4rem,3vw,1.8rem)] text-bx-900 mb-8">
          O que acreditamos
        </h2>
        <ul className="space-y-5">
          {beliefs.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="w-[3px] min-h-[24px] self-stretch bg-gd-600 mt-1" />
              <p className="font-body text-[1.26rem] text-gy-700 leading-[1.8]">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Declaração de Fé */}
    <section className="bg-surface-warm py-16 px-[clamp(16px,4vw,48px)]">
      <div className="max-w-[720px] mx-auto">
        <h2 className="font-heading text-[clamp(1.4rem,3vw,1.8rem)] text-bx-900 mb-6">
          Declaração de Fé
        </h2>
        <p className="font-body text-[1.26rem] text-gy-700 leading-[1.85]">
          Somos uma publicação confessional, comprometida com a fé cristã histórica tal como expressa nas grandes confissões reformadas. Todo conteúdo publicado aqui reflete esse compromisso.
        </p>
      </div>
    </section>

    {/* Equipe */}
    <section className="bg-background py-16 px-[clamp(16px,4vw,48px)]">
      <div className="max-w-[720px] mx-auto">
        <h2 className="font-heading text-[clamp(1.4rem,3vw,1.8rem)] text-bx-900 mb-6">
          Nossa Equipe
        </h2>
        <p className="font-body text-[1.26rem] text-gy-500 leading-[1.85] italic">
          Em breve apresentaremos os colaboradores e editores do Classical Way.
        </p>
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default SobreNosPage;
