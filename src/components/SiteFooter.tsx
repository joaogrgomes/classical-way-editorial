import LogoMark from "./LogoMark";

const footerCols = [
  {
    title: "Conteúdo",
    links: ["Artigos", "Ensaios", "Podcasts", "Newsletter"],
  },
  {
    title: "Temas",
    links: ["O Trivium", "Literatura Clássica", "Teologia e Educação", "Família", "Filosofia Cristã"],
  },
  {
    title: "Institucional",
    links: ["Sobre Nós", "Contato", "Apoiar o Ministério"],
  },
];

const SiteFooter = () => (
  <footer className="bg-gy-950 pt-16 pb-8">
    <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <LogoMark size={36} />
            <span className="font-display text-[0.7rem] font-bold tracking-[0.16em] uppercase text-gd-300">
              The Classical Way
            </span>
          </div>
          <p className="font-body text-[0.95rem] text-white/40 leading-[1.7] max-w-[40ch] mb-5">
            Formando mentes e almas para a glória de Deus através da herança viva da educação cristã clássica.
          </p>
          <div className="flex gap-2">
            {["YT", "SP", "IG", "𝕏"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-8 h-8 flex items-center justify-center font-display text-[0.6rem] tracking-[0.08em] uppercase text-white/30 border border-white/10 hover:text-gd-500 hover:border-gd-700 transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {footerCols.map((col) => (
            <div key={col.title}>
              <p className="font-display text-[0.55rem] tracking-[0.2em] uppercase text-white/30 mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-[1.06rem] text-white/40 hover:text-gd-500 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-[0.6rem] tracking-[0.12em] uppercase text-white/20">
          © 2026 The Classical Way. Todos os direitos reservados.
        </p>
        <p className="font-display text-[0.55rem] tracking-[0.22em] uppercase text-gd-700/60 italic">
          Soli Deo Gloria
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
