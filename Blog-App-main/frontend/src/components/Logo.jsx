export default function Logo({ className = "" }) {
  return (
    <svg
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#8AB0FF', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#5B8DEF', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#5B8DEF', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4A6FD1', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4A6FD1', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#2D4A8F', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Top left layer */}
      <polygon
        points="32,35 48,25 64,35 48,45"
        fill="url(#grad1)"
      />
      
      {/* Top right layer */}
      <polygon
        points="64,35 80,25 96,35 80,45"
        fill="url(#grad2)"
      />

      {/* Middle left layer */}
      <polygon
        points="32,55 48,45 64,55 48,65"
        fill="url(#grad2)"
      />
      
      {/* Middle right layer */}
      <polygon
        points="64,55 80,45 96,55 80,65"
        fill="url(#grad3)"
      />

      {/* Bottom left layer */}
      <polygon
        points="32,75 48,65 64,75 48,85"
        fill="url(#grad3)"
      />
      
      {/* Bottom right layer */}
      <polygon
        points="64,75 80,65 96,75 80,85"
        fill="url(#grad2)"
      />

      {/* Side faces for 3D effect */}
      <polygon
        points="48,25 48,45 64,35 64,25"
        fill="url(#grad2)"
        opacity="0.8"
      />
      
      <polygon
        points="80,25 80,45 96,35 96,25"
        fill="url(#grad3)"
        opacity="0.8"
      />

      <polygon
        points="48,45 48,65 64,55 64,45"
        fill="url(#grad3)"
        opacity="0.9"
      />
    </svg>
  );
}
