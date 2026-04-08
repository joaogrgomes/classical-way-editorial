import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-banner-library.jpg";

const HeroBanner = () => (
  <div className="px-[clamp(16px,4vw,48px)] py-8">
  <section className="relative min-h-[420px] lg:min-h-[520px] flex items-end overflow-hidden">
    <img
      src={heroBg}
      alt="Biblioteca clássica"
      className="absolute inset-0 w-full h-full object-cover"
      width={1920}
      height={800}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-bx-900/90 via-bx-900/50 to-bx-900/20" />
    <div className="relative z-10 max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] w-full pb-12 lg:pb-16 pt-20">
      <span className="font-display text-[0.6rem] tracking-[0.24em] uppercase text-gd-500 mb-3 block">
        Destaque
      </span>
      <h2 className="font-heading text-[clamp(1.92rem,4.8vw,3.36rem)] italic font-bold text-white/95 leading-[1.15] max-w-[680px] mb-4">
        A educação clássica como caminho de formação integral da alma
      </h2>
      <p className="font-body text-[1.26rem] text-white/60 max-w-[520px] leading-[1.7] mb-6">
        Um convite à redescoberta das artes liberais, da contemplação e do cultivo da virtude como fundamentos da verdadeira educação.
      </p>
      <Link
        to="/artigos"
        className="inline-block font-display text-[0.62rem] tracking-[0.16em] uppercase bg-gd-700 text-white px-5 py-[9px] hover:bg-gd-600 transition-colors"
      >
        Ler artigo →
      </Link>
    </div>
  </section>
  </div>
);

export default HeroBanner;
