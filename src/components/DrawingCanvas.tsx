'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import rough from 'roughjs';

type Tool = 'pencil' | 'eraser' | 'none';

/* ── Toolbar icons desenhados com rough.js ── */

function ToolIcon({ type, active, onClick }: { type: 'pencil' | 'eraser' | 'clear'; active?: boolean; onClick: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = '';
    const rc = rough.svg(svgRef.current);
    const o = {
      stroke: active ? '#e85d3a' : '#555',
      strokeWidth: 1.8,
      roughness: 1.6,
      bowing: 1.2,
    };
    const f = {
      ...o,
      fill: active ? 'rgba(232, 93, 58, 0.15)' : 'rgba(80,80,80,0.08)',
      fillStyle: 'hachure' as const,
      hachureGap: 4,
    };

    if (type === 'pencil') {
      // Lápis — corpo + ponta
      svgRef.current.appendChild(rc.polygon([[10, 4], [26, 4], [26, 28], [18, 36], [10, 28]], f));
      // Ponta do lápis
      svgRef.current.appendChild(rc.polygon([[14, 28], [18, 38], [22, 28]], { ...o, fill: '#fef3c7', fillStyle: 'solid' }));
      // Ponto da ponta
      svgRef.current.appendChild(rc.circle(18, 36, 2, { ...o, fill: '#333', fillStyle: 'solid', strokeWidth: 1 }));
      // Linhas decorativas
      svgRef.current.appendChild(rc.line(10, 8, 26, 8, { ...o, strokeWidth: 1 }));
      svgRef.current.appendChild(rc.line(10, 24, 26, 24, { ...o, strokeWidth: 1 }));
    } else if (type === 'eraser') {
      // Borracha — retângulo arredondado
      svgRef.current.appendChild(rc.rectangle(6, 8, 24, 28, f));
      // Divisória (parte de borrachar)
      svgRef.current.appendChild(rc.line(6, 22, 30, 22, { ...o, strokeWidth: 1.2 }));
      // Migalhas
      svgRef.current.appendChild(rc.circle(14, 32, 2, { ...o, strokeWidth: 0.8 }));
      svgRef.current.appendChild(rc.circle(22, 34, 1.5, { ...o, strokeWidth: 0.8 }));
      svgRef.current.appendChild(rc.circle(10, 35, 1, { ...o, strokeWidth: 0.8 }));
    } else if (type === 'clear') {
      // Lixeira — corpo
      svgRef.current.appendChild(rc.rectangle(8, 12, 20, 24, f));
      // Tampa
      svgRef.current.appendChild(rc.line(5, 12, 31, 12, { ...o, strokeWidth: 2 }));
      // Alça
      svgRef.current.appendChild(rc.path('M14,12 Q14,6 18,6 Q22,6 22,12', o));
      // Linhas internas
      svgRef.current.appendChild(rc.line(14, 16, 14, 32, { ...o, strokeWidth: 1 }));
      svgRef.current.appendChild(rc.line(18, 16, 18, 32, { ...o, strokeWidth: 1 }));
      svgRef.current.appendChild(rc.line(22, 16, 22, 32, { ...o, strokeWidth: 1 }));
    }
  }, [type, active]);

  return (
    <button
      className={`drawing-tool-btn ${active ? 'active' : ''}`}
      onClick={onClick}
      title={type === 'pencil' ? 'Lápis' : type === 'eraser' ? 'Borracha' : 'Limpar tudo'}
      aria-label={type === 'pencil' ? 'Lápis' : type === 'eraser' ? 'Borracha' : 'Limpar tudo'}
    >
      <svg ref={svgRef} width={36} height={40} viewBox="0 0 36 40" />
    </button>
  );
}

/* ── Balão de dica desenhado à mão ── */

function DrawingHintBubble() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.innerHTML = '';
    const rc = rough.svg(svgRef.current);
    const o = { stroke: '#999', strokeWidth: 1.4, roughness: 2, bowing: 1.5, seed: 42 };
    // Balão orgânico
    svgRef.current.appendChild(
      rc.path(
        'M8,5 Q2,5 2,18 Q2,31 8,31 L170,31 Q178,31 178,18 Q178,5 170,5 Z',
        { ...o, fill: 'rgba(254,249,231,0.9)', fillStyle: 'solid' as const }
      )
    );
    // Pontinha apontando para baixo-direita
    svgRef.current.appendChild(
      rc.path('M148,31 L164,42 L135,31', { ...o, fill: 'rgba(254,249,231,0.9)', fillStyle: 'solid' as const })
    );
  }, []);

  return <svg ref={svgRef} className="drawing-hint-svg" width={180} height={46} viewBox="0 0 180 46" />;
}

/* ── Main Drawing Canvas ── */

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>('none');
  const [isDrawing, setIsDrawing] = useState(false);
  const [toolbarOpen, setToolbarOpen] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Resize canvas to match full document height
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Save current drawing
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (tempCtx) tempCtx.drawImage(canvas, 0, 0);

    const dpr = window.devicePixelRatio || 1;
    const width = document.documentElement.scrollWidth;
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      // Restore drawing
      ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, width, height);
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Also resize on scroll if document height changes (lazy loaded content)
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
    };
  }, [resizeCanvas]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0] || e.changedTouches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (tool === 'none') return;
    setIsDrawing(true);
    lastPos.current = getPos(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || tool === 'none' || !lastPos.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getPos(e);
    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (tool === 'pencil') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = 'rgba(45, 45, 45, 0.7)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 28;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    ctx.restore();
    lastPos.current = pos;
  };

  const stopDraw = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const toggleTool = (newTool: Tool) => {
    setTool((prev) => (prev === newTool ? 'none' : newTool));
  };

  const isActive = tool !== 'none';

  return (
    <>
      {/* Canvas cobrindo toda a página */}
      <canvas
        ref={canvasRef}
        className="drawing-canvas"
        style={{ pointerEvents: isActive ? 'auto' : 'none' }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />

      {/* Cursor customizado quando ferramenta ativa */}
      {isActive && (
        <style>{`
          .drawing-canvas {
            cursor: ${tool === 'pencil' ? 'crosshair' : 'cell'} !important;
          }
        `}</style>
      )}

      {/* Balão de dica — aparece quando a toolbar esta fechada */}
      {!toolbarOpen && (
        <div className="drawing-hint-bubble">
          <DrawingHintBubble />
          <span className="drawing-hint-text">clique aqui para desenhar</span>
        </div>
      )}

      {/* Toolbar flutuante */}
      <div className={`drawing-toolbar ${toolbarOpen ? 'open' : ''}`}>
        {/* Botão toggle */}
        <button
          className="drawing-toolbar-toggle"
          onClick={() => {
            setToolbarOpen((prev) => !prev);
            if (toolbarOpen) setTool('none');
          }}
          title={toolbarOpen ? 'Fechar ferramentas' : 'Abrir ferramentas de desenho'}
          aria-label="Toggle ferramentas de desenho"
        >
          <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
            {toolbarOpen ? (
              // X icon
              <>
                <line x1="7" y1="7" x2="21" y2="21" stroke="#555" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="21" y1="7" x2="7" y2="21" stroke="#555" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : (
              // Pencil icon mini
              <>
                <path d="M6,22 L18,10 L20,12 L8,24 Z" fill="#555" />
                <path d="M18,10 L20,8 Q21,7 22,8 L22,8 Q23,9 22,10 L20,12 Z" fill="#888" />
                <line x1="6" y1="22" x2="8" y2="24" stroke="#555" strokeWidth="1.5" />
                <circle cx="5" cy="24" r="1.5" fill="#555" />
              </>
            )}
          </svg>
        </button>

        {/* Ferramentas */}
        {toolbarOpen && (
          <div className="drawing-tools">
            <ToolIcon type="pencil" active={tool === 'pencil'} onClick={() => toggleTool('pencil')} />
            <ToolIcon type="eraser" active={tool === 'eraser'} onClick={() => toggleTool('eraser')} />
            <div className="drawing-tool-divider" />
            <ToolIcon type="clear" onClick={clearCanvas} />
          </div>
        )}
      </div>
    </>
  );
}
