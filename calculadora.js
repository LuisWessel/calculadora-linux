const tela = document.querySelector('div#tela')
const sinais = ['x', '/', '+', '-']

let codenum = 0 // indica em qual numero esta sendo inserido as informações, codigo do num
let ponto = [false, false] //se número já tem ponto
let n = ['', ''] // numeros
let operacao = 0 // qual tipo de operação a ser realizada
let memoria = '' // oq vai aparecerendo na tela /memoria
let trava = 0

function calc(botao) {
    if (trava == 1) {
        if (botao == 'C') { // reseta a calc
            memoria = ''
            n[0] = ''
            n[1] = ''
            codenum = 0
            operacao = 0
            trava = 0
        }
    } else {
        if (typeof(botao) == 'string' && botao != '.') {

            if (botao == 'C') { // reseta a calc
                memoria = ''
                n = ['', '']
                ponto = [false, false]
                codenum = 0
                operacao = 0

            } else if (botao == 'c') { // corrige
                if (codenum == 1 && (n[codenum]).length == 0) {
                    operacao = 0
                    codenum = 0
                }

                if (memoria[(memoria.length - 1)] == n[codenum][(n[codenum].length - 1)]) {
                    if (n[codenum][(n[codenum].length - 1)] == '.') {
                        ponto[codenum] = false
                    }
                    n[codenum] = (n[codenum]).slice(0, ((n[codenum]).length - 1))
                }

                memoria = memoria.slice(0, (memoria.length - 1)) //string - ultimo elemento

            } else {

                switch (botao) {
                    case 'x':
                        if (add('x')) calcula(1)
                        break
                    case '/':
                        if (add('/')) calcula(2)
                        break
                    case '+':
                        if (add('+')) calcula(3)
                        break
                    case '-':
                        if (add('-')) calcula(4)
                        break
                    default: //chamada pelo botão igual
                        calcula(0)
                }
            }
        } else { // numeros
            if (botao == '.') { // se for ponto
                if (ponto[codenum] == false) { // se o número ainda não tem ponto
                    add(botao) // adiciona o ponto
                    ponto[codenum] = true
                }
            } else {
                add(botao) // se for numero adiciona o numero
            }
        }

    }
    tela.innerHTML = memoria
}

function add(a) { // passa info pra tela

    let ret = 1

    if (n[codenum].length == 0 && a == '-') { //sinal menos no inicio do numero
        n[codenum] += (a)
        memoria += a
        ret = 0

    } else if (sinais.indexOf(a) != -1) { //sinais no geral
        if ((a != '-' && (sinais.indexOf(memoria[memoria.length - 1]) != -1)) || (memoria[memoria.length - 1] == '+' && a == '-') ||
            (memoria[memoria.length - 1] == a)) {
            memoria = memoria.slice(0, (memoria.length - 1)) // tratamento de inserção de sinais seguidos
            if (operacao != 0) operacao = (sinais.indexOf(a) + 1)
            ret = 0

        } else if (n[codenum].length == 0) {
            n[codenum] = '0'
            memoria += n[codenum]

        }
        memoria += a
        if (n[0] != '-') codenum = 1

    } else { //numeros e ponto
        n[codenum] += (a)
        memoria += a
    }

    return ret
}

function calcula(c) {
    if (operacao == 0) {
        operacao = c //primeira chamada
        if (c != 0) codenum = 1
    } else {
        if (n[1] == '') n[1] = 0

        const result = ['', 'x', '/', '+', '-']
        switch (operacao) {
            case 1:
                n[0] = Number(n[0]) * Number(n[1])
                break
            case 2:
                if (n[1] == 0) {
                    memoria = 'ERRO: Não da pra dividir por 0'
                    alert('Não é possivel dividir por 0!!')
                    tela.innerHTML = memoria
                    trava = 1
                    return
                }
                n[0] = Number(n[0]) / Number(n[1])
                break
            case 3:
                n[0] = Number(n[0]) + Number(n[1])
                break
            case 4:
                console
                n[0] = Number(n[0]) - Number(n[1])
                break
        }

        if (c == 0) codenum = 0
        else codenum = 1 // variavel para setar em qual numero vamos mexer

        if (isNaN(n[0]) || (sinais.indexOf(memoria[0]) != -1 && memoria[0] != '-')) {
            trava = 1
            memoria = 'ERRO, corrija a expressão'
            alert('Erro na expressão')
            return
        }

        n[1] = '' // reseta o segundo número
        ponto[1] = false
        n[0] = n[0].toFixed(2)
        ponto[0] = true
        memoria = `${n[0]}${result[c]}` //printa o resultado na tela
        operacao = c // atualiza a variavel de controle
    }
}