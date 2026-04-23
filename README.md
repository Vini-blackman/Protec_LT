# ⚡ SEP — Sistema de Ingeniería de Protección

> Herramienta web para el cálculo, parametrización y documentación de protección de **Líneas de Transmisión**, con soporte para relés SEL, coordinogramas R-X interactivos y generación automática de memoria técnica multilingüe.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-181717?logo=github)](https://pages.github.com)
[![Normas](https://img.shields.io/badge/normas-COES%20%7C%20ONS%20%7C%20IEEE%20%7C%20IEC-orange)]()
[![Estado](https://img.shields.io/badge/estado-activo-22c55e)]()

🌐 **Sitio:** [vini-blackman.github.io/Protec_LT](https://vini-blackman.github.io/Protec_LT/)

---

## 📑 Índice

- [Visión General](#-visión-general)
- [Funcionalidades Principales](#-funcionalidades-principales)
- [Estructura del Sistema](#-estructura-del-sistema)
- [Funciones de Protección Soportadas](#-funciones-de-protección-soportadas)
- [Normas Técnicas](#-normas-técnicas)
- [Flujo de Trabajo](#-flujo-de-trabajo)
- [Integración con Relés](#-integración-con-relés)
- [Memoria Técnica](#-memoria-técnica)
- [Formatos de Exportación](#-formatos-de-exportación)
- [Base Teórica](#-base-teórica)
- [Stack Tecnológica](#-stack-tecnológica)
- [Limitaciones Conocidas](#-limitaciones-conocidas)
- [Licencia y Autoría](#-licencia-y-autoría)

---

## 🎯 Visión General

El **SEP** es una aplicación web single-page desarrollada para ingenieros de protección de sistemas eléctricos de potencia. Automatiza los cálculos más críticos de un estudio de protección de LT, genera visualizaciones gráficas del plano R-X y produce documentación normativa en tres idiomas.

**Público objetivo:** ingenieros proyectistas, analistas de protección, equipos de puesta en servicio y estudiantes de posgrado en Sistemas Eléctricos.

---

## ⚙️ Funcionalidades Principales

| Módulo | Capacidad |
|--------|-----------|
| **Cálculo Automático** | Ajustes de Z1, Z2, Z3, Z4, K₀, 50/51, 67/67N, 87L |
| **Modularidad A/B** | Configuración de zonas **independiente** por terminal (Local/Remoto) |
| **Coordinograma R-X** | Círculos MHO geométricamente correctos para ambos terminales |
| **Validación** | Sliding Fault, verificación de cobertura, alertas de sensibilidad |
| **Memoria Técnica** | Documento formateado en PT-BR, ES e EN |
| **Word Bits SEL-421** | Mapeo automático de los ajustes a las celdas del relé |
| **Reactividad** | Recálculo en tiempo real conforme cambian los parámetros |
| **Multi-norma** | Aplica estándares COES, ONS, IEEE o IEC con un clic |

---

## 🏗️ Estructura del Sistema

El sistema está organizado en **7 pestañas funcionales**:

### 1️⃣ Registros
Gestión persistente (localStorage) de:
- **Clientes** (con logo corporativo)
- **Ingenieros responsables** (con foto y firma digital)
- **Biblioteca de relés** (SEL-411L, SEL-421, Siemens 7SD5, ABB REL670, GE L90)

### 2️⃣ Proyecto & Línea
Configuración del estudio:
- Datos del proyecto (nombre, revisión, tensión nominal, norma aplicable)
- Parámetros eléctricos de la LT (R₁, X₁, R₀, X₀, susceptancia B₁, longitud)
- **Zonas de Protección** con selector Terminal A / Terminal B y toggle 🔗 Vincular A↔B
- Configuración de Zona 4 **opcional** con dirección **Reversa** (respaldo BF) o **Directa** (POTT/PUTT)

### 3️⃣ Terminales
Definición del hardware en cada extremo:
- Relé seleccionado (de la biblioteca)
- Relaciones de TC (RTC) y TP (RTP)
- Corrientes de cortocircuito (Icc trifásica máxima y monofásica mínima)
- Corriente de carga máxima
- Polarización del 67N (V₀, I₀, V₂, Dual)

### 4️⃣ Cálculos
- Procesa todos los ajustes vía el botón **"Procesar Ajustes de Protección"**
- Muestra resultados comparativos Terminal A × Terminal B
- Valores en ohmios primarios y secundarios

### 5️⃣ Validación
- **Sliding Fault**: barre fallas al 0%, 10%, ..., 100% de la línea
- Verifica la cobertura de las zonas con semáforo visual (Z1/Z2/Z3/FUERA)
- Alerta por zonas muertas o sobrealcance

### 6️⃣ Informe
- Vista previa de la memoria técnica en tiempo real
- Carga de coordinograma externo (imagen)
- Exportación en múltiples formatos

### 7️⃣ Coordinograma R-X
- Plano de impedancia con círculos MHO interactivos
- Z1 (verde), Z2 (azul), Z3 (naranja), Z4 (violeta)
- Zonas del Terminal B reflejadas correctamente
- Puntos de falla configurables (1F, 2F, 3F) con resistencia de falla
- Auto-zoom adaptativo
- Exportación en PNG y SVG vectorial

---

## 🛡️ Funciones de Protección Soportadas

### Protección de Distancia (ANSI 21/21N)

Característica **Mho clásica** con 4 zonas configurables:

| Zona | Función | Alcance Típico | Tiempo | Dirección |
|------|---------|----------------|--------|-----------|
| **Z1** | Subalcance instantáneo | 80–85% | 0 ms | Directa |
| **Z2** | Sobrealcance temporizado | 120–125% | 300–400 ms | Directa |
| **Z3** | Respaldo remoto | 150–220% | 1000–1500 ms | Directa |
| **Z4** | Opcional (respaldo barra/BF o POTT) | 20–25% | 800–1000 ms | Reversa o Directa |

**Ecuaciones base:**

```
Z_n = (%_n / 100) × |Z_línea_secundaria|
```

**Compensación de secuencia cero (K₀):**

```
K₀ = (Z₀ − Z₁) / (3 × Z₁)
```

### Protección Direccional de Fase (ANSI 67)
- Pickup Forward y Reverse calculados por separado
- Ángulo de par máximo (MTA) basado en el ángulo de la línea
- Relay Characteristic Angle (RCA) ajustable

### Protección Direccional de Tierra (ANSI 67N)
- Polarización configurable: **V₀**, **I₀**, **V₂** o **Dual**
- MTA típico entre −45° y −90°
- Curvas IEC (Normal Inverse, Very Inverse, Extremely Inverse) e IEEE

### Sobrecorriente No Direccional (ANSI 50/51 y 50N/51N)
- Pickup 50/51 basado en 1.2–1.25 × Icarga
- Pickup 50N/51N coordinado con Icc fase-tierra mínimo
- Tiempo instantáneo y temporizado por curva

### Protección Diferencial de Línea (ANSI 87L)
- Pickup en % de la corriente nominal
- Slope 1 (región de operación normal) y Slope 2 (región de saturación)
- Breakpoint de transición
- Compensación de la corriente de carga capacitiva (I_chg)

---

## 📐 Normas Técnicas

El sistema aplica automáticamente los estándares de las principales normas internacionales:

| Norma | Región | Z1 | Z2 | Z3 | Z4 |
|-------|--------|----|----|----|----|
| **COES** | 🇵🇪 Perú (PR-20) | 80% | 120% | 220% | 20% |
| **ONS** | 🇧🇷 Brasil (Submódulo 2.7) | 80% | 120% | 150% | 25% |
| **IEEE C37.113** | 🇺🇸 Internacional | 85% | 125% | 200% | 25% |
| **IEC 60255** | 🌍 Internacional | 80% | 120% | 180% | 20% |

**Referencias bibliográficas integradas:**
- IEEE Std C37.113 — Guide for Protective Relay Applications to Transmission Lines
- IEEE Std C37.234 — Guide for Protective Relay Applications to Power System Buses
- IEC 60255-121 — Functional requirements for distance protection
- ONS Submódulo 2.7 — Procedimientos de Red (Brasil)
- COES PR-20 — Procedimiento Técnico (Perú)

---

## 🔄 Flujo de Trabajo

```
┌──────────────┐
│ 1. Registros │ → Cliente, Ingeniero, Relés
└──────┬───────┘
       ▼
┌──────────────────┐
│ 2. Proyecto & LT │ → Parámetros eléctricos + Zonas A/B
└──────┬───────────┘
       ▼
┌──────────────┐
│ 3. Terminales│ → RTC, RTP, Icc, Carga por terminal
└──────┬───────┘
       ▼
┌──────────────┐
│ 4. Cálculos  │ → [Procesar Ajustes]
└──────┬───────┘
       ▼
┌──────────────┐
│ 5. Validación│ → Sliding fault, cobertura
└──────┬───────┘
       ▼
┌──────────────────────────────────────┐
│ 6. Informe + 7. Coordinograma        │ → Exportación
└──────────────────────────────────────┘
```

---

## 🔌 Integración con Relés

### SEL-421 — Mapeo de Word Bits

Cuando el relé seleccionado es el **SEL-421**, la memoria técnica incluye automáticamente una tabla de ajustes con las celdas exactas del relé:

| Word Bit | Descripción | Mapeo |
|----------|-------------|-------|
| `Z1MAG`, `Z1ANG` | Alcance y ángulo Zona 1 | Del estudio de distancia |
| `Z2MAG`, `Z2D` | Zona 2 y su tiempo | Del estudio de distancia |
| `Z3MAG`, `Z3D` | Zona 3 y su tiempo | Respaldo remoto |
| `Z4MAG`, `Z4D` | Zona 4 (si habilitada) | Reversa o directa |
| `k0MAG`, `k0ANG` | Compensación de tierra | Calculado |
| `CTRW`, `CTRX` | RTC (Terminales W y X) | Del registro |
| `PTRY`, `PTRZ` | RTP (Terminales Y y Z) | Del registro |
| `67P1P`, `67P2P` | Pickup 67 Fwd/Rev | Calculado |
| `67G1P`, `67G1MTA` | Pickup 67N y MTA | Calculado |
| `51S1P`, `50P1P` | Pickup 51/50 fase | Calculado |
| `50G1P`, `51G1P` | Pickup 50N/51N | Calculado |
| `87LPP`, `87LS1`, `87LS2` | Diferencial de línea | Calculado |
| `EICHG` | Corriente de carga capacitiva | V × B × L |

> ⚠️ Valores presentados en **amperios secundarios** y **ohmios secundarios** conforme a la convención SEL. Factor de conversión: K = RTC / RTP.

---

## 📄 Memoria Técnica

El documento generado sigue una estructura normativa profesional:

1. **Portada** — Logo del cliente, título, revisión, fecha, responsable técnico
2. **Índice** — Tabla de contenidos jerárquica numerada
3. **Información del Proyecto** — Datos generales
4. **Objetivo y Alcance**
5. **Metodología** — Subsecciones numeradas con base teórica
6. **Análisis de Resultados** — Tablas de ajustes, sliding fault, cobertura
7. **Recomendaciones**
8. **Conclusiones** — Texto dinámico basado en las zonas configuradas
9. **Bibliografía** — Referencias normativas aplicables
10. **Apéndices**:
    - A — Memoria de Cálculo Detallada
    - B — Diagramas de Coordinación
    - C — Datos de Placa de los Equipos
    - D — Coordinograma R-X (si se adjunta imagen)

**Idiomas soportados:** 🇧🇷 Português (Brasil), 🇪🇸 Español (Perú/COES), 🇺🇸 English (USA)

---

## 📤 Formatos de Exportación

| Formato | Uso | Contenido |
|---------|-----|-----------|
| **HTML** | Memoria completa formateada | Documento con portada, índice, tablas, coordinograma adjunto, firma |
| **JSON** | Integración/archivo | Datos estructurados de todos los resultados |
| **CSV** | Análisis en hoja de cálculo | Tabla de ajustes con criterios por terminal |
| **PNG** | Coordinograma | Imagen rasterizada del plano R-X |
| **SVG** | Coordinograma vectorial | Editable en software gráfico |

---

## 📚 Base Teórica

### Círculo MHO (Auto-Polarizado)

El lugar geométrico de la característica Mho clásica en el plano R-X:

- Pasa por el **origen** (0,0)
- **Diámetro** = alcance de impedancia (Z_set)
- **Centro** en `(Z_set/2 × cos θ, Z_set/2 × sin θ)`
- **θ** = ángulo característico de la línea = `atan(X₁ / R₁)`

Para Zona 4 **reversa**, la característica es reflejada: el ángulo efectivo se rota 180°, colocando el círculo en el cuadrante opuesto.

### Conversión Primario → Secundario

```
K_conv = RTC / RTP
Z_secundario = Z_primario × K_conv
I_secundario = I_primario / RTC
```

### Validación Sliding Fault

Simula fallas en 11 puntos a lo largo de la línea (0%, 10%, 20%, ..., 100%) y verifica si cada zona opera correctamente según el alcance configurado, considerando:
- Infeed/outfeed del terminal remoto
- Resistencia de falla (para fallas fase-tierra)
- Compensación K₀ en los cálculos de impedancia aparente

---

## 🧰 Stack Tecnológica

| Componente | Tecnología |
|------------|------------|
| **Framework** | React 18 (UMD vía CDN) |
| **Íconos** | SVG inline (sin dependencias) |
| **Gráficos** | SVG nativo con generación procedural |
| **Build** | Babel standalone (pre-compilación JSX → JS) |
| **Persistencia** | localStorage (registros y preferencias) |
| **Hosting** | GitHub Pages |
| **Formato** | Aplicación standalone (3 archivos) |

### Archivos del Proyecto

```
Protec_LT/
├── index.html       # Página de entrada, carga React vía CDN
├── sep-app.js       # Aplicación compilada (~414 KB)
└── README.md        # Esta documentación
```

---

## ⚠️ Limitaciones Conocidas

- ❌ No soporta esquemas de teleprotección activa (solo ajustes de zona)
- ❌ No simula transitorios electromagnéticos (EMT) — usar ATPDraw para eso
- ❌ Característica de distancia limitada al tipo **Mho** (sin cuadrilateral)
- ❌ No calcula coordinación con líneas paralelas mutuamente acopladas
- ❌ Protecciones de generador, transformador y barra no incluidas
- ⚠️ Biblioteca de relés pre-configurada con modelos populares; nuevos modelos requieren registro manual

---

## 📝 Licencia y Autoría

**Desarrollado por Vinicius** — Ingeniero Electricista especializado en protección y puesta en servicio.

Herramienta de apoyo a estudios profesionales de protección de líneas de transmisión. Los resultados deben ser **siempre revisados y validados** por un ingeniero responsable antes de su aplicación en campo.

> ⚡ **"La protección no es solo un conjunto de ajustes — es el compromiso de garantizar que nadie se lastime y que el sistema continúe operando con seguridad."**

---

## 🔗 Enlaces Útiles

- 🌐 **Aplicación en vivo:** [vini-blackman.github.io/Protec_LT](https://vini-blackman.github.io/Protec_LT/)
- 📖 **IEEE Std C37.113:** Guía oficial para protección de LT
- 📖 **ONS Submódulo 2.7:** Procedimientos de Red (Brasil)
- 📖 **SEL-421 Instruction Manual:** Documentación oficial del relé

---

**Última actualización:** Abril de 2026
