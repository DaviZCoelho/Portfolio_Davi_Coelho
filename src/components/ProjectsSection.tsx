'use client';

import { useEffect, useRef } from 'react';
import rough from 'roughjs';

/* ── Rough.js doodle helpers ── */

interface DoodleProps { className?: string }

function DoodleChart({ className }: DoodleProps) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const rc = rough.svg(ref.current);
    const o = { stroke: '#2d2d2d', strokeWidth: 1.5, roughness: 1.6, bowing: 1.2 };
    const f = (c: string) => ({ ...o, fill: c, fillStyle: 'hachure' as const, hachureGap: 4 });
    // axes
    ref.current.appendChild(rc.line(8, 52, 8, 6, o));
    ref.current.appendChild(rc.line(8, 52, 58, 52, o));
    // bars
    ref.current.appendChild(rc.rectangle(14, 36, 9, 16, f('rgba(74,144,217,0.25)')));
    ref.current.appendChild(rc.rectangle(26, 24, 9, 28, f('rgba(100,200,100,0.25)')));
    ref.current.appendChild(rc.rectangle(38, 14, 9, 38, f('rgba(230,160,60,0.25)')));
    // trend line
    ref.current.appendChild(rc.line(18, 34, 30, 22, { ...o, stroke: '#d44', strokeWidth: 1.5 }));
    ref.current.appendChild(rc.line(30, 22, 42, 12, { ...o, stroke: '#d44', strokeWidth: 1.5 }));
  }, []);
  return <svg ref={ref} className={className} width={62} height={58} viewBox="0 0 62 58" />;
}

function DoodleBulb({ className }: DoodleProps) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const rc = rough.svg(ref.current);
    const o = { stroke: '#2d2d2d', strokeWidth: 1.5, roughness: 1.6, bowing: 1.2 };
    const f = { ...o, fill: 'rgba(255,230,80,0.3)', fillStyle: 'hachure' as const, hachureGap: 4 };
    ref.current.appendChild(rc.path('M20,6 Q6,6 6,20 Q6,30 15,33 L15,40 L27,40 L27,33 Q36,30 36,20 Q36,6 22,6 Z', f));
    ref.current.appendChild(rc.line(15, 40, 27, 40, o));
    ref.current.appendChild(rc.line(16, 43, 26, 43, o));
    ref.current.appendChild(rc.line(17, 46, 25, 46, o));
    ref.current.appendChild(rc.path('M19,24 Q21,17 23,24', { ...o, strokeWidth: 1 }));
    // rays
    ref.current.appendChild(rc.line(21, 2, 21, 0, { ...o, strokeWidth: 1 }));
    ref.current.appendChild(rc.line(4, 12, 1, 10, { ...o, strokeWidth: 1 }));
    ref.current.appendChild(rc.line(38, 12, 41, 10, { ...o, strokeWidth: 1 }));
  }, []);
  return <svg ref={ref} className={className} width={44} height={50} viewBox="0 0 44 50" />;
}

function DoodleSmile({ className }: DoodleProps) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const rc = rough.svg(ref.current);
    const o = { stroke: '#2d2d2d', strokeWidth: 1.5, roughness: 1.8, bowing: 1.3 };
    ref.current.appendChild(rc.circle(24, 24, 42, { ...o, fill: 'rgba(255,230,120,0.2)', fillStyle: 'hachure' as const, hachureGap: 5 }));
    // eyes
    ref.current.appendChild(rc.circle(16, 20, 4, { ...o, fill: '#2d2d2d', fillStyle: 'solid' }));
    ref.current.appendChild(rc.circle(32, 20, 4, { ...o, fill: '#2d2d2d', fillStyle: 'solid' }));
    // smile
    ref.current.appendChild(rc.path('M14,30 Q24,40 34,30', o));
  }, []);
  return <svg ref={ref} className={className} width={48} height={48} viewBox="0 0 48 48" />;
}

function DoodleCloud({ className }: DoodleProps) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const rc = rough.svg(ref.current);
    const o = { stroke: '#2d2d2d', strokeWidth: 1.5, roughness: 1.8, bowing: 1.5 };
    const f = { ...o, fill: 'rgba(180,210,240,0.25)', fillStyle: 'hachure' as const, hachureGap: 5 };
    ref.current.appendChild(rc.path('M16,36 Q4,36 4,26 Q4,16 14,14 Q16,4 30,4 Q44,4 46,14 Q56,10 62,18 Q70,18 68,28 Q70,38 60,38 Z', f));
    // rain drops
    ref.current.appendChild(rc.line(20, 40, 18, 48, { ...o, strokeWidth: 1 }));
    ref.current.appendChild(rc.line(34, 42, 32, 50, { ...o, strokeWidth: 1 }));
    ref.current.appendChild(rc.line(48, 40, 46, 48, { ...o, strokeWidth: 1 }));
  }, []);
  return <svg ref={ref} className={className} width={72} height={52} viewBox="0 0 72 52" />;
}

function DoodleCode({ className }: DoodleProps) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const rc = rough.svg(ref.current);
    const o = { stroke: '#2d2d2d', strokeWidth: 2, roughness: 1.5, bowing: 1.2 };
    // < >
    ref.current.appendChild(rc.line(16, 6, 4, 20, o));
    ref.current.appendChild(rc.line(4, 20, 16, 34, o));
    ref.current.appendChild(rc.line(36, 6, 48, 20, o));
    ref.current.appendChild(rc.line(48, 20, 36, 34, o));
    // /
    ref.current.appendChild(rc.line(30, 4, 22, 36, { ...o, stroke: '#4a90d9' }));
  }, []);
  return <svg ref={ref} className={className} width={52} height={40} viewBox="0 0 52 40" />;
}

function SketchTitleUnderline() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const rc = rough.svg(ref.current);
    ref.current.appendChild(rc.line(0, 4, 160, 4, { stroke: '#2d2d2d', strokeWidth: 2.5, roughness: 2, bowing: 2 }));
  }, []);
  return <svg ref={ref} width={160} height={8} viewBox="0 0 160 8" className="proj-title-underline" />;
}

/* ── GitHub icon (simple SVG, no rough needed) ── */
function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: 6, flexShrink: 0 }}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6, flexShrink: 0 }}>
      <path d="M11 8v3.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 011 11.5v-7A1.5 1.5 0 012.5 3H6M9 1h4v4M5.5 8.5L13 1" />
    </svg>
  );
}

/* ── Project data ── */

interface Project {
  title: string;
  description: string;
  tech: string[];
  demo: string | null;
  demoLabel?: string;
  github: string | null;
  rotation: number;
  tapeColor: string;
  Doodle: React.FC<DoodleProps>;
}

const projects: Project[] = [
  {
    title: 'Dashboard de Vendas',
    description: 'Meu primeiro grande desafio prático com Next.js e Supabase. Um CRM completo com gráficos dinâmicos e isolamento de dados. É onde aprendi a lidar com segurança e fluxos de dados reais.',
    tech: ['Next.js', 'TypeScript', 'Supabase'],
    demo: 'https://dashboardgestaocomercial.vercel.app/login',
    github: 'https://github.com/DaviZCoelho/Dashboard_Gestao_Comercial',
    rotation: -1.2,
    tapeColor: 'rgba(230,180,100,0.55)',
    Doodle: DoodleChart,
  },
  {
    title: 'Gerador de Thumbnail com IA',
    description: 'Onde a nuvem e a IA se encontram. Uma aplicação serverless que usa AWS Lambda e Docker para processar imagens e remover fundos automaticamente. Infraestrutura pura!',
    tech: ['React', 'AWS Lambda', 'Python', 'Docker'],
    demo: 'https://gerador-de-thumbnail.vercel.app/',
    github: 'https://github.com/DaviZCoelho/Gerador_De_Thumbnail',
    rotation: 0.8,
    tapeColor: 'rgba(180,210,230,0.55)',
    Doodle: DoodleBulb,
  },
  {
    title: 'Gerenciador de Desculpas',
    description: 'Um projeto satírico (mas tecnicamente sério!) para ajudar na tomada de decisões corporativas. Tem sistema de score, logs e persistência local. Porque até para dar desculpa precisa de lógica.',
    tech: ['JavaScript', 'LocalStorage'],
    demo: 'https://davizcoelho.github.io/Gerenciador-de-desculpas/',
    github: 'https://github.com/DaviZCoelho/Gerenciador-de-desculpas',
    rotation: -0.6,
    tapeColor: 'rgba(220,160,180,0.55)',
    Doodle: DoodleSmile,
  },
  {
    title: 'Consulta de Clima Real-Time',
    description: 'Consumindo a API do OpenWeatherMap com um backend em FastAPI. Essencial para decidir se devo usar o guarda-chuva ou não.',
    tech: ['Python', 'FastAPI', 'JavaScript'],
    demo: 'https://api-clima-ld21.vercel.app/',
    github: 'https://github.com/DaviZCoelho/API_Clima',
    rotation: 1,
    tapeColor: 'rgba(160,200,220,0.55)',
    Doodle: DoodleCloud,
  },
  {
    title: 'Portfólio Pessoal (Este site!)',
    description: 'Meu laboratório de design e código, focado em uma navegação dinâmica e nessa estética de caderno de rascunhos que você está vendo agora.',
    tech: ['Next.js', 'TypeScript', 'Rough.js'],
    demo: null,
    demoLabel: 'Você já está aqui!',
    github: 'https://github.com/DaviZCoelho/Portfolio_Davi_Coelho',
    rotation: -0.9,
    tapeColor: 'rgba(200,220,160,0.6)',
    Doodle: DoodleCode,
  },
];

/* ── Main Component ── */

export default function ProjectsSection() {
  return (
    <section className="projects-section" id="projetos">
      {/* Title */}
      <div className="proj-title-wrapper">
        <h2 className="proj-title">Projetos</h2>
        <SketchTitleUnderline />
      </div>

      {/* Grid */}
      <div className="proj-grid">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { title, description, tech, demo, demoLabel, github, rotation, tapeColor, Doodle } = project;

  return (
    <div
      className="proj-card"
      style={{ '--card-rotation': `${rotation}deg`, '--tape-color': tapeColor } as React.CSSProperties}
    >
      {/* Tape */}
      <div className="proj-tape" />

      {/* Doodle */}
      <div className="proj-doodle-wrapper">
        <Doodle className="proj-doodle" />
      </div>

      {/* Content */}
      <h3 className="proj-card-title">{title}</h3>
      <p className="proj-card-desc">{description}</p>

      {/* Tech tags */}
      <div className="proj-tech-row">
        {tech.map((t) => (
          <span key={t} className="proj-tech-tag">{t}</span>
        ))}
      </div>

      {/* Buttons */}
      <div className="proj-buttons">
        {github ? (
          <a href={github} target="_blank" rel="noopener noreferrer" className="proj-btn proj-btn-gh">
            <GitHubIcon /> GitHub
          </a>
        ) : (
          <span className="proj-btn proj-btn-gh proj-btn-disabled">
            <GitHubIcon /> Em breve
          </span>
        )}

        {demo ? (
          <a href={demo} target="_blank" rel="noopener noreferrer" className="proj-btn proj-btn-demo">
            <ExternalLinkIcon /> Live Demo
          </a>
        ) : (
          <span className="proj-btn proj-btn-demo proj-btn-here">
            <ExternalLinkIcon /> {demoLabel || 'Demo'}
          </span>
        )}
      </div>
    </div>
  );
}
