# PelePlus — Landing Page de Alta Conversão & Módulo de Pagamento

Landing page e experiência digital completa de e-commerce desenvolvida para a marca de dermocosmética **PelePlus**, focada no seu produto principal: o **Hidratante Facial Leve, Macio e de Toque Seco**.

---

## 🌙 Cabeçalho Fixo & Tema Claro / Escuro (Novidade)

- **Cabeçalho Estático no Topo:** O cabeçalho agora permanece fixo na posição original no topo do site (`relative`), rolando naturalmente junto com a página sem ficar flutuando ou descendo sobre a tela quando o usuário rola para baixo.
- **Menu Limpo e Minimalista:** Links como "Pagamento" e o botão "Comprar Agora" foram removidos do cabeçalho superior para deixar a barra visualmente mais limpa e focada na navegação de conteúdo (A Proposta, Fórmula, Benefícios, Avaliações, Kits e Dúvidas).
- **Alternador de Tema Claro e Escuro (Dark/Light Mode):** Botão discreto no cabeçalho com ícones de Lua (`moon`) e Sol (`sun`), com persistência no `localStorage`.

---

## 💳 Módulo Completo de Pagamento e Checkout

A seção **`#pagamento`** foi desenvolvida com os mais altos padrões de conversão de lojas D2C de cosméticos brasileiras:

1. **Identificação & Contato:**
   - Campos com validação: Nome Completo, E-mail (para código de rastreamento), WhatsApp e CPF formatado (para Nota Fiscal e garantia).
2. **Cálculo de CEP & Entrega:**
   - Campo de CEP com botão calcular e simulação instantânea de frete:
     - **Frete Grátis / Econômico (Correios / Jadlog):** R$ 0,00 (3 a 6 dias úteis).
     - **Sedex Expresso Prioritário:** R$ 14,90 (1 a 3 dias úteis).
   - Campos de endereço completos (Rua, Número, Complemento, Bairro, Cidade e Estado).
3. **3 Meios de Pagamento Interativos:**
   - **⚡ Pix com 5% de Desconto Imediato (Aprovação Instantânea):**
     - Aplica 5% OFF extra em tempo real sobre o total.
     - QR Code nítido em SVG.
     - Código *Pix Copia e Cola* completo com botão de 1 clique para copiar.
     - Cronômetro regressivo dinâmico de 15 minutos para pagamento.
     - Passo a passo visual em 3 etapas para pagar pelo app bancário.
   - **💳 Cartão de Crédito com Prévia Dinâmica ao Vivo:**
     - Cartão virtual interativo com efeito degradê esmeralda, chip dourado e detecção automática de bandeira (Visa, Mastercard, Elo).
     - Atualização em tempo real conforme digitação do número, nome do titular, validade (MM/AA) e CVV.
     - Seletor de parcelamento recalculado automaticamente em até 3x sem juros ou até 12x.
   - **📄 Boleto Bancário:**
     - Linha digitável formatada para cópia e instruções de compensação em até 3 dias úteis.
4. **Resumo do Pedido & Totalizador em Tempo Real:**
   - Troca de Kit em 1 clique (1 Pote, Kit 2 Potes [Mais Vendido] ou Kit 3 Potes [Melhor Custo]) sincronizada com a seção de ofertas.
   - Campo de Cupom de Desconto interativo (ex: `PELELEVE10` para 10% OFF extra com feedback visual imediato).
   - Discriminação transparente: Subtotal, Desconto do Kit, Desconto do Cupom, Desconto Pix 5%, Frete e **Total Final a Pagar**.
5. **Tela de Confirmação & Sucesso do Pedido:**
   - Modal com número do pedido gerado (ex: `#PP-84920`), resumo do kit, forma de pagamento, valor pago, código de rastreamento simulado e confirmação por e-mail.

---

## 🌿 As 15 Seções Estratégicas de Copywriting

1. **Headline Principal com Teste A/B/C Interativo:** Alternador no Hero para as variações A (Provocação - Favorita), B (Transformação) e C (Pele Sensível).
2. **Subheadline:** Textura leve, acabamento macio e toque seco a partir de R$ 34,90.
3. **Bloco de Abertura:** Quebra da frustração do hidratante pesado + **Simulador Interativo dos 7 Passos**.
4. **CTA Primário:** *"QUERO MINHA PELE MACIA E SECA AO TOQUE"*.
5. **Identificação da Dor:** 6 dores centrais + provocação em destaque (*"Se você acha que 'hidratação de verdade' precisa ser pesada, o problema nunca foi a sua pele. Foi o produto."*).
6. **Apresentação da Solução & Ativos:** Ácido Hialurônico Multimolecular, Niacinamida Pura 2%, Pantenol B5 e Centella Asiática.
7. **Benefícios:** Cards dos 6 benefícios + Proteção para Pele Sensível + Quiz interativo de tipo de pele.
8. **Prova Social:** +18.420 clientes, 4.9 estrelas, depoimentos filtráveis e selos de Registro Anvisa Grau II, Dermatologicamente Testado e Cruelty-free.
9. **Apresentação da Oferta:** Kits com ancoragem de cafezinho (menos de R$ 0,75/dia).
10. **Quebra de Objeções:** Accordions interativos para as 4 principais dúvidas.
11. **Garantia Incondicional de 30 Dias:** Risco zero absoluto (100% de reembolso sem perguntas).
12. **Urgência e Escassez Realística:** Lote de Lançamento #04 com rastreador dinâmico de unidades.
13. **FAQ:** 7 perguntas frequentes com respostas completas.
14. **CTA Final:** Fechamento emocional de alto impacto.
15. **PS / Bloco de Fechamento:** Reforço final dos 30 dias de teste e conclusão do 7º passo da rotina.

---

## 🚀 Como Visualizar o Projeto

Basta abrir o arquivo [`index.html`](file:///c:/Users/user/Downloads/projeto/index.html) em qualquer navegador moderno.
O projeto não requer instalação de dependências ou servidores locais.
