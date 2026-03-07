'use client';

import Image from 'next/image';

export default function StickFigure() {
  return (
    <div className="stick-figure-container">
      {/* Cabeça - Foto do Davi */}
      <div className="head">
        <Image
          src="/davi-photo.png"
          alt="Davi"
          width={420}
          height={420}
          className="head-photo"
          priority
        />
      </div>

      {/* Corpo de Palito SVG */}
      <svg
        className="stick-body"
        width="140"
        height="140"
        viewBox="-20 -20 140 160"
        style={{ overflow: 'visible' }}
      >
        {/* Pescoço */}
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="15"
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Corpo */}
        <line
          x1="50"
          y1="15"
          x2="50"
          y2="75"
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Braço esquerdo (acenando) */}
        <g className="waving-arm">
          <line
            x1="50"
            y1="28"
            x2="15"
            y2="5"
            stroke="#000"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Mãozinha removida */}
        </g>

        {/* Braço direito */}
        <line
          x1="50"
          y1="28"
          x2="85"
          y2="55"
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Perna esquerda */}
        <line
          x1="50"
          y1="75"
          x2="25"
          y2="135"
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Perna direita */}
        <line
          x1="50"
          y1="75"
          x2="75"
          y2="135"
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
