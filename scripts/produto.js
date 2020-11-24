document.querySelector('#formProduto').addEventListener('submit', onSubmitFormProduto);

buscarProdutos();

const listaProduto = document.querySelector('#listaProduto');

function onSubmitFormProduto(evento) {
    evento.preventDefault();

    const produto = {
        nome: document.forms['formProduto']['nome'].value,
        descricao: document.forms['formProduto']['descricao'].value
    };

    const reqHttp = new XMLHttpRequest();

    reqHttp.onload = function () {
        console.log(reqHttp.responseText);

        adicionarProdutoNaLista(produto);
    }

    reqHttp.onerror = function () {
        console.log(reqHttp.responseText);
    }

    reqHttp.open('POST', 'https://5fb5b78836e2fa00166a48cc.mockapi.io/produtos');

    reqHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    reqHttp.send(JSON.stringify(produto));
}

function buscarProdutos() {

    const reqHttp = new XMLHttpRequest();

    reqHttp.onload = function () {
        const produtos = JSON.parse(reqHttp.responseText);

        for (let i = 0, len = produtos.length; i < len; i++) {
            adicionarProdutoNaLista(produtos[i]);
        }
    }

    reqHttp.onerror = function () {
        console.log(reqHttp.responseText);
    }

    reqHttp.open('GET', 'https://5fb5b78836e2fa00166a48cc.mockapi.io/produtos');

    reqHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    reqHttp.send();
} 

function adicionarProdutoNaLista(produto) {
    const item = document.createElement('p');

    item.innerText = produto.nome;
    item.classList.add("itemProduto");

    listaProduto.appendChild(item);
}