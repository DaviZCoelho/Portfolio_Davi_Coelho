'use client';

import { useEffect, useRef } from 'react';
import rough from 'roughjs';

/* ── Rough.js doodle helpers ── */

interface DoodleProps { className?: string }

function DoodleEnvelope({ className }: DoodleProps) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const rc = rough.svg(ref.current);
    const o = { stroke: '#2d2d2d', strokeWidth: 1.5, roughness: 1.6, bowing: 1.3 };
    const f = { ...o, fill: 'rgba(240,230,210,0.35)', fillStyle: 'hachure' as const, hachureGap: 5 };
    // body
    ref.current.appendChild(rc.rectangle(4, 12, 52, 34, f));
    // flap (V shape)
    ref.current.appendChild(rc.line(4, 12, 30, 32, o));
    ref.current.appendChild(rc.line(56, 12, 30, 32, o));
    // bottom corners to center
    ref.current.appendChild(rc.line(4, 46, 18, 30, { ...o, strokeWidth: 1 }));
    ref.current.appendChild(rc.line(56, 46, 42, 30, { ...o, strokeWidth: 1 }));
  }, []);
  return <svg ref={ref} className={className} width={60} height={56} viewBox="0 0 60 56" />;
}

function DoodleLinkedIn({ className }: DoodleProps) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const rc = rough.svg(ref.current);
    const o = { stroke: '#2d2d2d', strokeWidth: 1.5, roughness: 1.8, bowing: 1.5 };
    const f = { ...o, fill: 'rgba(0,119,181,0.15)', fillStyle: 'hachure' as const, hachureGap: 4 };
    // crooked square
    ref.current.appendChild(rc.rectangle(4, 4, 44, 44, f));
    // "in" text drawn by hand
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '14');
    text.setAttribute('y', '38');
    text.setAttribute('font-family', 'Shadows Into Light, cursive');
    text.setAttribute('font-size', '28');
    text.setAttribute('fill', '#0077b5');
    text.setAttribute('font-weight', 'bold');
    text.textContent = 'in';
    ref.current.appendChild(text);
  }, []);
  return <svg ref={ref} className={className} width={52} height={52} viewBox="0 0 52 52" />;
}

function GitHubLogo({ className }: DoodleProps) {
  return (
    <svg className={className} width={48} height={48} viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        fill="#2d2d2d"
      />
    </svg>
  );
}

function DoodlePaperclip({ className }: DoodleProps) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const rc = rough.svg(ref.current);
    const o = { stroke: '#888', strokeWidth: 1.8, roughness: 1.4, bowing: 1 };
    ref.current.appendChild(rc.path(
      'M18,4 Q8,4 8,14 L8,50 Q8,60 18,60 Q28,60 28,50 L28,18 Q28,12 22,12 Q16,12 16,18 L16,44',
      o
    ));
  }, []);
  return <svg ref={ref} className={className} width={36} height={64} viewBox="0 0 36 64" />;
}

function DoodlePaperPlane({ className }: DoodleProps) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const rc = rough.svg(ref.current);
    const o = { stroke: '#2d2d2d', strokeWidth: 1.5, roughness: 1.4, bowing: 1 };
    const f = { ...o, fill: 'rgba(200,210,240,0.2)', fillStyle: 'hachure' as const, hachureGap: 5 };
    // Main body triangle
    ref.current.appendChild(rc.polygon([[4, 28], [56, 6], [32, 40]], f));
    // Wing fold line
    ref.current.appendChild(rc.line(4, 28, 56, 6, { ...o, strokeWidth: 1.2 }));
    ref.current.appendChild(rc.line(56, 6, 32, 40, { ...o, strokeWidth: 1.2 }));
    // Inner fold
    ref.current.appendChild(rc.line(4, 28, 38, 22, { ...o, strokeWidth: 1 }));
    ref.current.appendChild(rc.line(38, 22, 32, 40, { ...o, strokeWidth: 1 }));
    // Trail dashes
    ref.current.appendChild(rc.line(8, 36, 16, 42, { ...o, strokeWidth: 0.8, stroke: '#999' }));
    ref.current.appendChild(rc.line(2, 40, 8, 44, { ...o, strokeWidth: 0.8, stroke: '#999' }));
    ref.current.appendChild(rc.line(14, 46, 20, 48, { ...o, strokeWidth: 0.8, stroke: '#999' }));
  }, []);
  return <svg ref={ref} className={className} width={60} height={52} viewBox="0 0 60 52" />;
}

function SketchContactUnderline() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const rc = rough.svg(ref.current);
    ref.current.appendChild(rc.line(0, 4, 150, 4, { stroke: '#2d2d2d', strokeWidth: 2.5, roughness: 2, bowing: 2 }));
  }, []);
  return <svg ref={ref} width={150} height={8} viewBox="0 0 150 8" className="contact-title-underline" />;
}

/* ── Contact links data ── */
const contactLinks = [
  {
    label: 'davi.a.coelho@gmail.com',
    href: 'mailto:davi.a.coelho@gmail.com',
    Doodle: DoodleEnvelope,
  },
  {
    label: 'linkedin.com/in/davi-alessandro-coelho',
    href: 'https://www.linkedin.com/in/davi-alessandro-coelho-a753a73a7/',
    Doodle: DoodleLinkedIn,
  },
  {
    label: 'github.com/DaviZCoelho',
    href: 'https://github.com/DaviZCoelho',
    Doodle: GitHubLogo,
  },
];

/* ── Main Component ── */

export default function ContactSection() {
  return (
    <section className="contact-section" id="contato">
      {/* Title */}
      <div className="contact-title-wrapper">
        <h2 className="contact-title">Contato</h2>
        <SketchContactUnderline />
      </div>

      <div className="contact-layout">
        {/* Decorative doodles around */}
        <DoodlePaperclip className="contact-deco contact-deco-clip" />
        <DoodlePaperPlane className="contact-deco contact-deco-coffee" />

        {/* The "note" card */}
        <div className="contact-note">
          {/* Tape */}
          <div className="contact-tape" />

          {/* Header text */}
          <p className="contact-header-text">Bora trocar uma ideia? Me encontre por aqui:</p>

          {/* Links */}
          <ul className="contact-links">
            {contactLinks.map((link) => (
              <li key={link.href} className="contact-link-item">
                <span className="contact-link-doodle">
                  <link.Doodle />
                </span>
                <a
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="contact-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
