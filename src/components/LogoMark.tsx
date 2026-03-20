const LogoMark = ({ className = "", size = 44 }: { className?: string; size?: number }) => (
  <svg viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size} className={className}>
    <circle cx="52" cy="52" r="50" stroke="#DEB86A" strokeWidth="2.2" />
    <circle cx="52" cy="52" r="43" stroke="#DEB86A" strokeWidth="0.6" opacity="0.4" />
    <line x1="52" y1="52" x2="52" y2="14" stroke="#DEB86A" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="52" y1="52" x2="52" y2="90" stroke="#DEB86A" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="52" y1="52" x2="90" y2="52" stroke="#DEB86A" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="52" y1="52" x2="14" y2="52" stroke="#DEB86A" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="52" y1="52" x2="28" y2="28" stroke="#DEB86A" strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="52" y1="52" x2="76" y2="28" stroke="#DEB86A" strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="52" y1="52" x2="28" y2="76" stroke="#DEB86A" strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <line x1="52" y1="52" x2="76" y2="76" stroke="#DEB86A" strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
    <circle cx="52" cy="52" r="7" fill="#DEB86A" />
    <line x1="52" y1="43" x2="52" y2="61" stroke="#3A0E1C" strokeWidth="1.8" />
    <line x1="43" y1="52" x2="61" y2="52" stroke="#3A0E1C" strokeWidth="1.8" />
  </svg>
);

export default LogoMark;
