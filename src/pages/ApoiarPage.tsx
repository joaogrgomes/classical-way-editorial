import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const donationTiers = [
  { amount: "R$ 25", label: "Semente", description: "Contribua para manter nossos artigos gratuitos e acessíveis a todos." },
  { amount: "R$ 50", label: "Cultivo", description: "Apoie a produção de podcasts e ensaios aprofundados sobre educação clássica." },
  { amount: "R$ 100", label: "Colheita", description: "Financie a tradução de obras clássicas e a criação de novos conteúdos formativos." },
  { amount: "R$ 250", label: "Patrono", description: "Torne-se um patrono e sustente a missão integral da Classical Way a longo prazo." },
];

const impactItems = [
  { number: "120+", text: "Artigos e ensaios publicados gratuitamente" },
  { number: "45+", text: "Episódios de podcast sobre tradição e educação" },
  { number: "10.000+", text: "Leitores e ouvintes alcançados mensalmente" },
  { number: "100%", text: "Do conteúdo permanece gratuito e aberto" },
];

const ApoiarPage = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Apoiar — The Classical Way"
        description="Sustente a difusão da verdade, da beleza e do bem. Sua contribuição nos permite continuar publicando artigos, produzindo podcasts e cultivando a educação clássica."
        canonical="https://theclassicalway.com.br/apoiar"
        ogType="website"
      />
      <SiteHeader />

      {/* Hero */}
      <section className="bg-bx-900 py-20 lg:py-28">
        <div className="max-w-[780px] mx-auto px-[clamp(16px,4vw,48px)] text-center">
          <span className="font-display text-[0.62rem] tracking-[0.24em] uppercase text-gd-500 mb-4 block">
            Apoiar a Missão
          </span>
          <h1 className="font-heading text-[clamp(1.8rem,4.5vw,3rem)] italic font-bold text-white/95 leading-[1.12] mb-6">
            Sustente a Difusão da Verdade, da Beleza e do Bem
          </h1>
          <p className="font-body text-[1.32rem] text-white/55 leading-[1.75] max-w-[58ch] mx-auto">
            A Classical Way existe para oferecer conteúdo intelectual profundo, gratuito e acessível. Sua contribuição nos permite continuar publicando artigos, produzindo podcasts e cultivando uma comunidade dedicada à educação clássica e à formação da alma.
          </p>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-16 lg:py-20 border-b border-gy-100">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <div className="text-center mb-12">
            <span className="font-display text-[0.6rem] tracking-[0.22em] uppercase text-bx-700 block mb-3">
              Escolha Como Contribuir
            </span>
            <h2 className="font-heading text-[clamp(1.4rem,3vw,2rem)] italic font-bold text-gy-900 leading-[1.15]">
              Cada contribuição fortalece a tradição
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {donationTiers.map((tier) => (
              <div
                key={tier.label}
                className="border border-gy-100 p-6 flex flex-col items-center text-center hover:border-gd-600 transition-colors group"
              >
                <span className="font-display text-[0.55rem] tracking-[0.2em] uppercase text-gd-600 mb-2">
                  {tier.label}
                </span>
                <span className="font-heading text-[2rem] italic font-bold text-gy-900 mb-3">
                  {tier.amount}
                </span>
                <p className="font-body text-[1.06rem] text-gy-500 leading-[1.6] mb-6 flex-1">
                  {tier.description}
                </p>
                <button className="w-full font-display text-[0.6rem] tracking-[0.16em] uppercase bg-bx-900 text-white py-3 hover:bg-bx-700 transition-colors group-hover:bg-gd-700">
                  Contribuir
                </button>
              </div>
            ))}
          </div>

          <p className="text-center font-body text-[1.06rem] text-gy-400 mt-8">
            Deseja contribuir com outro valor?{" "}
            <a href="#contato" className="text-bx-700 underline underline-offset-2 hover:text-gd-600 transition-colors">
              Entre em contato conosco
            </a>.
          </p>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 lg:py-20 bg-pg-100 border-b border-gy-100">
        <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
          <div className="text-center mb-12">
            <span className="font-display text-[0.6rem] tracking-[0.22em] uppercase text-bx-700 block mb-3">
              O Impacto do Seu Apoio
            </span>
            <h2 className="font-heading text-[clamp(1.2rem,2.5vw,1.6rem)] italic font-bold text-gy-900 leading-[1.2] max-w-[50ch] mx-auto">
              Com o apoio de nossos leitores, a Classical Way já alcançou
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactItems.map((item) => (
              <div key={item.text} className="text-center">
                <span className="font-heading text-[clamp(2rem,4vw,2.8rem)] italic font-bold text-gd-700 block mb-1">
                  {item.number}
                </span>
                <span className="font-body text-[0.85rem] text-gy-600 leading-[1.5]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[680px] mx-auto px-[clamp(16px,4vw,48px)] text-center">
          <h2 className="font-heading text-[clamp(1.56rem,3.6vw,2.16rem)] italic font-bold text-gy-900 leading-[1.2] mb-4">
            A verdadeira educação é um bem comum.
            <br />
            Ajude-nos a oferecê-la.
          </h2>
          <p className="font-body text-base text-gy-500 leading-[1.72] mb-8 max-w-[50ch] mx-auto">
            Toda contribuição — por menor que seja — nos permite manter esta plataforma gratuita, independente e dedicada ao que é verdadeiro, belo e bom.
          </p>
          <Link
            to="#"
            className="inline-block font-display text-[0.62rem] tracking-[0.16em] uppercase bg-gd-700 text-white px-8 py-3 hover:bg-gd-600 transition-colors"
          >
            Contribuir Agora →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ApoiarPage;
