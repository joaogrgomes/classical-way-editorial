import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export type FilterState = {
  authors: string[];
  types: string[];
  years: string[];
  themes: string[];
};

export type FilterCounts = {
  authors: Record<string, number>;
  types: Record<string, number>;
  years: Record<string, number>;
  themes: Record<string, number>;
};

type FilterSidebarProps = {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  counts: FilterCounts;
};

const AUTHOR_NAMES = [
  "Rodrigo Almeida",
  "Ana Clara Borges",
  "Pedro Henrique Costa",
  "Maria Fernanda",
  "Lucas Mendonça",
  "João Vitor Maia",
  "Beatriz Souza",
  "Carlos Eduardo",
];

const TYPE_NAMES = ["Artigo", "Podcast", "Resenha de Livro", "Vídeo", "Sermão", "Blog"];
const YEAR_NAMES = ["2026", "2025", "2024", "2023", "2022"];
const THEME_NAMES = [
  "Trivium",
  "Literatura Clássica",
  "Família",
  "Cosmovisão",
  "Pedagogia",
  "Quadrivium",
  "Arte & Cultura",
];

const DEFAULT_VISIBLE = 5;
const AUTHOR_DEFAULT_VISIBLE = 8;

type SectionKey = "authors" | "types" | "years" | "themes";

const FilterSidebar = ({ filters, onFiltersChange, counts }: FilterSidebarProps) => {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    authors: false,
    types: false,
    years: false,
    themes: false,
  });

  const [showMore, setShowMore] = useState<Record<string, boolean>>({
    authors: false,
    themes: false,
  });

  const [authorSearch, setAuthorSearch] = useState("");

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleOption = (group: keyof FilterState, value: string) => {
    const current = filters[group] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [group]: updated });
  };

  const isChecked = (group: keyof FilterState, value: string) =>
    (filters[group] as string[]).includes(value);

  const renderCheckbox = (group: keyof FilterState, name: string, count: number) => (
    <label key={name} className="flex items-center gap-2.5 cursor-pointer group/cb py-0.5">
      <input
        type="checkbox"
        checked={isChecked(group, name)}
        onChange={() => toggleOption(group, name)}
        className="sr-only"
      />
      <span
        className={`w-[13px] h-[13px] border flex-shrink-0 flex items-center justify-center transition-colors ${
          isChecked(group, name)
            ? "border-bx-700 bg-bx-700"
            : "border-gy-300 group-hover/cb:border-gy-500"
        }`}
      >
        {isChecked(group, name) && (
          <Check size={8} className="text-white" strokeWidth={3} />
        )}
      </span>
      <span className="font-body text-[0.95rem] text-gy-700 flex-1 leading-[1.5]">{name}</span>
      <span className="font-display text-[0.45rem] tracking-[0.1em] text-gy-300">{count}</span>
    </label>
  );

  const renderSectionHeader = (key: SectionKey, label: string) => (
    <button
      className="w-full flex items-center justify-between py-3 border-b border-gy-100 hover:border-gy-200 transition-colors"
      onClick={() => toggleSection(key)}
      aria-expanded={openSections[key]}
    >
      <span className="font-display text-[0.55rem] tracking-[0.18em] uppercase text-gy-700">
        {label}
      </span>
      <ChevronDown
        size={13}
        className={`text-gy-400 transition-transform duration-200 ${
          openSections[key] ? "rotate-180" : ""
        }`}
      />
    </button>
  );

  const renderSectionBody = (key: SectionKey, children: React.ReactNode) => (
    <div
      className={`overflow-hidden transition-all duration-200 ease-out ${
        openSections[key] ? "max-h-[480px]" : "max-h-0"
      }`}
    >
      <div className="pt-3 pb-4 space-y-2">{children}</div>
    </div>
  );

  const showMoreLink = (key: string, total: number, visible: number) =>
    total > visible && !showMore[key] ? (
      <button
        onClick={() => setShowMore((prev) => ({ ...prev, [key]: true }))}
        className="font-display text-[0.48rem] tracking-[0.12em] uppercase text-bx-700 hover:text-bx-600 transition-colors mt-1 block"
      >
        Ver mais ({total - visible}) →
      </button>
    ) : null;

  const filteredAuthorNames = AUTHOR_NAMES.filter((n) =>
    n.toLowerCase().includes(authorSearch.toLowerCase())
  );
  const visibleAuthorNames = showMore.authors
    ? filteredAuthorNames
    : filteredAuthorNames.slice(0, AUTHOR_DEFAULT_VISIBLE);

  const visibleThemeNames = showMore.themes ? THEME_NAMES : THEME_NAMES.slice(0, DEFAULT_VISIBLE);

  return (
    <div>
      {/* Autor */}
      <div>
        {renderSectionHeader("authors", "Autor")}
        {renderSectionBody(
          "authors",
          <>
            <input
              type="text"
              value={authorSearch}
              onChange={(e) => setAuthorSearch(e.target.value)}
              placeholder="Buscar autor..."
              className="w-full border border-gy-200 px-3 py-1.5 font-body text-[0.9rem] text-gy-700 bg-background focus:outline-none focus:border-bx-600 mb-2"
            />
            {visibleAuthorNames.map((n) =>
              renderCheckbox("authors", n, counts.authors[n] ?? 0)
            )}
            {showMoreLink("authors", filteredAuthorNames.length, AUTHOR_DEFAULT_VISIBLE)}
          </>
        )}
      </div>

      {/* Tipo de Conteúdo */}
      <div>
        {renderSectionHeader("types", "Tipo de Conteúdo")}
        {renderSectionBody(
          "types",
          TYPE_NAMES.map((n) => renderCheckbox("types", n, counts.types[n] ?? 0))
        )}
      </div>

      {/* Data */}
      <div>
        {renderSectionHeader("years", "Data")}
        {renderSectionBody(
          "years",
          YEAR_NAMES.map((n) => renderCheckbox("years", n, counts.years[n] ?? 0))
        )}
      </div>

      {/* Tema */}
      <div>
        {renderSectionHeader("themes", "Tema")}
        {renderSectionBody(
          "themes",
          <>
            {visibleThemeNames.map((n) => renderCheckbox("themes", n, counts.themes[n] ?? 0))}
            {showMoreLink("themes", THEME_NAMES.length, DEFAULT_VISIBLE)}
          </>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
