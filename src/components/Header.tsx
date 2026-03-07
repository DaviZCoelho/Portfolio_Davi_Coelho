'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const menuItems = [
    { label: 'HOME', href: '#home' },
    { label: 'SOBRE MIM', href: '#sobre mim' },
    { label: 'EXPERIÊNCIAS', href: '#experiencias' },
    { label: 'PROJETOS', href: '#projetos' },
    { label: 'CONTATO', href: '#contato' },
  ];

  return (
    <header className={`header ${isMobile ? 'header-mobile' : ''}`}>
      {isMobile && (
        <button
          className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      )}
      <nav className={`nav-bar ${isMobile ? (menuOpen ? 'mobile-open' : 'mobile-closed') : ''}`}>
        <ul>
          {menuItems.map((item, index) => (
            <li key={item.label}>
              <a href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
              {index < menuItems.length - 1 && <span className="separator">•</span>}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
