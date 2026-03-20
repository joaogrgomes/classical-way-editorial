import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import LogoMark from "./LogoMark";

const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Artigos", href: "/artigos" },
  { label: "Podcast", href: "/podcast" },
  { label: "Ensaios", href: "/ensaios" },
  { label: "Contato", href: "#contato" },
];

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bx-900 shadow-[0_2px_16px_rgba(0,0,0,0.2)]">
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] h-[58px] flex items-center gap-5">
        {/* Mobile toggle */}
        <button
          className="lg:hidden text-gd-300 hover:text-gd-500 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        <a href="#" className="flex-1 flex justify-center lg:justify-start items-center gap-3.5 group">
          <LogoMark size={40} />
          <span className="font-display text-[0.82rem] font-bold tracking-[0.18em] uppercase text-gd-300 leading-none whitespace-nowrap">
            The Classical Way
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-display text-[0.5rem] tracking-[0.14em] uppercase text-white/50 px-3.5 py-2.5 transition-colors duration-200 hover:text-gd-500"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="w-[34px] h-[34px] flex items-center justify-center text-white/55 hover:text-gd-500 transition-colors" aria-label="Buscar">
            <Search size={17} />
          </button>
          <a
            href="#contato"
            className="hidden sm:block font-display text-[0.5rem] tracking-[0.16em] uppercase bg-gd-700 text-white px-3.5 py-[7px] hover:bg-gd-600 transition-colors"
          >
            Apoiar
          </a>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden bg-bx-800 border-t border-white/5 py-4 px-[clamp(16px,4vw,48px)]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block font-display text-[0.56rem] tracking-[0.14em] uppercase text-white/50 py-2.5 hover:text-gd-500 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
