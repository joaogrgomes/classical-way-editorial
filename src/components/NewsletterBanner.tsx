import { useState } from "react";

const NewsletterBanner = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-bx-900 py-16 border-t-2 border-gd-600" id="contato">
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="font-display text-[0.62rem] tracking-[0.22em] uppercase text-gd-600 block mb-2">
            Newsletter Gratuita
          </span>
          <h2 className="font-display text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-[0.06em] uppercase text-white leading-[1.1] mb-4">
            A Rota Clássica
          </h2>
          <p className="font-body text-base text-white/50 leading-[1.85] max-w-[50ch]">
            Toda semana: um artigo aprofundado, uma recomendação de leitura clássica, um recurso para o educador e uma reflexão sobre a tradição cristã. Sem spam — apenas substância, beleza e verdade.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Seu nome completo"
            required
            className="w-full font-body text-[0.95rem] px-4 py-3 bg-white/[0.06] border border-white/10 text-white placeholder:text-white/25 outline-none focus:border-gd-600 transition-colors"
          />
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="seu@email.com.br"
              required
              className="flex-1 font-body text-[0.95rem] px-4 py-3 bg-white/[0.06] border border-white/10 text-white placeholder:text-white/25 outline-none focus:border-gd-600 transition-colors"
            />
            <button
              type="submit"
              disabled={submitted}
              className="font-display text-[0.6rem] tracking-[0.14em] uppercase bg-bx-700 text-white px-6 py-3 hover:bg-bx-900 transition-colors disabled:bg-emerald-700 disabled:cursor-default whitespace-nowrap"
            >
              {submitted ? "✓ Inscrito!" : "Assinar"}
            </button>
          </div>
          <p className="font-display text-[0.6rem] tracking-[0.1em] uppercase text-white/55">
            Seus dados estão seguros. Cancele quando quiser.
          </p>
        </form>
      </div>
    </section>
  );
};

export default NewsletterBanner;
