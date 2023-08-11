class CaixaDaLanchonete {
    // Cardápio com os itens e seus códigos, descrições e valores
    cardapio =
        [
            {
                codigo: "cafe",
                descrição: "Café",
                valor: 3,
            },
            {
                codigo: "chantily",
                descrição: "Chantily (extra do Café)",
                valor: 1.50,
            },
            {
                codigo: "suco",
                descrição: "Suco Natural",
                valor: 6.20,
            },
            {
                codigo: "sanduiche",
                descrição: "Sanduíche",
                valor: 6.50,
            },
            {
                codigo: "queijo",
                descrição: "Queijo (extra do Sanduíche)",
                valor: 2.00,
            },
            {
                codigo: "salgado",
                descrição: "Salgado",
                valor: 7.25,
            },
            {
                codigo: "combo1",
                descrição: "1 Suco e 1 Sanduíche",
                valor: 9.50,
            },
            {
                codigo: "combo2",
                descrição: "1 Café e 1 Sanduíche",
                valor: 7.50
            }
        ]
    // Métodos de pagamento aceitos
    metodosDePagamento = ['debito', 'credito', 'dinheiro']

    // Função para mapear um item a partir de uma string no formato 'codigo,quantidade'
    mapearItem(codigoQuantidade) {
        const item = codigoQuantidade.split(',')
        return { codigo: item[0], quantidade: parseInt(item[1]) }
    }

    // Função para mapear um array de itens no formato 'codigo,quantidade'
    mapearitens(itens) {
        return itens.map(item => this.mapearItem(item))
    }

    // Verifica se há itens extras sem o item principal correspondente
    contemExtraSemPrincipal(itens) {

        if (itens.some(i => i.codigo === 'chantily')) {
            if (!itens.some(i => i.codigo === 'cafe')) {
                return true
            }
        }

        if (itens.some(i => i.codigo === 'queijo')) {
            if (!itens.some(i => i.codigo === 'sanduiche')) {
                return true
            }
        }

        return false
    }

    // Verifica se o método de pagamento é válido
    validaMetodoDePagamento(metodoDePagamento) {
        if (!this.metodosDePagamento.includes(metodoDePagamento)) { return { erro: true, mensagem: 'Forma de pagamento inválida!' } }

        return true
    }

    // Validação de itens
    validaItens(itens) {

        const itensMap = this.mapearitens(itens)

        // Valida a quantiadde = 0
        if (itensMap.some(i => i.quantidade === 0))
            return { erro: true, mensagem: 'Quantidade inválida!' }

        // Valida carrinho vazio
        if (itensMap.length === 0)
            return { erro: true, mensagem: 'Não há itens no carrinho de compra!' }

        // Verifica se há itens extras sem o item principal correspondente
        if (this.contemExtraSemPrincipal(itensMap))
            return { erro: true, mensagem: 'Item extra não pode ser pedido sem o principal' }

        // Verifica se há itens com código inválido
        let codigoInvalido
        itensMap.forEach(i => {
            if (!this.cardapio.some(item => item.codigo === i.codigo)) {
                codigoInvalido = true;
            }
        });

        if (codigoInvalido)
            return { erro: true, mensagem: 'Item inválido!' }

        return true
    }

    // Calcula o valor total da compra com base nos itens e método de pagamento
    calcularValorDaCompra(metodoDePagamento, itens) {
        const itensMap = this.mapearitens(itens)

        let valorCompra = 0

        const metodoDePagamentoValido = this.validaMetodoDePagamento(metodoDePagamento)
        if (metodoDePagamentoValido.erro) {
            return metodoDePagamentoValido.mensagem
        }

        const itensValidos = this.validaItens(itens)
        if (itensValidos.erro) {
            return itensValidos.mensagem
        }

        itensMap.forEach(item => {
            valorCompra += item.quantidade * this.cardapio.find((i) => i.codigo === item.codigo).valor
        });

        // Aplica desconto ou incremento no valor final com base no metodo de pagamento
        switch (metodoDePagamento) {
            case 'credito':
                valorCompra *= 1.03
                break;
            case 'dinheiro':
                valorCompra *= 0.95
            default:
                break;
        }

        // Formata a saída
        return `R$ ${valorCompra.toFixed(2).replace('.', ',')}`;
    }

}

export { CaixaDaLanchonete };
