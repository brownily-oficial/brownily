/* Regras de preço compartilhadas pelo site e pelos materiais (imagens/PDF). Não precisa editar.
   - linhas(): transforma um item do dados.js em linhas de preço (P/M, sabores, ou sabor com P e G)
   - desconto: se a seção tem "desconto" ativo, calcula o preço com desconto */
(function (root) {
  function arred(v) { return Math.round(v * 100) / 100; }

  // data de hoje no Brasil, no formato AAAA-MM-DD
  function hojeBR(agora) {
    return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(agora || new Date());
  }
  // promoção geral (ex.: Black Friday) valendo hoje, ou null. "inicio" e "fim" são dias inclusivos.
  function promocaoAtiva(dados, agora) {
    var p = dados && dados.promocao;
    if (!p || !p.ativo || !(p.percentual > 0)) return null;
    var h = hojeBR(agora);
    if ((p.inicio && h < p.inicio) || (p.fim && h > p.fim)) return null;
    return p;
  }
  // desconto que vale para a seção hoje (ou null). Os descontos NÃO se somam: vale o maior.
  function descontoDe(c, dados, agora) {
    var d = c && c.desconto && c.desconto.ativo && c.desconto.percentual > 0 ? c.desconto : null;
    var p = promocaoAtiva(dados, agora);
    if (p && (!d || p.percentual >= d.percentual)) {
      return { percentual: p.percentual, texto: p.percentual + "% OFF", nome: p.nome, promo: true,
        aviso: p.nome + (p.aviso ? " · " + p.aviso : ""), curto: p.curto || p.nome };
    }
    return d;
  }
  function textoDesconto(d) { return d.texto || (d.percentual + "% OFF"); }
  function pagar(preco, d) {
    return typeof preco === "number" && d ? arred(preco * (100 - d.percentual) / 100) : preco;
  }

  // desconto de um item: itens com "semDesconto: true" nunca entram em promoção
  function descontoDoItem(x, d) { return x && x.semDesconto ? null : d; }
  // preço de cada unidade conforme a quantidade: acima de "atacado.acimaDe" vale o preço de atacado
  function precoUnidade(x, linha, qtd) {
    var a = x.atacado;
    return a && qtd > a.acimaDe ? pagar(a.preco, x.__d) : linha.pay;
  }

  // Cada linha: { key, label, desc, group, badge, price (cheio), pay (a pagar), off (tem desconto), head }
  //   head = true  → só um cabeçalho (nome do sabor + descrição), sem preço nem botão
  function linhas(x, tamanhos, d) {
    var out = [];
    function mk(o) { o.pay = pagar(o.price, d); o.off = !!d && typeof o.price === "number"; return o; }
    if (x.linhas) {
      x.linhas.forEach(function (l) {
        if (l.precos) {   // sabor com tamanhos próprios (ex.: Sobremesa P e G)
          out.push({ key: l.id, head: true, label: l.rotulo || "", desc: l.descricao || "" });
          Object.keys(l.precos).forEach(function (t) {
            out.push(mk({ key: l.id + "-" + t, label: "", desc: "", group: l.rotulo || "", price: l.precos[t], badge: t }));
          });
        } else {
          out.push(mk({ key: l.id, label: l.rotulo || "", desc: l.descricao || "", price: l.preco, badge: "" }));
        }
      });
    } else if (x.preco) {
      Object.keys(tamanhos).forEach(function (s) { out.push(mk({ key: s, label: "", desc: "", price: x.preco[s], badge: s })); });
    }
    return out;
  }

  var api = { arred: arred, hojeBR: hojeBR, promocaoAtiva: promocaoAtiva, descontoDe: descontoDe, textoDesconto: textoDesconto, pagar: pagar, linhas: linhas, descontoDoItem: descontoDoItem, precoUnidade: precoUnidade };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.REGRAS = api;
})(typeof window !== "undefined" ? window : this);
