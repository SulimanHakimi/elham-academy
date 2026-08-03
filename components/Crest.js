/**
 * The Elham Online Education crest, drawn as SVG so it stays sharp at any size,
 * works in both colour schemes and needs no image request.
 *
 * Palette is taken from the institution's emblem — navy and gold — rather than
 * the site's violet accent, so the mark reads as the official crest.
 *
 * `CrestMark` is the compact shield used in the header and footer.
 *
 * The browser-tab icon in `app/icon.svg` is the same artwork hand-copied (a
 * static file cannot import a component) — keep the two in sync.
 */

const NAVY = '#14284b';
const NAVY_MID = '#1e3a63';
const GOLD = '#c9a34a';
const GOLD_LIGHT = '#e2c476';
const CREAM = '#f8f6f0';

/** Quartered shield with the book, globe, candle and laptop, and the E monogram. */
export function CrestMark({ className = 'h-11 w-11', title }) {
  return (
    <svg
      viewBox="0 0 48 56"
      className={className}
      // Without a title the mark is decorative: the link around it already
      // carries the accessible name, and the monogram would otherwise be
      // announced as a stray "E".
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
    >
      {title && <title>{title}</title>}

      <defs>
        <clipPath id="crest-shield">
          <path d="M24 2 44 8v22c0 12-10 20-20 24C14 50 4 42 4 30V8z" />
        </clipPath>
      </defs>

      {/* Shield body */}
      <path d="M24 2 44 8v22c0 12-10 20-20 24C14 50 4 42 4 30V8z" fill={NAVY} />

      <g clipPath="url(#crest-shield)">
        {/* Cream quarters, top-left and bottom-right */}
        <rect x="0" y="0" width="24" height="27" fill={CREAM} />
        <rect x="24" y="27" width="24" height="29" fill={CREAM} />

        {/* Top-left: open book */}
        <g transform="translate(9 9)">
          <path d="M0 6.5 6 4.6v7.2L0 13.6z" fill={NAVY} />
          <path d="M12.6 6.5 6.6 4.6v7.2l6 1.8z" fill={NAVY_MID} />
          <path d="M6.3 4.4v7.6" stroke={GOLD} strokeWidth="0.9" />
        </g>

        {/* Top-right: globe */}
        <g transform="translate(30 9)" stroke={CREAM} strokeWidth="1.05" fill="none">
          <circle cx="6" cy="8" r="6.2" />
          <path d="M-0.2 8h12.4" />
          <path d="M6 1.8c3 3.4 3 8.8 0 12.4-3-3.6-3-9 0-12.4z" />
        </g>

        {/* Bottom-left: candle */}
        <g transform="translate(11 31)">
          <rect x="4.4" y="4.6" width="2.6" height="8.4" rx="0.7" fill={NAVY} />
          <rect x="1.8" y="12.6" width="7.8" height="1.7" rx="0.8" fill={NAVY_MID} />
          <path d="M5.7 0.6c1.5 1.5 1.9 2.6 1.2 3.4-.7.8-2 .7-2.5-.2-.5-.9 0-2 1.3-3.2z" fill={GOLD} />
        </g>

        {/* Bottom-right: laptop with graduation cap */}
        <g transform="translate(29 32)">
          <rect x="1.4" y="3.4" width="10.4" height="7" rx="1" fill="none" stroke={CREAM} strokeWidth="1.05" />
          <path d="M0 11.6h13.2l1.2 1.9H-1.2z" fill={CREAM} />
          <path d="M2.9 6.4 6.6 5l3.7 1.4L6.6 7.8z" fill={GOLD} />
        </g>
      </g>

      {/* Central monogram */}
      <circle cx="24" cy="27" r="8.4" fill={CREAM} stroke={GOLD} strokeWidth="1.6" />
      <text
        x="24"
        y="31.2"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={NAVY}
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        E
      </text>

      {/* Gold shield border */}
      <path
        d="M24 2 44 8v22c0 12-10 20-20 24C14 50 4 42 4 30V8z"
        fill="none"
        stroke={GOLD}
        strokeWidth="2.2"
      />
    </svg>
  );
}

export default CrestMark;
