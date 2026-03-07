'use client';

import { useEffect, useRef } from 'react';
import rough from 'roughjs';

/* ── Rough.js Doodle helpers ── */

function SketchGradCap({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = '';
    const rc = rough.svg(svgRef.current);
    const o = { stroke: '#2d2d2d', strokeWidth: 1.5, roughness: 1.6, bowing: 1.3 };
    const f = { ...o, fill: 'rgba(60, 60, 60, 0.12)', fillStyle: 'hachure' as const, hachureGap: 4 };
    // top diamond
    svgRef.current.appendChild(rc.polygon([[30, 4], [58, 18], [30, 30], [2, 18]], f));
    // base box
    svgRef.current.appendChild(rc.polygon([[12, 20], [48, 20], [44, 34], [16, 34]], f));
    // tassel line
    svgRef.current.appendChild(rc.line(50, 18, 56, 32, o));
    // tassel ball
    svgRef.current.appendChild(rc.circle(56, 34, 5, { ...o, fill: '#2d2d2d', fillStyle: 'solid' }));
  }, []);

  return <svg ref={svgRef} className={className} width={60} height={42} viewBox="0 0 60 42" />;
}

function SketchLightbulb({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = '';
    const rc = rough.svg(svgRef.current);
    const o = { stroke: '#2d2d2d', strokeWidth: 1.5, roughness: 1.6, bowing: 1.2 };
    const f = { ...o, fill: 'rgba(255, 230, 80, 0.25)', fillStyle: 'hachure' as const, hachureGap: 4 };
    // bulb
    svgRef.current.appendChild(rc.path('M22,8 Q8,8 8,24 Q8,34 18,38 L18,46 L32,46 L32,38 Q42,34 42,24 Q42,8 28,8 Z', f));
    // base lines
    svgRef.current.appendChild(rc.line(18, 46, 32, 46, o));
    svgRef.current.appendChild(rc.line(19, 49, 31, 49, o));
    svgRef.current.appendChild(rc.line(20, 52, 30, 52, o));
    // filament
    svgRef.current.appendChild(rc.path('M22,28 Q25,20 28,28', { ...o, strokeWidth: 1 }));
    // rays
    svgRef.current.appendChild(rc.line(25, 3, 25, 0, { ...o, strokeWidth: 1 }));
    svgRef.current.appendChild(rc.line(6, 14, 2, 12, { ...o, strokeWidth: 1 }));
    svgRef.current.appendChild(rc.line(44, 14, 48, 12, { ...o, strokeWidth: 1 }));
    svgRef.current.appendChild(rc.line(8, 28, 3, 30, { ...o, strokeWidth: 1 }));
    svgRef.current.appendChild(rc.line(42, 28, 47, 30, { ...o, strokeWidth: 1 }));
  }, []);

  return <svg ref={svgRef} className={className} width={50} height={56} viewBox="0 0 50 56" />;
}

function SketchChecklist({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = '';
    const rc = rough.svg(svgRef.current);
    const o = { stroke: '#2d2d2d', strokeWidth: 1.5, roughness: 1.5, bowing: 1.2 };
    // paper
    svgRef.current.appendChild(rc.rectangle(4, 2, 48, 62, {
      ...o,
      fill: 'rgba(255, 255, 240, 0.4)',
      fillStyle: 'solid' as const,
    }));
    // check marks + lines (3 items)
    const rows = [14, 30, 46];
    rows.forEach((y, i) => {
      // checkbox
      svgRef.current!.appendChild(rc.rectangle(10, y - 5, 10, 10, o));
      // check mark (first two checked)
      if (i < 2) {
        svgRef.current!.appendChild(rc.line(12, y, 15, y + 3, { ...o, stroke: '#4a9', strokeWidth: 2 }));
        svgRef.current!.appendChild(rc.line(15, y + 3, 20, y - 4, { ...o, stroke: '#4a9', strokeWidth: 2 }));
      }
      // text line
      svgRef.current!.appendChild(rc.line(25, y, 46, y, o));
    });
  }, []);

  return <svg ref={svgRef} className={className} width={56} height={66} viewBox="0 0 56 66" />;
}

function SketchInfinity({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = '';
    const rc = rough.svg(svgRef.current);
    const o = { stroke: '#2d2d2d', strokeWidth: 2, roughness: 2, bowing: 1.8 };
    svgRef.current.appendChild(rc.path(
      'M35,20 C20,4 2,12 6,22 C10,32 24,32 35,20 C46,8 60,8 64,18 C68,28 52,36 35,20',
      o
    ));
  }, []);

  return <svg ref={svgRef} className={className} width={70} height={40} viewBox="0 0 70 40" />;
}

function SketchUnderlineAbout() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = '';
    const rc = rough.svg(svgRef.current);
    svgRef.current.appendChild(
      rc.line(0, 4, 180, 4, { stroke: '#2d2d2d', strokeWidth: 2.5, roughness: 2, bowing: 2 })
    );
  }, []);

  return <svg ref={svgRef} width={180} height={8} viewBox="0 0 180 8" className="about-title-underline" />;
}

function SketchRedUnderline({ width = 120 }: { width?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = '';
    const rc = rough.svg(svgRef.current);
    svgRef.current.appendChild(
      rc.line(0, 4, width, 4, { stroke: 'rgba(220, 80, 80, 0.6)', strokeWidth: 2.5, roughness: 2, bowing: 1.5 })
    );
  }, [width]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={8}
      viewBox={`0 0 ${width} 8`}
      style={{ display: 'block', marginTop: '-10px', pointerEvents: 'none' }}
    />
  );
}

function SketchWaveUnderline({ width = 120, className }: { width?: number; className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = '';
    const rc = rough.svg(svgRef.current);
    svgRef.current.appendChild(
      rc.path(`M0,6 Q${width * 0.15},0 ${width * 0.3},6 Q${width * 0.45},12 ${width * 0.6},6 Q${width * 0.75},0 ${width},6`, {
        stroke: 'rgba(74, 144, 217, 0.55)',
        strokeWidth: 2,
        roughness: 1.5,
        bowing: 1,
      })
    );
  }, [width]);

  return <svg ref={svgRef} className={className} width={width} height={14} viewBox={`0 0 ${width} 14`} style={{ display: 'block', marginTop: '-2px' }} />;
}

/* ── Main Component ── */

export default function AboutSection() {
  return (
    <section className="about-section" id="sobre mim">
      {/* Title */}
      <div className="about-title-wrapper">
        <h2 className="about-title">Sobre Mim</h2>
        <SketchUnderlineAbout />
      </div>

      <div className="about-layout">
        {/* Left doodle column */}
        <div className="about-doodles-left">
          <SketchGradCap className="about-doodle about-doodle-cap" />
          <SketchLightbulb className="about-doodle about-doodle-bulb" />
        </div>

        {/* Notebook page with text */}
        <div className="about-card">
          {/* Tape */}
          <div className="about-tape" />

          {/* First paragraph */}
          <p className="about-text">
            <span className="about-red-underlined">
              Desenvolvedor Full Stack
              <SketchRedUnderline width={220} />
            </span>{' '}
            e estudante de Licenciatura em Computação na{' '}
            <span className="about-highlighted">UFPR</span>{' '}
            <span className="about-period">(7º período)</span>. Minha trajetória é movida pela{' '}
            <span className="about-underlined">
              curiosidade
              <SketchWaveUnderline width={110} className="about-wave-line" />
            </span>{' '}
            de entender como a tecnologia impacta as pessoas e como construir soluções que realmente resolvam problemas.
          </p>

          {/* Second paragraph */}
          <p className="about-text">
            Atuo em projetos de{' '}
            <span className="about-highlighted">pesquisa e extensão</span>{' '}
            na área de{' '}
            <span className="about-underlined">
              Pensamento Computacional
              <SketchWaveUnderline width={235} className="about-wave-line" />
            </span>
            , unindo a base teórica da educação com a prática da engenharia de software. Atualmente, foco meu aprendizado em tecnologias como{' '}
            <span className="about-highlighted">React</span>,{' '}
            <span className="about-highlighted">Next.js</span> e{' '}
            <span className="about-highlighted">Python</span>, além de estar mergulhado no mundo da{' '}
            <span className="about-red-underlined">
              infraestrutura em nuvem (AWS)
              <SketchRedUnderline width={280} />
            </span>.
          </p>
        </div>

        {/* Right doodle column */}
        <div className="about-doodles-right">
          <SketchChecklist className="about-doodle about-doodle-checklist" />
          <SketchInfinity className="about-doodle about-doodle-infinity" />
        </div>
      </div>
    </section>
  );
}
