# Protec_LT
# SEP - Sistema de Engenharia de Proteção

Sistema web para cálculo e parametrização de proteção de linhas de transmissão, com geração automática de memorial técnico.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Funções de Proteção](#funções-de-proteção)
- [Estrutura das Abas](#estrutura-das-abas)
- [Como Usar](#como-usar)
- [Normas Suportadas](#normas-suportadas)
- [Requisitos](#requisitos)
- [Instalação](#instalação)

---

## 🎯 Visão Geral

O SEP é uma ferramenta completa para engenheiros de proteção de sistemas elétricos de potência. Permite calcular os ajustes de proteção para linhas de transmissão, gerar coordenogramas R-X interativos e exportar memoriais técnicos formatados.

### Principais Características

- ✅ Cálculo automático de zonas de proteção (21/21N)
- ✅ Ajustes de sobrecorrente direcional (67/67N)
- ✅ Proteção diferencial de linha (87L)
- ✅ Coordenograma R-X interativo com círculos MHO
- ✅ Validação por falta deslizante (Sliding Fault)
- ✅ Memorial técnico multilíngue (PT-BR, ES, EN)
- ✅ Tabela de Word Bits para relé SEL-421
- ✅ Exportação em HTML, JSON e CSV

---

## ⚡ Funcionalidades

### Cálculos de Proteção
| Função | Descrição |
|--------|-----------|
| **21/21N** | Proteção de distância (Mho) com 4 zonas |
| **67/67N** | Sobrecorrente direcional de fase e terra |
| **50/51** | Sobrecorrente instantânea e temporizada |
| **87L** | Diferencial de linha com compensação de I_charging |
| **K0** | Fator de compensação de terra |

### Zonas de Proteção
- **Zona 1**: Subalcance instantâneo (tipicamente 80-85%)
- **Zona 2**: Sobrealcance temporizado (tipicamente 120%)
- **Zona 3**: Retaguarda remota (configurável)
- **Zona 4**: Reversa para proteção de barra

### Visualizações
- Coordenograma R-X com círculos MHO geometricamente corretos
- Gráfico de validação de cobertura
- Preview do memorial em tempo real

---

## 🔧 Funções de Proteção

### Proteção de Distância (21)

```
Zona 1: Z₁ = (z1_percent / 100) × Z_linha
Zona 2: Z₂ = (z2_percent / 100) × Z_linha  
Zona 3: Z₃ = (z3_percent / 100) × (Z_linha + Z_adj)
Zona 4: Z₄ = (z4_percent / 100) × Z_linha (REVERSA)
```

### Compensação K0

```
K₀ = (Z₀ - Z₁) / (3 × Z₁)
```

### Círculo MHO

O círculo MHO passa pela origem com diâmetro igual ao alcance:
- **Centro**: (Z_set/2 × cos(θ), Z_set/2 × sin(θ))
- **Raio**: Z_set / 2

---

## 📑 Estrutura das Abas

### 1. Cadastros
Gerenciamento de clientes, engenheiros e relés de proteção.
- Cadastro com logo do cliente
- Assinatura digital do engenheiro
- Biblioteca de relés (SEL, Siemens, ABB, GE)

### 2. Projeto & Linha
Configuração dos parâmetros do projeto e da linha de transmissão.
- Dados do projeto (nome, revisão, norma)
- Parâmetros da linha (R1, X1, R0, X0, comprimento)
- Configuração das zonas de proteção (Z1, Z2, Z3, Z4)

### 3. Terminais
Configuração dos terminais A (Local) e B (Remoto).
- Seleção do relé instalado
- Relações de TC e TP
- Dados de curto-circuito

### 4. Cálculos
Execução dos cálculos e visualização dos resultados.
- Botão "Calcular Proteção"
- Resumo dos ajustes por terminal
- Tabela comparativa

### 5. Validação
Verificação da cobertura das zonas de proteção.
- Tabela de falta deslizante (Sliding Fault)
- Gráfico de cobertura
- Alertas de zona morta

### 6. Relatório
Geração do memorial técnico.
- Preview do documento
- Upload de coordenograma externo
- Exportação HTML/JSON/CSV

### 7. Coordenograma
Diagrama R-X interativo.
- Círculos MHO para Z1, Z2, Z3, Z4
- Pontos de falta configuráveis
- Exportação PNG/SVG

---

## 🚀 Como Usar

### Passo 1: Configurar o Projeto
1. Acesse a aba **Projeto & Linha**
2. Preencha os dados do projeto (nome da linha, tensão, comprimento)
3. Insira os parâmetros de impedância da linha (R1, X1, R0, X0)
4. Configure as porcentagens das zonas de proteção

### Passo 2: Configurar os Terminais
1. Acesse a aba **Terminais**
2. Selecione o relé instalado (ex: SEL-421)
3. Configure as relações de TC e TP
4. Insira os dados de curto-circuito

### Passo 3: Calcular
1. Acesse a aba **Cálculos**
2. Clique em **Calcular Proteção**
3. Revise os resultados

### Passo 4: Validar
1. Acesse a aba **Validação**
2. Verifique a tabela de falta deslizante
3. Confirme que não há zonas mortas

### Passo 5: Gerar Memorial
1. Acesse a aba **Relatório**
2. (Opcional) Faça upload de um coordenograma
3. Clique em **Exportar HTML**

---

## 📐 Normas Suportadas

| Norma | Região | Z1 | Z2 | Z3 | Z4 |
|-------|--------|----|----|----|----|
| **ONS** | Brasil | 80% | 120% | 150% | 25% |
| **COES** | Peru | 85% | 120% | 220% | 20% |
| **IEEE** | EUA | 85-90% | 125% | 200% | 25% |
| **IEC** | Internacional | 80% | 120% | 180% | 20% |

---

## 💻 Requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- JavaScript habilitado
- Resolução mínima: 1280 x 720

---

## 📦 Instalação

### Opção 1: Usar diretamente
O arquivo `sep-app.jsx` é um componente React standalone que pode ser renderizado em qualquer ambiente React.

### Opção 2: Criar projeto React
```bash
# Criar novo projeto
npx create-react-app sep-protection
cd sep-protection

# Instalar dependências
npm install lucide-react

# Copiar o arquivo sep-app.jsx para src/
# Importar no App.js
```

### Opção 3: Usar com Vite
```bash
npm create vite@latest sep-protection -- --template react
cd sep-protection
npm install lucide-react
```

---

## 📁 Estrutura do Código

```
sep-app.jsx
├── Estados Principais
│   ├── projeto (dados do projeto)
│   ├── linha (parâmetros de impedância)
│   ├── terminalA / terminalB (configuração dos terminais)
│   ├── zonasProtecao (configuração das zonas)
│   └── results (resultados dos cálculos)
│
├── Funções de Cálculo
│   ├── calculateProtectionSettings() - Cálculo principal
│   ├── generateMhoCircle() - Geometria do círculo MHO
│   └── generateFullReport() - Geração do memorial
│
├── Componentes UI
│   ├── InputField - Campo de entrada
│   ├── SelectField - Campo de seleção
│   └── Tabs - Sistema de abas
│
└── Exportação
    ├── exportHTML() - Memorial em HTML
    ├── exportJSON() - Dados em JSON
    └── exportCSV() - Tabela de ajustes em CSV
```

---

## 🔌 Integração com Relés

### SEL-421
Quando o relé SEL-421 é selecionado, o sistema gera automaticamente uma tabela de Word Bits mapeando os parâmetros calculados:

| Word Bit | Parâmetro |
|----------|-----------|
| Z1MAG | Alcance Zona 1 |
| Z2MAG | Alcance Zona 2 |
| k0MAG | Magnitude K0 |
| 67G1P | Pickup 67N Forward |
| 87LPP | Pickup Diferencial |
| CTRW | Relação TC |
| PTRY | Relação TP |

---

## 📄 Exportações

### HTML (Memorial Técnico)
Documento formatado com:
- Capa com logo do cliente
- Sumário numerado
- Metodologia detalhada
- Tabelas de ajustes
- Coordenograma anexado
- Assinatura do responsável

### JSON
Dados estruturados para integração com outros sistemas.

### CSV
Tabela de ajustes para importação em planilhas.

---

## 🌐 Idiomas

O sistema suporta três idiomas para o memorial técnico:
- 🇧🇷 Português (Brasil)
- 🇪🇸 Español (Perú/COES)
- 🇺🇸 English (USA)

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Desenvolvimento

Desenvolvido como ferramenta de apoio para estudos de proteção de linhas de transmissão.

### Tecnologias Utilizadas
- React 18
- Lucide React (ícones)
- SVG para gráficos
- CSS-in-JS

---

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.
