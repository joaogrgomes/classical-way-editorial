import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const book = {
  title: "A Escola Clássica Cristã",
  author: "Douglas Wilson",
  category: "Educação",
  badge: "Recomendado",
  stars: 5,
  reviewer: "Dr. Marcos Albuquerque",
  date: "12 Mar 2026",
  readTime: "8 min de leitura",
  coverBg: "bg-bx-800",
  excerpt: "Uma defesa vigorosa e prática da educação clássica cristã como modelo pedagógico para a igreja contemporânea.",
};

const moreReviews = [
  { title: "Norms & Nobility", author: "David Hicks", category: "Educação", stars: 4, coverBg: "bg-bx-600", reviewer: "Profa. Ana Cavalcante" },
  { title: "The Lost Tools of Learning", author: "Dorothy L. Sayers", category: "Educação", stars: 4, coverBg: "bg-gd-700", reviewer: "Rev. Pedro Nóbrega" },
  { title: "Zero to One", author: "Peter Thiel", category: "Empreendedorismo", stars: 5, coverBg: "bg-bx-800", reviewer: "João Mendes" },
];

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5 text-gd-600 text-sm">
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? "text-gd-600" : "text-gy-200"}>★</span>
    ))}
  </div>
);

const BookResenhaPage = () => (
  <div className="min-h-screen bg-background">
    <SiteHeader />

    {/* Hero */}
    <div className="bg-surface-warm py-12 lg:py-16">
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left */}
          <div className="flex-1">
            <span className="inline-block font-display text-[0.6rem] tracking-[0.14em] uppercase bg-bx-700 text-white px-2.5 py-1 mb-4">
              {book.category}
            </span>
            <h1 className="font-heading text-[clamp(1.6rem,3.5vw,2rem)] italic font-semibold text-gy-900 leading-[1.15] mb-2">
              {book.title}
            </h1>
            <p className="font-display text-[0.6rem] tracking-[0.14em] uppercase text-gy-400 mb-3">
              {book.author}
            </p>
            <StarRating count={book.stars} />
            <div className="w-full h-px bg-gy-200 my-4" />
            <p className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-gy-400">
              Resenha por {book.reviewer} · {book.date} · {book.readTime}
            </p>
          </div>
          {/* Cover */}
          <div className={`w-[180px] shrink-0 aspect-[2/3] ${book.coverBg} flex flex-col items-center justify-center p-6`}>
            <h3 className="font-heading text-[1.2rem] italic font-semibold text-white text-center leading-[1.3] mb-1">
              {book.title}
            </h3>
            <p className="font-display text-[0.6rem] tracking-[0.14em] uppercase text-white/60">
              {book.author}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Triple rule */}
    <div className="triple-rule" />

    {/* Body */}
    <article className="max-w-[680px] mx-auto py-12 px-[clamp(16px,4vw,48px)]">
      <p className="font-body text-[1.32rem] text-gy-800 leading-[1.85] mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <p className="font-body text-[1.32rem] text-gy-800 leading-[1.85] mb-6">
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </p>

      <blockquote className="border-l-4 border-gd-600 pl-6 my-8">
        <p className="font-heading italic text-[1.56rem] text-gy-700 leading-[1.5]">
          "A educação clássica não é um método entre muitos — é o caminho que moldou as maiores mentes da civilização ocidental."
        </p>
      </blockquote>

      <p className="font-body text-[1.32rem] text-gy-800 leading-[1.85] mb-6">
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
      </p>
      <p className="font-body text-[1.32rem] text-gy-800 leading-[1.85] mb-6">
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
      </p>
    </article>

    {/* Book CTA */}
    <div className="max-w-[680px] mx-auto px-[clamp(16px,4vw,48px)] pb-12">
      <div className="bg-surface-warm p-6 flex gap-5 items-start">
        <div className={`w-[80px] shrink-0 aspect-[2/3] ${book.coverBg} flex flex-col items-center justify-center p-3`}>
          <h4 className="font-heading text-[0.6rem] italic font-semibold text-white text-center leading-[1.3]">
            {book.title}
          </h4>
        </div>
        <div className="flex-1">
          <h3 className="font-heading text-[1.32rem] italic font-semibold text-gy-900 leading-[1.25] mb-1">
            {book.title}
          </h3>
          <p className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-gy-400 mb-3">
            {book.author}
          </p>
          <a
            href="#"
            className="inline-block font-display text-[0.6rem] tracking-[0.16em] uppercase bg-bx-700 text-white px-4 py-2 hover:bg-bx-600 transition-colors"
          >
            Comprar livro →
          </a>
        </div>
      </div>
    </div>

    {/* Triple rule */}
    <div className="triple-rule" />

    {/* More reviews */}
    <section className="py-12 lg:py-16">
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)]">
        <h2 className="font-heading text-[1.4rem] italic font-semibold text-gy-900 mb-8">Mais Resenhas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {moreReviews.map((b) => (
            <Link to="/resenhas/exemplo" key={b.title} className="group">
              <div className={`aspect-[2/3] ${b.coverBg} flex flex-col items-center justify-center p-8 mb-4`}>
                <h3 className="font-heading text-[1.2rem] italic font-semibold text-white text-center leading-[1.3] mb-2">
                  {b.title}
                </h3>
                <p className="font-display text-[0.55rem] tracking-[0.14em] uppercase text-white/60">
                  {b.author}
                </p>
              </div>
              <StarRating count={b.stars} />
              <span className="font-display text-[0.53rem] tracking-[0.16em] uppercase text-bx-600 font-semibold mt-2 block">
                {b.category}
              </span>
              <h4 className="font-heading text-[1.38rem] font-semibold italic text-gy-900 leading-[1.25] mt-1 mb-1">
                {b.title}
              </h4>
              <p className="font-display text-[0.55rem] tracking-[0.12em] uppercase text-gy-400">
                {b.author}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default BookResenhaPage;
