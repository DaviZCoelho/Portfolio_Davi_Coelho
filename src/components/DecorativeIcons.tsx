'use client';

import { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

interface RoughIconProps {
  className: string;
  width: number;
  height: number;
  draw: (rc: ReturnType<typeof rough.svg>, svg: SVGSVGElement) => void;
  tooltip?: string;
}

function RoughIcon({ className, width, height, draw, tooltip }: RoughIconProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.innerHTML = '';
      const rc = rough.svg(svgRef.current);
      draw(rc, svgRef.current);
    }
  }, [draw]);

  return (
    <div 
      className={`icon-wrapper ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      />
      {tooltip && (
        <div className={`icon-tooltip ${showTooltip ? 'visible' : ''}`}>
          {tooltip}
        </div>
      )}
    </div>
  );
}

export default function DecorativeIcons() {
  const roughOptions = {
    stroke: '#2d2d2d',
    strokeWidth: 1.5,
    roughness: 1.2,
    bowing: 1,
  };

  const fillOptions = {
    ...roughOptions,
    fill: 'rgba(100, 100, 100, 0.1)',
    fillStyle: 'hachure',
    hachureGap: 4,
  };

  return (
    <>
      {/* Livro */}
      <RoughIcon
        className="icon book"
        width={70}
        height={70}
        tooltip="Estudante da UFPR (sobrevivendo aos semestres)"
        draw={(rc, svg) => {
          // Capa traseira
          svg.appendChild(rc.rectangle(12, 8, 45, 54, { ...fillOptions, fill: 'rgba(100, 80, 60, 0.15)' }));
          // Páginas (meio)
          svg.appendChild(rc.rectangle(15, 10, 40, 50, { ...roughOptions, fill: 'rgba(255, 255, 240, 0.5)', fillStyle: 'solid' }));
          // Linhas das páginas na lateral
          svg.appendChild(rc.line(15, 14, 15, 56, { ...roughOptions, strokeWidth: 1 }));
          svg.appendChild(rc.line(17, 12, 17, 58, { ...roughOptions, strokeWidth: 0.8 }));
          // Capa frontal
          svg.appendChild(rc.rectangle(20, 12, 38, 50, { ...fillOptions, fill: 'rgba(70, 100, 150, 0.2)' }));
          // Lombada
          svg.appendChild(rc.line(20, 12, 20, 62, { ...roughOptions, strokeWidth: 2 }));
          // Título na capa
          svg.appendChild(rc.line(28, 25, 50, 25, roughOptions));
          svg.appendChild(rc.line(30, 32, 48, 32, roughOptions));
          // Decoração
          svg.appendChild(rc.rectangle(32, 42, 16, 12, roughOptions));
        }}
      />

      {/* Nuvem */}
      <RoughIcon
        className="icon cloud"
        width={90}
        height={60}
        tooltip="De olho no céu... e em Cloud Computing"
        draw={(rc, svg) => {
          // Corpo da nuvem com curvas
          const cloudPath = 'M20,45 Q5,45 5,32 Q5,20 18,18 Q20,5 38,5 Q55,5 58,18 Q72,12 80,22 Q92,22 90,35 Q92,48 78,48 L20,48 Z';
          svg.appendChild(rc.path(cloudPath, { ...fillOptions, fill: 'rgba(200, 220, 255, 0.3)' }));
          // Detalhes internos
          svg.appendChild(rc.path('M25,32 Q32,26 40,32', roughOptions));
          svg.appendChild(rc.path('M50,30 Q58,24 66,30', roughOptions));
        }}
      />

      {/* Torre de Xadrez */}
      <RoughIcon
        className="icon chess"
        width={55}
        height={70}
        tooltip="Gosto de Xadrez! (mas jogo igual uma capivara)"
        draw={(rc, svg) => {
          // Base
            // Base dupla
            svg.appendChild(rc.rectangle(8, 62, 39, 6, fillOptions));
            svg.appendChild(rc.rectangle(12, 56, 31, 6, fillOptions));
          // Corpo principal
            // Corpo afunilado
            svg.appendChild(rc.polygon([[18,56],[37,56],[33,24],[22,24]], fillOptions));
          // Topo com ameias
            svg.appendChild(rc.polygon([[16,24],[39,24],[35,16],[20,16]], fillOptions));
            // Ameias destacadas
            svg.appendChild(rc.rectangle(16, 8, 5, 8, fillOptions));
            svg.appendChild(rc.rectangle(23, 6, 5, 10, fillOptions));
            svg.appendChild(rc.rectangle(30, 6, 5, 10, fillOptions));
            svg.appendChild(rc.rectangle(37, 8, 5, 8, fillOptions));
            // Linha topo
            svg.appendChild(rc.line(16, 16, 39, 16, roughOptions));
        }}
      />

      {/* Bug/Inseto */}
      <RoughIcon
        className="icon bug"
        width={65}
        height={65}
        tooltip="Caçador de bugs (mas as vezes eu que crio eles)"
        draw={(rc, svg) => {
          // Corpo
          svg.appendChild(rc.ellipse(32, 40, 22, 28, fillOptions));
          // Cabeça
          svg.appendChild(rc.circle(32, 16, 14, fillOptions));
          // Olhos
          svg.appendChild(rc.circle(27, 14, 4, { ...roughOptions, fill: '#333', fillStyle: 'solid' }));
          svg.appendChild(rc.circle(37, 14, 4, { ...roughOptions, fill: '#333', fillStyle: 'solid' }));
          // Antenas
          svg.appendChild(rc.path('M25,9 Q20,2 15,5', roughOptions));
          svg.appendChild(rc.path('M39,9 Q44,2 49,5', roughOptions));
          // Pernas
          svg.appendChild(rc.line(21, 32, 8, 25, roughOptions));
          svg.appendChild(rc.line(21, 40, 5, 40, roughOptions));
          svg.appendChild(rc.line(21, 48, 8, 55, roughOptions));
          svg.appendChild(rc.line(43, 32, 56, 25, roughOptions));
          svg.appendChild(rc.line(43, 40, 59, 40, roughOptions));
          svg.appendChild(rc.line(43, 48, 56, 55, roughOptions));
          // Linhas do corpo
          svg.appendChild(rc.line(22, 35, 42, 35, roughOptions));
          svg.appendChild(rc.line(22, 45, 42, 45, roughOptions));
        }}
      />

      {/* Xícara de Café */}
      <RoughIcon
        className="icon coffee"
        width={70}
        height={65}
        tooltip="Sou de TI mas tenho intolerância a café. Sim, nós existimos"
        draw={(rc, svg) => {
          // Xícara
          svg.appendChild(rc.path('M12,22 L12,52 Q12,60 28,60 Q44,60 44,52 L44,22 Z', { ...fillOptions, fill: 'rgba(180, 140, 100, 0.2)' }));
          // Borda superior
          svg.appendChild(rc.line(10, 22, 46, 22, { ...roughOptions, strokeWidth: 2 }));
          // Alça
          svg.appendChild(rc.path('M44,28 Q58,28 58,40 Q58,52 44,52', roughOptions));
          // Vapor
          svg.appendChild(rc.path('M20,8 Q22,14 20,18', { ...roughOptions, strokeWidth: 1 }));
          svg.appendChild(rc.path('M28,5 Q30,12 28,18', { ...roughOptions, strokeWidth: 1 }));
          svg.appendChild(rc.path('M36,8 Q38,14 36,18', { ...roughOptions, strokeWidth: 1 }));
          // Pires
          svg.appendChild(rc.ellipse(28, 62, 40, 6, roughOptions));
        }}
      />

        {/* Fita Cassete */}
        <RoughIcon
          className="icon cassette"
          width={70}
          height={45}
          tooltip="Minha playlist vai de MPB a Heavy Metal em duas músicas. Nem eu entendo meu algoritmo"
          draw={(rc, svg) => {
            // Corpo da fita
            svg.appendChild(rc.rectangle(10, 10, 50, 25, fillOptions));
            // Faixa superior
            svg.appendChild(rc.rectangle(10, 10, 50, 6, { ...roughOptions, fill: 'rgba(80,80,80,0.15)', fillStyle: 'solid' }));
            // Faixa inferior
            svg.appendChild(rc.rectangle(10, 29, 50, 6, { ...roughOptions, fill: 'rgba(80,80,80,0.15)', fillStyle: 'solid' }));
            // Bobinas
            svg.appendChild(rc.circle(22, 22, 5, { ...roughOptions, fill: '#bbb', fillStyle: 'solid' }));
            svg.appendChild(rc.circle(48, 22, 5, { ...roughOptions, fill: '#bbb', fillStyle: 'solid' }));
            // Detalhe central
            svg.appendChild(rc.rectangle(32, 18, 6, 8, { ...roughOptions, fill: '#eee', fillStyle: 'solid' }));
            // Linhas decorativas
            svg.appendChild(rc.line(10, 16, 60, 16, roughOptions));
            svg.appendChild(rc.line(10, 28, 60, 28, roughOptions));
          }}
        />

      {/* Disquete */}
      <RoughIcon
        className="icon floppy"
        width={60}
        height={60}
        tooltip="Aquele vício de dar Ctrl+S a cada 5 segundos"
        draw={(rc, svg) => {
          // Corpo principal
          svg.appendChild(rc.rectangle(5, 5, 50, 50, fillOptions));
          // Etiqueta superior
          svg.appendChild(rc.rectangle(12, 5, 28, 20, { ...roughOptions, fill: 'rgba(200, 200, 200, 0.4)', fillStyle: 'solid' }));
          // Metal slider
          svg.appendChild(rc.rectangle(32, 8, 6, 14, { ...roughOptions, fill: '#555', fillStyle: 'solid' }));
          // Etiqueta inferior
          svg.appendChild(rc.rectangle(10, 32, 32, 20, { ...roughOptions, fill: 'rgba(255, 255, 255, 0.5)', fillStyle: 'solid' }));
          // Linhas da etiqueta
          svg.appendChild(rc.line(14, 38, 38, 38, roughOptions));
          svg.appendChild(rc.line(14, 44, 32, 44, roughOptions));
          // Canto cortado
          svg.appendChild(rc.line(48, 55, 55, 48, roughOptions));
        }}
      />

      {/* Computador */}
      <RoughIcon
        className="icon computer"
        width={80}
        height={70}
        tooltip="Apaixonado por Hardware e setups"
        draw={(rc, svg) => {
          // Monitor
          svg.appendChild(rc.rectangle(5, 5, 55, 40, fillOptions));
          // Tela
          svg.appendChild(rc.rectangle(10, 10, 45, 30, { ...roughOptions, fill: 'rgba(100, 150, 200, 0.2)', fillStyle: 'solid' }));
          // Linhas de código na tela
          svg.appendChild(rc.line(14, 18, 30, 18, { ...roughOptions, strokeWidth: 1 }));
          svg.appendChild(rc.line(14, 24, 40, 24, { ...roughOptions, strokeWidth: 1 }));
          svg.appendChild(rc.line(14, 30, 25, 30, { ...roughOptions, strokeWidth: 1 }));
          // Suporte
          svg.appendChild(rc.line(25, 45, 25, 55, roughOptions));
          svg.appendChild(rc.line(40, 45, 40, 55, roughOptions));
          // Base
          svg.appendChild(rc.rectangle(15, 55, 35, 6, fillOptions));
          // CPU/Torre ao lado
          svg.appendChild(rc.rectangle(62, 15, 14, 40, fillOptions));
          // Detalhes da CPU
          svg.appendChild(rc.circle(69, 22, 4, roughOptions));
          svg.appendChild(rc.rectangle(65, 30, 8, 5, roughOptions));
          svg.appendChild(rc.line(65, 45, 73, 45, roughOptions));
          svg.appendChild(rc.line(65, 48, 73, 48, roughOptions));
        }}
      />
    </>
  );
}
