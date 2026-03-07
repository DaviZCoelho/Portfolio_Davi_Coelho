import Header from '@/components/Header';
import StickFigure from '@/components/StickFigure';
import DecorativeIcons from '@/components/DecorativeIcons';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import DrawingCanvas from '@/components/DrawingCanvas';

export default function Home() {
  return (
    <>
      <Header />
      <DrawingCanvas />
      
      <main className="main-content">
        <section className="home-section" id="home">
          {/* Ícones decorativos espalhados - apenas na Home */}
          <DecorativeIcons />

          {/* Stick Figure com a foto */}
          <StickFigure />

          {/* Texto de apresentação */}
          <div className="hero-text">
            <h1 className="greeting">
              OLÁ! <span className="wave-emoji">👋</span>
            </h1>
            <h2 className="greeting" style={{ marginTop: '-0.5rem' }}>
              EU SOU O DAVI
            </h2>
            <p className="title">DESENVOLVEDOR FULL STACK</p>
          </div>
        </section>

        <div className="section-divider" />

        {/* Seção Sobre Mim */}
        <AboutSection />

        <div className="section-divider" />

        {/* Seção de Experiências */}
        <ExperienceSection />

        <div className="section-divider" />

        {/* Seção de Projetos */}
        <ProjectsSection />

        <div className="section-divider" />

        {/* Seção de Contato */}
        <ContactSection />
      </main>

      <footer className="site-footer">
        <p className="footer-text">Desenvolvido por Davi Coelho — 2026</p>
      </footer>
    </>
  );
}
