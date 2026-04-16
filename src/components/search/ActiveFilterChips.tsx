import { X } from "lucide-react";

export type ActiveFilter = {
  key: string;
  label: string;
  group: string;
};

type Props = {
  filters: ActiveFilter[];
  onRemove: (key: string, group: string) => void;
  onClearAll: () => void;
};

const ActiveFilterChips = ({ filters, onRemove, onClearAll }: Props) => {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-3">
      {filters.map((f) => (
        <span
          key={`${f.group}-${f.key}`}
          className="inline-flex items-center gap-1.5 border border-gy-200 bg-surface-warm px-3 py-1"
        >
          <span className="font-display text-[0.5rem] tracking-[0.12em] uppercase text-gy-700">
            {f.label}
          </span>
          <button
            onClick={() => onRemove(f.key, f.group)}
            className="text-gy-400 hover:text-bx-700 transition-colors leading-none"
            aria-label={`Remover filtro ${f.label}`}
          >
            <X size={10} />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="font-display text-[0.5rem] tracking-[0.12em] uppercase text-bx-700 hover:text-bx-600 transition-colors ml-1"
      >
        Limpar tudo
      </button>
    </div>
  );
};

export default ActiveFilterChips;
