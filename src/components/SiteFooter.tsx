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
            {/* Symbol — logo-header-e-footer.svg, rendered white via currentColor */}
            <svg width="36" height="36" viewBox="0 0 132 132" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white flex-shrink-0">
              <path d="M66.1538 112.308C91.6439 112.308 112.308 91.6439 112.308 66.1538C112.308 40.6638 91.6439 20 66.1538 20C40.6638 20 20 40.6638 20 66.1538C20 91.6439 40.6638 112.308 66.1538 112.308Z" stroke="currentColor" strokeWidth="1.47692"/>
              <path opacity="0.4" d="M66.1537 105.846C88.0752 105.846 105.846 88.0752 105.846 66.1537C105.846 44.2323 88.0752 26.4614 66.1537 26.4614C44.2323 26.4614 26.4614 44.2323 26.4614 66.1537C26.4614 88.0752 44.2323 105.846 66.1537 105.846Z" stroke="currentColor" strokeWidth="0.3"/>
              <path d="M66 66.0769V31" stroke="currentColor" strokeLinecap="round"/>
              <path d="M66 66V101.077" stroke="currentColor" strokeLinecap="round"/>
              <path d="M66 66H101.077" stroke="currentColor" strokeLinecap="round"/>
              <path d="M66.0769 66H31" stroke="currentColor" strokeLinecap="round"/>
              <path opacity="0.4" d="M44.1768 43.8232C44.0791 43.7256 43.9209 43.7256 43.8232 43.8232C43.7256 43.9209 43.7256 44.0791 43.8232 44.1768L44 44L44.1768 43.8232ZM43.8232 88.1309C43.7256 88.2285 43.7256 88.3868 43.8232 88.4844C43.9209 88.5821 44.0791 88.5821 44.1768 88.4844L44 88.3077L43.8232 88.1309ZM88.1309 88.4844C88.2285 88.5821 88.3868 88.5821 88.4844 88.4844C88.5821 88.3868 88.5821 88.2285 88.4844 88.1309L88.3077 88.3077L88.1309 88.4844ZM66.1538 66.1538L66.3306 65.9771L44.1768 43.8232L44 44L43.8232 44.1768L65.9771 66.3306L66.1538 66.1538ZM66.1538 66.1538L66.3306 66.3306L88.4844 44.1768L88.3077 44L88.1309 43.8232L65.9771 65.9771L66.1538 66.1538ZM66.1538 66.1538L65.9771 65.9771L43.8232 88.1309L44 88.3077L44.1768 88.4844L66.3306 66.3306L66.1538 66.1538ZM66.1538 66.1538L65.9771 66.3306L88.1309 88.4844L88.3077 88.3077L88.4844 88.1309L66.3306 65.9771L66.1538 66.1538Z" fill="currentColor"/>
              <path d="M66 71C68.7614 71 71 68.7614 71 66C71 63.2386 68.7614 61 66 61C63.2386 61 61 63.2386 61 66C61 68.7614 63.2386 71 66 71Z" fill="currentColor"/>
              <path d="M66 59V76" stroke="currentColor"/>
              <path d="M59 66H74" stroke="currentColor"/>
            </svg>
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
