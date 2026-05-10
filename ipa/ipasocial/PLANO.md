# PLANO — Site IPa - Incentivadores da Paz

---

## 1. Paleta de Cores

| Papel            | Cor                | Hex       | Uso                                        |
|------------------|--------------------|-----------|---------------------------------------------|
| Principal        | Laranja/Coral      | `#F26B3A` | CTAs, destaques, headings, hover            |
| Principal escuro | Coral escuro       | `#D4572E` | Hover de botões, bordas ativas              |
| Destaque         | Rosa origami       | `#E84C8A` | Acentos, ícones, detalhes do logo           |
| Fundo claro      | Off-white quente   | `#FFF8F5` | Background geral do site                    |
| Fundo seções alt.| Bege suave         | `#FFF0E8` | Seções alternadas (impacto, parceiro)        |
| Texto principal  | Cinza escuro       | `#2D2D2D` | Parágrafos, corpo de texto                  |
| Texto secundário | Cinza médio        | `#6B6B6B` | Legendas, subtítulos, labels                |
| Branco           | Branco puro        | `#FFFFFF` | Cards, navbar, áreas de respiro             |
| Escuro           | Quase-preto        | `#1A1A1A` | Footer, overlays                            |

Lógica: o laranja coral transmite energia e acolhimento. O rosa reforça o passarinho origami do logo. Os tons quentes no fundo evitam frieza e reforçam o espírito comunitário.

---

## 2. Tipografia

**Fonte escolhida: Poppins (Google Fonts)**

- **Por quê:** geométrica, moderna mas amigável, excelente legibilidade em telas pequenas, ampla variedade de pesos. Combina com o tom acolhedor e profissional que uma ONG precisa transmitir.
- **Pesos a carregar:** 300 (light), 400 (regular), 600 (semibold), 700 (bold)
- **Headings:** Poppins Bold/SemiBold
- **Corpo:** Poppins Regular
- **Detalhes/labels:** Poppins Light

Fallback: `'Poppins', 'Segoe UI', Arial, sans-serif`

---

## 3. Wireframe por Seção

### 3.1 Hero

**Mobile (< 768px):**
```
┌──────────────────────┐
│      [Logo IPa]      │
│                      │
│   IPa - Incentivadores│
│       da Paz         │
│                      │
│  "Movimento Comunitário│
│    desde 2022"       │
│                      │
│  [Seja Parceiro]     │
│  [Seja Voluntário]   │
│  [Doe]               │
│                      │
│      ▼ scroll        │
└──────────────────────┘
```
- Fundo: foto real da comunidade com overlay escuro semitransparente
- Botões empilhados verticalmente, largura total
- Logo centralizado

**Desktop (>= 768px):**
```
┌──────────────────────────────────────────────────┐
│  [Logo]  IPa - Incentivadores da Paz    [Nav]    │
│──────────────────────────────────────────────────│
│                                                  │
│        IPa - Incentivadores da Paz               │
│     "Movimento Comunitário desde 2022"           │
│                                                  │
│  [Seja Parceiro] [Seja Voluntário] [Doe]         │
│                                                  │
└──────────────────────────────────────────────────┘
```
- Navbar fixa no topo com links para cada seção
- Botões lado a lado
- Foto de fundo em tela cheia (100vh)

---

### 3.2 Nossa Historia (Timeline)

**Mobile:**
```
┌──────────────────────┐
│   Nossa Historia     │
│                      │
│   ● 23/03/2022       │
│   │ Nasce o          │
│   │ movimento IPa    │
│   │ (texto)          │
│   │                  │
│   ● 17/01/2026       │
│   │ Formalizado      │
│   │ como Associacao  │
│   │ (texto)          │
└──────────────────────┘
```
- Timeline vertical, linha à esquerda, pontos em laranja coral

**Desktop:**
```
┌──────────────────────────────────────────────────┐
│                Nossa Historia                     │
│                                                  │
│   2022 ●────────────────────● 2026               │
│   Nasce o movimento        Formalizado como      │
│   (texto)                  Associacao (texto)    │
└──────────────────────────────────────────────────┘
```
- Timeline horizontal, 2 marcos lado a lado

---

### 3.3 O que Fazemos (4 Eixos)

**Mobile:**
```
┌──────────────────────┐
│   O que Fazemos      │
│                      │
│  ┌──────────────┐    │
│  │ [Foto]       │    │
│  │ Eventos      │    │
│  │ Culturais    │    │
│  │ (subtopicos) │    │
│  └──────────────┘    │
│                      │
│  ┌──────────────┐    │
│  │ [Foto]       │    │
│  │ Eventos      │    │
│  │ Esportivos   │    │
│  │ (subtopicos) │    │
│  └──────────────┘    │
│  ... (mais 2 cards)  │
└──────────────────────┘
```
- Cards empilhados, cada um com foto, titulo, lista de subtopicos
- Foto ocupa topo do card

**Desktop:**
```
┌──────────────────────────────────────────────────┐
│                 O que Fazemos                     │
│                                                  │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐│
│  │ Eventos │ │ Eventos │ │ Natal e │ │ Bazar  ││
│  │Culturais│ │Esportivo│ │ Pascoa  │ │Solidar.││
│  │ [Foto]  │ │ [Foto]  │ │ [Foto]  │ │ [Foto] ││
│  │subtopics│ │subtopics│ │subtopics│ │subtopic││
│  └─────────┘ └─────────┘ └─────────┘ └────────┘│
└──────────────────────────────────────────────────┘
```
- Grid 4 colunas (2x2 em tablet)
- Hover: leve elevacao + sombra

---

### 3.4 Galeria

**Mobile:**
```
┌──────────────────────┐
│      Galeria         │
│                      │
│ [Todos] [Culturais]  │
│ [Esportivos] [Natal] │
│ [Bazar]              │
│                      │
│ ┌────┐ ┌────┐       │
│ │foto│ │foto│       │
│ └────┘ └────┘       │
│ ┌────┐ ┌────┐       │
│ │foto│ │foto│       │
│ └────┘ └────┘       │
└──────────────────────┘
```
- Grid 2 colunas, filtros como botoes/pills
- Tap abre lightbox (GLightbox via CDN)

**Desktop:**
- Grid 3-4 colunas
- Filtros em linha unica

---

### 3.5 Nosso Impacto

**Mobile:**
```
┌──────────────────────┐
│    Nosso Impacto     │
│                      │
│      +600            │
│  cestas basicas      │
│  entregues em 2025   │
│                      │
│       +30            │
│  voluntarios ativos  │
│                      │
│    Crescimento       │
│  no numero de        │
│  familias atendidas  │
└──────────────────────┘
```
- Numeros grandes, animacao de contagem ao entrar na viewport
- Fundo em bege/laranja suave

**Desktop:**
- 3 colunas lado a lado
- Icones acima dos numeros

---

### 3.6 Seja Parceiro

**Mobile:**
```
┌──────────────────────┐
│   Seja Parceiro      │
│                      │
│ "Sua empresa pode    │
│  ajudar a transformar│
│  vidas..."           │
│                      │
│ Nome da empresa: [ ] │
│ Responsavel:     [ ] │
│ Telefone:        [ ] │
│ E-mail:          [ ] │
│ Mensagem:        [ ] │
│                      │
│ [Enviar]             │
└──────────────────────┘
```
- Formulario via Formspree (action placeholder)
- Fundo diferenciado (bege)

**Desktop:**
- Texto à esquerda, formulario à direita (2 colunas)

---

### 3.7 Seja Voluntario

**Mobile:**
```
┌──────────────────────┐
│  Seja Voluntario     │
│                      │
│  (texto motivacional)│
│                      │
│ Nome completo:   [ ] │
│ Telefone:        [ ] │
│ E-mail:          [ ] │
│ Como quer ajudar:[ ] │
│                      │
│ [Quero ser voluntario]│
└──────────────────────┘
```

**Desktop:**
- Mesmo layout 2 colunas (texto + formulario)

---

### 3.8 Doe

**Mobile:**
```
┌──────────────────────┐
│        Doe           │
│                      │
│  "Sua doacao ajuda   │
│   a transformar..."  │
│                      │
│   ┌──────────────┐   │
│   │  [QR Code]   │   │
│   │   Pix        │   │
│   └──────────────┘   │
│                      │
│  Chave Pix: (a def.) │
│  [Copiar chave]      │
│                      │
│  [Doar via link]     │
└──────────────────────┘
```

**Desktop:**
- QR Code à esquerda, informacoes à direita

---

### 3.9 Contato + Rodape

**Mobile:**
```
┌──────────────────────┐
│      Contato         │
│                      │
│  [Instagram]         │
│  @ipa.social         │
│                      │
│  [WhatsApp]          │
│  (19) 99225-2700     │
│                      │
│  [E-mail]            │
│  ipasolidario01@     │
│  gmail.com           │
│                      │
│──────────────────────│
│ "Transformando       │
│  solidariedade em    │
│  acao desde 2022"    │
│                      │
│  © 2026 IPa          │
└──────────────────────┘
```

**Desktop:**
- 3 colunas (Instagram | WhatsApp | E-mail)
- Footer com logo, tagline, copyright

---

## 4. O que preciso de voce

Para que o site fique completo e com qualidade, preciso que me forneca:

### Obrigatorio
- [ ] **Logo da IPa em SVG** (ou PNG de alta resolucao com fundo transparente) — para o hero e o favicon
- [ ] **Fotos reais** para cada categoria (pelo menos 2-3 por eixo):
  - Eventos Culturais
  - Eventos Esportivos
  - Natal e Pascoa Solidaria
  - Bazar Solidario
  - Fotos gerais de impacto/voluntarios
- [ ] **Foto para o hero** — imagem principal do site (comunidade, evento, voluntarios)
- [ ] **Chave Pix** — para a secao de doacao
- [ ] **QR Code Pix** — imagem do QR Code (ou dados para eu gerar)

### Importante
- [ ] **ID do Formspree** — cadastre-se em formspree.io (gratis) e me passe o endpoint para os formularios
- [ ] **CNPJ da Associacao** — para exibir no rodape (transmite credibilidade)

### Opcional (mas recomendado)
- [ ] **Depoimentos** de voluntarios ou familias atendidas
- [ ] **Links de redes sociais** alem do Instagram (Facebook, YouTube, etc.)
- [ ] **Fotos dos voluntarios/equipe** para uma possivel secao "Quem Somos"
- [ ] **Documento oficial** (estatuto, certificado) para link de transparencia

---

## 5. Dependencias externas (via CDN, sem instalacao)

| Recurso        | Uso                              | CDN                        |
|----------------|----------------------------------|----------------------------|
| Google Fonts   | Poppins (300, 400, 600, 700)    | fonts.googleapis.com       |
| GLightbox      | Lightbox para galeria de fotos   | cdn.jsdelivr.net           |

Nenhum `npm install` necessario. O site roda abrindo `index.html` no navegador.

---

## 6. Estrutura final de arquivos

```
ipasocial/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── logo/
│       ├── eventos-culturais/
│       ├── eventos-esportivos/
│       ├── natal-pascoa/
│       ├── bazar/
│       └── impacto/
├── .gitignore
├── README.md
└── PLANO.md
```

---

## 7. Notas tecnicas

- **Mobile-first:** CSS escrito para mobile, media queries expandem para desktop
- **Scroll suave:** `html { scroll-behavior: smooth; }` + links ancoras
- **Navbar fixa:** `position: sticky` no topo, escurece ao scrollar
- **Animacao de numeros:** IntersectionObserver + contagem animada via JS
- **Galeria com filtro:** filtro por data-attribute, transicao CSS
- **Formularios:** `action` do Formspree como placeholder ate configuracao
- **Acessibilidade:** `alt` em imagens, `aria-label` em botoes de icone, contraste AA
- **SEO:** meta description, Open Graph tags, favicon, titulo semantico
