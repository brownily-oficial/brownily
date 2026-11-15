/* Regras de preço compartilhadas pelo site e pelos materiais (imagens/PDF). Não precisa editar.
   - linhas(): transforma um item do dados.js em linhas de preço (P/M, sabores, ou sabor com P e G)
   - desconto: se a seção tem "desconto" ativo, calcula o preço com desconto */
(function (root) {
  function arred(v) { return Math.round(v * 100) / 100; }

  // desconto ativo da seção (ou null)
  function descontoDe(c) {
    var d = c && c.desconto;
    return d && d.ativo && d.percentual > 0 ? d : null;
  }
  function textoDesconto(d) { return d.texto || (d.percentual + "% OFF"); }
  function pagar(preco, d) {
    return typeof preco === "number" && d ? arred(preco * (100 - d.percentual) / 100) : preco;
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

  var api = { arred: arred, descontoDe: descontoDe, textoDesconto: textoDesconto, pagar: pagar, linhas: linhas };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.REGRAS = api;
})(typeof window !== "undefined" ? window : this);
