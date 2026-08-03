/**
 * Hand-built SVG illustrations. They replace the stock artwork of the reference
 * layouts, keep the page weight tiny and need no external requests — which
 * matters for learners on slow connections.
 */

function Defs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6c8cb6" />
        <stop offset="100%" stopColor="#14284b" />
      </linearGradient>
      <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e2c476" />
        <stop offset="100%" stopColor="#c9a34a" />
      </linearGradient>
      <linearGradient id={`${id}-c`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3aada0" />
        <stop offset="100%" stopColor="#0d6f65" />
      </linearGradient>
    </defs>
  );
}

/** Hero: a learner at a laptop surrounded by floating course cards. */
export function HeroIllustration({ className = '' }) {
  const id = 'hero';
  return (
    <svg viewBox="0 0 520 460" className={className} role="img" aria-label="A learner studying online">
      <Defs id={id} />
      <circle cx="268" cy="212" r="196" fill="#eef3f9" />
      <path d="M96 300c40-70 130-104 196-74 52 24 92-6 118 22 30 32 6 96-54 118-92 34-300 22-260-66z" fill="#e4ebf5" />

      {/* desk */}
      <rect x="120" y="352" width="300" height="14" rx="7" fill="#c7d6ea" />

      {/* laptop */}
      <rect x="182" y="244" width="176" height="108" rx="10" fill={`url(#${id}-a)`} />
      <rect x="192" y="254" width="156" height="88" rx="6" fill="#fdfcf9" />
      <rect x="204" y="268" width="60" height="8" rx="4" fill="#c7d6ea" />
      <rect x="204" y="284" width="98" height="8" rx="4" fill="#e4ebf5" />
      <rect x="204" y="300" width="80" height="8" rx="4" fill="#e4ebf5" />
      <rect x="204" y="318" width="46" height="12" rx="6" fill="#c9a34a" />
      <path d="M160 352h220l16 18H144z" fill="#9db4d3" />

      {/* learner */}
      <circle cx="270" cy="188" r="34" fill="#f6c9a8" />
      <path d="M236 186c0-24 16-40 34-40s34 16 34 40c0 6-4 4-8 2-6-4-18-8-26-8s-20 4-26 8c-4 2-8 4-8-2z" fill="#14284b" />
      <path d="M236 196c-8-2-12-14-6-22 4-6 12-4 12-4z" fill="#14284b" />
      <path d="M304 196c8-2 12-14 6-22-4-6-12-4-12-4z" fill="#14284b" />
      <path d="M240 244c6-16 16-24 30-24s24 8 30 24z" fill={`url(#${id}-c)`} />

      {/* floating cards */}
      <g>
        <rect x="60" y="140" width="112" height="76" rx="14" fill="#fff" stroke="#e4ebf5" strokeWidth="2" />
        <circle cx="84" cy="164" r="12" fill={`url(#${id}-b)`} />
        <rect x="104" y="158" width="52" height="7" rx="3.5" fill="#c7d6ea" />
        <rect x="72" y="186" width="84" height="7" rx="3.5" fill="#eef2f8" />
        <rect x="72" y="200" width="60" height="7" rx="3.5" fill="#eef2f8" />
      </g>
      <g>
        <rect x="368" y="96" width="112" height="76" rx="14" fill="#fff" stroke="#e4ebf5" strokeWidth="2" />
        <circle cx="392" cy="120" r="12" fill={`url(#${id}-c)`} />
        <rect x="412" y="114" width="52" height="7" rx="3.5" fill="#c7d6ea" />
        <rect x="380" y="142" width="84" height="7" rx="3.5" fill="#eef2f8" />
        <rect x="380" y="156" width="60" height="7" rx="3.5" fill="#eef2f8" />
      </g>
      <g>
        <rect x="384" y="228" width="104" height="60" rx="14" fill="#fff" stroke="#e4ebf5" strokeWidth="2" />
        <path d="M404 258l10 10 18-20" stroke="#178d80" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="440" y="252" width="34" height="7" rx="3.5" fill="#c7d6ea" />
      </g>

      {/* accents */}
      <circle cx="132" cy="92" r="10" fill="#e2c476" />
      <circle cx="466" cy="330" r="8" fill="#c9a34a" />
      <circle cx="72" cy="268" r="6" fill="#3aada0" />
      <path d="M330 60l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" fill="#9db4d3" />
    </svg>
  );
}

/** Personalised learning: a dashboard with charts and a progress ring. */
export function LearningIllustration({ className = '' }) {
  const id = 'learn';
  return (
    <svg viewBox="0 0 520 420" className={className} role="img" aria-label="A learning dashboard">
      <Defs id={id} />
      <rect x="34" y="40" width="452" height="320" rx="26" fill="#eef3f9" />
      <rect x="60" y="70" width="400" height="260" rx="18" fill="#fff" />

      {/* sidebar */}
      <rect x="60" y="70" width="96" height="260" rx="18" fill="#fdfcf9" />
      <rect x="78" y="98" width="60" height="8" rx="4" fill="#c7d6ea" />
      <rect x="78" y="122" width="46" height="8" rx="4" fill="#eef2f8" />
      <rect x="78" y="146" width="52" height="8" rx="4" fill="#eef2f8" />
      <rect x="78" y="170" width="40" height="8" rx="4" fill="#eef2f8" />

      {/* progress ring */}
      <circle cx="228" cy="150" r="44" fill="none" stroke="#eef2f8" strokeWidth="14" />
      <circle
        cx="228"
        cy="150"
        r="44"
        fill="none"
        stroke={`url(#${id}-a)`}
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray="207 276"
        transform="rotate(-90 228 150)"
      />
      <text x="228" y="158" textAnchor="middle" fontSize="24" fontWeight="700" fill="#111d33" fontFamily="sans-serif">
        75%
      </text>

      {/* bars */}
      <rect x="308" y="176" width="22" height="40" rx="11" fill="#c7d6ea" />
      <rect x="342" y="150" width="22" height="66" rx="11" fill={`url(#${id}-c)`} />
      <rect x="376" y="122" width="22" height="94" rx="11" fill={`url(#${id}-a)`} />
      <rect x="410" y="162" width="22" height="54" rx="11" fill={`url(#${id}-b)`} />
      <rect x="308" y="98" width="86" height="8" rx="4" fill="#c7d6ea" />

      {/* rows */}
      <rect x="180" y="236" width="260" height="34" rx="12" fill="#fdfcf9" />
      <circle cx="200" cy="253" r="9" fill="#178d80" />
      <rect x="220" y="249" width="120" height="8" rx="4" fill="#c7d6ea" />
      <rect x="180" y="282" width="260" height="34" rx="12" fill="#fdfcf9" />
      <circle cx="200" cy="299" r="9" fill="#e2c476" />
      <rect x="220" y="295" width="90" height="8" rx="4" fill="#c7d6ea" />

      <circle cx="470" cy="60" r="12" fill="#c9a34a" />
      <circle cx="42" cy="356" r="9" fill="#3aada0" />
    </svg>
  );
}

/** CTA: a rocket launching from a book. */
export function LaunchIllustration({ className = '' }) {
  const id = 'launch';
  return (
    <svg viewBox="0 0 460 420" className={className} role="img" aria-label="A rocket launching from an open book">
      <Defs id={id} />
      <circle cx="230" cy="200" r="164" fill="rgba(255,255,255,0.12)" />
      <circle cx="230" cy="200" r="116" fill="rgba(255,255,255,0.1)" />

      {/* rocket */}
      <path d="M230 60c34 34 52 78 52 126l-24 26h-56l-24-26c0-48 18-92 52-126z" fill="#fff" />
      <circle cx="230" cy="150" r="22" fill={`url(#${id}-a)`} />
      <circle cx="230" cy="150" r="11" fill="#fdfcf9" />
      <path d="M178 186c-22 8-34 28-34 52l34-18z" fill="#c9a34a" />
      <path d="M282 186c22 8 34 28 34 52l-34-18z" fill="#c9a34a" />
      <path d="M206 212h48l-8 30h-32z" fill="#c7d6ea" />
      <path d="M230 300c-14-16-20-30-20-42h40c0 12-6 26-20 42z" fill="#e2c476" />
      <path d="M230 336c-8-10-12-19-12-26h24c0 7-4 16-12 26z" fill="#c9a34a" />

      {/* book */}
      <path d="M110 330h240l24 44H86z" fill="#fff" opacity="0.92" />
      <path d="M150 330h160l14 26H136z" fill="#c7d6ea" />

      {/* stars */}
      <circle cx="92" cy="104" r="6" fill="#e2c476" />
      <circle cx="378" cy="132" r="8" fill="#3aada0" />
      <circle cx="120" cy="230" r="5" fill="#fff" opacity="0.8" />
      <circle cx="352" cy="252" r="6" fill="#fff" opacity="0.7" />
      <path d="M64 176l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" fill="#fff" opacity="0.6" />
      <path d="M396 62l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#fff" opacity="0.5" />
    </svg>
  );
}

/** Contact: an envelope with a message bubble. */
export function ContactIllustration({ className = '' }) {
  const id = 'contact';
  return (
    <svg viewBox="0 0 460 400" className={className} role="img" aria-label="An envelope and a chat bubble">
      <Defs id={id} />
      <circle cx="230" cy="200" r="170" fill="#eef3f9" />
      <path d="M96 292c26-58 96-84 152-58 44 20 76-6 98 18 24 26 4 78-44 96-74 28-232 12-206-56z" fill="#e4ebf5" />

      <rect x="112" y="150" width="236" height="160" rx="18" fill="#fff" />
      <path d="M112 168l118 84 118-84" fill="none" stroke="#c7d6ea" strokeWidth="6" strokeLinecap="round" />
      <path d="M112 292l86-70M348 292l-86-70" stroke="#eef2f8" strokeWidth="6" strokeLinecap="round" />

      <rect x="164" y="60" width="180" height="112" rx="20" fill={`url(#${id}-a)`} />
      <rect x="186" y="88" width="112" height="10" rx="5" fill="rgba(255,255,255,0.85)" />
      <rect x="186" y="110" width="136" height="10" rx="5" fill="rgba(255,255,255,0.55)" />
      <rect x="186" y="132" width="80" height="10" rx="5" fill="rgba(255,255,255,0.4)" />
      <path d="M198 172l6 26 24-26z" fill="#14284b" />

      <circle cx="384" cy="118" r="12" fill="#e2c476" />
      <circle cx="80" cy="196" r="9" fill="#3aada0" />
      <circle cx="372" cy="300" r="7" fill="#c9a34a" />
    </svg>
  );
}

/** About: a group of learners under a graduation cap. */
export function CommunityIllustration({ className = '' }) {
  const id = 'community';
  return (
    <svg viewBox="0 0 520 420" className={className} role="img" aria-label="A group of learners">
      <Defs id={id} />
      <circle cx="260" cy="200" r="180" fill="#eef3f9" />
      <path d="M92 306c30-64 108-92 168-64 48 22 84-6 108 20 26 28 4 84-48 104-80 30-256 12-228-60z" fill="#e4ebf5" />

      {/* centre figure */}
      <circle cx="260" cy="168" r="40" fill="#f6c9a8" />
      <path d="M220 166c0-26 18-44 40-44s40 18 40 44c0 6-6 4-10 2-8-4-20-8-30-8s-22 4-30 8c-4 2-10 4-10-2z" fill="#14284b" />
      <path d="M204 300c8-40 26-60 56-60s48 20 56 60z" fill={`url(#${id}-a)`} />
      <path d="M200 108l60-26 60 26-60 26z" fill="#111d33" />
      <path d="M310 122v28c0 8-22 14-50 14s-50-6-50-14v-28" fill="#14284b" />
      <path d="M318 118v34" stroke="#e2c476" strokeWidth="5" strokeLinecap="round" />
      <circle cx="318" cy="158" r="7" fill="#e2c476" />

      {/* side figures */}
      <circle cx="150" cy="212" r="28" fill="#f6c9a8" />
      <path d="M122 210c0-18 12-30 28-30s28 12 28 30c0 4-4 3-7 1-6-3-14-6-21-6s-15 3-21 6c-3 2-7 3-7-1z" fill="#2a4d7d" />
      <path d="M106 306c6-30 20-46 44-46s38 16 44 46z" fill={`url(#${id}-c)`} />

      <circle cx="370" cy="212" r="28" fill="#f6c9a8" />
      <path d="M342 210c0-18 12-30 28-30s28 12 28 30c0 4-4 3-7 1-6-3-14-6-21-6s-15 3-21 6c-3 2-7 3-7-1z" fill="#14284b" />
      <path d="M326 306c6-30 20-46 44-46s38 16 44 46z" fill={`url(#${id}-b)`} />

      <circle cx="446" cy="112" r="11" fill="#c9a34a" />
      <circle cx="72" cy="140" r="8" fill="#3aada0" />
      <path d="M430 268l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" fill="#9db4d3" />
    </svg>
  );
}

/** Instructor CTA: a person presenting at a board. */
export function TeachIllustration({ className = '' }) {
  const id = 'teach';
  return (
    <svg viewBox="0 0 460 380" className={className} role="img" aria-label="An instructor presenting a lesson">
      <Defs id={id} />
      <circle cx="230" cy="186" r="160" fill="#eef3f9" />
      <rect x="112" y="70" width="252" height="164" rx="16" fill="#fff" stroke="#c7d6ea" strokeWidth="3" />
      <rect x="138" y="98" width="96" height="10" rx="5" fill="#c7d6ea" />
      <rect x="138" y="122" width="140" height="8" rx="4" fill="#eef2f8" />
      <rect x="138" y="142" width="112" height="8" rx="4" fill="#eef2f8" />
      <path d="M266 196l24-42 22 30 16-22 20 34z" fill={`url(#${id}-c)`} opacity="0.85" />
      <rect x="138" y="176" width="60" height="24" rx="12" fill="#c9a34a" />

      <circle cx="104" cy="222" r="30" fill="#f6c9a8" />
      <path d="M74 220c0-20 14-34 30-34s30 14 30 34c0 5-5 3-8 1-7-3-15-7-22-7s-16 4-22 7c-3 2-8 4-8-1z" fill="#14284b" />
      <path d="M58 330c6-34 22-52 46-52s40 18 46 52z" fill={`url(#${id}-a)`} />
      <path d="M140 266l52-30" stroke="#f6c9a8" strokeWidth="14" strokeLinecap="round" />
      <rect x="70" y="330" width="320" height="12" rx="6" fill="#c7d6ea" />

      <circle cx="392" cy="86" r="10" fill="#e2c476" />
      <circle cx="66" cy="120" r="7" fill="#3aada0" />
    </svg>
  );
}
