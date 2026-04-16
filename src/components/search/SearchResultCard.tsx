import { Link } from "react-router-dom";

type Props = {
  type: string;
  title: string;
  authors: string[];
  date: string;
  excerpt: string;
  href: string;
};

const TYPE_LABELS: Record<string, string> = {
  Artigo: "Artigo",
  Podcast: "Podcast",
  "Resenha de Livro": "Resenha de Livro",
  Vídeo: "Vídeo",
  Sermão: "Sermão",
  Blog: "Blog",
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const SearchResultCard = ({ type, title, authors, date, excerpt, href }: Props) => {
  return (
    <article className="border-b border-gy-100 py-7">
      <span className="font-display text-[0.5rem] tracking-[0.18em] uppercase text-bx-600 font-semibold mb-2 block">
        {TYPE_LABELS[type] ?? type}
      </span>

      <Link
        to={href}
        className="group block mb-2"
      >
        <h2 className="font-heading text-[1.32rem] font-semibold italic text-gy-900 leading-[1.25] group-hover:text-bx-700 transition-colors">
          {title}
        </h2>
      </Link>

      <p className="font-body text-[0.95rem] text-gy-500 leading-[1.7] line-clamp-3 mb-3">
        {excerpt}
      </p>

      <div className="flex items-center gap-3 flex-wrap">
        {authors.length > 0 && (
          <span className="font-display text-[0.5rem] tracking-[0.12em] uppercase text-gy-400">
            {authors.join(", ")}
          </span>
        )}
        {authors.length > 0 && (
          <span className="w-[3px] h-[3px] bg-gy-200 inline-block" />
        )}
        <span className="font-display text-[0.5rem] tracking-[0.1em] uppercase text-gy-300">
          {formatDate(date)}
        </span>
      </div>
    </article>
  );
};

export default SearchResultCard;
