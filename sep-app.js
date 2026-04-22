// SEP - Sistema de Engenharia de Proteção
// Versão para GitHub Pages (sem módulos ES6)

// React hooks (disponíveis globalmente via CDN)
const {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo
} = React;

// ═══════════════════════════════════════════════════════════════════════════════
// ÍCONES SVG INLINE (substitui lucide-react)
// ═══════════════════════════════════════════════════════════════════════════════

const Icon = ({
  d,
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  fill = 'none',
  ...props
}) => React.createElement('svg', {
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: fill,
  stroke: color,
  strokeWidth: strokeWidth,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  ...props
}, Array.isArray(d) ? d.map((path, i) => React.createElement('path', {
  key: i,
  d: path
})) : React.createElement('path', {
  d
}));

// Ícones usados no app
const Settings = props => Icon({
  d: ['M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z', 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'],
  ...props
});
const Zap = props => Icon({
  d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  ...props
});
const Calculator = props => Icon({
  d: ['M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z', 'M8 6h8', 'M8 10h8', 'M8 14h2', 'M8 18h2', 'M14 14h2', 'M14 18h2'],
  ...props
});
const CheckCircle = props => Icon({
  d: ['M22 11.08V12a10 10 0 1 1-5.93-9.14', 'M22 4 12 14.01l-3-3'],
  ...props
});
const FileText = props => Icon({
  d: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8', 'M10 9H8'],
  ...props
});
const AlertTriangle = props => Icon({
  d: ['M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z', 'M12 9v4', 'M12 17h.01'],
  ...props
});
const ChevronRight = props => Icon({
  d: 'M9 18l6-6-6-6',
  ...props
});
const ChevronDown = props => Icon({
  d: 'M6 9l6 6 6-6',
  ...props
});
const Upload = props => Icon({
  d: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'],
  ...props
});
const Download = props => Icon({
  d: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
  ...props
});
const Activity = props => Icon({
  d: 'M22 12h-4l-3 9L9 3l-3 9H2',
  ...props
});
const Shield = props => Icon({
  d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  ...props
});
const Users = props => Icon({
  d: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  ...props
});
const Database = props => Icon({
  d: ['M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2z', 'M2 6.5c0 2.49 4.48 4.5 10 4.5s10-2.01 10-4.5', 'M2 12c0 2.49 4.48 4.5 10 4.5s10-2.01 10-4.5'],
  ...props
});
const Plus = props => Icon({
  d: ['M12 5v14', 'M5 12h14'],
  ...props
});
const Trash2 = props => Icon({
  d: ['M3 6h18', 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M10 11v6', 'M14 11v6'],
  ...props
});
const Save = props => Icon({
  d: ['M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z', 'M17 21v-8H7v8', 'M7 3v5h8'],
  ...props
});
const X = props => Icon({
  d: ['M18 6L6 18', 'M6 6l12 12'],
  ...props
});
const Cpu = props => Icon({
  d: ['M4 4h16v16H4z', 'M9 9h6v6H9z', 'M9 1v3', 'M15 1v3', 'M9 20v3', 'M15 20v3', 'M20 9h3', 'M20 14h3', 'M1 9h3', 'M1 14h3'],
  ...props
});
const Edit2 = props => Icon({
  d: ['M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z'],
  ...props
});
const Info = props => Icon({
  d: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 16v-4', 'M12 8h.01'],
  ...props
});
const Check = props => Icon({
  d: 'M20 6L9 17l-5-5',
  ...props
});
const Copy = props => Icon({
  d: ['M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z', 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'],
  ...props
});
const Eye = props => Icon({
  d: ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'],
  ...props
});
const EyeOff = props => Icon({
  d: ['M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24', 'M1 1l22 22'],
  ...props
});
const RefreshCw = props => Icon({
  d: ['M23 4v6h-6', 'M1 20v-6h6', 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'],
  ...props
});
const Search = props => Icon({
  d: ['M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z', 'M21 21l-4.35-4.35'],
  ...props
});
const Building2 = props => Icon({
  d: ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z', 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2', 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2', 'M10 6h4', 'M10 10h4', 'M10 14h4', 'M10 18h4'],
  ...props
});
const User = props => Icon({
  d: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'],
  ...props
});
const FileSpreadsheet = props => Icon({
  d: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M8 13h2', 'M8 17h2', 'M14 13h2', 'M14 17h2'],
  ...props
});
const Image = props => Icon({
  d: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', 'M21 15l-5-5L5 21'],
  ...props
});
const Printer = props => Icon({
  d: ['M6 9V2h12v7', 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2', 'M6 14h12v8H6z'],
  ...props
});
const Mail = props => Icon({
  d: ['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'M22 6l-10 7L2 6'],
  ...props
});
const Phone = props => Icon({
  d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
  ...props
});
const MapPin = props => Icon({
  d: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', 'M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'],
  ...props
});
const Calendar = props => Icon({
  d: ['M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z', 'M16 2v4', 'M8 2v4', 'M3 10h18'],
  ...props
});
const Clock = props => Icon({
  d: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 6v6l4 2'],
  ...props
});
const Hash = props => Icon({
  d: ['M4 9h16', 'M4 15h16', 'M10 3L8 21', 'M16 3l-2 18'],
  ...props
});
const Percent = props => Icon({
  d: ['M19 5L5 19', 'M6.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', 'M17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
  ...props
});
const ArrowRight = props => Icon({
  d: ['M5 12h14', 'M12 5l7 7-7 7'],
  ...props
});
const ArrowLeft = props => Icon({
  d: ['M19 12H5', 'M12 19l-7-7 7-7'],
  ...props
});
const RotateCcw = props => Icon({
  d: ['M1 4v6h6', 'M3.51 15a9 9 0 1 0 2.13-9.36L1 10'],
  ...props
});
const Maximize2 = props => Icon({
  d: ['M15 3h6v6', 'M9 21H3v-6', 'M21 3l-7 7', 'M3 21l7-7'],
  ...props
});
const ZoomIn = props => Icon({
  d: ['M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z', 'M21 21l-4.35-4.35', 'M11 8v6', 'M8 11h6'],
  ...props
});
const ZoomOut = props => Icon({
  d: ['M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z', 'M21 21l-4.35-4.35', 'M8 11h6'],
  ...props
});
const Move = props => Icon({
  d: ['M5 9l-3 3 3 3', 'M9 5l3-3 3 3', 'M15 19l-3 3-3-3', 'M19 9l3 3-3 3', 'M2 12h20', 'M12 2v20'],
  ...props
});
const Layers = props => Icon({
  d: ['M12 2L2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'],
  ...props
});
const Grid = props => Icon({
  d: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
  ...props
});
const Target = props => Icon({
  d: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z', 'M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'],
  ...props
});
const Circle = props => Icon({
  d: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z',
  ...props
});
const Square = props => Icon({
  d: 'M3 3h18v18H3z',
  ...props
});
const Edit = props => Edit2(props);
const Bookmark = props => Icon({
  d: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z',
  ...props
});
const Star = props => Icon({
  d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  ...props
});
const TrendingUp = props => Icon({
  d: ['M23 6l-9.5 9.5-5-5L1 18', 'M17 6h6v6'],
  ...props
});
const TrendingDown = props => Icon({
  d: ['M23 18l-9.5-9.5-5 5L1 6', 'M17 18h6v-6'],
  ...props
});
const Table = props => Icon({
  d: ['M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18'],
  ...props
});
const List = props => Icon({
  d: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
  ...props
});
const Menu = props => Icon({
  d: ['M3 12h18', 'M3 6h18', 'M3 18h18'],
  ...props
});
const Filter = props => Icon({
  d: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  ...props
});
const Columns = props => Icon({
  d: ['M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18'],
  ...props
});
const Layout = props => Icon({
  d: ['M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z', 'M3 9h18', 'M9 21V9'],
  ...props
});
const ExternalLink = props => Icon({
  d: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14L21 3'],
  ...props
});
const Link = props => Icon({
  d: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
  ...props
});
const File = props => Icon({
  d: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6'],
  ...props
});
const Folder = props => Icon({
  d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z',
  ...props
});
const BarChart2 = props => Icon({
  d: ['M18 20V10', 'M12 20V4', 'M6 20v-6'],
  ...props
});
const BarChart3 = BarChart2;

// ═══════════════════════════════════════════════════════════════════════════════
// MATH ENGINE - Complex Number Operations & Protection Calculations
// ═══════════════════════════════════════════════════════════════════════════════

const toRect = (mod, angDeg) => {
  const rad = angDeg * Math.PI / 180;
  return {
    re: mod * Math.cos(rad),
    im: mod * Math.sin(rad)
  };
};
const complexAdd = (a, b) => ({
  re: a.re + b.re,
  im: a.im + b.im
});
const complexSub = (a, b) => ({
  re: a.re - b.re,
  im: a.im - b.im
});
const complexMul = (a, b) => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re
});
const complexDiv = (a, b) => {
  const denom = b.re * b.re + b.im * b.im;
  if (denom === 0) return {
    re: 0,
    im: 0
  };
  return {
    re: (a.re * b.re + a.im * b.im) / denom,
    im: (a.im * b.re - a.re * b.im) / denom
  };
};
const getModAng = c => {
  const mod = Math.sqrt(c.re * c.re + c.im * c.im);
  const ang = Math.atan2(c.im, c.re) * 180 / Math.PI;
  return {
    mod,
    ang
  };
};
const complexScale = (c, k) => ({
  re: c.re * k,
  im: c.im * k
});
const calculateProtectionSettings = inputs => {
  const {
    V_nom,
    Z1_mod,
    Z1_ang,
    Z0_mod,
    Z0_ang,
    norma,
    terminal_A,
    terminal_B,
    I_carga_max,
    Z_adj_mod,
    Z_adj_ang,
    linha_comprimento,
    susceptancia_b1,
    zonasConfig,
    // Legacy / fallback geral
    zonasConfigA,
    // Zonas específicas Terminal A (opcional)
    zonasConfigB // Zonas específicas Terminal B (opcional)
  } = inputs;

  // Defaults caso nada seja fornecido
  const zonasDefault = {
    z1_percent: 80,
    z2_percent: 120,
    z3_percent: 150,
    z4_percent: 20,
    z1_tempo: 0,
    z2_tempo: 400,
    z3_tempo: 1200,
    z4_tempo: 1000,
    z4_habilitada: true,
    z4_reversa: true
  };

  // Fallback geral (mantém compatibilidade)
  const zonasGlobal = zonasConfig || zonasDefault;
  // Zonas específicas por terminal (se informadas, senão usam zonas gerais)
  const zonasA = zonasConfigA || zonasGlobal;
  const zonasB = zonasConfigB || zonasGlobal;
  const calculateTerminal = (term, termName, zonasTermConfig) => {
    // Cada terminal usa suas próprias zonas
    const zonas = zonasTermConfig || zonasGlobal;
    const K_conv = term.rtc / term.rtp;

    // 1. CÁLCULO VETORIAL DAS IMPEDÂNCIAS (Primário → Secundário)
    const z1_line_prim = toRect(Z1_mod, Z1_ang);
    const z0_line_prim = toRect(Z0_mod, Z0_ang);
    const z1_line_c = complexScale(z1_line_prim, K_conv);
    const z0_line_c = complexScale(z0_line_prim, K_conv);

    // 2. FATOR K0 (Compensação de Terra)
    const num_k0 = complexSub(z0_line_c, z1_line_c);
    const den_k0 = complexScale(z1_line_c, 3);
    const k0_c = complexDiv(num_k0, den_k0);
    const {
      mod: K0_mod,
      ang: K0_ang
    } = getModAng(k0_c);

    // 3. IMPEDÂNCIA SECUNDÁRIA TOTAL DA LINHA
    const {
      mod: Z1_sec_mod,
      ang: Z1_sec_ang
    } = getModAng(z1_line_c);

    // 4. IMPEDÂNCIA ADJACENTE (para Z3)
    const z_adj_prim = toRect(Z_adj_mod || 0, Z_adj_ang || 0);
    const z_adj_sec = complexScale(z_adj_prim, K_conv);
    const z_total_c = complexAdd(z1_line_c, z_adj_sec);
    const {
      mod: Z_total_mod
    } = getModAng(z_total_c);

    // ═══════════════════════════════════════════════════════════════════════════
    // 5. CÁLCULO DE ZONAS USANDO VALORES DO USUÁRIO (SINGLE SOURCE OF TRUTH)
    // ═══════════════════════════════════════════════════════════════════════════

    // Z1: Subalcance instantâneo - usa porcentagem configurada pelo usuário
    const z1_reach = zonas.z1_percent / 100 * Z1_sec_mod;

    // Z2: Sobrealcance temporizado - usa porcentagem configurada pelo usuário
    const z2_reach = zonas.z2_percent / 100 * Z1_sec_mod;

    // Z3: Backup remoto forward - SEMPRE HABILITADA (retaguarda remota)
    // Pode ser % da linha+adjacente ou só linha
    let z3_reach = 0;
    const z3_adj_available = Z_total_mod > Z1_sec_mod * 1.01;
    if (z3_adj_available && zonas.z3_percent > 100) {
      // Se há adjacente e % > 100, aplica sobre (linha + adjacente)
      z3_reach = zonas.z3_percent / 100 * Z_total_mod;
    } else {
      // Se não há adjacente ou % <= 100, aplica sobre a linha
      z3_reach = zonas.z3_percent / 100 * Z1_sec_mod;
    }

    // Z4: OPCIONAL - pode ser reversa (proteção barra/BF) ou forward (adicional)
    // Só é calculada se habilitada
    const z4_reach = zonas.z4_habilitada ? zonas.z4_percent / 100 * Z1_sec_mod : 0;
    const z4_direction = zonas.z4_reversa ? 'REVERSE' : 'FORWARD';

    // Tempos de atuação - convertendo de ms para segundos
    const z1_time = zonas.z1_tempo / 1000;
    const z2_time = zonas.z2_tempo / 1000;
    const z3_time = zonas.z3_tempo / 1000;
    const z4_time = zonas.z4_tempo / 1000;

    // Critérios e textos baseados na norma selecionada (para memorial)
    let criteria = {};
    switch (norma) {
      case 'ONS':
        criteria = {
          z1: `${zonas.z1_percent}%`,
          z2: `${zonas.z2_percent}%`,
          z3: `${zonas.z3_percent}% ${z3_adj_available ? '(L+Adj)' : '(L)'}`,
          z4: zonas.z4_habilitada ? `${zonas.z4_percent}% ${zonas.z4_reversa ? 'Rev' : 'Fwd'}` : 'Desabilitada',
          texto_z1: `Conforme preconizado nos **Procedimentos de Rede (Submódulo 2.7)** do ONS, a Zona 1 foi ajustada em **${zonas.z1_percent}%** da impedância da linha. Esta margem de ${100 - zonas.z1_percent}% visa compensar erros de TCs, TPs e imprecisões nos dados de parâmetros de linha (R e X).`,
          texto_z2: `A Zona 2 foi ajustada em **${zonas.z2_percent}%** da impedância da linha, assegurando cobertura total com tempo de atuação coordenado (${zonas.z2_tempo}ms).`,
          texto_z3: `A Zona 3 foi ajustada para ${zonas.z3_percent}% da impedância ${z3_adj_available ? 'total (linha + adjacente)' : 'da linha'}, proporcionando proteção de retaguarda remota.`
        };
        break;
      case 'COES':
        criteria = {
          z1: `${zonas.z1_percent}%`,
          z2: `${zonas.z2_percent}%`,
          z3: `${zonas.z3_percent}% ${z3_adj_available ? '(L+Adj)' : '(L)'}`,
          z4: zonas.z4_habilitada ? `${zonas.z4_percent}% ${zonas.z4_reversa ? 'Rev' : 'Fwd'}` : 'Desabilitada',
          texto_z1: `Em estrito cumprimento ao **Procedimiento Técnico PR-20** do COES (Peru), a Zona 1 foi ajustada em **${zonas.z1_percent}%** da impedância de sequência positiva da linha. Este ajuste visa mitigar o risco de sobrealcance transitório (transient overreach), garantindo seletividade absoluta para faltas internas.`,
          texto_z2: `A Zona 2 foi ajustada em **${zonas.z2_percent}%** da impedância da linha. Conforme exigência do COES, este alcance foi validado através de simulação de falta deslizante.`,
          texto_z3: `A Zona 3 foi calculada como ${zonas.z3_percent}% da ${z3_adj_available ? 'soma vetorial da linha protegida com a linha adjacente' : 'impedância da linha'}, conforme procedimento PR-20.`,
          validacao_obrigatoria: true
        };
        break;
      case 'IEEE':
        criteria = {
          z1: `${zonas.z1_percent}%`,
          z2: `${zonas.z2_percent}%`,
          z3: `${zonas.z3_percent}% ${z3_adj_available ? '(L+Adj)' : '(L)'}`,
          z4: zonas.z4_habilitada ? `${zonas.z4_percent}% ${zonas.z4_reversa ? 'Rev' : 'Fwd'}` : 'Desabilitada',
          texto_z1: `Baseado no guia **IEEE Std C37.113**, a Zona 1 foi ajustada em **${zonas.z1_percent}%** da impedância da linha, ${zonas.z1_percent >= 85 ? 'maximizando a cobertura instantânea' : 'com margem conservadora de segurança'}.`,
          texto_z2: `A Zona 2 foi ajustada em **${zonas.z2_percent}%** da impedância da linha, considerando a injeção de corrente (Infeed) do terminal remoto.`,
          texto_z3: `A Zona 3 foi ajustada para ${zonas.z3_percent}% da impedância ${z3_adj_available ? 'total (linha + adjacente)' : 'da linha'}, com verificação de loadability.`
        };
        break;
      default:
        criteria = {
          z1: `${zonas.z1_percent}%`,
          z2: `${zonas.z2_percent}%`,
          z3: `${zonas.z3_percent}%`,
          z4: zonas.z4_habilitada ? `${zonas.z4_percent}% ${zonas.z4_reversa ? 'Rev' : 'Fwd'}` : 'Desabilitada',
          texto_z1: `Zona 1 ajustada em ${zonas.z1_percent}% da impedância da linha.`,
          texto_z2: `Zona 2 ajustada em ${zonas.z2_percent}% da impedância da linha.`,
          texto_z3: `Zona 3 ajustada em ${zonas.z3_percent}% da impedância.`
        };
        break;
    }

    // 6. SOBRECORRENTE (50/51) - NÃO DIRECIONAL
    const I_sec_nom = I_carga_max / term.rtc;
    let ansi_51_pickup = norma === 'ONS' ? 1.2 * I_sec_nom : 1.25 * I_sec_nom;
    let ansi_50_pickup = 1.3 * ((term.icc_3f_max || 10000) / term.rtc);

    // 7. SOBRECORRENTE DIRECIONAL DE FASE (67)
    // 67 Forward (para frente - direção da linha)
    const ansi_67_pickup_fwd = norma === 'ONS' ? 1.1 * I_sec_nom // ONS: 110% da corrente de carga
    : 1.15 * I_sec_nom; // COES/IEEE: 115%

    // 67 Reverse (reversa - direção da barra)
    const ansi_67_pickup_rev = 1.1 * I_sec_nom;

    // Ângulo de Torque Máximo (MTA) - 67
    // Tipicamente -45° para faltas atrás, +45° para faltas à frente
    const ansi_67_mta = Z1_sec_ang; // Usa o ângulo da linha como referência
    const ansi_67_rca = 75; // Relay Characteristic Angle (típico 75°)

    // 8. SOBRECORRENTE DE NEUTRO/TERRA (50N/51N)
    let ansi_51n_pickup = Math.min(0.3 * I_sec_nom,
    // 30% da corrente nominal
    0.2 * ((term.icc_1f_min || 500) / term.rtc) // 20% da menor corrente de falta fase-terra
    );
    let ansi_50n_pickup = 0.5 * ((term.icc_1f_min || 500) / term.rtc); // 50% do Icc 1F mínimo

    // 9. SOBRECORRENTE DIRECIONAL DE NEUTRO (67N)
    // 67N Forward
    const ansi_67n_pickup_fwd = norma === 'ONS' ? 0.1 * I_sec_nom // ONS: mais sensível (10%)
    : 0.15 * I_sec_nom; // COES/IEEE: 15%

    // 67N Reverse  
    const ansi_67n_pickup_rev = 0.15 * I_sec_nom;

    // Polarização 67N - Usa configuração do usuário ou default por norma
    // Opções: V0 (tensão residual), I0 (corrente residual), V2 (seq. negativa), Dual
    const ansi_67n_polarization = term.polarizacao_67n || (norma === 'ONS' ? 'V0' : 'DUAL');

    // Direção principal 67 - Usa configuração do usuário
    const ansi_67_direction = term.direcao_67 || 'FWD';

    // Ângulo de Torque Máximo (MTA) - 67N
    // Para faltas à terra, tipicamente usa-se o ângulo de Z0
    const z0_ang = getModAng(z0_line_c).ang;
    const ansi_67n_mta = z0_ang;
    const ansi_67n_rca = 60; // RCA para terra (típico 60°)

    // Fator de compensação de sequência zero para 67N (k0)
    // Já calculado acima como K0_mod e K0_ang

    // 10. CURVAS DE TEMPO
    const curve_51 = {
      type: 'IEC VI',
      TMS: 0.1
    };
    const curve_51n = {
      type: 'IEC EI',
      TMS: 0.05
    };
    const curve_67 = {
      type: 'IEC VI',
      TMS: 0.15
    };
    const curve_67n = {
      type: 'IEC EI',
      TMS: 0.08
    };

    // 11. TEMPOS DEFINIDOS (para elementos instantâneos)
    const time_50 = 0.00; // Instantâneo
    const time_50n = 0.00;
    const time_67_inst = 0.05; // 50ms para direcional
    const time_67n_inst = 0.05;

    // ═══════════════════════════════════════════════════════════════════════════
    // 12. CÁLCULO DA FUNÇÃO 87L (DIFERENCIAL DE LINHA)
    // ═══════════════════════════════════════════════════════════════════════════

    // Passo A: Calcular a Corrente de Carregamento (Charging Current)
    // Fórmula: I_chg = (V_fase) * (B_total_Siemens)
    // V_fase = (V_nom * 1000) / sqrt(3)
    // B_total = (susceptancia_b1 * 1e-6) * L_km

    const v_fase = V_nom * 1000 / Math.sqrt(3);
    const b_total = susceptancia_b1 * 1e-6 * linha_comprimento;
    const i_charging_prim = v_fase * b_total; // Corrente capacitiva total primária

    // Passo B: Definir o Pickup Mínimo (87L Sensitivity)
    // Critério 1: Deve ser maior que a corrente de carregamento (Margem 1.5x a 2.5x)
    // Critério 2: Sensibilidade mínima de hardware (geralmente 0.2 * In_TC)

    let factor_safety_87l = 1.5; // Margem padrão IEEE/ONS para evitar disparo na energização
    if (norma === 'COES') factor_safety_87l = 2.0; // COES costuma ser mais conservador

    const pickup_calc_charge = i_charging_prim * factor_safety_87l;
    const pickup_min_hardware = 0.2 * (term.in_tc_primario || 1200);

    // O Pickup final é o MAIOR valor entre a restrição capacitiva e a sensibilidade do hardware
    const ansi_87l_pickup = Math.max(pickup_calc_charge, pickup_min_hardware);

    // Passo C: Pickup em porcentagem da corrente nominal do TC
    const ansi_87l_pickup_pu = ansi_87l_pickup / (term.in_tc_primario || 1200) * 100;

    // Passo D: Ajuste de Slope (Declividade) - Valores Típicos por Norma
    // Slope 1: Para erros de TC em baixas correntes (20-30%)
    // Slope 2: Para saturação em altas correntes (50-80%)
    let ansi_87l_slope1 = 30; // % default
    let ansi_87l_slope2 = 60; // % default

    if (norma === 'ONS') {
      ansi_87l_slope1 = 25;
      ansi_87l_slope2 = 60;
    } else if (norma === 'COES') {
      ansi_87l_slope1 = 30;
      ansi_87l_slope2 = 70;
    } else {
      // IEEE
      ansi_87l_slope1 = 20;
      ansi_87l_slope2 = 50;
    }

    // Passo E: Breakpoint (ponto de transição entre slopes)
    // Geralmente em 2-3x a corrente nominal
    const ansi_87l_breakpoint = 2.5 * (term.in_tc_primario || 1200);

    // Passo F: Tempo de operação (típico para 87L)
    const time_87l = 0.020; // 20ms (1 ciclo em 50Hz)

    // ═══════════════════════════════════════════════════════════════════════════

    return {
      terminal: termName,
      K_conv: Number(K_conv.toFixed(6)),
      z1_line_sec: {
        mod: Number(Z1_sec_mod.toFixed(4)),
        ang: Number(Z1_sec_ang.toFixed(2))
      },
      z0_line_sec: {
        mod: Number(getModAng(z0_line_c).mod.toFixed(4)),
        ang: Number(z0_ang.toFixed(2))
      },
      z1_reach: Number(z1_reach.toFixed(4)),
      z2_reach: Number(z2_reach.toFixed(4)),
      z3_reach: Number(z3_reach.toFixed(4)),
      z4_reach: Number(z4_reach.toFixed(4)),
      z4_direction,
      z4_habilitada: zonas.z4_habilitada,
      z4_reversa: zonas.z4_reversa,
      z1_time,
      z2_time,
      z3_time,
      z4_time,
      // 50/51 (Fase - Não Direcional)
      ansi_51_pickup: Number(ansi_51_pickup.toFixed(3)),
      ansi_50_pickup: Number(ansi_50_pickup.toFixed(2)),
      curve_51,
      time_50,
      // 67 (Fase - Direcional)
      ansi_67_pickup_fwd: Number(ansi_67_pickup_fwd.toFixed(3)),
      ansi_67_pickup_rev: Number(ansi_67_pickup_rev.toFixed(3)),
      ansi_67_direction,
      ansi_67_mta: Number(ansi_67_mta.toFixed(1)),
      ansi_67_rca: ansi_67_rca,
      curve_67,
      time_67_inst,
      // 50N/51N (Neutro - Não Direcional)
      ansi_51n_pickup: Number(ansi_51n_pickup.toFixed(3)),
      ansi_50n_pickup: Number(ansi_50n_pickup.toFixed(3)),
      curve_51n,
      time_50n,
      // 67N (Neutro - Direcional)
      ansi_67n_pickup_fwd: Number(ansi_67n_pickup_fwd.toFixed(3)),
      ansi_67n_pickup_rev: Number(ansi_67n_pickup_rev.toFixed(3)),
      ansi_67n_polarization,
      ansi_67n_mta: Number(ansi_67n_mta.toFixed(1)),
      ansi_67n_rca: ansi_67n_rca,
      curve_67n,
      time_67n_inst,
      // Compensação K0
      k0_modulo: Number(K0_mod.toFixed(4)),
      k0_angulo: Number(K0_ang.toFixed(2)),
      // 87L (Diferencial de Linha)
      ansi_87l_pickup: Number(ansi_87l_pickup.toFixed(2)),
      ansi_87l_pickup_pu: Number(ansi_87l_pickup_pu.toFixed(1)),
      ansi_87l_slope1,
      ansi_87l_slope2,
      ansi_87l_breakpoint: Number(ansi_87l_breakpoint.toFixed(0)),
      i_charging_ref: Number(i_charging_prim.toFixed(2)),
      time_87l,
      in_tc_primario: term.in_tc_primario || 1200,
      criteria
    };
  };
  const setA = calculateTerminal(terminal_A, 'Terminal A (Local)', zonasA);
  const setB = calculateTerminal(terminal_B, 'Terminal B (Remoto)', zonasB);

  // 7. SLIDING FAULT ANALYSIS (VALIDAÇÃO)
  const slidingPoints = [1, 20, 50, 80, 99];
  const z1_line_prim = toRect(Z1_mod, Z1_ang);
  const validation = slidingPoints.map(p => {
    const fraction = p / 100;
    const z_fault_prim = complexScale(z1_line_prim, fraction);

    // Terminal A vê a falta
    const K_conv_A = terminal_A.rtc / terminal_A.rtp;
    const z_fault_sec_A = complexScale(z_fault_prim, K_conv_A);
    const {
      mod: Z_seen_A
    } = getModAng(z_fault_sec_A);

    // Terminal B vê a falta (do outro lado)
    const K_conv_B = terminal_B.rtc / terminal_B.rtp;
    const z_fault_sec_B = complexScale(z_fault_prim, K_conv_B);
    const z_remaining_B = complexScale(z1_line_prim, 1 - fraction);
    const z_seen_from_B = complexScale(z_remaining_B, K_conv_B);
    const {
      mod: Z_seen_B
    } = getModAng(z_seen_from_B);

    // Determinar zona de atuação
    const getZone = (z_seen, settings) => {
      if (z_seen <= settings.z1_reach) return {
        zone: 'Z1',
        time: settings.z1_time,
        status: 'OK'
      };
      if (z_seen <= settings.z2_reach) return {
        zone: 'Z2',
        time: settings.z2_time,
        status: 'OK'
      };
      if (z_seen <= settings.z3_reach) return {
        zone: 'Z3',
        time: settings.z3_time,
        status: 'BACKUP'
      };
      return {
        zone: 'FORA',
        time: null,
        status: 'FAIL'
      };
    };
    const resultA = getZone(Z_seen_A, setA);
    const resultB = getZone(Z_seen_B, setB);

    // Verificar expectativa baseada no alcance configurado (DINÂMICO)
    // Terminal A usa suas próprias zonas, Terminal B usa as dele
    let expectedZoneA = p <= zonasA.z1_percent ? 'Z1' : 'Z2';
    let expectedZoneB = 100 - p <= zonasB.z1_percent ? 'Z1' : 'Z2';
    return {
      percent: p,
      distance_km: Number((fraction * linha_comprimento).toFixed(2)),
      terminal_A: {
        z_seen: Number(Z_seen_A.toFixed(4)),
        ...resultA,
        expected: expectedZoneA,
        match: resultA.zone === expectedZoneA || resultA.zone === 'Z2' && expectedZoneA === 'Z1'
      },
      terminal_B: {
        z_seen: Number(Z_seen_B.toFixed(4)),
        ...resultB,
        expected: expectedZoneB,
        match: resultB.zone === expectedZoneB || resultB.zone === 'Z2' && expectedZoneB === 'Z1'
      }
    };
  });
  return {
    terminal_A: setA,
    terminal_B: setB,
    validation
  };
};

// ═══════════════════════════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

const InputField = ({
  label,
  value,
  onChange,
  unit,
  type = "number",
  step = "any",
  min,
  placeholder
}) => /*#__PURE__*/React.createElement("div", {
  className: "input-group"
}, /*#__PURE__*/React.createElement("label", null, label), /*#__PURE__*/React.createElement("div", {
  className: "input-wrapper"
}, /*#__PURE__*/React.createElement("input", {
  type: type,
  value: value,
  onChange: e => onChange(type === "number" ? parseFloat(e.target.value) || 0 : e.target.value),
  step: step,
  min: min,
  placeholder: placeholder
}), unit && /*#__PURE__*/React.createElement("span", {
  className: "unit"
}, unit)));
const SelectField = ({
  label,
  value,
  onChange,
  options
}) => /*#__PURE__*/React.createElement("div", {
  className: "input-group"
}, /*#__PURE__*/React.createElement("label", null, label), /*#__PURE__*/React.createElement("select", {
  value: value,
  onChange: e => onChange(e.target.value)
}, options.map(opt => /*#__PURE__*/React.createElement("option", {
  key: opt.value,
  value: opt.value
}, opt.label))));
const TabButton = ({
  active,
  onClick,
  icon: Icon,
  label,
  badge
}) => /*#__PURE__*/React.createElement("button", {
  className: `tab-btn ${active ? 'active' : ''}`,
  onClick: onClick
}, /*#__PURE__*/React.createElement(Icon, {
  size: 18
}), /*#__PURE__*/React.createElement("span", null, label), badge && /*#__PURE__*/React.createElement("span", {
  className: "badge"
}, badge));
const ResultCard = ({
  title,
  value,
  unit,
  highlight
}) => /*#__PURE__*/React.createElement("div", {
  className: `result-card ${highlight ? 'highlight' : ''}`
}, /*#__PURE__*/React.createElement("span", {
  className: "result-title"
}, title), /*#__PURE__*/React.createElement("span", {
  className: "result-value"
}, value), /*#__PURE__*/React.createElement("span", {
  className: "result-unit"
}, unit));

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APPLICATION
// ═══════════════════════════════════════════════════════════════════════════════

function SEPApp() {
  const [activeTab, setActiveTab] = useState(0);
  const [results, setResults] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Estado para Coordenograma
  const [coordFaltas, setCoordFaltas] = useState([{
    id: 1,
    nome: 'F1',
    local_pct: 50,
    rf_pri: 0,
    tipo: '3PH',
    ativo: true
  }, {
    id: 2,
    nome: 'F2',
    local_pct: 80,
    rf_pri: 5,
    tipo: '1PH',
    ativo: true
  }]);
  const [coordConfig, setCoordConfig] = useState({
    showZ1: true,
    showZ2: true,
    showZ3: true,
    showZ4: true,
    showGrid: true,
    showLabels: true,
    autoZoom: true
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // CADASTROS (Relés, Clientes, Engenheiros)
  // ═══════════════════════════════════════════════════════════════════════════

  const [clientes, setClientes] = useState(() => {
    const saved = localStorage.getItem('sep_clientes');
    return saved ? JSON.parse(saved) : [{
      id: 1,
      nome: 'CEMIG',
      cnpj: '17.155.730/0001-64',
      contato: 'eng@cemig.com.br',
      telefone: '(31) 3506-5000',
      logo: null
    }, {
      id: 2,
      nome: 'COPEL',
      cnpj: '76.483.817/0001-20',
      contato: 'protecao@copel.com',
      telefone: '(41) 3310-5000',
      logo: null
    }];
  });
  const [engenheiros, setEngenheiros] = useState(() => {
    const saved = localStorage.getItem('sep_engenheiros');
    return saved ? JSON.parse(saved) : [{
      id: 1,
      nome: 'João Silva',
      crea: 'CREA-MG 123456',
      especialidade: 'Proteção de LTs',
      email: 'joao.silva@empresa.com',
      foto: null,
      assinatura: null
    }, {
      id: 2,
      nome: 'Maria Santos',
      crea: 'CREA-SP 789012',
      especialidade: 'Automação de SEs',
      email: 'maria.santos@empresa.com',
      foto: null,
      assinatura: null
    }];
  });
  const [reles, setReles] = useState(() => {
    const saved = localStorage.getItem('sep_reles');
    return saved ? JSON.parse(saved) : [{
      id: 1,
      fabricante: 'SEL',
      modelo: 'SEL-411L',
      tipo: 'Diferencial de Linha',
      funcoes: '87L, 21, 67N, 50/51',
      comunicacao: 'IEC 61850, DNP3',
      notas: 'Suporta até 4 terminais'
    }, {
      id: 2,
      fabricante: 'Siemens',
      modelo: '7SD5',
      tipo: 'Diferencial de Linha',
      funcoes: '87L, 21, 67, 50/51',
      comunicacao: 'IEC 61850',
      notas: 'Linha SIPROTEC 5'
    }, {
      id: 3,
      fabricante: 'ABB',
      modelo: 'REL670',
      tipo: 'Proteção de Distância',
      funcoes: '21, 67N, 50/51, 79',
      comunicacao: 'IEC 61850, LON',
      notas: 'Plataforma Relion'
    }, {
      id: 4,
      fabricante: 'GE',
      modelo: 'L90',
      tipo: 'Diferencial de Linha',
      funcoes: '87L, 21, 67, 50/51, 79',
      comunicacao: 'IEC 61850, Mirrored Bits',
      notas: 'Multilin série UR'
    }, {
      id: 5,
      fabricante: 'SEL',
      modelo: 'SEL-421',
      tipo: 'Proteção de Distância',
      funcoes: '21, 67, 50/51, 79, 81',
      comunicacao: 'IEC 61850, DNP3, Mirrored Bits',
      notas: 'Alta velocidade'
    }];
  });

  // Estados para modais de cadastro
  const [modalCadastro, setModalCadastro] = useState({
    open: false,
    tipo: null,
    editando: null
  });
  const [formCadastro, setFormCadastro] = useState({});

  // Salvar cadastros no localStorage quando mudarem
  useEffect(() => {
    localStorage.setItem('sep_clientes', JSON.stringify(clientes));
  }, [clientes]);
  useEffect(() => {
    localStorage.setItem('sep_engenheiros', JSON.stringify(engenheiros));
  }, [engenheiros]);
  useEffect(() => {
    localStorage.setItem('sep_reles', JSON.stringify(reles));
  }, [reles]);

  // Funções de CRUD
  const abrirModalCadastro = (tipo, item = null) => {
    setModalCadastro({
      open: true,
      tipo,
      editando: item
    });
    if (item) {
      setFormCadastro({
        ...item
      });
    } else {
      // Valores padrão por tipo
      if (tipo === 'cliente') setFormCadastro({
        nome: '',
        cnpj: '',
        contato: '',
        telefone: '',
        logo: null
      });else if (tipo === 'engenheiro') setFormCadastro({
        nome: '',
        crea: '',
        especialidade: '',
        email: '',
        foto: null,
        assinatura: null
      });else if (tipo === 'rele') setFormCadastro({
        fabricante: '',
        modelo: '',
        tipo: '',
        funcoes: '',
        comunicacao: '',
        notas: ''
      });
    }
  };
  const fecharModal = () => {
    setModalCadastro({
      open: false,
      tipo: null,
      editando: null
    });
    setFormCadastro({});
  };
  const salvarCadastro = () => {
    const {
      tipo,
      editando
    } = modalCadastro;
    if (tipo === 'cliente') {
      if (editando) {
        setClientes(clientes.map(c => c.id === editando.id ? {
          ...formCadastro,
          id: editando.id
        } : c));
      } else {
        setClientes([...clientes, {
          ...formCadastro,
          id: Date.now()
        }]);
      }
    } else if (tipo === 'engenheiro') {
      if (editando) {
        setEngenheiros(engenheiros.map(e => e.id === editando.id ? {
          ...formCadastro,
          id: editando.id
        } : e));
      } else {
        setEngenheiros([...engenheiros, {
          ...formCadastro,
          id: Date.now()
        }]);
      }
    } else if (tipo === 'rele') {
      if (editando) {
        setReles(reles.map(r => r.id === editando.id ? {
          ...formCadastro,
          id: editando.id
        } : r));
      } else {
        setReles([...reles, {
          ...formCadastro,
          id: Date.now()
        }]);
      }
    }
    fecharModal();
  };
  const excluirCadastro = (tipo, id) => {
    if (!confirm('Deseja realmente excluir este registro?')) return;
    if (tipo === 'cliente') setClientes(clientes.filter(c => c.id !== id));else if (tipo === 'engenheiro') setEngenheiros(engenheiros.filter(e => e.id !== id));else if (tipo === 'rele') setReles(reles.filter(r => r.id !== id));
  };

  // Função para upload de imagem no cadastro
  const handleImageUploadCadastro = field => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
      const file = e.target.files?.[0];
      if (file) {
        // Limitar tamanho a 500KB para não sobrecarregar localStorage
        if (file.size > 500000) {
          alert('Imagem muito grande. Por favor, use uma imagem menor que 500KB.');
          return;
        }
        const reader = new FileReader();
        reader.onload = ev => {
          setFormCadastro(prev => ({
            ...prev,
            [field]: ev.target?.result
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };
  const removerImagemCadastro = field => {
    setFormCadastro(prev => ({
      ...prev,
      [field]: null
    }));
  };

  // ═══════════════════════════════════════════════════════════════════════════

  // Project & Line Data
  const [projeto, setProjeto] = useState({
    cliente: '',
    cliente_id: null,
    engenheiro: '',
    engenheiro_id: null,
    rele_a_id: null,
    rele_b_id: null,
    data: new Date().toISOString().split('T')[0],
    revisao: '00',
    linha_nome: '',
    linha_comprimento: 100,
    V_nom: 230,
    norma: 'ONS',
    idioma: 'pt-BR'
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // ZONAS DE PROTEÇÃO DE DISTÂNCIA (FUNÇÃO 21)
  // Configurações de alcance conforme normas COES/IEEE/ONS
  // Separadas por terminal (A e B) para flexibilidade em casos de assimetria
  // ═══════════════════════════════════════════════════════════════════════════════
  const defaultZonas = {
    z1_percent: 80,
    // Zona 1 - Instantânea (Subalcance)
    z2_percent: 120,
    // Zona 2 - Sobrealcance
    z3_percent: 150,
    // Zona 3 - Backup Remoto Forward (sempre habilitada)
    z4_percent: 20,
    // Zona 4 - Opcional (Reversa ou Forward)
    z1_tempo: 0,
    // Tempo Z1 (ms) - instantâneo
    z2_tempo: 400,
    // Tempo Z2 (ms)
    z3_tempo: 1200,
    // Tempo Z3 (ms)
    z4_tempo: 1000,
    // Tempo Z4 (ms)
    z4_habilitada: true,
    // Z4 pode ser desabilitada (opcional)
    z4_reversa: true // Z4 pode ser reversa (true) ou forward (false)
  };
  const [zonasTerminalA, setZonasTerminalA] = useState({
    ...defaultZonas
  });
  const [zonasTerminalB, setZonasTerminalB] = useState({
    ...defaultZonas
  });
  const [zonasVinculadas, setZonasVinculadas] = useState(true); // Por padrão, A e B são iguais
  const [terminalAtivoZonas, setTerminalAtivoZonas] = useState('A'); // Tab ativo na UI

  // Alias para compatibilidade - aponta para A quando vinculado
  const zonasProtecao = zonasTerminalA;
  const setZonasProtecao = novasZonas => {
    const zonas = typeof novasZonas === 'function' ? novasZonas(zonasTerminalA) : novasZonas;
    setZonasTerminalA(zonas);
    if (zonasVinculadas) setZonasTerminalB(zonas);
  };

  // Padrões por norma para zonas de proteção
  const padraoZonasPorNorma = {
    'COES': {
      z1: 80,
      z2: 120,
      z3: 220,
      z4: 20,
      z1t: 0,
      z2t: 400,
      z3t: 1200,
      z4t: 1000
    },
    'ONS': {
      z1: 80,
      z2: 120,
      z3: 150,
      z4: 25,
      z1t: 0,
      z2t: 350,
      z3t: 1000,
      z4t: 800
    },
    'IEEE': {
      z1: 85,
      z2: 125,
      z3: 200,
      z4: 25,
      z1t: 0,
      z2t: 400,
      z3t: 1200,
      z4t: 1000
    },
    'IEC': {
      z1: 80,
      z2: 120,
      z3: 180,
      z4: 20,
      z1t: 0,
      z2t: 400,
      z3t: 1500,
      z4t: 1000
    }
  };
  const aplicarPadraoZonas = norma => {
    const padrao = padraoZonasPorNorma[norma] || padraoZonasPorNorma['COES'];
    const novasZonas = {
      z1_percent: padrao.z1,
      z2_percent: padrao.z2,
      z3_percent: padrao.z3,
      z4_percent: padrao.z4,
      z1_tempo: padrao.z1t,
      z2_tempo: padrao.z2t,
      z3_tempo: padrao.z3t,
      z4_tempo: padrao.z4t,
      z4_habilitada: true,
      z4_reversa: true
    };
    setZonasTerminalA(novasZonas);
    setZonasTerminalB(novasZonas);
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // DADOS DE CURTO-CIRCUITO (FAULT DATA)
  // Valores de corrente para validação de sensibilidade
  // ═══════════════════════════════════════════════════════════════════════════════
  const [faultData, setFaultData] = useState({
    unidade: 'kA',
    // 'kA' ou 'A'
    // Falta Local (0% da Linha - Bus Local)
    local_3f: 25.0,
    // Trifásico (kA)
    local_2f: 21.7,
    // Bifásico (kA) - aprox √3/2 * 3f
    local_1f: 20.0,
    // Monofásico Franco (kA)
    local_1f_res: 8.5,
    // Monofásico Resistivo (kA)
    // Falta Remota (100% da Linha - Bus Remoto)
    remota_3f: 15.0,
    remota_2f: 13.0,
    remota_1f: 12.0,
    remota_1f_res: 4.2,
    // Falta Resistiva Crítica (cenário customizável)
    critica_localizacao: 80,
    // % da linha
    critica_rf: 50,
    // Resistência de falta (Ohms)
    critica_3i0: 0.350,
    // 3I0 calculado (kA)
    // Ajustes de Pickup para validação
    pickup_67n: 0.400,
    // Pickup 67N em kA (primário)
    pickup_50n: 2.0,
    // Pickup 50N em kA
    pickup_51n: 0.300 // Pickup 51N em kA
  });

  // Função para converter entre kA e A
  const convertFaultValue = (value, fromUnit, toUnit) => {
    if (fromUnit === toUnit) return value;
    if (fromUnit === 'kA' && toUnit === 'A') return value * 1000;
    if (fromUnit === 'A' && toUnit === 'kA') return value / 1000;
    return value;
  };

  // Validar sensibilidade do relé
  const validarSensibilidade = (corrente, pickup) => {
    const correnteKA = faultData.unidade === 'A' ? corrente / 1000 : corrente;
    const ratio = correnteKA / pickup;
    if (ratio < 1) return {
      status: 'FALHA',
      cor: '#ef4444',
      msg: 'Falta NÃO detectada! Zona Morta.'
    };
    if (ratio < 1.3) return {
      status: 'MARGINAL',
      cor: '#f59e0b',
      msg: 'Margem baixa (<30%). Considere teleproteção.'
    };
    if (ratio < 2.0) return {
      status: 'OK',
      cor: '#22c55e',
      msg: 'Sensibilidade adequada.'
    };
    return {
      status: 'EXCELENTE',
      cor: '#3b82f6',
      msg: 'Excelente margem de sensibilidade.'
    };
  };

  // Line Impedance
  const [linha, setLinha] = useState({
    R1: 0.025,
    X1: 0.30,
    R0: 0.10,
    X0: 0.90,
    Z_adj_R: 0.02,
    Z_adj_X: 0.25,
    susceptancia_b1: 3.5 // microSiemens/km (típico para linhas de 230kV)
  });

  // Terminals
  const [terminalA, setTerminalA] = useState({
    nome: 'SE LOCAL',
    rtc: 2000,
    rtp: 2000,
    icc_3f_max: 25000,
    icc_1f_min: 3500,
    I_carga_max: 800,
    polarizacao_67n: 'V0',
    direcao_67: 'FWD',
    in_tc_primario: 1200 // Corrente nominal primária do TC para 87L
  });
  const [terminalB, setTerminalB] = useState({
    nome: 'SE REMOTA',
    rtc: 1500,
    rtp: 2000,
    icc_3f_max: 20000,
    icc_1f_min: 3000,
    I_carga_max: 800,
    polarizacao_67n: 'V0',
    direcao_67: 'FWD',
    in_tc_primario: 1200 // Corrente nominal primária do TC para 87L
  });

  // Calculate impedance module and angle from R and X
  const calcImpedance = (R, X) => {
    const mod = Math.sqrt(R * R + X * X) * projeto.linha_comprimento;
    const ang = Math.atan2(X, R) * 180 / Math.PI;
    return {
      mod,
      ang
    };
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // REATIVIDADE AUTOMÁTICA - SINGLE SOURCE OF TRUTH
  // Recalcula automaticamente quando os parâmetros das zonas mudarem
  // ═══════════════════════════════════════════════════════════════════════════════

  // Função de cálculo reutilizável (para evitar duplicação)
  const calcularProtecao = useCallback(() => {
    const z1 = calcImpedance(linha.R1, linha.X1);
    const z0 = calcImpedance(linha.R0, linha.X0);
    const z_adj = {
      mod: Math.sqrt(linha.Z_adj_R ** 2 + linha.Z_adj_X ** 2) * 50,
      ang: Math.atan2(linha.Z_adj_X, linha.Z_adj_R) * 180 / Math.PI
    };
    const inputs = {
      V_nom: projeto.V_nom,
      Z1_mod: z1.mod,
      Z1_ang: z1.ang,
      Z0_mod: z0.mod,
      Z0_ang: z0.ang,
      Z_adj_mod: z_adj.mod,
      Z_adj_ang: z_adj.ang,
      norma: projeto.norma,
      susceptancia_b1: linha.susceptancia_b1,
      terminal_A: {
        rtc: terminalA.rtc,
        rtp: terminalA.rtp,
        icc_3f_max: terminalA.icc_3f_max,
        icc_1f_min: terminalA.icc_1f_min,
        polarizacao_67n: terminalA.polarizacao_67n,
        direcao_67: terminalA.direcao_67,
        in_tc_primario: terminalA.in_tc_primario
      },
      terminal_B: {
        rtc: terminalB.rtc,
        rtp: terminalB.rtp,
        icc_3f_max: terminalB.icc_3f_max,
        icc_1f_min: terminalB.icc_1f_min,
        polarizacao_67n: terminalB.polarizacao_67n,
        direcao_67: terminalB.direcao_67,
        in_tc_primario: terminalB.in_tc_primario
      },
      I_carga_max: terminalA.I_carga_max,
      linha_comprimento: projeto.linha_comprimento,
      zonasConfig: zonasTerminalA,
      // Legacy fallback
      zonasConfigA: zonasTerminalA,
      // Zonas específicas do Terminal A
      zonasConfigB: zonasTerminalB // Zonas específicas do Terminal B
    };
    return calculateProtectionSettings(inputs);
  }, [linha, projeto, terminalA, terminalB, zonasTerminalA, zonasTerminalB]);

  // Auto-recálculo quando zonas de A ou B mudarem (se já houver resultados)
  useEffect(() => {
    if (results) {
      const novoCalculo = calcularProtecao();
      setResults(novoCalculo);
    }
  }, [zonasTerminalA, zonasTerminalB]);

  // Valores calculados em tempo real (para exibição prévia)
  const [previewCalc, setPreviewCalc] = useState(null);
  useEffect(() => {
    // Calcula preview sempre que os parâmetros mudarem
    try {
      const preview = calcularProtecao();
      setPreviewCalc(preview);
    } catch (e) {
      // Silenciosamente ignora erros de cálculo durante edição
      console.warn('Preview calc error:', e.message);
    }
  }, [linha, projeto, terminalA, terminalB, zonasTerminalA, zonasTerminalB]);
  const handleCalculate = () => {
    const z1 = calcImpedance(linha.R1, linha.X1);
    const z0 = calcImpedance(linha.R0, linha.X0);
    const z_adj = {
      mod: Math.sqrt(linha.Z_adj_R ** 2 + linha.Z_adj_X ** 2) * 50,
      // Assumindo 50km adjacente
      ang: Math.atan2(linha.Z_adj_X, linha.Z_adj_R) * 180 / Math.PI
    };
    const inputs = {
      V_nom: projeto.V_nom,
      Z1_mod: z1.mod,
      Z1_ang: z1.ang,
      Z0_mod: z0.mod,
      Z0_ang: z0.ang,
      Z_adj_mod: z_adj.mod,
      Z_adj_ang: z_adj.ang,
      norma: projeto.norma,
      susceptancia_b1: linha.susceptancia_b1,
      terminal_A: {
        rtc: terminalA.rtc,
        rtp: terminalA.rtp,
        icc_3f_max: terminalA.icc_3f_max,
        icc_1f_min: terminalA.icc_1f_min,
        polarizacao_67n: terminalA.polarizacao_67n,
        direcao_67: terminalA.direcao_67,
        in_tc_primario: terminalA.in_tc_primario
      },
      terminal_B: {
        rtc: terminalB.rtc,
        rtp: terminalB.rtp,
        icc_3f_max: terminalB.icc_3f_max,
        icc_1f_min: terminalB.icc_1f_min,
        polarizacao_67n: terminalB.polarizacao_67n,
        direcao_67: terminalB.direcao_67,
        in_tc_primario: terminalB.in_tc_primario
      },
      I_carga_max: terminalA.I_carga_max,
      linha_comprimento: projeto.linha_comprimento,
      // ═══════════════════════════════════════════════════════════════════════════
      // SINGLE SOURCE OF TRUTH: Configuração de Zonas de Proteção
      // Os valores definidos na aba "Projeto & Linha" propagam para todos os cálculos
      // ═══════════════════════════════════════════════════════════════════════════
      zonasConfig: zonasTerminalA,
      zonasConfigA: zonasTerminalA,
      zonasConfigB: zonasTerminalB
    };
    const calc = calculateProtectionSettings(inputs);
    setResults(calc);
    setActiveTab(3);
  };
  const handleImageUpload = e => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => setUploadedImage(e.target?.result);
      reader.readAsDataURL(file);
    }
  };
  const handleDrop = useCallback(e => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => setUploadedImage(e.target?.result);
      reader.readAsDataURL(file);
    }
  }, []);
  const generateReport = () => {
    if (!results) return null;
    const labels = {
      'pt-BR': {
        title: 'MEMORIAL DE CÁLCULO - PROTEÇÃO DE DISTÂNCIA',
        client: 'Cliente',
        engineer: 'Engenheiro',
        line: 'Linha',
        standard: 'Norma',
        voltage: 'Tensão Nominal',
        length: 'Comprimento'
      },
      'es-ES': {
        title: 'MEMORIA DE CÁLCULO - PROTECCIÓN DE DISTANCIA',
        client: 'Cliente',
        engineer: 'Ingeniero',
        line: 'Línea',
        standard: 'Norma',
        voltage: 'Tensión Nominal',
        length: 'Longitud'
      },
      'en-US': {
        title: 'CALCULATION REPORT - DISTANCE PROTECTION',
        client: 'Client',
        engineer: 'Engineer',
        line: 'Line',
        standard: 'Standard',
        voltage: 'Nominal Voltage',
        length: 'Length'
      }
    };
    return labels[projeto.idioma] || labels['pt-BR'];
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // GERADOR DE MEMORIAL TÉCNICO COMPLETO (10 SEÇÕES) - TEMPLATE OFICIAL
  // ═══════════════════════════════════════════════════════════════════════════════

  const generateFullReport = () => {
    if (!results) return null;
    const terminalA_res = results.terminal_A;
    const terminalB_res = results.terminal_B;

    // Obter dados dos cadastros
    const clienteSelecionado = clientes.find(c => c.id === projeto.cliente_id);
    const engenheiroSelecionado = engenheiros.find(e => e.id === projeto.engenheiro_id);
    const releA = reles.find(r => r.id === projeto.rele_a_id);
    const releB = reles.find(r => r.id === projeto.rele_b_id);

    // Formatação
    const dateStr = new Date(projeto.data).toLocaleDateString(projeto.idioma === 'en-US' ? 'en-US' : projeto.idioma === 'es-ES' ? 'es-ES' : 'pt-BR');
    const clientName = clienteSelecionado?.nome || "[NOME DO CLIENTE]";
    const engName = engenheiroSelecionado?.nome || "[NOME DO ENGENHEIRO]";
    const engCrea = engenheiroSelecionado?.crea || "[CREA]";
    const lineName = projeto.linha_nome || `LT ${projeto.V_nom} kV [LOCAL]-[REMOTO]`;

    // Calcular impedâncias para exibição
    const Z1_total = Math.sqrt(linha.R1 ** 2 + linha.X1 ** 2) * projeto.linha_comprimento;
    const Z1_ang = Math.atan2(linha.X1, linha.R1) * 180 / Math.PI;
    const Z0_total = Math.sqrt(linha.R0 ** 2 + linha.X0 ** 2) * projeto.linha_comprimento;
    const Z0_ang = Math.atan2(linha.X0, linha.R0) * 180 / Math.PI;

    // ═══════════════════════════════════════════════════════════════════════════
    // SISTEMA DE TRADUÇÕES
    // ═══════════════════════════════════════════════════════════════════════════
    const idioma = projeto.idioma || 'pt-BR';
    const t = {
      // Títulos do documento
      memorial_titulo: {
        'pt-BR': `MEMORIAL DE CÁLCULO DE PROTEÇÃO - ${lineName}`,
        'es-ES': `MEMORIA DE CÁLCULO DE PROTECCIÓN - ${lineName}`,
        'en-US': `PROTECTION CALCULATION REPORT - ${lineName}`
      },
      estudo_projeto: {
        'pt-BR': `Estudo de Proteção e Seletividade da ${lineName}`,
        'es-ES': `Estudio de Protección y Selectividad de la ${lineName}`,
        'en-US': `Protection and Selectivity Study for ${lineName}`
      },
      local: {
        'pt-BR': 'Brasil',
        'es-ES': 'Perú',
        'en-US': 'USA'
      },
      // Seção 2 - Objetivo
      objetivo_texto: {
        'pt-BR': `O presente documento tem por objetivo apresentar a metodologia de cálculo, os critérios adotados e os resultados dos ajustes das funções de proteção (primária e retaguarda) para os relés numéricos instalados nos terminais da ${lineName}. O estudo visa garantir a detecção seletiva, rápida e sensível de curtos-circuitos, assegurando a integridade dos equipamentos e a estabilidade do Sistema Elétrico de Potência (SEP).`,
        'es-ES': `El presente documento tiene como objetivo presentar la metodología de cálculo, los criterios adoptados y los resultados de los ajustes de las funciones de protección (primaria y respaldo) para los relés numéricos instalados en los terminales de la ${lineName}. El estudio busca garantizar la detección selectiva, rápida y sensible de cortocircuitos, asegurando la integridad de los equipos y la estabilidad del Sistema Eléctrico de Potencia (SEP).`,
        'en-US': `This document aims to present the calculation methodology, adopted criteria, and results of protection function settings (primary and backup) for the numerical relays installed at the terminals of ${lineName}. The study aims to ensure selective, fast, and sensitive detection of short circuits, ensuring equipment integrity and Power System stability.`
      },
      // Seção 3 - Escopo
      escopo_texto: {
        'pt-BR': 'O escopo deste trabalho abrange a parametrização das seguintes funções de proteção para os terminais Local e Remoto:',
        'es-ES': 'El alcance de este trabajo abarca la parametrización de las siguientes funciones de protección para los terminales Local y Remoto:',
        'en-US': 'The scope of this work covers the parameterization of the following protection functions for the Local and Remote terminals:'
      },
      lista_funcoes: {
        'pt-BR': ["21/21N - Proteção de Distância de Fase e Terra (Mho/Quadrilateral)", "67N - Sobrecorrente Direcional de Terra (Polarização por 3V0/3I0)", "50/51 - Sobrecorrente de Fase (Instantânea e Temporizada)", "50N/51N - Sobrecorrente de Terra (Instantânea e Temporizada)", "87L - Proteção Diferencial de Linha (com compensação de capacitância)", "79 - Religamento Automático (Definição de Tempo Morto)"],
        'es-ES': ["21/21N - Protección de Distancia de Fase y Tierra (Mho/Cuadrilateral)", "67N - Sobrecorriente Direccional de Tierra (Polarización por 3V0/3I0)", "50/51 - Sobrecorriente de Fase (Instantánea y Temporizada)", "50N/51N - Sobrecorriente de Tierra (Instantánea y Temporizada)", "87L - Protección Diferencial de Línea (con compensación de capacitancia)", "79 - Recierre Automático (Definición de Tiempo Muerto)"],
        'en-US': ["21/21N - Phase and Ground Distance Protection (Mho/Quadrilateral)", "67N - Directional Ground Overcurrent (3V0/3I0 Polarization)", "50/51 - Phase Overcurrent (Instantaneous and Time-delayed)", "50N/51N - Ground Overcurrent (Instantaneous and Time-delayed)", "87L - Line Differential Protection (with capacitance compensation)", "79 - Automatic Reclosing (Dead Time Definition)"]
      },
      // Seção 4 - Normas
      normas_texto: {
        'pt-BR': 'A metodologia de cálculo baseia-se nas seguintes normas e procedimentos técnicos, selecionados conforme a região de operação:',
        'es-ES': 'La metodología de cálculo se basa en las siguientes normas y procedimientos técnicos, seleccionados según la región de operación:',
        'en-US': 'The calculation methodology is based on the following standards and technical procedures, selected according to the region of operation:'
      },
      // Seção 5 - Metodologia
      metodologia_intro: {
        'pt-BR': 'Abaixo descrevem-se os conceitos e filosofias aplicados para cada função de proteção dimensionada neste estudo.',
        'es-ES': 'A continuación se describen los conceptos y filosofías aplicados para cada función de protección dimensionada en este estudio.',
        'en-US': 'Below are described the concepts and philosophies applied for each protection function designed in this study.'
      },
      // 5.1 Distância
      distancia_conceito: {
        'pt-BR': 'A proteção de distância opera medindo a impedância aparente (Z = V/I) até o ponto de defeito. Para garantir a seletividade, utilizou-se o escalonamento em Zonas:',
        'es-ES': 'La protección de distancia opera midiendo la impedancia aparente (Z = V/I) hasta el punto de falla. Para garantizar la selectividad, se utilizó el escalonamiento en Zonas:',
        'en-US': 'Distance protection operates by measuring the apparent impedance (Z = V/I) to the fault point. To ensure selectivity, zone stepping was used:'
      },
      zona1_texto: {
        'ONS': {
          'pt-BR': `Ajustada em **${zonasProtecao.z1_percent}%** da impedância da linha (Z_L1), conforme Procedimentos de Rede ONS (Submódulo 2.7), com atuação instantânea (${zonasProtecao.z1_tempo}ms), visando não operar para defeitos na barra remota devido a erros instrumentais.${zonasProtecao.z1_percent > 85 ? ' **NOTA:** Este ajuste estende-se além da recomendação típica de 80-85%, assumindo-se o risco de sobrealcance transitório para cobrir trechos específicos.' : ''}${zonasProtecao.z1_percent < 75 ? ' **NOTA:** Ajuste conservador abaixo do típico (80%), reduzindo cobertura instantânea em favor de maior segurança contra erros instrumentais.' : ''}`,
          'es-ES': `Ajustada al **${zonasProtecao.z1_percent}%** de la impedancia de la línea (Z_L1), conforme a los Procedimientos de Red ONS (Submódulo 2.7), con actuación instantánea (${zonasProtecao.z1_tempo}ms), buscando no operar para fallas en la barra remota debido a errores instrumentales.${zonasProtecao.z1_percent > 85 ? ' **NOTA:** Este ajuste se extiende más allá de la recomendación típica de 80-85%, asumiendo el riesgo de sobrealcance transitorio.' : ''}`,
          'en-US': `Set at **${zonasProtecao.z1_percent}%** of line impedance (Z_L1), per ONS Network Procedures (Submodule 2.7), with instantaneous operation (${zonasProtecao.z1_tempo}ms), aiming not to operate for faults at remote busbar due to instrumental errors.${zonasProtecao.z1_percent > 85 ? ' **NOTE:** This setting extends beyond typical 80-85% recommendation, assuming transient overreach risk for specific coverage.' : ''}`
        },
        'COES': {
          'pt-BR': `Ajustada em **${zonasProtecao.z1_percent}%** da impedância da linha (Z_L1), conforme Procedimiento Técnico PR-20 do COES, com atuação instantânea (${zonasProtecao.z1_tempo}ms).${zonasProtecao.z1_percent !== 85 ? ` **NOTA:** O valor padrão COES é 85%. Valor atual (${zonasProtecao.z1_percent}%) ${zonasProtecao.z1_percent > 85 ? 'aumenta cobertura mas eleva risco de sobrealcance transitório' : 'reduz cobertura instantânea em favor de segurança'}.` : ' Este ajuste é mandatório para mitigar o risco de sobrealcance transitório.'}`,
          'es-ES': `Ajustada al **${zonasProtecao.z1_percent}%** de la impedancia de la línea (Z_L1), conforme al Procedimiento Técnico PR-20 del COES, con actuación instantánea (${zonasProtecao.z1_tempo}ms).${zonasProtecao.z1_percent !== 85 ? ` **NOTA:** El valor estándar COES es 85%. Valor actual (${zonasProtecao.z1_percent}%) ${zonasProtecao.z1_percent > 85 ? 'aumenta cobertura pero eleva riesgo de sobrealcance transitorio' : 'reduce cobertura instantánea en favor de seguridad'}.` : ' Este ajuste es mandatorio para mitigar el riesgo de sobrealcance transitorio.'}`,
          'en-US': `Set at **${zonasProtecao.z1_percent}%** of line impedance (Z_L1), per COES Technical Procedure PR-20, with instantaneous operation (${zonasProtecao.z1_tempo}ms).${zonasProtecao.z1_percent !== 85 ? ` **NOTE:** Standard COES value is 85%. Current value (${zonasProtecao.z1_percent}%) ${zonasProtecao.z1_percent > 85 ? 'increases coverage but raises transient overreach risk' : 'reduces instantaneous coverage for safety'}.` : ' This setting is mandatory to mitigate transient overreach risk.'}`
        },
        'IEEE': {
          'pt-BR': `Ajustada em **${zonasProtecao.z1_percent}%** da impedância da linha (Z_L1), conforme IEEE Std C37.113, com atuação instantânea (${zonasProtecao.z1_tempo}ms), ${zonasProtecao.z1_percent >= 85 ? 'maximizando a cobertura para instrumentação digital moderna' : 'com margem conservadora de segurança'}.${zonasProtecao.z1_percent > 90 ? ' **NOTA:** Este ajuste excede o típico IEEE (85-90%), assumindo risco de sobrealcance.' : ''}`,
          'es-ES': `Ajustada al **${zonasProtecao.z1_percent}%** de la impedancia de la línea (Z_L1), conforme a IEEE Std C37.113, con actuación instantánea (${zonasProtecao.z1_tempo}ms), ${zonasProtecao.z1_percent >= 85 ? 'maximizando la cobertura para instrumentación digital moderna' : 'con margen conservador de seguridad'}.${zonasProtecao.z1_percent > 90 ? ' **NOTA:** Este ajuste excede el típico IEEE (85-90%), asumiendo riesgo de sobrealcance.' : ''}`,
          'en-US': `Set at **${zonasProtecao.z1_percent}%** of line impedance (Z_L1), per IEEE Std C37.113, with instantaneous operation (${zonasProtecao.z1_tempo}ms), ${zonasProtecao.z1_percent >= 85 ? 'maximizing coverage for modern digital instrumentation' : 'with conservative safety margin'}.${zonasProtecao.z1_percent > 90 ? ' **NOTE:** This setting exceeds typical IEEE (85-90%), assuming overreach risk.' : ''}`
        }
      },
      zona2_texto: {
        'pt-BR': `Ajustada em **${zonasProtecao.z2_percent}%** de Z_L1 para garantir a cobertura total da linha assistida por temporização (${zonasProtecao.z2_tempo}ms) ou canal de comunicação.${zonasProtecao.z2_percent < 120 ? ' **NOTA:** Valor abaixo do típico (120%). Verificar se há cobertura adequada para faltas em 100% da linha.' : ''}${zonasProtecao.z2_percent > 150 ? ' **NOTA:** Valor acima do típico (120-150%). Verificar coordenação com Z1 do terminal remoto e linhas adjacentes.' : ''}`,
        'es-ES': `Ajustada al **${zonasProtecao.z2_percent}%** de Z_L1 para garantizar la cobertura total de la línea asistida por temporización (${zonasProtecao.z2_tempo}ms) o canal de comunicación.${zonasProtecao.z2_percent < 120 ? ' **NOTA:** Valor por debajo del típico (120%). Verificar cobertura para fallas al 100% de la línea.' : ''}${zonasProtecao.z2_percent > 150 ? ' **NOTA:** Valor por encima del típico (120-150%). Verificar coordinación con Z1 del terminal remoto.' : ''}`,
        'en-US': `Set at **${zonasProtecao.z2_percent}%** of Z_L1 to ensure full line coverage assisted by timing (${zonasProtecao.z2_tempo}ms) or communication channel.${zonasProtecao.z2_percent < 120 ? ' **NOTE:** Value below typical (120%). Verify adequate coverage for faults at 100% of line.' : ''}${zonasProtecao.z2_percent > 150 ? ' **NOTE:** Value above typical (120-150%). Verify coordination with remote terminal Z1.' : ''}`
      },
      zona3_texto_fallback: {
        'pt-BR': `**ATENÇÃO:** Linha adjacente não informada. Aplicado alcance de **${zonasProtecao.z3_percent}%** da impedância da linha como margem de segurança para proteção de retaguarda (tempo: ${zonasProtecao.z3_tempo}ms).`,
        'es-ES': `**ATENCIÓN:** Línea adyacente no informada. Aplicado alcance de **${zonasProtecao.z3_percent}%** de la impedancia de la línea como margen de seguridad para protección de respaldo (tiempo: ${zonasProtecao.z3_tempo}ms).`,
        'en-US': `**WARNING:** Adjacent line not provided. Applied reach of **${zonasProtecao.z3_percent}%** of line impedance as safety margin for backup protection (time: ${zonasProtecao.z3_tempo}ms).`
      },
      zona3_texto_normal: {
        'pt-BR': `Ajustada em **${zonasProtecao.z3_percent}%** ${zonasProtecao.z3_percent > 100 ? 'da impedância total (linha + adjacente)' : 'da impedância da linha'} para fornecer proteção de retaguarda remota às linhas adjacentes (tempo: ${zonasProtecao.z3_tempo}ms).`,
        'es-ES': `Ajustada al **${zonasProtecao.z3_percent}%** ${zonasProtecao.z3_percent > 100 ? 'de la impedancia total (línea + adyacente)' : 'de la impedancia de la línea'} para proporcionar protección de respaldo remota a las líneas adyacentes (tiempo: ${zonasProtecao.z3_tempo}ms).`,
        'en-US': `Set at **${zonasProtecao.z3_percent}%** ${zonasProtecao.z3_percent > 100 ? 'of total impedance (line + adjacent)' : 'of line impedance'} to provide remote backup protection for adjacent lines (time: ${zonasProtecao.z3_tempo}ms).`
      },
      k0_texto: {
        'pt-BR': 'Aplicada para corrigir a medição em faltas à terra, calculada vetorialmente através da relação (Z_0 - Z_1) / 3Z_1.',
        'es-ES': 'Aplicada para corregir la medición en fallas a tierra, calculada vectorialmente mediante la relación (Z_0 - Z_1) / 3Z_1.',
        'en-US': 'Applied to correct measurement in ground faults, calculated vectorially through the relation (Z_0 - Z_1) / 3Z_1.'
      },
      // 5.2 Diferencial
      dif_conceito: {
        'pt-BR': 'A função 87L baseia-se na Lei de Kirchhoff, comparando as correntes que entram e saem da linha através de canal de comunicação (Fibra Óptica).',
        'es-ES': 'La función 87L se basa en la Ley de Kirchhoff, comparando las corrientes que entran y salen de la línea a través del canal de comunicación (Fibra Óptica).',
        'en-US': 'The 87L function is based on Kirchhoff\'s Law, comparing currents entering and leaving the line through the communication channel (Fiber Optic).'
      },
      dif_carga_titulo: {
        'pt-BR': 'Compensação de Carga (I_chg)',
        'es-ES': 'Compensación de Carga (I_chg)',
        'en-US': 'Charging Compensation (I_chg)'
      },
      dif_carga_texto: {
        'pt-BR': `Foi considerado o efeito da corrente capacitiva (efeito Ferranti) natural da linha. O pickup foi ajustado acima da corrente de charging (I_chg = V × B × L = ${terminalA_res.i_charging_ref} A) para evitar disparos indevidos na energização em vazio.`,
        'es-ES': `Se consideró el efecto de la corriente capacitiva (efecto Ferranti) natural de la línea. El pickup fue ajustado por encima de la corriente de charging (I_chg = V × B × L = ${terminalA_res.i_charging_ref} A) para evitar disparos indebidos en la energización en vacío.`,
        'en-US': `The natural capacitive current effect (Ferranti effect) of the line was considered. Pickup was set above the charging current (I_chg = V × B × L = ${terminalA_res.i_charging_ref} A) to avoid false trips during no-load energization.`
      },
      dif_slope_titulo: {
        'pt-BR': 'Características de Slope',
        'es-ES': 'Características de Slope',
        'en-US': 'Slope Characteristics'
      },
      dif_slope_texto: {
        'pt-BR': `Definidas para garantir estabilidade perante saturação de TCs em faltas externas. Slope 1: ${terminalA_res.ansi_87l_slope1}% | Slope 2: ${terminalA_res.ansi_87l_slope2}%`,
        'es-ES': `Definidas para garantizar estabilidad ante saturación de TCs en fallas externas. Slope 1: ${terminalA_res.ansi_87l_slope1}% | Slope 2: ${terminalA_res.ansi_87l_slope2}%`,
        'en-US': `Defined to ensure stability against CT saturation in external faults. Slope 1: ${terminalA_res.ansi_87l_slope1}% | Slope 2: ${terminalA_res.ansi_87l_slope2}%`
      },
      // 5.3 67N
      n67_conceito: {
        'pt-BR': 'Destinada a detectar faltas à terra de alta impedância que não sensibilizam a função 21N.',
        'es-ES': 'Destinada a detectar fallas a tierra de alta impedancia que no sensibilizan la función 21N.',
        'en-US': 'Designed to detect high impedance ground faults that do not sensitize the 21N function.'
      },
      n67_pol_titulo: {
        'pt-BR': 'Polarização',
        'es-ES': 'Polarización',
        'en-US': 'Polarization'
      },
      n67_pol_texto: {
        'pt-BR': `A direção da falta é determinada comparando a corrente de sequência zero (3I_0) com a tensão de sequência zero (3V_0). Tipo selecionado: **${terminalA_res.ansi_67n_polarization}**.`,
        'es-ES': `La dirección de la falla se determina comparando la corriente de secuencia cero (3I_0) con la tensión de secuencia cero (3V_0). Tipo seleccionado: **${terminalA_res.ansi_67n_polarization}**.`,
        'en-US': `Fault direction is determined by comparing zero sequence current (3I_0) with zero sequence voltage (3V_0). Selected type: **${terminalA_res.ansi_67n_polarization}**.`
      },
      n67_coord_titulo: {
        'pt-BR': 'Coordenação',
        'es-ES': 'Coordinación',
        'en-US': 'Coordination'
      },
      n67_coord_texto: {
        'pt-BR': 'O ajuste de pickup e curva de tempo visa coordenar com as proteções de terra das linhas adjacentes.',
        'es-ES': 'El ajuste de pickup y curva de tiempo busca coordinar con las protecciones de tierra de las líneas adyacentes.',
        'en-US': 'Pickup setting and time curve aim to coordinate with ground protections of adjacent lines.'
      },
      // 5.4 67
      p67_conceito: {
        'pt-BR': 'Destinada a detectar a direcionalidade das faltas de fase.',
        'es-ES': 'Destinada a detectar la direccionalidad de las fallas de fase.',
        'en-US': 'Designed to detect the directionality of phase faults.'
      },
      p67_pol_texto: {
        'pt-BR': 'A direção da falta é determinada comparando a corrente de falta com a tensão de referência (polarização por tensão de sequência negativa ou memória de tensão).',
        'es-ES': 'La dirección de la falla se determina comparando la corriente de falla con la tensión de referencia (polarización por tensión de secuencia negativa o memoria de tensión).',
        'en-US': 'Fault direction is determined by comparing fault current with reference voltage (negative sequence voltage polarization or voltage memory).'
      },
      // 5.5 50/51
      oc_conceito: {
        'pt-BR': 'Atua como proteção de retaguarda local.',
        'es-ES': 'Actúa como protección de respaldo local.',
        'en-US': 'Acts as local backup protection.'
      },
      oc_51_titulo: {
        'pt-BR': 'Unidade 51 (Temporizada)',
        'es-ES': 'Unidad 51 (Temporizada)',
        'en-US': 'Unit 51 (Time-delayed)'
      },
      oc_51_texto: {
        'pt-BR': 'Ajustada acima da corrente de carga máxima (loadability) com curva inversa para permitir sobrecargas temporárias controladas.',
        'es-ES': 'Ajustada por encima de la corriente de carga máxima (loadability) con curva inversa para permitir sobrecargas temporales controladas.',
        'en-US': 'Set above maximum load current (loadability) with inverse curve to allow controlled temporary overloads.'
      },
      oc_50_titulo: {
        'pt-BR': 'Unidade 50 (Instantânea)',
        'es-ES': 'Unidad 50 (Instantánea)',
        'en-US': 'Unit 50 (Instantaneous)'
      },
      oc_50_texto: {
        'pt-BR': 'Ajustada com critério de alcance para não "enxergar" curtos-circuitos na barra remota.',
        'es-ES': 'Ajustada con criterio de alcance para no "ver" cortocircuitos en la barra remota.',
        'en-US': 'Set with reach criterion to not "see" short circuits at remote busbar.'
      },
      oc_51n_titulo: {
        'pt-BR': 'Unidade 51N (Terra Temporizada)',
        'es-ES': 'Unidad 51N (Tierra Temporizada)',
        'en-US': 'Unit 51N (Ground Time-delayed)'
      },
      oc_50n_titulo: {
        'pt-BR': 'Unidade 50N (Terra Instantânea)',
        'es-ES': 'Unidad 50N (Tierra Instantánea)',
        'en-US': 'Unit 50N (Ground Instantaneous)'
      },
      // Seção 6 - Análise
      analise_intro: {
        'pt-BR': 'A seguir, apresentam-se os valores calculados e a análise crítica de desempenho.',
        'es-ES': 'A continuación, se presentan los valores calculados y el análisis crítico de desempeño.',
        'en-US': 'Below are presented the calculated values and critical performance analysis.'
      },
      tc_titulo: {
        'pt-BR': '6.2. Verificação de TCs',
        'es-ES': '6.2. Verificación de TCs',
        'en-US': '6.2. CT Verification'
      },
      tc_texto: {
        'pt-BR': `Foi verificada a classe de exatidão e saturação dos Transformadores de Corrente. Para o curto-circuito máximo de ${terminalA.icc_3f_max.toFixed(0)} A, a relação de transformação (RTC = ${terminalA.rtc}) é adequada para a aplicação, garantindo operação dentro da classe de exatidão.`,
        'es-ES': `Se verificó la clase de exactitud y saturación de los Transformadores de Corriente. Para el cortocircuito máximo de ${terminalA.icc_3f_max.toFixed(0)} A, la relación de transformación (RTC = ${terminalA.rtc}) es adecuada para la aplicación, garantizando operación dentro de la clase de exactitud.`,
        'en-US': `Current Transformer accuracy class and saturation were verified. For maximum short circuit of ${terminalA.icc_3f_max.toFixed(0)} A, the transformation ratio (CTR = ${terminalA.rtc}) is adequate for the application, ensuring operation within accuracy class.`
      },
      cobertura_titulo: {
        'pt-BR': '6.3. Análise de Cobertura (Sliding Fault)',
        'es-ES': '6.3. Análisis de Cobertura (Falla Deslizante)',
        'en-US': '6.3. Coverage Analysis (Sliding Fault)'
      },
      cobertura_texto: {
        'pt-BR': `A simulação de faltas ao longo da linha demonstrou que a Zona 1 cobre efetivamente até ${terminalA_res.criteria.z1} do trecho protegido com atuação instantânea. Para faltas no final da linha (99%), a atuação ocorre em Zona 2 (${terminalA_res.z2_time}s), garantindo a coordenação seletiva.`,
        'es-ES': `La simulación de fallas a lo largo de la línea demostró que la Zona 1 cubre efectivamente hasta ${terminalA_res.criteria.z1} del tramo protegido con actuación instantánea. Para fallas al final de la línea (99%), la actuación ocurre en Zona 2 (${terminalA_res.z2_time}s), garantizando la coordinación selectiva.`,
        'en-US': `Fault simulation along the line demonstrated that Zone 1 effectively covers up to ${terminalA_res.criteria.z1} of the protected section with instantaneous operation. For faults at line end (99%), operation occurs in Zone 2 (${terminalA_res.z2_time}s), ensuring selective coordination.`
      },
      // Seção 7 - Recomendações
      recomendacoes_lista: {
        'pt-BR': ["Recomenda-se realizar ensaios de injeção secundária (mala de testes) para validar os pontos de curva definidos neste estudo.", "Verificar a polaridade dos TCs e TPs durante o comissionamento para garantir a correta operação da direcionalidade (67N) e diferencial (87L).", "Confirmar os dados de impedância da linha através de medição em campo (End-to-End) se possível, dada a sensibilidade dos ajustes de Zona 1.", "Validar o canal de comunicação da proteção diferencial 87L antes da energização.", "Documentar quaisquer desvios dos ajustes propostos e notificar a área de engenharia."],
        'es-ES': ["Se recomienda realizar ensayos de inyección secundaria (maleta de pruebas) para validar los puntos de curva definidos en este estudio.", "Verificar la polaridad de los TCs y TPs durante el comisionamiento para garantizar la correcta operación de la direccionalidad (67N) y diferencial (87L).", "Confirmar los datos de impedancia de la línea mediante medición en campo (End-to-End) si es posible, dada la sensibilidad de los ajustes de Zona 1.", "Validar el canal de comunicación de la protección diferencial 87L antes de la energización.", "Documentar cualquier desviación de los ajustes propuestos y notificar al área de ingeniería."],
        'en-US': ["It is recommended to perform secondary injection tests (test set) to validate the curve points defined in this study.", "Verify CT and PT polarity during commissioning to ensure correct directional (67N) and differential (87L) operation.", "Confirm line impedance data through field measurement (End-to-End) if possible, given Zone 1 settings sensitivity.", "Validate the 87L differential protection communication channel before energization.", "Document any deviations from proposed settings and notify the engineering department."]
      },
      // Seção 8 - Conclusões
      conclusoes_texto: {
        'pt-BR': `Com base nos cálculos apresentados, conclui-se que os ajustes propostos atendem aos requisitos de sensibilidade, seletividade e rapidez exigidos pela norma ${projeto.norma}. Os alcances de proteção foram definidos em: **Zona 1: ${zonasProtecao.z1_percent}%** (instantânea), **Zona 2: ${zonasProtecao.z2_percent}%** (temporizada ${zonasProtecao.z2_tempo}ms), **Zona 3: ${zonasProtecao.z3_percent}%** (retaguarda ${zonasProtecao.z3_tempo}ms)${zonasProtecao.z4_habilitada ? ` e **Zona 4: ${zonasProtecao.z4_percent}%** (${zonasProtecao.z4_reversa ? 'reversa - backup de barra/BF' : 'forward - supervisão POTT/PUTT'})` : ''}.${!zonasProtecao.z4_habilitada ? ' A Zona 4 não foi habilitada neste estudo.' : ''}${zonasProtecao.z1_percent > 85 ? ' **ATENÇÃO:** O alcance de Zona 1 excede a recomendação típica de 85%, assumindo-se risco controlado de sobrealcance transitório.' : ''}${zonasProtecao.z1_percent < 75 ? ' **NOTA:** O alcance de Zona 1 está abaixo do típico, priorizando segurança sobre cobertura instantânea.' : ''} A verificação de carga (Loadability) confirma que não haverá atuação indevida para o fluxo de potência máximo previsto. O sistema de proteção está apto para operação segura.`,
        'es-ES': `Con base en los cálculos presentados, se concluye que los ajustes propuestos cumplen con los requisitos de sensibilidad, selectividad y rapidez exigidos por la norma ${projeto.norma}. Los alcances de protección fueron definidos en: **Zona 1: ${zonasProtecao.z1_percent}%** (instantánea), **Zona 2: ${zonasProtecao.z2_percent}%** (temporizada ${zonasProtecao.z2_tempo}ms), **Zona 3: ${zonasProtecao.z3_percent}%** (respaldo ${zonasProtecao.z3_tempo}ms)${zonasProtecao.z4_habilitada ? ` y **Zona 4: ${zonasProtecao.z4_percent}%** (${zonasProtecao.z4_reversa ? 'reversa - respaldo de barra/BF' : 'forward - supervisión POTT/PUTT'})` : ''}.${!zonasProtecao.z4_habilitada ? ' La Zona 4 no fue habilitada en este estudio.' : ''}${zonasProtecao.z1_percent > 85 ? ' **ATENCIÓN:** El alcance de Zona 1 excede la recomendación típica de 85%.' : ''} La verificación de carga confirma que no habrá actuación indebida. El sistema de protección está apto para operación segura.`,
        'en-US': `Based on the calculations presented, it is concluded that the proposed settings meet the sensitivity, selectivity, and speed requirements of the ${projeto.norma} standard. Protection reaches were defined as: **Zone 1: ${zonasProtecao.z1_percent}%** (instantaneous), **Zone 2: ${zonasProtecao.z2_percent}%** (timed ${zonasProtecao.z2_tempo}ms), **Zone 3: ${zonasProtecao.z3_percent}%** (backup ${zonasProtecao.z3_tempo}ms)${zonasProtecao.z4_habilitada ? ` and **Zone 4: ${zonasProtecao.z4_percent}%** (${zonasProtecao.z4_reversa ? 'reverse - bus/BF backup' : 'forward - POTT/PUTT supervision'})` : ''}.${!zonasProtecao.z4_habilitada ? ' Zone 4 was not enabled in this study.' : ''}${zonasProtecao.z1_percent > 85 ? ' **WARNING:** Zone 1 reach exceeds typical 85% recommendation.' : ''} Load verification confirms there will be no undue operation. The protection system is ready for safe operation.`
      },
      // Seção 10 - Apêndices
      apendices: {
        'pt-BR': ["Apêndice A: Memória de Cálculo Detalhada (Planilha)", "Apêndice B: Diagramas de Coordenação (Coordenogramas R-X e T-I)", "Apêndice C: Dados de Placa dos Equipamentos (TCs, TPs e Disjuntores)", uploadedImage ? "Apêndice D: Coordenograma (Imagem Anexada)" : null],
        'es-ES': ["Apéndice A: Memoria de Cálculo Detallada (Planilla)", "Apéndice B: Diagramas de Coordinación (Coordinogramas R-X y T-I)", "Apéndice C: Datos de Placa de los Equipos (TCs, TPs y Disyuntores)", uploadedImage ? "Apéndice D: Coordinograma (Imagen Anexada)" : null],
        'en-US': ["Appendix A: Detailed Calculation Memory (Spreadsheet)", "Appendix B: Coordination Diagrams (R-X and T-I Coordination Plots)", "Appendix C: Equipment Nameplate Data (CTs, PTs, and Breakers)", uploadedImage ? "Appendix D: Coordination Plot (Attached Image)" : null]
      }
    };

    // Função helper para obter tradução
    const tr = key => t[key]?.[idioma] || t[key]?.['pt-BR'] || '';
    return {
      // ═══════════════════════════════════════════════════════════════════════════
      // METADADOS DO DOCUMENTO
      // ═══════════════════════════════════════════════════════════════════════════
      documento: {
        titulo: tr('memorial_titulo'),
        versao: `Rev. ${projeto.revisao}`,
        data: dateStr
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // 1. CAPA
      // ═══════════════════════════════════════════════════════════════════════════
      secao_1_capa: {
        titulo: "1. Capa",
        conteudo: {
          projeto: tr('estudo_projeto'),
          cliente: clientName,
          cliente_logo: clienteSelecionado?.logo || null,
          responsavel_tecnico: engName,
          responsavel_crea: engCrea,
          responsavel_assinatura: engenheiroSelecionado?.assinatura || null,
          data_emissao: dateStr,
          local: tr('local')
        }
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // 2. OBJETIVO
      // ═══════════════════════════════════════════════════════════════════════════
      secao_2_objetivo: {
        titulo: idioma === 'es-ES' ? "2. Objetivo" : idioma === 'en-US' ? "2. Objective" : "2. Objetivo",
        texto: tr('objetivo_texto')
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // 3. ESCOPO
      // ═══════════════════════════════════════════════════════════════════════════
      secao_3_escopo: {
        titulo: idioma === 'es-ES' ? "3. Alcance" : idioma === 'en-US' ? "3. Scope" : "3. Escopo",
        texto: tr('escopo_texto'),
        lista_funcoes: tr('lista_funcoes'),
        equipamentos: {
          terminal_a: {
            nome: terminalA.nome,
            rele: releA ? `${releA.fabricante} ${releA.modelo}` : idioma === 'es-ES' ? 'No especificado' : idioma === 'en-US' ? 'Not specified' : 'Não especificado',
            funcoes: releA?.funcoes || '---'
          },
          terminal_b: {
            nome: terminalB.nome,
            rele: releB ? `${releB.fabricante} ${releB.modelo}` : idioma === 'es-ES' ? 'No especificado' : idioma === 'en-US' ? 'Not specified' : 'Não especificado',
            funcoes: releB?.funcoes || '---'
          }
        }
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // 4. DOCUMENTOS NORMATIVOS
      // ═══════════════════════════════════════════════════════════════════════════
      secao_4_normas: {
        titulo: idioma === 'es-ES' ? "4. Documentos normativos y de referencia" : idioma === 'en-US' ? "4. Normative and reference documents" : "4. Documentos normativos e de referência",
        texto: tr('normas_texto'),
        normas_aplicadas: [projeto.norma === 'ONS' ? "ONS - Procedimentos de Rede: Submódulo 2.6 (Requisitos Mínimos) e 2.7." : null, projeto.norma === 'COES' ? "COES SINAC - Procedimiento Técnico PR-20 (Ajuste y Coordinación)." : null, projeto.norma === 'IEEE' ? "IEEE Std C37.113-2015 - Guide for Protective Relay Applications to Transmission Lines." : null, "IEEE Std C37.114 - Guide for Determining Fault Location on AC Transmission and Distribution Lines.", `${idioma === 'es-ES' ? 'Manual Técnico del Fabricante del Relé' : idioma === 'en-US' ? 'Relay Manufacturer Technical Manual' : 'Manual Técnico do Fabricante do Relé'}: ${releA ? `${releA.fabricante} ${releA.modelo}` : 'N/A'}`].filter(Boolean)
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // 5. DESENVOLVIMENTO METODOLÓGICO
      // ═══════════════════════════════════════════════════════════════════════════
      secao_5_metodologia: {
        titulo: idioma === 'es-ES' ? "5. Desarrollo Metodológico" : idioma === 'en-US' ? "5. Methodological Development" : "5. Desenvolvimento Metodológico",
        intro: tr('metodologia_intro'),
        subsecao_21: {
          titulo: idioma === 'es-ES' ? "5.1. Protección de Distancia (21/21N)" : idioma === 'en-US' ? "5.1. Distance Protection (21/21N)" : "5.1. Proteção de Distância (21/21N)",
          conceito: tr('distancia_conceito'),
          zona_1: {
            titulo: idioma === 'es-ES' ? "Zona 1 (Subalcance)" : idioma === 'en-US' ? "Zone 1 (Underreach)" : "Zona 1 (Subalcance)",
            texto: t.zona1_texto[projeto.norma]?.[idioma] || t.zona1_texto['ONS']['pt-BR'],
            alcance_a: terminalA_res.z1_reach,
            alcance_b: terminalB_res.z1_reach,
            tempo: terminalA_res.z1_time
          },
          zona_2: {
            titulo: idioma === 'es-ES' ? "Zona 2 (Sobrealcance)" : idioma === 'en-US' ? "Zone 2 (Overreach)" : "Zona 2 (Sobrealcance)",
            texto: tr('zona2_texto'),
            alcance_a: terminalA_res.z2_reach,
            alcance_b: terminalB_res.z2_reach,
            tempo: terminalA_res.z2_time
          },
          zona_3: {
            titulo: idioma === 'es-ES' ? "Zona 3 (Respaldo)" : idioma === 'en-US' ? "Zone 3 (Backup)" : "Zona 3 (Retaguarda)",
            texto: terminalA_res.criteria.z3.includes('Fallback') ? tr('zona3_texto_fallback') : tr('zona3_texto_normal'),
            alcance_a: terminalA_res.z3_reach,
            alcance_b: terminalB_res.z3_reach,
            tempo: terminalA_res.z3_time
          },
          compensacao_k0: {
            titulo: idioma === 'es-ES' ? "Compensación K0" : idioma === 'en-US' ? "K0 Compensation" : "Compensação K0",
            texto: tr('k0_texto'),
            modulo_a: terminalA_res.k0_modulo,
            angulo_a: terminalA_res.k0_angulo,
            modulo_b: terminalB_res.k0_modulo,
            angulo_b: terminalB_res.k0_angulo
          }
        },
        subsecao_87l: {
          titulo: idioma === 'es-ES' ? "5.2. Protección Diferencial de Línea (87L)" : idioma === 'en-US' ? "5.2. Line Differential Protection (87L)" : "5.2. Proteção Diferencial de Linha (87L)",
          conceito: tr('dif_conceito'),
          compensacao_carga: {
            titulo: tr('dif_carga_titulo'),
            texto: tr('dif_carga_texto')
          },
          slope: {
            titulo: tr('dif_slope_titulo'),
            texto: tr('dif_slope_texto')
          },
          ajustes: {
            pickup_a: terminalA_res.ansi_87l_pickup,
            pickup_b: terminalB_res.ansi_87l_pickup,
            pickup_pu_a: terminalA_res.ansi_87l_pickup_pu,
            pickup_pu_b: terminalB_res.ansi_87l_pickup_pu,
            slope_1: terminalA_res.ansi_87l_slope1,
            slope_2: terminalA_res.ansi_87l_slope2,
            breakpoint: terminalA_res.ansi_87l_breakpoint
          }
        },
        subsecao_67n: {
          titulo: idioma === 'es-ES' ? "5.3. Sobrecorriente Direccional de Tierra (67N)" : idioma === 'en-US' ? "5.3. Directional Ground Overcurrent (67N)" : "5.3. Sobrecorrente Direcional de Terra (67N)",
          conceito: tr('n67_conceito'),
          polarizacao: {
            titulo: tr('n67_pol_titulo'),
            texto: tr('n67_pol_texto')
          },
          coordenacao: {
            titulo: tr('n67_coord_titulo'),
            texto: tr('n67_coord_texto')
          },
          ajustes: {
            pickup_fwd_a: terminalA_res.ansi_67n_pickup_fwd,
            pickup_fwd_b: terminalB_res.ansi_67n_pickup_fwd,
            pickup_rev_a: terminalA_res.ansi_67n_pickup_rev,
            pickup_rev_b: terminalB_res.ansi_67n_pickup_rev,
            mta: terminalA_res.ansi_67n_mta,
            rca: terminalA_res.ansi_67n_rca,
            curva: terminalA_res.curve_67n
          }
        },
        subsecao_67: {
          titulo: idioma === 'es-ES' ? "5.4. Sobrecorriente Direccional de Fase (67)" : idioma === 'en-US' ? "5.4. Directional Phase Overcurrent (67)" : "5.4. Sobrecorrente Direcional de Fase (67)",
          conceito: tr('p67_conceito'),
          polarizacao: {
            titulo: tr('n67_pol_titulo'),
            texto: tr('p67_pol_texto')
          },
          ajustes: {
            pickup_fwd_a: terminalA_res.ansi_67_pickup_fwd,
            pickup_fwd_b: terminalB_res.ansi_67_pickup_fwd,
            pickup_rev_a: terminalA_res.ansi_67_pickup_rev,
            pickup_rev_b: terminalB_res.ansi_67_pickup_rev,
            mta: terminalA_res.ansi_67_mta,
            rca: terminalA_res.ansi_67_rca,
            curva: terminalA_res.curve_67
          }
        },
        subsecao_50_51: {
          titulo: idioma === 'es-ES' ? "5.5. Sobrecorriente de Fase (50/51)" : idioma === 'en-US' ? "5.5. Phase Overcurrent (50/51)" : "5.5. Sobrecorrente de Fase (50/51)",
          conceito: tr('oc_conceito'),
          unidade_51: {
            titulo: tr('oc_51_titulo'),
            texto: tr('oc_51_texto'),
            pickup_a: terminalA_res.ansi_51_pickup,
            pickup_b: terminalB_res.ansi_51_pickup,
            curva: terminalA_res.curve_51
          },
          unidade_50: {
            titulo: tr('oc_50_titulo'),
            texto: tr('oc_50_texto'),
            pickup_a: terminalA_res.ansi_50_pickup,
            pickup_b: terminalB_res.ansi_50_pickup
          },
          unidade_51n: {
            titulo: tr('oc_51n_titulo'),
            pickup_a: terminalA_res.ansi_51n_pickup,
            pickup_b: terminalB_res.ansi_51n_pickup,
            curva: terminalA_res.curve_51n
          },
          unidade_50n: {
            titulo: tr('oc_50n_titulo'),
            pickup_a: terminalA_res.ansi_50n_pickup,
            pickup_b: terminalB_res.ansi_50n_pickup
          }
        }
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // 6. ANÁLISE DOS RESULTADOS
      // ═══════════════════════════════════════════════════════════════════════════
      secao_6_analise: {
        titulo: idioma === 'es-ES' ? "6. Análisis de los Resultados" : idioma === 'en-US' ? "6. Results Analysis" : "6. Análise dos Resultados",
        intro: tr('analise_intro'),
        tabela_ajustes: {
          titulo: idioma === 'es-ES' ? "6.1. Tabla Resumen de Ajustes" : idioma === 'en-US' ? "6.1. Settings Summary Table" : "6.1. Tabela Resumo de Ajustes",
          linha: {
            nome: lineName,
            comprimento: projeto.linha_comprimento,
            tensao: projeto.V_nom,
            Z1: `${Z1_total.toFixed(2)} Ω ∠${Z1_ang.toFixed(1)}°`,
            Z0: `${Z0_total.toFixed(2)} Ω ∠${Z0_ang.toFixed(1)}°`
          },
          terminal_a: {
            nome: terminalA.nome,
            rtc: terminalA.rtc,
            rtp: terminalA.rtp,
            ...terminalA_res
          },
          terminal_b: {
            nome: terminalB.nome,
            rtc: terminalB.rtc,
            rtp: terminalB.rtp,
            ...terminalB_res
          }
        },
        analise_critica_tc: {
          titulo: tr('tc_titulo'),
          texto: tr('tc_texto')
        },
        analise_critica_cobertura: {
          titulo: tr('cobertura_titulo'),
          texto: tr('cobertura_texto'),
          validacao: results.validation,
          validacao_obrigatoria: projeto.norma === 'COES',
          resultado_99: results.validation.find(v => v.percent === 99)
        }
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // 7. RECOMENDAÇÕES
      // ═══════════════════════════════════════════════════════════════════════════
      secao_7_recomendacoes: {
        titulo: idioma === 'es-ES' ? "7. Recomendaciones" : idioma === 'en-US' ? "7. Recommendations" : "7. Recomendações",
        lista: tr('recomendacoes_lista')
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // 8. CONCLUSÕES
      // ═══════════════════════════════════════════════════════════════════════════
      secao_8_conclusoes: {
        titulo: idioma === 'es-ES' ? "8. Conclusiones" : idioma === 'en-US' ? "8. Conclusions" : "8. Conclusões",
        texto: tr('conclusoes_texto')
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // 9. BIBLIOGRAFIA
      // ═══════════════════════════════════════════════════════════════════════════
      secao_9_bibliografia: {
        titulo: idioma === 'es-ES' ? "9. Bibliografía" : idioma === 'en-US' ? "9. Bibliography" : "9. Bibliografia",
        lista: [projeto.norma === 'ONS' ? "ONS. Procedimentos de Rede. Submódulos 2.6 e 2.7." : null, projeto.norma === 'COES' ? "COES SINAC. Procedimiento Técnico PR-20 - Ajuste y Coordinación de Protecciones." : null, "IEEE Power System Relaying Committee. 'C37.113 Guide for Protective Relay Applications to Transmission Lines'.", "Blackburn, J. L. 'Protective Relaying: Principles and Applications'.", "Horowitz, S. H.; Phadke, A. G. 'Power System Relaying'. Wiley.", releA ? `${releA.fabricante}. ${idioma === 'es-ES' ? 'Manual Técnico' : idioma === 'en-US' ? 'Technical Manual' : 'Manual Técnico'} ${releA.modelo}.` : null, idioma === 'es-ES' ? "Documentación técnica y Diagramas Unifilares proporcionados por el cliente." : idioma === 'en-US' ? "Technical documentation and Single-line Diagrams provided by the client." : "Documentação técnica e Diagramas Unifilares fornecidos pelo cliente."].filter(Boolean)
      },
      // ═══════════════════════════════════════════════════════════════════════════
      // 10. APÊNDICES
      // ═══════════════════════════════════════════════════════════════════════════
      secao_10_apendices: {
        titulo: idioma === 'es-ES' ? "10. Apéndices" : idioma === 'en-US' ? "10. Appendices" : "10. Apêndices",
        conteudo: tr('apendices').filter(Boolean)
      },
      // Metadados adicionais
      meta: {
        norma: projeto.norma,
        idioma: projeto.idioma,
        gerado_em: new Date().toISOString()
      }
    };
  };

  // Variáveis de estado para acessar no relatório
  const terminalA_state = terminalA;
  const terminalB_state = terminalB;

  // ═══════════════════════════════════════════════════════════════════════════════
  // FUNÇÕES DE EXPORTAÇÃO
  // ═══════════════════════════════════════════════════════════════════════════════

  // Exportar JSON
  const exportJSON = () => {
    const report = generateFullReport();
    if (!report) return;
    const dataStr = JSON.stringify(report, null, 2);
    const blob = new Blob([dataStr], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `memorial_${projeto.linha_nome || 'LT'}_rev${projeto.revisao}_${projeto.data}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Exportar CSV (Tabela de Ajustes)
  const exportCSV = () => {
    if (!results) return;
    const termA = results.terminal_A;
    const termB = results.terminal_B;

    // Cabeçalho
    let csv = 'MEMORIAL DE CÁLCULO - PROTEÇÃO DE LINHA DE TRANSMISSÃO\n';
    csv += `Linha:,${projeto.linha_nome || 'LT'}\n`;
    csv += `Tensão:,${projeto.V_nom} kV\n`;
    csv += `Comprimento:,${projeto.linha_comprimento} km\n`;
    csv += `Norma:,${projeto.norma}\n`;
    csv += `Data:,${projeto.data}\n`;
    csv += `Revisão:,${projeto.revisao}\n\n`;

    // Tabela de Impedâncias
    csv += 'PARÂMETROS DA LINHA\n';
    csv += 'Parâmetro,Valor,Unidade\n';
    csv += `R1,${linha.R1},Ω/km\n`;
    csv += `X1,${linha.X1},Ω/km\n`;
    csv += `R0,${linha.R0},Ω/km\n`;
    csv += `X0,${linha.X0},Ω/km\n`;
    csv += `Susceptância B1,${linha.susceptancia_b1},μS/km\n\n`;

    // Tabela de Ajustes - Proteção de Distância
    csv += 'PROTEÇÃO DE DISTÂNCIA (21)\n';
    csv += 'Parâmetro,Terminal A,Terminal B,Unidade,Critério\n';
    csv += `Z1 Alcance,${termA.z1_reach},${termB.z1_reach},Ω,${zonasProtecao.z1_percent}% da Linha\n`;
    csv += `Z1 Tempo,${termA.z1_time},${termB.z1_time},s,Instantâneo (${zonasProtecao.z1_tempo}ms)\n`;
    csv += `Z2 Alcance,${termA.z2_reach},${termB.z2_reach},Ω,${zonasProtecao.z2_percent}% da Linha\n`;
    csv += `Z2 Tempo,${termA.z2_time},${termB.z2_time},s,Temporizado (${zonasProtecao.z2_tempo}ms)\n`;
    csv += `Z3 Alcance,${termA.z3_reach},${termB.z3_reach},Ω,${zonasProtecao.z3_percent}% (L+Adj)\n`;
    csv += `Z3 Tempo,${termA.z3_time},${termB.z3_time},s,Retaguarda (${zonasProtecao.z3_tempo}ms)\n`;
    csv += `Z4 Alcance (Rev),${termA.z4_reach},${termB.z4_reach},Ω,${zonasProtecao.z4_percent}% Reverso\n`;
    csv += `K0 Módulo,${termA.k0_modulo},${termB.k0_modulo},pu,(Z0-Z1)/3Z1\n`;
    csv += `K0 Ângulo,${termA.k0_angulo},${termB.k0_angulo},°,Compensação Terra\n\n`;

    // Sobrecorrente
    csv += 'SOBRECORRENTE (50/51)\n';
    csv += 'Parâmetro,Terminal A,Terminal B,Unidade\n';
    csv += `51 Pickup,${termA.ansi_51_pickup},${termB.ansi_51_pickup},A\n`;
    csv += `50 Pickup,${termA.ansi_50_pickup},${termB.ansi_50_pickup},A\n`;
    csv += `51N Pickup,${termA.ansi_51n_pickup},${termB.ansi_51n_pickup},A\n`;
    csv += `50N Pickup,${termA.ansi_50n_pickup},${termB.ansi_50n_pickup},A\n\n`;

    // Direcional
    csv += 'SOBRECORRENTE DIRECIONAL (67/67N)\n';
    csv += 'Parâmetro,Terminal A,Terminal B,Unidade\n';
    csv += `67 Pickup FWD,${termA.ansi_67_pickup_fwd},${termB.ansi_67_pickup_fwd},A\n`;
    csv += `67 Pickup REV,${termA.ansi_67_pickup_rev},${termB.ansi_67_pickup_rev},A\n`;
    csv += `67 MTA,${termA.ansi_67_mta},${termB.ansi_67_mta},°\n`;
    csv += `67N Pickup FWD,${termA.ansi_67n_pickup_fwd},${termB.ansi_67n_pickup_fwd},A\n`;
    csv += `67N Pickup REV,${termA.ansi_67n_pickup_rev},${termB.ansi_67n_pickup_rev},A\n`;
    csv += `67N Polarização,${termA.ansi_67n_polarization},${termB.ansi_67n_polarization},-\n`;
    csv += `67N MTA,${termA.ansi_67n_mta},${termB.ansi_67n_mta},°\n\n`;

    // Diferencial
    csv += 'DIFERENCIAL DE LINHA (87L)\n';
    csv += 'Parâmetro,Terminal A,Terminal B,Unidade\n';
    csv += `87L Pickup,${termA.ansi_87l_pickup},${termB.ansi_87l_pickup},A\n`;
    csv += `87L Pickup (%),${termA.ansi_87l_pickup_pu},${termB.ansi_87l_pickup_pu},%In\n`;
    csv += `Slope 1,${termA.ansi_87l_slope1},${termB.ansi_87l_slope1},%\n`;
    csv += `Slope 2,${termA.ansi_87l_slope2},${termB.ansi_87l_slope2},%\n`;
    csv += `I Charging,${termA.i_charging_ref},${termB.i_charging_ref},A\n\n`;

    // Validação Sliding Fault
    csv += 'VALIDAÇÃO - FALTA DESLIZANTE (SLIDING FAULT)\n';
    csv += 'Posição (%),Distância (km),Z Vista A (Ω),Zona A,Status A,Z Vista B (Ω),Zona B,Status B\n';
    results.validation.forEach(v => {
      csv += `${v.percent},${v.distance_km},${v.terminal_A.z_seen},${v.terminal_A.zone},${v.terminal_A.match ? 'OK' : 'VERIFICAR'},${v.terminal_B.z_seen},${v.terminal_B.zone},${v.terminal_B.match ? 'OK' : 'VERIFICAR'}\n`;
    });
    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ajustes_${projeto.linha_nome || 'LT'}_rev${projeto.revisao}_${projeto.data}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Exportar HTML (Memorial formatado)
  const exportHTML = () => {
    const report = generateFullReport();
    if (!report) {
      alert('Execute os cálculos primeiro para gerar o relatório.');
      return;
    }

    // Função para remover ** do markdown
    const cleanBold = text => text ? text.replace(/\*\*/g, '') : '';
    const clienteLogo = clientes.find(c => c.id === projeto.cliente_id)?.logo;
    const engAssinatura = engenheiros.find(e => e.id === projeto.engenheiro_id)?.assinatura;

    // ═══════════════════════════════════════════════════════════════════════════
    // VARIÁVEIS PARA TABELA SEL-421 (WORD BITS)
    // ═══════════════════════════════════════════════════════════════════════════
    const releA = reles.find(r => r.id === projeto.rele_a_id);
    const releB = reles.find(r => r.id === projeto.rele_b_id);
    const terminalA_res = results.terminal_A;
    const terminalB_res = results.terminal_B;
    // Verificação mais robusta - aceita 'SEL-421', 'sel-421', '421', etc.
    const isSEL421A = releA && (releA.modelo?.toUpperCase().includes('421') || releA.modelo?.toUpperCase().includes('SEL-421'));
    const isSEL421B = releB && (releB.modelo?.toUpperCase().includes('421') || releB.modelo?.toUpperCase().includes('SEL-421'));
    const isSEL421 = isSEL421A || isSEL421B;
    const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${report.documento.titulo}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'IBM Plex Sans', Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
    }
    
    .container {
      max-width: 210mm;
      margin: 0 auto;
      background: white;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    
    .page {
      padding: 20mm;
      min-height: 297mm;
      page-break-after: always;
    }
    
    .page:last-child {
      page-break-after: auto;
    }
    
    h1 { font-size: 20pt; color: #c65102; margin-bottom: 8px; text-align: center; }
    h2 { 
      font-size: 14pt; 
      color: #0066cc; 
      margin: 24px 0 12px 0; 
      border-bottom: 2px solid #0066cc; 
      padding-bottom: 6px;
      page-break-after: avoid;
    }
    h3 { font-size: 12pt; color: #333; margin: 20px 0 10px 0; }
    h4 { font-size: 11pt; color: #555; margin: 14px 0 8px 0; }
    
    p { margin-bottom: 10px; text-align: justify; }
    
    ul { margin-left: 24px; margin-bottom: 12px; }
    li { margin-bottom: 6px; }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      font-size: 10pt;
      page-break-inside: avoid;
    }
    
    th, td {
      border: 1px solid #ccc;
      padding: 8px 10px;
      text-align: left;
    }
    
    th { 
      background: linear-gradient(180deg, #0066cc 0%, #0052a3 100%); 
      color: white;
      font-weight: 600; 
    }
    
    tr:nth-child(even) { background: #f8f9fa; }
    
    .header-cover { 
      text-align: center; 
      padding: 40px 20px;
      background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
      color: white;
      border-radius: 0 0 20px 20px;
      margin: -20mm -20mm 30px -20mm;
      padding: 40px 20mm;
    }
    
    .header-cover img.logo { 
      max-height: 80px; 
      margin-bottom: 20px;
      background: white;
      padding: 10px;
      border-radius: 8px;
    }
    
    .header-cover h1 { color: #f97316; margin-bottom: 10px; }
    .header-cover .subtitle { font-size: 14pt; color: #8b949e; margin-bottom: 20px; }
    .header-cover .meta { font-size: 10pt; color: #6e7681; }
    
    .info-box {
      background: #f8f9fa;
      border-left: 4px solid #0066cc;
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }
    
    .info-box h4 { margin: 0 0 8px 0; color: #0066cc; }
    
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 20px 0;
    }
    
    .terminal-box {
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid;
    }
    
    .terminal-a { background: #e8f5e9; border-color: #4caf50; }
    .terminal-b { background: #f3e5f5; border-color: #9c27b0; }
    
    .zone-box { 
      padding: 15px 20px; 
      margin: 12px 0; 
      border-radius: 8px; 
      border-left: 5px solid;
      page-break-inside: avoid;
    }
    
    .zone-z1 { background: #e8f5e9; border-color: #4caf50; }
    .zone-z2 { background: #e3f2fd; border-color: #2196f3; }
    .zone-z3 { background: #fff8e1; border-color: #ff9800; }
    .zone-k0 { background: #f3e5f5; border-color: #9c27b0; }
    
    .zone-box strong { 
      display: block; 
      margin-bottom: 8px; 
      font-size: 11pt;
    }
    
    .zone-z1 strong { color: #2e7d32; }
    .zone-z2 strong { color: #1565c0; }
    .zone-z3 strong { color: #ef6c00; }
    .zone-k0 strong { color: #7b1fa2; }
    
    .zone-box .valores { 
      font-size: 10pt; 
      color: #666; 
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px dashed #ccc;
    }
    
    .warning { 
      background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
      border: 2px solid #ff9800; 
      padding: 15px 20px; 
      border-radius: 8px; 
      margin: 20px 0;
    }
    
    .warning strong { color: #e65100; font-size: 11pt; }
    
    .signature { 
      text-align: center; 
      margin-top: 60px; 
      padding-top: 30px; 
      border-top: 2px solid #ddd;
    }
    
    .signature img { max-height: 60px; margin-bottom: 10px; }
    .signature .line { 
      width: 250px; 
      border-bottom: 1px solid #333; 
      margin: 0 auto 10px;
    }
    
    .sliding-z1 { background: #e8f5e9; color: #2e7d32; font-weight: bold; }
    .sliding-z2 { background: #e3f2fd; color: #1565c0; font-weight: bold; }
    .sliding-z3 { background: #fff8e1; color: #ef6c00; font-weight: bold; }
    
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 9pt;
      border-top: 1px solid #ddd;
      margin-top: 40px;
    }
    
    @media print {
      body { background: white; }
      .container { box-shadow: none; }
      .page { padding: 15mm; min-height: auto; }
      .header-cover { margin: -15mm -15mm 20px -15mm; padding: 30px 15mm; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- PÁGINA DE CAPA -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <div class="page cover-page" style="display: flex; flex-direction: column; justify-content: space-between; min-height: 297mm; padding: 0;">
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px;">
        <!-- Logo do Cliente -->
        <div style="margin-bottom: 60px;">
          ${clienteLogo ? `<img src="${clienteLogo}" alt="Logo Cliente" style="max-height: 120px; max-width: 300px;">` : `<div style="width: 200px; height: 100px; background: linear-gradient(135deg, #0066cc, #0052a3); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: 700;">LOGO</div>`}
        </div>
        
        <!-- Tipo de Documento -->
        <div style="color: #666; font-size: 12pt; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 20px;">
          Documento Técnico
        </div>
        
        <!-- Título do Memorial -->
        <h1 style="font-size: 28pt; color: #c65102; margin-bottom: 30px; line-height: 1.3; max-width: 600px;">
          MEMORIAL DE CÁLCULO<br>
          <span style="font-size: 18pt; color: #0066cc;">Proteção de Linha de Transmissão</span>
        </h1>
        
        <!-- Nome da Linha -->
        <div style="background: linear-gradient(135deg, #0d1117, #161b22); color: white; padding: 25px 50px; border-radius: 12px; margin: 30px 0;">
          <div style="font-size: 10pt; color: #8b949e; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 2px;">Linha de Transmissão</div>
          <div style="font-size: 20pt; font-weight: 700; color: #f97316;">${report.secao_1_capa.conteudo.projeto.replace('Estudo de Proteção e Seletividade da ', '').replace('Estudio de Protección y Selectividad de la ', '').replace('Protection and Selectivity Study for ', '')}</div>
        </div>
        
        <!-- Informações do Projeto -->
        <div style="margin-top: 40px; color: #555; font-size: 11pt;">
          <p><strong>Cliente:</strong> ${report.secao_1_capa.conteudo.cliente}</p>
          <p><strong>Responsável Técnico:</strong> ${report.secao_1_capa.conteudo.responsavel_tecnico}</p>
        </div>
      </div>
      
      <!-- Rodapé da Capa -->
      <div style="background: #f5f5f5; padding: 25px 40px; border-top: 3px solid #c65102; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 10pt; color: #888; text-transform: uppercase; letter-spacing: 1px;">Data de Emissão</div>
          <div style="font-size: 14pt; font-weight: 600; color: #333;">${report.documento.data}</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 10pt; color: #888; text-transform: uppercase; letter-spacing: 1px;">Norma Aplicada</div>
          <div style="font-size: 14pt; font-weight: 600; color: #0066cc;">${report.secao_4_normas.normas_aplicadas[0]?.split(' - ')[0] || 'IEEE/IEC'}</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 10pt; color: #888; text-transform: uppercase; letter-spacing: 1px;">Revisão</div>
          <div style="font-size: 14pt; font-weight: 600; color: #333;">${report.documento.versao}</div>
        </div>
      </div>
    </div>
    
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- PÁGINA DE SUMÁRIO -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <div class="page">
      <h1 style="text-align: center; color: #0066cc; border-bottom: 3px solid #0066cc; padding-bottom: 15px; margin-bottom: 40px;">SUMÁRIO</h1>
      
      <div style="font-size: 12pt; line-height: 2.2;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0;">
          <span><strong>1.</strong> Informações do Projeto</span>
          <span style="color: #666;">3</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0;">
          <span><strong>2.</strong> Objetivo</span>
          <span style="color: #666;">3</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0;">
          <span><strong>3.</strong> Escopo</span>
          <span style="color: #666;">3</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0; padding-left: 20px;">
          <span>3.1. Funções de Proteção</span>
          <span style="color: #666;">3</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0; padding-left: 20px;">
          <span>3.2. Equipamentos de Proteção</span>
          <span style="color: #666;">3</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0;">
          <span><strong>4.</strong> Documentos Normativos e de Referência</span>
          <span style="color: #666;">3</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0;">
          <span><strong>5.</strong> Desenvolvimento Metodológico</span>
          <span style="color: #666;">4</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0; padding-left: 20px;">
          <span>5.1. Proteção de Distância (21/21N)</span>
          <span style="color: #666;">4</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0; padding-left: 40px;">
          <span>5.1.1. Zona 1 (Subalcance - Instantânea)</span>
          <span style="color: #666;">4</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0; padding-left: 40px;">
          <span>5.1.2. Zona 2 (Sobrealcance - Temporizada)</span>
          <span style="color: #666;">4</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0; padding-left: 40px;">
          <span>5.1.3. Zona 3 (Retaguarda)</span>
          <span style="color: #666;">4</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0; padding-left: 40px;">
          <span>5.1.4. Compensação K0 (Terra)</span>
          <span style="color: #666;">4</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0; padding-left: 20px;">
          <span>5.2. Proteção Diferencial de Linha (87L)</span>
          <span style="color: #666;">4</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0; padding-left: 20px;">
          <span>5.3. Proteção de Sobrecorrente Direcional de Terra (67N)</span>
          <span style="color: #666;">5</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0; padding-left: 20px;">
          <span>5.4. Sobrecorrente de Fase e Terra (50/51 e 50N/51N)</span>
          <span style="color: #666;">5</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0; padding-left: 20px;">
          <span>5.5. Religamento Automático (79)</span>
          <span style="color: #666;">5</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0;">
          <span><strong>6.</strong> Dados de Entrada</span>
          <span style="color: #666;">5</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0; padding-left: 20px;">
          <span>6.1. Parâmetros da Linha de Transmissão</span>
          <span style="color: #666;">5</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0; padding-left: 20px;">
          <span>6.2. Parâmetros dos Transformadores de Instrumentos</span>
          <span style="color: #666;">6</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0;">
          <span><strong>7.</strong> Tabela de Ajustes - Terminal A (${report.secao_3_escopo.equipamentos.terminal_a.nome})</span>
          <span style="color: #666;">6</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0;">
          <span><strong>8.</strong> Tabela de Ajustes - Terminal B (${report.secao_3_escopo.equipamentos.terminal_b.nome})</span>
          <span style="color: #666;">7</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0;">
          <span><strong>9.</strong> Verificações e Validações</span>
          <span style="color: #666;">8</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 8px 0;">
          <span><strong>10.</strong> Conclusão e Aprovação</span>
          <span style="color: #666;">8</span>
        </div>
      </div>
      
      <!-- Lista de Figuras -->
      <div style="margin-top: 40px;">
        <h3 style="color: #0066cc; border-bottom: 1px solid #0066cc; padding-bottom: 8px; margin-bottom: 20px;">Lista de Tabelas</h3>
        <div style="font-size: 11pt; line-height: 2;">
          <div style="display: flex; justify-content: space-between; padding: 4px 0;">
            <span>Tabela 1 - Parâmetros da Linha de Transmissão</span>
            <span style="color: #666;">5</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0;">
            <span>Tabela 2 - Transformadores de Instrumentos Terminal A</span>
            <span style="color: #666;">6</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0;">
            <span>Tabela 3 - Transformadores de Instrumentos Terminal B</span>
            <span style="color: #666;">6</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0;">
            <span>Tabela 4 - Ajustes de Proteção Terminal A</span>
            <span style="color: #666;">6</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0;">
            <span>Tabela 5 - Ajustes de Proteção Terminal B</span>
            <span style="color: #666;">7</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- PÁGINA 3: INFORMAÇÕES DO PROJETO -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <div class="page">
      <div class="header-cover">
        ${clienteLogo ? `<img src="${clienteLogo}" alt="Logo" class="logo">` : ''}
        <h1>${report.documento.titulo}</h1>
        <p class="subtitle">${report.secao_1_capa.conteudo.projeto}</p>
        <p class="meta">${report.documento.versao} | ${report.documento.data}</p>
      </div>
      
      <div class="info-box">
        <h4>📋 1. Informações do Projeto</h4>
        <p><strong>Cliente:</strong> ${report.secao_1_capa.conteudo.cliente}</p>
        <p><strong>Responsável Técnico:</strong> ${report.secao_1_capa.conteudo.responsavel_tecnico}</p>
        <p><strong>Registro:</strong> ${report.secao_1_capa.conteudo.responsavel_crea}</p>
        <p><strong>Local:</strong> ${report.secao_1_capa.conteudo.local}</p>
      </div>
      
      <h2>2. Objetivo</h2>
      <p>${report.secao_2_objetivo.texto}</p>
      
      <h2>3. Escopo</h2>
      <p>${report.secao_3_escopo.texto}</p>
      <h4>3.1. Funções de Proteção</h4>
      <ul>
        ${report.secao_3_escopo.lista_funcoes.map(f => `<li>${f}</li>`).join('')}
      </ul>
      
      <h4>3.2. Equipamentos de Proteção</h4>
      <div class="info-grid">
        <div class="terminal-box terminal-a">
          <h4>🔌 Terminal A: ${report.secao_3_escopo.equipamentos.terminal_a.nome}</h4>
          <p><strong>Relé:</strong> ${report.secao_3_escopo.equipamentos.terminal_a.rele}</p>
          <p><strong>Funções:</strong> ${report.secao_3_escopo.equipamentos.terminal_a.funcoes}</p>
        </div>
        <div class="terminal-box terminal-b">
          <h4>🔌 Terminal B: ${report.secao_3_escopo.equipamentos.terminal_b.nome}</h4>
          <p><strong>Relé:</strong> ${report.secao_3_escopo.equipamentos.terminal_b.rele}</p>
          <p><strong>Funções:</strong> ${report.secao_3_escopo.equipamentos.terminal_b.funcoes}</p>
        </div>
      </div>
      
      <h2>4. Documentos Normativos e de Referência</h2>
      <p>${report.secao_4_normas.texto}</p>
      <ul>
        ${report.secao_4_normas.normas_aplicadas.map(n => `<li>${n}</li>`).join('')}
      </ul>
    </div>
    
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- PÁGINA 4: METODOLOGIA -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <div class="page">
      <h2>5. Desenvolvimento Metodológico</h2>
      <p>${report.secao_5_metodologia.intro}</p>
      
      <h3>5.1. Proteção de Distância (21/21N)</h3>
      <p>${report.secao_5_metodologia.subsecao_21.conceito}</p>
      
      <div class="zone-box zone-z1">
        <strong>⚡ 5.1.1. ZONA 1 (Subalcance - Instantânea)</strong>
        <p>${cleanBold(report.secao_5_metodologia.subsecao_21.zona_1.texto)}</p>
        <p class="valores">
          📍 Alcance A: <strong>${report.secao_5_metodologia.subsecao_21.zona_1.alcance_a} Ω</strong> | 
          Alcance B: <strong>${report.secao_5_metodologia.subsecao_21.zona_1.alcance_b} Ω</strong> | 
          ⏱️ Tempo: <strong>${report.secao_5_metodologia.subsecao_21.zona_1.tempo}s</strong>
        </p>
      </div>
      
      <div class="zone-box zone-z2">
        <strong>⚡ 5.1.2. ZONA 2 (Sobrealcance - Temporizada)</strong>
        <p>${cleanBold(report.secao_5_metodologia.subsecao_21.zona_2.texto)}</p>
        <p class="valores">
          📍 Alcance A: <strong>${report.secao_5_metodologia.subsecao_21.zona_2.alcance_a} Ω</strong> | 
          Alcance B: <strong>${report.secao_5_metodologia.subsecao_21.zona_2.alcance_b} Ω</strong> | 
          ⏱️ Tempo: <strong>${report.secao_5_metodologia.subsecao_21.zona_2.tempo}s</strong>
        </p>
      </div>
      
      <div class="zone-box zone-z3">
        <strong>⚡ 5.1.3. ZONA 3 (Retaguarda)</strong>
        <p>${cleanBold(report.secao_5_metodologia.subsecao_21.zona_3.texto)}</p>
        <p class="valores">
          📍 Alcance A: <strong>${report.secao_5_metodologia.subsecao_21.zona_3.alcance_a} Ω</strong> | 
          Alcance B: <strong>${report.secao_5_metodologia.subsecao_21.zona_3.alcance_b} Ω</strong> | 
          ⏱️ Tempo: <strong>${report.secao_5_metodologia.subsecao_21.zona_3.tempo}s</strong>
        </p>
      </div>
      
      <div class="zone-box zone-k0">
        <strong>🌍 5.1.4. COMPENSAÇÃO K0 (Terra)</strong>
        <p>${report.secao_5_metodologia.subsecao_21.compensacao_k0.texto}</p>
        <p class="valores">
          Terminal A: |K0| = <strong>${report.secao_5_metodologia.subsecao_21.compensacao_k0.modulo_a}</strong> ∠<strong>${report.secao_5_metodologia.subsecao_21.compensacao_k0.angulo_a}°</strong> | 
          Terminal B: |K0| = <strong>${report.secao_5_metodologia.subsecao_21.compensacao_k0.modulo_b}</strong> ∠<strong>${report.secao_5_metodologia.subsecao_21.compensacao_k0.angulo_b}°</strong>
        </p>
      </div>
      
      <h3>5.2. Proteção Diferencial de Linha (87L)</h3>
      <p>${report.secao_5_metodologia.subsecao_87l.conceito}</p>
      <p><strong>${report.secao_5_metodologia.subsecao_87l.compensacao_carga.titulo}:</strong> ${report.secao_5_metodologia.subsecao_87l.compensacao_carga.texto}</p>
      
      <table>
        <tr><th>Parâmetro</th><th>Terminal A</th><th>Terminal B</th></tr>
        <tr><td>Pickup</td><td>${report.secao_5_metodologia.subsecao_87l.ajustes.pickup_a} A (${report.secao_5_metodologia.subsecao_87l.ajustes.pickup_pu_a}% In)</td><td>${report.secao_5_metodologia.subsecao_87l.ajustes.pickup_b} A (${report.secao_5_metodologia.subsecao_87l.ajustes.pickup_pu_b}% In)</td></tr>
        <tr><td>Slope 1</td><td colspan="2">${report.secao_5_metodologia.subsecao_87l.ajustes.slope_1}%</td></tr>
        <tr><td>Slope 2</td><td colspan="2">${report.secao_5_metodologia.subsecao_87l.ajustes.slope_2}%</td></tr>
        <tr><td>Breakpoint</td><td colspan="2">${report.secao_5_metodologia.subsecao_87l.ajustes.breakpoint} A</td></tr>
      </table>
      
      <h3>5.3. Sobrecorrente Direcional de Terra (67N)</h3>
      <p>${report.secao_5_metodologia.subsecao_67n.conceito}</p>
      <p><strong>${report.secao_5_metodologia.subsecao_67n.polarizacao.titulo}:</strong> ${cleanBold(report.secao_5_metodologia.subsecao_67n.polarizacao.texto)}</p>
      
      <table>
        <tr><th>Parâmetro</th><th>Terminal A</th><th>Terminal B</th></tr>
        <tr><td>67N Pickup Forward</td><td>${report.secao_5_metodologia.subsecao_67n.ajustes.pickup_fwd_a} A</td><td>${report.secao_5_metodologia.subsecao_67n.ajustes.pickup_fwd_b} A</td></tr>
        <tr><td>67N Pickup Reverse</td><td>${report.secao_5_metodologia.subsecao_67n.ajustes.pickup_rev_a} A</td><td>${report.secao_5_metodologia.subsecao_67n.ajustes.pickup_rev_b} A</td></tr>
        <tr><td>MTA</td><td colspan="2">${report.secao_5_metodologia.subsecao_67n.ajustes.mta}°</td></tr>
        <tr><td>Curva</td><td colspan="2">${report.secao_5_metodologia.subsecao_67n.ajustes.curva.type}, TMS=${report.secao_5_metodologia.subsecao_67n.ajustes.curva.TMS}</td></tr>
      </table>
      
      <h3>5.4. Sobrecorrente de Fase (50/51)</h3>
      <p>${report.secao_5_metodologia.subsecao_50_51.conceito}</p>
      
      <table>
        <tr><th>Função</th><th>Terminal A</th><th>Terminal B</th></tr>
        <tr><td>51 Pickup</td><td>${report.secao_5_metodologia.subsecao_50_51.unidade_51.pickup_a} A</td><td>${report.secao_5_metodologia.subsecao_50_51.unidade_51.pickup_b} A</td></tr>
        <tr><td>50 Pickup</td><td>${report.secao_5_metodologia.subsecao_50_51.unidade_50.pickup_a} A</td><td>${report.secao_5_metodologia.subsecao_50_51.unidade_50.pickup_b} A</td></tr>
        <tr><td>51N Pickup</td><td>${report.secao_5_metodologia.subsecao_50_51.unidade_51n.pickup_a} A</td><td>${report.secao_5_metodologia.subsecao_50_51.unidade_51n.pickup_b} A</td></tr>
        <tr><td>50N Pickup</td><td>${report.secao_5_metodologia.subsecao_50_51.unidade_50n.pickup_a} A</td><td>${report.secao_5_metodologia.subsecao_50_51.unidade_50n.pickup_b} A</td></tr>
      </table>
    </div>
    
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- PÁGINA 3: ANÁLISE E CONCLUSÕES -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <div class="page">
      <h2>6. Análise dos Resultados</h2>
      <p>${report.secao_6_analise.intro}</p>
      
      <h3>${report.secao_6_analise.analise_critica_tc.titulo}</h3>
      <p>${report.secao_6_analise.analise_critica_tc.texto}</p>
      
      <h3>${report.secao_6_analise.analise_critica_cobertura.titulo}</h3>
      ${report.secao_6_analise.analise_critica_cobertura.validacao_obrigatoria ? `
      <div class="warning">
        <strong>⚠️ VALIDAÇÃO OBRIGATÓRIA COES (PR-20)</strong>
        <p>${report.secao_6_analise.analise_critica_cobertura.texto}</p>
      </div>
      ` : `<p>${report.secao_6_analise.analise_critica_cobertura.texto}</p>`}
      
      <h4>📊 Tabela de Falta Deslizante (Sliding Fault)</h4>
      <table>
        <tr>
          <th>Posição (%)</th>
          <th>Distância (km)</th>
          <th>Z Vista A (Ω)</th>
          <th>Zona A</th>
          <th>Z Vista B (Ω)</th>
          <th>Zona B</th>
        </tr>
        ${report.secao_6_analise.analise_critica_cobertura.validacao.map(v => `
        <tr>
          <td><strong>${v.percent}%</strong></td>
          <td>${v.distance_km} km</td>
          <td>${v.terminal_A.z_seen} Ω</td>
          <td class="sliding-${v.terminal_A.zone.toLowerCase()}">${v.terminal_A.zone}</td>
          <td>${v.terminal_B.z_seen} Ω</td>
          <td class="sliding-${v.terminal_B.zone.toLowerCase()}">${v.terminal_B.zone}</td>
        </tr>
        `).join('')}
      </table>
      
      <h2>7. Recomendações</h2>
      <ul>
        ${report.secao_7_recomendacoes.lista.map(r => `<li>${r}</li>`).join('')}
      </ul>
      
      <h2>8. Conclusões</h2>
      <p>${cleanBold(report.secao_8_conclusoes.texto)}</p>
      
      ${isSEL421 ? `
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- APÊNDICE: TABELA DE AJUSTES SEL-421 (WORD BITS) -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="page">
        <h2 style="color: #0066cc; border-bottom: 3px solid #0066cc;">📋 Tabela de Ajustes - SEL-421 (Word Bits)</h2>
        <p style="color: #666; margin-bottom: 20px;">
          Os parâmetros calculados neste estudo devem ser inseridos nas seguintes células de configuração do relé SEL-421.
          <br><strong>Referência:</strong> SEL-421 Instruction Manual - Settings Summary
        </p>
        
        <!-- PROTEÇÃO DE DISTÂNCIA (21) -->
        <h3 style="color: #4caf50;">🔷 Proteção de Distância (21/21N)</h3>
        <table style="font-size: 9pt;">
          <tr>
            <th style="width: 15%;">Word Bit</th>
            <th style="width: 20%;">Descrição</th>
            <th style="width: 12%;">Terminal A</th>
            <th style="width: 12%;">Terminal B</th>
            <th style="width: 8%;">Unidade</th>
            <th style="width: 33%;">Observação</th>
          </tr>
          <tr>
            <td><strong>Z1MAG</strong></td>
            <td>Alcance Zona 1 (Mho)</td>
            <td style="color: #4caf50; font-weight: bold;">${terminalA_res.z1_reach}</td>
            <td style="color: #9c27b0; font-weight: bold;">${terminalB_res.z1_reach}</td>
            <td>Ω (sec)</td>
            <td>${zonasProtecao.z1_percent}% da impedância da linha</td>
          </tr>
          <tr>
            <td><strong>Z1ANG</strong></td>
            <td>Ângulo Zona 1</td>
            <td colspan="2" style="text-align: center;">${terminalA_res.z1_ang || (Math.atan2(linha.X1, linha.R1) * 180 / Math.PI).toFixed(1)}</td>
            <td>°</td>
            <td>Ângulo característico da linha</td>
          </tr>
          <tr>
            <td><strong>Z2MAG</strong></td>
            <td>Alcance Zona 2 (Mho)</td>
            <td style="color: #4caf50; font-weight: bold;">${terminalA_res.z2_reach}</td>
            <td style="color: #9c27b0; font-weight: bold;">${terminalB_res.z2_reach}</td>
            <td>Ω (sec)</td>
            <td>${zonasProtecao.z2_percent}% da impedância da linha</td>
          </tr>
          <tr>
            <td><strong>Z2D</strong></td>
            <td>Tempo Zona 2</td>
            <td colspan="2" style="text-align: center;">${(zonasProtecao.z2_tempo / 1000).toFixed(2)}</td>
            <td>s</td>
            <td>Atraso temporizado (${zonasProtecao.z2_tempo} ms)</td>
          </tr>
          <tr>
            <td><strong>Z3MAG</strong></td>
            <td>Alcance Zona 3 (Mho)</td>
            <td style="color: #4caf50; font-weight: bold;">${terminalA_res.z3_reach}</td>
            <td style="color: #9c27b0; font-weight: bold;">${terminalB_res.z3_reach}</td>
            <td>Ω (sec)</td>
            <td>${zonasProtecao.z3_percent}% (Retaguarda Remota)</td>
          </tr>
          <tr>
            <td><strong>Z3D</strong></td>
            <td>Tempo Zona 3</td>
            <td colspan="2" style="text-align: center;">${(zonasProtecao.z3_tempo / 1000).toFixed(2)}</td>
            <td>s</td>
            <td>Atraso temporizado (${zonasProtecao.z3_tempo} ms)</td>
          </tr>
          ${zonasProtecao.z4_habilitada ? `
          <tr>
            <td><strong>Z4MAG</strong></td>
            <td>Alcance Zona 4 (${zonasProtecao.z4_reversa ? 'Reversa' : 'Forward'})</td>
            <td style="color: #4caf50; font-weight: bold;">${terminalA_res.z4_reach}</td>
            <td style="color: #9c27b0; font-weight: bold;">${terminalB_res.z4_reach}</td>
            <td>Ω (sec)</td>
            <td>${zonasProtecao.z4_percent}% (Direção: ${zonasProtecao.z4_reversa ? 'REVERSE' : 'FORWARD'})</td>
          </tr>
          <tr>
            <td><strong>Z4D</strong></td>
            <td>Tempo Zona 4</td>
            <td colspan="2" style="text-align: center;">${(zonasProtecao.z4_tempo / 1000).toFixed(2)}</td>
            <td>s</td>
            <td>${zonasProtecao.z4_reversa ? 'Backup de barra/BF' : 'Sobrealcance POTT/PUTT'}</td>
          </tr>
          ` : `
          <tr>
            <td><strong>Z4MAG</strong></td>
            <td>Alcance Zona 4</td>
            <td colspan="2" style="text-align: center; color: #999;">DESABILITADA</td>
            <td>Ω (sec)</td>
            <td>Zona 4 não habilitada neste estudo (opcional)</td>
          </tr>
          `}
          <tr style="background: #e8f5e9;">
            <td><strong>k0MAG</strong></td>
            <td>Magnitude K0 (Terra)</td>
            <td style="font-weight: bold;">${terminalA_res.k0_modulo}</td>
            <td style="font-weight: bold;">${terminalB_res.k0_modulo}</td>
            <td>pu</td>
            <td>|K0| = |(Z0 - Z1) / 3Z1|</td>
          </tr>
          <tr style="background: #e8f5e9;">
            <td><strong>k0ANG</strong></td>
            <td>Ângulo K0 (Terra)</td>
            <td style="font-weight: bold;">${terminalA_res.k0_angulo}</td>
            <td style="font-weight: bold;">${terminalB_res.k0_angulo}</td>
            <td>°</td>
            <td>∠K0 = ∠(Z0 - Z1) / 3Z1</td>
          </tr>
        </table>
        
        <!-- TRANSFORMADORES DE INSTRUMENTOS -->
        <h3 style="color: #2196f3; margin-top: 25px;">🔷 Transformadores de Instrumentos (CT/PT)</h3>
        <table style="font-size: 9pt;">
          <tr>
            <th style="width: 15%;">Word Bit</th>
            <th style="width: 25%;">Descrição</th>
            <th style="width: 15%;">Terminal A</th>
            <th style="width: 15%;">Terminal B</th>
            <th style="width: 30%;">Observação</th>
          </tr>
          <tr>
            <td><strong>CTRW</strong></td>
            <td>Relação TC (Terminal W)</td>
            <td style="font-weight: bold;">${terminalA.rtc}</td>
            <td style="font-weight: bold;">${terminalB.rtc}</td>
            <td>Ip/Is (Ex: ${terminalA.rtc}/1 ou ${terminalA.rtc}/5)</td>
          </tr>
          <tr>
            <td><strong>CTRX</strong></td>
            <td>Relação TC (Terminal X)</td>
            <td colspan="2" style="text-align: center;">Mesmo que CTRW</td>
            <td>Se aplicável para 87L</td>
          </tr>
          <tr>
            <td><strong>PTRY</strong></td>
            <td>Relação TP (Terminal Y)</td>
            <td style="font-weight: bold;">${terminalA.rtp}</td>
            <td style="font-weight: bold;">${terminalB.rtp}</td>
            <td>Vp/Vs (Ex: ${(terminalA.rtp * Math.sqrt(3) / 1000).toFixed(1)} kV / ${(1000 / Math.sqrt(3)).toFixed(0)} V)</td>
          </tr>
          <tr>
            <td><strong>PTRZ</strong></td>
            <td>Relação TP (Terminal Z)</td>
            <td colspan="2" style="text-align: center;">Mesmo que PTRY</td>
            <td>Se aplicável</td>
          </tr>
        </table>
        
        <!-- SOBRECORRENTE DIRECIONAL (67) -->
        <h3 style="color: #ff9800; margin-top: 25px;">🔷 Sobrecorrente Direcional de Fase (67)</h3>
        <table style="font-size: 9pt;">
          <tr>
            <th style="width: 15%;">Word Bit</th>
            <th style="width: 25%;">Descrição</th>
            <th style="width: 15%;">Terminal A</th>
            <th style="width: 15%;">Terminal B</th>
            <th style="width: 30%;">Observação</th>
          </tr>
          <tr>
            <td><strong>67P1P</strong></td>
            <td>Pickup 67 Forward</td>
            <td style="font-weight: bold;">${terminalA_res.ansi_67_pickup_fwd}</td>
            <td style="font-weight: bold;">${terminalB_res.ansi_67_pickup_fwd}</td>
            <td>A (sec) - Direção Forward</td>
          </tr>
          <tr>
            <td><strong>67P2P</strong></td>
            <td>Pickup 67 Reverse</td>
            <td style="font-weight: bold;">${terminalA_res.ansi_67_pickup_rev}</td>
            <td style="font-weight: bold;">${terminalB_res.ansi_67_pickup_rev}</td>
            <td>A (sec) - Direção Reverse</td>
          </tr>
          <tr>
            <td><strong>F32P / R32P</strong></td>
            <td>Declaração Direcional</td>
            <td colspan="2" style="text-align: center;">Automático (Baseado em V2/I2)</td>
            <td>Word Bits de saída</td>
          </tr>
          <tr>
            <td><strong>67P1D</strong></td>
            <td>Delay 67 Forward</td>
            <td colspan="2" style="text-align: center;">0.00</td>
            <td>s (Instantâneo ou conforme coordenação)</td>
          </tr>
        </table>
        
        <!-- SOBRECORRENTE DIRECIONAL DE TERRA (67N) -->
        <h3 style="color: #9c27b0; margin-top: 25px;">🔷 Sobrecorrente Direcional de Terra (67N/67G)</h3>
        <table style="font-size: 9pt;">
          <tr>
            <th style="width: 15%;">Word Bit</th>
            <th style="width: 25%;">Descrição</th>
            <th style="width: 15%;">Terminal A</th>
            <th style="width: 15%;">Terminal B</th>
            <th style="width: 30%;">Observação</th>
          </tr>
          <tr>
            <td><strong>67G1P</strong></td>
            <td>Pickup 67N Forward</td>
            <td style="font-weight: bold;">${terminalA_res.ansi_67n_pickup_fwd}</td>
            <td style="font-weight: bold;">${terminalB_res.ansi_67n_pickup_fwd}</td>
            <td>A (sec) - Corrente 3I0</td>
          </tr>
          <tr>
            <td><strong>67G2P</strong></td>
            <td>Pickup 67N Reverse</td>
            <td style="font-weight: bold;">${terminalA_res.ansi_67n_pickup_rev}</td>
            <td style="font-weight: bold;">${terminalB_res.ansi_67n_pickup_rev}</td>
            <td>A (sec) - Corrente 3I0</td>
          </tr>
          <tr>
            <td><strong>F32Q / R32Q</strong></td>
            <td>Declaração Direcional (Seq-)</td>
            <td colspan="2" style="text-align: center;">Automático</td>
            <td>Polarização por V2 ou 3V0</td>
          </tr>
          <tr>
            <td><strong>67G1MTA</strong></td>
            <td>MTA 67N (Ângulo Máximo Torque)</td>
            <td colspan="2" style="text-align: center; font-weight: bold;">${terminalA_res.ansi_67n_mta}</td>
            <td>° (Tipicamente -45° a -90°)</td>
          </tr>
          <tr>
            <td><strong>67G1TC</strong></td>
            <td>Curva de Tempo 67N</td>
            <td colspan="2" style="text-align: center;">${terminalA_res.curve_67n?.type || 'IEC Very Inverse'}</td>
            <td>U1 a U5 / C1 a C5</td>
          </tr>
          <tr>
            <td><strong>67G1TD</strong></td>
            <td>Time Dial 67N</td>
            <td colspan="2" style="text-align: center; font-weight: bold;">${terminalA_res.curve_67n?.TMS || 0.5}</td>
            <td>Multiplicador de tempo</td>
          </tr>
        </table>
        
        <!-- SOBRECORRENTE NÃO DIRECIONAL (50/51) -->
        <h3 style="color: #f44336; margin-top: 25px;">🔷 Sobrecorrente de Fase e Terra (50/51)</h3>
        <table style="font-size: 9pt;">
          <tr>
            <th style="width: 15%;">Word Bit</th>
            <th style="width: 25%;">Descrição</th>
            <th style="width: 15%;">Terminal A</th>
            <th style="width: 15%;">Terminal B</th>
            <th style="width: 30%;">Observação</th>
          </tr>
          <tr>
            <td><strong>51S1P</strong></td>
            <td>Pickup 51 (Fase Temporizada)</td>
            <td style="font-weight: bold;">${terminalA_res.ansi_51_pickup}</td>
            <td style="font-weight: bold;">${terminalB_res.ansi_51_pickup}</td>
            <td>A (sec) - Acima de I_carga</td>
          </tr>
          <tr>
            <td><strong>50P1P</strong></td>
            <td>Pickup 50 (Fase Instantânea)</td>
            <td style="font-weight: bold;">${terminalA_res.ansi_50_pickup}</td>
            <td style="font-weight: bold;">${terminalB_res.ansi_50_pickup}</td>
            <td>A (sec) - Coordenado com Z2</td>
          </tr>
          <tr>
            <td><strong>51S1TC</strong></td>
            <td>Curva de Tempo 51</td>
            <td colspan="2" style="text-align: center;">IEC Very Inverse (C2)</td>
            <td>Selecionar conforme coordenação</td>
          </tr>
          <tr style="background: #fce4ec;">
            <td><strong>50G1P</strong></td>
            <td>Pickup 50N (Terra Instantânea)</td>
            <td style="font-weight: bold;">${terminalA_res.ansi_50n_pickup}</td>
            <td style="font-weight: bold;">${terminalB_res.ansi_50n_pickup}</td>
            <td>A (sec) - Corrente 3I0</td>
          </tr>
          <tr style="background: #fce4ec;">
            <td><strong>51G1P</strong></td>
            <td>Pickup 51N (Terra Temporizada)</td>
            <td style="font-weight: bold;">${terminalA_res.ansi_51n_pickup}</td>
            <td style="font-weight: bold;">${terminalB_res.ansi_51n_pickup}</td>
            <td>A (sec) - Corrente 3I0</td>
          </tr>
        </table>
        
        <!-- DIFERENCIAL DE LINHA (87L) -->
        <h3 style="color: #00bcd4; margin-top: 25px;">🔷 Proteção Diferencial de Linha (87L)</h3>
        <table style="font-size: 9pt;">
          <tr>
            <th style="width: 15%;">Word Bit</th>
            <th style="width: 25%;">Descrição</th>
            <th style="width: 15%;">Terminal A</th>
            <th style="width: 15%;">Terminal B</th>
            <th style="width: 30%;">Observação</th>
          </tr>
          <tr>
            <td><strong>87LPP</strong></td>
            <td>Pickup Diferencial</td>
            <td style="font-weight: bold;">${terminalA_res.ansi_87l_pickup}</td>
            <td style="font-weight: bold;">${terminalB_res.ansi_87l_pickup}</td>
            <td>A (sec) - ${terminalA_res.ansi_87l_pickup_pu}% In</td>
          </tr>
          <tr>
            <td><strong>87LS1</strong></td>
            <td>Slope 1</td>
            <td colspan="2" style="text-align: center; font-weight: bold;">${terminalA_res.ansi_87l_slope1}</td>
            <td>% - Região de operação normal</td>
          </tr>
          <tr>
            <td><strong>87LS2</strong></td>
            <td>Slope 2</td>
            <td colspan="2" style="text-align: center; font-weight: bold;">${terminalA_res.ansi_87l_slope2}</td>
            <td>% - Região de saturação de TC</td>
          </tr>
          <tr>
            <td><strong>87LBP</strong></td>
            <td>Breakpoint</td>
            <td colspan="2" style="text-align: center; font-weight: bold;">${terminalA_res.ansi_87l_breakpoint}</td>
            <td>A (sec) - Transição S1 → S2</td>
          </tr>
          <tr>
            <td><strong>EICHG</strong></td>
            <td>I Charging (Corrente Capacitiva)</td>
            <td colspan="2" style="text-align: center; font-weight: bold;">${terminalA_res.i_charging_ref}</td>
            <td>A (pri) - I_chg = V × B × L</td>
          </tr>
        </table>
        
        <!-- VALORES DE REFERÊNCIA CALCULADOS -->
        <h3 style="color: #607d8b; margin-top: 25px;">🔷 Valores de Referência (Cálculo de Impedância)</h3>
        <table style="font-size: 9pt;">
          <tr>
            <th style="width: 15%;">Word Bit</th>
            <th style="width: 30%;">Descrição</th>
            <th style="width: 25%;">Valor</th>
            <th style="width: 30%;">Observação</th>
          </tr>
          <tr>
            <td><strong>ZIFM</strong></td>
            <td>Magnitude Z de Sequência Positiva</td>
            <td style="font-weight: bold;">${(Math.sqrt(linha.R1 ** 2 + linha.X1 ** 2) * projeto.linha_comprimento * (terminalA.rtc / terminalA.rtp)).toFixed(4)} Ω (sec)</td>
            <td>|Z1| da linha completa</td>
          </tr>
          <tr>
            <td><strong>ZIFA</strong></td>
            <td>Ângulo Z de Sequência Positiva</td>
            <td style="font-weight: bold;">${(Math.atan2(linha.X1, linha.R1) * 180 / Math.PI).toFixed(2)}°</td>
            <td>θ = atan(X1/R1)</td>
          </tr>
          <tr>
            <td><strong>MAGZ1</strong></td>
            <td>Impedância Mho Zona 1 (Medida)</td>
            <td>Valor medido pelo relé</td>
            <td>Comparar com ${terminalA_res.z1_reach} Ω</td>
          </tr>
          <tr>
            <td><strong>MAB</strong></td>
            <td>Impedância Mho A-B (Fase-Fase)</td>
            <td>Valor medido pelo relé</td>
            <td>Para falta bifásica AB</td>
          </tr>
          <tr>
            <td><strong>MBC</strong></td>
            <td>Impedância Mho B-C (Fase-Fase)</td>
            <td>Valor medido pelo relé</td>
            <td>Para falta bifásica BC</td>
          </tr>
          <tr>
            <td><strong>MCA</strong></td>
            <td>Impedância Mho C-A (Fase-Fase)</td>
            <td>Valor medido pelo relé</td>
            <td>Para falta bifásica CA</td>
          </tr>
        </table>
        
        <div class="info-box" style="margin-top: 25px; background: #fff8e1; border-color: #ff9800;">
          <h4 style="color: #ff9800; margin: 0 0 10px 0;">⚠️ Notas Importantes - SEL-421</h4>
          <ul style="margin: 0; padding-left: 20px; font-size: 10pt;">
            <li>Os valores de corrente são em <strong>Amperes secundários</strong> (dividir corrente primária por RTC).</li>
            <li>Os valores de impedância são em <strong>Ohms secundários</strong> (multiplicar por K = RTC/RTP).</li>
            <li>Verificar compatibilidade das curvas de tempo com a versão do firmware.</li>
            <li>Os Word Bits <strong>F32P/R32P</strong> e <strong>F32Q/R32Q</strong> são saídas (declaração direcional).</li>
            <li>Consultar o manual SEL-421 Instruction Manual para configurações avançadas.</li>
          </ul>
        </div>
      </div>
      ` : ''}
      
      <h2>9. Bibliografia</h2>
      <ul>
        ${report.secao_9_bibliografia.lista.map((b, i) => `<li>[${i + 1}] ${b}</li>`).join('')}
      </ul>
      
      <h2>10. Apêndices</h2>
      <ul>
        ${report.secao_10_apendices.conteudo.map(a => `<li>${a}</li>`).join('')}
      </ul>
      
      ${uploadedImage ? `
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <!-- APÊNDICE D: COORDENOGRAMA ANEXADO -->
      <!-- ═══════════════════════════════════════════════════════════════ -->
      <div class="page" style="page-break-before: always;">
        <h2 style="color: #0066cc; border-bottom: 3px solid #0066cc; padding-bottom: 8px;">
          📊 Apêndice D: Coordenograma R-X
        </h2>
        <p style="color: #666; font-size: 10pt; margin-bottom: 20px;">
          Diagrama de coordenação de impedância (Plano R-X) para visualização das zonas de proteção.
        </p>
        <div style="text-align: center; margin: 20px 0; padding: 20px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px;">
          <img src="${uploadedImage}" alt="Coordenograma R-X" style="max-width: 100%; max-height: 600px; border: 1px solid #ccc; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
          <p style="color: #666; font-size: 9pt; margin-top: 12px; font-style: italic;">
            Figura: Coordenograma R-X - ${projeto.linha_nome || 'Linha de Transmissão'}
          </p>
        </div>
        <div style="background: #e8f4fd; border: 1px solid #b6d4fe; border-radius: 6px; padding: 12px; margin-top: 16px;">
          <h4 style="color: #0d6efd; margin: 0 0 8px 0; font-size: 11pt;">ℹ️ Informações do Diagrama</h4>
          <ul style="margin: 0; padding-left: 20px; font-size: 10pt; color: #333;">
            <li><strong>Linha:</strong> ${projeto.linha_nome || 'N/A'} | ${projeto.linha_comprimento} km | ${projeto.V_nom} kV</li>
            <li><strong>Ângulo da Linha:</strong> θ = ${(Math.atan2(linha.X1, linha.R1) * 180 / Math.PI).toFixed(2)}°</li>
            <li><strong>Zonas Configuradas:</strong> Z1=${zonasProtecao.z1_percent}% | Z2=${zonasProtecao.z2_percent}% | Z3=${zonasProtecao.z3_percent}% | Z4=${zonasProtecao.z4_habilitada ? zonasProtecao.z4_percent + '% (' + (zonasProtecao.z4_reversa ? 'Rev' : 'Fwd') + ')' : 'OFF'}</li>
            <li><strong>Norma Aplicada:</strong> ${projeto.norma}</li>
          </ul>
        </div>
      </div>
      ` : ''}
      
      <div class="signature">
        ${engAssinatura ? `<img src="${engAssinatura}" alt="Assinatura">` : '<div class="line"></div>'}
        <p><strong>${report.secao_1_capa.conteudo.responsavel_tecnico}</strong></p>
        <p>${report.secao_1_capa.conteudo.responsavel_crea}</p>
        <p style="color: #666; font-size: 10pt; margin-top: 5px;">Responsável Técnico</p>
      </div>
      
      <div class="footer">
        <p>${report.documento.titulo} | ${report.documento.versao} | Gerado em ${new Date().toLocaleString('pt-BR')}</p>
        <p>Sistema de Engenharia de Proteção (SEP) - Memorial de Cálculo</p>
      </div>
    </div>
  </div>
</body>
</html>`;

    // Criar e baixar o arquivo HTML
    const blob = new Blob([htmlContent], {
      type: 'text/html;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Memorial_${report.documento.titulo.replace('MEMORIAL DE CÁLCULO DE PROTEÇÃO - ', '').replace(/\s+/g, '_')}_${report.documento.versao.replace(/\s+/g, '')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const tabs = [{
    icon: Database,
    label: 'Cadastros'
  }, {
    icon: Settings,
    label: 'Projeto & Linha'
  }, {
    icon: Zap,
    label: 'Terminais'
  }, {
    icon: Calculator,
    label: 'Cálculos'
  }, {
    icon: CheckCircle,
    label: 'Validação'
  }, {
    icon: FileText,
    label: 'Relatório'
  }, {
    icon: Activity,
    label: 'Coordenograma'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "sep-app"
  }, /*#__PURE__*/React.createElement("style", null, `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        .sep-app {
          min-height: 100vh;
          background: #0a0e14;
          background-image: linear-gradient(135deg, #0a0e14 0%, #12171f 50%, #0d1117 100%);
          background-attachment: fixed;
          background-size: cover;
          color: #e6edf3;
          font-family: 'IBM Plex Sans', sans-serif;
        }
        
        /* Animação para indicador de tempo real */
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        
        /* HEADER */
        .header {
          background: linear-gradient(180deg, rgba(22,27,34,0.98) 0%, rgba(13,17,23,0.95) 100%);
          border-bottom: 1px solid #30363d;
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(12px);
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .logo-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(249,115,22,0.3);
        }
        
        .logo-text h1 {
          font-family: 'JetBrains Mono', monospace;
          font-size: 20px;
          font-weight: 700;
          color: #f97316;
          letter-spacing: -0.5px;
        }
        
        .logo-text p {
          font-size: 11px;
          color: #8b949e;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .header-info {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        
        .info-item {
          text-align: right;
        }
        
        .info-item label {
          font-size: 10px;
          color: #6e7681;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .info-item span {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: #58a6ff;
        }
        
        /* TAB NAVIGATION */
        .tab-nav {
          display: flex;
          gap: 4px;
          padding: 16px 32px;
          background: rgba(22,27,34,0.6);
          border-bottom: 1px solid #21262d;
        }
        
        .tab-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 6px;
          color: #8b949e;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }
        
        .tab-btn:hover {
          background: rgba(88,166,255,0.08);
          color: #c9d1d9;
        }
        
        .tab-btn.active {
          background: rgba(249,115,22,0.12);
          border-color: rgba(249,115,22,0.3);
          color: #f97316;
        }
        
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -17px;
          left: 50%;
          transform: translateX(-50%);
          width: 40%;
          height: 2px;
          background: #f97316;
          border-radius: 2px 2px 0 0;
        }
        
        .badge {
          background: #238636;
          color: #fff;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 600;
        }
        
        /* MAIN CONTENT */
        .main-content {
          padding: 32px;
          max-width: 1600px;
          margin: 0 auto;
        }
        
        .panel {
          background: rgba(22,27,34,0.8);
          border: 1px solid #30363d;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          backdrop-filter: blur(8px);
        }
        
        .panel-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #21262d;
        }
        
        .panel-header h2 {
          font-size: 16px;
          font-weight: 600;
          color: #e6edf3;
        }
        
        .panel-header .icon {
          width: 36px;
          height: 36px;
          background: rgba(249,115,22,0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f97316;
        }
        
        /* INPUT GRID */
        .input-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        
        .input-grid-2 {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .input-grid-3 {
          grid-template-columns: repeat(3, 1fr);
        }
        
        .input-grid-4 {
          grid-template-columns: repeat(4, 1fr);
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .input-group label {
          font-size: 11px;
          font-weight: 600;
          color: #8b949e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .input-wrapper {
          display: flex;
          align-items: center;
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 6px;
          overflow: hidden;
          transition: all 0.2s;
        }
        
        .input-wrapper:focus-within {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.15);
        }
        
        .input-wrapper input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 10px 12px;
          color: #e6edf3;
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          outline: none;
        }
        
        .input-wrapper input::placeholder {
          color: #484f58;
        }
        
        .input-wrapper .unit {
          padding: 10px 12px;
          background: rgba(48,54,61,0.5);
          color: #6e7681;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          border-left: 1px solid #30363d;
          min-width: 50px;
          text-align: center;
        }
        
        select {
          width: 100%;
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 6px;
          padding: 10px 12px;
          color: #e6edf3;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14px;
          cursor: pointer;
          outline: none;
          transition: all 0.2s;
        }
        
        select:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.15);
        }
        
        /* SPLIT VIEW */
        .split-view {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        
        .terminal-panel {
          background: rgba(13,17,23,0.6);
          border: 1px solid #30363d;
          border-radius: 12px;
          padding: 24px;
        }
        
        .terminal-panel.local {
          border-top: 3px solid #3fb950;
        }
        
        .terminal-panel.remote {
          border-top: 3px solid #a371f7;
        }
        
        .terminal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        
        .terminal-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .terminal-badge {
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .terminal-badge.local {
          background: rgba(63,185,80,0.15);
          color: #3fb950;
        }
        
        .terminal-badge.remote {
          background: rgba(163,113,247,0.15);
          color: #a371f7;
        }
        
        /* RESULTS TABLE */
        .results-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 16px;
        }
        
        .results-table th,
        .results-table td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid #21262d;
        }
        
        .results-table th {
          background: rgba(48,54,61,0.3);
          font-size: 11px;
          font-weight: 600;
          color: #8b949e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .results-table td {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
        }
        
        .results-table tr:hover {
          background: rgba(88,166,255,0.05);
        }
        
        .zone-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .zone-chip.z1 { background: rgba(63,185,80,0.2); color: #3fb950; }
        .zone-chip.z2 { background: rgba(88,166,255,0.2); color: #58a6ff; }
        .zone-chip.z3 { background: rgba(210,153,34,0.2); color: #d29922; }
        .zone-chip.z4 { background: rgba(163,113,247,0.2); color: #a371f7; }
        
        .status-ok { color: #3fb950; }
        .status-fail { color: #f85149; }
        .status-backup { color: #d29922; }
        
        /* BUTTONS */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: #fff;
          box-shadow: 0 4px 16px rgba(249,115,22,0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(249,115,22,0.4);
        }
        
        .btn-secondary {
          background: rgba(48,54,61,0.6);
          color: #e6edf3;
          border: 1px solid #30363d;
        }
        
        .btn-secondary:hover {
          background: rgba(48,54,61,0.8);
          border-color: #8b949e;
        }
        
        /* UPLOAD ZONE */
        .upload-zone {
          border: 2px dashed #30363d;
          border-radius: 12px;
          padding: 48px;
          text-align: center;
          transition: all 0.2s;
          cursor: pointer;
        }
        
        .upload-zone:hover,
        .upload-zone.dragover {
          border-color: #f97316;
          background: rgba(249,115,22,0.05);
        }
        
        .upload-zone .icon {
          width: 64px;
          height: 64px;
          background: rgba(48,54,61,0.5);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #8b949e;
        }
        
        .upload-zone h3 {
          font-size: 16px;
          color: #e6edf3;
          margin-bottom: 8px;
        }
        
        .upload-zone p {
          font-size: 13px;
          color: #6e7681;
        }
        
        .uploaded-preview {
          max-width: 100%;
          max-height: 400px;
          border-radius: 8px;
          margin-top: 16px;
        }
        
        /* REPORT PREVIEW */
        .report-preview {
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 8px;
          padding: 24px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          line-height: 1.8;
          max-height: 500px;
          overflow-y: auto;
        }
        
        .report-preview pre {
          white-space: pre-wrap;
          color: #8b949e;
        }
        
        /* VALIDATION CHART */
        .validation-chart {
          background: #0d1117;
          border-radius: 8px;
          padding: 24px;
          height: 300px;
          position: relative;
          overflow: hidden;
        }
        
        .chart-grid {
          position: absolute;
          inset: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .chart-line {
          border-bottom: 1px dashed #21262d;
          position: relative;
        }
        
        .chart-line span {
          position: absolute;
          left: -40px;
          top: -8px;
          font-size: 10px;
          color: #6e7681;
          font-family: 'JetBrains Mono', monospace;
        }
        
        .zone-bar {
          position: absolute;
          bottom: 24px;
          height: 20px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 600;
          color: #fff;
        }
        
        /* RESULT CARDS GRID */
        .result-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 16px;
          margin-top: 24px;
        }
        
        .result-card {
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }
        
        .result-card.highlight {
          border-color: #f97316;
          background: rgba(249,115,22,0.05);
        }
        
        .result-card .result-title {
          display: block;
          font-size: 10px;
          color: #6e7681;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        
        .result-card .result-value {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 20px;
          font-weight: 700;
          color: #e6edf3;
        }
        
        .result-card .result-unit {
          display: block;
          font-size: 11px;
          color: #8b949e;
          margin-top: 4px;
        }
        
        /* SECTION DIVIDER */
        .section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 32px 0 16px;
          color: #8b949e;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .section-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, #30363d 0%, transparent 100%);
        }
        
        /* ACTIONS BAR */
        .actions-bar {
          display: flex;
          gap: 12px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #21262d;
        }
        
        /* NORMA INDICATOR */
        .norma-indicator {
          display: flex;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(48,54,61,0.3);
          border-radius: 8px;
          margin-bottom: 24px;
        }
        
        .norma-chip {
          padding: 6px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
        }
        
        .norma-chip.active {
          background: rgba(249,115,22,0.2);
          color: #f97316;
          border-color: rgba(249,115,22,0.3);
        }
        
        .norma-chip:not(.active) {
          color: #6e7681;
        }
        
        .norma-chip:not(.active):hover {
          color: #8b949e;
          background: rgba(48,54,61,0.5);
        }
        
        /* COMPARISON TABLE */
        .comparison-table {
          display: grid;
          grid-template-columns: 200px 1fr 1fr;
          gap: 1px;
          background: #21262d;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .comparison-table > div {
          background: #0d1117;
          padding: 12px 16px;
        }
        
        .comparison-header {
          font-size: 11px;
          font-weight: 600;
          color: #8b949e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: rgba(48,54,61,0.3) !important;
        }
        
        .comparison-label {
          font-size: 13px;
          color: #8b949e;
        }
        
        .comparison-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          color: #e6edf3;
        }
        
        .comparison-value.local {
          border-left: 3px solid #3fb950;
          padding-left: 12px;
        }
        
        .comparison-value.remote {
          border-left: 3px solid #a371f7;
          padding-left: 12px;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .split-view { grid-template-columns: 1fr; }
          .input-grid-4 { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-width: 768px) {
          .header { padding: 12px 16px; }
          .main-content { padding: 16px; }
          .input-grid { grid-template-columns: 1fr; }
          .tab-nav { overflow-x: auto; padding: 12px 16px; }
          .tab-btn span { display: none; }
        }
        
        /* MODAL */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        
        .modal {
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #21262d;
        }
        
        .modal-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #e6edf3;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .modal-close {
          background: none;
          border: none;
          color: #8b949e;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.2s;
        }
        
        .modal-close:hover {
          background: rgba(248,81,73,0.1);
          color: #f85149;
        }
        
        .modal-body {
          padding: 24px;
        }
        
        .modal-footer {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding: 16px 24px;
          border-top: 1px solid #21262d;
        }
        
        /* CADASTRO CARDS */
        .cadastro-section {
          margin-bottom: 32px;
        }
        
        .cadastro-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        
        .cadastro-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 600;
          color: #e6edf3;
        }
        
        .cadastro-title .count {
          background: rgba(88,166,255,0.2);
          color: #58a6ff;
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 10px;
        }
        
        .cadastro-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        
        .cadastro-card {
          background: rgba(13,17,23,0.6);
          border: 1px solid #30363d;
          border-radius: 10px;
          padding: 16px;
          transition: all 0.2s;
        }
        
        .cadastro-card:hover {
          border-color: #58a6ff;
          box-shadow: 0 4px 12px rgba(88,166,255,0.1);
        }
        
        .cadastro-card.rele {
          border-left: 3px solid #a371f7;
        }
        
        .cadastro-card.cliente {
          border-left: 3px solid #3fb950;
        }
        
        .cadastro-card.engenheiro {
          border-left: 3px solid #f97316;
        }
        
        .cadastro-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        
        .cadastro-card-title {
          font-size: 15px;
          font-weight: 600;
          color: #e6edf3;
        }
        
        .cadastro-card-subtitle {
          font-size: 12px;
          color: #8b949e;
          margin-top: 2px;
        }
        
        .cadastro-card-actions {
          display: flex;
          gap: 4px;
        }
        
        .cadastro-card-actions button {
          background: none;
          border: none;
          padding: 6px;
          border-radius: 4px;
          cursor: pointer;
          color: #6e7681;
          transition: all 0.2s;
        }
        
        .cadastro-card-actions button:hover {
          background: rgba(88,166,255,0.1);
          color: #58a6ff;
        }
        
        .cadastro-card-actions button.delete:hover {
          background: rgba(248,81,73,0.1);
          color: #f85149;
        }
        
        .cadastro-card-body {
          font-size: 12px;
          color: #8b949e;
        }
        
        .cadastro-card-body .field {
          display: flex;
          gap: 8px;
          margin-bottom: 6px;
        }
        
        .cadastro-card-body .field-label {
          color: #6e7681;
          min-width: 80px;
        }
        
        .cadastro-card-body .field-value {
          color: #c9d1d9;
        }
        
        .cadastro-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 12px;
        }
        
        .cadastro-tag {
          background: rgba(48,54,61,0.6);
          color: #8b949e;
          font-size: 10px;
          padding: 3px 8px;
          border-radius: 4px;
        }
        
        .add-card {
          border: 2px dashed #30363d;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 140px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .add-card:hover {
          border-color: #58a6ff;
          background: rgba(88,166,255,0.05);
        }
        
        .add-card .icon {
          width: 40px;
          height: 40px;
          background: rgba(88,166,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #58a6ff;
          margin-bottom: 8px;
        }
        
        .add-card span {
          font-size: 13px;
          color: #58a6ff;
        }
        
        /* Textarea */
        textarea {
          width: 100%;
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 6px;
          padding: 10px 12px;
          color: #e6edf3;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14px;
          resize: vertical;
          min-height: 80px;
          outline: none;
          transition: all 0.2s;
        }
        
        textarea:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.15);
        }
        
        /* IMAGE UPLOAD */
        .image-upload-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .image-upload-box {
          width: 100%;
          height: 120px;
          border: 2px dashed #30363d;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(13,17,23,0.5);
          position: relative;
          overflow: hidden;
        }
        
        .image-upload-box:hover {
          border-color: #58a6ff;
          background: rgba(88,166,255,0.05);
        }
        
        .image-upload-box.has-image {
          border-style: solid;
          border-color: #3fb950;
        }
        
        .image-upload-box img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        .image-upload-box .placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #6e7681;
        }
        
        .image-upload-box .placeholder svg {
          opacity: 0.5;
        }
        
        .image-upload-box .placeholder span {
          font-size: 11px;
        }
        
        .image-upload-actions {
          display: flex;
          gap: 8px;
        }
        
        .image-upload-actions button {
          flex: 1;
          padding: 6px 12px;
          font-size: 11px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        
        .image-upload-actions .btn-upload {
          background: rgba(88,166,255,0.1);
          border: 1px solid rgba(88,166,255,0.3);
          color: #58a6ff;
        }
        
        .image-upload-actions .btn-upload:hover {
          background: rgba(88,166,255,0.2);
        }
        
        .image-upload-actions .btn-remove {
          background: rgba(248,81,73,0.1);
          border: 1px solid rgba(248,81,73,0.3);
          color: #f85149;
        }
        
        .image-upload-actions .btn-remove:hover {
          background: rgba(248,81,73,0.2);
        }
        
        /* Cadastro card com logo */
        .cadastro-card-logo {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          background: rgba(48,54,61,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        
        .cadastro-card-logo img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        .cadastro-card-logo .initials {
          font-size: 16px;
          font-weight: 700;
          color: #6e7681;
        }
        
        .cadastro-card-header-with-logo {
          display: flex;
          gap: 12px;
        }
      `), /*#__PURE__*/React.createElement("header", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-icon"
  }, /*#__PURE__*/React.createElement(Zap, {
    size: 28,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    className: "logo-text"
  }, /*#__PURE__*/React.createElement("h1", null, "SEP.calc"), /*#__PURE__*/React.createElement("p", null, "Sistema de Prote\xE7\xE3o El\xE9trica"))), /*#__PURE__*/React.createElement("div", {
    className: "header-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("label", null, "Norma"), /*#__PURE__*/React.createElement("span", null, projeto.norma)), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("label", null, "Revis\xE3o"), /*#__PURE__*/React.createElement("span", null, "Rev. ", projeto.revisao)), /*#__PURE__*/React.createElement("div", {
    className: "info-item"
  }, /*#__PURE__*/React.createElement("label", null, "Data"), /*#__PURE__*/React.createElement("span", null, projeto.data)))), /*#__PURE__*/React.createElement("nav", {
    className: "tab-nav"
  }, tabs.map((tab, idx) => /*#__PURE__*/React.createElement(TabButton, {
    key: idx,
    active: activeTab === idx,
    onClick: () => setActiveTab(idx),
    icon: tab.icon,
    label: tab.label,
    badge: idx === 4 && results ? '✓' : null
  }))), /*#__PURE__*/React.createElement("main", {
    className: "main-content"
  }, modalCadastro.open && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: fecharModal
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h3", null, modalCadastro.tipo === 'cliente' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Users, {
    size: 20,
    color: "#3fb950"
  }), " ", modalCadastro.editando ? 'Editar' : 'Novo', " Cliente"), modalCadastro.tipo === 'engenheiro' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Users, {
    size: 20,
    color: "#f97316"
  }), " ", modalCadastro.editando ? 'Editar' : 'Novo', " Engenheiro"), modalCadastro.tipo === 'rele' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Cpu, {
    size: 20,
    color: "#a371f7"
  }), " ", modalCadastro.editando ? 'Editar' : 'Novo', " Rel\xE9")), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: fecharModal
  }, /*#__PURE__*/React.createElement(X, {
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, modalCadastro.tipo === 'cliente' && /*#__PURE__*/React.createElement("div", {
    className: "input-grid"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "Nome / Raz\xE3o Social",
    value: formCadastro.nome || '',
    onChange: v => setFormCadastro({
      ...formCadastro,
      nome: v
    }),
    type: "text",
    placeholder: "Nome da empresa"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "CNPJ",
    value: formCadastro.cnpj || '',
    onChange: v => setFormCadastro({
      ...formCadastro,
      cnpj: v
    }),
    type: "text",
    placeholder: "00.000.000/0001-00"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "E-mail de Contato",
    value: formCadastro.contato || '',
    onChange: v => setFormCadastro({
      ...formCadastro,
      contato: v
    }),
    type: "text",
    placeholder: "email@empresa.com"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "Telefone",
    value: formCadastro.telefone || '',
    onChange: v => setFormCadastro({
      ...formCadastro,
      telefone: v
    }),
    type: "text",
    placeholder: "(00) 0000-0000"
  }), /*#__PURE__*/React.createElement("div", {
    className: "input-group",
    style: {
      gridColumn: 'span 2'
    }
  }, /*#__PURE__*/React.createElement("label", null, "Logo da Empresa"), /*#__PURE__*/React.createElement("div", {
    className: "image-upload-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: `image-upload-box ${formCadastro.logo ? 'has-image' : ''}`,
    onClick: () => !formCadastro.logo && handleImageUploadCadastro('logo')
  }, formCadastro.logo ? /*#__PURE__*/React.createElement("img", {
    src: formCadastro.logo,
    alt: "Logo"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "placeholder"
  }, /*#__PURE__*/React.createElement(Upload, {
    size: 24
  }), /*#__PURE__*/React.createElement("span", null, "Clique para adicionar logo (m\xE1x. 500KB)"))), /*#__PURE__*/React.createElement("div", {
    className: "image-upload-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-upload",
    onClick: () => handleImageUploadCadastro('logo')
  }, /*#__PURE__*/React.createElement(Upload, {
    size: 12
  }), " ", formCadastro.logo ? 'Trocar' : 'Upload'), formCadastro.logo && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-remove",
    onClick: () => removerImagemCadastro('logo')
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 12
  }), " Remover"))))), modalCadastro.tipo === 'engenheiro' && /*#__PURE__*/React.createElement("div", {
    className: "input-grid"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "Nome Completo",
    value: formCadastro.nome || '',
    onChange: v => setFormCadastro({
      ...formCadastro,
      nome: v
    }),
    type: "text",
    placeholder: "Nome do engenheiro"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "CREA",
    value: formCadastro.crea || '',
    onChange: v => setFormCadastro({
      ...formCadastro,
      crea: v
    }),
    type: "text",
    placeholder: "CREA-UF 000000"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "Especialidade",
    value: formCadastro.especialidade || '',
    onChange: v => setFormCadastro({
      ...formCadastro,
      especialidade: v
    }),
    type: "text",
    placeholder: "Ex: Prote\xE7\xE3o de LTs"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "E-mail",
    value: formCadastro.email || '',
    onChange: v => setFormCadastro({
      ...formCadastro,
      email: v
    }),
    type: "text",
    placeholder: "email@empresa.com"
  }), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", null, "Foto do Engenheiro"), /*#__PURE__*/React.createElement("div", {
    className: "image-upload-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: `image-upload-box ${formCadastro.foto ? 'has-image' : ''}`,
    onClick: () => !formCadastro.foto && handleImageUploadCadastro('foto'),
    style: {
      height: '100px'
    }
  }, formCadastro.foto ? /*#__PURE__*/React.createElement("img", {
    src: formCadastro.foto,
    alt: "Foto"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "placeholder"
  }, /*#__PURE__*/React.createElement(Users, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Foto (m\xE1x. 500KB)"))), /*#__PURE__*/React.createElement("div", {
    className: "image-upload-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-upload",
    onClick: () => handleImageUploadCadastro('foto')
  }, /*#__PURE__*/React.createElement(Upload, {
    size: 12
  }), " ", formCadastro.foto ? 'Trocar' : 'Upload'), formCadastro.foto && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-remove",
    onClick: () => removerImagemCadastro('foto')
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 12
  }), " Remover")))), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", null, "Assinatura Digital"), /*#__PURE__*/React.createElement("div", {
    className: "image-upload-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: `image-upload-box ${formCadastro.assinatura ? 'has-image' : ''}`,
    onClick: () => !formCadastro.assinatura && handleImageUploadCadastro('assinatura'),
    style: {
      height: '100px',
      background: formCadastro.assinatura ? '#fff' : undefined
    }
  }, formCadastro.assinatura ? /*#__PURE__*/React.createElement("img", {
    src: formCadastro.assinatura,
    alt: "Assinatura"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "placeholder"
  }, /*#__PURE__*/React.createElement(Edit2, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Assinatura (m\xE1x. 500KB)"))), /*#__PURE__*/React.createElement("div", {
    className: "image-upload-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-upload",
    onClick: () => handleImageUploadCadastro('assinatura')
  }, /*#__PURE__*/React.createElement(Upload, {
    size: 12
  }), " ", formCadastro.assinatura ? 'Trocar' : 'Upload'), formCadastro.assinatura && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-remove",
    onClick: () => removerImagemCadastro('assinatura')
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 12
  }), " Remover"))))), modalCadastro.tipo === 'rele' && /*#__PURE__*/React.createElement("div", {
    className: "input-grid"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "Fabricante",
    value: formCadastro.fabricante || '',
    onChange: v => setFormCadastro({
      ...formCadastro,
      fabricante: v
    }),
    type: "text",
    placeholder: "Ex: SEL, Siemens, ABB"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "Modelo",
    value: formCadastro.modelo || '',
    onChange: v => setFormCadastro({
      ...formCadastro,
      modelo: v
    }),
    type: "text",
    placeholder: "Ex: SEL-411L"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "Tipo",
    value: formCadastro.tipo || '',
    onChange: v => setFormCadastro({
      ...formCadastro,
      tipo: v
    }),
    type: "text",
    placeholder: "Ex: Diferencial de Linha"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "Fun\xE7\xF5es ANSI",
    value: formCadastro.funcoes || '',
    onChange: v => setFormCadastro({
      ...formCadastro,
      funcoes: v
    }),
    type: "text",
    placeholder: "Ex: 87L, 21, 67N, 50/51"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "Comunica\xE7\xE3o",
    value: formCadastro.comunicacao || '',
    onChange: v => setFormCadastro({
      ...formCadastro,
      comunicacao: v
    }),
    type: "text",
    placeholder: "Ex: IEC 61850, DNP3"
  }), /*#__PURE__*/React.createElement("div", {
    className: "input-group",
    style: {
      gridColumn: 'span 2'
    }
  }, /*#__PURE__*/React.createElement("label", null, "Notas / Observa\xE7\xF5es"), /*#__PURE__*/React.createElement("textarea", {
    value: formCadastro.notas || '',
    onChange: e => setFormCadastro({
      ...formCadastro,
      notas: e.target.value
    }),
    placeholder: "Observa\xE7\xF5es adicionais sobre o rel\xE9..."
  })))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: fecharModal
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  }), " Cancelar"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: salvarCadastro
  }, /*#__PURE__*/React.createElement(Save, {
    size: 16
  }), " Salvar")))), activeTab === 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-title"
  }, /*#__PURE__*/React.createElement(Users, {
    size: 20,
    color: "#3fb950"
  }), "Clientes", /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, clientes.length)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => abrirModalCadastro('cliente')
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 16
  }), " Novo Cliente")), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-grid"
  }, clientes.map(cliente => /*#__PURE__*/React.createElement("div", {
    key: cliente.id,
    className: "cadastro-card cliente"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-header-with-logo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-logo"
  }, cliente.logo ? /*#__PURE__*/React.createElement("img", {
    src: cliente.logo,
    alt: cliente.nome
  }) : /*#__PURE__*/React.createElement("span", {
    className: "initials"
  }, cliente.nome.substring(0, 2).toUpperCase())), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-title"
  }, cliente.nome), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-subtitle"
  }, cliente.cnpj))), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-actions"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => abrirModalCadastro('cliente', cliente)
  }, /*#__PURE__*/React.createElement(Edit2, {
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    className: "delete",
    onClick: () => excluirCadastro('cliente', cliente.id)
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 14
  })))), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Contato:"), /*#__PURE__*/React.createElement("span", {
    className: "field-value"
  }, cliente.contato)), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Telefone:"), /*#__PURE__*/React.createElement("span", {
    className: "field-value"
  }, cliente.telefone))))), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card add-card",
    onClick: () => abrirModalCadastro('cliente')
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 20
  })), /*#__PURE__*/React.createElement("span", null, "Adicionar Cliente")))), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-title"
  }, /*#__PURE__*/React.createElement(Users, {
    size: 20,
    color: "#f97316"
  }), "Engenheiros", /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, engenheiros.length)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => abrirModalCadastro('engenheiro')
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 16
  }), " Novo Engenheiro")), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-grid"
  }, engenheiros.map(eng => /*#__PURE__*/React.createElement("div", {
    key: eng.id,
    className: "cadastro-card engenheiro"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-header-with-logo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-logo",
    style: {
      borderRadius: '50%'
    }
  }, eng.foto ? /*#__PURE__*/React.createElement("img", {
    src: eng.foto,
    alt: eng.nome,
    style: {
      borderRadius: '50%'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    className: "initials"
  }, eng.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase())), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-title"
  }, eng.nome), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-subtitle"
  }, eng.crea))), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-actions"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => abrirModalCadastro('engenheiro', eng)
  }, /*#__PURE__*/React.createElement(Edit2, {
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    className: "delete",
    onClick: () => excluirCadastro('engenheiro', eng.id)
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 14
  })))), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Especialidade:"), /*#__PURE__*/React.createElement("span", {
    className: "field-value"
  }, eng.especialidade)), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "E-mail:"), /*#__PURE__*/React.createElement("span", {
    className: "field-value"
  }, eng.email)), eng.assinatura && /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginTop: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Assinatura:"), /*#__PURE__*/React.createElement("span", {
    className: "field-value",
    style: {
      color: '#3fb950'
    }
  }, "\u2713 Cadastrada"))))), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card add-card",
    onClick: () => abrirModalCadastro('engenheiro')
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 20
  })), /*#__PURE__*/React.createElement("span", null, "Adicionar Engenheiro")))), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-title"
  }, /*#__PURE__*/React.createElement(Cpu, {
    size: 20,
    color: "#a371f7"
  }), "Rel\xE9s de Prote\xE7\xE3o", /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, reles.length)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => abrirModalCadastro('rele')
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 16
  }), " Novo Rel\xE9")), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-grid"
  }, reles.map(rele => /*#__PURE__*/React.createElement("div", {
    key: rele.id,
    className: "cadastro-card rele"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-title"
  }, rele.fabricante, " ", rele.modelo), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-subtitle"
  }, rele.tipo)), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-actions"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => abrirModalCadastro('rele', rele)
  }, /*#__PURE__*/React.createElement(Edit2, {
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    className: "delete",
    onClick: () => excluirCadastro('rele', rele.id)
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 14
  })))), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Fun\xE7\xF5es:"), /*#__PURE__*/React.createElement("span", {
    className: "field-value"
  }, rele.funcoes)), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Comunica\xE7\xE3o:"), /*#__PURE__*/React.createElement("span", {
    className: "field-value"
  }, rele.comunicacao)), rele.notas && /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "field-label"
  }, "Notas:"), /*#__PURE__*/React.createElement("span", {
    className: "field-value"
  }, rele.notas))), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card-tags"
  }, rele.funcoes.split(',').map((f, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "cadastro-tag"
  }, f.trim()))))), /*#__PURE__*/React.createElement("div", {
    className: "cadastro-card add-card",
    onClick: () => abrirModalCadastro('rele')
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 20
  })), /*#__PURE__*/React.createElement("span", null, "Adicionar Rel\xE9"))))), activeTab === 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(Settings, {
    size: 20
  })), /*#__PURE__*/React.createElement("h2", null, "Dados do Projeto")), /*#__PURE__*/React.createElement("div", {
    className: "input-grid input-grid-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", null, "Cliente"), /*#__PURE__*/React.createElement("select", {
    value: projeto.cliente_id || '',
    onChange: e => {
      const id = e.target.value ? Number(e.target.value) : null;
      const cliente = clientes.find(c => c.id === id);
      setProjeto({
        ...projeto,
        cliente_id: id,
        cliente: cliente?.nome || ''
      });
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecione um cliente..."), clientes.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.nome)))), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", null, "Engenheiro Respons\xE1vel"), /*#__PURE__*/React.createElement("select", {
    value: projeto.engenheiro_id || '',
    onChange: e => {
      const id = e.target.value ? Number(e.target.value) : null;
      const eng = engenheiros.find(en => en.id === id);
      setProjeto({
        ...projeto,
        engenheiro_id: id,
        engenheiro: eng?.nome || ''
      });
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecione um engenheiro..."), engenheiros.map(e => /*#__PURE__*/React.createElement("option", {
    key: e.id,
    value: e.id
  }, e.nome, " (", e.crea, ")")))), /*#__PURE__*/React.createElement(InputField, {
    label: "Data",
    value: projeto.data,
    onChange: v => setProjeto({
      ...projeto,
      data: v
    }),
    type: "date"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "Revis\xE3o",
    value: projeto.revisao,
    onChange: v => setProjeto({
      ...projeto,
      revisao: v
    }),
    type: "text",
    placeholder: "00"
  })), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Configura\xE7\xE3o de Norma"), /*#__PURE__*/React.createElement("div", {
    className: "norma-indicator"
  }, ['ONS', 'COES', 'IEEE'].map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    className: `norma-chip ${projeto.norma === n ? 'active' : ''}`,
    onClick: () => setProjeto({
      ...projeto,
      norma: n
    })
  }, n, " ", n === 'ONS' ? '(Brasil)' : n === 'COES' ? '(Peru)' : '(USA)'))), /*#__PURE__*/React.createElement("div", {
    className: "input-grid input-grid-3"
  }, /*#__PURE__*/React.createElement(SelectField, {
    label: "Idioma do Relat\xF3rio",
    value: projeto.idioma,
    onChange: v => setProjeto({
      ...projeto,
      idioma: v
    }),
    options: [{
      value: 'pt-BR',
      label: 'Português (Brasil)'
    }, {
      value: 'es-ES',
      label: 'Español (Perú)'
    }, {
      value: 'en-US',
      label: 'English (USA)'
    }]
  }))), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(Activity, {
    size: 20
  })), /*#__PURE__*/React.createElement("h2", null, "Par\xE2metros da Linha de Transmiss\xE3o")), /*#__PURE__*/React.createElement("div", {
    className: "input-grid input-grid-4"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "Nome da Linha",
    value: projeto.linha_nome,
    onChange: v => setProjeto({
      ...projeto,
      linha_nome: v
    }),
    type: "text",
    placeholder: "LT 230kV SE A - SE B"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "Comprimento",
    value: projeto.linha_comprimento,
    onChange: v => setProjeto({
      ...projeto,
      linha_comprimento: v
    }),
    unit: "km"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "Tens\xE3o Nominal",
    value: projeto.V_nom,
    onChange: v => setProjeto({
      ...projeto,
      V_nom: v
    }),
    unit: "kV"
  })), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Imped\xE2ncia de Sequ\xEAncia Positiva (Z\u2081)"), /*#__PURE__*/React.createElement("div", {
    className: "input-grid input-grid-4"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "R\u2081 (Resist\xEAncia)",
    value: linha.R1,
    onChange: v => setLinha({
      ...linha,
      R1: v
    }),
    unit: "\u03A9/km",
    step: "0.001"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "X\u2081 (Reat\xE2ncia)",
    value: linha.X1,
    onChange: v => setLinha({
      ...linha,
      X1: v
    }),
    unit: "\u03A9/km",
    step: "0.001"
  }), /*#__PURE__*/React.createElement("div", {
    className: "result-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "result-title"
  }, "|Z\u2081| Total"), /*#__PURE__*/React.createElement("span", {
    className: "result-value"
  }, (Math.sqrt(linha.R1 ** 2 + linha.X1 ** 2) * projeto.linha_comprimento).toFixed(2)), /*#__PURE__*/React.createElement("span", {
    className: "result-unit"
  }, "\u03A9")), /*#__PURE__*/React.createElement("div", {
    className: "result-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "result-title"
  }, "\u2220Z\u2081"), /*#__PURE__*/React.createElement("span", {
    className: "result-value"
  }, (Math.atan2(linha.X1, linha.R1) * 180 / Math.PI).toFixed(1), "\xB0"), /*#__PURE__*/React.createElement("span", {
    className: "result-unit"
  }, "graus"))), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Imped\xE2ncia de Sequ\xEAncia Zero (Z\u2080)"), /*#__PURE__*/React.createElement("div", {
    className: "input-grid input-grid-4"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "R\u2080 (Resist\xEAncia)",
    value: linha.R0,
    onChange: v => setLinha({
      ...linha,
      R0: v
    }),
    unit: "\u03A9/km",
    step: "0.001"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "X\u2080 (Reat\xE2ncia)",
    value: linha.X0,
    onChange: v => setLinha({
      ...linha,
      X0: v
    }),
    unit: "\u03A9/km",
    step: "0.001"
  }), /*#__PURE__*/React.createElement("div", {
    className: "result-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "result-title"
  }, "|Z\u2080| Total"), /*#__PURE__*/React.createElement("span", {
    className: "result-value"
  }, (Math.sqrt(linha.R0 ** 2 + linha.X0 ** 2) * projeto.linha_comprimento).toFixed(2)), /*#__PURE__*/React.createElement("span", {
    className: "result-unit"
  }, "\u03A9")), /*#__PURE__*/React.createElement("div", {
    className: "result-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "result-title"
  }, "\u2220Z\u2080"), /*#__PURE__*/React.createElement("span", {
    className: "result-value"
  }, (Math.atan2(linha.X0, linha.R0) * 180 / Math.PI).toFixed(1), "\xB0"), /*#__PURE__*/React.createElement("span", {
    className: "result-unit"
  }, "graus"))), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Suscept\xE2ncia (para Fun\xE7\xE3o 87L)"), /*#__PURE__*/React.createElement("div", {
    className: "input-grid input-grid-4"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "B\u2081 (Suscept\xE2ncia)",
    value: linha.susceptancia_b1,
    onChange: v => setLinha({
      ...linha,
      susceptancia_b1: v
    }),
    unit: "\u03BCS/km",
    step: "0.1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "result-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "result-title"
  }, "B Total"), /*#__PURE__*/React.createElement("span", {
    className: "result-value"
  }, (linha.susceptancia_b1 * projeto.linha_comprimento).toFixed(2)), /*#__PURE__*/React.createElement("span", {
    className: "result-unit"
  }, "\u03BCS")), /*#__PURE__*/React.createElement("div", {
    className: "result-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "result-title"
  }, "I Charging (est.)"), /*#__PURE__*/React.createElement("span", {
    className: "result-value"
  }, (projeto.V_nom * 1000 / Math.sqrt(3) * (linha.susceptancia_b1 * 1e-6 * projeto.linha_comprimento)).toFixed(2)), /*#__PURE__*/React.createElement("span", {
    className: "result-unit"
  }, "A"))), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Imped\xE2ncia da Linha Adjacente (para Z\u2083)"), /*#__PURE__*/React.createElement("div", {
    className: "input-grid input-grid-4"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "R Adjacente",
    value: linha.Z_adj_R,
    onChange: v => setLinha({
      ...linha,
      Z_adj_R: v
    }),
    unit: "\u03A9/km",
    step: "0.001"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "X Adjacente",
    value: linha.Z_adj_X,
    onChange: v => setLinha({
      ...linha,
      Z_adj_X: v
    }),
    unit: "\u03A9/km",
    step: "0.001"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-header",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(Shield, {
    size: 20
  })), /*#__PURE__*/React.createElement("h2", null, "Zonas de Prote\xE7\xE3o de Dist\xE2ncia (Fun\xE7\xE3o 21)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px'
    }
  }, ['COES', 'ONS', 'IEEE', 'IEC'].map(norma => /*#__PURE__*/React.createElement("button", {
    key: norma,
    className: `btn ${projeto.norma === norma ? 'btn-primary' : 'btn-secondary'}`,
    style: {
      padding: '6px 12px',
      fontSize: '11px'
    },
    onClick: () => aplicarPadraoZonas(norma),
    title: `Aplicar padrão ${norma}`
  }, norma)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      background: 'rgba(88,166,255,0.08)',
      borderBottom: '1px solid #30363d',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    size: 18,
    color: "#58a6ff"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '13px',
      color: '#8b949e',
      margin: 0
    }
  }, "Configure os alcances das zonas de prote\xE7\xE3o. Os valores de refer\xEAncia s\xE3o baseados nas normas ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#58a6ff'
    }
  }, "COES (Peru)"), ", ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#f97316'
    }
  }, "ONS (Brasil)"), " e ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#22c55e'
    }
  }, "IEEE (USA)"), ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      background: '#0d1117',
      borderBottom: '1px solid #30363d',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px',
      background: '#161b22',
      padding: '4px',
      borderRadius: '10px',
      border: '1px solid #30363d'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setTerminalAtivoZonas('A'),
    style: {
      padding: '8px 20px',
      background: terminalAtivoZonas === 'A' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'transparent',
      color: terminalAtivoZonas === 'A' ? 'white' : '#8b949e',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: '600',
      transition: 'all 0.2s'
    }
  }, "\uD83D\uDD39 Terminal A (Local)"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTerminalAtivoZonas('B'),
    disabled: zonasVinculadas,
    style: {
      padding: '8px 20px',
      background: terminalAtivoZonas === 'B' && !zonasVinculadas ? 'linear-gradient(135deg, #a855f7, #9333ea)' : 'transparent',
      color: terminalAtivoZonas === 'B' && !zonasVinculadas ? 'white' : zonasVinculadas ? '#4b5563' : '#8b949e',
      border: 'none',
      borderRadius: '6px',
      cursor: zonasVinculadas ? 'not-allowed' : 'pointer',
      fontSize: '13px',
      fontWeight: '600',
      opacity: zonasVinculadas ? 0.5 : 1,
      transition: 'all 0.2s'
    }
  }, "\uD83D\uDD38 Terminal B (Remoto)")), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: zonasVinculadas,
    onChange: e => {
      const novoVinculo = e.target.checked;
      setZonasVinculadas(novoVinculo);
      // Ao revincular, copia A para B
      if (novoVinculo) {
        setZonasTerminalB({
          ...zonasTerminalA
        });
        setTerminalAtivoZonas('A');
      }
    },
    style: {
      width: '16px',
      height: '16px',
      accentColor: '#f97316'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: '#8b949e'
    }
  }, "\uD83D\uDD17 Vincular A \u2194 B ", zonasVinculadas && /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#f97316'
    }
  }, "(ATIVO)"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: '#8b949e',
      padding: '6px 10px',
      background: '#161b22',
      borderRadius: '6px',
      border: `1px solid ${terminalAtivoZonas === 'A' ? 'rgba(34,197,94,0.3)' : 'rgba(168,85,247,0.3)'}`
    }
  }, "Editando: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: terminalAtivoZonas === 'A' ? '#22c55e' : '#a855f7'
    }
  }, "Terminal ", terminalAtivoZonas, " ", zonasVinculadas && '(A=B vinculados)'))), (() => {
    // Acessores dinâmicos que apontam para o terminal ativo
    const zonasAtual = terminalAtivoZonas === 'B' ? zonasTerminalB : zonasTerminalA;
    const setZonasAtual = novasZonas => {
      const zonas = typeof novasZonas === 'function' ? novasZonas(zonasAtual) : novasZonas;
      if (terminalAtivoZonas === 'B' && !zonasVinculadas) {
        setZonasTerminalB(zonas);
      } else {
        setZonasTerminalA(zonas);
        if (zonasVinculadas) setZonasTerminalB(zonas);
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(34,197,94,0.08)',
        border: '1px solid rgba(34,197,94,0.3)',
        borderRadius: '12px',
        padding: '20px',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '16px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '36px',
        height: '36px',
        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: '700',
        fontSize: '14px'
      }
    }, "Z1"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
      style: {
        color: '#22c55e',
        margin: 0,
        fontSize: '15px'
      }
    }, "Zona 1 - Instant\xE2nea"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '11px',
        color: '#8b949e'
      }
    }, "Subalcance \u2022 Disparo sem atraso intencional")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        cursor: 'help'
      },
      title: "Zona 1: Prote\xE7\xE3o instant\xE2nea que cobre tipicamente 80-85% da linha protegida. N\xE3o deve alcan\xE7ar al\xE9m do barramento remoto para evitar disparos indevidos por erros de medi\xE7\xE3o."
    }, /*#__PURE__*/React.createElement(AlertTriangle, {
      size: 16,
      color: "#8b949e"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: '12px',
        color: '#8b949e',
        marginBottom: '6px',
        display: 'block'
      }
    }, "Alcance (% da Linha)"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: zonasAtual.z1_percent,
      onChange: e => setZonasAtual({
        ...zonasAtual,
        z1_percent: parseFloat(e.target.value) || 0
      }),
      style: {
        width: '100%',
        padding: '10px 40px 10px 14px',
        background: '#161b22',
        border: `1px solid ${zonasAtual.z1_percent > 85 ? '#f59e0b' : '#30363d'}`,
        borderRadius: '8px',
        color: '#e6edf3',
        fontSize: '16px',
        fontWeight: '600'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        right: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#8b949e'
      }
    }, "%")), zonasAtual.z1_percent > 85 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '8px',
        padding: '8px 10px',
        background: 'rgba(245,158,11,0.15)',
        border: '1px solid rgba(245,158,11,0.4)',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }
    }, /*#__PURE__*/React.createElement(AlertTriangle, {
      size: 14,
      color: "#f59e0b"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '11px',
        color: '#f59e0b'
      }
    }, "Aten\xE7\xE3o: Risco de sobrealcance transiente!"))), /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: '12px',
        color: '#8b949e',
        marginBottom: '6px',
        display: 'block'
      }
    }, "Tempo (ms)"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: zonasAtual.z1_tempo,
      onChange: e => setZonasAtual({
        ...zonasAtual,
        z1_tempo: parseFloat(e.target.value) || 0
      }),
      style: {
        width: '100%',
        padding: '10px 14px',
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        color: '#e6edf3',
        fontSize: '16px',
        fontWeight: '600'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '12px',
        padding: '10px 12px',
        background: 'rgba(34,197,94,0.1)',
        borderRadius: '6px',
        fontSize: '11px',
        color: '#6ee7b7'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "\uD83D\uDCCB Recomenda\xE7\xE3o COES/IEEE:"), " 80% a 85% (Subalcance Seguro)", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#8b949e'
      }
    }, "Valor calculado: ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: '#22c55e'
      }
    }, (Math.sqrt(linha.R1 ** 2 + linha.X1 ** 2) * projeto.linha_comprimento * zonasAtual.z1_percent / 100).toFixed(2), " \u03A9")))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(59,130,246,0.08)',
        border: '1px solid rgba(59,130,246,0.3)',
        borderRadius: '12px',
        padding: '20px',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '16px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '36px',
        height: '36px',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: '700',
        fontSize: '14px'
      }
    }, "Z2"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
      style: {
        color: '#3b82f6',
        margin: 0,
        fontSize: '15px'
      }
    }, "Zona 2 - Sobrealcance"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '11px',
        color: '#8b949e'
      }
    }, "Backup da Z1 Remota \u2022 Temporizada")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        cursor: 'help'
      },
      title: "Zona 2: Prote\xE7\xE3o temporizada que cobre 100% da linha + margem de seguran\xE7a. Serve como backup para falhas na Z1 do terminal remoto."
    }, /*#__PURE__*/React.createElement(AlertTriangle, {
      size: 16,
      color: "#8b949e"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: '12px',
        color: '#8b949e',
        marginBottom: '6px',
        display: 'block'
      }
    }, "Alcance (% da Linha)"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: zonasAtual.z2_percent,
      onChange: e => setZonasAtual({
        ...zonasAtual,
        z2_percent: parseFloat(e.target.value) || 0
      }),
      style: {
        width: '100%',
        padding: '10px 40px 10px 14px',
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        color: '#e6edf3',
        fontSize: '16px',
        fontWeight: '600'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        right: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#8b949e'
      }
    }, "%"))), /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: '12px',
        color: '#8b949e',
        marginBottom: '6px',
        display: 'block'
      }
    }, "Tempo (ms)"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: zonasAtual.z2_tempo,
      onChange: e => setZonasAtual({
        ...zonasAtual,
        z2_tempo: parseFloat(e.target.value) || 0
      }),
      style: {
        width: '100%',
        padding: '10px 14px',
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        color: '#e6edf3',
        fontSize: '16px',
        fontWeight: '600'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '12px',
        padding: '10px 12px',
        background: 'rgba(59,130,246,0.1)',
        borderRadius: '6px',
        fontSize: '11px',
        color: '#93c5fd'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "\uD83D\uDCCB Recomenda\xE7\xE3o COES:"), " 120% da Linha Protegida (M\xEDnimo)", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#8b949e'
      }
    }, "\uD83D\uDCA1 Deve cobrir 100% da linha + 20% de margem ou 50% da linha adjacente mais curta."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#8b949e'
      }
    }, "Valor calculado: ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: '#3b82f6'
      }
    }, (Math.sqrt(linha.R1 ** 2 + linha.X1 ** 2) * projeto.linha_comprimento * zonasAtual.z2_percent / 100).toFixed(2), " \u03A9")))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(249,115,22,0.08)',
        border: '1px solid rgba(249,115,22,0.3)',
        borderRadius: '12px',
        padding: '20px',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '16px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '36px',
        height: '36px',
        background: 'linear-gradient(135deg, #f97316, #ea580c)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: '700',
        fontSize: '14px'
      }
    }, "Z3"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
      style: {
        color: '#f97316',
        margin: 0,
        fontSize: '15px'
      }
    }, "Zona 3 - Backup Remoto (Forward)"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '11px',
        color: '#8b949e'
      }
    }, "Retaguarda \u2022 Linha + Adjacente")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        cursor: 'help'
      },
      title: "Zona 3: Prote\xE7\xE3o de retaguarda remota - conforme IEEE C37.113 e ONS Subm\xF3dulo 2.7, esta zona \xE9 fundamental para coordena\xE7\xE3o seletiva do sistema."
    }, /*#__PURE__*/React.createElement(AlertTriangle, {
      size: 16,
      color: "#8b949e"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: '12px',
        color: '#8b949e',
        marginBottom: '6px',
        display: 'block'
      }
    }, "Alcance (% da Linha + Adj.)"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: zonasAtual.z3_percent,
      onChange: e => setZonasAtual({
        ...zonasAtual,
        z3_percent: parseFloat(e.target.value) || 0
      }),
      style: {
        width: '100%',
        padding: '10px 40px 10px 14px',
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        color: '#e6edf3',
        fontSize: '16px',
        fontWeight: '600'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        right: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#8b949e'
      }
    }, "%"))), /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: '12px',
        color: '#8b949e',
        marginBottom: '6px',
        display: 'block'
      }
    }, "Tempo (ms)"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: zonasAtual.z3_tempo,
      onChange: e => setZonasAtual({
        ...zonasAtual,
        z3_tempo: parseFloat(e.target.value) || 0
      }),
      style: {
        width: '100%',
        padding: '10px 14px',
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        color: '#e6edf3',
        fontSize: '16px',
        fontWeight: '600'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '12px',
        padding: '10px 12px',
        background: 'rgba(249,115,22,0.1)',
        borderRadius: '6px',
        fontSize: '11px',
        color: '#fdba74'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "\uD83D\uDCCB Recomenda\xE7\xE3o T\xEDpica:"), " 120% de (Z_linha + Z_adjacente)", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#8b949e'
      }
    }, "\uD83D\uDCA1 COES: ~220% | ONS: ~150% | Considera carga e loadability."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#8b949e'
      }
    }, "Valor calculado: ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: '#f97316'
      }
    }, (Math.sqrt(linha.R1 ** 2 + linha.X1 ** 2) * projeto.linha_comprimento * zonasAtual.z3_percent / 100).toFixed(2), " \u03A9")))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: zonasAtual.z4_habilitada ? 'rgba(168,85,247,0.08)' : 'rgba(128,128,128,0.05)',
        border: `1px solid ${zonasAtual.z4_habilitada ? 'rgba(168,85,247,0.3)' : 'rgba(128,128,128,0.2)'}`,
        borderRadius: '12px',
        padding: '20px',
        position: 'relative',
        opacity: zonasAtual.z4_habilitada ? 1 : 0.7
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '16px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '36px',
        height: '36px',
        background: zonasAtual.z4_habilitada ? 'linear-gradient(135deg, #a855f7, #9333ea)' : 'linear-gradient(135deg, #6b7280, #4b5563)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: '700',
        fontSize: '14px'
      }
    }, "Z4"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
      style: {
        color: zonasAtual.z4_habilitada ? '#a855f7' : '#6b7280',
        margin: 0,
        fontSize: '15px'
      }
    }, "Zona 4 - ", zonasAtual.z4_reversa ? 'Reversa' : 'Forward', " (Opcional)"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '11px',
        color: '#8b949e'
      }
    }, zonasAtual.z4_reversa ? 'Backup de Barra • Falha de Disjuntor' : 'Sobrealcance adicional • POTT/PUTT')), /*#__PURE__*/React.createElement("label", {
      style: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: zonasAtual.z4_habilitada,
      onChange: e => setZonasAtual({
        ...zonasAtual,
        z4_habilitada: e.target.checked
      }),
      style: {
        width: '16px',
        height: '16px',
        accentColor: '#a855f7'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '11px',
        color: '#8b949e'
      }
    }, "Habilitar"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: '8px',
        marginBottom: '12px',
        opacity: zonasAtual.z4_habilitada ? 1 : 0.5,
        pointerEvents: zonasAtual.z4_habilitada ? 'auto' : 'none'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setZonasAtual({
        ...zonasAtual,
        z4_reversa: true
      }),
      disabled: !zonasAtual.z4_habilitada,
      style: {
        flex: 1,
        padding: '8px 12px',
        background: zonasAtual.z4_reversa ? 'rgba(168,85,247,0.2)' : '#161b22',
        border: `1px solid ${zonasAtual.z4_reversa ? '#a855f7' : '#30363d'}`,
        borderRadius: '6px',
        color: zonasAtual.z4_reversa ? '#a855f7' : '#8b949e',
        fontSize: '12px',
        fontWeight: '600',
        cursor: zonasAtual.z4_habilitada ? 'pointer' : 'not-allowed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
      }
    }, "\u2B05 Reversa (Backup Barra/BF)"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setZonasAtual({
        ...zonasAtual,
        z4_reversa: false
      }),
      disabled: !zonasAtual.z4_habilitada,
      style: {
        flex: 1,
        padding: '8px 12px',
        background: !zonasAtual.z4_reversa ? 'rgba(168,85,247,0.2)' : '#161b22',
        border: `1px solid ${!zonasAtual.z4_reversa ? '#a855f7' : '#30363d'}`,
        borderRadius: '6px',
        color: !zonasAtual.z4_reversa ? '#a855f7' : '#8b949e',
        fontSize: '12px',
        fontWeight: '600',
        cursor: zonasAtual.z4_habilitada ? 'pointer' : 'not-allowed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
      }
    }, "\u27A1 Forward (POTT/PUTT)")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: '12px',
        color: '#8b949e',
        marginBottom: '6px',
        display: 'block'
      }
    }, "Alcance ", zonasAtual.z4_reversa ? 'Reverso' : 'Forward', " (% da Linha)"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: zonasAtual.z4_percent,
      onChange: e => setZonasAtual({
        ...zonasAtual,
        z4_percent: parseFloat(e.target.value) || 0
      }),
      disabled: !zonasAtual.z4_habilitada,
      style: {
        width: '100%',
        padding: '10px 40px 10px 14px',
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        color: zonasAtual.z4_habilitada ? '#e6edf3' : '#6b7280',
        fontSize: '16px',
        fontWeight: '600'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        right: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#8b949e'
      }
    }, "%"))), /*#__PURE__*/React.createElement("div", {
      className: "input-group"
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: '12px',
        color: '#8b949e',
        marginBottom: '6px',
        display: 'block'
      }
    }, "Tempo (ms)"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: zonasAtual.z4_tempo,
      onChange: e => setZonasAtual({
        ...zonasAtual,
        z4_tempo: parseFloat(e.target.value) || 0
      }),
      disabled: !zonasAtual.z4_habilitada,
      style: {
        width: '100%',
        padding: '10px 14px',
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        color: zonasAtual.z4_habilitada ? '#e6edf3' : '#6b7280',
        fontSize: '16px',
        fontWeight: '600'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '12px',
        padding: '10px 12px',
        background: zonasAtual.z4_habilitada ? 'rgba(168,85,247,0.1)' : 'rgba(128,128,128,0.05)',
        borderRadius: '6px',
        fontSize: '11px',
        color: zonasAtual.z4_habilitada ? '#d8b4fe' : '#9ca3af'
      }
    }, zonasAtual.z4_reversa ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("strong", null, "\uD83D\uDCCB Z4 Reversa:"), " 20% (t\xEDpico 10-25%)", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#8b949e'
      }
    }, "\uD83D\uDCA1 Prote\xE7\xE3o de falha de disjuntor ou barras (STUB protection). Dire\xE7\xE3o: atr\xE1s do rel\xE9.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("strong", null, "\uD83D\uDCCB Z4 Forward:"), " Sobrealcance adicional ou supervis\xE3o POTT/PUTT", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#8b949e'
      }
    }, "\uD83D\uDCA1 Usada em esquemas de teleprote\xE7\xE3o permissiva. Dire\xE7\xE3o: mesma que Z1, Z2, Z3.")), zonasAtual.z4_habilitada && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#8b949e'
      }
    }, "Valor calculado: ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: '#a855f7'
      }
    }, (Math.sqrt(linha.R1 ** 2 + linha.X1 ** 2) * projeto.linha_comprimento * zonasAtual.z4_percent / 100).toFixed(2), " \u03A9"), " (", zonasAtual.z4_reversa ? 'REVERSE' : 'FORWARD', ")")))));
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      background: 'rgba(22,27,34,0.6)',
      borderTop: '1px solid #30363d',
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e',
      marginBottom: '4px'
    }
  }, "|Z\u2081| da Linha"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#e6edf3',
      fontFamily: 'JetBrains Mono'
    }
  }, (Math.sqrt(linha.R1 ** 2 + linha.X1 ** 2) * projeto.linha_comprimento).toFixed(2), " \u03A9")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#22c55e',
      marginBottom: '4px'
    }
  }, "Z1 Ajuste"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#22c55e',
      fontFamily: 'JetBrains Mono'
    }
  }, (Math.sqrt(linha.R1 ** 2 + linha.X1 ** 2) * projeto.linha_comprimento * zonasProtecao.z1_percent / 100).toFixed(2), " \u03A9"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, zonasProtecao.z1_percent, "% \u2022 ", zonasProtecao.z1_tempo, "ms")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#3b82f6',
      marginBottom: '4px'
    }
  }, "Z2 Ajuste"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#3b82f6',
      fontFamily: 'JetBrains Mono'
    }
  }, (Math.sqrt(linha.R1 ** 2 + linha.X1 ** 2) * projeto.linha_comprimento * zonasProtecao.z2_percent / 100).toFixed(2), " \u03A9"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, zonasProtecao.z2_percent, "% \u2022 ", zonasProtecao.z2_tempo, "ms")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#f97316',
      marginBottom: '4px'
    }
  }, "Z3 Ajuste"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#f97316',
      fontFamily: 'JetBrains Mono'
    }
  }, (Math.sqrt(linha.R1 ** 2 + linha.X1 ** 2) * projeto.linha_comprimento * zonasProtecao.z3_percent / 100).toFixed(2), " \u03A9"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, zonasProtecao.z3_percent, "% \u2022 ", zonasProtecao.z3_tempo, "ms")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: zonasProtecao.z4_habilitada ? '#a855f7' : '#6b7280',
      marginBottom: '4px'
    }
  }, "Z4 Ajuste (", zonasProtecao.z4_habilitada ? zonasProtecao.z4_reversa ? 'Rev' : 'Fwd' : 'OFF', ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '18px',
      fontWeight: '700',
      color: zonasProtecao.z4_habilitada ? '#a855f7' : '#6b7280',
      fontFamily: 'JetBrains Mono'
    }
  }, zonasProtecao.z4_habilitada ? (Math.sqrt(linha.R1 ** 2 + linha.X1 ** 2) * projeto.linha_comprimento * zonasProtecao.z4_percent / 100).toFixed(2) + ' Ω' : 'N/A'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, zonasProtecao.z4_habilitada ? `${zonasProtecao.z4_percent}% • ${zonasProtecao.z4_tempo}ms` : 'Desabilitada'))), previewCalc && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      background: 'linear-gradient(135deg, rgba(34,197,94,0.05), rgba(59,130,246,0.05))',
      borderTop: '1px solid #30363d'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '8px',
      height: '8px',
      background: '#22c55e',
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: '#22c55e',
      fontWeight: '600'
    }
  }, "PREVIEW EM TEMPO REAL - Valores Secund\xE1rios (Rel\xE9)"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '11px',
      color: '#8b949e',
      marginLeft: 'auto'
    }
  }, "Fator K = RTC/RTP = ", terminalA.rtc, "/", terminalA.rtp, " = ", (terminalA.rtc / terminalA.rtp).toFixed(3))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(34,197,94,0.1)',
      border: '1px solid rgba(34,197,94,0.3)',
      borderRadius: '10px',
      padding: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: '#22c55e',
      fontWeight: '600',
      marginBottom: '12px'
    }
  }, "Terminal A: ", terminalA.nome), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, "Z1 (Sec)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#22c55e',
      fontFamily: 'JetBrains Mono'
    }
  }, previewCalc.terminal_A?.ansi_21?.z1_reach?.toFixed(2) || '—'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '9px',
      color: '#6e7681'
    }
  }, "\u03A9")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, "Z2 (Sec)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#3b82f6',
      fontFamily: 'JetBrains Mono'
    }
  }, previewCalc.terminal_A?.ansi_21?.z2_reach?.toFixed(2) || '—'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '9px',
      color: '#6e7681'
    }
  }, "\u03A9")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, "Z3 (Sec)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#f97316',
      fontFamily: 'JetBrains Mono'
    }
  }, previewCalc.terminal_A?.ansi_21?.z3_reach?.toFixed(2) || '—'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '9px',
      color: '#6e7681'
    }
  }, "\u03A9")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, "K0"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#a855f7',
      fontFamily: 'JetBrains Mono'
    }
  }, previewCalc.terminal_A?.ansi_21?.K0_mod?.toFixed(3) || '—'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '9px',
      color: '#6e7681'
    }
  }, "\u2220", previewCalc.terminal_A?.ansi_21?.K0_ang?.toFixed(1) || '—', "\xB0")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(168,85,247,0.1)',
      border: '1px solid rgba(168,85,247,0.3)',
      borderRadius: '10px',
      padding: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: '#a855f7',
      fontWeight: '600',
      marginBottom: '12px'
    }
  }, "Terminal B: ", terminalB.nome), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, "Z1 (Sec)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#22c55e',
      fontFamily: 'JetBrains Mono'
    }
  }, previewCalc.terminal_B?.ansi_21?.z1_reach?.toFixed(2) || '—'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '9px',
      color: '#6e7681'
    }
  }, "\u03A9")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, "Z2 (Sec)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#3b82f6',
      fontFamily: 'JetBrains Mono'
    }
  }, previewCalc.terminal_B?.ansi_21?.z2_reach?.toFixed(2) || '—'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '9px',
      color: '#6e7681'
    }
  }, "\u03A9")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, "Z3 (Sec)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#f97316',
      fontFamily: 'JetBrains Mono'
    }
  }, previewCalc.terminal_B?.ansi_21?.z3_reach?.toFixed(2) || '—'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '9px',
      color: '#6e7681'
    }
  }, "\u03A9")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, "K0"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#a855f7',
      fontFamily: 'JetBrains Mono'
    }
  }, previewCalc.terminal_B?.ansi_21?.K0_mod?.toFixed(3) || '—'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '9px',
      color: '#6e7681'
    }
  }, "\u2220", previewCalc.terminal_B?.ansi_21?.K0_ang?.toFixed(1) || '—', "\xB0"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '12px',
      padding: '10px 12px',
      background: 'rgba(88,166,255,0.1)',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '11px',
      color: '#58a6ff'
    }
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Reatividade Autom\xE1tica:"), " Altere os valores de % acima e veja os resultados atualizarem instantaneamente. Os c\xE1lculos usam sua configura\xE7\xE3o de zonas como ", /*#__PURE__*/React.createElement("strong", null, "Single Source of Truth"), ".")))), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-header",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(Zap, {
    size: 20
  })), /*#__PURE__*/React.createElement("h2", null, "Valida\xE7\xE3o de N\xEDveis de Curto-Circuito")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: '#8b949e'
    }
  }, "Unidade:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      background: '#21262d',
      borderRadius: '8px',
      padding: '3px',
      border: '1px solid #30363d'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setFaultData({
      ...faultData,
      unidade: 'kA'
    }),
    style: {
      padding: '6px 16px',
      border: 'none',
      borderRadius: '6px',
      background: faultData.unidade === 'kA' ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'transparent',
      color: faultData.unidade === 'kA' ? 'white' : '#8b949e',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '13px',
      transition: 'all 0.2s'
    }
  }, "kA"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFaultData({
      ...faultData,
      unidade: 'A'
    }),
    style: {
      padding: '6px 16px',
      border: 'none',
      borderRadius: '6px',
      background: faultData.unidade === 'A' ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'transparent',
      color: faultData.unidade === 'A' ? 'white' : '#8b949e',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '13px',
      transition: 'all 0.2s'
    }
  }, "A")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      background: 'rgba(249,115,22,0.08)',
      borderBottom: '1px solid #30363d',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement(BarChart3, {
    size: 18,
    color: "#f97316"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '13px',
      color: '#8b949e',
      margin: 0
    }
  }, "Insira os valores de ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#f97316'
    }
  }, "corrente de curto-circuito"), " obtidos do estudo de curto-circuito (software ATP, ETAP, PowerWorld, etc.) para validar a sensibilidade dos ajustes.")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '13px'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: '#21262d'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '14px 16px',
      textAlign: 'left',
      borderBottom: '1px solid #30363d',
      color: '#8b949e',
      fontWeight: '600',
      minWidth: '180px'
    }
  }, "Cen\xE1rio de Falta"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '14px 16px',
      textAlign: 'center',
      borderBottom: '1px solid #30363d',
      color: '#ef4444',
      fontWeight: '600'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "3\u03A6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      opacity: 0.7
    }
  }, "Trif\xE1sico"))), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '14px 16px',
      textAlign: 'center',
      borderBottom: '1px solid #30363d',
      color: '#f59e0b',
      fontWeight: '600'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "2\u03A6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      opacity: 0.7
    }
  }, "Bif\xE1sico"))), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '14px 16px',
      textAlign: 'center',
      borderBottom: '1px solid #30363d',
      color: '#22c55e',
      fontWeight: '600'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "1\u03A6 Franco"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      opacity: 0.7
    }
  }, "Monof\xE1sico"))), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '14px 16px',
      textAlign: 'center',
      borderBottom: '1px solid #30363d',
      color: '#3b82f6',
      fontWeight: '600'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "1\u03A6 + Rf"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      opacity: 0.7
    }
  }, "Resistivo"))), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '14px 16px',
      textAlign: 'center',
      borderBottom: '1px solid #30363d',
      color: '#a855f7',
      fontWeight: '600',
      minWidth: '150px'
    }
  }, "Valida\xE7\xE3o 67N"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '1px solid #30363d'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '16px',
      background: 'rgba(239,68,68,0.05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '32px',
      height: '32px',
      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '700',
      fontSize: '11px'
    }
  }, "0%"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: '600',
      color: '#e6edf3'
    }
  }, "Falta Local"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: '#8b949e'
    }
  }, "Bus Local (Close-in)")))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px',
      textAlign: 'center',
      background: 'rgba(239,68,68,0.05)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.1",
    value: faultData.local_3f,
    onChange: e => setFaultData({
      ...faultData,
      local_3f: parseFloat(e.target.value) || 0
    }),
    style: {
      width: '90px',
      padding: '8px 12px',
      textAlign: 'center',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '6px',
      color: '#ef4444',
      fontSize: '14px',
      fontWeight: '600'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e',
      marginTop: '4px'
    }
  }, faultData.unidade)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px',
      textAlign: 'center',
      background: 'rgba(239,68,68,0.05)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.1",
    value: faultData.local_2f,
    onChange: e => setFaultData({
      ...faultData,
      local_2f: parseFloat(e.target.value) || 0
    }),
    style: {
      width: '90px',
      padding: '8px 12px',
      textAlign: 'center',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '6px',
      color: '#f59e0b',
      fontSize: '14px',
      fontWeight: '600'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e',
      marginTop: '4px'
    }
  }, faultData.unidade)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px',
      textAlign: 'center',
      background: 'rgba(239,68,68,0.05)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.1",
    value: faultData.local_1f,
    onChange: e => setFaultData({
      ...faultData,
      local_1f: parseFloat(e.target.value) || 0
    }),
    style: {
      width: '90px',
      padding: '8px 12px',
      textAlign: 'center',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '6px',
      color: '#22c55e',
      fontSize: '14px',
      fontWeight: '600'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e',
      marginTop: '4px'
    }
  }, faultData.unidade)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px',
      textAlign: 'center',
      background: 'rgba(239,68,68,0.05)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.01",
    value: faultData.local_1f_res,
    onChange: e => setFaultData({
      ...faultData,
      local_1f_res: parseFloat(e.target.value) || 0
    }),
    style: {
      width: '90px',
      padding: '8px 12px',
      textAlign: 'center',
      background: '#161b22',
      border: `2px solid ${validarSensibilidade(faultData.local_1f_res, faultData.pickup_67n).cor}`,
      borderRadius: '6px',
      color: '#3b82f6',
      fontSize: '14px',
      fontWeight: '600'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e',
      marginTop: '4px'
    }
  }, faultData.unidade)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px',
      textAlign: 'center',
      background: 'rgba(239,68,68,0.05)'
    }
  }, (() => {
    const validacao = validarSensibilidade(faultData.local_1f_res, faultData.pickup_67n);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '8px 10px',
        background: `${validacao.cor}15`,
        border: `1px solid ${validacao.cor}40`,
        borderRadius: '6px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: '700',
        color: validacao.cor,
        fontSize: '11px'
      }
    }, validacao.status), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '10px',
        color: '#8b949e',
        marginTop: '2px'
      }
    }, "Ratio: ", ((faultData.unidade === 'A' ? faultData.local_1f_res / 1000 : faultData.local_1f_res) / faultData.pickup_67n).toFixed(2), "x"));
  })())), /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '1px solid #30363d'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '16px',
      background: 'rgba(34,197,94,0.05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '32px',
      height: '32px',
      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '700',
      fontSize: '10px'
    }
  }, "100%"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: '600',
      color: '#e6edf3'
    }
  }, "Falta Remota"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: '#8b949e'
    }
  }, "Bus Remoto (End of Line)")))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px',
      textAlign: 'center',
      background: 'rgba(34,197,94,0.05)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.1",
    value: faultData.remota_3f,
    onChange: e => setFaultData({
      ...faultData,
      remota_3f: parseFloat(e.target.value) || 0
    }),
    style: {
      width: '90px',
      padding: '8px 12px',
      textAlign: 'center',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '6px',
      color: '#ef4444',
      fontSize: '14px',
      fontWeight: '600'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e',
      marginTop: '4px'
    }
  }, faultData.unidade)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px',
      textAlign: 'center',
      background: 'rgba(34,197,94,0.05)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.1",
    value: faultData.remota_2f,
    onChange: e => setFaultData({
      ...faultData,
      remota_2f: parseFloat(e.target.value) || 0
    }),
    style: {
      width: '90px',
      padding: '8px 12px',
      textAlign: 'center',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '6px',
      color: '#f59e0b',
      fontSize: '14px',
      fontWeight: '600'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e',
      marginTop: '4px'
    }
  }, faultData.unidade)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px',
      textAlign: 'center',
      background: 'rgba(34,197,94,0.05)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.1",
    value: faultData.remota_1f,
    onChange: e => setFaultData({
      ...faultData,
      remota_1f: parseFloat(e.target.value) || 0
    }),
    style: {
      width: '90px',
      padding: '8px 12px',
      textAlign: 'center',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '6px',
      color: '#22c55e',
      fontSize: '14px',
      fontWeight: '600'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e',
      marginTop: '4px'
    }
  }, faultData.unidade)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px',
      textAlign: 'center',
      background: 'rgba(34,197,94,0.05)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.01",
    value: faultData.remota_1f_res,
    onChange: e => setFaultData({
      ...faultData,
      remota_1f_res: parseFloat(e.target.value) || 0
    }),
    style: {
      width: '90px',
      padding: '8px 12px',
      textAlign: 'center',
      background: '#161b22',
      border: `2px solid ${validarSensibilidade(faultData.remota_1f_res, faultData.pickup_67n).cor}`,
      borderRadius: '6px',
      color: '#3b82f6',
      fontSize: '14px',
      fontWeight: '600'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e',
      marginTop: '4px'
    }
  }, faultData.unidade)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px',
      textAlign: 'center',
      background: 'rgba(34,197,94,0.05)'
    }
  }, (() => {
    const validacao = validarSensibilidade(faultData.remota_1f_res, faultData.pickup_67n);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '8px 10px',
        background: `${validacao.cor}15`,
        border: `1px solid ${validacao.cor}40`,
        borderRadius: '6px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: '700',
        color: validacao.cor,
        fontSize: '11px'
      }
    }, validacao.status), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '10px',
        color: '#8b949e',
        marginTop: '2px'
      }
    }, "Ratio: ", ((faultData.unidade === 'A' ? faultData.remota_1f_res / 1000 : faultData.remota_1f_res) / faultData.pickup_67n).toFixed(2), "x"));
  })())), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '16px',
      background: 'rgba(168,85,247,0.05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '32px',
      height: '32px',
      background: 'linear-gradient(135deg, #a855f7, #9333ea)',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '700',
      fontSize: '9px'
    }
  }, "CRIT"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: '600',
      color: '#e6edf3'
    }
  }, "Falta Resistiva Cr\xEDtica"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: '#8b949e'
    }
  }, "Alta Imped\xE2ncia (67N)")))), /*#__PURE__*/React.createElement("td", {
    colSpan: "2",
    style: {
      padding: '12px',
      background: 'rgba(168,85,247,0.05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e',
      marginBottom: '4px'
    }
  }, "Localiza\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "5",
    value: faultData.critica_localizacao,
    onChange: e => setFaultData({
      ...faultData,
      critica_localizacao: parseFloat(e.target.value) || 0
    }),
    style: {
      width: '60px',
      padding: '8px',
      textAlign: 'center',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '6px',
      color: '#a855f7',
      fontSize: '14px',
      fontWeight: '600'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#8b949e',
      fontSize: '12px'
    }
  }, "%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e',
      marginBottom: '4px'
    }
  }, "Rf (Resist\xEAncia)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "5",
    value: faultData.critica_rf,
    onChange: e => setFaultData({
      ...faultData,
      critica_rf: parseFloat(e.target.value) || 0
    }),
    style: {
      width: '60px',
      padding: '8px',
      textAlign: 'center',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '6px',
      color: '#a855f7',
      fontSize: '14px',
      fontWeight: '600'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#8b949e',
      fontSize: '12px'
    }
  }, "\u03A9"))))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px',
      textAlign: 'center',
      background: 'rgba(168,85,247,0.05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e',
      marginBottom: '4px'
    }
  }, "N/A"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#6b7280',
      fontSize: '12px'
    }
  }, "\u2014")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px',
      textAlign: 'center',
      background: 'rgba(168,85,247,0.05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e',
      marginBottom: '4px'
    }
  }, "3I\u2080 Calculado"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.001",
    value: faultData.critica_3i0,
    onChange: e => setFaultData({
      ...faultData,
      critica_3i0: parseFloat(e.target.value) || 0
    }),
    style: {
      width: '90px',
      padding: '8px 12px',
      textAlign: 'center',
      background: '#161b22',
      border: `2px solid ${validarSensibilidade(faultData.critica_3i0, faultData.pickup_67n).cor}`,
      borderRadius: '6px',
      color: '#a855f7',
      fontSize: '14px',
      fontWeight: '600'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e',
      marginTop: '4px'
    }
  }, faultData.unidade)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px',
      textAlign: 'center',
      background: 'rgba(168,85,247,0.05)'
    }
  }, (() => {
    const validacao = validarSensibilidade(faultData.critica_3i0, faultData.pickup_67n);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '8px 10px',
        background: `${validacao.cor}15`,
        border: `1px solid ${validacao.cor}40`,
        borderRadius: '6px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: '700',
        color: validacao.cor,
        fontSize: '11px'
      }
    }, validacao.status), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '10px',
        color: '#8b949e',
        marginTop: '2px'
      }
    }, "Ratio: ", ((faultData.unidade === 'A' ? faultData.critica_3i0 / 1000 : faultData.critica_3i0) / faultData.pickup_67n).toFixed(2), "x"));
  })()))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px',
      background: 'rgba(22,27,34,0.6)',
      borderTop: '1px solid #30363d'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement(Settings, {
    size: 18,
    color: "#8b949e"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#e6edf3'
    }
  }, "Ajustes de Pickup para Valida\xE7\xE3o"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '11px',
      color: '#8b949e',
      marginLeft: 'auto'
    }
  }, "Valores em kA (prim\xE1rio) - usados para calcular a sensibilidade")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(59,130,246,0.08)',
      border: '1px solid rgba(59,130,246,0.3)',
      borderRadius: '10px',
      padding: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '28px',
      height: '28px',
      background: '#3b82f6',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '700',
      fontSize: '10px'
    }
  }, "67N"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: '600',
      color: '#3b82f6',
      fontSize: '13px'
    }
  }, "Direcional de Terra"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, "Pickup de Corrente 3I\u2080"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.01",
    value: faultData.pickup_67n,
    onChange: e => setFaultData({
      ...faultData,
      pickup_67n: parseFloat(e.target.value) || 0
    }),
    style: {
      flex: 1,
      padding: '10px 14px',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '6px',
      color: '#e6edf3',
      fontSize: '16px',
      fontWeight: '600'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#8b949e',
      fontSize: '14px'
    }
  }, "kA")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#6e7681',
      marginTop: '8px'
    }
  }, "T\xEDpico: 0.2 ~ 0.6 kA (5-15% da Icc m\xEDnima)")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(239,68,68,0.08)',
      border: '1px solid rgba(239,68,68,0.3)',
      borderRadius: '10px',
      padding: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '28px',
      height: '28px',
      background: '#ef4444',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '700',
      fontSize: '10px'
    }
  }, "50N"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: '600',
      color: '#ef4444',
      fontSize: '13px'
    }
  }, "Instant\xE2neo de Terra"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, "Pickup Alta Corrente"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.1",
    value: faultData.pickup_50n,
    onChange: e => setFaultData({
      ...faultData,
      pickup_50n: parseFloat(e.target.value) || 0
    }),
    style: {
      flex: 1,
      padding: '10px 14px',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '6px',
      color: '#e6edf3',
      fontSize: '16px',
      fontWeight: '600'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#8b949e',
      fontSize: '14px'
    }
  }, "kA")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#6e7681',
      marginTop: '8px'
    }
  }, "T\xEDpico: 1.5 ~ 3.0 kA (80% da Icc m\xEDnima remota)")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(34,197,94,0.08)',
      border: '1px solid rgba(34,197,94,0.3)',
      borderRadius: '10px',
      padding: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '28px',
      height: '28px',
      background: '#22c55e',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '700',
      fontSize: '10px'
    }
  }, "51N"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: '600',
      color: '#22c55e',
      fontSize: '13px'
    }
  }, "Temporizado de Terra"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, "Curva de Tempo Inverso"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.01",
    value: faultData.pickup_51n,
    onChange: e => setFaultData({
      ...faultData,
      pickup_51n: parseFloat(e.target.value) || 0
    }),
    style: {
      flex: 1,
      padding: '10px 14px',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '6px',
      color: '#e6edf3',
      fontSize: '16px',
      fontWeight: '600'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#8b949e',
      fontSize: '14px'
    }
  }, "kA")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: '#6e7681',
      marginTop: '8px'
    }
  }, "T\xEDpico: 0.15 ~ 0.40 kA (backup sens\xEDvel)")))), (() => {
    const validacaoCritica = validarSensibilidade(faultData.critica_3i0, faultData.pickup_67n);
    const validacaoRemota = validarSensibilidade(faultData.remota_1f_res, faultData.pickup_67n);
    const temProblema = validacaoCritica.status === 'FALHA' || validacaoRemota.status === 'FALHA';
    const temAviso = validacaoCritica.status === 'MARGINAL' || validacaoRemota.status === 'MARGINAL';
    if (temProblema) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          padding: '16px 20px',
          background: 'rgba(239,68,68,0.1)',
          borderTop: '1px solid rgba(239,68,68,0.3)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }
      }, /*#__PURE__*/React.createElement(AlertTriangle, {
        size: 20,
        color: "#ef4444",
        style: {
          flexShrink: 0,
          marginTop: '2px'
        }
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: '700',
          color: '#ef4444',
          marginBottom: '4px'
        }
      }, "\u26A0\uFE0F FALTA N\xC3O DETECTADA - ZONA MORTA IDENTIFICADA"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: '13px',
          color: '#fca5a5'
        }
      }, "A corrente de falta resistiva est\xE1 abaixo do pickup do 67N. O rel\xE9 ", /*#__PURE__*/React.createElement("strong", null, "N\xC3O IR\xC1 OPERAR"), " para este cen\xE1rio."), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: '12px',
          color: '#8b949e',
          marginTop: '8px'
        }
      }, /*#__PURE__*/React.createElement("strong", null, "Recomenda\xE7\xF5es:"), " (1) Reduzir o Pickup 67N, (2) Habilitar esquema de Teleprote\xE7\xE3o (POTT/PUTT), (3) Verificar sensibilidade do esquema de prote\xE7\xE3o diferencial (87L).")));
    } else if (temAviso) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          padding: '16px 20px',
          background: 'rgba(245,158,11,0.1)',
          borderTop: '1px solid rgba(245,158,11,0.3)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }
      }, /*#__PURE__*/React.createElement(AlertTriangle, {
        size: 20,
        color: "#f59e0b",
        style: {
          flexShrink: 0,
          marginTop: '2px'
        }
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: '700',
          color: '#f59e0b',
          marginBottom: '4px'
        }
      }, "\u26A0\uFE0F MARGEM DE SENSIBILIDADE BAIXA"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: '13px',
          color: '#fcd34d'
        }
      }, "A raz\xE3o entre a corrente de falta e o pickup est\xE1 abaixo de 1.3x. Considere usar teleprote\xE7\xE3o para garantir opera\xE7\xE3o segura.")));
    }
    return null;
  })())), activeTab === 2 && /*#__PURE__*/React.createElement("div", {
    className: "split-view"
  }, /*#__PURE__*/React.createElement("div", {
    className: "terminal-panel local"
  }, /*#__PURE__*/React.createElement("div", {
    className: "terminal-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "terminal-title"
  }, /*#__PURE__*/React.createElement(Zap, {
    size: 20,
    color: "#3fb950"
  }), /*#__PURE__*/React.createElement("h3", null, "Terminal A"), /*#__PURE__*/React.createElement("span", {
    className: "terminal-badge local"
  }, "LOCAL"))), /*#__PURE__*/React.createElement("div", {
    className: "input-grid"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "Nome da Subesta\xE7\xE3o",
    value: terminalA.nome,
    onChange: v => setTerminalA({
      ...terminalA,
      nome: v
    }),
    type: "text"
  })), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Rel\xE9 de Prote\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", null, "Rel\xE9 Instalado"), /*#__PURE__*/React.createElement("select", {
    value: projeto.rele_a_id || '',
    onChange: e => {
      const id = e.target.value ? Number(e.target.value) : null;
      setProjeto({
        ...projeto,
        rele_a_id: id
      });
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecione um rel\xE9..."), reles.map(r => /*#__PURE__*/React.createElement("option", {
    key: r.id,
    value: r.id
  }, r.fabricante, " ", r.modelo, " - ", r.tipo)))), projeto.rele_a_id && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '12px',
      padding: '12px',
      background: 'rgba(63,185,80,0.1)',
      borderRadius: '8px',
      fontSize: '12px'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#3fb950'
    }
  }, "Fun\xE7\xF5es dispon\xEDveis:"), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#8b949e'
    }
  }, reles.find(r => r.id === projeto.rele_a_id)?.funcoes)), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Transformadores de Instrumento"), /*#__PURE__*/React.createElement("div", {
    className: "input-grid input-grid-3"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "RTC (Rela\xE7\xE3o TC)",
    value: terminalA.rtc,
    onChange: v => setTerminalA({
      ...terminalA,
      rtc: v
    }),
    unit: "A/A"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "RTP (Rela\xE7\xE3o TP)",
    value: terminalA.rtp,
    onChange: v => setTerminalA({
      ...terminalA,
      rtp: v
    }),
    unit: "V/V"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "In TC Prim\xE1rio (87L)",
    value: terminalA.in_tc_primario,
    onChange: v => setTerminalA({
      ...terminalA,
      in_tc_primario: v
    }),
    unit: "A"
  })), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Correntes de Curto-Circuito"), /*#__PURE__*/React.createElement("div", {
    className: "input-grid input-grid-2"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "Icc 3\u03A6 M\xE1x (Remota)",
    value: terminalA.icc_3f_max,
    onChange: v => setTerminalA({
      ...terminalA,
      icc_3f_max: v
    }),
    unit: "A"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "Icc 1\u03A6 M\xEDn (Remota)",
    value: terminalA.icc_1f_min,
    onChange: v => setTerminalA({
      ...terminalA,
      icc_1f_min: v
    }),
    unit: "A"
  })), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Corrente de Carga"), /*#__PURE__*/React.createElement(InputField, {
    label: "I Carga M\xE1xima",
    value: terminalA.I_carga_max,
    onChange: v => setTerminalA({
      ...terminalA,
      I_carga_max: v
    }),
    unit: "A"
  }), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Configura\xE7\xE3o Direcional (67/67N)"), /*#__PURE__*/React.createElement("div", {
    className: "input-grid input-grid-2"
  }, /*#__PURE__*/React.createElement(SelectField, {
    label: "Polariza\xE7\xE3o 67N",
    value: terminalA.polarizacao_67n || 'V0',
    onChange: v => setTerminalA({
      ...terminalA,
      polarizacao_67n: v
    }),
    options: [{
      value: 'V0',
      label: 'V0 - Tensão Residual'
    }, {
      value: 'I0',
      label: 'I0 - Corrente Residual'
    }, {
      value: 'V2',
      label: 'V2 - Sequência Negativa'
    }, {
      value: 'DUAL',
      label: 'DUAL - V0 + I2'
    }]
  }), /*#__PURE__*/React.createElement(SelectField, {
    label: "Dire\xE7\xE3o Principal 67",
    value: terminalA.direcao_67 || 'FWD',
    onChange: v => setTerminalA({
      ...terminalA,
      direcao_67: v
    }),
    options: [{
      value: 'FWD',
      label: 'Forward (→ Linha)'
    }, {
      value: 'REV',
      label: 'Reverse (← Barra)'
    }, {
      value: 'BOTH',
      label: 'Bidirecional'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    className: "result-cards"
  }, /*#__PURE__*/React.createElement(ResultCard, {
    title: "K convers\xE3o",
    value: (terminalA.rtc / terminalA.rtp).toFixed(4),
    unit: "A/V"
  }), /*#__PURE__*/React.createElement(ResultCard, {
    title: "I secund\xE1rio",
    value: (terminalA.I_carga_max / terminalA.rtc).toFixed(3),
    unit: "A"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "terminal-panel remote"
  }, /*#__PURE__*/React.createElement("div", {
    className: "terminal-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "terminal-title"
  }, /*#__PURE__*/React.createElement(Zap, {
    size: 20,
    color: "#a371f7"
  }), /*#__PURE__*/React.createElement("h3", null, "Terminal B"), /*#__PURE__*/React.createElement("span", {
    className: "terminal-badge remote"
  }, "REMOTO"))), /*#__PURE__*/React.createElement("div", {
    className: "input-grid"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "Nome da Subesta\xE7\xE3o",
    value: terminalB.nome,
    onChange: v => setTerminalB({
      ...terminalB,
      nome: v
    }),
    type: "text"
  })), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Rel\xE9 de Prote\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", null, "Rel\xE9 Instalado"), /*#__PURE__*/React.createElement("select", {
    value: projeto.rele_b_id || '',
    onChange: e => {
      const id = e.target.value ? Number(e.target.value) : null;
      setProjeto({
        ...projeto,
        rele_b_id: id
      });
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecione um rel\xE9..."), reles.map(r => /*#__PURE__*/React.createElement("option", {
    key: r.id,
    value: r.id
  }, r.fabricante, " ", r.modelo, " - ", r.tipo)))), projeto.rele_b_id && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '12px',
      padding: '12px',
      background: 'rgba(163,113,247,0.1)',
      borderRadius: '8px',
      fontSize: '12px'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#a371f7'
    }
  }, "Fun\xE7\xF5es dispon\xEDveis:"), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#8b949e'
    }
  }, reles.find(r => r.id === projeto.rele_b_id)?.funcoes)), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Transformadores de Instrumento"), /*#__PURE__*/React.createElement("div", {
    className: "input-grid input-grid-3"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "RTC (Rela\xE7\xE3o TC)",
    value: terminalB.rtc,
    onChange: v => setTerminalB({
      ...terminalB,
      rtc: v
    }),
    unit: "A/A"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "RTP (Rela\xE7\xE3o TP)",
    value: terminalB.rtp,
    onChange: v => setTerminalB({
      ...terminalB,
      rtp: v
    }),
    unit: "V/V"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "In TC Prim\xE1rio (87L)",
    value: terminalB.in_tc_primario,
    onChange: v => setTerminalB({
      ...terminalB,
      in_tc_primario: v
    }),
    unit: "A"
  })), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Correntes de Curto-Circuito"), /*#__PURE__*/React.createElement("div", {
    className: "input-grid input-grid-2"
  }, /*#__PURE__*/React.createElement(InputField, {
    label: "Icc 3\u03A6 M\xE1x (Remota)",
    value: terminalB.icc_3f_max,
    onChange: v => setTerminalB({
      ...terminalB,
      icc_3f_max: v
    }),
    unit: "A"
  }), /*#__PURE__*/React.createElement(InputField, {
    label: "Icc 1\u03A6 M\xEDn (Remota)",
    value: terminalB.icc_1f_min,
    onChange: v => setTerminalB({
      ...terminalB,
      icc_1f_min: v
    }),
    unit: "A"
  })), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Corrente de Carga"), /*#__PURE__*/React.createElement(InputField, {
    label: "I Carga M\xE1xima",
    value: terminalB.I_carga_max,
    onChange: v => setTerminalB({
      ...terminalB,
      I_carga_max: v
    }),
    unit: "A"
  }), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Configura\xE7\xE3o Direcional (67/67N)"), /*#__PURE__*/React.createElement("div", {
    className: "input-grid input-grid-2"
  }, /*#__PURE__*/React.createElement(SelectField, {
    label: "Polariza\xE7\xE3o 67N",
    value: terminalB.polarizacao_67n || 'V0',
    onChange: v => setTerminalB({
      ...terminalB,
      polarizacao_67n: v
    }),
    options: [{
      value: 'V0',
      label: 'V0 - Tensão Residual'
    }, {
      value: 'I0',
      label: 'I0 - Corrente Residual'
    }, {
      value: 'V2',
      label: 'V2 - Sequência Negativa'
    }, {
      value: 'DUAL',
      label: 'DUAL - V0 + I2'
    }]
  }), /*#__PURE__*/React.createElement(SelectField, {
    label: "Dire\xE7\xE3o Principal 67",
    value: terminalB.direcao_67 || 'FWD',
    onChange: v => setTerminalB({
      ...terminalB,
      direcao_67: v
    }),
    options: [{
      value: 'FWD',
      label: 'Forward (→ Linha)'
    }, {
      value: 'REV',
      label: 'Reverse (← Barra)'
    }, {
      value: 'BOTH',
      label: 'Bidirecional'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    className: "result-cards"
  }, /*#__PURE__*/React.createElement(ResultCard, {
    title: "K convers\xE3o",
    value: (terminalB.rtc / terminalB.rtp).toFixed(4),
    unit: "A/V"
  }), /*#__PURE__*/React.createElement(ResultCard, {
    title: "I secund\xE1rio",
    value: (terminalB.I_carga_max / terminalB.rtc).toFixed(3),
    unit: "A"
  })))), activeTab === 3 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(Calculator, {
    size: 20
  })), /*#__PURE__*/React.createElement("h2", null, "Processamento de C\xE1lculos")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '24px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: handleCalculate
  }, /*#__PURE__*/React.createElement(Calculator, {
    size: 20
  }), "Processar Ajustes de Prote\xE7\xE3o", /*#__PURE__*/React.createElement(ChevronRight, {
    size: 18
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: '12px',
      fontSize: '13px',
      color: '#6e7681'
    }
  }, "Norma selecionada: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#f97316'
    }
  }, projeto.norma), " | Linha: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#58a6ff'
    }
  }, projeto.linha_comprimento, " km")))), results && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(BarChart3, {
    size: 20
  })), /*#__PURE__*/React.createElement("h2", null, "Resultados - Prote\xE7\xE3o de Dist\xE2ncia (21)")), /*#__PURE__*/React.createElement("div", {
    className: "comparison-table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Par\xE2metro"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Terminal A (", terminalA.nome, ")"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Terminal B (", terminalB.nome, ")"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, "Fator de Convers\xE3o (K)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.K_conv), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.K_conv), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, "Z\u2081 Linha (Secund\xE1rio)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.z1_line_sec.mod, " \u03A9 \u2220", results.terminal_A.z1_line_sec.ang, "\xB0"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.z1_line_sec.mod, " \u03A9 \u2220", results.terminal_B.z1_line_sec.ang, "\xB0"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "zone-chip z1"
  }, "Z1"), " Alcance (", results.terminal_A.criteria.z1, ")"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.z1_reach, " \u03A9"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.z1_reach, " \u03A9"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "zone-chip z2"
  }, "Z2"), " Alcance (", results.terminal_A.criteria.z2, ")"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.z2_reach, " \u03A9"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.z2_reach, " \u03A9"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "zone-chip z3"
  }, "Z3"), " Alcance (", results.terminal_A.criteria.z3, ")"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.z3_reach, " \u03A9"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.z3_reach, " \u03A9"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "zone-chip z4"
  }, "Z4"), " ", zonasProtecao.z4_habilitada ? zonasProtecao.z4_reversa ? 'Reversa' : 'Forward' : 'Desabilitada', " (", results.terminal_A.criteria.z4, ")"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, zonasProtecao.z4_habilitada ? results.terminal_A.z4_reach + ' Ω' : '—'), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, zonasProtecao.z4_habilitada ? results.terminal_B.z4_reach + ' Ω' : '—'), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, "K\u2080 (Compensa\xE7\xE3o Terra)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.k0_modulo, " \u2220", results.terminal_A.k0_angulo, "\xB0"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.k0_modulo, " \u2220", results.terminal_B.k0_angulo, "\xB0"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, "Tempo Z1 / Z2 / Z3"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.z1_time, "s / ", results.terminal_A.z2_time, "s / ", results.terminal_A.z3_time, "s"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.z1_time, "s / ", results.terminal_B.z2_time, "s / ", results.terminal_B.z3_time, "s"))), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(Zap, {
    size: 20
  })), /*#__PURE__*/React.createElement("h2", null, "Resultados - Sobrecorrente N\xE3o Direcional (50/51 e 50N/51N)")), /*#__PURE__*/React.createElement("div", {
    className: "comparison-table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Fun\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Terminal A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Terminal B"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "50"), " - Pickup Instant\xE2neo (Fase)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_50_pickup, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_50_pickup, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "51"), " - Pickup Temporizado (Fase)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_51_pickup, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_51_pickup, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "51"), " - Curva / TMS"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.curve_51.type, " / ", results.terminal_A.curve_51.TMS), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.curve_51.type, " / ", results.terminal_B.curve_51.TMS), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "50N"), " - Pickup Instant\xE2neo (Neutro)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_50n_pickup, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_50n_pickup, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "51N"), " - Pickup Temporizado (Neutro)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_51n_pickup, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_51n_pickup, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "51N"), " - Curva / TMS"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.curve_51n.type, " / ", results.terminal_A.curve_51n.TMS), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.curve_51n.type, " / ", results.terminal_B.curve_51n.TMS))), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(Activity, {
    size: 20
  })), /*#__PURE__*/React.createElement("h2", null, "Resultados - Sobrecorrente Direcional de Fase (67)")), /*#__PURE__*/React.createElement("div", {
    className: "comparison-table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Par\xE2metro"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Terminal A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Terminal B"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "67"), " - Pickup Forward (\u2192 Linha)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_67_pickup_fwd, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_67_pickup_fwd, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "67"), " - Pickup Reverse (\u2190 Barra)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_67_pickup_rev, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_67_pickup_rev, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "67"), " - Dire\xE7\xE3o Habilitada"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, /*#__PURE__*/React.createElement("span", {
    className: `zone-chip ${results.terminal_A.ansi_67_direction === 'FWD' ? 'z1' : results.terminal_A.ansi_67_direction === 'REV' ? 'z4' : 'z2'}`
  }, results.terminal_A.ansi_67_direction === 'FWD' ? 'FORWARD' : results.terminal_A.ansi_67_direction === 'REV' ? 'REVERSE' : 'BIDIRECIONAL')), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, /*#__PURE__*/React.createElement("span", {
    className: `zone-chip ${results.terminal_B.ansi_67_direction === 'FWD' ? 'z1' : results.terminal_B.ansi_67_direction === 'REV' ? 'z4' : 'z2'}`
  }, results.terminal_B.ansi_67_direction === 'FWD' ? 'FORWARD' : results.terminal_B.ansi_67_direction === 'REV' ? 'REVERSE' : 'BIDIRECIONAL')), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "67"), " - MTA (\xC2ngulo Torque M\xE1x.)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_67_mta, "\xB0"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_67_mta, "\xB0"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "67"), " - RCA (\xC2ngulo Caracter\xEDstico)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_67_rca, "\xB0"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_67_rca, "\xB0"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "67"), " - Curva / TMS"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.curve_67.type, " / ", results.terminal_A.curve_67.TMS), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.curve_67.type, " / ", results.terminal_B.curve_67.TMS), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "67"), " - Tempo Instant\xE2neo"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.time_67_inst, " s"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.time_67_inst, " s"))), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    size: 20
  })), /*#__PURE__*/React.createElement("h2", null, "Resultados - Sobrecorrente Direcional de Neutro (67N)")), /*#__PURE__*/React.createElement("div", {
    className: "comparison-table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Par\xE2metro"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Terminal A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Terminal B"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "67N"), " - Pickup Forward (\u2192 Linha)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_67n_pickup_fwd, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_67n_pickup_fwd, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "67N"), " - Pickup Reverse (\u2190 Barra)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_67n_pickup_rev, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_67n_pickup_rev, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "67N"), " - Tipo de Polariza\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_67n_polarization), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_67n_polarization), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "67N"), " - MTA (\xC2ngulo Torque M\xE1x.)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_67n_mta, "\xB0"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_67n_mta, "\xB0"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "67N"), " - RCA (\xC2ngulo Caracter\xEDstico)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_67n_rca, "\xB0"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_67n_rca, "\xB0"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "67N"), " - Curva / TMS"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.curve_67n.type, " / ", results.terminal_A.curve_67n.TMS), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.curve_67n.type, " / ", results.terminal_B.curve_67n.TMS), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "67N"), " - Tempo Instant\xE2neo"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.time_67n_inst, " s"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.time_67n_inst, " s"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "K\u2080"), " - Fator Compensa\xE7\xE3o (|K\u2080| \u2220\u03B8)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.k0_modulo, " \u2220", results.terminal_A.k0_angulo, "\xB0"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.k0_modulo, " \u2220", results.terminal_B.k0_angulo, "\xB0")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '16px',
      padding: '16px',
      background: 'rgba(210,153,34,0.1)',
      borderRadius: '8px',
      borderLeft: '3px solid #d29922'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '12px',
      color: '#d29922',
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Nota:"), " A polariza\xE7\xE3o recomendada \xE9 ", /*#__PURE__*/React.createElement("strong", null, results.terminal_A.ansi_67n_polarization), " conforme norma ", projeto.norma, ". V0 = Tens\xE3o Residual | I0 = Corrente Residual | V2 = Sequ\xEAncia Negativa | DUAL = Combina\xE7\xE3o V0+I2"))), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(Shield, {
    size: 20
  })), /*#__PURE__*/React.createElement("h2", null, "Resultados - Diferencial de Linha (87L)")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '16px',
      padding: '16px',
      background: 'rgba(88,166,255,0.1)',
      borderRadius: '8px',
      borderLeft: '3px solid #58a6ff'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '12px',
      color: '#58a6ff',
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Corrente de Carregamento (I charging):"), " ", results.terminal_A.i_charging_ref, " A (prim\xE1rio) \u2014 Esta corrente capacitiva define o limite m\xEDnimo de sensibilidade da prote\xE7\xE3o diferencial.")), /*#__PURE__*/React.createElement("div", {
    className: "comparison-table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Par\xE2metro"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Terminal A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-header"
  }, "Terminal B"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "87L"), " - In TC Prim\xE1rio"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.in_tc_primario, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.in_tc_primario, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "87L"), " - Pickup (Prim\xE1rio)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_87l_pickup, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_87l_pickup, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "87L"), " - Pickup (% In)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_87l_pickup_pu, " %"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_87l_pickup_pu, " %"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "87L"), " - Slope 1 (Baixa Corrente)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_87l_slope1, " %"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_87l_slope1, " %"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "87L"), " - Slope 2 (Alta Corrente)"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_87l_slope2, " %"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_87l_slope2, " %"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "87L"), " - Breakpoint"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.ansi_87l_breakpoint, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.ansi_87l_breakpoint, " A"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-label"
  }, /*#__PURE__*/React.createElement("strong", null, "87L"), " - Tempo de Opera\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value local"
  }, results.terminal_A.time_87l * 1000, " ms"), /*#__PURE__*/React.createElement("div", {
    className: "comparison-value remote"
  }, results.terminal_B.time_87l * 1000, " ms")), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Curva Caracter\xEDstica 87L (Conceitual)"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#0d1117',
      borderRadius: '8px',
      padding: '24px',
      position: 'relative',
      height: '220px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '60px',
      bottom: '40px',
      right: '24px',
      height: '1px',
      background: '#30363d'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '60px',
      bottom: '40px',
      top: '24px',
      width: '1px',
      background: '#30363d'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '8px',
      top: '50%',
      transform: 'rotate(-90deg) translateX(50%)',
      fontSize: '10px',
      color: '#6e7681',
      whiteSpace: 'nowrap'
    }
  }, "I diferencial (Id)"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '8px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '10px',
      color: '#6e7681'
    }
  }, "I restri\xE7\xE3o (Ir)"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '60px',
      bottom: '40px',
      width: '0',
      height: '0',
      borderLeft: '200px solid transparent',
      borderBottom: `120px solid rgba(63,185,80,0.15)`,
      clipPath: 'polygon(0 100%, 40% 100%, 100% 40%, 100% 0, 0 0)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '60px',
      right: '24px',
      bottom: `${40 + results.terminal_A.ansi_87l_pickup_pu / 100 * 100}px`,
      height: '2px',
      background: '#f97316',
      borderStyle: 'dashed'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: '0',
      top: '-16px',
      fontSize: '10px',
      color: '#f97316'
    }
  }, "Pickup (", results.terminal_A.ansi_87l_pickup_pu, "%)")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '60px',
      bottom: '40px',
      width: '100px',
      height: '2px',
      background: '#3fb950',
      transform: `rotate(-${Math.atan(results.terminal_A.ansi_87l_slope1 / 100) * 180 / Math.PI}deg)`,
      transformOrigin: 'left bottom'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '-16px',
      fontSize: '10px',
      color: '#3fb950',
      whiteSpace: 'nowrap'
    }
  }, "Slope1: ", results.terminal_A.ansi_87l_slope1, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '160px',
      bottom: '70px',
      width: '120px',
      height: '2px',
      background: '#58a6ff',
      transform: `rotate(-${Math.atan(results.terminal_A.ansi_87l_slope2 / 100) * 180 / Math.PI}deg)`,
      transformOrigin: 'left bottom'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '-16px',
      fontSize: '10px',
      color: '#58a6ff',
      whiteSpace: 'nowrap'
    }
  }, "Slope2: ", results.terminal_A.ansi_87l_slope2, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '24px',
      right: '24px',
      fontSize: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#3fb950',
      marginBottom: '4px'
    }
  }, "\u25A0 Regi\xE3o de Opera\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#6e7681'
    }
  }, "\u25A1 Regi\xE3o de Restri\xE7\xE3o")))))), activeTab === 4 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(CheckCircle, {
    size: 20
  })), /*#__PURE__*/React.createElement("h2", null, "An\xE1lise de Falta Deslizante (Sliding Fault)")), !results ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '48px',
      color: '#6e7681'
    }
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    size: 48,
    style: {
      marginBottom: '16px',
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("p", null, "Execute os c\xE1lculos na aba anterior para visualizar a valida\xE7\xE3o.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("table", {
    className: "results-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Posi\xE7\xE3o (%)"), /*#__PURE__*/React.createElement("th", null, "Dist\xE2ncia (km)"), /*#__PURE__*/React.createElement("th", null, "Z Vista (A)"), /*#__PURE__*/React.createElement("th", null, "Zona (A)"), /*#__PURE__*/React.createElement("th", null, "Status (A)"), /*#__PURE__*/React.createElement("th", null, "Z Vista (B)"), /*#__PURE__*/React.createElement("th", null, "Zona (B)"), /*#__PURE__*/React.createElement("th", null, "Status (B)"))), /*#__PURE__*/React.createElement("tbody", null, results.validation.map((row, idx) => /*#__PURE__*/React.createElement("tr", {
    key: idx
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, row.percent, "%")), /*#__PURE__*/React.createElement("td", null, row.distance_km, " km"), /*#__PURE__*/React.createElement("td", null, row.terminal_A.z_seen, " \u03A9"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `zone-chip ${row.terminal_A.zone.toLowerCase()}`
  }, row.terminal_A.zone)), /*#__PURE__*/React.createElement("td", {
    className: `status-${row.terminal_A.status.toLowerCase()}`
  }, row.terminal_A.match ? '✓ OK' : '⚠ Verificar'), /*#__PURE__*/React.createElement("td", null, row.terminal_B.z_seen, " \u03A9"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `zone-chip ${row.terminal_B.zone.toLowerCase()}`
  }, row.terminal_B.zone)), /*#__PURE__*/React.createElement("td", {
    className: `status-${row.terminal_B.status.toLowerCase()}`
  }, row.terminal_B.match ? '✓ OK' : '⚠ Verificar'))))), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Diagrama de Zonas (Tempo x Dist\xE2ncia)"), /*#__PURE__*/React.createElement("div", {
    className: "validation-chart"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '60px',
      right: '24px',
      bottom: '50px',
      top: '24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '0',
      width: `${results.terminal_A.z1_reach / results.terminal_A.z3_reach * 100}%`,
      bottom: '160px',
      height: '30px',
      background: 'rgba(63,185,80,0.3)',
      border: '2px solid #3fb950',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#3fb950',
      fontSize: '12px',
      fontWeight: '600'
    }
  }, "Z1 (", results.terminal_A.z1_time, "s)"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '0',
      width: `${results.terminal_A.z2_reach / results.terminal_A.z3_reach * 100}%`,
      bottom: '100px',
      height: '30px',
      background: 'rgba(88,166,255,0.3)',
      border: '2px solid #58a6ff',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#58a6ff',
      fontSize: '12px',
      fontWeight: '600'
    }
  }, "Z2 (", results.terminal_A.z2_time, "s)"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '0',
      width: '100%',
      bottom: '40px',
      height: '30px',
      background: 'rgba(210,153,34,0.3)',
      border: '2px solid #d29922',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#d29922',
      fontSize: '12px',
      fontWeight: '600'
    }
  }, "Z3 (", results.terminal_A.z3_time, "s)"), results.validation.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      left: `${v.percent}%`,
      bottom: v.terminal_A.zone === 'Z1' ? '175px' : v.terminal_A.zone === 'Z2' ? '115px' : '55px',
      width: '12px',
      height: '12px',
      background: v.terminal_A.match ? '#3fb950' : '#f85149',
      borderRadius: '50%',
      transform: 'translateX(-50%)',
      boxShadow: `0 0 8px ${v.terminal_A.match ? '#3fb950' : '#f85149'}`
    },
    title: `${v.percent}%: ${v.terminal_A.z_seen}Ω → ${v.terminal_A.zone}`
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '8px',
      top: '24px',
      fontSize: '10px',
      color: '#6e7681'
    }
  }, "Tempo"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '8px',
      top: '50px',
      fontSize: '10px',
      color: '#6e7681'
    }
  }, results.terminal_A.z3_time, "s"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '8px',
      top: '110px',
      fontSize: '10px',
      color: '#6e7681'
    }
  }, results.terminal_A.z2_time, "s"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '8px',
      top: '165px',
      fontSize: '10px',
      color: '#6e7681'
    }
  }, results.terminal_A.z1_time, "s"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '16px',
      left: '60px',
      right: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '10px',
      color: '#6e7681'
    }
  }, /*#__PURE__*/React.createElement("span", null, "0%"), /*#__PURE__*/React.createElement("span", null, "25%"), /*#__PURE__*/React.createElement("span", null, "50%"), /*#__PURE__*/React.createElement("span", null, "75%"), /*#__PURE__*/React.createElement("span", null, "100%")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '4px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '10px',
      color: '#6e7681'
    }
  }, "Dist\xE2ncia da Linha (%)"))))), activeTab === 5 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(FileText, {
    size: 20
  })), /*#__PURE__*/React.createElement("h2", null, "Gera\xE7\xE3o de Relat\xF3rio")), projeto.norma === 'COES' && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '24px',
      padding: '16px',
      background: 'rgba(210,153,34,0.15)',
      borderRadius: '8px',
      borderLeft: '4px solid #d29922'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '13px',
      color: '#d29922',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    size: 18
  }), /*#__PURE__*/React.createElement("strong", null, "REQUISITO COES (PR-20):"), " La tabla de \"Sliding Fault\" es OBLIGATORIA en el reporte para demostrar que en 99% de la l\xEDnea la Z1 NO opera.")), /*#__PURE__*/React.createElement("div", {
    className: "split-view"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Upload do Coordenograma"), /*#__PURE__*/React.createElement("div", {
    className: "upload-zone",
    onDrop: handleDrop,
    onDragOver: e => e.preventDefault(),
    onClick: () => document.getElementById('file-input')?.click()
  }, /*#__PURE__*/React.createElement("input", {
    id: "file-input",
    type: "file",
    accept: "image/*",
    onChange: handleImageUpload,
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(Upload, {
    size: 28
  })), /*#__PURE__*/React.createElement("h3", null, "Arraste a imagem ou clique para selecionar"), /*#__PURE__*/React.createElement("p", null, "Formatos aceitos: PNG, JPG, PDF"), uploadedImage && /*#__PURE__*/React.createElement("img", {
    src: uploadedImage,
    alt: "Coordenograma",
    className: "uploaded-preview"
  })), /*#__PURE__*/React.createElement("div", {
    className: "section-title",
    style: {
      marginTop: '24px'
    }
  }, "Elementos do Relat\xF3rio"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(13,17,23,0.6)',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '11px',
      color: '#6e7681',
      marginBottom: '8px'
    }
  }, "Logo do Cliente"), clientes.find(c => c.id === projeto.cliente_id)?.logo ? /*#__PURE__*/React.createElement("img", {
    src: clientes.find(c => c.id === projeto.cliente_id)?.logo,
    alt: "Logo",
    style: {
      maxHeight: '60px',
      maxWidth: '100%'
    }
  }) : /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '12px',
      color: '#484f58'
    }
  }, "N\xE3o cadastrado")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(13,17,23,0.6)',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '11px',
      color: '#6e7681',
      marginBottom: '8px'
    }
  }, "Assinatura do Engenheiro"), engenheiros.find(e => e.id === projeto.engenheiro_id)?.assinatura ? /*#__PURE__*/React.createElement("img", {
    src: engenheiros.find(e => e.id === projeto.engenheiro_id)?.assinatura,
    alt: "Assinatura",
    style: {
      maxHeight: '60px',
      maxWidth: '100%',
      background: '#fff',
      borderRadius: '4px',
      padding: '4px'
    }
  }) : /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '12px',
      color: '#484f58'
    }
  }, "N\xE3o cadastrada")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Preview do Memorial T\xE9cnico"), /*#__PURE__*/React.createElement("div", {
    className: "report-preview",
    style: {
      maxHeight: '700px',
      overflowY: 'auto'
    }
  }, results ? (() => {
    const report = generateFullReport();
    if (!report) return null;

    // Função para renderizar texto com negrito (remove ** e aplica <strong>)
    const renderBold = text => {
      if (!text) return '';
      const parts = text.split(/\*\*(.*?)\*\*/g);
      return parts.map((part, i) => i % 2 === 1 ? /*#__PURE__*/React.createElement("strong", {
        key: i
      }, part) : part);
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontSize: '11px',
        lineHeight: '1.6'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        marginBottom: '24px',
        paddingBottom: '20px',
        borderBottom: '3px solid #f97316'
      }
    }, report.secao_1_capa.conteudo.cliente_logo && /*#__PURE__*/React.createElement("img", {
      src: report.secao_1_capa.conteudo.cliente_logo,
      alt: "Logo",
      style: {
        maxHeight: '50px',
        marginBottom: '12px'
      }
    }), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: '14px',
        color: '#f97316',
        marginBottom: '4px'
      }
    }, report.documento.titulo), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: '12px',
        color: '#8b949e'
      }
    }, report.secao_1_capa.conteudo.projeto), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: '10px',
        color: '#6e7681',
        marginTop: '8px'
      }
    }, report.documento.versao, " | ", report.documento.data), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '12px',
        fontSize: '10px',
        color: '#8b949e'
      }
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Cliente:"), " ", report.secao_1_capa.conteudo.cliente), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Respons\xE1vel:"), " ", report.secao_1_capa.conteudo.responsavel_tecnico, " (", report.secao_1_capa.conteudo.responsavel_crea, ")"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '16px'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: '12px',
        color: '#58a6ff',
        marginBottom: '6px',
        borderBottom: '1px solid #21262d',
        paddingBottom: '4px'
      }
    }, "2. Objetivo"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#c9d1d9',
        fontSize: '10px',
        textAlign: 'justify'
      }
    }, report.secao_2_objetivo.texto)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '16px'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: '12px',
        color: '#58a6ff',
        marginBottom: '6px',
        borderBottom: '1px solid #21262d',
        paddingBottom: '4px'
      }
    }, "3. Escopo"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#c9d1d9',
        fontSize: '10px',
        marginBottom: '8px'
      }
    }, report.secao_3_escopo.texto), /*#__PURE__*/React.createElement("ul", {
      style: {
        color: '#8b949e',
        fontSize: '9px',
        marginLeft: '16px',
        marginBottom: '12px'
      }
    }, report.secao_3_escopo.lista_funcoes.map((f, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        marginBottom: '2px'
      }
    }, f))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(63,185,80,0.1)',
        padding: '8px',
        borderRadius: '4px',
        borderLeft: '2px solid #3fb950'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: '9px',
        color: '#3fb950',
        marginBottom: '2px',
        fontWeight: '600'
      }
    }, "Terminal A: ", report.secao_3_escopo.equipamentos.terminal_a.nome), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: '9px',
        color: '#8b949e'
      }
    }, "Rel\xE9: ", report.secao_3_escopo.equipamentos.terminal_a.rele)), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(163,113,247,0.1)',
        padding: '8px',
        borderRadius: '4px',
        borderLeft: '2px solid #a371f7'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: '9px',
        color: '#a371f7',
        marginBottom: '2px',
        fontWeight: '600'
      }
    }, "Terminal B: ", report.secao_3_escopo.equipamentos.terminal_b.nome), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: '9px',
        color: '#8b949e'
      }
    }, "Rel\xE9: ", report.secao_3_escopo.equipamentos.terminal_b.rele)))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '16px'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: '12px',
        color: '#58a6ff',
        marginBottom: '6px',
        borderBottom: '1px solid #21262d',
        paddingBottom: '4px'
      }
    }, "4. Documentos Normativos e de Refer\xEAncia"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#c9d1d9',
        fontSize: '10px',
        marginBottom: '6px'
      }
    }, report.secao_4_normas.texto), /*#__PURE__*/React.createElement("ul", {
      style: {
        color: '#8b949e',
        fontSize: '9px',
        marginLeft: '16px'
      }
    }, report.secao_4_normas.normas_aplicadas.map((n, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        marginBottom: '2px'
      }
    }, n)))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '16px'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: '12px',
        color: '#58a6ff',
        marginBottom: '6px',
        borderBottom: '1px solid #21262d',
        paddingBottom: '4px'
      }
    }, "5. Desenvolvimento Metodol\xF3gico"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#8b949e',
        fontSize: '10px',
        marginBottom: '12px'
      }
    }, report.secao_5_metodologia.intro), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: '8px',
        marginBottom: '14px'
      }
    }, /*#__PURE__*/React.createElement("h4", {
      style: {
        fontSize: '11px',
        color: '#3fb950',
        marginBottom: '6px'
      }
    }, "5.1. Prote\xE7\xE3o de Dist\xE2ncia (21/21N)"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#8b949e',
        fontSize: '9px',
        marginBottom: '8px'
      }
    }, report.secao_5_metodologia.subsecao_21.conceito), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(63,185,80,0.1)',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '6px',
        borderLeft: '3px solid #3fb950'
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: '#3fb950',
        fontSize: '10px'
      }
    }, "Zona 1 (Subalcance)"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#c9d1d9',
        fontSize: '9px',
        marginTop: '4px'
      }
    }, renderBold(report.secao_5_metodologia.subsecao_21.zona_1.texto)), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#6e7681',
        fontSize: '9px',
        marginTop: '6px'
      }
    }, "Alcance A: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#3fb950'
      }
    }, report.secao_5_metodologia.subsecao_21.zona_1.alcance_a, " \u03A9"), " | Alcance B: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#a371f7'
      }
    }, report.secao_5_metodologia.subsecao_21.zona_1.alcance_b, " \u03A9"), " | Tempo: ", report.secao_5_metodologia.subsecao_21.zona_1.tempo, "s")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(88,166,255,0.1)',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '6px',
        borderLeft: '3px solid #58a6ff'
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: '#58a6ff',
        fontSize: '10px'
      }
    }, "Zona 2 (Sobrealcance)"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#c9d1d9',
        fontSize: '9px',
        marginTop: '4px'
      }
    }, renderBold(report.secao_5_metodologia.subsecao_21.zona_2.texto)), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#6e7681',
        fontSize: '9px',
        marginTop: '6px'
      }
    }, "Alcance A: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#3fb950'
      }
    }, report.secao_5_metodologia.subsecao_21.zona_2.alcance_a, " \u03A9"), " | Alcance B: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#a371f7'
      }
    }, report.secao_5_metodologia.subsecao_21.zona_2.alcance_b, " \u03A9"), " | Tempo: ", report.secao_5_metodologia.subsecao_21.zona_2.tempo, "s")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(210,153,34,0.1)',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '6px',
        borderLeft: '3px solid #d29922'
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: '#d29922',
        fontSize: '10px'
      }
    }, "Zona 3 (Retaguarda)"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#c9d1d9',
        fontSize: '9px',
        marginTop: '4px'
      }
    }, renderBold(report.secao_5_metodologia.subsecao_21.zona_3.texto)), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#6e7681',
        fontSize: '9px',
        marginTop: '6px'
      }
    }, "Alcance A: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#3fb950'
      }
    }, report.secao_5_metodologia.subsecao_21.zona_3.alcance_a, " \u03A9"), " | Alcance B: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#a371f7'
      }
    }, report.secao_5_metodologia.subsecao_21.zona_3.alcance_b, " \u03A9"), " | Tempo: ", report.secao_5_metodologia.subsecao_21.zona_3.tempo, "s")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(163,113,247,0.1)',
        padding: '10px',
        borderRadius: '4px',
        borderLeft: '3px solid #a371f7'
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: '#a371f7',
        fontSize: '10px'
      }
    }, "Compensa\xE7\xE3o K0"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#c9d1d9',
        fontSize: '9px',
        marginTop: '4px'
      }
    }, report.secao_5_metodologia.subsecao_21.compensacao_k0.texto), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#6e7681',
        fontSize: '9px',
        marginTop: '6px'
      }
    }, "Terminal A: |K0| = ", report.secao_5_metodologia.subsecao_21.compensacao_k0.modulo_a, " \u2220", report.secao_5_metodologia.subsecao_21.compensacao_k0.angulo_a, "\xB0 | Terminal B: |K0| = ", report.secao_5_metodologia.subsecao_21.compensacao_k0.modulo_b, " \u2220", report.secao_5_metodologia.subsecao_21.compensacao_k0.angulo_b, "\xB0"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: '8px',
        marginBottom: '14px'
      }
    }, /*#__PURE__*/React.createElement("h4", {
      style: {
        fontSize: '11px',
        color: '#3fb950',
        marginBottom: '6px'
      }
    }, "5.2. Prote\xE7\xE3o Diferencial de Linha (87L)"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#8b949e',
        fontSize: '9px',
        marginBottom: '6px'
      }
    }, report.secao_5_metodologia.subsecao_87l.conceito), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(88,166,255,0.08)',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '9px',
        color: '#8b949e'
      }
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "I_charging:"), " ", report.secao_5_metodologia.subsecao_87l.compensacao_carga.texto), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: '4px'
      }
    }, "Pickup A: ", report.secao_5_metodologia.subsecao_87l.ajustes.pickup_a, " A (", report.secao_5_metodologia.subsecao_87l.ajustes.pickup_pu_a, "% In) | Slope 1: ", report.secao_5_metodologia.subsecao_87l.ajustes.slope_1, "% | Slope 2: ", report.secao_5_metodologia.subsecao_87l.ajustes.slope_2, "%"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: '8px',
        marginBottom: '14px'
      }
    }, /*#__PURE__*/React.createElement("h4", {
      style: {
        fontSize: '11px',
        color: '#3fb950',
        marginBottom: '6px'
      }
    }, "5.3. Sobrecorrente Direcional de Terra (67N)"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#8b949e',
        fontSize: '9px',
        marginBottom: '4px'
      }
    }, report.secao_5_metodologia.subsecao_67n.conceito), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#8b949e',
        fontSize: '9px'
      }
    }, renderBold(report.secao_5_metodologia.subsecao_67n.polarizacao.texto))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: '8px'
      }
    }, /*#__PURE__*/React.createElement("h4", {
      style: {
        fontSize: '11px',
        color: '#3fb950',
        marginBottom: '6px'
      }
    }, "5.4. Sobrecorrente de Fase (50/51)"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#8b949e',
        fontSize: '9px',
        marginBottom: '4px'
      }
    }, report.secao_5_metodologia.subsecao_50_51.conceito), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#8b949e',
        fontSize: '9px'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "51:"), " ", report.secao_5_metodologia.subsecao_50_51.unidade_51.texto), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#8b949e',
        fontSize: '9px'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "50:"), " ", report.secao_5_metodologia.subsecao_50_51.unidade_50.texto))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '16px'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: '12px',
        color: '#58a6ff',
        marginBottom: '6px',
        borderBottom: '1px solid #21262d',
        paddingBottom: '4px'
      }
    }, "6. An\xE1lise dos Resultados"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#8b949e',
        fontSize: '10px',
        marginBottom: '8px'
      }
    }, report.secao_6_analise.intro), report.secao_6_analise.analise_critica_cobertura.validacao_obrigatoria && /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(210,153,34,0.15)',
        padding: '10px',
        borderRadius: '6px',
        marginBottom: '10px',
        border: '1px solid #d29922'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#d29922',
        fontSize: '10px',
        margin: 0
      }
    }, "\u26A0\uFE0F ", /*#__PURE__*/React.createElement("strong", null, "VALIDA\xC7\xC3O OBRIGAT\xD3RIA COES (PR-20):"), " A tabela de Sliding Fault \xE9 mandat\xF3ria para demonstrar que em 99% da linha a Z1 N\xC3O opera.")), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#c9d1d9',
        fontSize: '9px',
        marginBottom: '8px'
      }
    }, report.secao_6_analise.analise_critica_cobertura.texto), /*#__PURE__*/React.createElement("table", {
      style: {
        width: '100%',
        fontSize: '8px',
        borderCollapse: 'collapse',
        marginTop: '8px'
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
      style: {
        background: 'rgba(48,54,61,0.5)'
      }
    }, /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '4px',
        textAlign: 'center',
        color: '#8b949e',
        borderBottom: '1px solid #30363d'
      }
    }, "%"), /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '4px',
        textAlign: 'center',
        color: '#8b949e',
        borderBottom: '1px solid #30363d'
      }
    }, "km"), /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '4px',
        textAlign: 'center',
        color: '#8b949e',
        borderBottom: '1px solid #30363d'
      }
    }, "Z Vista A"), /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '4px',
        textAlign: 'center',
        color: '#8b949e',
        borderBottom: '1px solid #30363d'
      }
    }, "Zona A"), /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '4px',
        textAlign: 'center',
        color: '#8b949e',
        borderBottom: '1px solid #30363d'
      }
    }, "Z Vista B"), /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '4px',
        textAlign: 'center',
        color: '#8b949e',
        borderBottom: '1px solid #30363d'
      }
    }, "Zona B"))), /*#__PURE__*/React.createElement("tbody", null, report.secao_6_analise.analise_critica_cobertura.validacao.map((v, i) => /*#__PURE__*/React.createElement("tr", {
      key: i,
      style: {
        borderBottom: '1px solid #21262d'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '3px',
        textAlign: 'center',
        color: '#c9d1d9'
      }
    }, v.percent, "%"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '3px',
        textAlign: 'center',
        color: '#8b949e'
      }
    }, v.distance_km), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '3px',
        textAlign: 'center',
        color: '#c9d1d9'
      }
    }, v.terminal_A.z_seen, " \u03A9"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '3px',
        textAlign: 'center',
        color: v.terminal_A.zone === 'Z1' ? '#3fb950' : v.terminal_A.zone === 'Z2' ? '#58a6ff' : '#d29922',
        fontWeight: '600'
      }
    }, v.terminal_A.zone), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '3px',
        textAlign: 'center',
        color: '#c9d1d9'
      }
    }, v.terminal_B.z_seen, " \u03A9"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '3px',
        textAlign: 'center',
        color: v.terminal_B.zone === 'Z1' ? '#3fb950' : v.terminal_B.zone === 'Z2' ? '#58a6ff' : '#d29922',
        fontWeight: '600'
      }
    }, v.terminal_B.zone)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '16px'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: '12px',
        color: '#58a6ff',
        marginBottom: '6px',
        borderBottom: '1px solid #21262d',
        paddingBottom: '4px'
      }
    }, "7. Recomenda\xE7\xF5es"), /*#__PURE__*/React.createElement("ul", {
      style: {
        color: '#8b949e',
        fontSize: '9px',
        marginLeft: '16px'
      }
    }, report.secao_7_recomendacoes.lista.map((r, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        marginBottom: '3px'
      }
    }, r)))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '16px'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: '12px',
        color: '#58a6ff',
        marginBottom: '6px',
        borderBottom: '1px solid #21262d',
        paddingBottom: '4px'
      }
    }, "8. Conclus\xF5es"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#c9d1d9',
        fontSize: '10px',
        textAlign: 'justify'
      }
    }, report.secao_8_conclusoes.texto)), (() => {
      const releA = reles.find(r => r.id === projeto.rele_a_id);
      const releB = reles.find(r => r.id === projeto.rele_b_id);
      // Verificação mais robusta - aceita 'SEL-421', 'sel-421', '421', etc.
      const isSEL421A = releA && (releA.modelo?.toUpperCase().includes('421') || releA.modelo?.toUpperCase().includes('SEL-421'));
      const isSEL421B = releB && (releB.modelo?.toUpperCase().includes('421') || releB.modelo?.toUpperCase().includes('SEL-421'));
      const isSEL421 = isSEL421A || isSEL421B;
      if (!isSEL421) return null;
      const termA = results.terminal_A;
      const termB = results.terminal_B;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: '16px',
          background: 'linear-gradient(135deg, rgba(0,102,204,0.1) 0%, rgba(0,102,204,0.02) 100%)',
          borderRadius: '8px',
          padding: '12px',
          border: '1px solid rgba(0,102,204,0.3)'
        }
      }, /*#__PURE__*/React.createElement("h3", {
        style: {
          fontSize: '12px',
          color: '#0066cc',
          marginBottom: '10px',
          borderBottom: '2px solid #0066cc',
          paddingBottom: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }
      }, "\uD83D\uDCCB Tabela de Ajustes - SEL-421 (Word Bits)"), /*#__PURE__*/React.createElement("p", {
        style: {
          color: '#8b949e',
          fontSize: '9px',
          marginBottom: '12px'
        }
      }, "Par\xE2metros mapeados para c\xE9lulas de configura\xE7\xE3o do rel\xE9 SEL-421"), /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: '10px'
        }
      }, /*#__PURE__*/React.createElement("h4", {
        style: {
          fontSize: '10px',
          color: '#4caf50',
          marginBottom: '6px'
        }
      }, "\uD83D\uDD37 Prote\xE7\xE3o de Dist\xE2ncia (21/21N)"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '4px',
          fontSize: '8px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px',
          borderLeft: '3px solid #4caf50'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#4caf50'
        }
      }, "Z1MAG"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#c9d1d9'
        }
      }, "A: ", termA.z1_reach, " \u03A9"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#a371f7'
        }
      }, "B: ", termB.z1_reach, " \u03A9")), /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px',
          borderLeft: '3px solid #2196f3'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#2196f3'
        }
      }, "Z2MAG"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#c9d1d9'
        }
      }, "A: ", termA.z2_reach, " \u03A9"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#a371f7'
        }
      }, "B: ", termB.z2_reach, " \u03A9")), /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px',
          borderLeft: '3px solid #ff9800'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#ff9800'
        }
      }, "Z3MAG"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#c9d1d9'
        }
      }, "A: ", termA.z3_reach, " \u03A9"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#a371f7'
        }
      }, "B: ", termB.z3_reach, " \u03A9")), /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px',
          borderLeft: '3px solid #a855f7'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#a855f7'
        }
      }, "Z4MAG (Rev)"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#c9d1d9'
        }
      }, "A: ", termA.z4_reach, " \u03A9"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#a371f7'
        }
      }, "B: ", termB.z4_reach, " \u03A9"))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '4px',
          fontSize: '8px',
          marginTop: '4px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px',
          borderLeft: '3px solid #22c55e'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#22c55e'
        }
      }, "k0MAG"), /*#__PURE__*/React.createElement("span", {
        style: {
          color: '#c9d1d9',
          marginLeft: '8px'
        }
      }, "A: ", termA.k0_modulo, " pu | B: ", termB.k0_modulo, " pu")), /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px',
          borderLeft: '3px solid #22c55e'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#22c55e'
        }
      }, "k0ANG"), /*#__PURE__*/React.createElement("span", {
        style: {
          color: '#c9d1d9',
          marginLeft: '8px'
        }
      }, "A: ", termA.k0_angulo, "\xB0 | B: ", termB.k0_angulo, "\xB0")))), /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: '10px'
        }
      }, /*#__PURE__*/React.createElement("h4", {
        style: {
          fontSize: '10px',
          color: '#2196f3',
          marginBottom: '6px'
        }
      }, "\uD83D\uDD37 Transformadores (CT/PT)"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '4px',
          fontSize: '8px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#2196f3'
        }
      }, "CTRW"), /*#__PURE__*/React.createElement("span", {
        style: {
          color: '#c9d1d9',
          marginLeft: '8px'
        }
      }, "A: ", terminalA.rtc, " | B: ", terminalB.rtc)), /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#2196f3'
        }
      }, "PTRY"), /*#__PURE__*/React.createElement("span", {
        style: {
          color: '#c9d1d9',
          marginLeft: '8px'
        }
      }, "A: ", terminalA.rtp, " | B: ", terminalB.rtp)))), /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: '10px'
        }
      }, /*#__PURE__*/React.createElement("h4", {
        style: {
          fontSize: '10px',
          color: '#f44336',
          marginBottom: '6px'
        }
      }, "\uD83D\uDD37 Sobrecorrente (50/51/67)"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '4px',
          fontSize: '8px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#f44336'
        }
      }, "51S1P"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#c9d1d9'
        }
      }, "A: ", termA.ansi_51_pickup, " A"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#a371f7'
        }
      }, "B: ", termB.ansi_51_pickup, " A")), /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#f44336'
        }
      }, "50P1P"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#c9d1d9'
        }
      }, "A: ", termA.ansi_50_pickup, " A"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#a371f7'
        }
      }, "B: ", termB.ansi_50_pickup, " A")), /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#9c27b0'
        }
      }, "67G1P"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#c9d1d9'
        }
      }, "A: ", termA.ansi_67n_pickup_fwd, " A"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#a371f7'
        }
      }, "B: ", termB.ansi_67n_pickup_fwd, " A")), /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#9c27b0'
        }
      }, "67G1MTA"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#c9d1d9'
        }
      }, termA.ansi_67n_mta, "\xB0")))), /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: '6px'
        }
      }, /*#__PURE__*/React.createElement("h4", {
        style: {
          fontSize: '10px',
          color: '#00bcd4',
          marginBottom: '6px'
        }
      }, "\uD83D\uDD37 Diferencial (87L)"), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '4px',
          fontSize: '8px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#00bcd4'
        }
      }, "87LPP"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#c9d1d9'
        }
      }, "A: ", termA.ansi_87l_pickup, " A"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#a371f7'
        }
      }, "B: ", termB.ansi_87l_pickup, " A")), /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#00bcd4'
        }
      }, "87LS1"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#c9d1d9'
        }
      }, termA.ansi_87l_slope1, "%")), /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#00bcd4'
        }
      }, "87LS2"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#c9d1d9'
        }
      }, termA.ansi_87l_slope2, "%")), /*#__PURE__*/React.createElement("div", {
        style: {
          background: '#161b22',
          padding: '4px',
          borderRadius: '4px'
        }
      }, /*#__PURE__*/React.createElement("strong", {
        style: {
          color: '#00bcd4'
        }
      }, "EICHG"), /*#__PURE__*/React.createElement("div", {
        style: {
          color: '#c9d1d9'
        }
      }, termA.i_charging_ref, " A")))), /*#__PURE__*/React.createElement("div", {
        style: {
          background: 'rgba(255,152,0,0.1)',
          border: '1px solid #ff9800',
          borderRadius: '4px',
          padding: '6px',
          marginTop: '8px'
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          color: '#ff9800',
          fontSize: '8px',
          margin: 0
        }
      }, "\u26A0\uFE0F Valores em \u03A9 secund\xE1rios (K = RTC/RTP) e Amperes secund\xE1rios. Ver tabela completa no HTML exportado.")));
    })(), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '16px'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: '12px',
        color: '#58a6ff',
        marginBottom: '6px',
        borderBottom: '1px solid #21262d',
        paddingBottom: '4px'
      }
    }, "9. Bibliografia"), /*#__PURE__*/React.createElement("ul", {
      style: {
        color: '#8b949e',
        fontSize: '9px',
        marginLeft: '16px'
      }
    }, report.secao_9_bibliografia.lista.map((b, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        marginBottom: '2px'
      }
    }, b)))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '16px'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: '12px',
        color: '#58a6ff',
        marginBottom: '6px',
        borderBottom: '1px solid #21262d',
        paddingBottom: '4px'
      }
    }, "10. Ap\xEAndices"), /*#__PURE__*/React.createElement("ul", {
      style: {
        color: '#8b949e',
        fontSize: '9px',
        marginLeft: '16px'
      }
    }, report.secao_10_apendices.conteudo.map((a, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        marginBottom: '2px'
      }
    }, a)))), uploadedImage && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '16px',
        background: 'linear-gradient(135deg, rgba(0,102,204,0.1) 0%, rgba(0,102,204,0.02) 100%)',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid rgba(0,102,204,0.3)'
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: '12px',
        color: '#0066cc',
        marginBottom: '8px',
        borderBottom: '2px solid #0066cc',
        paddingBottom: '4px'
      }
    }, "\uD83D\uDCCA Ap\xEAndice D: Coordenograma R-X"), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        padding: '12px',
        background: '#161b22',
        borderRadius: '6px'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: uploadedImage,
      alt: "Coordenograma R-X",
      style: {
        maxWidth: '100%',
        maxHeight: '250px',
        borderRadius: '4px',
        border: '1px solid #30363d'
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#8b949e',
        fontSize: '9px',
        marginTop: '8px',
        fontStyle: 'italic'
      }
    }, "Figura: Coordenograma R-X - ", projeto.linha_nome || 'Linha de Transmissão')), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '6px',
        marginTop: '10px',
        fontSize: '8px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#161b22',
        padding: '6px',
        borderRadius: '4px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#8b949e'
      }
    }, "Linha:"), ' ', /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#58a6ff'
      }
    }, projeto.linha_nome, " | ", projeto.linha_comprimento, " km")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#161b22',
        padding: '6px',
        borderRadius: '4px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#8b949e'
      }
    }, "Zonas:"), ' ', /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#4caf50'
      }
    }, "Z1=", zonasProtecao.z1_percent, "%"), ' | ', /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#2196f3'
      }
    }, "Z2=", zonasProtecao.z2_percent, "%")))), report.secao_1_capa.conteudo.responsavel_assinatura && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        marginTop: '20px',
        paddingTop: '16px',
        borderTop: '1px solid #21262d'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: report.secao_1_capa.conteudo.responsavel_assinatura,
      alt: "Assinatura",
      style: {
        maxHeight: '40px',
        background: '#fff',
        borderRadius: '4px',
        padding: '4px'
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        color: '#8b949e',
        fontSize: '9px',
        marginTop: '4px'
      }
    }, report.secao_1_capa.conteudo.responsavel_tecnico, /*#__PURE__*/React.createElement("br", null), report.secao_1_capa.conteudo.responsavel_crea)));
  })() : /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '48px',
      color: '#6e7681'
    }
  }, /*#__PURE__*/React.createElement(Calculator, {
    size: 48,
    style: {
      marginBottom: '16px',
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("p", null, "Execute os c\xE1lculos na aba \"C\xE1lculos\" para gerar o memorial t\xE9cnico."))))), /*#__PURE__*/React.createElement("div", {
    className: "actions-bar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    disabled: !results,
    onClick: exportHTML
  }, /*#__PURE__*/React.createElement(Download, {
    size: 18
  }), "Exportar HTML"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    disabled: !results,
    onClick: exportJSON
  }, /*#__PURE__*/React.createElement(Download, {
    size: 18
  }), "Exportar JSON"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    disabled: !results,
    onClick: exportCSV
  }, /*#__PURE__*/React.createElement(Download, {
    size: 18
  }), "Exportar CSV")))), activeTab === 6 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "tab-header"
  }, /*#__PURE__*/React.createElement(Activity, {
    size: 28
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Coordenograma R-X"), /*#__PURE__*/React.createElement("p", null, "Diagrama de imped\xE2ncia com zonas de prote\xE7\xE3o Mho"))), /*#__PURE__*/React.createElement("div", {
    className: "content-grid",
    style: {
      gridTemplateColumns: '350px 1fr'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement(Settings, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Configura\xE7\xF5es")), /*#__PURE__*/React.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", null, "Exibir Zonas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px'
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "checkbox-label",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: coordConfig.showZ1,
    onChange: e => setCoordConfig({
      ...coordConfig,
      showZ1: e.target.checked
    })
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#4caf50'
    }
  }, "Z1")), /*#__PURE__*/React.createElement("label", {
    className: "checkbox-label",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: coordConfig.showZ2,
    onChange: e => setCoordConfig({
      ...coordConfig,
      showZ2: e.target.checked
    })
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#2196f3'
    }
  }, "Z2")), /*#__PURE__*/React.createElement("label", {
    className: "checkbox-label",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: coordConfig.showZ3,
    onChange: e => setCoordConfig({
      ...coordConfig,
      showZ3: e.target.checked
    })
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff9800'
    }
  }, "Z3")), /*#__PURE__*/React.createElement("label", {
    className: "checkbox-label",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: coordConfig.showGrid,
    onChange: e => setCoordConfig({
      ...coordConfig,
      showGrid: e.target.checked
    })
  }), /*#__PURE__*/React.createElement("span", null, "Grid")), /*#__PURE__*/React.createElement("label", {
    className: "checkbox-label",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: coordConfig.showLabels,
    onChange: e => setCoordConfig({
      ...coordConfig,
      showLabels: e.target.checked
    })
  }), /*#__PURE__*/React.createElement("span", null, "Labels")))), /*#__PURE__*/React.createElement("div", {
    className: "divider",
    style: {
      borderTop: '1px solid #30363d',
      margin: '16px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Pontos de Falta"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      padding: '4px 8px',
      fontSize: '12px'
    },
    onClick: () => setCoordFaltas([...coordFaltas, {
      id: Date.now(),
      nome: `F${coordFaltas.length + 1}`,
      local_pct: 50,
      rf_pri: 0,
      tipo: '3PH',
      ativo: true
    }])
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 14
  }), " Add"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: '300px',
      overflowY: 'auto'
    }
  }, coordFaltas.map((falta, idx) => /*#__PURE__*/React.createElement("div", {
    key: falta.id,
    style: {
      background: falta.ativo ? 'rgba(249,115,22,0.1)' : 'rgba(128,128,128,0.1)',
      border: `1px solid ${falta.ativo ? '#f97316' : '#555'}`,
      borderRadius: '8px',
      padding: '10px',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: falta.nome,
    onChange: e => {
      const updated = [...coordFaltas];
      updated[idx].nome = e.target.value;
      setCoordFaltas(updated);
    },
    style: {
      width: '60px',
      padding: '4px',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '4px',
      color: '#e6edf3'
    }
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: falta.ativo,
    onChange: e => {
      const updated = [...coordFaltas];
      updated[idx].ativo = e.target.checked;
      setCoordFaltas(updated);
    }
  }), "Ativo"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCoordFaltas(coordFaltas.filter(f => f.id !== falta.id)),
    style: {
      background: 'none',
      border: 'none',
      color: '#f85149',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 14
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, "Local (%)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: falta.local_pct,
    onChange: e => {
      const updated = [...coordFaltas];
      updated[idx].local_pct = parseFloat(e.target.value) || 0;
      setCoordFaltas(updated);
    },
    style: {
      width: '100%',
      padding: '4px',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '4px',
      color: '#e6edf3'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, "Rf (\u03A9 pri)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: falta.rf_pri,
    onChange: e => {
      const updated = [...coordFaltas];
      updated[idx].rf_pri = parseFloat(e.target.value) || 0;
      setCoordFaltas(updated);
    },
    style: {
      width: '100%',
      padding: '4px',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '4px',
      color: '#e6edf3'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '6px'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '10px',
      color: '#8b949e'
    }
  }, "Tipo"), /*#__PURE__*/React.createElement("select", {
    value: falta.tipo,
    onChange: e => {
      const updated = [...coordFaltas];
      updated[idx].tipo = e.target.value;
      setCoordFaltas(updated);
    },
    style: {
      width: '100%',
      padding: '4px',
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '4px',
      color: '#e6edf3'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "3PH"
  }, "Trif\xE1sico (3PH)"), /*#__PURE__*/React.createElement("option", {
    value: "2PH"
  }, "Bif\xE1sico (2PH)"), /*#__PURE__*/React.createElement("option", {
    value: "1PH"
  }, "Monof\xE1sico (1PH)")))))), results && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '16px',
      padding: '12px',
      background: 'rgba(88,166,255,0.1)',
      borderRadius: '8px',
      border: '1px solid #58a6ff'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      color: '#58a6ff',
      marginBottom: '8px',
      fontSize: '12px'
    }
  }, "\uD83D\uDCCA Dados Calculados"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      fontFamily: 'JetBrains Mono',
      color: '#8b949e'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Z1 Linha: ", results.terminal_A.z1_reach, " \u03A9 (sec)"), /*#__PURE__*/React.createElement("div", null, "Z2 Linha: ", results.terminal_A.z2_reach, " \u03A9 (sec)"), /*#__PURE__*/React.createElement("div", null, "Z3 Linha: ", results.terminal_A.z3_reach, " \u03A9 (sec)"), /*#__PURE__*/React.createElement("div", null, "K0: ", results.terminal_A.k0_modulo, " \u2220", results.terminal_A.k0_angulo, "\xB0"))))), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement(Activity, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Diagrama R-X (Imped\xE2ncia)")), results && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      padding: '6px 12px',
      fontSize: '12px'
    },
    onClick: () => {
      const svgElement = document.getElementById('coordenograma-svg');
      if (!svgElement) {
        alert('SVG não encontrado');
        return;
      }
      try {
        // Criar cópia do SVG
        const svgClone = svgElement.cloneNode(true);
        svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgClone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

        // Adicionar fundo ao SVG
        const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bgRect.setAttribute('width', '100%');
        bgRect.setAttribute('height', '100%');
        bgRect.setAttribute('fill', '#0d1117');
        svgClone.insertBefore(bgRect, svgClone.firstChild);

        // Converter para string
        const svgData = new XMLSerializer().serializeToString(svgClone);
        const svgBase64 = btoa(unescape(encodeURIComponent(svgData)));

        // Criar canvas
        const canvas = document.createElement('canvas');
        canvas.width = 1600;
        canvas.height = 1200;
        const ctx = canvas.getContext('2d');

        // Criar imagem
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          // Desenhar fundo
          ctx.fillStyle = '#0d1117';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Desenhar SVG
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Converter para PNG e baixar
          canvas.toBlob(blob => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `Coordenograma_${projeto.linha_nome || 'LT'}_${new Date().toISOString().split('T')[0]}.png`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }
          }, 'image/png', 1.0);
        };
        img.onerror = e => {
          console.error('Erro ao carregar imagem:', e);
          // Fallback: baixar como SVG
          const svgBlob = new Blob([svgData], {
            type: 'image/svg+xml;charset=utf-8'
          });
          const url = URL.createObjectURL(svgBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Coordenograma_${projeto.linha_nome || 'LT'}_${new Date().toISOString().split('T')[0]}.svg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        };
        img.src = 'data:image/svg+xml;base64,' + svgBase64;
      } catch (error) {
        console.error('Erro no download:', error);
        alert('Erro ao gerar imagem. Tente o formato SVG.');
      }
    }
  }, /*#__PURE__*/React.createElement(Download, {
    size: 14
  }), "PNG"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    style: {
      padding: '6px 12px',
      fontSize: '12px'
    },
    onClick: () => {
      const svgElement = document.getElementById('coordenograma-svg');
      if (!svgElement) return;

      // Criar cópia do SVG
      const svgClone = svgElement.cloneNode(true);
      svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

      // Adicionar fundo
      const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bgRect.setAttribute('width', '100%');
      bgRect.setAttribute('height', '100%');
      bgRect.setAttribute('fill', '#0d1117');
      svgClone.insertBefore(bgRect, svgClone.firstChild);

      // Converter para string e baixar
      const svgData = new XMLSerializer().serializeToString(svgClone);
      const svgBlob = new Blob([svgData], {
        type: 'image/svg+xml;charset=utf-8'
      });
      const url = URL.createObjectURL(svgBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Coordenograma_${projeto.linha_nome || 'LT'}_${new Date().toISOString().split('T')[0]}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, /*#__PURE__*/React.createElement(Download, {
    size: 14
  }), "SVG"))), /*#__PURE__*/React.createElement("div", {
    className: "card-content",
    style: {
      padding: '0'
    }
  }, results ? (() => {
    // ═══════════════════════════════════════════════════════════════════════════
    // COORDENOGRAMA R-X COM CÍRCULOS MHO MATEMATICAMENTE CORRETOS
    // ═══════════════════════════════════════════════════════════════════════════

    const termA = results.terminal_A;
    const termB = results.terminal_B;

    // ═══════════════════════════════════════════════════════════════════════════
    // 1. PARÂMETROS BASE
    // ═══════════════════════════════════════════════════════════════════════════

    // Ângulo da linha de transmissão (radianos)
    const angLinha = Math.atan2(linha.X1, linha.R1);
    const angLinhaGraus = angLinha * 180 / Math.PI;

    // Impedâncias de alcance (secundário) - Terminal A
    const z1Sec = parseFloat(termA.z1_reach) || 10;
    const z2Sec = parseFloat(termA.z2_reach) || 12;
    const z3Sec = parseFloat(termA.z3_reach) || 20;
    const z4Sec = parseFloat(termA.z4_reach) || 5; // Zona 4 Reversa

    // Terminal B
    const z1SecB = parseFloat(termB.z1_reach) || 10;
    const z2SecB = parseFloat(termB.z2_reach) || 12;

    // Impedância total da linha (secundário)
    const fator = terminalA.rtc / terminalA.rtp;
    const zLinhaTotal = Math.sqrt(linha.R1 ** 2 + linha.X1 ** 2) * projeto.linha_comprimento * fator;

    // Ponto final da linha (Terminal B)
    const zLinhaR = zLinhaTotal * Math.cos(angLinha);
    const zLinhaX = zLinhaTotal * Math.sin(angLinha);

    // ═══════════════════════════════════════════════════════════════════════════
    // 2. FUNÇÃO GERADORA DE CÍRCULO MHO (MATEMÁTICA DO PYTHON)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Gera os pontos de um círculo MHO clássico (auto-polarizado)
     * 
     * Matemática:
     * - O círculo MHO passa pela origem (0,0)
     * - O diâmetro é igual ao alcance de impedância (Zset)
     * - O centro está localizado em (Zset/2 * cos(θ), Zset/2 * sin(θ))
     * 
     * @param {number} zReach - Impedância de alcance (módulo em Ω)
     * @param {number} lineAngleRad - Ângulo da linha em radianos
     * @param {number} originR - Coordenada R da origem do círculo
     * @param {number} originX - Coordenada X da origem do círculo
     * @param {boolean} isReverse - Se true, o círculo é espelhado (Z4 reversa)
     * @param {number} numPoints - Número de pontos para gerar o círculo
     * @returns {Array<{r: number, x: number}>} - Array de pontos
     */
    const generateMhoCircle = (zReach, lineAngleRad, originR = 0, originX = 0, isReverse = false, numPoints = 72) => {
      if (zReach <= 0) return [];
      const points = [];
      const radius = zReach / 2;

      // Ângulo efetivo (invertido para zona reversa)
      const effectiveAngle = isReverse ? lineAngleRad + Math.PI : lineAngleRad;

      // Centro do círculo MHO
      const centerR = originR + radius * Math.cos(effectiveAngle);
      const centerX = originX + radius * Math.sin(effectiveAngle);

      // Gerar pontos ao longo do perímetro
      for (let i = 0; i <= numPoints; i++) {
        const theta = 2 * Math.PI * i / numPoints;
        const r = centerR + radius * Math.cos(theta);
        const x = centerX + radius * Math.sin(theta);
        points.push({
          r,
          x
        });
      }
      return points;
    };

    /**
     * Gera um path SVG a partir dos pontos do círculo MHO
     */
    const generateMhoPath = (points, toPixelFn) => {
      if (points.length === 0) return '';
      const pixelPoints = points.map(p => toPixelFn(p.r, p.x));
      const path = pixelPoints.map((p, i) => i === 0 ? `M ${p.px} ${p.py}` : `L ${p.px} ${p.py}`).join(' ');
      return path + ' Z';
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // 3. GERAR DADOS DOS CÍRCULOS MHO
    // ═══════════════════════════════════════════════════════════════════════════

    // Terminal A (origem em 0,0)
    const mhoZ1A = generateMhoCircle(z1Sec, angLinha, 0, 0, false);
    const mhoZ2A = generateMhoCircle(z2Sec, angLinha, 0, 0, false);
    const mhoZ3A = generateMhoCircle(z3Sec, angLinha, 0, 0, false);
    // Z4: só gera se habilitada; direção conforme flag z4_reversa
    const mhoZ4A = zonasProtecao.z4_habilitada ? generateMhoCircle(z4Sec, angLinha, 0, 0, zonasProtecao.z4_reversa) : [];

    // Terminal B (origem em zLinhaR, zLinhaX)
    const mhoZ1B = generateMhoCircle(z1SecB, angLinha, zLinhaR, zLinhaX, true); // Olhando para trás
    const mhoZ2B = generateMhoCircle(z2SecB, angLinha, zLinhaR, zLinhaX, true);

    // ═══════════════════════════════════════════════════════════════════════════
    // 4. CALCULAR PONTOS DE FALTA
    // ═══════════════════════════════════════════════════════════════════════════

    const k0Re = parseFloat(termA.k0_modulo) * Math.cos(parseFloat(termA.k0_angulo) * Math.PI / 180);
    const k0Im = parseFloat(termA.k0_modulo) * Math.sin(parseFloat(termA.k0_angulo) * Math.PI / 180);
    const faltasCalculadas = coordFaltas.filter(f => f.ativo).map(falta => {
      const m = falta.local_pct / 100;
      const zFaltaR = zLinhaR * m;
      const zFaltaX = zLinhaX * m;
      const rfSec = falta.rf_pri * fator;
      let divisor = 1;
      if (falta.tipo === '1PH') divisor = 1 + Math.sqrt(k0Re ** 2 + k0Im ** 2);else if (falta.tipo === '2PH') divisor = 2;
      const rfContrib = rfSec / divisor;
      return {
        ...falta,
        r: zFaltaR + rfContrib,
        x: zFaltaX,
        cor: falta.tipo === '1PH' ? '#ef4444' : falta.tipo === '2PH' ? '#f59e0b' : '#22c55e'
      };
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // 5. AUTO-AJUSTE DE ZOOM (CORRIGIDO)
    // ═══════════════════════════════════════════════════════════════════════════

    const getAllBounds = mhoPoints => {
      if (mhoPoints.length === 0) return {
        minR: 0,
        maxR: 0,
        minX: 0,
        maxX: 0
      };
      return {
        minR: Math.min(...mhoPoints.map(p => p.r)),
        maxR: Math.max(...mhoPoints.map(p => p.r)),
        minX: Math.min(...mhoPoints.map(p => p.x)),
        maxX: Math.max(...mhoPoints.map(p => p.x))
      };
    };
    const allBounds = [];

    // Adicionar bounds de cada zona
    if (coordConfig.showZ1) allBounds.push(getAllBounds(mhoZ1A));
    if (coordConfig.showZ2) allBounds.push(getAllBounds(mhoZ2A));
    if (coordConfig.showZ3) allBounds.push(getAllBounds(mhoZ3A));
    if (coordConfig.showZ4 && zonasProtecao.z4_habilitada) allBounds.push(getAllBounds(mhoZ4A));
    if (coordConfig.showZ1) allBounds.push(getAllBounds(mhoZ1B));
    if (coordConfig.showZ2) allBounds.push(getAllBounds(mhoZ2B));

    // Pontos fixos
    allBounds.push({
      minR: 0,
      maxR: 0,
      minX: 0,
      maxX: 0
    }); // Origem
    allBounds.push({
      minR: zLinhaR,
      maxR: zLinhaR,
      minX: zLinhaX,
      maxX: zLinhaX
    }); // Terminal B

    // Pontos de falta
    faltasCalculadas.forEach(f => {
      allBounds.push({
        minR: f.r,
        maxR: f.r,
        minX: f.x,
        maxX: f.x
      });
    });

    // Calcular limites globais
    const globalMinR = Math.min(...allBounds.map(b => b.minR));
    const globalMaxR = Math.max(...allBounds.map(b => b.maxR));
    const globalMinX = Math.min(...allBounds.map(b => b.minX));
    const globalMaxX = Math.max(...allBounds.map(b => b.maxX));

    // Range e centro
    const rangeR = globalMaxR - globalMinR;
    const rangeX = globalMaxX - globalMinX;
    const maxRange = Math.max(rangeR, rangeX);
    const margin = maxRange * 0.15;
    const span = maxRange + 2 * margin;
    const centerR = (globalMaxR + globalMinR) / 2;
    const centerX = (globalMaxX + globalMinX) / 2;
    const viewMinR = centerR - span / 2;
    const viewMaxR = centerR + span / 2;
    const viewMinX = centerX - span / 2;
    const viewMaxX = centerX + span / 2;

    // ═══════════════════════════════════════════════════════════════════════════
    // 6. CONFIGURAÇÃO DO SVG (ASPECT RATIO 1:1)
    // ═══════════════════════════════════════════════════════════════════════════

    const svgWidth = 800;
    const svgHeight = 700; // Mais alto para melhor visualização
    const plotMargin = 80;
    const plotWidth = svgWidth - 2 * plotMargin;
    const plotHeight = svgHeight - 2 * plotMargin;

    // Escala igual para ambos os eixos (1:1 aspect ratio)
    const scale = Math.min(plotWidth, plotHeight) / span;
    const plotCenterPx = plotMargin + plotWidth / 2;
    const plotCenterPy = plotMargin + plotHeight / 2;

    // Função de conversão Ohms → Pixels
    const toPixel = (r, x) => ({
      px: plotCenterPx + (r - centerR) * scale,
      py: plotCenterPy - (x - centerX) * scale
    });

    // Pontos principais
    const origem = toPixel(0, 0);
    const termBPos = toPixel(zLinhaR, zLinhaX);

    // ═══════════════════════════════════════════════════════════════════════════
    // 7. GERAR PATHS SVG DOS CÍRCULOS MHO
    // ═══════════════════════════════════════════════════════════════════════════

    const pathZ1A = generateMhoPath(mhoZ1A, toPixel);
    const pathZ2A = generateMhoPath(mhoZ2A, toPixel);
    const pathZ3A = generateMhoPath(mhoZ3A, toPixel);
    const pathZ4A = generateMhoPath(mhoZ4A, toPixel);
    const pathZ1B = generateMhoPath(mhoZ1B, toPixel);
    const pathZ2B = generateMhoPath(mhoZ2B, toPixel);

    // ═══════════════════════════════════════════════════════════════════════════
    // 8. GRID E MARCADORES DE ESCALA
    // ═══════════════════════════════════════════════════════════════════════════

    const gridLines = [];
    const gridCount = 10;
    const gridStep = span / gridCount;
    for (let i = 0; i <= gridCount; i++) {
      const valR = viewMinR + i * gridStep;
      const valX = viewMinX + i * gridStep;
      const p1 = toPixel(valR, viewMinX);
      const p2 = toPixel(valR, viewMaxX);
      gridLines.push(/*#__PURE__*/React.createElement("line", {
        key: `grid-v-${i}`,
        x1: p1.px,
        y1: p1.py,
        x2: p2.px,
        y2: p2.py,
        stroke: "#1e2530",
        strokeWidth: 0.5
      }));
      const p3 = toPixel(viewMinR, valX);
      const p4 = toPixel(viewMaxR, valX);
      gridLines.push(/*#__PURE__*/React.createElement("line", {
        key: `grid-h-${i}`,
        x1: p3.px,
        y1: p3.py,
        x2: p4.px,
        y2: p4.py,
        stroke: "#1e2530",
        strokeWidth: 0.5
      }));
    }

    // Marcadores de escala
    const niceStep = Math.pow(10, Math.floor(Math.log10(span / 5)));
    const stepMultiplier = span / 5 / niceStep > 5 ? 10 : span / 5 / niceStep > 2 ? 5 : span / 5 / niceStep > 1 ? 2 : 1;
    const scaleStep = niceStep * stepMultiplier;
    const scaleMarkersR = [];
    const startR = Math.ceil(viewMinR / scaleStep) * scaleStep;
    for (let val = startR; val <= viewMaxR; val += scaleStep) {
      const p = toPixel(val, 0);
      if (p.px > plotMargin + 30 && p.px < svgWidth - plotMargin - 30) {
        scaleMarkersR.push(/*#__PURE__*/React.createElement("g", {
          key: `scale-r-${val}`
        }, /*#__PURE__*/React.createElement("line", {
          x1: p.px,
          y1: origem.py - 5,
          x2: p.px,
          y2: origem.py + 5,
          stroke: "#8b949e",
          strokeWidth: 1
        }), /*#__PURE__*/React.createElement("text", {
          x: p.px,
          y: origem.py + 20,
          fill: "#8b949e",
          fontSize: "10",
          textAnchor: "middle"
        }, val.toFixed(1))));
      }
    }
    const scaleMarkersX = [];
    const startX = Math.ceil(viewMinX / scaleStep) * scaleStep;
    for (let val = startX; val <= viewMaxX; val += scaleStep) {
      const p = toPixel(0, val);
      if (p.py > plotMargin + 30 && p.py < svgHeight - plotMargin - 30) {
        scaleMarkersX.push(/*#__PURE__*/React.createElement("g", {
          key: `scale-x-${val}`
        }, /*#__PURE__*/React.createElement("line", {
          x1: origem.px - 5,
          y1: p.py,
          x2: origem.px + 5,
          y2: p.py,
          stroke: "#8b949e",
          strokeWidth: 1
        }), /*#__PURE__*/React.createElement("text", {
          x: origem.px - 12,
          y: p.py + 4,
          fill: "#8b949e",
          fontSize: "10",
          textAnchor: "end"
        }, val.toFixed(1))));
      }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 9. CALCULAR POSIÇÕES DOS LABELS DAS ZONAS
    // ═══════════════════════════════════════════════════════════════════════════

    const getLabelPosition = (zReach, angle, originR, originX, isReverse) => {
      const effectiveAngle = isReverse ? angle + Math.PI : angle;
      // Colocar label no ponto mais afastado do círculo
      const labelR = originR + zReach * 0.75 * Math.cos(effectiveAngle);
      const labelX = originX + zReach * 0.75 * Math.sin(effectiveAngle);
      return toPixel(labelR, labelX);
    };
    return /*#__PURE__*/React.createElement("svg", {
      id: "coordenograma-svg",
      width: "100%",
      height: "700",
      viewBox: `0 0 ${svgWidth} ${svgHeight}`,
      style: {
        background: 'linear-gradient(180deg, #0a0e14 0%, #0d1117 100%)'
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
      id: "gradZ1",
      cx: "50%",
      cy: "50%",
      r: "50%"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#4caf50",
      stopOpacity: "0.15"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#4caf50",
      stopOpacity: "0.02"
    })), /*#__PURE__*/React.createElement("radialGradient", {
      id: "gradZ2",
      cx: "50%",
      cy: "50%",
      r: "50%"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#2196f3",
      stopOpacity: "0.12"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#2196f3",
      stopOpacity: "0.01"
    })), /*#__PURE__*/React.createElement("radialGradient", {
      id: "gradZ3",
      cx: "50%",
      cy: "50%",
      r: "50%"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#ff9800",
      stopOpacity: "0.10"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#ff9800",
      stopOpacity: "0.01"
    })), /*#__PURE__*/React.createElement("radialGradient", {
      id: "gradZ4",
      cx: "50%",
      cy: "50%",
      r: "50%"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#a855f7",
      stopOpacity: "0.12"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#a855f7",
      stopOpacity: "0.01"
    })), /*#__PURE__*/React.createElement("radialGradient", {
      id: "gradZ1B",
      cx: "50%",
      cy: "50%",
      r: "50%"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#ef4444",
      stopOpacity: "0.12"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#ef4444",
      stopOpacity: "0.01"
    })), /*#__PURE__*/React.createElement("filter", {
      id: "glow",
      x: "-50%",
      y: "-50%",
      width: "200%",
      height: "200%"
    }, /*#__PURE__*/React.createElement("feGaussianBlur", {
      stdDeviation: "2",
      result: "coloredBlur"
    }), /*#__PURE__*/React.createElement("feMerge", null, /*#__PURE__*/React.createElement("feMergeNode", {
      in: "coloredBlur"
    }), /*#__PURE__*/React.createElement("feMergeNode", {
      in: "SourceGraphic"
    })))), /*#__PURE__*/React.createElement("text", {
      x: svgWidth / 2,
      y: 28,
      fill: "#e6edf3",
      fontSize: "18",
      fontWeight: "bold",
      textAnchor: "middle"
    }, "Coordenograma R-X | Plano de Imped\xE2ncia"), /*#__PURE__*/React.createElement("text", {
      x: svgWidth / 2,
      y: 48,
      fill: "#8b949e",
      fontSize: "12",
      textAnchor: "middle"
    }, projeto.linha_nome || 'Linha de Transmissão', " | ", projeto.linha_comprimento, " km | ", projeto.V_nom, " kV | \u03B8 = ", angLinhaGraus.toFixed(1), "\xB0"), coordConfig.showGrid && gridLines, /*#__PURE__*/React.createElement("line", {
      x1: plotMargin,
      y1: origem.py,
      x2: svgWidth - plotMargin,
      y2: origem.py,
      stroke: "#58a6ff",
      strokeWidth: 1.5,
      strokeOpacity: 0.8
    }), /*#__PURE__*/React.createElement("line", {
      x1: origem.px,
      y1: plotMargin,
      x2: origem.px,
      y2: svgHeight - plotMargin,
      stroke: "#58a6ff",
      strokeWidth: 1.5,
      strokeOpacity: 0.8
    }), /*#__PURE__*/React.createElement("text", {
      x: svgWidth - plotMargin + 15,
      y: origem.py + 5,
      fill: "#58a6ff",
      fontSize: "14",
      fontWeight: "bold"
    }, "R (\u03A9)"), /*#__PURE__*/React.createElement("text", {
      x: origem.px + 10,
      y: plotMargin - 10,
      fill: "#58a6ff",
      fontSize: "14",
      fontWeight: "bold"
    }, "jX (\u03A9)"), scaleMarkersR, scaleMarkersX, coordConfig.showZ3 && pathZ3A && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: pathZ3A,
      fill: "url(#gradZ3)",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: pathZ3A,
      fill: "none",
      stroke: "#ff9800",
      strokeWidth: 2,
      strokeDasharray: "8,4",
      opacity: 0.7
    })), coordConfig.showZ2 && pathZ2A && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: pathZ2A,
      fill: "url(#gradZ2)",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: pathZ2A,
      fill: "none",
      stroke: "#2196f3",
      strokeWidth: 2.5,
      strokeDasharray: "10,5",
      opacity: 0.85
    })), coordConfig.showZ1 && pathZ1A && /*#__PURE__*/React.createElement("g", {
      filter: "url(#glow)"
    }, /*#__PURE__*/React.createElement("path", {
      d: pathZ1A,
      fill: "url(#gradZ1)",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: pathZ1A,
      fill: "none",
      stroke: "#4caf50",
      strokeWidth: 3,
      opacity: 0.95
    })), coordConfig.showZ4 && zonasProtecao.z4_habilitada && pathZ4A && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: pathZ4A,
      fill: "url(#gradZ4)",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: pathZ4A,
      fill: "none",
      stroke: "#a855f7",
      strokeWidth: 2.5,
      strokeDasharray: "6,3",
      opacity: 0.85
    })), coordConfig.showZ2 && pathZ2B && /*#__PURE__*/React.createElement("path", {
      d: pathZ2B,
      fill: "none",
      stroke: "#f97316",
      strokeWidth: 2,
      strokeDasharray: "10,5",
      opacity: 0.7
    }), coordConfig.showZ1 && pathZ1B && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: pathZ1B,
      fill: "url(#gradZ1B)",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: pathZ1B,
      fill: "none",
      stroke: "#ef4444",
      strokeWidth: 2.5,
      opacity: 0.85
    })), /*#__PURE__*/React.createElement("line", {
      x1: origem.px,
      y1: origem.py,
      x2: termBPos.px,
      y2: termBPos.py,
      stroke: "#e6edf3",
      strokeWidth: 6,
      opacity: 0.8,
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("line", {
      x1: origem.px,
      y1: origem.py,
      x2: termBPos.px,
      y2: termBPos.py,
      stroke: "#161b22",
      strokeWidth: 2,
      strokeLinecap: "round"
    }), coordConfig.showLabels && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: `M ${origem.px + 40} ${origem.py} A 40 40 0 0 0 ${origem.px + 40 * Math.cos(angLinha)} ${origem.py - 40 * Math.sin(angLinha)}`,
      fill: "none",
      stroke: "#f97316",
      strokeWidth: 1.5
    }), /*#__PURE__*/React.createElement("text", {
      x: origem.px + 55 * Math.cos(angLinha / 2),
      y: origem.py - 55 * Math.sin(angLinha / 2),
      fill: "#f97316",
      fontSize: "11",
      fontWeight: "bold"
    }, "\u03B8 = ", angLinhaGraus.toFixed(1), "\xB0")), /*#__PURE__*/React.createElement("rect", {
      x: origem.px - 12,
      y: origem.py - 12,
      width: 24,
      height: 24,
      fill: "#3b82f6",
      stroke: "#fff",
      strokeWidth: 2,
      rx: 4
    }), /*#__PURE__*/React.createElement("text", {
      x: origem.px,
      y: origem.py + 5,
      fill: "#fff",
      fontSize: "12",
      fontWeight: "bold",
      textAnchor: "middle"
    }, "A"), coordConfig.showLabels && /*#__PURE__*/React.createElement("text", {
      x: origem.px,
      y: origem.py + 45,
      fill: "#3b82f6",
      fontSize: "12",
      textAnchor: "middle",
      fontWeight: "bold"
    }, terminalA.nome || 'Terminal A'), /*#__PURE__*/React.createElement("rect", {
      x: termBPos.px - 12,
      y: termBPos.py - 12,
      width: 24,
      height: 24,
      fill: "#ef4444",
      stroke: "#fff",
      strokeWidth: 2,
      rx: 4
    }), /*#__PURE__*/React.createElement("text", {
      x: termBPos.px,
      y: termBPos.py + 5,
      fill: "#fff",
      fontSize: "12",
      fontWeight: "bold",
      textAnchor: "middle"
    }, "B"), coordConfig.showLabels && /*#__PURE__*/React.createElement("text", {
      x: termBPos.px,
      y: termBPos.py + 45,
      fill: "#ef4444",
      fontSize: "12",
      textAnchor: "middle",
      fontWeight: "bold"
    }, terminalB.nome || 'Terminal B'), coordConfig.showLabels && /*#__PURE__*/React.createElement(React.Fragment, null, coordConfig.showZ1 && (() => {
      const pos = getLabelPosition(z1Sec, angLinha, 0, 0, false);
      return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: pos.px - 25,
        y: pos.py - 10,
        width: 50,
        height: 18,
        fill: "#161b22",
        stroke: "#4caf50",
        strokeWidth: 1,
        rx: 4,
        opacity: 0.95
      }), /*#__PURE__*/React.createElement("text", {
        x: pos.px,
        y: pos.py + 4,
        fill: "#4caf50",
        fontSize: "11",
        fontWeight: "bold",
        textAnchor: "middle"
      }, "Z1"));
    })(), coordConfig.showZ2 && (() => {
      const pos = getLabelPosition(z2Sec, angLinha, 0, 0, false);
      return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: pos.px - 25,
        y: pos.py - 10,
        width: 50,
        height: 18,
        fill: "#161b22",
        stroke: "#2196f3",
        strokeWidth: 1,
        rx: 4,
        opacity: 0.95
      }), /*#__PURE__*/React.createElement("text", {
        x: pos.px,
        y: pos.py + 4,
        fill: "#2196f3",
        fontSize: "11",
        fontWeight: "bold",
        textAnchor: "middle"
      }, "Z2"));
    })(), coordConfig.showZ3 && (() => {
      const pos = getLabelPosition(z3Sec, angLinha, 0, 0, false);
      return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: pos.px - 25,
        y: pos.py - 10,
        width: 50,
        height: 18,
        fill: "#161b22",
        stroke: "#ff9800",
        strokeWidth: 1,
        rx: 4,
        opacity: 0.95
      }), /*#__PURE__*/React.createElement("text", {
        x: pos.px,
        y: pos.py + 4,
        fill: "#ff9800",
        fontSize: "11",
        fontWeight: "bold",
        textAnchor: "middle"
      }, "Z3"));
    })(), coordConfig.showZ4 && zonasProtecao.z4_habilitada && (() => {
      const pos = getLabelPosition(z4Sec, angLinha, 0, 0, zonasProtecao.z4_reversa);
      const label = `Z4 (${zonasProtecao.z4_reversa ? 'Rev' : 'Fwd'})`;
      return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
        x: pos.px - 35,
        y: pos.py - 10,
        width: 70,
        height: 18,
        fill: "#161b22",
        stroke: "#a855f7",
        strokeWidth: 1,
        rx: 4,
        opacity: 0.95
      }), /*#__PURE__*/React.createElement("text", {
        x: pos.px,
        y: pos.py + 4,
        fill: "#a855f7",
        fontSize: "11",
        fontWeight: "bold",
        textAnchor: "middle"
      }, label));
    })()), faltasCalculadas.map(falta => {
      const pos = toPixel(falta.r, falta.x);
      return /*#__PURE__*/React.createElement("g", {
        key: falta.id
      }, /*#__PURE__*/React.createElement("circle", {
        cx: pos.px,
        cy: pos.py,
        r: 16,
        fill: "none",
        stroke: falta.cor,
        strokeWidth: 2.5
      }), /*#__PURE__*/React.createElement("line", {
        x1: pos.px - 10,
        y1: pos.py - 10,
        x2: pos.px + 10,
        y2: pos.py + 10,
        stroke: falta.cor,
        strokeWidth: 3
      }), /*#__PURE__*/React.createElement("line", {
        x1: pos.px + 10,
        y1: pos.py - 10,
        x2: pos.px - 10,
        y2: pos.py + 10,
        stroke: falta.cor,
        strokeWidth: 3
      }), coordConfig.showLabels && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
        x: pos.px - 45,
        y: pos.py - 38,
        width: 90,
        height: 20,
        fill: "#161b22",
        stroke: falta.cor,
        rx: 4,
        opacity: 0.95
      }), /*#__PURE__*/React.createElement("text", {
        x: pos.px,
        y: pos.py - 23,
        fill: falta.cor,
        fontSize: "11",
        textAnchor: "middle",
        fontWeight: "bold"
      }, falta.nome, " (", falta.local_pct, "% | ", falta.tipo, ")")));
    }), /*#__PURE__*/React.createElement("g", {
      transform: "translate(12, 70)"
    }, /*#__PURE__*/React.createElement("rect", {
      x: 0,
      y: 0,
      width: 190,
      height: 200,
      fill: "#0d1117",
      stroke: "#30363d",
      rx: 10,
      opacity: 0.97
    }), /*#__PURE__*/React.createElement("text", {
      x: 95,
      y: 22,
      fill: "#e6edf3",
      fontSize: "13",
      fontWeight: "bold",
      textAnchor: "middle"
    }, "Legenda"), /*#__PURE__*/React.createElement("text", {
      x: 10,
      y: 45,
      fill: "#8b949e",
      fontSize: "10",
      fontWeight: "bold"
    }, "Terminal A (Local):"), /*#__PURE__*/React.createElement("line", {
      x1: 15,
      y1: 62,
      x2: 40,
      y2: 62,
      stroke: "#4caf50",
      strokeWidth: 3
    }), /*#__PURE__*/React.createElement("text", {
      x: 48,
      y: 66,
      fill: "#4caf50",
      fontSize: "10"
    }, "Z1: ", z1Sec.toFixed(2), " \u03A9 (", zonasProtecao.z1_percent, "%)"), /*#__PURE__*/React.createElement("line", {
      x1: 15,
      y1: 82,
      x2: 40,
      y2: 82,
      stroke: "#2196f3",
      strokeWidth: 2.5,
      strokeDasharray: "6,3"
    }), /*#__PURE__*/React.createElement("text", {
      x: 48,
      y: 86,
      fill: "#2196f3",
      fontSize: "10"
    }, "Z2: ", z2Sec.toFixed(2), " \u03A9 (", zonasProtecao.z2_percent, "%)"), /*#__PURE__*/React.createElement("line", {
      x1: 15,
      y1: 102,
      x2: 40,
      y2: 102,
      stroke: "#ff9800",
      strokeWidth: 2,
      strokeDasharray: "5,3"
    }), /*#__PURE__*/React.createElement("text", {
      x: 48,
      y: 106,
      fill: "#ff9800",
      fontSize: "10"
    }, "Z3: ", z3Sec.toFixed(2), " \u03A9 (", zonasProtecao.z3_percent, "%)"), zonasProtecao.z4_habilitada && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: 15,
      y1: 122,
      x2: 40,
      y2: 122,
      stroke: "#a855f7",
      strokeWidth: 2.5,
      strokeDasharray: "4,2"
    }), /*#__PURE__*/React.createElement("text", {
      x: 48,
      y: 126,
      fill: "#a855f7",
      fontSize: "10"
    }, "Z4: ", z4Sec.toFixed(2), " \u03A9 (", zonasProtecao.z4_percent, "% ", zonasProtecao.z4_reversa ? 'Rev' : 'Fwd', ")")), /*#__PURE__*/React.createElement("text", {
      x: 10,
      y: 150,
      fill: "#8b949e",
      fontSize: "10",
      fontWeight: "bold"
    }, "Terminal B (Remoto):"), /*#__PURE__*/React.createElement("line", {
      x1: 15,
      y1: 167,
      x2: 40,
      y2: 167,
      stroke: "#ef4444",
      strokeWidth: 2.5
    }), /*#__PURE__*/React.createElement("text", {
      x: 48,
      y: 171,
      fill: "#ef4444",
      fontSize: "10"
    }, "Z1: ", z1SecB.toFixed(2), " \u03A9"), /*#__PURE__*/React.createElement("line", {
      x1: 15,
      y1: 187,
      x2: 40,
      y2: 187,
      stroke: "#f97316",
      strokeWidth: 2,
      strokeDasharray: "6,3"
    }), /*#__PURE__*/React.createElement("text", {
      x: 48,
      y: 191,
      fill: "#f97316",
      fontSize: "10"
    }, "Z2: ", z2SecB.toFixed(2), " \u03A9")), coordConfig.showZ4 && zonasProtecao.z4_habilitada && /*#__PURE__*/React.createElement("g", {
      transform: `translate(${svgWidth - 200}, 70)`
    }, /*#__PURE__*/React.createElement("rect", {
      x: 0,
      y: 0,
      width: 185,
      height: 80,
      fill: "#0d1117",
      stroke: "#a855f7",
      rx: 8,
      opacity: 0.95
    }), /*#__PURE__*/React.createElement("text", {
      x: 92,
      y: 20,
      fill: "#a855f7",
      fontSize: "12",
      fontWeight: "bold",
      textAnchor: "middle"
    }, "Zona 4 (", zonasProtecao.z4_reversa ? 'Reversa' : 'Forward', ")"), /*#__PURE__*/React.createElement("text", {
      x: 10,
      y: 40,
      fill: "#8b949e",
      fontSize: "10"
    }, "Dire\xE7\xE3o: ", zonasProtecao.z4_reversa ? 'REVERSE' : 'FORWARD'), /*#__PURE__*/React.createElement("text", {
      x: 10,
      y: 55,
      fill: "#8b949e",
      fontSize: "10"
    }, "Alcance: ", z4Sec.toFixed(2), " \u03A9 (", zonasProtecao.z4_percent, "%)"), /*#__PURE__*/React.createElement("text", {
      x: 10,
      y: 70,
      fill: "#8b949e",
      fontSize: "10"
    }, "Fun\xE7\xE3o: ", zonasProtecao.z4_reversa ? 'Proteção de Barra/BF' : 'POTT/PUTT')), /*#__PURE__*/React.createElement("text", {
      x: svgWidth / 2,
      y: svgHeight - 10,
      fill: "#6e7681",
      fontSize: "10",
      textAnchor: "middle"
    }, "SEP - Sistema de Engenharia de Prote\xE7\xE3o | Gerado em: ", new Date().toLocaleString('pt-BR')));
  })() : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '60px',
      textAlign: 'center',
      color: '#8b949e'
    }
  })))))));
}

// Exportar globalmente para o index.html
window.SEPApp = SEPApp;