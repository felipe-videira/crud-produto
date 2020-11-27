document.querySelector('#formProduto').addEventListener('submit', onSubmitFormProduto);

buscarProdutos();

const listaProduto = document.querySelector('#listaProduto');

function onSubmitFormProduto(evento) {
    evento.preventDefault();

    const produto = {
        id: document.forms['formProduto']['id'].value,
        nome: document.forms['formProduto']['nome'].value,
        descricao: document.forms['formProduto']['descricao'].value
    };

    requisicao(function () {
        atualizarLista(produto);
    }, 'POST', 'cadastrar', produto);
}

function buscarProdutos() {
    requisicao(function (produtos) {
        for (let i = 0, len = produtos.length; i < len; i++) {
            atualizarLista(produtos[i]);
        }
    }, 'GET', 'listar');
} 

function atualizarLista(produto) {
    if (produto.id) {
        const itemDaLista = document.querySelector('#id' + produto.id );
        if (itemDaLista) {
            itemDaLista.innerText = produto.nome;
            return; 
        } 
    } 
    
    const item = document.createElement('p');
    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerText = 'Deletar';
    botaoExcluir.type = 'button';
    
    botaoExcluir.addEventListener('click', function(){
        deletarProduto(produto.id)
    });

    item.innerText = produto.nome;
    item.classList.add("itemProduto");
    item.id = 'id' + produto.id;
    
    item.appendChild(botaoExcluir);
    listaProduto.appendChild(item);
}

function deletarProduto(id){
    requisicao(function (){
        const itemDaLista = document.querySelector('#id' + id);
        if (itemDaLista) {
            itemDaLista.remove();
        }
    } , 'DELETE', 'deletar/' + id);    
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