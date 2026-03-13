export default function Header() {
  const menuItems = [
    { label: 'HOME', href: '#home' },
    { label: 'SOBRE MIM', href: '#sobre mim' },
    { label: 'EXPERIÊNCIAS', href: '#experiencias' },
    { label: 'PROJETOS', href: '#projetos' },
    { label: 'CONTATO', href: '#contato' },
  ];

  return (
    <header className="header">
      <nav className="nav-bar" aria-label="Navegacao principal">
        <ul>
          {menuItems.map((item, index) => (
            <li key={item.label}>
              <a href={item.href}>
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
