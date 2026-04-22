// SEP - Sistema de Engenharia de Proteção
// Versão para GitHub Pages (sem módulos ES6)

// React hooks (disponíveis globalmente via CDN)
const { useState, useCallback, useEffect, useRef, useMemo } = React;

// ═══════════════════════════════════════════════════════════════════════════════
// ÍCONES SVG INLINE (substitui lucide-react)
// ═══════════════════════════════════════════════════════════════════════════════

const Icon = ({ d, size = 24, color = 'currentColor', strokeWidth = 2, fill = 'none', ...props }) => (
  React.createElement('svg', {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: fill,
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    ...props
  }, Array.isArray(d) ? d.map((path, i) => React.createElement('path', { key: i, d: path })) : React.createElement('path', { d }))
);

// Ícones usados no app
const Settings = (props) => Icon({ d: ['M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z', 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'], ...props });
const Zap = (props) => Icon({ d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', ...props });
const Calculator = (props) => Icon({ d: ['M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z', 'M8 6h8', 'M8 10h8', 'M8 14h2', 'M8 18h2', 'M14 14h2', 'M14 18h2'], ...props });
const CheckCircle = (props) => Icon({ d: ['M22 11.08V12a10 10 0 1 1-5.93-9.14', 'M22 4 12 14.01l-3-3'], ...props });
const FileText = (props) => Icon({ d: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8', 'M10 9H8'], ...props });
const AlertTriangle = (props) => Icon({ d: ['M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z', 'M12 9v4', 'M12 17h.01'], ...props });
const ChevronRight = (props) => Icon({ d: 'M9 18l6-6-6-6', ...props });
const ChevronDown = (props) => Icon({ d: 'M6 9l6 6 6-6', ...props });
const Upload = (props) => Icon({ d: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'], ...props });
const Download = (props) => Icon({ d: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'], ...props });
const Activity = (props) => Icon({ d: 'M22 12h-4l-3 9L9 3l-3 9H2', ...props });
const Shield = (props) => Icon({ d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', ...props });
const Users = (props) => Icon({ d: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'], ...props });
const Database = (props) => Icon({ d: ['M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2z', 'M2 6.5c0 2.49 4.48 4.5 10 4.5s10-2.01 10-4.5', 'M2 12c0 2.49 4.48 4.5 10 4.5s10-2.01 10-4.5'], ...props });
const Plus = (props) => Icon({ d: ['M12 5v14', 'M5 12h14'], ...props });
const Trash2 = (props) => Icon({ d: ['M3 6h18', 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M10 11v6', 'M14 11v6'], ...props });
const Save = (props) => Icon({ d: ['M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z', 'M17 21v-8H7v8', 'M7 3v5h8'], ...props });
const X = (props) => Icon({ d: ['M18 6L6 18', 'M6 6l12 12'], ...props });
const Cpu = (props) => Icon({ d: ['M4 4h16v16H4z', 'M9 9h6v6H9z', 'M9 1v3', 'M15 1v3', 'M9 20v3', 'M15 20v3', 'M20 9h3', 'M20 14h3', 'M1 9h3', 'M1 14h3'], ...props });
const Edit2 = (props) => Icon({ d: ['M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z'], ...props });
const Info = (props) => Icon({ d: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 16v-4', 'M12 8h.01'], ...props });
const Check = (props) => Icon({ d: 'M20 6L9 17l-5-5', ...props });
const Copy = (props) => Icon({ d: ['M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z', 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'], ...props });
const Eye = (props) => Icon({ d: ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'], ...props });
const EyeOff = (props) => Icon({ d: ['M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24', 'M1 1l22 22'], ...props });
const RefreshCw = (props) => Icon({ d: ['M23 4v6h-6', 'M1 20v-6h6', 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'], ...props });
const Search = (props) => Icon({ d: ['M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z', 'M21 21l-4.35-4.35'], ...props });
const Building2 = (props) => Icon({ d: ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z', 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2', 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2', 'M10 6h4', 'M10 10h4', 'M10 14h4', 'M10 18h4'], ...props });
const User = (props) => Icon({ d: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'], ...props });
const FileSpreadsheet = (props) => Icon({ d: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M8 13h2', 'M8 17h2', 'M14 13h2', 'M14 17h2'], ...props });
const Image = (props) => Icon({ d: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', 'M21 15l-5-5L5 21'], ...props });
const Printer = (props) => Icon({ d: ['M6 9V2h12v7', 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2', 'M6 14h12v8H6z'], ...props });
const Mail = (props) => Icon({ d: ['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'M22 6l-10 7L2 6'], ...props });
const Phone = (props) => Icon({ d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z', ...props });
const MapPin = (props) => Icon({ d: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', 'M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'], ...props });
const Calendar = (props) => Icon({ d: ['M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z', 'M16 2v4', 'M8 2v4', 'M3 10h18'], ...props });
const Clock = (props) => Icon({ d: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 6v6l4 2'], ...props });
const Hash = (props) => Icon({ d: ['M4 9h16', 'M4 15h16', 'M10 3L8 21', 'M16 3l-2 18'], ...props });
const Percent = (props) => Icon({ d: ['M19 5L5 19', 'M6.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', 'M17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'], ...props });
const ArrowRight = (props) => Icon({ d: ['M5 12h14', 'M12 5l7 7-7 7'], ...props });
const ArrowLeft = (props) => Icon({ d: ['M19 12H5', 'M12 19l-7-7 7-7'], ...props });
const RotateCcw = (props) => Icon({ d: ['M1 4v6h6', 'M3.51 15a9 9 0 1 0 2.13-9.36L1 10'], ...props });
const Maximize2 = (props) => Icon({ d: ['M15 3h6v6', 'M9 21H3v-6', 'M21 3l-7 7', 'M3 21l7-7'], ...props });
const ZoomIn = (props) => Icon({ d: ['M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z', 'M21 21l-4.35-4.35', 'M11 8v6', 'M8 11h6'], ...props });
const ZoomOut = (props) => Icon({ d: ['M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z', 'M21 21l-4.35-4.35', 'M8 11h6'], ...props });
const Move = (props) => Icon({ d: ['M5 9l-3 3 3 3', 'M9 5l3-3 3 3', 'M15 19l-3 3-3-3', 'M19 9l3 3-3 3', 'M2 12h20', 'M12 2v20'], ...props });
const Layers = (props) => Icon({ d: ['M12 2L2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'], ...props });
const Grid = (props) => Icon({ d: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'], ...props });
const Target = (props) => Icon({ d: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z', 'M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'], ...props });
const Circle = (props) => Icon({ d: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', ...props });
const Square = (props) => Icon({ d: 'M3 3h18v18H3z', ...props });
const Edit = (props) => Edit2(props);
const Bookmark = (props) => Icon({ d: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z', ...props });
const Star = (props) => Icon({ d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', ...props });
const TrendingUp = (props) => Icon({ d: ['M23 6l-9.5 9.5-5-5L1 18', 'M17 6h6v6'], ...props });
const TrendingDown = (props) => Icon({ d: ['M23 18l-9.5-9.5-5 5L1 6', 'M17 18h6v-6'], ...props });
const Table = (props) => Icon({ d: ['M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18'], ...props });
const List = (props) => Icon({ d: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'], ...props });
const Menu = (props) => Icon({ d: ['M3 12h18', 'M3 6h18', 'M3 18h18'], ...props });
const Filter = (props) => Icon({ d: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z', ...props });
const Columns = (props) => Icon({ d: ['M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18'], ...props });
const Layout = (props) => Icon({ d: ['M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z', 'M3 9h18', 'M9 21V9'], ...props });
const ExternalLink = (props) => Icon({ d: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14L21 3'], ...props });
const Link = (props) => Icon({ d: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'], ...props });
const File = (props) => Icon({ d: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6'], ...props });
const Folder = (props) => Icon({ d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z', ...props });
const BarChart2 = (props) => Icon({ d: ['M18 20V10', 'M12 20V4', 'M6 20v-6'], ...props });
const BarChart3 = BarChart2;

// ═══════════════════════════════════════════════════════════════════════════════
// MATH ENGINE - Complex Number Operations & Protection Calculations
// ═══════════════════════════════════════════════════════════════════════════════

const toRect = (mod, angDeg) => {
  const rad = (angDeg * Math.PI) / 180;
  return { re: mod * Math.cos(rad), im: mod * Math.sin(rad) };
};

const complexAdd = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
const complexSub = (a, b) => ({ re: a.re - b.re, im: a.im - b.im });
const complexMul = (a, b) => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re
});
const complexDiv = (a, b) => {
  const denom = b.re * b.re + b.im * b.im;
  if (denom === 0) return { re: 0, im: 0 };
  return {
    re: (a.re * b.re + a.im * b.im) / denom,
    im: (a.im * b.re - a.re * b.im) / denom
  };
};
const getModAng = (c) => {
  const mod = Math.sqrt(c.re * c.re + c.im * c.im);
  const ang = (Math.atan2(c.im, c.re) * 180) / Math.PI;
  return { mod, ang };
};
const complexScale = (c, k) => ({ re: c.re * k, im: c.im * k });

const calculateProtectionSettings = (inputs) => {
  const {
    V_nom, Z1_mod, Z1_ang, Z0_mod, Z0_ang,
    norma, terminal_A, terminal_B, I_carga_max,
    Z_adj_mod, Z_adj_ang, linha_comprimento, susceptancia_b1,
    // NOVO: Parâmetros de Zonas de Proteção (Single Source of Truth)
    zonasConfig
  } = inputs;

  // Extrair configuração de zonas (usa defaults se não fornecido)
  const zonas = zonasConfig || {
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

  const calculateTerminal = (term, termName) => {
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
    const { mod: K0_mod, ang: K0_ang } = getModAng(k0_c);

    // 3. IMPEDÂNCIA SECUNDÁRIA TOTAL DA LINHA
    const { mod: Z1_sec_mod, ang: Z1_sec_ang } = getModAng(z1_line_c);
    
    // 4. IMPEDÂNCIA ADJACENTE (para Z3)
    const z_adj_prim = toRect(Z_adj_mod || 0, Z_adj_ang || 0);
    const z_adj_sec = complexScale(z_adj_prim, K_conv);
    const z_total_c = complexAdd(z1_line_c, z_adj_sec);
    const { mod: Z_total_mod } = getModAng(z_total_c);

    // ═══════════════════════════════════════════════════════════════════════════
    // 5. CÁLCULO DE ZONAS USANDO VALORES DO USUÁRIO (SINGLE SOURCE OF TRUTH)
    // ═══════════════════════════════════════════════════════════════════════════
    
    // Z1: Subalcance instantâneo - usa porcentagem configurada pelo usuário
    const z1_reach = (zonas.z1_percent / 100) * Z1_sec_mod;
    
    // Z2: Sobrealcance temporizado - usa porcentagem configurada pelo usuário
    const z2_reach = (zonas.z2_percent / 100) * Z1_sec_mod;
    
    // Z3: Backup remoto forward - SEMPRE HABILITADA (retaguarda remota)
    // Pode ser % da linha+adjacente ou só linha
    let z3_reach = 0;
    const z3_adj_available = Z_total_mod > Z1_sec_mod * 1.01;
    if (z3_adj_available && zonas.z3_percent > 100) {
      // Se há adjacente e % > 100, aplica sobre (linha + adjacente)
      z3_reach = (zonas.z3_percent / 100) * Z_total_mod;
    } else {
      // Se não há adjacente ou % <= 100, aplica sobre a linha
      z3_reach = (zonas.z3_percent / 100) * Z1_sec_mod;
    }
    
    // Z4: OPCIONAL - pode ser reversa (proteção barra/BF) ou forward (adicional)
    // Só é calculada se habilitada
    const z4_reach = zonas.z4_habilitada ? (zonas.z4_percent / 100) * Z1_sec_mod : 0;
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
    const ansi_67_pickup_fwd = norma === 'ONS' 
      ? 1.1 * I_sec_nom  // ONS: 110% da corrente de carga
      : 1.15 * I_sec_nom; // COES/IEEE: 115%
    
    // 67 Reverse (reversa - direção da barra)
    const ansi_67_pickup_rev = 1.1 * I_sec_nom;
    
    // Ângulo de Torque Máximo (MTA) - 67
    // Tipicamente -45° para faltas atrás, +45° para faltas à frente
    const ansi_67_mta = Z1_sec_ang; // Usa o ângulo da linha como referência
    const ansi_67_rca = 75; // Relay Characteristic Angle (típico 75°)
    
    // 8. SOBRECORRENTE DE NEUTRO/TERRA (50N/51N)
    let ansi_51n_pickup = Math.min(
      0.3 * I_sec_nom, // 30% da corrente nominal
      0.2 * ((term.icc_1f_min || 500) / term.rtc) // 20% da menor corrente de falta fase-terra
    );
    let ansi_50n_pickup = 0.5 * ((term.icc_1f_min || 500) / term.rtc); // 50% do Icc 1F mínimo
    
    // 9. SOBRECORRENTE DIRECIONAL DE NEUTRO (67N)
    // 67N Forward
    const ansi_67n_pickup_fwd = norma === 'ONS'
      ? 0.1 * I_sec_nom  // ONS: mais sensível (10%)
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
    const curve_51 = { type: 'IEC VI', TMS: 0.1 };
    const curve_51n = { type: 'IEC EI', TMS: 0.05 };
    const curve_67 = { type: 'IEC VI', TMS: 0.15 };
    const curve_67n = { type: 'IEC EI', TMS: 0.08 };
    
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
    
    const v_fase = (V_nom * 1000) / Math.sqrt(3);
    const b_total = (susceptancia_b1 * 1e-6) * linha_comprimento;
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
    const ansi_87l_pickup_pu = (ansi_87l_pickup / (term.in_tc_primario || 1200)) * 100;
    
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
    } else { // IEEE
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
      z1_line_sec: { mod: Number(Z1_sec_mod.toFixed(4)), ang: Number(Z1_sec_ang.toFixed(2)) },
      z0_line_sec: { mod: Number(getModAng(z0_line_c).mod.toFixed(4)), ang: Number(z0_ang.toFixed(2)) },
      z1_reach: Number(z1_reach.toFixed(4)),
      z2_reach: Number(z2_reach.toFixed(4)),
      z3_reach: Number(z3_reach.toFixed(4)),
      z4_reach: Number(z4_reach.toFixed(4)),
      z4_direction,
      z4_habilitada: zonas.z4_habilitada,
      z4_reversa: zonas.z4_reversa,
      z1_time, z2_time, z3_time, z4_time,
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

  const setA = calculateTerminal(terminal_A, 'Terminal A (Local)');
  const setB = calculateTerminal(terminal_B, 'Terminal B (Remoto)');

  // 7. SLIDING FAULT ANALYSIS (VALIDAÇÃO)
  const slidingPoints = [1, 20, 50, 80, 99];
  const z1_line_prim = toRect(Z1_mod, Z1_ang);
  
  const validation = slidingPoints.map(p => {
    const fraction = p / 100;
    const z_fault_prim = complexScale(z1_line_prim, fraction);
    
    // Terminal A vê a falta
    const K_conv_A = terminal_A.rtc / terminal_A.rtp;
    const z_fault_sec_A = complexScale(z_fault_prim, K_conv_A);
    const { mod: Z_seen_A } = getModAng(z_fault_sec_A);
    
    // Terminal B vê a falta (do outro lado)
    const K_conv_B = terminal_B.rtc / terminal_B.rtp;
    const z_fault_sec_B = complexScale(z_fault_prim, K_conv_B);
    const z_remaining_B = complexScale(z1_line_prim, (1 - fraction));
    const z_seen_from_B = complexScale(z_remaining_B, K_conv_B);
    const { mod: Z_seen_B } = getModAng(z_seen_from_B);

    // Determinar zona de atuação
    const getZone = (z_seen, settings) => {
      if (z_seen <= settings.z1_reach) return { zone: 'Z1', time: settings.z1_time, status: 'OK' };
      if (z_seen <= settings.z2_reach) return { zone: 'Z2', time: settings.z2_time, status: 'OK' };
      if (z_seen <= settings.z3_reach) return { zone: 'Z3', time: settings.z3_time, status: 'BACKUP' };
      return { zone: 'FORA', time: null, status: 'FAIL' };
    };

    const resultA = getZone(Z_seen_A, setA);
    const resultB = getZone(Z_seen_B, setB);

    // Verificar expectativa baseada no alcance configurado (DINÂMICO)
    let expectedZoneA = p <= zonas.z1_percent ? 'Z1' : 'Z2';
    let expectedZoneB = (100 - p) <= zonas.z1_percent ? 'Z1' : 'Z2';

    return {
      percent: p,
      distance_km: Number((fraction * linha_comprimento).toFixed(2)),
      terminal_A: {
        z_seen: Number(Z_seen_A.toFixed(4)),
        ...resultA,
        expected: expectedZoneA,
        match: resultA.zone === expectedZoneA || (resultA.zone === 'Z2' && expectedZoneA === 'Z1')
      },
      terminal_B: {
        z_seen: Number(Z_seen_B.toFixed(4)),
        ...resultB,
        expected: expectedZoneB,
        match: resultB.zone === expectedZoneB || (resultB.zone === 'Z2' && expectedZoneB === 'Z1')
      }
    };
  });

  return { terminal_A: setA, terminal_B: setB, validation };
};

// ═══════════════════════════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

const InputField = ({ label, value, onChange, unit, type = "number", step = "any", min, placeholder }) => (
  <div className="input-group">
    <label>{label}</label>
    <div className="input-wrapper">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(type === "number" ? parseFloat(e.target.value) || 0 : e.target.value)}
        step={step}
        min={min}
        placeholder={placeholder}
      />
      {unit && <span className="unit">{unit}</span>}
    </div>
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div className="input-group">
    <label>{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const TabButton = ({ active, onClick, icon: Icon, label, badge }) => (
  <button className={`tab-btn ${active ? 'active' : ''}`} onClick={onClick}>
    <Icon size={18} />
    <span>{label}</span>
    {badge && <span className="badge">{badge}</span>}
  </button>
);

const ResultCard = ({ title, value, unit, highlight }) => (
  <div className={`result-card ${highlight ? 'highlight' : ''}`}>
    <span className="result-title">{title}</span>
    <span className="result-value">{value}</span>
    <span className="result-unit">{unit}</span>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APPLICATION
// ═══════════════════════════════════════════════════════════════════════════════

function SEPApp() {
  const [activeTab, setActiveTab] = useState(0);
  const [results, setResults] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  
  // Estado para Coordenograma
  const [coordFaltas, setCoordFaltas] = useState([
    { id: 1, nome: 'F1', local_pct: 50, rf_pri: 0, tipo: '3PH', ativo: true },
    { id: 2, nome: 'F2', local_pct: 80, rf_pri: 5, tipo: '1PH', ativo: true }
  ]);
  const [coordConfig, setCoordConfig] = useState({
    showZ1: true, showZ2: true, showZ3: true, showZ4: true,
    showGrid: true, showLabels: true, autoZoom: true
  });
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CADASTROS (Relés, Clientes, Engenheiros)
  // ═══════════════════════════════════════════════════════════════════════════
  
  const [clientes, setClientes] = useState(() => {
    const saved = localStorage.getItem('sep_clientes');
    return saved ? JSON.parse(saved) : [
      { id: 1, nome: 'CEMIG', cnpj: '17.155.730/0001-64', contato: 'eng@cemig.com.br', telefone: '(31) 3506-5000', logo: null },
      { id: 2, nome: 'COPEL', cnpj: '76.483.817/0001-20', contato: 'protecao@copel.com', telefone: '(41) 3310-5000', logo: null }
    ];
  });
  
  const [engenheiros, setEngenheiros] = useState(() => {
    const saved = localStorage.getItem('sep_engenheiros');
    return saved ? JSON.parse(saved) : [
      { id: 1, nome: 'João Silva', crea: 'CREA-MG 123456', especialidade: 'Proteção de LTs', email: 'joao.silva@empresa.com', foto: null, assinatura: null },
      { id: 2, nome: 'Maria Santos', crea: 'CREA-SP 789012', especialidade: 'Automação de SEs', email: 'maria.santos@empresa.com', foto: null, assinatura: null }
    ];
  });
  
  const [reles, setReles] = useState(() => {
    const saved = localStorage.getItem('sep_reles');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        fabricante: 'SEL', 
        modelo: 'SEL-411L', 
        tipo: 'Diferencial de Linha',
        funcoes: '87L, 21, 67N, 50/51',
        comunicacao: 'IEC 61850, DNP3',
        notas: 'Suporta até 4 terminais'
      },
      { 
        id: 2, 
        fabricante: 'Siemens', 
        modelo: '7SD5', 
        tipo: 'Diferencial de Linha',
        funcoes: '87L, 21, 67, 50/51',
        comunicacao: 'IEC 61850',
        notas: 'Linha SIPROTEC 5'
      },
      { 
        id: 3, 
        fabricante: 'ABB', 
        modelo: 'REL670', 
        tipo: 'Proteção de Distância',
        funcoes: '21, 67N, 50/51, 79',
        comunicacao: 'IEC 61850, LON',
        notas: 'Plataforma Relion'
      },
      { 
        id: 4, 
        fabricante: 'GE', 
        modelo: 'L90', 
        tipo: 'Diferencial de Linha',
        funcoes: '87L, 21, 67, 50/51, 79',
        comunicacao: 'IEC 61850, Mirrored Bits',
        notas: 'Multilin série UR'
      },
      { 
        id: 5, 
        fabricante: 'SEL', 
        modelo: 'SEL-421', 
        tipo: 'Proteção de Distância',
        funcoes: '21, 67, 50/51, 79, 81',
        comunicacao: 'IEC 61850, DNP3, Mirrored Bits',
        notas: 'Alta velocidade'
      }
    ];
  });
  
  // Estados para modais de cadastro
  const [modalCadastro, setModalCadastro] = useState({ open: false, tipo: null, editando: null });
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
    setModalCadastro({ open: true, tipo, editando: item });
    if (item) {
      setFormCadastro({ ...item });
    } else {
      // Valores padrão por tipo
      if (tipo === 'cliente') setFormCadastro({ nome: '', cnpj: '', contato: '', telefone: '', logo: null });
      else if (tipo === 'engenheiro') setFormCadastro({ nome: '', crea: '', especialidade: '', email: '', foto: null, assinatura: null });
      else if (tipo === 'rele') setFormCadastro({ fabricante: '', modelo: '', tipo: '', funcoes: '', comunicacao: '', notas: '' });
    }
  };
  
  const fecharModal = () => {
    setModalCadastro({ open: false, tipo: null, editando: null });
    setFormCadastro({});
  };
  
  const salvarCadastro = () => {
    const { tipo, editando } = modalCadastro;
    
    if (tipo === 'cliente') {
      if (editando) {
        setClientes(clientes.map(c => c.id === editando.id ? { ...formCadastro, id: editando.id } : c));
      } else {
        setClientes([...clientes, { ...formCadastro, id: Date.now() }]);
      }
    } else if (tipo === 'engenheiro') {
      if (editando) {
        setEngenheiros(engenheiros.map(e => e.id === editando.id ? { ...formCadastro, id: editando.id } : e));
      } else {
        setEngenheiros([...engenheiros, { ...formCadastro, id: Date.now() }]);
      }
    } else if (tipo === 'rele') {
      if (editando) {
        setReles(reles.map(r => r.id === editando.id ? { ...formCadastro, id: editando.id } : r));
      } else {
        setReles([...reles, { ...formCadastro, id: Date.now() }]);
      }
    }
    
    fecharModal();
  };
  
  const excluirCadastro = (tipo, id) => {
    if (!confirm('Deseja realmente excluir este registro?')) return;
    
    if (tipo === 'cliente') setClientes(clientes.filter(c => c.id !== id));
    else if (tipo === 'engenheiro') setEngenheiros(engenheiros.filter(e => e.id !== id));
    else if (tipo === 'rele') setReles(reles.filter(r => r.id !== id));
  };
  
  // Função para upload de imagem no cadastro
  const handleImageUploadCadastro = (field) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        // Limitar tamanho a 500KB para não sobrecarregar localStorage
        if (file.size > 500000) {
          alert('Imagem muito grande. Por favor, use uma imagem menor que 500KB.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
          setFormCadastro(prev => ({ ...prev, [field]: ev.target?.result }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };
  
  const removerImagemCadastro = (field) => {
    setFormCadastro(prev => ({ ...prev, [field]: null }));
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
  // ═══════════════════════════════════════════════════════════════════════════════
  const [zonasProtecao, setZonasProtecao] = useState({
    z1_percent: 80,      // Zona 1 - Instantânea (Subalcance)
    z2_percent: 120,     // Zona 2 - Sobrealcance
    z3_percent: 150,     // Zona 3 - Backup Remoto Forward (sempre habilitada)
    z4_percent: 20,      // Zona 4 - Opcional (Reversa ou Forward)
    z1_tempo: 0,         // Tempo Z1 (ms) - instantâneo
    z2_tempo: 400,       // Tempo Z2 (ms)
    z3_tempo: 1200,      // Tempo Z3 (ms)
    z4_tempo: 1000,      // Tempo Z4 (ms)
    z4_habilitada: true, // Z4 pode ser desabilitada (opcional)
    z4_reversa: true     // Z4 pode ser reversa (true) ou forward (false)
  });

  // Padrões por norma para zonas de proteção
  const padraoZonasPorNorma = {
    'COES': { z1: 80, z2: 120, z3: 220, z4: 20, z1t: 0, z2t: 400, z3t: 1200, z4t: 1000 },
    'ONS': { z1: 80, z2: 120, z3: 150, z4: 25, z1t: 0, z2t: 350, z3t: 1000, z4t: 800 },
    'IEEE': { z1: 85, z2: 125, z3: 200, z4: 25, z1t: 0, z2t: 400, z3t: 1200, z4t: 1000 },
    'IEC': { z1: 80, z2: 120, z3: 180, z4: 20, z1t: 0, z2t: 400, z3t: 1500, z4t: 1000 }
  };

  const aplicarPadraoZonas = (norma) => {
    const padrao = padraoZonasPorNorma[norma] || padraoZonasPorNorma['COES'];
    setZonasProtecao({
      ...zonasProtecao,
      z1_percent: padrao.z1,
      z2_percent: padrao.z2,
      z3_percent: padrao.z3,
      z4_percent: padrao.z4,
      z1_tempo: padrao.z1t,
      z2_tempo: padrao.z2t,
      z3_tempo: padrao.z3t,
      z4_tempo: padrao.z4t,
      z4_habilitada: true,  // Z4 habilitada por padrão em todas as normas
      z4_reversa: true      // Z4 reversa por padrão (proteção de barra/BF)
    });
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // DADOS DE CURTO-CIRCUITO (FAULT DATA)
  // Valores de corrente para validação de sensibilidade
  // ═══════════════════════════════════════════════════════════════════════════════
  const [faultData, setFaultData] = useState({
    unidade: 'kA', // 'kA' ou 'A'
    // Falta Local (0% da Linha - Bus Local)
    local_3f: 25.0,      // Trifásico (kA)
    local_2f: 21.7,      // Bifásico (kA) - aprox √3/2 * 3f
    local_1f: 20.0,      // Monofásico Franco (kA)
    local_1f_res: 8.5,   // Monofásico Resistivo (kA)
    // Falta Remota (100% da Linha - Bus Remoto)
    remota_3f: 15.0,
    remota_2f: 13.0,
    remota_1f: 12.0,
    remota_1f_res: 4.2,
    // Falta Resistiva Crítica (cenário customizável)
    critica_localizacao: 80,  // % da linha
    critica_rf: 50,           // Resistência de falta (Ohms)
    critica_3i0: 0.350,       // 3I0 calculado (kA)
    // Ajustes de Pickup para validação
    pickup_67n: 0.400,        // Pickup 67N em kA (primário)
    pickup_50n: 2.0,          // Pickup 50N em kA
    pickup_51n: 0.300         // Pickup 51N em kA
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
    if (ratio < 1) return { status: 'FALHA', cor: '#ef4444', msg: 'Falta NÃO detectada! Zona Morta.' };
    if (ratio < 1.3) return { status: 'MARGINAL', cor: '#f59e0b', msg: 'Margem baixa (<30%). Considere teleproteção.' };
    if (ratio < 2.0) return { status: 'OK', cor: '#22c55e', msg: 'Sensibilidade adequada.' };
    return { status: 'EXCELENTE', cor: '#3b82f6', msg: 'Excelente margem de sensibilidade.' };
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
    return { mod, ang };
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
      zonasConfig: zonasProtecao
    };

    return calculateProtectionSettings(inputs);
  }, [linha, projeto, terminalA, terminalB, zonasProtecao]);

  // Auto-recálculo quando zonasProtecao mudar (se já houver resultados)
  useEffect(() => {
    if (results) {
      const novoCalculo = calcularProtecao();
      setResults(novoCalculo);
    }
  }, [zonasProtecao]); // Dispara quando as zonas mudam

  // Valores calculados em tempo real (para exibição prévia)
  const [previewCalc, setPreviewCalc] = useState(null);
  
  useEffect(() => {
    // Calcula preview sempre que os parâmetros mudarem
    try {
      const preview = calcularProtecao();
      setPreviewCalc(preview);
    } catch (e) {
      // Silenciosamente ignora erros de cálculo durante edição
    }
  }, [linha, projeto, terminalA, terminalB, zonasProtecao]);

  const handleCalculate = () => {
    const z1 = calcImpedance(linha.R1, linha.X1);
    const z0 = calcImpedance(linha.R0, linha.X0);
    const z_adj = {
      mod: Math.sqrt(linha.Z_adj_R ** 2 + linha.Z_adj_X ** 2) * 50, // Assumindo 50km adjacente
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
      zonasConfig: zonasProtecao
    };

    const calc = calculateProtectionSettings(inputs);
    setResults(calc);
    setActiveTab(3);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target?.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target?.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const generateReport = () => {
    if (!results) return null;
    
    const labels = {
      'pt-BR': {
        title: 'MEMORIAL DE CÁLCULO - PROTEÇÃO DE DISTÂNCIA',
        client: 'Cliente', engineer: 'Engenheiro', line: 'Linha',
        standard: 'Norma', voltage: 'Tensão Nominal', length: 'Comprimento'
      },
      'es-ES': {
        title: 'MEMORIA DE CÁLCULO - PROTECCIÓN DE DISTANCIA',
        client: 'Cliente', engineer: 'Ingeniero', line: 'Línea',
        standard: 'Norma', voltage: 'Tensión Nominal', length: 'Longitud'
      },
      'en-US': {
        title: 'CALCULATION REPORT - DISTANCE PROTECTION',
        client: 'Client', engineer: 'Engineer', line: 'Line',
        standard: 'Standard', voltage: 'Nominal Voltage', length: 'Length'
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
    const Z1_total = Math.sqrt(linha.R1**2 + linha.X1**2) * projeto.linha_comprimento;
    const Z1_ang = Math.atan2(linha.X1, linha.R1) * 180 / Math.PI;
    const Z0_total = Math.sqrt(linha.R0**2 + linha.X0**2) * projeto.linha_comprimento;
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
        'pt-BR': [
          "21/21N - Proteção de Distância de Fase e Terra (Mho/Quadrilateral)",
          "67N - Sobrecorrente Direcional de Terra (Polarização por 3V0/3I0)",
          "50/51 - Sobrecorrente de Fase (Instantânea e Temporizada)",
          "50N/51N - Sobrecorrente de Terra (Instantânea e Temporizada)",
          "87L - Proteção Diferencial de Linha (com compensação de capacitância)",
          "79 - Religamento Automático (Definição de Tempo Morto)"
        ],
        'es-ES': [
          "21/21N - Protección de Distancia de Fase y Tierra (Mho/Cuadrilateral)",
          "67N - Sobrecorriente Direccional de Tierra (Polarización por 3V0/3I0)",
          "50/51 - Sobrecorriente de Fase (Instantánea y Temporizada)",
          "50N/51N - Sobrecorriente de Tierra (Instantánea y Temporizada)",
          "87L - Protección Diferencial de Línea (con compensación de capacitancia)",
          "79 - Recierre Automático (Definición de Tiempo Muerto)"
        ],
        'en-US': [
          "21/21N - Phase and Ground Distance Protection (Mho/Quadrilateral)",
          "67N - Directional Ground Overcurrent (3V0/3I0 Polarization)",
          "50/51 - Phase Overcurrent (Instantaneous and Time-delayed)",
          "50N/51N - Ground Overcurrent (Instantaneous and Time-delayed)",
          "87L - Line Differential Protection (with capacitance compensation)",
          "79 - Automatic Reclosing (Dead Time Definition)"
        ]
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
        'pt-BR': [
          "Recomenda-se realizar ensaios de injeção secundária (mala de testes) para validar os pontos de curva definidos neste estudo.",
          "Verificar a polaridade dos TCs e TPs durante o comissionamento para garantir a correta operação da direcionalidade (67N) e diferencial (87L).",
          "Confirmar os dados de impedância da linha através de medição em campo (End-to-End) se possível, dada a sensibilidade dos ajustes de Zona 1.",
          "Validar o canal de comunicação da proteção diferencial 87L antes da energização.",
          "Documentar quaisquer desvios dos ajustes propostos e notificar a área de engenharia."
        ],
        'es-ES': [
          "Se recomienda realizar ensayos de inyección secundaria (maleta de pruebas) para validar los puntos de curva definidos en este estudio.",
          "Verificar la polaridad de los TCs y TPs durante el comisionamiento para garantizar la correcta operación de la direccionalidad (67N) y diferencial (87L).",
          "Confirmar los datos de impedancia de la línea mediante medición en campo (End-to-End) si es posible, dada la sensibilidad de los ajustes de Zona 1.",
          "Validar el canal de comunicación de la protección diferencial 87L antes de la energización.",
          "Documentar cualquier desviación de los ajustes propuestos y notificar al área de ingeniería."
        ],
        'en-US': [
          "It is recommended to perform secondary injection tests (test set) to validate the curve points defined in this study.",
          "Verify CT and PT polarity during commissioning to ensure correct directional (67N) and differential (87L) operation.",
          "Confirm line impedance data through field measurement (End-to-End) if possible, given Zone 1 settings sensitivity.",
          "Validate the 87L differential protection communication channel before energization.",
          "Document any deviations from proposed settings and notify the engineering department."
        ]
      },
      
      // Seção 8 - Conclusões
      conclusoes_texto: {
        'pt-BR': `Com base nos cálculos apresentados, conclui-se que os ajustes propostos atendem aos requisitos de sensibilidade, seletividade e rapidez exigidos pela norma ${projeto.norma}. Os alcances de proteção foram definidos em: **Zona 1: ${zonasProtecao.z1_percent}%** (instantânea), **Zona 2: ${zonasProtecao.z2_percent}%** (temporizada ${zonasProtecao.z2_tempo}ms), **Zona 3: ${zonasProtecao.z3_percent}%** (retaguarda ${zonasProtecao.z3_tempo}ms)${zonasProtecao.z4_habilitada ? ` e **Zona 4: ${zonasProtecao.z4_percent}%** (${zonasProtecao.z4_reversa ? 'reversa - backup de barra/BF' : 'forward - supervisão POTT/PUTT'})` : ''}.${!zonasProtecao.z4_habilitada ? ' A Zona 4 não foi habilitada neste estudo.' : ''}${zonasProtecao.z1_percent > 85 ? ' **ATENÇÃO:** O alcance de Zona 1 excede a recomendação típica de 85%, assumindo-se risco controlado de sobrealcance transitório.' : ''}${zonasProtecao.z1_percent < 75 ? ' **NOTA:** O alcance de Zona 1 está abaixo do típico, priorizando segurança sobre cobertura instantânea.' : ''} A verificação de carga (Loadability) confirma que não haverá atuação indevida para o fluxo de potência máximo previsto. O sistema de proteção está apto para operação segura.`,
        'es-ES': `Con base en los cálculos presentados, se concluye que los ajustes propuestos cumplen con los requisitos de sensibilidad, selectividad y rapidez exigidos por la norma ${projeto.norma}. Los alcances de protección fueron definidos en: **Zona 1: ${zonasProtecao.z1_percent}%** (instantánea), **Zona 2: ${zonasProtecao.z2_percent}%** (temporizada ${zonasProtecao.z2_tempo}ms), **Zona 3: ${zonasProtecao.z3_percent}%** (respaldo ${zonasProtecao.z3_tempo}ms)${zonasProtecao.z4_habilitada ? ` y **Zona 4: ${zonasProtecao.z4_percent}%** (${zonasProtecao.z4_reversa ? 'reversa - respaldo de barra/BF' : 'forward - supervisión POTT/PUTT'})` : ''}.${!zonasProtecao.z4_habilitada ? ' La Zona 4 no fue habilitada en este estudio.' : ''}${zonasProtecao.z1_percent > 85 ? ' **ATENCIÓN:** El alcance de Zona 1 excede la recomendación típica de 85%.' : ''} La verificación de carga confirma que no habrá actuación indebida. El sistema de protección está apto para operación segura.`,
        'en-US': `Based on the calculations presented, it is concluded that the proposed settings meet the sensitivity, selectivity, and speed requirements of the ${projeto.norma} standard. Protection reaches were defined as: **Zone 1: ${zonasProtecao.z1_percent}%** (instantaneous), **Zone 2: ${zonasProtecao.z2_percent}%** (timed ${zonasProtecao.z2_tempo}ms), **Zone 3: ${zonasProtecao.z3_percent}%** (backup ${zonasProtecao.z3_tempo}ms)${zonasProtecao.z4_habilitada ? ` and **Zone 4: ${zonasProtecao.z4_percent}%** (${zonasProtecao.z4_reversa ? 'reverse - bus/BF backup' : 'forward - POTT/PUTT supervision'})` : ''}.${!zonasProtecao.z4_habilitada ? ' Zone 4 was not enabled in this study.' : ''}${zonasProtecao.z1_percent > 85 ? ' **WARNING:** Zone 1 reach exceeds typical 85% recommendation.' : ''} Load verification confirms there will be no undue operation. The protection system is ready for safe operation.`
      },
      
      // Seção 10 - Apêndices
      apendices: {
        'pt-BR': [
          "Apêndice A: Memória de Cálculo Detalhada (Planilha)",
          "Apêndice B: Diagramas de Coordenação (Coordenogramas R-X e T-I)",
          "Apêndice C: Dados de Placa dos Equipamentos (TCs, TPs e Disjuntores)",
          uploadedImage ? "Apêndice D: Coordenograma (Imagem Anexada)" : null
        ],
        'es-ES': [
          "Apéndice A: Memoria de Cálculo Detallada (Planilla)",
          "Apéndice B: Diagramas de Coordinación (Coordinogramas R-X y T-I)",
          "Apéndice C: Datos de Placa de los Equipos (TCs, TPs y Disyuntores)",
          uploadedImage ? "Apéndice D: Coordinograma (Imagen Anexada)" : null
        ],
        'en-US': [
          "Appendix A: Detailed Calculation Memory (Spreadsheet)",
          "Appendix B: Coordination Diagrams (R-X and T-I Coordination Plots)",
          "Appendix C: Equipment Nameplate Data (CTs, PTs, and Breakers)",
          uploadedImage ? "Appendix D: Coordination Plot (Attached Image)" : null
        ]
      }
    };

    // Função helper para obter tradução
    const tr = (key) => t[key]?.[idioma] || t[key]?.['pt-BR'] || '';

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
        normas_aplicadas: [
          projeto.norma === 'ONS' ? "ONS - Procedimentos de Rede: Submódulo 2.6 (Requisitos Mínimos) e 2.7." : null,
          projeto.norma === 'COES' ? "COES SINAC - Procedimiento Técnico PR-20 (Ajuste y Coordinación)." : null,
          projeto.norma === 'IEEE' ? "IEEE Std C37.113-2015 - Guide for Protective Relay Applications to Transmission Lines." : null,
          "IEEE Std C37.114 - Guide for Determining Fault Location on AC Transmission and Distribution Lines.",
          `${idioma === 'es-ES' ? 'Manual Técnico del Fabricante del Relé' : idioma === 'en-US' ? 'Relay Manufacturer Technical Manual' : 'Manual Técnico do Fabricante do Relé'}: ${releA ? `${releA.fabricante} ${releA.modelo}` : 'N/A'}`
        ].filter(Boolean)
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
        lista: [
          projeto.norma === 'ONS' ? "ONS. Procedimentos de Rede. Submódulos 2.6 e 2.7." : null,
          projeto.norma === 'COES' ? "COES SINAC. Procedimiento Técnico PR-20 - Ajuste y Coordinación de Protecciones." : null,
          "IEEE Power System Relaying Committee. 'C37.113 Guide for Protective Relay Applications to Transmission Lines'.",
          "Blackburn, J. L. 'Protective Relaying: Principles and Applications'.",
          "Horowitz, S. H.; Phadke, A. G. 'Power System Relaying'. Wiley.",
          releA ? `${releA.fabricante}. ${idioma === 'es-ES' ? 'Manual Técnico' : idioma === 'en-US' ? 'Technical Manual' : 'Manual Técnico'} ${releA.modelo}.` : null,
          idioma === 'es-ES' ? "Documentación técnica y Diagramas Unifilares proporcionados por el cliente." : idioma === 'en-US' ? "Technical documentation and Single-line Diagrams provided by the client." : "Documentação técnica e Diagramas Unifilares fornecidos pelo cliente."
        ].filter(Boolean)
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
    const blob = new Blob([dataStr], { type: 'application/json' });
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
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
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
    const cleanBold = (text) => text ? text.replace(/\*\*/g, '') : '';
    
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
            <td style="font-weight: bold;">${(Math.sqrt(linha.R1**2 + linha.X1**2) * projeto.linha_comprimento * (terminalA.rtc / terminalA.rtp)).toFixed(4)} Ω (sec)</td>
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
        ${report.secao_9_bibliografia.lista.map((b, i) => `<li>[${i+1}] ${b}</li>`).join('')}
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
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Memorial_${report.documento.titulo.replace('MEMORIAL DE CÁLCULO DE PROTEÇÃO - ', '').replace(/\s+/g, '_')}_${report.documento.versao.replace(/\s+/g, '')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { icon: Database, label: 'Cadastros' },
    { icon: Settings, label: 'Projeto & Linha' },
    { icon: Zap, label: 'Terminais' },
    { icon: Calculator, label: 'Cálculos' },
    { icon: CheckCircle, label: 'Validação' },
    { icon: FileText, label: 'Relatório' },
    { icon: Activity, label: 'Coordenograma' }
  ];

  return (
    <div className="sep-app">
      <style>{`
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
      `}</style>

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <div className="logo-icon">
            <Zap size={28} color="#fff" />
          </div>
          <div className="logo-text">
            <h1>SEP.calc</h1>
            <p>Sistema de Proteção Elétrica</p>
          </div>
        </div>
        <div className="header-info">
          <div className="info-item">
            <label>Norma</label>
            <span>{projeto.norma}</span>
          </div>
          <div className="info-item">
            <label>Revisão</label>
            <span>Rev. {projeto.revisao}</span>
          </div>
          <div className="info-item">
            <label>Data</label>
            <span>{projeto.data}</span>
          </div>
        </div>
      </header>

      {/* TAB NAVIGATION */}
      <nav className="tab-nav">
        {tabs.map((tab, idx) => (
          <TabButton
            key={idx}
            active={activeTab === idx}
            onClick={() => setActiveTab(idx)}
            icon={tab.icon}
            label={tab.label}
            badge={idx === 4 && results ? '✓' : null}
          />
        ))}
      </nav>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* MODAL DE CADASTRO */}
        {modalCadastro.open && (
          <div className="modal-overlay" onClick={fecharModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>
                  {modalCadastro.tipo === 'cliente' && <><Users size={20} color="#3fb950" /> {modalCadastro.editando ? 'Editar' : 'Novo'} Cliente</>}
                  {modalCadastro.tipo === 'engenheiro' && <><Users size={20} color="#f97316" /> {modalCadastro.editando ? 'Editar' : 'Novo'} Engenheiro</>}
                  {modalCadastro.tipo === 'rele' && <><Cpu size={20} color="#a371f7" /> {modalCadastro.editando ? 'Editar' : 'Novo'} Relé</>}
                </h3>
                <button className="modal-close" onClick={fecharModal}><X size={20} /></button>
              </div>
              
              <div className="modal-body">
                {modalCadastro.tipo === 'cliente' && (
                  <div className="input-grid">
                    <InputField
                      label="Nome / Razão Social"
                      value={formCadastro.nome || ''}
                      onChange={(v) => setFormCadastro({...formCadastro, nome: v})}
                      type="text"
                      placeholder="Nome da empresa"
                    />
                    <InputField
                      label="CNPJ"
                      value={formCadastro.cnpj || ''}
                      onChange={(v) => setFormCadastro({...formCadastro, cnpj: v})}
                      type="text"
                      placeholder="00.000.000/0001-00"
                    />
                    <InputField
                      label="E-mail de Contato"
                      value={formCadastro.contato || ''}
                      onChange={(v) => setFormCadastro({...formCadastro, contato: v})}
                      type="text"
                      placeholder="email@empresa.com"
                    />
                    <InputField
                      label="Telefone"
                      value={formCadastro.telefone || ''}
                      onChange={(v) => setFormCadastro({...formCadastro, telefone: v})}
                      type="text"
                      placeholder="(00) 0000-0000"
                    />
                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                      <label>Logo da Empresa</label>
                      <div className="image-upload-container">
                        <div 
                          className={`image-upload-box ${formCadastro.logo ? 'has-image' : ''}`}
                          onClick={() => !formCadastro.logo && handleImageUploadCadastro('logo')}
                        >
                          {formCadastro.logo ? (
                            <img src={formCadastro.logo} alt="Logo" />
                          ) : (
                            <div className="placeholder">
                              <Upload size={24} />
                              <span>Clique para adicionar logo (máx. 500KB)</span>
                            </div>
                          )}
                        </div>
                        <div className="image-upload-actions">
                          <button type="button" className="btn-upload" onClick={() => handleImageUploadCadastro('logo')}>
                            <Upload size={12} /> {formCadastro.logo ? 'Trocar' : 'Upload'}
                          </button>
                          {formCadastro.logo && (
                            <button type="button" className="btn-remove" onClick={() => removerImagemCadastro('logo')}>
                              <Trash2 size={12} /> Remover
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {modalCadastro.tipo === 'engenheiro' && (
                  <div className="input-grid">
                    <InputField
                      label="Nome Completo"
                      value={formCadastro.nome || ''}
                      onChange={(v) => setFormCadastro({...formCadastro, nome: v})}
                      type="text"
                      placeholder="Nome do engenheiro"
                    />
                    <InputField
                      label="CREA"
                      value={formCadastro.crea || ''}
                      onChange={(v) => setFormCadastro({...formCadastro, crea: v})}
                      type="text"
                      placeholder="CREA-UF 000000"
                    />
                    <InputField
                      label="Especialidade"
                      value={formCadastro.especialidade || ''}
                      onChange={(v) => setFormCadastro({...formCadastro, especialidade: v})}
                      type="text"
                      placeholder="Ex: Proteção de LTs"
                    />
                    <InputField
                      label="E-mail"
                      value={formCadastro.email || ''}
                      onChange={(v) => setFormCadastro({...formCadastro, email: v})}
                      type="text"
                      placeholder="email@empresa.com"
                    />
                    <div className="input-group">
                      <label>Foto do Engenheiro</label>
                      <div className="image-upload-container">
                        <div 
                          className={`image-upload-box ${formCadastro.foto ? 'has-image' : ''}`}
                          onClick={() => !formCadastro.foto && handleImageUploadCadastro('foto')}
                          style={{ height: '100px' }}
                        >
                          {formCadastro.foto ? (
                            <img src={formCadastro.foto} alt="Foto" />
                          ) : (
                            <div className="placeholder">
                              <Users size={20} />
                              <span>Foto (máx. 500KB)</span>
                            </div>
                          )}
                        </div>
                        <div className="image-upload-actions">
                          <button type="button" className="btn-upload" onClick={() => handleImageUploadCadastro('foto')}>
                            <Upload size={12} /> {formCadastro.foto ? 'Trocar' : 'Upload'}
                          </button>
                          {formCadastro.foto && (
                            <button type="button" className="btn-remove" onClick={() => removerImagemCadastro('foto')}>
                              <Trash2 size={12} /> Remover
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Assinatura Digital</label>
                      <div className="image-upload-container">
                        <div 
                          className={`image-upload-box ${formCadastro.assinatura ? 'has-image' : ''}`}
                          onClick={() => !formCadastro.assinatura && handleImageUploadCadastro('assinatura')}
                          style={{ height: '100px', background: formCadastro.assinatura ? '#fff' : undefined }}
                        >
                          {formCadastro.assinatura ? (
                            <img src={formCadastro.assinatura} alt="Assinatura" />
                          ) : (
                            <div className="placeholder">
                              <Edit2 size={20} />
                              <span>Assinatura (máx. 500KB)</span>
                            </div>
                          )}
                        </div>
                        <div className="image-upload-actions">
                          <button type="button" className="btn-upload" onClick={() => handleImageUploadCadastro('assinatura')}>
                            <Upload size={12} /> {formCadastro.assinatura ? 'Trocar' : 'Upload'}
                          </button>
                          {formCadastro.assinatura && (
                            <button type="button" className="btn-remove" onClick={() => removerImagemCadastro('assinatura')}>
                              <Trash2 size={12} /> Remover
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {modalCadastro.tipo === 'rele' && (
                  <div className="input-grid">
                    <InputField
                      label="Fabricante"
                      value={formCadastro.fabricante || ''}
                      onChange={(v) => setFormCadastro({...formCadastro, fabricante: v})}
                      type="text"
                      placeholder="Ex: SEL, Siemens, ABB"
                    />
                    <InputField
                      label="Modelo"
                      value={formCadastro.modelo || ''}
                      onChange={(v) => setFormCadastro({...formCadastro, modelo: v})}
                      type="text"
                      placeholder="Ex: SEL-411L"
                    />
                    <InputField
                      label="Tipo"
                      value={formCadastro.tipo || ''}
                      onChange={(v) => setFormCadastro({...formCadastro, tipo: v})}
                      type="text"
                      placeholder="Ex: Diferencial de Linha"
                    />
                    <InputField
                      label="Funções ANSI"
                      value={formCadastro.funcoes || ''}
                      onChange={(v) => setFormCadastro({...formCadastro, funcoes: v})}
                      type="text"
                      placeholder="Ex: 87L, 21, 67N, 50/51"
                    />
                    <InputField
                      label="Comunicação"
                      value={formCadastro.comunicacao || ''}
                      onChange={(v) => setFormCadastro({...formCadastro, comunicacao: v})}
                      type="text"
                      placeholder="Ex: IEC 61850, DNP3"
                    />
                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                      <label>Notas / Observações</label>
                      <textarea
                        value={formCadastro.notas || ''}
                        onChange={(e) => setFormCadastro({...formCadastro, notas: e.target.value})}
                        placeholder="Observações adicionais sobre o relé..."
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={fecharModal}>
                  <X size={16} /> Cancelar
                </button>
                <button className="btn btn-primary" onClick={salvarCadastro}>
                  <Save size={16} /> Salvar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 0: CADASTROS */}
        {activeTab === 0 && (
          <>
            {/* CLIENTES */}
            <div className="cadastro-section">
              <div className="cadastro-header">
                <div className="cadastro-title">
                  <Users size={20} color="#3fb950" />
                  Clientes
                  <span className="count">{clientes.length}</span>
                </div>
                <button className="btn btn-secondary" onClick={() => abrirModalCadastro('cliente')}>
                  <Plus size={16} /> Novo Cliente
                </button>
              </div>
              
              <div className="cadastro-grid">
                {clientes.map(cliente => (
                  <div key={cliente.id} className="cadastro-card cliente">
                    <div className="cadastro-card-header">
                      <div className="cadastro-card-header-with-logo">
                        <div className="cadastro-card-logo">
                          {cliente.logo ? (
                            <img src={cliente.logo} alt={cliente.nome} />
                          ) : (
                            <span className="initials">{cliente.nome.substring(0, 2).toUpperCase()}</span>
                          )}
                        </div>
                        <div>
                          <div className="cadastro-card-title">{cliente.nome}</div>
                          <div className="cadastro-card-subtitle">{cliente.cnpj}</div>
                        </div>
                      </div>
                      <div className="cadastro-card-actions">
                        <button onClick={() => abrirModalCadastro('cliente', cliente)}><Edit2 size={14} /></button>
                        <button className="delete" onClick={() => excluirCadastro('cliente', cliente.id)}><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <div className="cadastro-card-body">
                      <div className="field">
                        <span className="field-label">Contato:</span>
                        <span className="field-value">{cliente.contato}</span>
                      </div>
                      <div className="field">
                        <span className="field-label">Telefone:</span>
                        <span className="field-value">{cliente.telefone}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="cadastro-card add-card" onClick={() => abrirModalCadastro('cliente')}>
                  <div className="icon"><Plus size={20} /></div>
                  <span>Adicionar Cliente</span>
                </div>
              </div>
            </div>
            
            {/* ENGENHEIROS */}
            <div className="cadastro-section">
              <div className="cadastro-header">
                <div className="cadastro-title">
                  <Users size={20} color="#f97316" />
                  Engenheiros
                  <span className="count">{engenheiros.length}</span>
                </div>
                <button className="btn btn-secondary" onClick={() => abrirModalCadastro('engenheiro')}>
                  <Plus size={16} /> Novo Engenheiro
                </button>
              </div>
              
              <div className="cadastro-grid">
                {engenheiros.map(eng => (
                  <div key={eng.id} className="cadastro-card engenheiro">
                    <div className="cadastro-card-header">
                      <div className="cadastro-card-header-with-logo">
                        <div className="cadastro-card-logo" style={{ borderRadius: '50%' }}>
                          {eng.foto ? (
                            <img src={eng.foto} alt={eng.nome} style={{ borderRadius: '50%' }} />
                          ) : (
                            <span className="initials">{eng.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}</span>
                          )}
                        </div>
                        <div>
                          <div className="cadastro-card-title">{eng.nome}</div>
                          <div className="cadastro-card-subtitle">{eng.crea}</div>
                        </div>
                      </div>
                      <div className="cadastro-card-actions">
                        <button onClick={() => abrirModalCadastro('engenheiro', eng)}><Edit2 size={14} /></button>
                        <button className="delete" onClick={() => excluirCadastro('engenheiro', eng.id)}><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <div className="cadastro-card-body">
                      <div className="field">
                        <span className="field-label">Especialidade:</span>
                        <span className="field-value">{eng.especialidade}</span>
                      </div>
                      <div className="field">
                        <span className="field-label">E-mail:</span>
                        <span className="field-value">{eng.email}</span>
                      </div>
                      {eng.assinatura && (
                        <div className="field" style={{ marginTop: '8px' }}>
                          <span className="field-label">Assinatura:</span>
                          <span className="field-value" style={{ color: '#3fb950' }}>✓ Cadastrada</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="cadastro-card add-card" onClick={() => abrirModalCadastro('engenheiro')}>
                  <div className="icon"><Plus size={20} /></div>
                  <span>Adicionar Engenheiro</span>
                </div>
              </div>
            </div>
            
            {/* RELÉS */}
            <div className="cadastro-section">
              <div className="cadastro-header">
                <div className="cadastro-title">
                  <Cpu size={20} color="#a371f7" />
                  Relés de Proteção
                  <span className="count">{reles.length}</span>
                </div>
                <button className="btn btn-secondary" onClick={() => abrirModalCadastro('rele')}>
                  <Plus size={16} /> Novo Relé
                </button>
              </div>
              
              <div className="cadastro-grid">
                {reles.map(rele => (
                  <div key={rele.id} className="cadastro-card rele">
                    <div className="cadastro-card-header">
                      <div>
                        <div className="cadastro-card-title">{rele.fabricante} {rele.modelo}</div>
                        <div className="cadastro-card-subtitle">{rele.tipo}</div>
                      </div>
                      <div className="cadastro-card-actions">
                        <button onClick={() => abrirModalCadastro('rele', rele)}><Edit2 size={14} /></button>
                        <button className="delete" onClick={() => excluirCadastro('rele', rele.id)}><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <div className="cadastro-card-body">
                      <div className="field">
                        <span className="field-label">Funções:</span>
                        <span className="field-value">{rele.funcoes}</span>
                      </div>
                      <div className="field">
                        <span className="field-label">Comunicação:</span>
                        <span className="field-value">{rele.comunicacao}</span>
                      </div>
                      {rele.notas && (
                        <div className="field">
                          <span className="field-label">Notas:</span>
                          <span className="field-value">{rele.notas}</span>
                        </div>
                      )}
                    </div>
                    <div className="cadastro-card-tags">
                      {rele.funcoes.split(',').map((f, i) => (
                        <span key={i} className="cadastro-tag">{f.trim()}</span>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="cadastro-card add-card" onClick={() => abrirModalCadastro('rele')}>
                  <div className="icon"><Plus size={20} /></div>
                  <span>Adicionar Relé</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 1: PROJETO & LINHA */}
        {activeTab === 1 && (
          <>
            <div className="panel">
              <div className="panel-header">
                <div className="icon"><Settings size={20} /></div>
                <h2>Dados do Projeto</h2>
              </div>
              <div className="input-grid input-grid-4">
                <div className="input-group">
                  <label>Cliente</label>
                  <select 
                    value={projeto.cliente_id || ''} 
                    onChange={(e) => {
                      const id = e.target.value ? Number(e.target.value) : null;
                      const cliente = clientes.find(c => c.id === id);
                      setProjeto({
                        ...projeto, 
                        cliente_id: id,
                        cliente: cliente?.nome || ''
                      });
                    }}
                  >
                    <option value="">Selecione um cliente...</option>
                    {clientes.map(c => (
                      <option key={c.id} value={c.id}>{c.nome}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Engenheiro Responsável</label>
                  <select 
                    value={projeto.engenheiro_id || ''} 
                    onChange={(e) => {
                      const id = e.target.value ? Number(e.target.value) : null;
                      const eng = engenheiros.find(en => en.id === id);
                      setProjeto({
                        ...projeto, 
                        engenheiro_id: id,
                        engenheiro: eng?.nome || ''
                      });
                    }}
                  >
                    <option value="">Selecione um engenheiro...</option>
                    {engenheiros.map(e => (
                      <option key={e.id} value={e.id}>{e.nome} ({e.crea})</option>
                    ))}
                  </select>
                </div>
                <InputField
                  label="Data"
                  value={projeto.data}
                  onChange={(v) => setProjeto({...projeto, data: v})}
                  type="date"
                />
                <InputField
                  label="Revisão"
                  value={projeto.revisao}
                  onChange={(v) => setProjeto({...projeto, revisao: v})}
                  type="text"
                  placeholder="00"
                />
              </div>
              
              <div className="section-title">Configuração de Norma</div>
              
              <div className="norma-indicator">
                {['ONS', 'COES', 'IEEE'].map(n => (
                  <div
                    key={n}
                    className={`norma-chip ${projeto.norma === n ? 'active' : ''}`}
                    onClick={() => setProjeto({...projeto, norma: n})}
                  >
                    {n} {n === 'ONS' ? '(Brasil)' : n === 'COES' ? '(Peru)' : '(USA)'}
                  </div>
                ))}
              </div>
              
              <div className="input-grid input-grid-3">
                <SelectField
                  label="Idioma do Relatório"
                  value={projeto.idioma}
                  onChange={(v) => setProjeto({...projeto, idioma: v})}
                  options={[
                    { value: 'pt-BR', label: 'Português (Brasil)' },
                    { value: 'es-ES', label: 'Español (Perú)' },
                    { value: 'en-US', label: 'English (USA)' }
                  ]}
                />
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <div className="icon"><Activity size={20} /></div>
                <h2>Parâmetros da Linha de Transmissão</h2>
              </div>
              
              <div className="input-grid input-grid-4">
                <InputField
                  label="Nome da Linha"
                  value={projeto.linha_nome}
                  onChange={(v) => setProjeto({...projeto, linha_nome: v})}
                  type="text"
                  placeholder="LT 230kV SE A - SE B"
                />
                <InputField
                  label="Comprimento"
                  value={projeto.linha_comprimento}
                  onChange={(v) => setProjeto({...projeto, linha_comprimento: v})}
                  unit="km"
                />
                <InputField
                  label="Tensão Nominal"
                  value={projeto.V_nom}
                  onChange={(v) => setProjeto({...projeto, V_nom: v})}
                  unit="kV"
                />
              </div>
              
              <div className="section-title">Impedância de Sequência Positiva (Z₁)</div>
              
              <div className="input-grid input-grid-4">
                <InputField
                  label="R₁ (Resistência)"
                  value={linha.R1}
                  onChange={(v) => setLinha({...linha, R1: v})}
                  unit="Ω/km"
                  step="0.001"
                />
                <InputField
                  label="X₁ (Reatância)"
                  value={linha.X1}
                  onChange={(v) => setLinha({...linha, X1: v})}
                  unit="Ω/km"
                  step="0.001"
                />
                <div className="result-card">
                  <span className="result-title">|Z₁| Total</span>
                  <span className="result-value">{(Math.sqrt(linha.R1**2 + linha.X1**2) * projeto.linha_comprimento).toFixed(2)}</span>
                  <span className="result-unit">Ω</span>
                </div>
                <div className="result-card">
                  <span className="result-title">∠Z₁</span>
                  <span className="result-value">{(Math.atan2(linha.X1, linha.R1) * 180 / Math.PI).toFixed(1)}°</span>
                  <span className="result-unit">graus</span>
                </div>
              </div>
              
              <div className="section-title">Impedância de Sequência Zero (Z₀)</div>
              
              <div className="input-grid input-grid-4">
                <InputField
                  label="R₀ (Resistência)"
                  value={linha.R0}
                  onChange={(v) => setLinha({...linha, R0: v})}
                  unit="Ω/km"
                  step="0.001"
                />
                <InputField
                  label="X₀ (Reatância)"
                  value={linha.X0}
                  onChange={(v) => setLinha({...linha, X0: v})}
                  unit="Ω/km"
                  step="0.001"
                />
                <div className="result-card">
                  <span className="result-title">|Z₀| Total</span>
                  <span className="result-value">{(Math.sqrt(linha.R0**2 + linha.X0**2) * projeto.linha_comprimento).toFixed(2)}</span>
                  <span className="result-unit">Ω</span>
                </div>
                <div className="result-card">
                  <span className="result-title">∠Z₀</span>
                  <span className="result-value">{(Math.atan2(linha.X0, linha.R0) * 180 / Math.PI).toFixed(1)}°</span>
                  <span className="result-unit">graus</span>
                </div>
              </div>
              
              <div className="section-title">Susceptância (para Função 87L)</div>
              
              <div className="input-grid input-grid-4">
                <InputField
                  label="B₁ (Susceptância)"
                  value={linha.susceptancia_b1}
                  onChange={(v) => setLinha({...linha, susceptancia_b1: v})}
                  unit="μS/km"
                  step="0.1"
                />
                <div className="result-card">
                  <span className="result-title">B Total</span>
                  <span className="result-value">{(linha.susceptancia_b1 * projeto.linha_comprimento).toFixed(2)}</span>
                  <span className="result-unit">μS</span>
                </div>
                <div className="result-card">
                  <span className="result-title">I Charging (est.)</span>
                  <span className="result-value">{((projeto.V_nom * 1000 / Math.sqrt(3)) * (linha.susceptancia_b1 * 1e-6 * projeto.linha_comprimento)).toFixed(2)}</span>
                  <span className="result-unit">A</span>
                </div>
              </div>
              
              <div className="section-title">Impedância da Linha Adjacente (para Z₃)</div>
              
              <div className="input-grid input-grid-4">
                <InputField
                  label="R Adjacente"
                  value={linha.Z_adj_R}
                  onChange={(v) => setLinha({...linha, Z_adj_R: v})}
                  unit="Ω/km"
                  step="0.001"
                />
                <InputField
                  label="X Adjacente"
                  value={linha.Z_adj_X}
                  onChange={(v) => setLinha({...linha, Z_adj_X: v})}
                  unit="Ω/km"
                  step="0.001"
                />
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════════════════════ */}
            {/* SEÇÃO: ZONAS DE PROTEÇÃO DE DISTÂNCIA (FUNÇÃO 21) */}
            {/* ═══════════════════════════════════════════════════════════════════════════════ */}
            <div className="panel">
              <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="icon"><Shield size={20} /></div>
                  <h2>Zonas de Proteção de Distância (Função 21)</h2>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['COES', 'ONS', 'IEEE', 'IEC'].map(norma => (
                    <button
                      key={norma}
                      className={`btn ${projeto.norma === norma ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ padding: '6px 12px', fontSize: '11px' }}
                      onClick={() => aplicarPadraoZonas(norma)}
                      title={`Aplicar padrão ${norma}`}
                    >
                      {norma}
                    </button>
                  ))}
                </div>
              </div>
              
              <div style={{ padding: '16px 20px', background: 'rgba(88,166,255,0.08)', borderBottom: '1px solid #30363d', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AlertTriangle size={18} color="#58a6ff" />
                <p style={{ fontSize: '13px', color: '#8b949e', margin: 0 }}>
                  Configure os alcances das zonas de proteção. Os valores de referência são baseados nas normas <strong style={{ color: '#58a6ff' }}>COES (Peru)</strong>, <strong style={{ color: '#f97316' }}>ONS (Brasil)</strong> e <strong style={{ color: '#22c55e' }}>IEEE (USA)</strong>.
                </p>
              </div>

              <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                
                {/* ZONA 1 - INSTANTÂNEA */}
                <div style={{ 
                  background: 'rgba(34,197,94,0.08)', 
                  border: '1px solid rgba(34,197,94,0.3)', 
                  borderRadius: '12px', 
                  padding: '20px',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{ 
                      width: '36px', height: '36px', 
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)', 
                      borderRadius: '8px', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: '700', fontSize: '14px'
                    }}>Z1</div>
                    <div>
                      <h4 style={{ color: '#22c55e', margin: 0, fontSize: '15px' }}>Zona 1 - Instantânea</h4>
                      <span style={{ fontSize: '11px', color: '#8b949e' }}>Subalcance • Disparo sem atraso intencional</span>
                    </div>
                    <div 
                      style={{ marginLeft: 'auto', cursor: 'help' }}
                      title="Zona 1: Proteção instantânea que cobre tipicamente 80-85% da linha protegida. Não deve alcançar além do barramento remoto para evitar disparos indevidos por erros de medição."
                    >
                      <AlertTriangle size={16} color="#8b949e" />
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="input-group">
                      <label style={{ fontSize: '12px', color: '#8b949e', marginBottom: '6px', display: 'block' }}>
                        Alcance (% da Linha)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="number"
                          value={zonasProtecao.z1_percent}
                          onChange={(e) => setZonasProtecao({...zonasProtecao, z1_percent: parseFloat(e.target.value) || 0})}
                          style={{ 
                            width: '100%', padding: '10px 40px 10px 14px', 
                            background: '#161b22', border: `1px solid ${zonasProtecao.z1_percent > 85 ? '#f59e0b' : '#30363d'}`, 
                            borderRadius: '8px', color: '#e6edf3', fontSize: '16px', fontWeight: '600'
                          }}
                        />
                        <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }}>%</span>
                      </div>
                      {zonasProtecao.z1_percent > 85 && (
                        <div style={{ 
                          marginTop: '8px', padding: '8px 10px', 
                          background: 'rgba(245,158,11,0.15)', 
                          border: '1px solid rgba(245,158,11,0.4)', 
                          borderRadius: '6px',
                          display: 'flex', alignItems: 'center', gap: '6px'
                        }}>
                          <AlertTriangle size={14} color="#f59e0b" />
                          <span style={{ fontSize: '11px', color: '#f59e0b' }}>Atenção: Risco de sobrealcance transiente!</span>
                        </div>
                      )}
                    </div>
                    <div className="input-group">
                      <label style={{ fontSize: '12px', color: '#8b949e', marginBottom: '6px', display: 'block' }}>Tempo (ms)</label>
                      <input
                        type="number"
                        value={zonasProtecao.z1_tempo}
                        onChange={(e) => setZonasProtecao({...zonasProtecao, z1_tempo: parseFloat(e.target.value) || 0})}
                        style={{ 
                          width: '100%', padding: '10px 14px', 
                          background: '#161b22', border: '1px solid #30363d', 
                          borderRadius: '8px', color: '#e6edf3', fontSize: '16px', fontWeight: '600'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ 
                    marginTop: '12px', padding: '10px 12px', 
                    background: 'rgba(34,197,94,0.1)', 
                    borderRadius: '6px',
                    fontSize: '11px', color: '#6ee7b7'
                  }}>
                    <strong>📋 Recomendação COES/IEEE:</strong> 80% a 85% (Subalcance Seguro)
                    <br/>
                    <span style={{ color: '#8b949e' }}>Valor calculado: <strong style={{ color: '#22c55e' }}>
                      {((Math.sqrt(linha.R1**2 + linha.X1**2) * projeto.linha_comprimento) * zonasProtecao.z1_percent / 100).toFixed(2)} Ω
                    </strong></span>
                  </div>
                </div>

                {/* ZONA 2 - SOBREALCANCE */}
                <div style={{ 
                  background: 'rgba(59,130,246,0.08)', 
                  border: '1px solid rgba(59,130,246,0.3)', 
                  borderRadius: '12px', 
                  padding: '20px',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{ 
                      width: '36px', height: '36px', 
                      background: 'linear-gradient(135deg, #3b82f6, #2563eb)', 
                      borderRadius: '8px', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: '700', fontSize: '14px'
                    }}>Z2</div>
                    <div>
                      <h4 style={{ color: '#3b82f6', margin: 0, fontSize: '15px' }}>Zona 2 - Sobrealcance</h4>
                      <span style={{ fontSize: '11px', color: '#8b949e' }}>Backup da Z1 Remota • Temporizada</span>
                    </div>
                    <div 
                      style={{ marginLeft: 'auto', cursor: 'help' }}
                      title="Zona 2: Proteção temporizada que cobre 100% da linha + margem de segurança. Serve como backup para falhas na Z1 do terminal remoto."
                    >
                      <AlertTriangle size={16} color="#8b949e" />
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="input-group">
                      <label style={{ fontSize: '12px', color: '#8b949e', marginBottom: '6px', display: 'block' }}>
                        Alcance (% da Linha)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="number"
                          value={zonasProtecao.z2_percent}
                          onChange={(e) => setZonasProtecao({...zonasProtecao, z2_percent: parseFloat(e.target.value) || 0})}
                          style={{ 
                            width: '100%', padding: '10px 40px 10px 14px', 
                            background: '#161b22', border: '1px solid #30363d', 
                            borderRadius: '8px', color: '#e6edf3', fontSize: '16px', fontWeight: '600'
                          }}
                        />
                        <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }}>%</span>
                      </div>
                    </div>
                    <div className="input-group">
                      <label style={{ fontSize: '12px', color: '#8b949e', marginBottom: '6px', display: 'block' }}>Tempo (ms)</label>
                      <input
                        type="number"
                        value={zonasProtecao.z2_tempo}
                        onChange={(e) => setZonasProtecao({...zonasProtecao, z2_tempo: parseFloat(e.target.value) || 0})}
                        style={{ 
                          width: '100%', padding: '10px 14px', 
                          background: '#161b22', border: '1px solid #30363d', 
                          borderRadius: '8px', color: '#e6edf3', fontSize: '16px', fontWeight: '600'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ 
                    marginTop: '12px', padding: '10px 12px', 
                    background: 'rgba(59,130,246,0.1)', 
                    borderRadius: '6px',
                    fontSize: '11px', color: '#93c5fd'
                  }}>
                    <strong>📋 Recomendação COES:</strong> 120% da Linha Protegida (Mínimo)
                    <br/>
                    <span style={{ color: '#8b949e' }}>💡 Deve cobrir 100% da linha + 20% de margem ou 50% da linha adjacente mais curta.</span>
                    <br/>
                    <span style={{ color: '#8b949e' }}>Valor calculado: <strong style={{ color: '#3b82f6' }}>
                      {((Math.sqrt(linha.R1**2 + linha.X1**2) * projeto.linha_comprimento) * zonasProtecao.z2_percent / 100).toFixed(2)} Ω
                    </strong></span>
                  </div>
                </div>

                {/* ZONA 3 - BACKUP REMOTO FORWARD (SEMPRE HABILITADA) */}
                <div style={{ 
                  background: 'rgba(249,115,22,0.08)', 
                  border: '1px solid rgba(249,115,22,0.3)', 
                  borderRadius: '12px', 
                  padding: '20px',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{ 
                      width: '36px', height: '36px', 
                      background: 'linear-gradient(135deg, #f97316, #ea580c)', 
                      borderRadius: '8px', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: '700', fontSize: '14px'
                    }}>Z3</div>
                    <div>
                      <h4 style={{ color: '#f97316', margin: 0, fontSize: '15px' }}>
                        Zona 3 - Backup Remoto (Forward)
                      </h4>
                      <span style={{ fontSize: '11px', color: '#8b949e' }}>Retaguarda • Linha + Adjacente</span>
                    </div>
                    <div 
                      style={{ marginLeft: 'auto', cursor: 'help' }}
                      title="Zona 3: Proteção de retaguarda remota - conforme IEEE C37.113 e ONS Submódulo 2.7, esta zona é fundamental para coordenação seletiva do sistema."
                    >
                      <AlertTriangle size={16} color="#8b949e" />
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="input-group">
                      <label style={{ fontSize: '12px', color: '#8b949e', marginBottom: '6px', display: 'block' }}>
                        Alcance (% da Linha + Adj.)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="number"
                          value={zonasProtecao.z3_percent}
                          onChange={(e) => setZonasProtecao({...zonasProtecao, z3_percent: parseFloat(e.target.value) || 0})}
                          style={{ 
                            width: '100%', padding: '10px 40px 10px 14px', 
                            background: '#161b22', border: '1px solid #30363d', 
                            borderRadius: '8px', color: '#e6edf3', 
                            fontSize: '16px', fontWeight: '600'
                          }}
                        />
                        <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }}>%</span>
                      </div>
                    </div>
                    <div className="input-group">
                      <label style={{ fontSize: '12px', color: '#8b949e', marginBottom: '6px', display: 'block' }}>Tempo (ms)</label>
                      <input
                        type="number"
                        value={zonasProtecao.z3_tempo}
                        onChange={(e) => setZonasProtecao({...zonasProtecao, z3_tempo: parseFloat(e.target.value) || 0})}
                        style={{ 
                          width: '100%', padding: '10px 14px', 
                          background: '#161b22', border: '1px solid #30363d', 
                          borderRadius: '8px', color: '#e6edf3', 
                          fontSize: '16px', fontWeight: '600'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ 
                    marginTop: '12px', padding: '10px 12px', 
                    background: 'rgba(249,115,22,0.1)', 
                    borderRadius: '6px',
                    fontSize: '11px', color: '#fdba74'
                  }}>
                    <strong>📋 Recomendação Típica:</strong> 120% de (Z_linha + Z_adjacente)
                    <br/>
                    <span style={{ color: '#8b949e' }}>💡 COES: ~220% | ONS: ~150% | Considera carga e loadability.</span>
                    <br/>
                    <span style={{ color: '#8b949e' }}>Valor calculado: <strong style={{ color: '#f97316' }}>
                      {((Math.sqrt(linha.R1**2 + linha.X1**2) * projeto.linha_comprimento) * zonasProtecao.z3_percent / 100).toFixed(2)} Ω
                    </strong></span>
                  </div>
                </div>

                {/* ZONA 4 - OPCIONAL (REVERSA OU FORWARD) */}
                <div style={{ 
                  background: zonasProtecao.z4_habilitada ? 'rgba(168,85,247,0.08)' : 'rgba(128,128,128,0.05)', 
                  border: `1px solid ${zonasProtecao.z4_habilitada ? 'rgba(168,85,247,0.3)' : 'rgba(128,128,128,0.2)'}`, 
                  borderRadius: '12px', 
                  padding: '20px',
                  position: 'relative',
                  opacity: zonasProtecao.z4_habilitada ? 1 : 0.7
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{ 
                      width: '36px', height: '36px', 
                      background: zonasProtecao.z4_habilitada 
                        ? 'linear-gradient(135deg, #a855f7, #9333ea)'
                        : 'linear-gradient(135deg, #6b7280, #4b5563)', 
                      borderRadius: '8px', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: '700', fontSize: '14px'
                    }}>Z4</div>
                    <div>
                      <h4 style={{ color: zonasProtecao.z4_habilitada ? '#a855f7' : '#6b7280', margin: 0, fontSize: '15px' }}>
                        Zona 4 - {zonasProtecao.z4_reversa ? 'Reversa' : 'Forward'} (Opcional)
                      </h4>
                      <span style={{ fontSize: '11px', color: '#8b949e' }}>
                        {zonasProtecao.z4_reversa 
                          ? 'Backup de Barra • Falha de Disjuntor' 
                          : 'Sobrealcance adicional • POTT/PUTT'}
                      </span>
                    </div>
                    <label style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={zonasProtecao.z4_habilitada}
                        onChange={(e) => setZonasProtecao({...zonasProtecao, z4_habilitada: e.target.checked})}
                        style={{ width: '16px', height: '16px', accentColor: '#a855f7' }}
                      />
                      <span style={{ fontSize: '11px', color: '#8b949e' }}>Habilitar</span>
                    </label>
                  </div>
                  
                  {/* Toggle de Direção Z4 */}
                  <div style={{ 
                    display: 'flex', gap: '8px', marginBottom: '12px',
                    opacity: zonasProtecao.z4_habilitada ? 1 : 0.5,
                    pointerEvents: zonasProtecao.z4_habilitada ? 'auto' : 'none'
                  }}>
                    <button
                      onClick={() => setZonasProtecao({...zonasProtecao, z4_reversa: true})}
                      disabled={!zonasProtecao.z4_habilitada}
                      style={{
                        flex: 1, padding: '8px 12px',
                        background: zonasProtecao.z4_reversa ? 'rgba(168,85,247,0.2)' : '#161b22',
                        border: `1px solid ${zonasProtecao.z4_reversa ? '#a855f7' : '#30363d'}`,
                        borderRadius: '6px',
                        color: zonasProtecao.z4_reversa ? '#a855f7' : '#8b949e',
                        fontSize: '12px', fontWeight: '600',
                        cursor: zonasProtecao.z4_habilitada ? 'pointer' : 'not-allowed',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                      }}
                    >
                      ⬅ Reversa (Backup Barra/BF)
                    </button>
                    <button
                      onClick={() => setZonasProtecao({...zonasProtecao, z4_reversa: false})}
                      disabled={!zonasProtecao.z4_habilitada}
                      style={{
                        flex: 1, padding: '8px 12px',
                        background: !zonasProtecao.z4_reversa ? 'rgba(168,85,247,0.2)' : '#161b22',
                        border: `1px solid ${!zonasProtecao.z4_reversa ? '#a855f7' : '#30363d'}`,
                        borderRadius: '6px',
                        color: !zonasProtecao.z4_reversa ? '#a855f7' : '#8b949e',
                        fontSize: '12px', fontWeight: '600',
                        cursor: zonasProtecao.z4_habilitada ? 'pointer' : 'not-allowed',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                      }}
                    >
                      ➡ Forward (POTT/PUTT)
                    </button>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="input-group">
                      <label style={{ fontSize: '12px', color: '#8b949e', marginBottom: '6px', display: 'block' }}>
                        Alcance {zonasProtecao.z4_reversa ? 'Reverso' : 'Forward'} (% da Linha)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="number"
                          value={zonasProtecao.z4_percent}
                          onChange={(e) => setZonasProtecao({...zonasProtecao, z4_percent: parseFloat(e.target.value) || 0})}
                          disabled={!zonasProtecao.z4_habilitada}
                          style={{ 
                            width: '100%', padding: '10px 40px 10px 14px', 
                            background: '#161b22', border: '1px solid #30363d', 
                            borderRadius: '8px', 
                            color: zonasProtecao.z4_habilitada ? '#e6edf3' : '#6b7280', 
                            fontSize: '16px', fontWeight: '600'
                          }}
                        />
                        <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }}>%</span>
                      </div>
                    </div>
                    <div className="input-group">
                      <label style={{ fontSize: '12px', color: '#8b949e', marginBottom: '6px', display: 'block' }}>Tempo (ms)</label>
                      <input
                        type="number"
                        value={zonasProtecao.z4_tempo}
                        onChange={(e) => setZonasProtecao({...zonasProtecao, z4_tempo: parseFloat(e.target.value) || 0})}
                        disabled={!zonasProtecao.z4_habilitada}
                        style={{ 
                          width: '100%', padding: '10px 14px', 
                          background: '#161b22', border: '1px solid #30363d', 
                          borderRadius: '8px', 
                          color: zonasProtecao.z4_habilitada ? '#e6edf3' : '#6b7280', 
                          fontSize: '16px', fontWeight: '600'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ 
                    marginTop: '12px', padding: '10px 12px', 
                    background: zonasProtecao.z4_habilitada ? 'rgba(168,85,247,0.1)' : 'rgba(128,128,128,0.05)', 
                    borderRadius: '6px',
                    fontSize: '11px', color: zonasProtecao.z4_habilitada ? '#d8b4fe' : '#9ca3af'
                  }}>
                    {zonasProtecao.z4_reversa ? (
                      <>
                        <strong>📋 Z4 Reversa:</strong> 20% (típico 10-25%)
                        <br/>
                        <span style={{ color: '#8b949e' }}>💡 Proteção de falha de disjuntor ou barras (STUB protection). Direção: atrás do relé.</span>
                      </>
                    ) : (
                      <>
                        <strong>📋 Z4 Forward:</strong> Sobrealcance adicional ou supervisão POTT/PUTT
                        <br/>
                        <span style={{ color: '#8b949e' }}>💡 Usada em esquemas de teleproteção permissiva. Direção: mesma que Z1, Z2, Z3.</span>
                      </>
                    )}
                    {zonasProtecao.z4_habilitada && (
                      <>
                        <br/>
                        <span style={{ color: '#8b949e' }}>Valor calculado: <strong style={{ color: '#a855f7' }}>
                          {((Math.sqrt(linha.R1**2 + linha.X1**2) * projeto.linha_comprimento) * zonasProtecao.z4_percent / 100).toFixed(2)} Ω
                        </strong> ({zonasProtecao.z4_reversa ? 'REVERSE' : 'FORWARD'})</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* RESUMO DAS ZONAS */}
              <div style={{ 
                padding: '16px 20px', 
                background: 'rgba(22,27,34,0.6)', 
                borderTop: '1px solid #30363d',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '16px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#8b949e', marginBottom: '4px' }}>|Z₁| da Linha</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#e6edf3', fontFamily: 'JetBrains Mono' }}>
                    {(Math.sqrt(linha.R1**2 + linha.X1**2) * projeto.linha_comprimento).toFixed(2)} Ω
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#22c55e', marginBottom: '4px' }}>Z1 Ajuste</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#22c55e', fontFamily: 'JetBrains Mono' }}>
                    {((Math.sqrt(linha.R1**2 + linha.X1**2) * projeto.linha_comprimento) * zonasProtecao.z1_percent / 100).toFixed(2)} Ω
                  </div>
                  <div style={{ fontSize: '10px', color: '#8b949e' }}>{zonasProtecao.z1_percent}% • {zonasProtecao.z1_tempo}ms</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#3b82f6', marginBottom: '4px' }}>Z2 Ajuste</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#3b82f6', fontFamily: 'JetBrains Mono' }}>
                    {((Math.sqrt(linha.R1**2 + linha.X1**2) * projeto.linha_comprimento) * zonasProtecao.z2_percent / 100).toFixed(2)} Ω
                  </div>
                  <div style={{ fontSize: '10px', color: '#8b949e' }}>{zonasProtecao.z2_percent}% • {zonasProtecao.z2_tempo}ms</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#f97316', marginBottom: '4px' }}>Z3 Ajuste</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#f97316', fontFamily: 'JetBrains Mono' }}>
                    {((Math.sqrt(linha.R1**2 + linha.X1**2) * projeto.linha_comprimento) * zonasProtecao.z3_percent / 100).toFixed(2)} Ω
                  </div>
                  <div style={{ fontSize: '10px', color: '#8b949e' }}>{zonasProtecao.z3_percent}% • {zonasProtecao.z3_tempo}ms</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: zonasProtecao.z4_habilitada ? '#a855f7' : '#6b7280', marginBottom: '4px' }}>Z4 Ajuste ({zonasProtecao.z4_habilitada ? (zonasProtecao.z4_reversa ? 'Rev' : 'Fwd') : 'OFF'})</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: zonasProtecao.z4_habilitada ? '#a855f7' : '#6b7280', fontFamily: 'JetBrains Mono' }}>
                    {zonasProtecao.z4_habilitada ? ((Math.sqrt(linha.R1**2 + linha.X1**2) * projeto.linha_comprimento) * zonasProtecao.z4_percent / 100).toFixed(2) + ' Ω' : 'N/A'}
                  </div>
                  <div style={{ fontSize: '10px', color: '#8b949e' }}>{zonasProtecao.z4_habilitada ? `${zonasProtecao.z4_percent}% • ${zonasProtecao.z4_tempo}ms` : 'Desabilitada'}</div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════════════════════════ */}
              {/* PREVIEW EM TEMPO REAL - VALORES SECUNDÁRIOS DO RELÉ */}
              {/* ═══════════════════════════════════════════════════════════════════════════════ */}
              {previewCalc && (
                <div style={{ 
                  padding: '16px 20px', 
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.05), rgba(59,130,246,0.05))',
                  borderTop: '1px solid #30363d'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{ 
                      width: '8px', height: '8px', 
                      background: '#22c55e', 
                      borderRadius: '50%',
                      animation: 'pulse 2s infinite'
                    }}></div>
                    <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: '600' }}>
                      PREVIEW EM TEMPO REAL - Valores Secundários (Relé)
                    </span>
                    <span style={{ fontSize: '11px', color: '#8b949e', marginLeft: 'auto' }}>
                      Fator K = RTC/RTP = {terminalA.rtc}/{terminalA.rtp} = {(terminalA.rtc/terminalA.rtp).toFixed(3)}
                    </span>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    {/* Terminal A Preview */}
                    <div style={{ 
                      background: 'rgba(34,197,94,0.1)', 
                      border: '1px solid rgba(34,197,94,0.3)',
                      borderRadius: '10px',
                      padding: '16px'
                    }}>
                      <div style={{ fontSize: '12px', color: '#22c55e', fontWeight: '600', marginBottom: '12px' }}>
                        Terminal A: {terminalA.nome}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: '#8b949e' }}>Z1 (Sec)</div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#22c55e', fontFamily: 'JetBrains Mono' }}>
                            {previewCalc.terminal_A?.ansi_21?.z1_reach?.toFixed(2) || '—'}
                          </div>
                          <div style={{ fontSize: '9px', color: '#6e7681' }}>Ω</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: '#8b949e' }}>Z2 (Sec)</div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#3b82f6', fontFamily: 'JetBrains Mono' }}>
                            {previewCalc.terminal_A?.ansi_21?.z2_reach?.toFixed(2) || '—'}
                          </div>
                          <div style={{ fontSize: '9px', color: '#6e7681' }}>Ω</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: '#8b949e' }}>Z3 (Sec)</div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#f97316', fontFamily: 'JetBrains Mono' }}>
                            {previewCalc.terminal_A?.ansi_21?.z3_reach?.toFixed(2) || '—'}
                          </div>
                          <div style={{ fontSize: '9px', color: '#6e7681' }}>Ω</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: '#8b949e' }}>K0</div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#a855f7', fontFamily: 'JetBrains Mono' }}>
                            {previewCalc.terminal_A?.ansi_21?.K0_mod?.toFixed(3) || '—'}
                          </div>
                          <div style={{ fontSize: '9px', color: '#6e7681' }}>∠{previewCalc.terminal_A?.ansi_21?.K0_ang?.toFixed(1) || '—'}°</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Terminal B Preview */}
                    <div style={{ 
                      background: 'rgba(168,85,247,0.1)', 
                      border: '1px solid rgba(168,85,247,0.3)',
                      borderRadius: '10px',
                      padding: '16px'
                    }}>
                      <div style={{ fontSize: '12px', color: '#a855f7', fontWeight: '600', marginBottom: '12px' }}>
                        Terminal B: {terminalB.nome}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: '#8b949e' }}>Z1 (Sec)</div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#22c55e', fontFamily: 'JetBrains Mono' }}>
                            {previewCalc.terminal_B?.ansi_21?.z1_reach?.toFixed(2) || '—'}
                          </div>
                          <div style={{ fontSize: '9px', color: '#6e7681' }}>Ω</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: '#8b949e' }}>Z2 (Sec)</div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#3b82f6', fontFamily: 'JetBrains Mono' }}>
                            {previewCalc.terminal_B?.ansi_21?.z2_reach?.toFixed(2) || '—'}
                          </div>
                          <div style={{ fontSize: '9px', color: '#6e7681' }}>Ω</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: '#8b949e' }}>Z3 (Sec)</div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#f97316', fontFamily: 'JetBrains Mono' }}>
                            {previewCalc.terminal_B?.ansi_21?.z3_reach?.toFixed(2) || '—'}
                          </div>
                          <div style={{ fontSize: '9px', color: '#6e7681' }}>Ω</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: '#8b949e' }}>K0</div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#a855f7', fontFamily: 'JetBrains Mono' }}>
                            {previewCalc.terminal_B?.ansi_21?.K0_mod?.toFixed(3) || '—'}
                          </div>
                          <div style={{ fontSize: '9px', color: '#6e7681' }}>∠{previewCalc.terminal_B?.ansi_21?.K0_ang?.toFixed(1) || '—'}°</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    marginTop: '12px', 
                    padding: '10px 12px', 
                    background: 'rgba(88,166,255,0.1)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '11px',
                    color: '#58a6ff'
                  }}>
                    <AlertTriangle size={14} />
                    <span>
                      <strong>Reatividade Automática:</strong> Altere os valores de % acima e veja os resultados atualizarem instantaneamente. 
                      Os cálculos usam sua configuração de zonas como <strong>Single Source of Truth</strong>.
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* ═══════════════════════════════════════════════════════════════════════════════ */}
            {/* SEÇÃO: DADOS DE CURTO-CIRCUITO (FAULT DATA) */}
            {/* ═══════════════════════════════════════════════════════════════════════════════ */}
            <div className="panel">
              <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="icon"><Zap size={20} /></div>
                  <h2>Validação de Níveis de Curto-Circuito</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#8b949e' }}>Unidade:</span>
                  <div style={{ 
                    display: 'flex', 
                    background: '#21262d', 
                    borderRadius: '8px', 
                    padding: '3px',
                    border: '1px solid #30363d'
                  }}>
                    <button
                      onClick={() => setFaultData({...faultData, unidade: 'kA'})}
                      style={{
                        padding: '6px 16px',
                        border: 'none',
                        borderRadius: '6px',
                        background: faultData.unidade === 'kA' ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'transparent',
                        color: faultData.unidade === 'kA' ? 'white' : '#8b949e',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '13px',
                        transition: 'all 0.2s'
                      }}
                    >
                      kA
                    </button>
                    <button
                      onClick={() => setFaultData({...faultData, unidade: 'A'})}
                      style={{
                        padding: '6px 16px',
                        border: 'none',
                        borderRadius: '6px',
                        background: faultData.unidade === 'A' ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'transparent',
                        color: faultData.unidade === 'A' ? 'white' : '#8b949e',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '13px',
                        transition: 'all 0.2s'
                      }}
                    >
                      A
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ padding: '16px 20px', background: 'rgba(249,115,22,0.08)', borderBottom: '1px solid #30363d', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <BarChart3 size={18} color="#f97316" />
                <p style={{ fontSize: '13px', color: '#8b949e', margin: 0 }}>
                  Insira os valores de <strong style={{ color: '#f97316' }}>corrente de curto-circuito</strong> obtidos do estudo de curto-circuito (software ATP, ETAP, PowerWorld, etc.) para validar a sensibilidade dos ajustes.
                </p>
              </div>

              {/* TABELA DE FAULT DATA */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#21262d' }}>
                      <th style={{ padding: '14px 16px', textAlign: 'left', borderBottom: '1px solid #30363d', color: '#8b949e', fontWeight: '600', minWidth: '180px' }}>
                        Cenário de Falta
                      </th>
                      <th style={{ padding: '14px 16px', textAlign: 'center', borderBottom: '1px solid #30363d', color: '#ef4444', fontWeight: '600' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <span>3Φ</span>
                          <span style={{ fontSize: '10px', opacity: 0.7 }}>Trifásico</span>
                        </div>
                      </th>
                      <th style={{ padding: '14px 16px', textAlign: 'center', borderBottom: '1px solid #30363d', color: '#f59e0b', fontWeight: '600' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <span>2Φ</span>
                          <span style={{ fontSize: '10px', opacity: 0.7 }}>Bifásico</span>
                        </div>
                      </th>
                      <th style={{ padding: '14px 16px', textAlign: 'center', borderBottom: '1px solid #30363d', color: '#22c55e', fontWeight: '600' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <span>1Φ Franco</span>
                          <span style={{ fontSize: '10px', opacity: 0.7 }}>Monofásico</span>
                        </div>
                      </th>
                      <th style={{ padding: '14px 16px', textAlign: 'center', borderBottom: '1px solid #30363d', color: '#3b82f6', fontWeight: '600' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <span>1Φ + Rf</span>
                          <span style={{ fontSize: '10px', opacity: 0.7 }}>Resistivo</span>
                        </div>
                      </th>
                      <th style={{ padding: '14px 16px', textAlign: 'center', borderBottom: '1px solid #30363d', color: '#a855f7', fontWeight: '600', minWidth: '150px' }}>
                        Validação 67N
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* FALTA LOCAL (0% da Linha) */}
                    <tr style={{ borderBottom: '1px solid #30363d' }}>
                      <td style={{ padding: '16px', background: 'rgba(239,68,68,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '32px', height: '32px',
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            borderRadius: '6px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontWeight: '700', fontSize: '11px'
                          }}>0%</div>
                          <div>
                            <div style={{ fontWeight: '600', color: '#e6edf3' }}>Falta Local</div>
                            <div style={{ fontSize: '11px', color: '#8b949e' }}>Bus Local (Close-in)</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', background: 'rgba(239,68,68,0.05)' }}>
                        <input
                          type="number"
                          step="0.1"
                          value={faultData.local_3f}
                          onChange={(e) => setFaultData({...faultData, local_3f: parseFloat(e.target.value) || 0})}
                          style={{
                            width: '90px', padding: '8px 12px', textAlign: 'center',
                            background: '#161b22', border: '1px solid #30363d',
                            borderRadius: '6px', color: '#ef4444', fontSize: '14px', fontWeight: '600'
                          }}
                        />
                        <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '4px' }}>{faultData.unidade}</div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', background: 'rgba(239,68,68,0.05)' }}>
                        <input
                          type="number"
                          step="0.1"
                          value={faultData.local_2f}
                          onChange={(e) => setFaultData({...faultData, local_2f: parseFloat(e.target.value) || 0})}
                          style={{
                            width: '90px', padding: '8px 12px', textAlign: 'center',
                            background: '#161b22', border: '1px solid #30363d',
                            borderRadius: '6px', color: '#f59e0b', fontSize: '14px', fontWeight: '600'
                          }}
                        />
                        <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '4px' }}>{faultData.unidade}</div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', background: 'rgba(239,68,68,0.05)' }}>
                        <input
                          type="number"
                          step="0.1"
                          value={faultData.local_1f}
                          onChange={(e) => setFaultData({...faultData, local_1f: parseFloat(e.target.value) || 0})}
                          style={{
                            width: '90px', padding: '8px 12px', textAlign: 'center',
                            background: '#161b22', border: '1px solid #30363d',
                            borderRadius: '6px', color: '#22c55e', fontSize: '14px', fontWeight: '600'
                          }}
                        />
                        <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '4px' }}>{faultData.unidade}</div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', background: 'rgba(239,68,68,0.05)' }}>
                        <input
                          type="number"
                          step="0.01"
                          value={faultData.local_1f_res}
                          onChange={(e) => setFaultData({...faultData, local_1f_res: parseFloat(e.target.value) || 0})}
                          style={{
                            width: '90px', padding: '8px 12px', textAlign: 'center',
                            background: '#161b22',
                            border: `2px solid ${validarSensibilidade(faultData.local_1f_res, faultData.pickup_67n).cor}`,
                            borderRadius: '6px', color: '#3b82f6', fontSize: '14px', fontWeight: '600'
                          }}
                        />
                        <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '4px' }}>{faultData.unidade}</div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', background: 'rgba(239,68,68,0.05)' }}>
                        {(() => {
                          const validacao = validarSensibilidade(faultData.local_1f_res, faultData.pickup_67n);
                          return (
                            <div style={{
                              padding: '8px 10px',
                              background: `${validacao.cor}15`,
                              border: `1px solid ${validacao.cor}40`,
                              borderRadius: '6px'
                            }}>
                              <div style={{ fontWeight: '700', color: validacao.cor, fontSize: '11px' }}>{validacao.status}</div>
                              <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '2px' }}>
                                Ratio: {((faultData.unidade === 'A' ? faultData.local_1f_res / 1000 : faultData.local_1f_res) / faultData.pickup_67n).toFixed(2)}x
                              </div>
                            </div>
                          );
                        })()}
                      </td>
                    </tr>

                    {/* FALTA REMOTA (100% da Linha) */}
                    <tr style={{ borderBottom: '1px solid #30363d' }}>
                      <td style={{ padding: '16px', background: 'rgba(34,197,94,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '32px', height: '32px',
                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                            borderRadius: '6px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontWeight: '700', fontSize: '10px'
                          }}>100%</div>
                          <div>
                            <div style={{ fontWeight: '600', color: '#e6edf3' }}>Falta Remota</div>
                            <div style={{ fontSize: '11px', color: '#8b949e' }}>Bus Remoto (End of Line)</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', background: 'rgba(34,197,94,0.05)' }}>
                        <input
                          type="number"
                          step="0.1"
                          value={faultData.remota_3f}
                          onChange={(e) => setFaultData({...faultData, remota_3f: parseFloat(e.target.value) || 0})}
                          style={{
                            width: '90px', padding: '8px 12px', textAlign: 'center',
                            background: '#161b22', border: '1px solid #30363d',
                            borderRadius: '6px', color: '#ef4444', fontSize: '14px', fontWeight: '600'
                          }}
                        />
                        <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '4px' }}>{faultData.unidade}</div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', background: 'rgba(34,197,94,0.05)' }}>
                        <input
                          type="number"
                          step="0.1"
                          value={faultData.remota_2f}
                          onChange={(e) => setFaultData({...faultData, remota_2f: parseFloat(e.target.value) || 0})}
                          style={{
                            width: '90px', padding: '8px 12px', textAlign: 'center',
                            background: '#161b22', border: '1px solid #30363d',
                            borderRadius: '6px', color: '#f59e0b', fontSize: '14px', fontWeight: '600'
                          }}
                        />
                        <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '4px' }}>{faultData.unidade}</div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', background: 'rgba(34,197,94,0.05)' }}>
                        <input
                          type="number"
                          step="0.1"
                          value={faultData.remota_1f}
                          onChange={(e) => setFaultData({...faultData, remota_1f: parseFloat(e.target.value) || 0})}
                          style={{
                            width: '90px', padding: '8px 12px', textAlign: 'center',
                            background: '#161b22', border: '1px solid #30363d',
                            borderRadius: '6px', color: '#22c55e', fontSize: '14px', fontWeight: '600'
                          }}
                        />
                        <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '4px' }}>{faultData.unidade}</div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', background: 'rgba(34,197,94,0.05)' }}>
                        <input
                          type="number"
                          step="0.01"
                          value={faultData.remota_1f_res}
                          onChange={(e) => setFaultData({...faultData, remota_1f_res: parseFloat(e.target.value) || 0})}
                          style={{
                            width: '90px', padding: '8px 12px', textAlign: 'center',
                            background: '#161b22',
                            border: `2px solid ${validarSensibilidade(faultData.remota_1f_res, faultData.pickup_67n).cor}`,
                            borderRadius: '6px', color: '#3b82f6', fontSize: '14px', fontWeight: '600'
                          }}
                        />
                        <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '4px' }}>{faultData.unidade}</div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', background: 'rgba(34,197,94,0.05)' }}>
                        {(() => {
                          const validacao = validarSensibilidade(faultData.remota_1f_res, faultData.pickup_67n);
                          return (
                            <div style={{
                              padding: '8px 10px',
                              background: `${validacao.cor}15`,
                              border: `1px solid ${validacao.cor}40`,
                              borderRadius: '6px'
                            }}>
                              <div style={{ fontWeight: '700', color: validacao.cor, fontSize: '11px' }}>{validacao.status}</div>
                              <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '2px' }}>
                                Ratio: {((faultData.unidade === 'A' ? faultData.remota_1f_res / 1000 : faultData.remota_1f_res) / faultData.pickup_67n).toFixed(2)}x
                              </div>
                            </div>
                          );
                        })()}
                      </td>
                    </tr>

                    {/* FALTA RESISTIVA CRÍTICA (Customizável) */}
                    <tr>
                      <td style={{ padding: '16px', background: 'rgba(168,85,247,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '32px', height: '32px',
                            background: 'linear-gradient(135deg, #a855f7, #9333ea)',
                            borderRadius: '6px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontWeight: '700', fontSize: '9px'
                          }}>CRIT</div>
                          <div>
                            <div style={{ fontWeight: '600', color: '#e6edf3' }}>Falta Resistiva Crítica</div>
                            <div style={{ fontSize: '11px', color: '#8b949e' }}>Alta Impedância (67N)</div>
                          </div>
                        </div>
                      </td>
                      <td colSpan="2" style={{ padding: '12px', background: 'rgba(168,85,247,0.05)' }}>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '10px', color: '#8b949e', marginBottom: '4px' }}>Localização</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <input
                                type="number"
                                step="5"
                                value={faultData.critica_localizacao}
                                onChange={(e) => setFaultData({...faultData, critica_localizacao: parseFloat(e.target.value) || 0})}
                                style={{
                                  width: '60px', padding: '8px', textAlign: 'center',
                                  background: '#161b22', border: '1px solid #30363d',
                                  borderRadius: '6px', color: '#a855f7', fontSize: '14px', fontWeight: '600'
                                }}
                              />
                              <span style={{ color: '#8b949e', fontSize: '12px' }}>%</span>
                            </div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '10px', color: '#8b949e', marginBottom: '4px' }}>Rf (Resistência)</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <input
                                type="number"
                                step="5"
                                value={faultData.critica_rf}
                                onChange={(e) => setFaultData({...faultData, critica_rf: parseFloat(e.target.value) || 0})}
                                style={{
                                  width: '60px', padding: '8px', textAlign: 'center',
                                  background: '#161b22', border: '1px solid #30363d',
                                  borderRadius: '6px', color: '#a855f7', fontSize: '14px', fontWeight: '600'
                                }}
                              />
                              <span style={{ color: '#8b949e', fontSize: '12px' }}>Ω</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', background: 'rgba(168,85,247,0.05)' }}>
                        <div style={{ fontSize: '10px', color: '#8b949e', marginBottom: '4px' }}>N/A</div>
                        <div style={{ color: '#6b7280', fontSize: '12px' }}>—</div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', background: 'rgba(168,85,247,0.05)' }}>
                        <div style={{ fontSize: '10px', color: '#8b949e', marginBottom: '4px' }}>3I₀ Calculado</div>
                        <input
                          type="number"
                          step="0.001"
                          value={faultData.critica_3i0}
                          onChange={(e) => setFaultData({...faultData, critica_3i0: parseFloat(e.target.value) || 0})}
                          style={{
                            width: '90px', padding: '8px 12px', textAlign: 'center',
                            background: '#161b22',
                            border: `2px solid ${validarSensibilidade(faultData.critica_3i0, faultData.pickup_67n).cor}`,
                            borderRadius: '6px', color: '#a855f7', fontSize: '14px', fontWeight: '600'
                          }}
                        />
                        <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '4px' }}>{faultData.unidade}</div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', background: 'rgba(168,85,247,0.05)' }}>
                        {(() => {
                          const validacao = validarSensibilidade(faultData.critica_3i0, faultData.pickup_67n);
                          return (
                            <div style={{
                              padding: '8px 10px',
                              background: `${validacao.cor}15`,
                              border: `1px solid ${validacao.cor}40`,
                              borderRadius: '6px'
                            }}>
                              <div style={{ fontWeight: '700', color: validacao.cor, fontSize: '11px' }}>{validacao.status}</div>
                              <div style={{ fontSize: '10px', color: '#8b949e', marginTop: '2px' }}>
                                Ratio: {((faultData.unidade === 'A' ? faultData.critica_3i0 / 1000 : faultData.critica_3i0) / faultData.pickup_67n).toFixed(2)}x
                              </div>
                            </div>
                          );
                        })()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* SEÇÃO DE PICKUP PARA VALIDAÇÃO */}
              <div style={{ 
                padding: '20px', 
                background: 'rgba(22,27,34,0.6)', 
                borderTop: '1px solid #30363d'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Settings size={18} color="#8b949e" />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#e6edf3' }}>Ajustes de Pickup para Validação</span>
                  <span style={{ fontSize: '11px', color: '#8b949e', marginLeft: 'auto' }}>
                    Valores em kA (primário) - usados para calcular a sensibilidade
                  </span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  {/* PICKUP 67N */}
                  <div style={{ 
                    background: 'rgba(59,130,246,0.08)', 
                    border: '1px solid rgba(59,130,246,0.3)',
                    borderRadius: '10px',
                    padding: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <div style={{
                        width: '28px', height: '28px',
                        background: '#3b82f6',
                        borderRadius: '6px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: '700', fontSize: '10px'
                      }}>67N</div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#3b82f6', fontSize: '13px' }}>Direcional de Terra</div>
                        <div style={{ fontSize: '10px', color: '#8b949e' }}>Pickup de Corrente 3I₀</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="number"
                        step="0.01"
                        value={faultData.pickup_67n}
                        onChange={(e) => setFaultData({...faultData, pickup_67n: parseFloat(e.target.value) || 0})}
                        style={{
                          flex: 1, padding: '10px 14px',
                          background: '#161b22', border: '1px solid #30363d',
                          borderRadius: '6px', color: '#e6edf3', fontSize: '16px', fontWeight: '600'
                        }}
                      />
                      <span style={{ color: '#8b949e', fontSize: '14px' }}>kA</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#6e7681', marginTop: '8px' }}>
                      Típico: 0.2 ~ 0.6 kA (5-15% da Icc mínima)
                    </div>
                  </div>

                  {/* PICKUP 50N */}
                  <div style={{ 
                    background: 'rgba(239,68,68,0.08)', 
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '10px',
                    padding: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <div style={{
                        width: '28px', height: '28px',
                        background: '#ef4444',
                        borderRadius: '6px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: '700', fontSize: '10px'
                      }}>50N</div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#ef4444', fontSize: '13px' }}>Instantâneo de Terra</div>
                        <div style={{ fontSize: '10px', color: '#8b949e' }}>Pickup Alta Corrente</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="number"
                        step="0.1"
                        value={faultData.pickup_50n}
                        onChange={(e) => setFaultData({...faultData, pickup_50n: parseFloat(e.target.value) || 0})}
                        style={{
                          flex: 1, padding: '10px 14px',
                          background: '#161b22', border: '1px solid #30363d',
                          borderRadius: '6px', color: '#e6edf3', fontSize: '16px', fontWeight: '600'
                        }}
                      />
                      <span style={{ color: '#8b949e', fontSize: '14px' }}>kA</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#6e7681', marginTop: '8px' }}>
                      Típico: 1.5 ~ 3.0 kA (80% da Icc mínima remota)
                    </div>
                  </div>

                  {/* PICKUP 51N */}
                  <div style={{ 
                    background: 'rgba(34,197,94,0.08)', 
                    border: '1px solid rgba(34,197,94,0.3)',
                    borderRadius: '10px',
                    padding: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <div style={{
                        width: '28px', height: '28px',
                        background: '#22c55e',
                        borderRadius: '6px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: '700', fontSize: '10px'
                      }}>51N</div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#22c55e', fontSize: '13px' }}>Temporizado de Terra</div>
                        <div style={{ fontSize: '10px', color: '#8b949e' }}>Curva de Tempo Inverso</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="number"
                        step="0.01"
                        value={faultData.pickup_51n}
                        onChange={(e) => setFaultData({...faultData, pickup_51n: parseFloat(e.target.value) || 0})}
                        style={{
                          flex: 1, padding: '10px 14px',
                          background: '#161b22', border: '1px solid #30363d',
                          borderRadius: '6px', color: '#e6edf3', fontSize: '16px', fontWeight: '600'
                        }}
                      />
                      <span style={{ color: '#8b949e', fontSize: '14px' }}>kA</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#6e7681', marginTop: '8px' }}>
                      Típico: 0.15 ~ 0.40 kA (backup sensível)
                    </div>
                  </div>
                </div>
              </div>

              {/* ALERTAS DE VALIDAÇÃO */}
              {(() => {
                const validacaoCritica = validarSensibilidade(faultData.critica_3i0, faultData.pickup_67n);
                const validacaoRemota = validarSensibilidade(faultData.remota_1f_res, faultData.pickup_67n);
                const temProblema = validacaoCritica.status === 'FALHA' || validacaoRemota.status === 'FALHA';
                const temAviso = validacaoCritica.status === 'MARGINAL' || validacaoRemota.status === 'MARGINAL';
                
                if (temProblema) {
                  return (
                    <div style={{
                      padding: '16px 20px',
                      background: 'rgba(239,68,68,0.1)',
                      borderTop: '1px solid rgba(239,68,68,0.3)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <AlertTriangle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontWeight: '700', color: '#ef4444', marginBottom: '4px' }}>
                          ⚠️ FALTA NÃO DETECTADA - ZONA MORTA IDENTIFICADA
                        </div>
                        <div style={{ fontSize: '13px', color: '#fca5a5' }}>
                          A corrente de falta resistiva está abaixo do pickup do 67N. O relé <strong>NÃO IRÁ OPERAR</strong> para este cenário.
                        </div>
                        <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '8px' }}>
                          <strong>Recomendações:</strong> (1) Reduzir o Pickup 67N, (2) Habilitar esquema de Teleproteção (POTT/PUTT), 
                          (3) Verificar sensibilidade do esquema de proteção diferencial (87L).
                        </div>
                      </div>
                    </div>
                  );
                } else if (temAviso) {
                  return (
                    <div style={{
                      padding: '16px 20px',
                      background: 'rgba(245,158,11,0.1)',
                      borderTop: '1px solid rgba(245,158,11,0.3)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <AlertTriangle size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontWeight: '700', color: '#f59e0b', marginBottom: '4px' }}>
                          ⚠️ MARGEM DE SENSIBILIDADE BAIXA
                        </div>
                        <div style={{ fontSize: '13px', color: '#fcd34d' }}>
                          A razão entre a corrente de falta e o pickup está abaixo de 1.3x. Considere usar teleproteção para garantir operação segura.
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          </>
        )}

        {/* TAB 2: TERMINAIS */}
        {activeTab === 2 && (
          <div className="split-view">
            <div className="terminal-panel local">
              <div className="terminal-header">
                <div className="terminal-title">
                  <Zap size={20} color="#3fb950" />
                  <h3>Terminal A</h3>
                  <span className="terminal-badge local">LOCAL</span>
                </div>
              </div>
              
              <div className="input-grid">
                <InputField
                  label="Nome da Subestação"
                  value={terminalA.nome}
                  onChange={(v) => setTerminalA({...terminalA, nome: v})}
                  type="text"
                />
              </div>
              
              <div className="section-title">Relé de Proteção</div>
              
              <div className="input-group">
                <label>Relé Instalado</label>
                <select 
                  value={projeto.rele_a_id || ''} 
                  onChange={(e) => {
                    const id = e.target.value ? Number(e.target.value) : null;
                    setProjeto({...projeto, rele_a_id: id});
                  }}
                >
                  <option value="">Selecione um relé...</option>
                  {reles.map(r => (
                    <option key={r.id} value={r.id}>{r.fabricante} {r.modelo} - {r.tipo}</option>
                  ))}
                </select>
              </div>
              
              {projeto.rele_a_id && (
                <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(63,185,80,0.1)', borderRadius: '8px', fontSize: '12px' }}>
                  <strong style={{ color: '#3fb950' }}>Funções disponíveis:</strong>{' '}
                  <span style={{ color: '#8b949e' }}>{reles.find(r => r.id === projeto.rele_a_id)?.funcoes}</span>
                </div>
              )}
              
              <div className="section-title">Transformadores de Instrumento</div>
              
              <div className="input-grid input-grid-3">
                <InputField
                  label="RTC (Relação TC)"
                  value={terminalA.rtc}
                  onChange={(v) => setTerminalA({...terminalA, rtc: v})}
                  unit="A/A"
                />
                <InputField
                  label="RTP (Relação TP)"
                  value={terminalA.rtp}
                  onChange={(v) => setTerminalA({...terminalA, rtp: v})}
                  unit="V/V"
                />
                <InputField
                  label="In TC Primário (87L)"
                  value={terminalA.in_tc_primario}
                  onChange={(v) => setTerminalA({...terminalA, in_tc_primario: v})}
                  unit="A"
                />
              </div>
              
              <div className="section-title">Correntes de Curto-Circuito</div>
              
              <div className="input-grid input-grid-2">
                <InputField
                  label="Icc 3Φ Máx (Remota)"
                  value={terminalA.icc_3f_max}
                  onChange={(v) => setTerminalA({...terminalA, icc_3f_max: v})}
                  unit="A"
                />
                <InputField
                  label="Icc 1Φ Mín (Remota)"
                  value={terminalA.icc_1f_min}
                  onChange={(v) => setTerminalA({...terminalA, icc_1f_min: v})}
                  unit="A"
                />
              </div>
              
              <div className="section-title">Corrente de Carga</div>
              
              <InputField
                label="I Carga Máxima"
                value={terminalA.I_carga_max}
                onChange={(v) => setTerminalA({...terminalA, I_carga_max: v})}
                unit="A"
              />
              
              <div className="section-title">Configuração Direcional (67/67N)</div>
              
              <div className="input-grid input-grid-2">
                <SelectField
                  label="Polarização 67N"
                  value={terminalA.polarizacao_67n || 'V0'}
                  onChange={(v) => setTerminalA({...terminalA, polarizacao_67n: v})}
                  options={[
                    { value: 'V0', label: 'V0 - Tensão Residual' },
                    { value: 'I0', label: 'I0 - Corrente Residual' },
                    { value: 'V2', label: 'V2 - Sequência Negativa' },
                    { value: 'DUAL', label: 'DUAL - V0 + I2' }
                  ]}
                />
                <SelectField
                  label="Direção Principal 67"
                  value={terminalA.direcao_67 || 'FWD'}
                  onChange={(v) => setTerminalA({...terminalA, direcao_67: v})}
                  options={[
                    { value: 'FWD', label: 'Forward (→ Linha)' },
                    { value: 'REV', label: 'Reverse (← Barra)' },
                    { value: 'BOTH', label: 'Bidirecional' }
                  ]}
                />
              </div>
              
              <div className="result-cards">
                <ResultCard title="K conversão" value={(terminalA.rtc / terminalA.rtp).toFixed(4)} unit="A/V" />
                <ResultCard title="I secundário" value={(terminalA.I_carga_max / terminalA.rtc).toFixed(3)} unit="A" />
              </div>
            </div>

            <div className="terminal-panel remote">
              <div className="terminal-header">
                <div className="terminal-title">
                  <Zap size={20} color="#a371f7" />
                  <h3>Terminal B</h3>
                  <span className="terminal-badge remote">REMOTO</span>
                </div>
              </div>
              
              <div className="input-grid">
                <InputField
                  label="Nome da Subestação"
                  value={terminalB.nome}
                  onChange={(v) => setTerminalB({...terminalB, nome: v})}
                  type="text"
                />
              </div>
              
              <div className="section-title">Relé de Proteção</div>
              
              <div className="input-group">
                <label>Relé Instalado</label>
                <select 
                  value={projeto.rele_b_id || ''} 
                  onChange={(e) => {
                    const id = e.target.value ? Number(e.target.value) : null;
                    setProjeto({...projeto, rele_b_id: id});
                  }}
                >
                  <option value="">Selecione um relé...</option>
                  {reles.map(r => (
                    <option key={r.id} value={r.id}>{r.fabricante} {r.modelo} - {r.tipo}</option>
                  ))}
                </select>
              </div>
              
              {projeto.rele_b_id && (
                <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(163,113,247,0.1)', borderRadius: '8px', fontSize: '12px' }}>
                  <strong style={{ color: '#a371f7' }}>Funções disponíveis:</strong>{' '}
                  <span style={{ color: '#8b949e' }}>{reles.find(r => r.id === projeto.rele_b_id)?.funcoes}</span>
                </div>
              )}
              
              <div className="section-title">Transformadores de Instrumento</div>
              
              <div className="input-grid input-grid-3">
                <InputField
                  label="RTC (Relação TC)"
                  value={terminalB.rtc}
                  onChange={(v) => setTerminalB({...terminalB, rtc: v})}
                  unit="A/A"
                />
                <InputField
                  label="RTP (Relação TP)"
                  value={terminalB.rtp}
                  onChange={(v) => setTerminalB({...terminalB, rtp: v})}
                  unit="V/V"
                />
                <InputField
                  label="In TC Primário (87L)"
                  value={terminalB.in_tc_primario}
                  onChange={(v) => setTerminalB({...terminalB, in_tc_primario: v})}
                  unit="A"
                />
              </div>
              
              <div className="section-title">Correntes de Curto-Circuito</div>
              
              <div className="input-grid input-grid-2">
                <InputField
                  label="Icc 3Φ Máx (Remota)"
                  value={terminalB.icc_3f_max}
                  onChange={(v) => setTerminalB({...terminalB, icc_3f_max: v})}
                  unit="A"
                />
                <InputField
                  label="Icc 1Φ Mín (Remota)"
                  value={terminalB.icc_1f_min}
                  onChange={(v) => setTerminalB({...terminalB, icc_1f_min: v})}
                  unit="A"
                />
              </div>
              
              <div className="section-title">Corrente de Carga</div>
              
              <InputField
                label="I Carga Máxima"
                value={terminalB.I_carga_max}
                onChange={(v) => setTerminalB({...terminalB, I_carga_max: v})}
                unit="A"
              />
              
              <div className="section-title">Configuração Direcional (67/67N)</div>
              
              <div className="input-grid input-grid-2">
                <SelectField
                  label="Polarização 67N"
                  value={terminalB.polarizacao_67n || 'V0'}
                  onChange={(v) => setTerminalB({...terminalB, polarizacao_67n: v})}
                  options={[
                    { value: 'V0', label: 'V0 - Tensão Residual' },
                    { value: 'I0', label: 'I0 - Corrente Residual' },
                    { value: 'V2', label: 'V2 - Sequência Negativa' },
                    { value: 'DUAL', label: 'DUAL - V0 + I2' }
                  ]}
                />
                <SelectField
                  label="Direção Principal 67"
                  value={terminalB.direcao_67 || 'FWD'}
                  onChange={(v) => setTerminalB({...terminalB, direcao_67: v})}
                  options={[
                    { value: 'FWD', label: 'Forward (→ Linha)' },
                    { value: 'REV', label: 'Reverse (← Barra)' },
                    { value: 'BOTH', label: 'Bidirecional' }
                  ]}
                />
              </div>
              
              <div className="result-cards">
                <ResultCard title="K conversão" value={(terminalB.rtc / terminalB.rtp).toFixed(4)} unit="A/V" />
                <ResultCard title="I secundário" value={(terminalB.I_carga_max / terminalB.rtc).toFixed(3)} unit="A" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CÁLCULOS */}
        {activeTab === 3 && (
          <>
            <div className="panel">
              <div className="panel-header">
                <div className="icon"><Calculator size={20} /></div>
                <h2>Processamento de Cálculos</h2>
              </div>
              
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <button className="btn btn-primary" onClick={handleCalculate}>
                  <Calculator size={20} />
                  Processar Ajustes de Proteção
                  <ChevronRight size={18} />
                </button>
                <p style={{ marginTop: '12px', fontSize: '13px', color: '#6e7681' }}>
                  Norma selecionada: <strong style={{ color: '#f97316' }}>{projeto.norma}</strong> | 
                  Linha: <strong style={{ color: '#58a6ff' }}>{projeto.linha_comprimento} km</strong>
                </p>
              </div>
            </div>

            {results && (
              <>
                <div className="panel">
                  <div className="panel-header">
                    <div className="icon"><BarChart3 size={20} /></div>
                    <h2>Resultados - Proteção de Distância (21)</h2>
                  </div>
                  
                  <div className="comparison-table">
                    <div className="comparison-header">Parâmetro</div>
                    <div className="comparison-header">Terminal A ({terminalA.nome})</div>
                    <div className="comparison-header">Terminal B ({terminalB.nome})</div>
                    
                    <div className="comparison-label">Fator de Conversão (K)</div>
                    <div className="comparison-value local">{results.terminal_A.K_conv}</div>
                    <div className="comparison-value remote">{results.terminal_B.K_conv}</div>
                    
                    <div className="comparison-label">Z₁ Linha (Secundário)</div>
                    <div className="comparison-value local">{results.terminal_A.z1_line_sec.mod} Ω ∠{results.terminal_A.z1_line_sec.ang}°</div>
                    <div className="comparison-value remote">{results.terminal_B.z1_line_sec.mod} Ω ∠{results.terminal_B.z1_line_sec.ang}°</div>
                    
                    <div className="comparison-label"><span className="zone-chip z1">Z1</span> Alcance ({results.terminal_A.criteria.z1})</div>
                    <div className="comparison-value local">{results.terminal_A.z1_reach} Ω</div>
                    <div className="comparison-value remote">{results.terminal_B.z1_reach} Ω</div>
                    
                    <div className="comparison-label"><span className="zone-chip z2">Z2</span> Alcance ({results.terminal_A.criteria.z2})</div>
                    <div className="comparison-value local">{results.terminal_A.z2_reach} Ω</div>
                    <div className="comparison-value remote">{results.terminal_B.z2_reach} Ω</div>
                    
                    <div className="comparison-label"><span className="zone-chip z3">Z3</span> Alcance ({results.terminal_A.criteria.z3})</div>
                    <div className="comparison-value local">{results.terminal_A.z3_reach} Ω</div>
                    <div className="comparison-value remote">{results.terminal_B.z3_reach} Ω</div>
                    
                    <div className="comparison-label"><span className="zone-chip z4">Z4</span> {zonasProtecao.z4_habilitada ? (zonasProtecao.z4_reversa ? 'Reversa' : 'Forward') : 'Desabilitada'} ({results.terminal_A.criteria.z4})</div>
                    <div className="comparison-value local">{zonasProtecao.z4_habilitada ? results.terminal_A.z4_reach + ' Ω' : '—'}</div>
                    <div className="comparison-value remote">{zonasProtecao.z4_habilitada ? results.terminal_B.z4_reach + ' Ω' : '—'}</div>
                    
                    <div className="comparison-label">K₀ (Compensação Terra)</div>
                    <div className="comparison-value local">{results.terminal_A.k0_modulo} ∠{results.terminal_A.k0_angulo}°</div>
                    <div className="comparison-value remote">{results.terminal_B.k0_modulo} ∠{results.terminal_B.k0_angulo}°</div>
                    
                    <div className="comparison-label">Tempo Z1 / Z2 / Z3</div>
                    <div className="comparison-value local">{results.terminal_A.z1_time}s / {results.terminal_A.z2_time}s / {results.terminal_A.z3_time}s</div>
                    <div className="comparison-value remote">{results.terminal_B.z1_time}s / {results.terminal_B.z2_time}s / {results.terminal_B.z3_time}s</div>
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <div className="icon"><Zap size={20} /></div>
                    <h2>Resultados - Sobrecorrente Não Direcional (50/51 e 50N/51N)</h2>
                  </div>
                  
                  <div className="comparison-table">
                    <div className="comparison-header">Função</div>
                    <div className="comparison-header">Terminal A</div>
                    <div className="comparison-header">Terminal B</div>
                    
                    <div className="comparison-label"><strong>50</strong> - Pickup Instantâneo (Fase)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_50_pickup} A</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_50_pickup} A</div>
                    
                    <div className="comparison-label"><strong>51</strong> - Pickup Temporizado (Fase)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_51_pickup} A</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_51_pickup} A</div>
                    
                    <div className="comparison-label"><strong>51</strong> - Curva / TMS</div>
                    <div className="comparison-value local">{results.terminal_A.curve_51.type} / {results.terminal_A.curve_51.TMS}</div>
                    <div className="comparison-value remote">{results.terminal_B.curve_51.type} / {results.terminal_B.curve_51.TMS}</div>
                    
                    <div className="comparison-label"><strong>50N</strong> - Pickup Instantâneo (Neutro)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_50n_pickup} A</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_50n_pickup} A</div>
                    
                    <div className="comparison-label"><strong>51N</strong> - Pickup Temporizado (Neutro)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_51n_pickup} A</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_51n_pickup} A</div>
                    
                    <div className="comparison-label"><strong>51N</strong> - Curva / TMS</div>
                    <div className="comparison-value local">{results.terminal_A.curve_51n.type} / {results.terminal_A.curve_51n.TMS}</div>
                    <div className="comparison-value remote">{results.terminal_B.curve_51n.type} / {results.terminal_B.curve_51n.TMS}</div>
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <div className="icon"><Activity size={20} /></div>
                    <h2>Resultados - Sobrecorrente Direcional de Fase (67)</h2>
                  </div>
                  
                  <div className="comparison-table">
                    <div className="comparison-header">Parâmetro</div>
                    <div className="comparison-header">Terminal A</div>
                    <div className="comparison-header">Terminal B</div>
                    
                    <div className="comparison-label"><strong>67</strong> - Pickup Forward (→ Linha)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_67_pickup_fwd} A</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_67_pickup_fwd} A</div>
                    
                    <div className="comparison-label"><strong>67</strong> - Pickup Reverse (← Barra)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_67_pickup_rev} A</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_67_pickup_rev} A</div>
                    
                    <div className="comparison-label"><strong>67</strong> - Direção Habilitada</div>
                    <div className="comparison-value local">
                      <span className={`zone-chip ${results.terminal_A.ansi_67_direction === 'FWD' ? 'z1' : results.terminal_A.ansi_67_direction === 'REV' ? 'z4' : 'z2'}`}>
                        {results.terminal_A.ansi_67_direction === 'FWD' ? 'FORWARD' : results.terminal_A.ansi_67_direction === 'REV' ? 'REVERSE' : 'BIDIRECIONAL'}
                      </span>
                    </div>
                    <div className="comparison-value remote">
                      <span className={`zone-chip ${results.terminal_B.ansi_67_direction === 'FWD' ? 'z1' : results.terminal_B.ansi_67_direction === 'REV' ? 'z4' : 'z2'}`}>
                        {results.terminal_B.ansi_67_direction === 'FWD' ? 'FORWARD' : results.terminal_B.ansi_67_direction === 'REV' ? 'REVERSE' : 'BIDIRECIONAL'}
                      </span>
                    </div>
                    
                    <div className="comparison-label"><strong>67</strong> - MTA (Ângulo Torque Máx.)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_67_mta}°</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_67_mta}°</div>
                    
                    <div className="comparison-label"><strong>67</strong> - RCA (Ângulo Característico)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_67_rca}°</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_67_rca}°</div>
                    
                    <div className="comparison-label"><strong>67</strong> - Curva / TMS</div>
                    <div className="comparison-value local">{results.terminal_A.curve_67.type} / {results.terminal_A.curve_67.TMS}</div>
                    <div className="comparison-value remote">{results.terminal_B.curve_67.type} / {results.terminal_B.curve_67.TMS}</div>
                    
                    <div className="comparison-label"><strong>67</strong> - Tempo Instantâneo</div>
                    <div className="comparison-value local">{results.terminal_A.time_67_inst} s</div>
                    <div className="comparison-value remote">{results.terminal_B.time_67_inst} s</div>
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <div className="icon"><AlertTriangle size={20} /></div>
                    <h2>Resultados - Sobrecorrente Direcional de Neutro (67N)</h2>
                  </div>
                  
                  <div className="comparison-table">
                    <div className="comparison-header">Parâmetro</div>
                    <div className="comparison-header">Terminal A</div>
                    <div className="comparison-header">Terminal B</div>
                    
                    <div className="comparison-label"><strong>67N</strong> - Pickup Forward (→ Linha)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_67n_pickup_fwd} A</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_67n_pickup_fwd} A</div>
                    
                    <div className="comparison-label"><strong>67N</strong> - Pickup Reverse (← Barra)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_67n_pickup_rev} A</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_67n_pickup_rev} A</div>
                    
                    <div className="comparison-label"><strong>67N</strong> - Tipo de Polarização</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_67n_polarization}</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_67n_polarization}</div>
                    
                    <div className="comparison-label"><strong>67N</strong> - MTA (Ângulo Torque Máx.)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_67n_mta}°</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_67n_mta}°</div>
                    
                    <div className="comparison-label"><strong>67N</strong> - RCA (Ângulo Característico)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_67n_rca}°</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_67n_rca}°</div>
                    
                    <div className="comparison-label"><strong>67N</strong> - Curva / TMS</div>
                    <div className="comparison-value local">{results.terminal_A.curve_67n.type} / {results.terminal_A.curve_67n.TMS}</div>
                    <div className="comparison-value remote">{results.terminal_B.curve_67n.type} / {results.terminal_B.curve_67n.TMS}</div>
                    
                    <div className="comparison-label"><strong>67N</strong> - Tempo Instantâneo</div>
                    <div className="comparison-value local">{results.terminal_A.time_67n_inst} s</div>
                    <div className="comparison-value remote">{results.terminal_B.time_67n_inst} s</div>
                    
                    <div className="comparison-label"><strong>K₀</strong> - Fator Compensação (|K₀| ∠θ)</div>
                    <div className="comparison-value local">{results.terminal_A.k0_modulo} ∠{results.terminal_A.k0_angulo}°</div>
                    <div className="comparison-value remote">{results.terminal_B.k0_modulo} ∠{results.terminal_B.k0_angulo}°</div>
                  </div>
                  
                  <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(210,153,34,0.1)', borderRadius: '8px', borderLeft: '3px solid #d29922' }}>
                    <p style={{ fontSize: '12px', color: '#d29922', margin: 0 }}>
                      <strong>Nota:</strong> A polarização recomendada é <strong>{results.terminal_A.ansi_67n_polarization}</strong> conforme norma {projeto.norma}. 
                      V0 = Tensão Residual | I0 = Corrente Residual | V2 = Sequência Negativa | DUAL = Combinação V0+I2
                    </p>
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <div className="icon"><Shield size={20} /></div>
                    <h2>Resultados - Diferencial de Linha (87L)</h2>
                  </div>
                  
                  <div style={{ marginBottom: '16px', padding: '16px', background: 'rgba(88,166,255,0.1)', borderRadius: '8px', borderLeft: '3px solid #58a6ff' }}>
                    <p style={{ fontSize: '12px', color: '#58a6ff', margin: 0 }}>
                      <strong>Corrente de Carregamento (I charging):</strong> {results.terminal_A.i_charging_ref} A (primário) — 
                      Esta corrente capacitiva define o limite mínimo de sensibilidade da proteção diferencial.
                    </p>
                  </div>
                  
                  <div className="comparison-table">
                    <div className="comparison-header">Parâmetro</div>
                    <div className="comparison-header">Terminal A</div>
                    <div className="comparison-header">Terminal B</div>
                    
                    <div className="comparison-label"><strong>87L</strong> - In TC Primário</div>
                    <div className="comparison-value local">{results.terminal_A.in_tc_primario} A</div>
                    <div className="comparison-value remote">{results.terminal_B.in_tc_primario} A</div>
                    
                    <div className="comparison-label"><strong>87L</strong> - Pickup (Primário)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_87l_pickup} A</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_87l_pickup} A</div>
                    
                    <div className="comparison-label"><strong>87L</strong> - Pickup (% In)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_87l_pickup_pu} %</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_87l_pickup_pu} %</div>
                    
                    <div className="comparison-label"><strong>87L</strong> - Slope 1 (Baixa Corrente)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_87l_slope1} %</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_87l_slope1} %</div>
                    
                    <div className="comparison-label"><strong>87L</strong> - Slope 2 (Alta Corrente)</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_87l_slope2} %</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_87l_slope2} %</div>
                    
                    <div className="comparison-label"><strong>87L</strong> - Breakpoint</div>
                    <div className="comparison-value local">{results.terminal_A.ansi_87l_breakpoint} A</div>
                    <div className="comparison-value remote">{results.terminal_B.ansi_87l_breakpoint} A</div>
                    
                    <div className="comparison-label"><strong>87L</strong> - Tempo de Operação</div>
                    <div className="comparison-value local">{results.terminal_A.time_87l * 1000} ms</div>
                    <div className="comparison-value remote">{results.terminal_B.time_87l * 1000} ms</div>
                  </div>
                  
                  <div className="section-title">Curva Característica 87L (Conceitual)</div>
                  
                  <div style={{ background: '#0d1117', borderRadius: '8px', padding: '24px', position: 'relative', height: '220px' }}>
                    {/* Eixos */}
                    <div style={{ position: 'absolute', left: '60px', bottom: '40px', right: '24px', height: '1px', background: '#30363d' }} />
                    <div style={{ position: 'absolute', left: '60px', bottom: '40px', top: '24px', width: '1px', background: '#30363d' }} />
                    
                    {/* Labels */}
                    <div style={{ position: 'absolute', left: '8px', top: '50%', transform: 'rotate(-90deg) translateX(50%)', fontSize: '10px', color: '#6e7681', whiteSpace: 'nowrap' }}>I diferencial (Id)</div>
                    <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: '#6e7681' }}>I restrição (Ir)</div>
                    
                    {/* Região de Operação */}
                    <div style={{
                      position: 'absolute',
                      left: '60px',
                      bottom: '40px',
                      width: '0',
                      height: '0',
                      borderLeft: '200px solid transparent',
                      borderBottom: `120px solid rgba(63,185,80,0.15)`,
                      clipPath: 'polygon(0 100%, 40% 100%, 100% 40%, 100% 0, 0 0)'
                    }} />
                    
                    {/* Pickup Line */}
                    <div style={{ position: 'absolute', left: '60px', right: '24px', bottom: `${40 + (results.terminal_A.ansi_87l_pickup_pu / 100) * 100}px`, height: '2px', background: '#f97316', borderStyle: 'dashed' }}>
                      <span style={{ position: 'absolute', right: '0', top: '-16px', fontSize: '10px', color: '#f97316' }}>Pickup ({results.terminal_A.ansi_87l_pickup_pu}%)</span>
                    </div>
                    
                    {/* Slope 1 */}
                    <div style={{
                      position: 'absolute',
                      left: '60px',
                      bottom: '40px',
                      width: '100px',
                      height: '2px',
                      background: '#3fb950',
                      transform: `rotate(-${Math.atan(results.terminal_A.ansi_87l_slope1 / 100) * 180 / Math.PI}deg)`,
                      transformOrigin: 'left bottom'
                    }}>
                      <span style={{ position: 'absolute', left: '50%', top: '-16px', fontSize: '10px', color: '#3fb950', whiteSpace: 'nowrap' }}>Slope1: {results.terminal_A.ansi_87l_slope1}%</span>
                    </div>
                    
                    {/* Slope 2 */}
                    <div style={{
                      position: 'absolute',
                      left: '160px',
                      bottom: '70px',
                      width: '120px',
                      height: '2px',
                      background: '#58a6ff',
                      transform: `rotate(-${Math.atan(results.terminal_A.ansi_87l_slope2 / 100) * 180 / Math.PI}deg)`,
                      transformOrigin: 'left bottom'
                    }}>
                      <span style={{ position: 'absolute', left: '50%', top: '-16px', fontSize: '10px', color: '#58a6ff', whiteSpace: 'nowrap' }}>Slope2: {results.terminal_A.ansi_87l_slope2}%</span>
                    </div>
                    
                    {/* Legenda */}
                    <div style={{ position: 'absolute', top: '24px', right: '24px', fontSize: '10px' }}>
                      <div style={{ color: '#3fb950', marginBottom: '4px' }}>■ Região de Operação</div>
                      <div style={{ color: '#6e7681' }}>□ Região de Restrição</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* TAB 4: VALIDAÇÃO */}
        {activeTab === 4 && (
          <>
            <div className="panel">
              <div className="panel-header">
                <div className="icon"><CheckCircle size={20} /></div>
                <h2>Análise de Falta Deslizante (Sliding Fault)</h2>
              </div>
              
              {!results ? (
                <div style={{ textAlign: 'center', padding: '48px', color: '#6e7681' }}>
                  <AlertTriangle size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                  <p>Execute os cálculos na aba anterior para visualizar a validação.</p>
                </div>
              ) : (
                <>
                  <table className="results-table">
                    <thead>
                      <tr>
                        <th>Posição (%)</th>
                        <th>Distância (km)</th>
                        <th>Z Vista (A)</th>
                        <th>Zona (A)</th>
                        <th>Status (A)</th>
                        <th>Z Vista (B)</th>
                        <th>Zona (B)</th>
                        <th>Status (B)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.validation.map((row, idx) => (
                        <tr key={idx}>
                          <td><strong>{row.percent}%</strong></td>
                          <td>{row.distance_km} km</td>
                          <td>{row.terminal_A.z_seen} Ω</td>
                          <td>
                            <span className={`zone-chip ${row.terminal_A.zone.toLowerCase()}`}>
                              {row.terminal_A.zone}
                            </span>
                          </td>
                          <td className={`status-${row.terminal_A.status.toLowerCase()}`}>
                            {row.terminal_A.match ? '✓ OK' : '⚠ Verificar'}
                          </td>
                          <td>{row.terminal_B.z_seen} Ω</td>
                          <td>
                            <span className={`zone-chip ${row.terminal_B.zone.toLowerCase()}`}>
                              {row.terminal_B.zone}
                            </span>
                          </td>
                          <td className={`status-${row.terminal_B.status.toLowerCase()}`}>
                            {row.terminal_B.match ? '✓ OK' : '⚠ Verificar'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <div className="section-title">Diagrama de Zonas (Tempo x Distância)</div>
                  
                  <div className="validation-chart">
                    <div style={{ position: 'absolute', left: '60px', right: '24px', bottom: '50px', top: '24px' }}>
                      {/* Zone bars */}
                      <div style={{
                        position: 'absolute',
                        left: '0',
                        width: `${(results.terminal_A.z1_reach / results.terminal_A.z3_reach) * 100}%`,
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
                      }}>Z1 ({results.terminal_A.z1_time}s)</div>
                      
                      <div style={{
                        position: 'absolute',
                        left: '0',
                        width: `${(results.terminal_A.z2_reach / results.terminal_A.z3_reach) * 100}%`,
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
                      }}>Z2 ({results.terminal_A.z2_time}s)</div>
                      
                      <div style={{
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
                      }}>Z3 ({results.terminal_A.z3_time}s)</div>
                      
                      {/* Fault points */}
                      {results.validation.map((v, i) => (
                        <div
                          key={i}
                          style={{
                            position: 'absolute',
                            left: `${v.percent}%`,
                            bottom: v.terminal_A.zone === 'Z1' ? '175px' : v.terminal_A.zone === 'Z2' ? '115px' : '55px',
                            width: '12px',
                            height: '12px',
                            background: v.terminal_A.match ? '#3fb950' : '#f85149',
                            borderRadius: '50%',
                            transform: 'translateX(-50%)',
                            boxShadow: `0 0 8px ${v.terminal_A.match ? '#3fb950' : '#f85149'}`
                          }}
                          title={`${v.percent}%: ${v.terminal_A.z_seen}Ω → ${v.terminal_A.zone}`}
                        />
                      ))}
                    </div>
                    
                    {/* Y axis labels */}
                    <div style={{ position: 'absolute', left: '8px', top: '24px', fontSize: '10px', color: '#6e7681' }}>Tempo</div>
                    <div style={{ position: 'absolute', left: '8px', top: '50px', fontSize: '10px', color: '#6e7681' }}>{results.terminal_A.z3_time}s</div>
                    <div style={{ position: 'absolute', left: '8px', top: '110px', fontSize: '10px', color: '#6e7681' }}>{results.terminal_A.z2_time}s</div>
                    <div style={{ position: 'absolute', left: '8px', top: '165px', fontSize: '10px', color: '#6e7681' }}>{results.terminal_A.z1_time}s</div>
                    
                    {/* X axis */}
                    <div style={{ position: 'absolute', bottom: '16px', left: '60px', right: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6e7681' }}>
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                    <div style={{ position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: '#6e7681' }}>
                      Distância da Linha (%)
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* TAB 5: RELATÓRIO */}
        {activeTab === 5 && (
          <>
            <div className="panel">
              <div className="panel-header">
                <div className="icon"><FileText size={20} /></div>
                <h2>Geração de Relatório</h2>
              </div>
              
              {/* Aviso COES */}
              {projeto.norma === 'COES' && (
                <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(210,153,34,0.15)', borderRadius: '8px', borderLeft: '4px solid #d29922' }}>
                  <p style={{ fontSize: '13px', color: '#d29922', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertTriangle size={18} />
                    <strong>REQUISITO COES (PR-20):</strong> La tabla de "Sliding Fault" es OBLIGATORIA en el reporte para demostrar que en 99% de la línea la Z1 NO opera.
                  </p>
                </div>
              )}
              
              <div className="split-view">
                <div>
                  <div className="section-title">Upload do Coordenograma</div>
                  
                  <div
                    className="upload-zone"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    <div className="icon">
                      <Upload size={28} />
                    </div>
                    <h3>Arraste a imagem ou clique para selecionar</h3>
                    <p>Formatos aceitos: PNG, JPG, PDF</p>
                    {uploadedImage && (
                      <img src={uploadedImage} alt="Coordenograma" className="uploaded-preview" />
                    )}
                  </div>
                  
                  {/* Logo e Assinatura Preview */}
                  <div className="section-title" style={{ marginTop: '24px' }}>Elementos do Relatório</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ background: 'rgba(13,17,23,0.6)', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                      <p style={{ fontSize: '11px', color: '#6e7681', marginBottom: '8px' }}>Logo do Cliente</p>
                      {clientes.find(c => c.id === projeto.cliente_id)?.logo ? (
                        <img src={clientes.find(c => c.id === projeto.cliente_id)?.logo} alt="Logo" style={{ maxHeight: '60px', maxWidth: '100%' }} />
                      ) : (
                        <p style={{ fontSize: '12px', color: '#484f58' }}>Não cadastrado</p>
                      )}
                    </div>
                    <div style={{ background: 'rgba(13,17,23,0.6)', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                      <p style={{ fontSize: '11px', color: '#6e7681', marginBottom: '8px' }}>Assinatura do Engenheiro</p>
                      {engenheiros.find(e => e.id === projeto.engenheiro_id)?.assinatura ? (
                        <img src={engenheiros.find(e => e.id === projeto.engenheiro_id)?.assinatura} alt="Assinatura" style={{ maxHeight: '60px', maxWidth: '100%', background: '#fff', borderRadius: '4px', padding: '4px' }} />
                      ) : (
                        <p style={{ fontSize: '12px', color: '#484f58' }}>Não cadastrada</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="section-title">Preview do Memorial Técnico</div>
                  
                  <div className="report-preview" style={{ maxHeight: '700px', overflowY: 'auto' }}>
                    {results ? (() => {
                      const report = generateFullReport();
                      if (!report) return null;
                      
                      // Função para renderizar texto com negrito (remove ** e aplica <strong>)
                      const renderBold = (text) => {
                        if (!text) return '';
                        const parts = text.split(/\*\*(.*?)\*\*/g);
                        return parts.map((part, i) => 
                          i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                        );
                      };
                      
                      return (
                        <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: '11px', lineHeight: '1.6' }}>
                          
                          {/* ═══════════════ 1. CAPA ═══════════════ */}
                          <div style={{ textAlign: 'center', marginBottom: '24px', paddingBottom: '20px', borderBottom: '3px solid #f97316' }}>
                            {report.secao_1_capa.conteudo.cliente_logo && (
                              <img src={report.secao_1_capa.conteudo.cliente_logo} alt="Logo" style={{ maxHeight: '50px', marginBottom: '12px' }} />
                            )}
                            <h1 style={{ fontSize: '14px', color: '#f97316', marginBottom: '4px' }}>
                              {report.documento.titulo}
                            </h1>
                            <p style={{ fontSize: '12px', color: '#8b949e' }}>{report.secao_1_capa.conteudo.projeto}</p>
                            <p style={{ fontSize: '10px', color: '#6e7681', marginTop: '8px' }}>
                              {report.documento.versao} | {report.documento.data}
                            </p>
                            <div style={{ marginTop: '12px', fontSize: '10px', color: '#8b949e' }}>
                              <p><strong>Cliente:</strong> {report.secao_1_capa.conteudo.cliente}</p>
                              <p><strong>Responsável:</strong> {report.secao_1_capa.conteudo.responsavel_tecnico} ({report.secao_1_capa.conteudo.responsavel_crea})</p>
                            </div>
                          </div>

                          {/* ═══════════════ 2. OBJETIVO ═══════════════ */}
                          <div style={{ marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '12px', color: '#58a6ff', marginBottom: '6px', borderBottom: '1px solid #21262d', paddingBottom: '4px' }}>
                              2. Objetivo
                            </h3>
                            <p style={{ color: '#c9d1d9', fontSize: '10px', textAlign: 'justify' }}>
                              {report.secao_2_objetivo.texto}
                            </p>
                          </div>

                          {/* ═══════════════ 3. ESCOPO ═══════════════ */}
                          <div style={{ marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '12px', color: '#58a6ff', marginBottom: '6px', borderBottom: '1px solid #21262d', paddingBottom: '4px' }}>
                              3. Escopo
                            </h3>
                            <p style={{ color: '#c9d1d9', fontSize: '10px', marginBottom: '8px' }}>{report.secao_3_escopo.texto}</p>
                            <ul style={{ color: '#8b949e', fontSize: '9px', marginLeft: '16px', marginBottom: '12px' }}>
                              {report.secao_3_escopo.lista_funcoes.map((f, i) => (
                                <li key={i} style={{ marginBottom: '2px' }}>{f}</li>
                              ))}
                            </ul>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                              <div style={{ background: 'rgba(63,185,80,0.1)', padding: '8px', borderRadius: '4px', borderLeft: '2px solid #3fb950' }}>
                                <p style={{ fontSize: '9px', color: '#3fb950', marginBottom: '2px', fontWeight: '600' }}>Terminal A: {report.secao_3_escopo.equipamentos.terminal_a.nome}</p>
                                <p style={{ fontSize: '9px', color: '#8b949e' }}>Relé: {report.secao_3_escopo.equipamentos.terminal_a.rele}</p>
                              </div>
                              <div style={{ background: 'rgba(163,113,247,0.1)', padding: '8px', borderRadius: '4px', borderLeft: '2px solid #a371f7' }}>
                                <p style={{ fontSize: '9px', color: '#a371f7', marginBottom: '2px', fontWeight: '600' }}>Terminal B: {report.secao_3_escopo.equipamentos.terminal_b.nome}</p>
                                <p style={{ fontSize: '9px', color: '#8b949e' }}>Relé: {report.secao_3_escopo.equipamentos.terminal_b.rele}</p>
                              </div>
                            </div>
                          </div>

                          {/* ═══════════════ 4. DOCUMENTOS NORMATIVOS ═══════════════ */}
                          <div style={{ marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '12px', color: '#58a6ff', marginBottom: '6px', borderBottom: '1px solid #21262d', paddingBottom: '4px' }}>
                              4. Documentos Normativos e de Referência
                            </h3>
                            <p style={{ color: '#c9d1d9', fontSize: '10px', marginBottom: '6px' }}>{report.secao_4_normas.texto}</p>
                            <ul style={{ color: '#8b949e', fontSize: '9px', marginLeft: '16px' }}>
                              {report.secao_4_normas.normas_aplicadas.map((n, i) => (
                                <li key={i} style={{ marginBottom: '2px' }}>{n}</li>
                              ))}
                            </ul>
                          </div>

                          {/* ═══════════════ 5. DESENVOLVIMENTO METODOLÓGICO ═══════════════ */}
                          <div style={{ marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '12px', color: '#58a6ff', marginBottom: '6px', borderBottom: '1px solid #21262d', paddingBottom: '4px' }}>
                              5. Desenvolvimento Metodológico
                            </h3>
                            <p style={{ color: '#8b949e', fontSize: '10px', marginBottom: '12px' }}>{report.secao_5_metodologia.intro}</p>
                            
                            {/* 5.1 Proteção de Distância */}
                            <div style={{ marginLeft: '8px', marginBottom: '14px' }}>
                              <h4 style={{ fontSize: '11px', color: '#3fb950', marginBottom: '6px' }}>
                                5.1. Proteção de Distância (21/21N)
                              </h4>
                              <p style={{ color: '#8b949e', fontSize: '9px', marginBottom: '8px' }}>
                                {report.secao_5_metodologia.subsecao_21.conceito}
                              </p>
                              
                              {/* Zona 1 */}
                              <div style={{ background: 'rgba(63,185,80,0.1)', padding: '10px', borderRadius: '4px', marginBottom: '6px', borderLeft: '3px solid #3fb950' }}>
                                <strong style={{ color: '#3fb950', fontSize: '10px' }}>Zona 1 (Subalcance)</strong>
                                <p style={{ color: '#c9d1d9', fontSize: '9px', marginTop: '4px' }}>
                                  {renderBold(report.secao_5_metodologia.subsecao_21.zona_1.texto)}
                                </p>
                                <p style={{ color: '#6e7681', fontSize: '9px', marginTop: '6px' }}>
                                  Alcance A: <span style={{ color: '#3fb950' }}>{report.secao_5_metodologia.subsecao_21.zona_1.alcance_a} Ω</span> | 
                                  Alcance B: <span style={{ color: '#a371f7' }}>{report.secao_5_metodologia.subsecao_21.zona_1.alcance_b} Ω</span> | 
                                  Tempo: {report.secao_5_metodologia.subsecao_21.zona_1.tempo}s
                                </p>
                              </div>
                              
                              {/* Zona 2 */}
                              <div style={{ background: 'rgba(88,166,255,0.1)', padding: '10px', borderRadius: '4px', marginBottom: '6px', borderLeft: '3px solid #58a6ff' }}>
                                <strong style={{ color: '#58a6ff', fontSize: '10px' }}>Zona 2 (Sobrealcance)</strong>
                                <p style={{ color: '#c9d1d9', fontSize: '9px', marginTop: '4px' }}>
                                  {renderBold(report.secao_5_metodologia.subsecao_21.zona_2.texto)}
                                </p>
                                <p style={{ color: '#6e7681', fontSize: '9px', marginTop: '6px' }}>
                                  Alcance A: <span style={{ color: '#3fb950' }}>{report.secao_5_metodologia.subsecao_21.zona_2.alcance_a} Ω</span> | 
                                  Alcance B: <span style={{ color: '#a371f7' }}>{report.secao_5_metodologia.subsecao_21.zona_2.alcance_b} Ω</span> | 
                                  Tempo: {report.secao_5_metodologia.subsecao_21.zona_2.tempo}s
                                </p>
                              </div>
                              
                              {/* Zona 3 */}
                              <div style={{ background: 'rgba(210,153,34,0.1)', padding: '10px', borderRadius: '4px', marginBottom: '6px', borderLeft: '3px solid #d29922' }}>
                                <strong style={{ color: '#d29922', fontSize: '10px' }}>Zona 3 (Retaguarda)</strong>
                                <p style={{ color: '#c9d1d9', fontSize: '9px', marginTop: '4px' }}>
                                  {renderBold(report.secao_5_metodologia.subsecao_21.zona_3.texto)}
                                </p>
                                <p style={{ color: '#6e7681', fontSize: '9px', marginTop: '6px' }}>
                                  Alcance A: <span style={{ color: '#3fb950' }}>{report.secao_5_metodologia.subsecao_21.zona_3.alcance_a} Ω</span> | 
                                  Alcance B: <span style={{ color: '#a371f7' }}>{report.secao_5_metodologia.subsecao_21.zona_3.alcance_b} Ω</span> | 
                                  Tempo: {report.secao_5_metodologia.subsecao_21.zona_3.tempo}s
                                </p>
                              </div>
                              
                              {/* K0 */}
                              <div style={{ background: 'rgba(163,113,247,0.1)', padding: '10px', borderRadius: '4px', borderLeft: '3px solid #a371f7' }}>
                                <strong style={{ color: '#a371f7', fontSize: '10px' }}>Compensação K0</strong>
                                <p style={{ color: '#c9d1d9', fontSize: '9px', marginTop: '4px' }}>
                                  {report.secao_5_metodologia.subsecao_21.compensacao_k0.texto}
                                </p>
                                <p style={{ color: '#6e7681', fontSize: '9px', marginTop: '6px' }}>
                                  Terminal A: |K0| = {report.secao_5_metodologia.subsecao_21.compensacao_k0.modulo_a} ∠{report.secao_5_metodologia.subsecao_21.compensacao_k0.angulo_a}° | 
                                  Terminal B: |K0| = {report.secao_5_metodologia.subsecao_21.compensacao_k0.modulo_b} ∠{report.secao_5_metodologia.subsecao_21.compensacao_k0.angulo_b}°
                                </p>
                              </div>
                            </div>
                            
                            {/* 5.2 Diferencial 87L */}
                            <div style={{ marginLeft: '8px', marginBottom: '14px' }}>
                              <h4 style={{ fontSize: '11px', color: '#3fb950', marginBottom: '6px' }}>
                                5.2. Proteção Diferencial de Linha (87L)
                              </h4>
                              <p style={{ color: '#8b949e', fontSize: '9px', marginBottom: '6px' }}>{report.secao_5_metodologia.subsecao_87l.conceito}</p>
                              <div style={{ background: 'rgba(88,166,255,0.08)', padding: '8px', borderRadius: '4px', fontSize: '9px', color: '#8b949e' }}>
                                <p><strong>I_charging:</strong> {report.secao_5_metodologia.subsecao_87l.compensacao_carga.texto}</p>
                                <p style={{ marginTop: '4px' }}>
                                  Pickup A: {report.secao_5_metodologia.subsecao_87l.ajustes.pickup_a} A ({report.secao_5_metodologia.subsecao_87l.ajustes.pickup_pu_a}% In) | 
                                  Slope 1: {report.secao_5_metodologia.subsecao_87l.ajustes.slope_1}% | 
                                  Slope 2: {report.secao_5_metodologia.subsecao_87l.ajustes.slope_2}%
                                </p>
                              </div>
                            </div>
                            
                            {/* 5.3 67N */}
                            <div style={{ marginLeft: '8px', marginBottom: '14px' }}>
                              <h4 style={{ fontSize: '11px', color: '#3fb950', marginBottom: '6px' }}>
                                5.3. Sobrecorrente Direcional de Terra (67N)
                              </h4>
                              <p style={{ color: '#8b949e', fontSize: '9px', marginBottom: '4px' }}>{report.secao_5_metodologia.subsecao_67n.conceito}</p>
                              <p style={{ color: '#8b949e', fontSize: '9px' }}>{renderBold(report.secao_5_metodologia.subsecao_67n.polarizacao.texto)}</p>
                            </div>
                            
                            {/* 5.4 50/51 */}
                            <div style={{ marginLeft: '8px' }}>
                              <h4 style={{ fontSize: '11px', color: '#3fb950', marginBottom: '6px' }}>
                                5.4. Sobrecorrente de Fase (50/51)
                              </h4>
                              <p style={{ color: '#8b949e', fontSize: '9px', marginBottom: '4px' }}>{report.secao_5_metodologia.subsecao_50_51.conceito}</p>
                              <p style={{ color: '#8b949e', fontSize: '9px' }}>
                                <strong>51:</strong> {report.secao_5_metodologia.subsecao_50_51.unidade_51.texto}
                              </p>
                              <p style={{ color: '#8b949e', fontSize: '9px' }}>
                                <strong>50:</strong> {report.secao_5_metodologia.subsecao_50_51.unidade_50.texto}
                              </p>
                            </div>
                          </div>

                          {/* ═══════════════ 6. ANÁLISE DOS RESULTADOS ═══════════════ */}
                          <div style={{ marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '12px', color: '#58a6ff', marginBottom: '6px', borderBottom: '1px solid #21262d', paddingBottom: '4px' }}>
                              6. Análise dos Resultados
                            </h3>
                            <p style={{ color: '#8b949e', fontSize: '10px', marginBottom: '8px' }}>{report.secao_6_analise.intro}</p>
                            
                            {/* Aviso COES */}
                            {report.secao_6_analise.analise_critica_cobertura.validacao_obrigatoria && (
                              <div style={{ background: 'rgba(210,153,34,0.15)', padding: '10px', borderRadius: '6px', marginBottom: '10px', border: '1px solid #d29922' }}>
                                <p style={{ color: '#d29922', fontSize: '10px', margin: 0 }}>
                                  ⚠️ <strong>VALIDAÇÃO OBRIGATÓRIA COES (PR-20):</strong> A tabela de Sliding Fault é mandatória para demonstrar que em 99% da linha a Z1 NÃO opera.
                                </p>
                              </div>
                            )}
                            
                            <p style={{ color: '#c9d1d9', fontSize: '9px', marginBottom: '8px' }}>
                              {report.secao_6_analise.analise_critica_cobertura.texto}
                            </p>
                            
                            {/* Tabela Sliding Fault */}
                            <table style={{ width: '100%', fontSize: '8px', borderCollapse: 'collapse', marginTop: '8px' }}>
                              <thead>
                                <tr style={{ background: 'rgba(48,54,61,0.5)' }}>
                                  <th style={{ padding: '4px', textAlign: 'center', color: '#8b949e', borderBottom: '1px solid #30363d' }}>%</th>
                                  <th style={{ padding: '4px', textAlign: 'center', color: '#8b949e', borderBottom: '1px solid #30363d' }}>km</th>
                                  <th style={{ padding: '4px', textAlign: 'center', color: '#8b949e', borderBottom: '1px solid #30363d' }}>Z Vista A</th>
                                  <th style={{ padding: '4px', textAlign: 'center', color: '#8b949e', borderBottom: '1px solid #30363d' }}>Zona A</th>
                                  <th style={{ padding: '4px', textAlign: 'center', color: '#8b949e', borderBottom: '1px solid #30363d' }}>Z Vista B</th>
                                  <th style={{ padding: '4px', textAlign: 'center', color: '#8b949e', borderBottom: '1px solid #30363d' }}>Zona B</th>
                                </tr>
                              </thead>
                              <tbody>
                                {report.secao_6_analise.analise_critica_cobertura.validacao.map((v, i) => (
                                  <tr key={i} style={{ borderBottom: '1px solid #21262d' }}>
                                    <td style={{ padding: '3px', textAlign: 'center', color: '#c9d1d9' }}>{v.percent}%</td>
                                    <td style={{ padding: '3px', textAlign: 'center', color: '#8b949e' }}>{v.distance_km}</td>
                                    <td style={{ padding: '3px', textAlign: 'center', color: '#c9d1d9' }}>{v.terminal_A.z_seen} Ω</td>
                                    <td style={{ padding: '3px', textAlign: 'center', color: v.terminal_A.zone === 'Z1' ? '#3fb950' : v.terminal_A.zone === 'Z2' ? '#58a6ff' : '#d29922', fontWeight: '600' }}>{v.terminal_A.zone}</td>
                                    <td style={{ padding: '3px', textAlign: 'center', color: '#c9d1d9' }}>{v.terminal_B.z_seen} Ω</td>
                                    <td style={{ padding: '3px', textAlign: 'center', color: v.terminal_B.zone === 'Z1' ? '#3fb950' : v.terminal_B.zone === 'Z2' ? '#58a6ff' : '#d29922', fontWeight: '600' }}>{v.terminal_B.zone}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* ═══════════════ 7. RECOMENDAÇÕES ═══════════════ */}
                          <div style={{ marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '12px', color: '#58a6ff', marginBottom: '6px', borderBottom: '1px solid #21262d', paddingBottom: '4px' }}>
                              7. Recomendações
                            </h3>
                            <ul style={{ color: '#8b949e', fontSize: '9px', marginLeft: '16px' }}>
                              {report.secao_7_recomendacoes.lista.map((r, i) => (
                                <li key={i} style={{ marginBottom: '3px' }}>{r}</li>
                              ))}
                            </ul>
                          </div>

                          {/* ═══════════════ 8. CONCLUSÕES ═══════════════ */}
                          <div style={{ marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '12px', color: '#58a6ff', marginBottom: '6px', borderBottom: '1px solid #21262d', paddingBottom: '4px' }}>
                              8. Conclusões
                            </h3>
                            <p style={{ color: '#c9d1d9', fontSize: '10px', textAlign: 'justify' }}>
                              {report.secao_8_conclusoes.texto}
                            </p>
                          </div>

                          {/* ═══════════════ TABELA SEL-421 (WORD BITS) ═══════════════ */}
                          {(() => {
                            const releA = reles.find(r => r.id === projeto.rele_a_id);
                            const releB = reles.find(r => r.id === projeto.rele_b_id);
                            // Verificação mais robusta - aceita 'SEL-421', 'sel-421', '421', etc.
                            const isSEL421A = releA && (releA.modelo?.toUpperCase().includes('421') || releA.modelo?.toUpperCase().includes('SEL-421'));
                            const isSEL421B = releB && (releB.modelo?.toUpperCase().includes('421') || releB.modelo?.toUpperCase().includes('SEL-421'));
                            const isSEL421 = isSEL421A || isSEL421B;
                            
                            if (!isSEL421) return null;
                            
                            const termA = results.terminal_A;
                            const termB = results.terminal_B;
                            
                            return (
                              <div style={{ marginBottom: '16px', background: 'linear-gradient(135deg, rgba(0,102,204,0.1) 0%, rgba(0,102,204,0.02) 100%)', borderRadius: '8px', padding: '12px', border: '1px solid rgba(0,102,204,0.3)' }}>
                                <h3 style={{ fontSize: '12px', color: '#0066cc', marginBottom: '10px', borderBottom: '2px solid #0066cc', paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  📋 Tabela de Ajustes - SEL-421 (Word Bits)
                                </h3>
                                <p style={{ color: '#8b949e', fontSize: '9px', marginBottom: '12px' }}>
                                  Parâmetros mapeados para células de configuração do relé SEL-421
                                </p>
                                
                                {/* Proteção de Distância */}
                                <div style={{ marginBottom: '10px' }}>
                                  <h4 style={{ fontSize: '10px', color: '#4caf50', marginBottom: '6px' }}>🔷 Proteção de Distância (21/21N)</h4>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', fontSize: '8px' }}>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px', borderLeft: '3px solid #4caf50' }}>
                                      <strong style={{ color: '#4caf50' }}>Z1MAG</strong>
                                      <div style={{ color: '#c9d1d9' }}>A: {termA.z1_reach} Ω</div>
                                      <div style={{ color: '#a371f7' }}>B: {termB.z1_reach} Ω</div>
                                    </div>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px', borderLeft: '3px solid #2196f3' }}>
                                      <strong style={{ color: '#2196f3' }}>Z2MAG</strong>
                                      <div style={{ color: '#c9d1d9' }}>A: {termA.z2_reach} Ω</div>
                                      <div style={{ color: '#a371f7' }}>B: {termB.z2_reach} Ω</div>
                                    </div>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px', borderLeft: '3px solid #ff9800' }}>
                                      <strong style={{ color: '#ff9800' }}>Z3MAG</strong>
                                      <div style={{ color: '#c9d1d9' }}>A: {termA.z3_reach} Ω</div>
                                      <div style={{ color: '#a371f7' }}>B: {termB.z3_reach} Ω</div>
                                    </div>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px', borderLeft: '3px solid #a855f7' }}>
                                      <strong style={{ color: '#a855f7' }}>Z4MAG (Rev)</strong>
                                      <div style={{ color: '#c9d1d9' }}>A: {termA.z4_reach} Ω</div>
                                      <div style={{ color: '#a371f7' }}>B: {termB.z4_reach} Ω</div>
                                    </div>
                                  </div>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', fontSize: '8px', marginTop: '4px' }}>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px', borderLeft: '3px solid #22c55e' }}>
                                      <strong style={{ color: '#22c55e' }}>k0MAG</strong>
                                      <span style={{ color: '#c9d1d9', marginLeft: '8px' }}>A: {termA.k0_modulo} pu | B: {termB.k0_modulo} pu</span>
                                    </div>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px', borderLeft: '3px solid #22c55e' }}>
                                      <strong style={{ color: '#22c55e' }}>k0ANG</strong>
                                      <span style={{ color: '#c9d1d9', marginLeft: '8px' }}>A: {termA.k0_angulo}° | B: {termB.k0_angulo}°</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* CT/PT */}
                                <div style={{ marginBottom: '10px' }}>
                                  <h4 style={{ fontSize: '10px', color: '#2196f3', marginBottom: '6px' }}>🔷 Transformadores (CT/PT)</h4>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', fontSize: '8px' }}>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px' }}>
                                      <strong style={{ color: '#2196f3' }}>CTRW</strong>
                                      <span style={{ color: '#c9d1d9', marginLeft: '8px' }}>A: {terminalA.rtc} | B: {terminalB.rtc}</span>
                                    </div>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px' }}>
                                      <strong style={{ color: '#2196f3' }}>PTRY</strong>
                                      <span style={{ color: '#c9d1d9', marginLeft: '8px' }}>A: {terminalA.rtp} | B: {terminalB.rtp}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Sobrecorrente */}
                                <div style={{ marginBottom: '10px' }}>
                                  <h4 style={{ fontSize: '10px', color: '#f44336', marginBottom: '6px' }}>🔷 Sobrecorrente (50/51/67)</h4>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', fontSize: '8px' }}>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px' }}>
                                      <strong style={{ color: '#f44336' }}>51S1P</strong>
                                      <div style={{ color: '#c9d1d9' }}>A: {termA.ansi_51_pickup} A</div>
                                      <div style={{ color: '#a371f7' }}>B: {termB.ansi_51_pickup} A</div>
                                    </div>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px' }}>
                                      <strong style={{ color: '#f44336' }}>50P1P</strong>
                                      <div style={{ color: '#c9d1d9' }}>A: {termA.ansi_50_pickup} A</div>
                                      <div style={{ color: '#a371f7' }}>B: {termB.ansi_50_pickup} A</div>
                                    </div>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px' }}>
                                      <strong style={{ color: '#9c27b0' }}>67G1P</strong>
                                      <div style={{ color: '#c9d1d9' }}>A: {termA.ansi_67n_pickup_fwd} A</div>
                                      <div style={{ color: '#a371f7' }}>B: {termB.ansi_67n_pickup_fwd} A</div>
                                    </div>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px' }}>
                                      <strong style={{ color: '#9c27b0' }}>67G1MTA</strong>
                                      <div style={{ color: '#c9d1d9' }}>{termA.ansi_67n_mta}°</div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* 87L */}
                                <div style={{ marginBottom: '6px' }}>
                                  <h4 style={{ fontSize: '10px', color: '#00bcd4', marginBottom: '6px' }}>🔷 Diferencial (87L)</h4>
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', fontSize: '8px' }}>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px' }}>
                                      <strong style={{ color: '#00bcd4' }}>87LPP</strong>
                                      <div style={{ color: '#c9d1d9' }}>A: {termA.ansi_87l_pickup} A</div>
                                      <div style={{ color: '#a371f7' }}>B: {termB.ansi_87l_pickup} A</div>
                                    </div>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px' }}>
                                      <strong style={{ color: '#00bcd4' }}>87LS1</strong>
                                      <div style={{ color: '#c9d1d9' }}>{termA.ansi_87l_slope1}%</div>
                                    </div>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px' }}>
                                      <strong style={{ color: '#00bcd4' }}>87LS2</strong>
                                      <div style={{ color: '#c9d1d9' }}>{termA.ansi_87l_slope2}%</div>
                                    </div>
                                    <div style={{ background: '#161b22', padding: '4px', borderRadius: '4px' }}>
                                      <strong style={{ color: '#00bcd4' }}>EICHG</strong>
                                      <div style={{ color: '#c9d1d9' }}>{termA.i_charging_ref} A</div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div style={{ background: 'rgba(255,152,0,0.1)', border: '1px solid #ff9800', borderRadius: '4px', padding: '6px', marginTop: '8px' }}>
                                  <p style={{ color: '#ff9800', fontSize: '8px', margin: 0 }}>
                                    ⚠️ Valores em Ω secundários (K = RTC/RTP) e Amperes secundários. Ver tabela completa no HTML exportado.
                                  </p>
                                </div>
                              </div>
                            );
                          })()}

                          {/* ═══════════════ 9. BIBLIOGRAFIA ═══════════════ */}
                          <div style={{ marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '12px', color: '#58a6ff', marginBottom: '6px', borderBottom: '1px solid #21262d', paddingBottom: '4px' }}>
                              9. Bibliografia
                            </h3>
                            <ul style={{ color: '#8b949e', fontSize: '9px', marginLeft: '16px' }}>
                              {report.secao_9_bibliografia.lista.map((b, i) => (
                                <li key={i} style={{ marginBottom: '2px' }}>{b}</li>
                              ))}
                            </ul>
                          </div>

                          {/* ═══════════════ 10. APÊNDICES ═══════════════ */}
                          <div style={{ marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '12px', color: '#58a6ff', marginBottom: '6px', borderBottom: '1px solid #21262d', paddingBottom: '4px' }}>
                              10. Apêndices
                            </h3>
                            <ul style={{ color: '#8b949e', fontSize: '9px', marginLeft: '16px' }}>
                              {report.secao_10_apendices.conteudo.map((a, i) => (
                                <li key={i} style={{ marginBottom: '2px' }}>{a}</li>
                              ))}
                            </ul>
                          </div>

                          {/* ═══════════════ COORDENOGRAMA ANEXADO ═══════════════ */}
                          {uploadedImage && (
                            <div style={{ marginBottom: '16px', background: 'linear-gradient(135deg, rgba(0,102,204,0.1) 0%, rgba(0,102,204,0.02) 100%)', borderRadius: '8px', padding: '12px', border: '1px solid rgba(0,102,204,0.3)' }}>
                              <h3 style={{ fontSize: '12px', color: '#0066cc', marginBottom: '8px', borderBottom: '2px solid #0066cc', paddingBottom: '4px' }}>
                                📊 Apêndice D: Coordenograma R-X
                              </h3>
                              <div style={{ textAlign: 'center', padding: '12px', background: '#161b22', borderRadius: '6px' }}>
                                <img 
                                  src={uploadedImage} 
                                  alt="Coordenograma R-X" 
                                  style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '4px', border: '1px solid #30363d' }} 
                                />
                                <p style={{ color: '#8b949e', fontSize: '9px', marginTop: '8px', fontStyle: 'italic' }}>
                                  Figura: Coordenograma R-X - {projeto.linha_nome || 'Linha de Transmissão'}
                                </p>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', marginTop: '10px', fontSize: '8px' }}>
                                <div style={{ background: '#161b22', padding: '6px', borderRadius: '4px' }}>
                                  <span style={{ color: '#8b949e' }}>Linha:</span>{' '}
                                  <span style={{ color: '#58a6ff' }}>{projeto.linha_nome} | {projeto.linha_comprimento} km</span>
                                </div>
                                <div style={{ background: '#161b22', padding: '6px', borderRadius: '4px' }}>
                                  <span style={{ color: '#8b949e' }}>Zonas:</span>{' '}
                                  <span style={{ color: '#4caf50' }}>Z1={zonasProtecao.z1_percent}%</span>{' | '}
                                  <span style={{ color: '#2196f3' }}>Z2={zonasProtecao.z2_percent}%</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Assinatura */}
                          {report.secao_1_capa.conteudo.responsavel_assinatura && (
                            <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #21262d' }}>
                              <img src={report.secao_1_capa.conteudo.responsavel_assinatura} alt="Assinatura" style={{ maxHeight: '40px', background: '#fff', borderRadius: '4px', padding: '4px' }} />
                              <p style={{ color: '#8b949e', fontSize: '9px', marginTop: '4px' }}>
                                {report.secao_1_capa.conteudo.responsavel_tecnico}<br />
                                {report.secao_1_capa.conteudo.responsavel_crea}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })() : (
                      <div style={{ textAlign: 'center', padding: '48px', color: '#6e7681' }}>
                        <Calculator size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                        <p>Execute os cálculos na aba "Cálculos" para gerar o memorial técnico.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="actions-bar">
                <button className="btn btn-primary" disabled={!results} onClick={exportHTML}>
                  <Download size={18} />
                  Exportar HTML
                </button>
                <button className="btn btn-secondary" disabled={!results} onClick={exportJSON}>
                  <Download size={18} />
                  Exportar JSON
                </button>
                <button className="btn btn-secondary" disabled={!results} onClick={exportCSV}>
                  <Download size={18} />
                  Exportar CSV
                </button>
              </div>
            </div>
          </>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════════════ */}
        {/* TAB 6: COORDENOGRAMA R-X */}
        {/* ═══════════════════════════════════════════════════════════════════════════════ */}
        {activeTab === 6 && (
          <>
            <div className="tab-header">
              <Activity size={28} />
              <div>
                <h2>Coordenograma R-X</h2>
                <p>Diagrama de impedância com zonas de proteção Mho</p>
              </div>
            </div>

            <div className="content-grid" style={{ gridTemplateColumns: '350px 1fr' }}>
              {/* Painel de Controle */}
              <div className="card">
                <div className="card-header">
                  <Settings size={20} />
                  <span>Configurações</span>
                </div>
                <div className="card-content">
                  <div className="form-group">
                    <label>Exibir Zonas</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                      <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={coordConfig.showZ1} onChange={e => setCoordConfig({...coordConfig, showZ1: e.target.checked})} />
                        <span style={{ color: '#4caf50' }}>Z1</span>
                      </label>
                      <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={coordConfig.showZ2} onChange={e => setCoordConfig({...coordConfig, showZ2: e.target.checked})} />
                        <span style={{ color: '#2196f3' }}>Z2</span>
                      </label>
                      <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={coordConfig.showZ3} onChange={e => setCoordConfig({...coordConfig, showZ3: e.target.checked})} />
                        <span style={{ color: '#ff9800' }}>Z3</span>
                      </label>
                      <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={coordConfig.showGrid} onChange={e => setCoordConfig({...coordConfig, showGrid: e.target.checked})} />
                        <span>Grid</span>
                      </label>
                      <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={coordConfig.showLabels} onChange={e => setCoordConfig({...coordConfig, showLabels: e.target.checked})} />
                        <span>Labels</span>
                      </label>
                    </div>
                  </div>

                  <div className="divider" style={{ borderTop: '1px solid #30363d', margin: '16px 0' }}></div>

                  <div className="form-group">
                    <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Pontos de Falta</span>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '4px 8px', fontSize: '12px' }}
                        onClick={() => setCoordFaltas([...coordFaltas, { 
                          id: Date.now(), 
                          nome: `F${coordFaltas.length + 1}`, 
                          local_pct: 50, 
                          rf_pri: 0, 
                          tipo: '3PH', 
                          ativo: true 
                        }])}
                      >
                        <Plus size={14} /> Add
                      </button>
                    </label>
                  </div>

                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {coordFaltas.map((falta, idx) => (
                      <div key={falta.id} style={{ 
                        background: falta.ativo ? 'rgba(249,115,22,0.1)' : 'rgba(128,128,128,0.1)', 
                        border: `1px solid ${falta.ativo ? '#f97316' : '#555'}`,
                        borderRadius: '8px', 
                        padding: '10px', 
                        marginBottom: '8px' 
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <input 
                            type="text" 
                            value={falta.nome} 
                            onChange={e => {
                              const updated = [...coordFaltas];
                              updated[idx].nome = e.target.value;
                              setCoordFaltas(updated);
                            }}
                            style={{ width: '60px', padding: '4px', background: '#161b22', border: '1px solid #30363d', borderRadius: '4px', color: '#e6edf3' }}
                          />
                          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                            <input 
                              type="checkbox" 
                              checked={falta.ativo} 
                              onChange={e => {
                                const updated = [...coordFaltas];
                                updated[idx].ativo = e.target.checked;
                                setCoordFaltas(updated);
                              }}
                            />
                            Ativo
                          </label>
                          <button 
                            onClick={() => setCoordFaltas(coordFaltas.filter(f => f.id !== falta.id))}
                            style={{ background: 'none', border: 'none', color: '#f85149', cursor: 'pointer' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                          <div>
                            <label style={{ fontSize: '10px', color: '#8b949e' }}>Local (%)</label>
                            <input 
                              type="number" 
                              value={falta.local_pct} 
                              onChange={e => {
                                const updated = [...coordFaltas];
                                updated[idx].local_pct = parseFloat(e.target.value) || 0;
                                setCoordFaltas(updated);
                              }}
                              style={{ width: '100%', padding: '4px', background: '#161b22', border: '1px solid #30363d', borderRadius: '4px', color: '#e6edf3' }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '10px', color: '#8b949e' }}>Rf (Ω pri)</label>
                            <input 
                              type="number" 
                              value={falta.rf_pri} 
                              onChange={e => {
                                const updated = [...coordFaltas];
                                updated[idx].rf_pri = parseFloat(e.target.value) || 0;
                                setCoordFaltas(updated);
                              }}
                              style={{ width: '100%', padding: '4px', background: '#161b22', border: '1px solid #30363d', borderRadius: '4px', color: '#e6edf3' }}
                            />
                          </div>
                        </div>
                        <div style={{ marginTop: '6px' }}>
                          <label style={{ fontSize: '10px', color: '#8b949e' }}>Tipo</label>
                          <select 
                            value={falta.tipo} 
                            onChange={e => {
                              const updated = [...coordFaltas];
                              updated[idx].tipo = e.target.value;
                              setCoordFaltas(updated);
                            }}
                            style={{ width: '100%', padding: '4px', background: '#161b22', border: '1px solid #30363d', borderRadius: '4px', color: '#e6edf3' }}
                          >
                            <option value="3PH">Trifásico (3PH)</option>
                            <option value="2PH">Bifásico (2PH)</option>
                            <option value="1PH">Monofásico (1PH)</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Info dos Resultados */}
                  {results && (
                    <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(88,166,255,0.1)', borderRadius: '8px', border: '1px solid #58a6ff' }}>
                      <h4 style={{ color: '#58a6ff', marginBottom: '8px', fontSize: '12px' }}>📊 Dados Calculados</h4>
                      <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: '#8b949e' }}>
                        <div>Z1 Linha: {results.terminal_A.z1_reach} Ω (sec)</div>
                        <div>Z2 Linha: {results.terminal_A.z2_reach} Ω (sec)</div>
                        <div>Z3 Linha: {results.terminal_A.z3_reach} Ω (sec)</div>
                        <div>K0: {results.terminal_A.k0_modulo} ∠{results.terminal_A.k0_angulo}°</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Área do Gráfico SVG */}
              <div className="card">
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Activity size={20} />
                    <span>Diagrama R-X (Impedância)</span>
                  </div>
                  {results && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn btn-primary" 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                        onClick={() => {
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
                              canvas.toBlob((blob) => {
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
                            
                            img.onerror = (e) => {
                              console.error('Erro ao carregar imagem:', e);
                              // Fallback: baixar como SVG
                              const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
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
                        }}
                      >
                        <Download size={14} />
                        PNG
                      </button>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                        onClick={() => {
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
                          const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                          const url = URL.createObjectURL(svgBlob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `Coordenograma_${projeto.linha_nome || 'LT'}_${new Date().toISOString().split('T')[0]}.svg`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        }}
                      >
                        <Download size={14} />
                        SVG
                      </button>
                    </div>
                  )}
                </div>
                <div className="card-content" style={{ padding: '0' }}>
                  {results ? (
                    (() => {
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
                      const zLinhaTotal = Math.sqrt(linha.R1**2 + linha.X1**2) * projeto.linha_comprimento * fator;
                      
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
                        const effectiveAngle = isReverse ? (lineAngleRad + Math.PI) : lineAngleRad;
                        
                        // Centro do círculo MHO
                        const centerR = originR + radius * Math.cos(effectiveAngle);
                        const centerX = originX + radius * Math.sin(effectiveAngle);
                        
                        // Gerar pontos ao longo do perímetro
                        for (let i = 0; i <= numPoints; i++) {
                          const theta = (2 * Math.PI * i) / numPoints;
                          const r = centerR + radius * Math.cos(theta);
                          const x = centerX + radius * Math.sin(theta);
                          points.push({ r, x });
                        }
                        
                        return points;
                      };
                      
                      /**
                       * Gera um path SVG a partir dos pontos do círculo MHO
                       */
                      const generateMhoPath = (points, toPixelFn) => {
                        if (points.length === 0) return '';
                        const pixelPoints = points.map(p => toPixelFn(p.r, p.x));
                        const path = pixelPoints.map((p, i) => 
                          i === 0 ? `M ${p.px} ${p.py}` : `L ${p.px} ${p.py}`
                        ).join(' ');
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
                      const mhoZ4A = zonasProtecao.z4_habilitada 
                        ? generateMhoCircle(z4Sec, angLinha, 0, 0, zonasProtecao.z4_reversa) 
                        : [];
                      
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
                        if (falta.tipo === '1PH') divisor = 1 + Math.sqrt(k0Re**2 + k0Im**2);
                        else if (falta.tipo === '2PH') divisor = 2;
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
                      
                      const getAllBounds = (mhoPoints) => {
                        if (mhoPoints.length === 0) return { minR: 0, maxR: 0, minX: 0, maxX: 0 };
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
                      allBounds.push({ minR: 0, maxR: 0, minX: 0, maxX: 0 }); // Origem
                      allBounds.push({ minR: zLinhaR, maxR: zLinhaR, minX: zLinhaX, maxX: zLinhaX }); // Terminal B
                      
                      // Pontos de falta
                      faltasCalculadas.forEach(f => {
                        allBounds.push({ minR: f.r, maxR: f.r, minX: f.x, maxX: f.x });
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
                        gridLines.push(
                          <line key={`grid-v-${i}`} x1={p1.px} y1={p1.py} x2={p2.px} y2={p2.py} stroke="#1e2530" strokeWidth={0.5} />
                        );
                        
                        const p3 = toPixel(viewMinR, valX);
                        const p4 = toPixel(viewMaxR, valX);
                        gridLines.push(
                          <line key={`grid-h-${i}`} x1={p3.px} y1={p3.py} x2={p4.px} y2={p4.py} stroke="#1e2530" strokeWidth={0.5} />
                        );
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
                          scaleMarkersR.push(
                            <g key={`scale-r-${val}`}>
                              <line x1={p.px} y1={origem.py - 5} x2={p.px} y2={origem.py + 5} stroke="#8b949e" strokeWidth={1} />
                              <text x={p.px} y={origem.py + 20} fill="#8b949e" fontSize="10" textAnchor="middle">
                                {val.toFixed(1)}
                              </text>
                            </g>
                          );
                        }
                      }
                      
                      const scaleMarkersX = [];
                      const startX = Math.ceil(viewMinX / scaleStep) * scaleStep;
                      for (let val = startX; val <= viewMaxX; val += scaleStep) {
                        const p = toPixel(0, val);
                        if (p.py > plotMargin + 30 && p.py < svgHeight - plotMargin - 30) {
                          scaleMarkersX.push(
                            <g key={`scale-x-${val}`}>
                              <line x1={origem.px - 5} y1={p.py} x2={origem.px + 5} y2={p.py} stroke="#8b949e" strokeWidth={1} />
                              <text x={origem.px - 12} y={p.py + 4} fill="#8b949e" fontSize="10" textAnchor="end">
                                {val.toFixed(1)}
                              </text>
                            </g>
                          );
                        }
                      }
                      
                      // ═══════════════════════════════════════════════════════════════════════════
                      // 9. CALCULAR POSIÇÕES DOS LABELS DAS ZONAS
                      // ═══════════════════════════════════════════════════════════════════════════
                      
                      const getLabelPosition = (zReach, angle, originR, originX, isReverse) => {
                        const effectiveAngle = isReverse ? (angle + Math.PI) : angle;
                        // Colocar label no ponto mais afastado do círculo
                        const labelR = originR + zReach * 0.75 * Math.cos(effectiveAngle);
                        const labelX = originX + zReach * 0.75 * Math.sin(effectiveAngle);
                        return toPixel(labelR, labelX);
                      };

                      return (
                        <svg 
                          id="coordenograma-svg"
                          width="100%" 
                          height="700" 
                          viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                          style={{ background: 'linear-gradient(180deg, #0a0e14 0%, #0d1117 100%)' }}
                        >
                          {/* Definições de gradientes e filtros */}
                          <defs>
                            {/* Gradiente para Z1 */}
                            <radialGradient id="gradZ1" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#4caf50" stopOpacity="0.15"/>
                              <stop offset="100%" stopColor="#4caf50" stopOpacity="0.02"/>
                            </radialGradient>
                            {/* Gradiente para Z2 */}
                            <radialGradient id="gradZ2" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#2196f3" stopOpacity="0.12"/>
                              <stop offset="100%" stopColor="#2196f3" stopOpacity="0.01"/>
                            </radialGradient>
                            {/* Gradiente para Z3 */}
                            <radialGradient id="gradZ3" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#ff9800" stopOpacity="0.10"/>
                              <stop offset="100%" stopColor="#ff9800" stopOpacity="0.01"/>
                            </radialGradient>
                            {/* Gradiente para Z4 (Reversa) */}
                            <radialGradient id="gradZ4" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.12"/>
                              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.01"/>
                            </radialGradient>
                            {/* Gradiente Terminal B */}
                            <radialGradient id="gradZ1B" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.12"/>
                              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.01"/>
                            </radialGradient>
                            {/* Glow effect */}
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          
                          {/* Título */}
                          <text x={svgWidth / 2} y={28} fill="#e6edf3" fontSize="18" fontWeight="bold" textAnchor="middle">
                            Coordenograma R-X | Plano de Impedância
                          </text>
                          <text x={svgWidth / 2} y={48} fill="#8b949e" fontSize="12" textAnchor="middle">
                            {projeto.linha_nome || 'Linha de Transmissão'} | {projeto.linha_comprimento} km | {projeto.V_nom} kV | θ = {angLinhaGraus.toFixed(1)}°
                          </text>
                          
                          {/* Grid */}
                          {coordConfig.showGrid && gridLines}
                          
                          {/* Eixos principais */}
                          <line 
                            x1={plotMargin} y1={origem.py} 
                            x2={svgWidth - plotMargin} y2={origem.py} 
                            stroke="#58a6ff" strokeWidth={1.5} strokeOpacity={0.8}
                          />
                          <line 
                            x1={origem.px} y1={plotMargin} 
                            x2={origem.px} y2={svgHeight - plotMargin} 
                            stroke="#58a6ff" strokeWidth={1.5} strokeOpacity={0.8}
                          />
                          
                          {/* Labels dos eixos */}
                          <text x={svgWidth - plotMargin + 15} y={origem.py + 5} fill="#58a6ff" fontSize="14" fontWeight="bold">R (Ω)</text>
                          <text x={origem.px + 10} y={plotMargin - 10} fill="#58a6ff" fontSize="14" fontWeight="bold">jX (Ω)</text>
                          
                          {/* Marcadores de escala */}
                          {scaleMarkersR}
                          {scaleMarkersX}
                          
                          {/* ═══════════════════════════════════════════════════════════════ */}
                          {/* ZONAS MHO - TERMINAL A (FORWARD) */}
                          {/* ═══════════════════════════════════════════════════════════════ */}
                          
                          {/* Z3 - Retaguarda Remota (sempre ativa, laranja tracejado) */}
                          {coordConfig.showZ3 && pathZ3A && (
                            <g>
                              <path d={pathZ3A} fill="url(#gradZ3)" stroke="none" />
                              <path d={pathZ3A} fill="none" stroke="#ff9800" strokeWidth={2} strokeDasharray="8,4" opacity={0.7} />
                            </g>
                          )}
                          
                          {/* Z2 - Sobrealcance (azul, tracejado) */}
                          {coordConfig.showZ2 && pathZ2A && (
                            <g>
                              <path d={pathZ2A} fill="url(#gradZ2)" stroke="none" />
                              <path d={pathZ2A} fill="none" stroke="#2196f3" strokeWidth={2.5} strokeDasharray="10,5" opacity={0.85} />
                            </g>
                          )}
                          
                          {/* Z1 - Instantâneo (verde, sólido) */}
                          {coordConfig.showZ1 && pathZ1A && (
                            <g filter="url(#glow)">
                              <path d={pathZ1A} fill="url(#gradZ1)" stroke="none" />
                              <path d={pathZ1A} fill="none" stroke="#4caf50" strokeWidth={3} opacity={0.95} />
                            </g>
                          )}
                          
                          {/* Z4 - Opcional (Reversa ou Forward) - roxo, tracejado */}
                          {coordConfig.showZ4 && zonasProtecao.z4_habilitada && pathZ4A && (
                            <g>
                              <path d={pathZ4A} fill="url(#gradZ4)" stroke="none" />
                              <path d={pathZ4A} fill="none" stroke="#a855f7" strokeWidth={2.5} strokeDasharray="6,3" opacity={0.85} />
                            </g>
                          )}
                          
                          {/* ═══════════════════════════════════════════════════════════════ */}
                          {/* ZONAS MHO - TERMINAL B (REVERSE) */}
                          {/* ═══════════════════════════════════════════════════════════════ */}
                          
                          {/* Z2B (laranja, tracejado) */}
                          {coordConfig.showZ2 && pathZ2B && (
                            <path d={pathZ2B} fill="none" stroke="#f97316" strokeWidth={2} strokeDasharray="10,5" opacity={0.7} />
                          )}
                          
                          {/* Z1B (vermelho, sólido) */}
                          {coordConfig.showZ1 && pathZ1B && (
                            <g>
                              <path d={pathZ1B} fill="url(#gradZ1B)" stroke="none" />
                              <path d={pathZ1B} fill="none" stroke="#ef4444" strokeWidth={2.5} opacity={0.85} />
                            </g>
                          )}
                          
                          {/* Linha de Transmissão */}
                          <line 
                            x1={origem.px} y1={origem.py}
                            x2={termBPos.px} y2={termBPos.py}
                            stroke="#e6edf3" 
                            strokeWidth={6} 
                            opacity={0.8}
                            strokeLinecap="round"
                          />
                          <line 
                            x1={origem.px} y1={origem.py}
                            x2={termBPos.px} y2={termBPos.py}
                            stroke="#161b22" 
                            strokeWidth={2} 
                            strokeLinecap="round"
                          />
                          
                          {/* Ângulo da linha */}
                          {coordConfig.showLabels && (
                            <g>
                              <path 
                                d={`M ${origem.px + 40} ${origem.py} A 40 40 0 0 0 ${origem.px + 40 * Math.cos(angLinha)} ${origem.py - 40 * Math.sin(angLinha)}`}
                                fill="none" 
                                stroke="#f97316" 
                                strokeWidth={1.5}
                              />
                              <text 
                                x={origem.px + 55 * Math.cos(angLinha / 2)} 
                                y={origem.py - 55 * Math.sin(angLinha / 2)} 
                                fill="#f97316" 
                                fontSize="11" 
                                fontWeight="bold"
                              >
                                θ = {angLinhaGraus.toFixed(1)}°
                              </text>
                            </g>
                          )}
                          
                          {/* Terminal A - Local (Quadrado Azul) */}
                          <rect 
                            x={origem.px - 12} y={origem.py - 12} 
                            width={24} height={24} 
                            fill="#3b82f6" stroke="#fff" strokeWidth={2} 
                            rx={4}
                          />
                          <text x={origem.px} y={origem.py + 5} fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">A</text>
                          {coordConfig.showLabels && (
                            <text x={origem.px} y={origem.py + 45} fill="#3b82f6" fontSize="12" textAnchor="middle" fontWeight="bold">
                              {terminalA.nome || 'Terminal A'}
                            </text>
                          )}
                          
                          {/* Terminal B - Remoto (Quadrado Vermelho) */}
                          <rect 
                            x={termBPos.px - 12} y={termBPos.py - 12} 
                            width={24} height={24} 
                            fill="#ef4444" stroke="#fff" strokeWidth={2}
                            rx={4}
                          />
                          <text x={termBPos.px} y={termBPos.py + 5} fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">B</text>
                          {coordConfig.showLabels && (
                            <text x={termBPos.px} y={termBPos.py + 45} fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="bold">
                              {terminalB.nome || 'Terminal B'}
                            </text>
                          )}
                          
                          {/* Labels das Zonas */}
                          {coordConfig.showLabels && (
                            <>
                              {coordConfig.showZ1 && (() => {
                                const pos = getLabelPosition(z1Sec, angLinha, 0, 0, false);
                                return (
                                  <g>
                                    <rect x={pos.px - 25} y={pos.py - 10} width={50} height={18} fill="#161b22" stroke="#4caf50" strokeWidth={1} rx={4} opacity={0.95} />
                                    <text x={pos.px} y={pos.py + 4} fill="#4caf50" fontSize="11" fontWeight="bold" textAnchor="middle">Z1</text>
                                  </g>
                                );
                              })()}
                              
                              {coordConfig.showZ2 && (() => {
                                const pos = getLabelPosition(z2Sec, angLinha, 0, 0, false);
                                return (
                                  <g>
                                    <rect x={pos.px - 25} y={pos.py - 10} width={50} height={18} fill="#161b22" stroke="#2196f3" strokeWidth={1} rx={4} opacity={0.95} />
                                    <text x={pos.px} y={pos.py + 4} fill="#2196f3" fontSize="11" fontWeight="bold" textAnchor="middle">Z2</text>
                                  </g>
                                );
                              })()}
                              
                              {coordConfig.showZ3 && (() => {
                                const pos = getLabelPosition(z3Sec, angLinha, 0, 0, false);
                                return (
                                  <g>
                                    <rect x={pos.px - 25} y={pos.py - 10} width={50} height={18} fill="#161b22" stroke="#ff9800" strokeWidth={1} rx={4} opacity={0.95} />
                                    <text x={pos.px} y={pos.py + 4} fill="#ff9800" fontSize="11" fontWeight="bold" textAnchor="middle">Z3</text>
                                  </g>
                                );
                              })()}
                              
                              {coordConfig.showZ4 && zonasProtecao.z4_habilitada && (() => {
                                const pos = getLabelPosition(z4Sec, angLinha, 0, 0, zonasProtecao.z4_reversa);
                                const label = `Z4 (${zonasProtecao.z4_reversa ? 'Rev' : 'Fwd'})`;
                                return (
                                  <g>
                                    <rect x={pos.px - 35} y={pos.py - 10} width={70} height={18} fill="#161b22" stroke="#a855f7" strokeWidth={1} rx={4} opacity={0.95} />
                                    <text x={pos.px} y={pos.py + 4} fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">{label}</text>
                                  </g>
                                );
                              })()}
                            </>
                          )}
                          
                          {/* Pontos de Falta */}
                          {faltasCalculadas.map((falta) => {
                            const pos = toPixel(falta.r, falta.x);
                            return (
                              <g key={falta.id}>
                                <circle cx={pos.px} cy={pos.py} r={16} fill="none" stroke={falta.cor} strokeWidth={2.5} />
                                <line x1={pos.px - 10} y1={pos.py - 10} x2={pos.px + 10} y2={pos.py + 10} stroke={falta.cor} strokeWidth={3} />
                                <line x1={pos.px + 10} y1={pos.py - 10} x2={pos.px - 10} y2={pos.py + 10} stroke={falta.cor} strokeWidth={3} />
                                {coordConfig.showLabels && (
                                  <>
                                    <rect x={pos.px - 45} y={pos.py - 38} width={90} height={20} fill="#161b22" stroke={falta.cor} rx={4} opacity={0.95} />
                                    <text x={pos.px} y={pos.py - 23} fill={falta.cor} fontSize="11" textAnchor="middle" fontWeight="bold">
                                      {falta.nome} ({falta.local_pct}% | {falta.tipo})
                                    </text>
                                  </>
                                )}
                              </g>
                            );
                          })}
                          
                          {/* ═══════════════════════════════════════════════════════════════ */}
                          {/* LEGENDA APRIMORADA */}
                          {/* ═══════════════════════════════════════════════════════════════ */}
                          <g transform="translate(12, 70)">
                            <rect x={0} y={0} width={190} height={200} fill="#0d1117" stroke="#30363d" rx={10} opacity={0.97} />
                            <text x={95} y={22} fill="#e6edf3" fontSize="13" fontWeight="bold" textAnchor="middle">Legenda</text>
                            
                            {/* Terminal A */}
                            <text x={10} y={45} fill="#8b949e" fontSize="10" fontWeight="bold">Terminal A (Local):</text>
                            
                            <line x1={15} y1={62} x2={40} y2={62} stroke="#4caf50" strokeWidth={3} />
                            <text x={48} y={66} fill="#4caf50" fontSize="10">Z1: {z1Sec.toFixed(2)} Ω ({zonasProtecao.z1_percent}%)</text>
                            
                            <line x1={15} y1={82} x2={40} y2={82} stroke="#2196f3" strokeWidth={2.5} strokeDasharray="6,3" />
                            <text x={48} y={86} fill="#2196f3" fontSize="10">Z2: {z2Sec.toFixed(2)} Ω ({zonasProtecao.z2_percent}%)</text>
                            
                            <line x1={15} y1={102} x2={40} y2={102} stroke="#ff9800" strokeWidth={2} strokeDasharray="5,3" />
                            <text x={48} y={106} fill="#ff9800" fontSize="10">Z3: {z3Sec.toFixed(2)} Ω ({zonasProtecao.z3_percent}%)</text>
                            
                            {zonasProtecao.z4_habilitada && (
                              <>
                                <line x1={15} y1={122} x2={40} y2={122} stroke="#a855f7" strokeWidth={2.5} strokeDasharray="4,2" />
                                <text x={48} y={126} fill="#a855f7" fontSize="10">Z4: {z4Sec.toFixed(2)} Ω ({zonasProtecao.z4_percent}% {zonasProtecao.z4_reversa ? 'Rev' : 'Fwd'})</text>
                              </>
                            )}
                            
                            {/* Terminal B */}
                            <text x={10} y={150} fill="#8b949e" fontSize="10" fontWeight="bold">Terminal B (Remoto):</text>
                            
                            <line x1={15} y1={167} x2={40} y2={167} stroke="#ef4444" strokeWidth={2.5} />
                            <text x={48} y={171} fill="#ef4444" fontSize="10">Z1: {z1SecB.toFixed(2)} Ω</text>
                            
                            <line x1={15} y1={187} x2={40} y2={187} stroke="#f97316" strokeWidth={2} strokeDasharray="6,3" />
                            <text x={48} y={191} fill="#f97316" fontSize="10">Z2: {z2SecB.toFixed(2)} Ω</text>
                          </g>
                          
                          {/* Informações de Zona 4 (só aparece se habilitada) */}
                          {coordConfig.showZ4 && zonasProtecao.z4_habilitada && (
                            <g transform={`translate(${svgWidth - 200}, 70)`}>
                              <rect x={0} y={0} width={185} height={80} fill="#0d1117" stroke="#a855f7" rx={8} opacity={0.95} />
                              <text x={92} y={20} fill="#a855f7" fontSize="12" fontWeight="bold" textAnchor="middle">
                                Zona 4 ({zonasProtecao.z4_reversa ? 'Reversa' : 'Forward'})
                              </text>
                              <text x={10} y={40} fill="#8b949e" fontSize="10">
                                Direção: {zonasProtecao.z4_reversa ? 'REVERSE' : 'FORWARD'}
                              </text>
                              <text x={10} y={55} fill="#8b949e" fontSize="10">
                                Alcance: {z4Sec.toFixed(2)} Ω ({zonasProtecao.z4_percent}%)
                              </text>
                              <text x={10} y={70} fill="#8b949e" fontSize="10">
                                Função: {zonasProtecao.z4_reversa ? 'Proteção de Barra/BF' : 'POTT/PUTT'}
                              </text>
                            </g>
                          )}
                          
                          {/* Rodapé com timestamp */}
                          <text x={svgWidth / 2} y={svgHeight - 10} fill="#6e7681" fontSize="10" textAnchor="middle">
                            SEP - Sistema de Engenharia de Proteção | Gerado em: {new Date().toLocaleString('pt-BR')}
                          </text>
                        </svg>
                      );
                    })()
                  ) : (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#8b949e' }}>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// Exportar globalmente para o index.html
window.SEPApp = SEPApp;
