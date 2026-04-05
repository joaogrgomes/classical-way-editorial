import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Artigos", href: "/artigos" },
  { label: "Podcasts", href: "/podcasts" },
  { label: "Ensaios", href: "/ensaios" },
  { label: "Contato", href: "#contato" },
];

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
            item.href.startsWith("/") ? (
              <Link
                key={item.label}
                to={item.href}
                className="font-display text-[0.5rem] tracking-[0.14em] uppercase text-bx-700 px-3.5 py-2.5 transition-colors duration-200 hover:text-gd-500"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="font-display text-[0.5rem] tracking-[0.14em] uppercase text-bx-700 px-3.5 py-2.5 transition-colors duration-200 hover:text-gd-500"
              >
                {item.label}
              </a>
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
            item.href.startsWith("/") ? (
              <Link
                key={item.label}
                to={item.href}
                className="block font-display text-[0.56rem] tracking-[0.14em] uppercase text-bx-700 py-2.5 hover:text-gd-500 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="block font-display text-[0.56rem] tracking-[0.14em] uppercase text-bx-700 py-2.5 hover:text-gd-500 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
