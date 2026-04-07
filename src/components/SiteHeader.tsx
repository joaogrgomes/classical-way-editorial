import { useState } from "react";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    label: "Artigos",
    children: [
      { label: "Sala de Aula", href: "/artigos?cat=sala-de-aula" },
      { label: "Família", href: "/artigos?cat=familia" },
      { label: "Trivium", href: "/artigos?cat=trivium" },
      { label: "Quadrivium", href: "/artigos?cat=quadrivium" },
      { label: "Arte & Cultura", href: "/artigos?cat=arte-cultura" },
      { label: "Teologia & Pedagogia", href: "/artigos?cat=teologia-pedagogia" },
      { label: "Negócios & Marketing", href: "/artigos?cat=negocios-marketing" },
      { label: "Gestão", href: "/artigos?cat=gestao" },
    ],
  },
  {
    label: "Colunas",
    children: [
      { label: "Colunista 1", href: "/colunas/colunista-1" },
      { label: "Colunista 2", href: "/colunas/colunista-2" },
      { label: "Colunista 3", href: "/colunas/colunista-3" },
      { label: "Indicações", href: "/colunas/indicacoes" },
    ],
  },
  { label: "Resenhas", href: "/resenhas" },
  { label: "Recursos", href: "/recursos" },
  { label: "Podcasts", href: "/podcasts" },
  { label: "Eventos", href: "#eventos" },
  { label: "Sobre", href: "/sobre" },
];

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const linkClass =
    "font-display text-[0.5rem] tracking-[0.14em] uppercase text-bx-700 px-3.5 py-2.5 transition-colors duration-200 hover:text-gd-500";

  const renderLink = (href: string, label: string, className: string, onClick?: () => void) =>
    href.startsWith("/") ? (
      <Link to={href} className={className} onClick={onClick}>
        {label}
      </Link>
    ) : (
      <a href={href} className={className} onClick={onClick}>
        {label}
      </a>
    );

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-gy-100 shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
      <div className="max-w-[1120px] mx-auto px-[clamp(16px,4vw,48px)] h-[58px] flex items-center gap-5">
        {/* Mobile toggle */}
        <button
          className="lg:hidden text-bx-700 hover:text-gd-500 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex-1 flex justify-center lg:justify-start items-center gap-3.5 group">
          <svg width="36" height="36" viewBox="0 0 132 132" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M66.1538 112.308C91.6439 112.308 112.308 91.6439 112.308 66.1538C112.308 40.6638 91.6439 20 66.1538 20C40.6638 20 20 40.6638 20 66.1538C20 91.6439 40.6638 112.308 66.1538 112.308Z" stroke="#5B0C19" strokeWidth="1.47692"/>
            <path opacity="0.4" d="M66.1537 105.846C88.0752 105.846 105.846 88.0752 105.846 66.1537C105.846 44.2323 88.0752 26.4614 66.1537 26.4614C44.2323 26.4614 26.4614 44.2323 26.4614 66.1537C26.4614 88.0752 44.2323 105.846 66.1537 105.846Z" stroke="#5B0C19" strokeWidth="0.3"/>
            <path d="M66 66.0769V31" stroke="#5B0C19" strokeLinecap="round"/>
            <path d="M66 66V101.077" stroke="#5B0C19" strokeLinecap="round"/>
            <path d="M66 66H101.077" stroke="#5B0C19" strokeLinecap="round"/>
            <path d="M66.0769 66H31" stroke="#5B0C19" strokeLinecap="round"/>
            <path d="M66 71C68.7614 71 71 68.7614 71 66C71 63.2386 68.7614 61 66 61C63.2386 61 61 63.2386 61 66C61 68.7614 63.2386 71 66 71Z" fill="#B8963E"/>
            <path d="M66 59V76" stroke="#FDFBF8"/>
            <path d="M59 66H74" stroke="#FDFBF8"/>
          </svg>
          <span className="font-display text-[0.82rem] font-bold tracking-[0.18em] uppercase text-bx-900 leading-none whitespace-nowrap">
            The Classical Way
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0" aria-label="Navegação principal">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className={`${linkClass} flex items-center gap-1`}>
                  {item.label}
                  <ChevronDown size={10} className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-background border border-gy-100 shadow-[0_8px_24px_rgba(0,0,0,0.08)] py-1 min-w-[180px] z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="font-display text-[0.48rem] tracking-[0.14em] uppercase text-bx-700 px-5 py-2.5 hover:bg-surface-warm hover:text-bx-900 block whitespace-nowrap transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              renderLink(item.href!, item.label, linkClass, undefined)
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="w-[34px] h-[34px] flex items-center justify-center text-bx-700 hover:text-gd-500 transition-colors" aria-label="Buscar">
            <Search size={17} />
          </button>
          <Link
            to="/apoiar"
            className="hidden sm:block font-display text-[0.5rem] tracking-[0.16em] uppercase bg-gd-700 text-white px-3.5 py-[7px] hover:bg-gd-600 transition-colors"
          >
            Apoiar
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden bg-gy-100 border-t border-bx-900/10 py-4 px-[clamp(16px,4vw,48px)]">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className="w-full flex items-center justify-between font-display text-[0.56rem] tracking-[0.14em] uppercase text-bx-700 py-2.5 hover:text-gd-500 transition-colors"
                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown size={12} className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                </button>
                {mobileExpanded === item.label && (
                  <div className="pl-4 pb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block font-display text-[0.5rem] tracking-[0.14em] uppercase text-gy-500 py-2 hover:text-bx-700 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div key={item.label}>
                {renderLink(
                  item.href!,
                  item.label,
                  "block font-display text-[0.56rem] tracking-[0.14em] uppercase text-bx-700 py-2.5 hover:text-gd-500 transition-colors",
                  () => setMobileOpen(false)
                )}
              </div>
            )
          )}
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
