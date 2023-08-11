class CaixaDaLanchonete {
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

    metodosDePagamento = ['debito', 'credito', 'dinheiro']

    mapearItem(codigoQuantidade) {
        const item = codigoQuantidade.split(',')
        return { codigo: item[0], quantidade: parseInt(item[1]) }
    }

    mapearitens(itens) {
        return itens.map(item => this.mapearItem(item))
    }

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

    validaMetodoDePagamento(metodoDePagamento) {
        if (!this.metodosDePagamento.includes(metodoDePagamento)) { return { erro: true, mensagem: 'Forma de pagamento inválida!' } }

        return true
    }

    validaItens(itens) {

        const itensMap = this.mapearitens(itens)

        if (itensMap.some(i => i.quantidade === 0))
            return { erro: true, mensagem: 'Quantidade inválida!' }

        if (itensMap.length === 0)
            return { erro: true, mensagem: 'Não há itens no carrinho de compra!' }


        if (this.contemExtraSemPrincipal(itensMap))
            return { erro: true, mensagem: 'Item extra não pode ser pedido sem o principal' }

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

        switch (metodoDePagamento) {
            case 'credito':
                valorCompra *= 1.03
                break;
            case 'dinheiro':
                valorCompra *= 0.95
            default:
                break;
        }

        return `R$ ${valorCompra.toFixed(2).replace('.', ',')}`;
    }

}

console.log(new CaixaDaLanchonete().calcularValorDaCompra('credito', ['sanduiche,1', 'queijo,0']))

export { CaixaDaLanchonete };
