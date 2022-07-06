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

        } else if (botao == '.') {

            if (ponto[codenum] == false) { // se o número ainda não tem ponto
                add(botao) // adiciona o ponto
                ponto[codenum] = true
            }

        } else if (botao == '=') {

            calculatudo(memoria)

        } else {

            add(botao) // se for numero ou operação adiciona
        }


    }
    tela.innerHTML = memoria
}

function add(a) { // passa info pra tela

    let ret = 1

    if (sinais.indexOf(a) != -1) { //sinais no geral
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


function calculatudo(exp) {
    exp = exp.toString().split("+");
    for (a = 0; a < exp.length; a++) {
        exp[a] = exp[a].split("-");
        for (b = 0; b < exp[a].length; b++) {
            exp[a][b] = exp[a][b].split("x");

            for (c = 0; c < exp[a][b].length; c++) {
                //faz divisão primeiro
                exp[a][b][c] = exp[a][b][c].split("/");
                exp[a][b][c] = divideArray(exp[a][b][c]);
            }
            //faz multiplicação segundo
            exp[a][b] = multiplicaArray(exp[a][b]);
        }
        //faz subtração terceiro
        exp[a] = subtraiArray(exp[a]);
    }
    //faz soma quarto
    exp = somaArray(exp);


    if (exp.toString().indexOf(".") != -1) {
        ponto[0] = true;
    }

    codenum = 0 // indica em qual numero esta sendo inserido as informações, codigo do num
    n = [exp, ''] // numeros
    operacao = 0 // qual tipo de operação a ser realizada
    trava = 0
    memoria = exp.toString();

}

function multiplicaArray(param) {
    var res = 1;
    for (var x = 0; x < param.length; x++) {
        res *= param[x];
    }
    return res;
}

function divideArray(param) {
    var res = param[0];
    for (var x = 1; x < param.length; x++) {
        res /= param[x];
    }
    return res;
}

function subtraiArray(param) {
    var res = param[0];
    for (var x = 1; x < param.length; x++) {
        res -= param[x];
    }
    return res;
}

function somaArray(param) {
    var res = 0;
    for (var x = 0; x < param.length; x++) {
        res += param[x];
    }
    return res;
}