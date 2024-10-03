// Estrutura básica do produto
class Produto {
  constructor(nome, estoque, preco, vendasDiarias) {
      this.nome = nome;
      this.estoque = estoque;
      this.preco = preco;
      this.vendasDiarias = vendasDiarias; // média de vendas diárias
  }
}

// Loja que armazena os produtos
class Loja {
  constructor() {
      this.produtos = [];
  }

  // Função para criar um novo produto
  criarProduto(nome, estoque, preco, vendasDiarias) {
      const novoProduto = new Produto(nome, estoque, preco, vendasDiarias);
      this.produtos.push(novoProduto);
  }

  // Função para adicionar um produto diretamente na loja
  adicionarProdutoNaLoja(produto) {
      this.produtos.push(produto);
  }

  // Função para vender produtos por um dia e atualizar o estoque
  venderDia() {
      this.produtos.forEach(produto => {
          const vendas = Math.min(produto.vendasDiarias, produto.estoque); // Garantir que não vendemos mais que o estoque
          produto.estoque -= vendas;
          console.log(`Vendeu ${vendas} unidades do produto ${produto.nome}. Estoque atual: ${produto.estoque}`);
      });
  }

  // Função para calcular quantos dias até o estoque zerar
  diasAteEstoqueZerado() {
      this.produtos.forEach(produto => {
          if (produto.vendasDiarias > 0) {
              const diasRestantes = Math.ceil(produto.estoque / produto.vendasDiarias);
              console.log(`Produto ${produto.nome} terá estoque zerado em ${diasRestantes} dias.`);
          } else {
              console.log(`Produto ${produto.nome} não está sendo vendido atualmente.`);
          }
      });
  }

  // Função para verificar qual produto está mais próximo de esgotar o estoque
  produtoMaisProximoDeEsgotar() {
      let produtoMaisCritico = null;
      let menorDias = Infinity;

      this.produtos.forEach(produto => {
          if (produto.vendasDiarias > 0) {
              const diasRestantes = Math.ceil(produto.estoque / produto.vendasDiarias);
              if (diasRestantes < menorDias) {
                  menorDias = diasRestantes;
                  produtoMaisCritico = produto;
              }
          }
      });

      if (produtoMaisCritico) {
          console.log(`O produto mais próximo de esgotar é ${produtoMaisCritico.nome}, com estoque acabando em ${menorDias} dias.`);
      } else {
          console.log("Nenhum produto está próximo de esgotar.");
      }
  }

  // Função para sugerir uma quantidade de reabastecimento com base no histórico de vendas
  sugerirReabastecimento() {
      this.produtos.forEach(produto => {
          const quantidadeSugerida = produto.vendasDiarias * 30; // Baseado em 30 dias de vendas
          console.log(`Sugestão de reabastecimento para ${produto.nome}: ${quantidadeSugerida} unidades.`);
      });
  }

  // Função para simular vendas por 30 dias
  simularVendasPor30Dias() {
      for (let i = 1; i <= 30; i++) {
          console.log(`\nDia ${i}`);
          this.venderDia();
      }
  }
}

// Exemplo de uso
const loja = new Loja();
loja.criarProduto("Produto A", 100, 10, 5);
loja.criarProduto("Produto B", 50, 20, 8);
loja.criarProduto("Produto C", 200, 15, 2);

loja.simularVendasPor30Dias();
loja.diasAteEstoqueZerado();
loja.produtoMaisProximoDeEsgotar();
loja.sugerirReabastecimento();
