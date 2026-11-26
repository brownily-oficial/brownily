# Cardápio digital da Brownily

Site estático (HTML, CSS e JS simples) com o cardápio do BrownieTone, pedido pelo WhatsApp, QR Code e materiais para stories/WhatsApp.

## Onde fica tudo que muda

**Um único arquivo: [`dados.js`](dados.js).** Sabores, preços, descrições, fotos, esgotado, selo "Especial de fim de ano", regras, telefone e taxa de entrega estão lá. O site, as imagens, o PDF e o QR Code leem desse arquivo.

Textos marcados com `CONFIRMAR` no `dados.js` são provisórios e precisam da sua revisão.

## Como pedir mudanças

Mande uma frase para o Claude. Exemplos:

- "Esgota o maracujá M hoje."
- "Muda o preço do Ninho P para 45."
- "Desliga o selo de fim de ano."
- "Adiciona o sabor Pistache, P 35 e M 65, com esta foto."

O Claude altera o `dados.js`, gera os materiais de novo e publica.

## Como regenerar os materiais e publicar

Dê **dois cliques em [`atualizar.bat`](atualizar.bat)**. Ele:

1. confere o `dados.js`;
2. gera o QR Code, as imagens 1080×1920 e o PDF na pasta `materiais/`;
3. publica o site no GitHub Pages (atualiza em 1 a 2 minutos).

Para só gerar os materiais, sem publicar: `node ferramentas/materiais.js`.

## O que tem na pasta

| Arquivo / pasta | Para que serve |
|---|---|
| `dados.js` | Todo o conteúdo do cardápio (**o único que você pede para mudar**) |
| `index.html`, `estilo.css`, `app.js` | O site (não precisam de edição) |
| `fotos/` | Fotos dos doces (proporção 4:5, já otimizadas) |
| `fonts/` | Fontes do site |
| `materiais/` | QR Code (PNG e SVG), imagens `story-*.png`, `cardapio-brownily.pdf`, `compartilhar.jpg` (prévia do link no WhatsApp) |
| `ferramentas/` | Scripts que geram QR, imagens e PDF |
| `atualizar.bat` | Regenera tudo e publica |

## Seções do cardápio

O cardápio é dividido em **seções**, cada uma separada no site e nas imagens:

- `especial`: os especiais da época. Hoje é o "Especial de fim de ano". Para trocar o nome (ex.: Páscoa), mude o `titulo`; para tirar do ar, `ativa: false`.
- `cardapio`: o cardápio de sempre. Fica escondido enquanto não tiver itens; quando tiver, aparece sozinho, separado do especial, com abas no topo do site.
- A **Sobremesa** fica dentro do Especial de fim de ano, junto dos BrownieTone. Peça ao Claude para criar outras abas quando precisar (ex.: Páscoa).

Para mover um produto de uma seção para outra, peça ao Claude.

## Desconto e etiqueta "Especial"

A seção do Especial de fim de ano tem, no `dados.js`:
- `desconto: { ativo: true, percentual: 20, ... }`: mostra o preço cheio riscado e o preço com desconto no site, nas imagens e no PDF, com selos de "20% OFF". Os preços no arquivo continuam os cheios. **Para encerrar a promoção:** peça "tira o desconto" (ou `ativo: false`).
- `tag: "Especial"`: a etiqueta que aparece em todos os itens da seção. Para tirar: `tag: ""`.

## Promoção em todo o cardápio (ex.: Black Friday)

No `dados.js`, o bloco `promocao` aplica um desconto em **todos** os itens, com faixa no topo do site. Ele **começa e termina sozinho no site**, pelas datas `inicio` e `fim` (dias inclusivos, horário do Brasil). Não soma com o desconto de uma seção: vale o maior. As imagens e o PDF são fotos do momento: depois que a promoção acabar, rode `atualizar.bat` para tirar os selos deles.

## Preço de atacado e item fora de promoção

Em um item do `dados.js`: `atacado: { acimaDe: 15, preco: 9 }` cobra R$ 9 por unidade quando a quantidade passa de 15 (o cliente pode digitar a quantidade no site). `semDesconto: true` deixa o item fora de qualquer promoção; a faixa e a capa avisam "exceto ...".

## Regras rápidas

- Esgotado: `esgotado: ["M"]` (só o M), `esgotado: ["P", "M"]` (sabor todo) ou `esgotado: []` (disponível).
- Selo da capa: `selo: { ativo: false }` desliga.
- Sabor sem foto aparece como cartão com o nome. Quando houver foto, é só trocar `foto: null` pelo caminho dela.
- Logo: `logo.png` (fundo transparente) aparece no site, nas imagens e no centro do QR Code. Os arquivos originais ficam em `logo-original/`. Para trocar a logo, peça ao Claude (ele roda `node ferramentas/preparar-logo.js` com o novo arquivo).
