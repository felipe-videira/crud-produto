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

    requisicao(function() {
        atualizarLista(produto);
    }, 'POST', 'cadastrar', produto);
}

function buscarProdutos() {
    requisicao(function(produtos) {
        for (let i = 0, len = produtos.length; i < len; i++) {
            atualizarLista(produtos[i]);
        }
    }, 'GET', 'listar');
};



function atualizarLista(produto) {
    if (produto.id) {
        const itemDaLista = document.querySelector('#id' + produto.id);
        if (itemDaLista) {
            itemDaLista.innerText = produto.nome;
            return;
        }
    };

    const item = document.createElement('p');


    const botaoExcluir = criarButton(function() {
        deletarProduto(produto)
    }, 'assets/imagens/delete.png');

    const botaoEditar = criarButton(function() {
        editarProduto(produto)
    }, 'assets/imagens/editar.png');



    item.innerText = produto.nome;
    item.classList.add("itemProduto");
    item.id = 'id' + produto.id;

    item.appendChild(botaoExcluir);
    item.appendChild(botaoEditar);
    listaProduto.appendChild(item);


};

function criarButton(onclick, caminhoIcone) {
    const botao = document.createElement('button');
    botao.type = 'button';

    botao.addEventListener('click', onclick);

    const icone = document.createElement('img')
    icone.src = caminhoIcone;
    botao.appendChild(icone);
    return botao;
};

function deletarProduto(produto) {
    requisicao(function() {
        const itemDaLista = document.querySelector('#id' + produto.id);
        if (itemDaLista) {
            itemDaLista.remove();
        }
    }, 'DELETE', 'deletar/' + produto.id);
};

function editarProduto(produto) {


    console.log(produto)
};

function requisicao(onload, metodo, caminho, dados) {
    const reqHttp = new XMLHttpRequest();

    reqHttp.onload = function() {
        onload(JSON.parse(reqHttp.responseText));
    }

    reqHttp.onerror = function() {
        console.log(reqHttp.responseText);
    }


    reqHttp.open(metodo, 'http://localhost:19112/api_produto/' + caminho);

    reqHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    reqHttp.send(dados ? JSON.stringify(dados) : null);
};