'use client';

import { useEffect, useRef } from 'react';
import rough from 'roughjs';

function SketchCloud({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = '';
    const rc = rough.svg(svgRef.current);
    const opts = { stroke: '#2d2d2d', strokeWidth: 1.5, roughness: 1.8, bowing: 1.5 };
    const fillOpts = { ...opts, fill: 'rgba(200, 220, 255, 0.25)', fillStyle: 'hachure' as const, hachureGap: 5 };
    const cloudPath = 'M18,40 Q4,40 4,28 Q4,16 16,14 Q18,3 34,3 Q50,3 52,14 Q64,9 72,18 Q82,18 80,30 Q82,42 70,42 Z';
    svgRef.current.appendChild(rc.path(cloudPath, fillOpts));
    // Small AWS text inside
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '35');
    text.setAttribute('y', '28');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-family', 'Shadows Into Light, cursive');
    text.setAttribute('font-size', '11');
    text.setAttribute('fill', '#555');
    text.textContent = 'AWS';
    svgRef.current.appendChild(text);
  }, []);

  return (
    <svg
      ref={svgRef}
      className={className}
      width={85}
      height={48}
      viewBox="0 0 85 48"
    />
  );
}

function SketchServer({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = '';
    const rc = rough.svg(svgRef.current);
    const opts = { stroke: '#2d2d2d', strokeWidth: 1.5, roughness: 1.6, bowing: 1.2 };
    const fillOpts = { ...opts, fill: 'rgba(100, 100, 100, 0.08)', fillStyle: 'hachure' as const, hachureGap: 4 };
    // Server rack - slightly crooked boxes stacked
    svgRef.current.appendChild(rc.rectangle(8, 5, 44, 16, fillOpts));
    svgRef.current.appendChild(rc.rectangle(6, 23, 46, 16, fillOpts));
    svgRef.current.appendChild(rc.rectangle(9, 41, 43, 16, fillOpts));
    // LEDs / circles
    svgRef.current.appendChild(rc.circle(18, 13, 4, { ...opts, fill: '#6d6', fillStyle: 'solid' }));
    svgRef.current.appendChild(rc.circle(16, 31, 4, { ...opts, fill: '#6d6', fillStyle: 'solid' }));
    svgRef.current.appendChild(rc.circle(19, 49, 4, { ...opts, fill: '#d66', fillStyle: 'solid' }));
    // Lines on each server unit
    svgRef.current.appendChild(rc.line(26, 13, 44, 13, { ...opts, strokeWidth: 1 }));
    svgRef.current.appendChild(rc.line(24, 31, 44, 31, { ...opts, strokeWidth: 1 }));
    svgRef.current.appendChild(rc.line(27, 49, 44, 49, { ...opts, strokeWidth: 1 }));
  }, []);

  return (
    <svg
      ref={svgRef}
      className={className}
      width={60}
      height={62}
      viewBox="0 0 60 62"
    />
  );
}

function SketchLightning({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = '';
    const rc = rough.svg(svgRef.current);
    const opts = { stroke: '#d4a017', strokeWidth: 2, roughness: 1.5, bowing: 1.5 };
    const fillOpts = { ...opts, fill: 'rgba(255, 220, 80, 0.35)', fillStyle: 'hachure' as const, hachureGap: 3 };
    const boltPath = 'M22,2 L8,22 L18,22 L12,42 L34,16 L22,16 Z';
    svgRef.current.appendChild(rc.path(boltPath, fillOpts));
  }, []);

  return (
    <svg
      ref={svgRef}
      className={className}
      width={40}
      height={46}
      viewBox="0 0 40 46"
    />
  );
}

function SketchUnderline() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = '';
    const rc = rough.svg(svgRef.current);
    svgRef.current.appendChild(
      rc.line(0, 4, 200, 4, {
        stroke: '#2d2d2d',
        strokeWidth: 2.5,
        roughness: 2,
        bowing: 2,
      })
    );
  }, []);

  return (
    <svg
      ref={svgRef}
      width={200}
      height={8}
      viewBox="0 0 200 8"
      className="exp-title-underline"
    />
  );
}

const techStack = ['EC2', 'Lambda', 'VPC', 'CloudWatch', 'IAM'];

export default function ExperienceSection() {
  return (
    <section className="experience-section" id="experiencias">
      {/* Section title */}
      <div className="exp-title-wrapper">
        <h2 className="exp-title">Experiências</h2>
        <SketchUnderline />
      </div>

      {/* Experience card - notebook page style */}
      <div className="exp-card">
        {/* Tape on top */}
        <div className="exp-tape" />

        {/* Doodles around the card */}
        <SketchCloud className="exp-doodle exp-doodle-cloud" />
        <SketchServer className="exp-doodle exp-doodle-server" />
        <SketchLightning className="exp-doodle exp-doodle-lightning" />

        {/* Header with company */}
        <div className="exp-header">
          <span className="exp-role">Estagiário em Cloud &amp; Infra</span>
          <span className="exp-company">:upd8</span>
          <span className="exp-period">Atual</span>
        </div>

        {/* Description */}
        <p className="exp-description">
          Atualmente mergulhado em um treinamento intensivo para dominar infraestrutura em nuvem na{' '}
          <span className="exp-highlight">:upd8</span>. No dia a dia, lido com o ecossistema{' '}
          <span className="exp-highlight">AWS</span> (EC2, Lambda, VPC) e aprendo como manter ambientes robustos de pé.
        </p>

        {/* Tech stack as small post-it tags */}
        <div className="exp-tech-stack">
          <span className="exp-tech-label">Stack:</span>
          {techStack.map((tech) => (
            <span key={tech} className="exp-tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
