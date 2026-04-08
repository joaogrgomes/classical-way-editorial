const QuoteBand = () => (
  <section className="bg-surface-warm py-12 border-t border-b border-gy-100">
    <div className="max-w-[720px] mx-auto text-center px-[clamp(16px,4vw,48px)]">
      <div className="w-10 h-0.5 bg-gd-600 mx-auto mb-6" />
      <blockquote className="font-heading text-[clamp(1.1rem,2vw,1.5rem)] italic text-gy-800 leading-[1.5] mb-3.5">
        "O objetivo da educação não é preencher um balde, mas acender um fogo."
      </blockquote>
      <p className="font-display text-[0.6rem] tracking-[0.2em] uppercase text-gy-400">
        William Butler Yeats &nbsp;·&nbsp; atribuído
      </p>
    </div>
  </section>
);

export default QuoteBand;
