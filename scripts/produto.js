document.querySelector('#formProduto').addEventListener('submit', onSubmitFormProduto);

buscarProdutos();

const listaProduto = document.querySelector('#listaProduto');

function onSubmitFormProduto(evento) {
    evento.preventDefault();

    const produto = {
        nome: document.forms['formProduto']['nome'].value,
        descricao: document.forms['formProduto']['descricao'].value
    };

    requisicao(function () {
        adicionarProdutoNaLista(produto);
    }, 'POST', 'cadastrar', produto);
}

function buscarProdutos() {
    requisicao(function (produtos) {
        for (let i = 0, len = produtos.length; i < len; i++) {
            adicionarProdutoNaLista(produtos[i]);
        }
    }, 'GET', 'listar');
} 

function adicionarProdutoNaLista(produto) {
    const item = document.createElement('p');

    item.innerText = produto.nome;
    item.classList.add("itemProduto");

    listaProduto.appendChild(item);
}

function requisicao (onload, metodo, caminho, dados) {
    const reqHttp = new XMLHttpRequest();

    reqHttp.onload = function () {
        onload(JSON.parse(reqHttp.responseText));
    }

    reqHttp.onerror = function () {
        console.log(reqHttp.responseText);
    }


    reqHttp.open(metodo, 'http://localhost:19112/api_produto/' + caminho);

    reqHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    reqHttp.send(dados ? JSON.stringify(dados) : null);
}