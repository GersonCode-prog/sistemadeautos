// Dibujo de un auto en SVG, pintado del color del vehículo
export function autoSvg(color = '#14649b', tipo = 'Sedán') {
  const alto = tipo === 'SUV' || tipo === 'Pickup' ? 8 : 0;   // SUV y pickup más altos
  const caja = tipo === 'Pickup';
  return `
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="100" cy="88" rx="80" ry="6" fill="rgba(0,0,0,.12)"/>
  <path d="M20 ${70 - alto} Q22 ${55 - alto} 40 ${52 - alto} L62 ${50 - alto} L82 ${30 - alto} Q88 ${25 - alto} 100 ${25 - alto}
           L${caja ? 120 : 135} ${25 - alto} Q${caja ? 128 : 145} ${25 - alto} ${caja ? 130 : 152} ${33 - alto}
           L${caja ? 132 : 165} ${50 - alto} ${caja ? `L178 ${50 - alto} L178 ${50 - alto}` : ''} L172 ${52 - alto}
           Q182 ${55 - alto} 182 ${68 - alto} L182 75 Q182 80 176 80 L24 80 Q18 80 18 75 Z"
        fill="${color}" stroke="rgba(0,0,0,.25)" stroke-width="1.5"/>
  <path d="M68 ${50 - alto} L86 ${32 - alto} Q90 ${29 - alto} 98 ${29 - alto} L98 ${50 - alto} Z" fill="#cfe8f7" opacity=".9"/>
  <path d="M103 ${29 - alto} L${caja ? 118 : 133} ${29 - alto} Q${caja ? 124 : 141} ${29 - alto} ${caja ? 126 : 146} ${35 - alto} L${caja ? 128 : 158} ${50 - alto} L103 ${50 - alto} Z" fill="#cfe8f7" opacity=".9"/>
  <path d="M30 ${62 - alto} L176 ${62 - alto}" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
  <rect x="172" y="${58 - alto}" width="9" height="5" rx="2" fill="#fde68a"/>
  <rect x="19" y="${60 - alto}" width="7" height="5" rx="2" fill="#f87171"/>
  <circle cx="55" cy="78" r="13" fill="#1f2937"/><circle cx="55" cy="78" r="6" fill="#9ca3af"/>
  <circle cx="148" cy="78" r="13" fill="#1f2937"/><circle cx="148" cy="78" r="6" fill="#9ca3af"/>
</svg>`;
}
