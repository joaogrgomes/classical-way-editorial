const Masthead = () => (
  <div className="bg-background pt-8 pb-0 text-center">
    <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
      <h1 className="font-display font-bold text-[clamp(32px,6.5vw,80px)] tracking-[0.1em] uppercase text-bx-800 leading-none">
        The Classical Way
      </h1>
      <span className="font-display text-[0.62rem] tracking-[0.32em] uppercase text-gd-700 mt-1.5 mb-4 block">
        Veritas &nbsp;·&nbsp; Bonitas &nbsp;·&nbsp; Pulchritudo
      </span>
      <div className="flex items-center justify-center gap-2.5 mb-0">
        <span className="flex-1 max-w-[220px] h-px bg-gy-200" />
        <span className="text-gd-600 text-[11px] opacity-80">✦</span>
        <span className="text-gd-600 text-[11px] opacity-80">✛</span>
        <span className="text-gd-600 text-[11px] opacity-80">✦</span>
        <span className="flex-1 max-w-[220px] h-px bg-gy-200" />
      </div>
      <div className="triple-rule mt-4">
        <span className="r1" />
        <span className="r2" />
        <span className="r3" />
      </div>
    </div>
  </div>
);

export default Masthead;
