/* ============================================================
   BROWNILY — TUDO O QUE MUDA NO CARDÁPIO FICA NESTE ARQUIVO
   O site, as imagens, o PDF e o QR Code leem daqui.

   Para mudar algo, peça ao Claude. Exemplos:
     "esgota o maracujá M hoje"
     "muda o preço do Ninho P para 45"
     "desliga o selo de fim de ano"

   Linhas marcadas com CONFIRMAR são textos provisórios
   que o Pedro ainda precisa revisar.
   ============================================================ */

const DADOS = {

  /* ---------- Marca ---------- */
  marca: {
    nome: "Brownily",
    slogan: "Brownies & Co.",
    cidade: "Tupã-SP",
    instagram: "_brownily",
    // Logo (PNG com fundo transparente). Para ficar só com o nome escrito, troque por null.
    logo: "logo.png",
  },

  /* ---------- Endereço do site (usado no QR Code) ---------- */
  site: {
    url: "https://brownily-oficial.github.io/brownily/",
  },

  /* ---------- Contato e entrega ---------- */
  contato: {
    whatsapp: "5514997148835",           // só números, com 55 + DDD
    whatsappTexto: "(14) 99714-8835",    // como aparece escrito
  },
  entrega: {
    taxa: 5,                             // taxa de entrega em Tupã (R$)
  },

  /* ---------- Capa ---------- */
  capa: {
    // Selo da capa. Para desligar depois de janeiro: ativo: false
    selo: { ativo: true, texto: "Especial de fim de ano" },
    colecao: "especial",         // o "a partir de R$ ..." da capa usa os preços desta seção
    titulo: "BrownieTone",
    destaque: "trufado",
    frase: "Brownie alto e recheado, feito à mão. Escolha o sabor, o tamanho e peça direto pelo WhatsApp.", // CONFIRMAR
    foto: "fotos/brigadeiro.jpg",
    fotoDescricao: "BrownieTone de brigadeiro com granulado de chocolate",
  },

  /* ---------- Promoção geral (vale para TODO o cardápio) ----------
     Começa e termina sozinha no site, pelas datas (dias inclusivos, horário do Brasil).
     Não soma com o desconto de uma seção: vale o maior.
     Depois que acabar, rode "atualizar" para tirar os selos das imagens e do PDF.
     Para cancelar antes: ativo: false. */
  promocao: {
    ativo: true,
    nome: "Black Friday",
    percentual: 20,
    inicio: "2026-11-26",
    fim: "2026-11-28",
    aviso: "até sábado, 28/11",
    curto: "Black Friday até 28/11",
  },

  /* ---------- Tamanhos ---------- */
  tamanhos: {
    P: "aprox. 250g",
    M: "aprox. 600g",
  },

  /* ---------- Cardápio, dividido em SEÇÕES ----------
     Cada seção aparece separada no site e nas imagens.
       "especial"  → os especiais da época (hoje: Especial de fim de ano).
                     Para trocar o nome (ex.: Páscoa), mude o "titulo".
                     Para tirar do ar: ativa: false.
       "cardapio"  → o cardápio de sempre (separado do especial, com abas no topo).
     A Sobremesa fica dentro do "especial" (junto dos BrownieTone).
     Para criar outra aba, é só pedir (ex.: "cria uma aba de Páscoa").
       linhas com "descricao": o texto aparece ao lado de cada sabor
       preco: null numa linha     → mostra "Valor sob consulta" + botão Perguntar
     Cada item tem preço de um destes jeitos:
       preco: { P: 30, M: 60 }                  → tamanhos P e M
       linhas: [{ id, rotulo, preco }, ...]     → sabores ou unidade única (rotulo: "" = sem nome)
       linhas: [{ id, rotulo, precos: { P: 50, G: 90 }, descricao }]  → sabor com tamanhos próprios
       consultar: true                          → sem preço: mostra "Valor sob consulta"
     esgotado (usa o P/M ou o "id" da linha):
       esgotado: []                  → disponível
       esgotado: ["M"]               → só o tamanho M esgotado
       esgotado: ["P", "M"]          → item inteiro esgotado
       esgotado: ["ninho"]           → só aquele sabor (linha) esgotado
     foto: null                      → mostra um cartão com o nome (sem foto)
     notaPedido: "texto"             → texto que vai junto na mensagem do WhatsApp
     atacado: { acimaDe: 15, preco: 9 } → preço por unidade quando a quantidade passa de 15
     semDesconto: true               → item que não entra em nenhuma promoção
  ---------------------------------- */
  colecoes: [
  {
   id: "especial",
   ativa: true,
   titulo: "Especial de fim de ano",
   aba: "Fim de ano",            // nome curto que aparece na aba do topo (opcional)
   subtitulo: "",
   // Etiqueta que aparece em TODOS os itens desta seção (como "Especial"). Para tirar: tag: "".
   tag: "Especial",
   // DESCONTO por tempo limitado. Os preços abaixo continuam os cheios; o site e as imagens
   // mostram o preço cheio riscado e o preço com desconto. Para ENCERRAR a promoção: ativo: false.
   desconto: { ativo: true, percentual: 20, texto: "20% OFF", aviso: "por tempo limitado" },
   grupos: [
    {
      id: "trufados",
      titulo: "Trufados",
      subtitulo: "Toque no + pra montar seu pedido.",
      sabores: [
        {
          id: "brigadeiro",
          nome: "Brigadeiro",
          descricao: "Recheado e coberto com brigadeiro de chocolate.",          // CONFIRMAR
          foto: "fotos/brigadeiro.jpg",
          fotoDescricao: "BrownieTone de brigadeiro com granulado de chocolate",
          destaque: null,
          preco: { P: 30, M: 60 },
          esgotado: [],
        },
        {
          id: "ninho-nutella",
          nome: "Ninho com Nutella",
          descricao: "Brigadeiro de leite Ninho com Nutella.",                    // CONFIRMAR
          foto: "fotos/ninho.jpg",
          fotoDescricao: "BrownieTone de Ninho com Nutella, coberto com brigadeiro branco e fios de Nutella",
          destaque: null,
          preco: { P: 40, M: 70 },
          esgotado: [],
        },
        {
          id: "maracuja",
          nome: "Maracujá",
          descricao: "Recheio cremoso de brigadeiro de maracujá.",                // CONFIRMAR
          foto: "fotos/maracuja.jpg",
          fotoDescricao: "BrownieTone de maracujá cortado ao meio mostrando o recheio",
          destaque: null,
          preco: { P: 30, M: 60 },
          esgotado: [],
        },
        {
          id: "doce-de-leite",
          nome: "Doce de leite",
          descricao: "Recheio de doce de leite.",                                 // CONFIRMAR
          foto: "fotos/doce-de-leite.jpg",
          fotoDescricao: "BrownieTone de doce de leite com chocolate granulado por cima",
          destaque: null,
          preco: { P: 30, M: 60 },
          esgotado: [],
        },
      ],
    },
    {
      id: "sem-recheio",
      titulo: "Sem recheio",
      subtitulo: "",
      sabores: [
        {
          id: "tradicional",
          nome: "Tradicional",
          nomePedido: "Tradicional (sem recheio)",
          descricao: "A massa do BrownieTone, sem recheio. Casquinha por fora, úmido por dentro.", // CONFIRMAR
          foto: "fotos/tradicional.jpg",
          fotoDescricao: "BrownieTone tradicional aberto mostrando a massa",
          destaque: null,
          preco: { P: 25, M: 50 },
          esgotado: [],
        },
      ],
    },
    {
      id: "sobremesa",
      titulo: "",
      subtitulo: "",
      sabores: [
        {
          id: "sobremesa",
          nome: "Sobremesa",
          nomePedido: "Sobremesa",
          descricao: "",
          foto: "fotos/sobremesa.jpg",
          fotoDescricao: "Sobremesa de maracujá trufado em pote com laço vermelho",
          destaque: null,
          // Cada sabor tem preço nos tamanhos P e G (precos). CONFIRMAR o peso de P e G (ainda não informado).
          linhas: [
            { id: "maracuja",    rotulo: "Maracujá trufado",  precos: { P: 50, G: 90 },  descricao: "Brigadeiro de chocolate, pedaços de brownie e finalizados com brigadeiro de maracujá." },
            { id: "dois-amores", rotulo: "Dois amores",       precos: { P: 50, G: 90 },  descricao: "Brigadeiro de chocolate, pedaços de brownie e finalizados com brigadeiro de Ninho." },
            { id: "ninho",       rotulo: "Ninho com Nutella", precos: { P: 80, G: 130 }, descricao: "Brigadeiro de Ninho com Nutella com pedaços de brownie." },
          ],
          // para esgotar só um tamanho de um sabor: esgotado: ["maracuja-G"]
          esgotado: [],
        },
      ],
    },
   ],
  },
  {
   id: "cardapio",
   ativa: true,
   titulo: "Cardápio",
   subtitulo: "",
   grupos: [
    {
      id: "copo",
      titulo: "Brownie no copo",
      subtitulo: "",
      sabores: [
        {
          id: "copo-maracuja",
          nome: "Maracujá trufado",
          nomePedido: "Brownie no copo – Maracujá trufado",
          descricao: "",                                                          // CONFIRMAR (sem descrição ainda)
          foto: "fotos/copo-maracuja.jpg",
          fotoDescricao: "Brownie no copo de maracujá trufado",
          destaque: null,
          linhas: [{ id: "un", rotulo: "", preco: 15 }],
          esgotado: [],
        },
        {
          id: "copo-doce-de-leite",
          nome: "Brigadeiro de doce de leite",
          nomePedido: "Brownie no copo – Brigadeiro de doce de leite",
          descricao: "",                                                          // CONFIRMAR (sem descrição ainda)
          foto: "fotos/copo-doce-de-leite.jpg",
          fotoDescricao: "Brownie no copo de brigadeiro de doce de leite",
          destaque: null,
          linhas: [{ id: "un", rotulo: "", preco: 15 }],                          // CONFIRMAR: usei o preço do Dois amores, que saiu do lugar
          esgotado: [],
        },
        {
          id: "copo-ninho-nutella",
          nome: "Ninho com Nutella",
          nomePedido: "Brownie no copo – Ninho com Nutella",
          descricao: "",                                                          // CONFIRMAR (sem descrição ainda)
          foto: "fotos/copo-ninho-nutella.jpg",                                   // CONFIRMAR (qual foto é de qual copo)
          fotoDescricao: "Brownie no copo de Ninho com Nutella",
          destaque: null,
          linhas: [{ id: "un", rotulo: "", preco: 18 }],
          esgotado: [],
        },
      ],
    },
    {
      id: "mais",
      titulo: "",
      subtitulo: "",
      sabores: [
        {
          id: "bombom-brownie",
          nome: "Bombom brownie",
          descricao: "Brownie, brigadeiro, pedaços de morango envoltos com uma camada fina de chocolate meio amargo.",
          foto: "fotos/bombom.jpg",
          fotoDescricao: "Bombom brownie cortado ao meio, com brigadeiro e morango",
          destaque: null,
          linhas: [{ id: "un", rotulo: "", preco: 18 }],
          esgotado: [],
        },
        {
          id: "brownie-bites",
          nome: "Brownie Bites",
          descricao: "",                                                          // CONFIRMAR (sem descrição ainda)
          foto: "fotos/bites.jpg",
          fotoDescricao: "Embalagem de Brownie Bites",
          destaque: null,
          linhas: [{ id: "un", rotulo: "", preco: 20 }],
          esgotado: [],
        },
        {
          id: "brownie-individual",
          nome: "Brownie individual",
          descricao: "",                                                          // CONFIRMAR (sem descrição ainda)
          foto: "fotos/individual.jpg",
          fotoDescricao: "Brownie individual em embalagem de papel",
          destaque: null,
          linhas: [
            { id: "maracuja",   rotulo: "Maracujá",   preco: 10 },
            { id: "brigadeiro", rotulo: "Brigadeiro", preco: 10 },
            { id: "ninho",      rotulo: "Ninho",      preco: 10 },
            { id: "dois-amores", rotulo: "Dois amores", preco: 10 },
            { id: "doce-de-leite", rotulo: "Doce de leite", preco: 10 },          // CONFIRMAR: mesmo preço dos outros sabores
          ],
          esgotado: [],
        },
        {
          id: "quarteto-brownie",
          nome: "Quarteto Brownie",
          descricao: "Escolha 4 sabores entre Maracujá, Brigadeiro, Ninho, Dois amores e Doce de leite. Pode ser todos de um único sabor, dois de cada ou cada um de um sabor.",
          notaPedido: "Sabores (escolha 4 entre Maracujá, Brigadeiro, Ninho, Dois amores e Doce de leite): ",
          foto: "fotos/quarteto.jpg",
          fotoDescricao: "Caixa com quatro brownies de sabores variados",
          destaque: null,
          linhas: [{ id: "un", rotulo: "", preco: 34.90 }],
          esgotado: [],
        },
        {
          id: "brownie-lembrancinha",
          nome: "Brownie lembrancinha",
          descricao: "Topping à escolha do cliente.",
          notaPedido: "Topping escolhido: ",
          foto: "fotos/lembrancinha.jpg",
          fotoDescricao: "Brownie lembrancinha em embalagem transparente com laço vermelho",
          destaque: null,
          linhas: [{ id: "un", rotulo: "", preco: 10 }],
          // preço de atacado: acima de 15 unidades (16 ou mais) cada uma sai por R$ 9
          atacado: { acimaDe: 15, preco: 9 },
          semDesconto: true,           // não entra em promoção (nem Black Friday); o único desconto é o de quantidade
          esgotado: [],
        },
      ],
    },
   ],
  },
  ],

  /* ---------- Como funciona ----------
     icone: calendario | cartao | entrega  */
  regras: [
    { icone: "calendario", titulo: "Encomende antes",        texto: "Pedidos com 1 a 2 dias de antecedência." },
    { icone: "cartao",     titulo: "Pix, dinheiro ou cartão", texto: "Sem sinal: o valor é pago de uma vez." },
    { icone: "entrega",    titulo: "Entregamos em Tupã",      texto: "Taxa de entrega de R$ {taxa}." },   // {taxa} vira o valor de entrega acima
  ],

  /* ---------- Textos do final da página ---------- */
  contatoTitulo: "Bateu vontade?",
  contatoDestaque: "Chama a gente.",
  contatoTexto: "Produção artesanal, com ingredientes selecionados.",              // CONFIRMAR
};

// Permite que os scripts de geração (Node) leiam este mesmo arquivo.
if (typeof module !== "undefined") module.exports = DADOS;
