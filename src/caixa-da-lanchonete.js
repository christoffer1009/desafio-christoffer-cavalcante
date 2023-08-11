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

    metodoDePagamentoInvalido(metodoDePagamento) {
        return !this.metodosDePagamento.includes(metodoDePagamento)
    }


    calcularValorDaCompra(metodoDePagamento, itens) {
        const itensMap = this.mapearitens(itens)
        const itensInvalidos = this.contemExtraSemPrincipal(itensMap)
        if (itensInvalidos) {
            return 'Item extra não pode ser pedido sem o principal'
        }

        const metodoInvalido = this.metodoDePagamentoInvalido(metodoDePagamento)
        if (metodoInvalido) {
            return 'Forma de pagamento inválida!'
        }
        let valorCompra = 0
        itens.forEach(item => {
            let itemMap = this.mapearItem(item)
            valorCompra += itemMap.quantidade * this.cardapio.find((i) => i.codigo === itemMap.codigo).valor
        });

        return `R$ ${valorCompra.toFixed(2).replace('.', ',')}`;
    }

}

console.log(new CaixaDaLanchonete().calcularValorDaCompra('credito', ['sanduiche,1', 'cafe,1']))

export { CaixaDaLanchonete };
