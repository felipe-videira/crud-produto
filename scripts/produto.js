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

    requisicao(function(resposta) {
        atualizarLista(resposta);
    }, produto.id ? 'PUT' : 'POST', '/produto', produto);
}

function buscarProdutos() {
    requisicao(function(produtos) {
        for (let i = 0, len = produtos.length; i < len; i++) {
            atualizarLista(produtos[i]);
        }
    }, 'GET', '/produto');
};



function atualizarLista(produto) {
    if (produto.id) {
        const itemDaLista = document.querySelector('#id' + produto.id);

        if (itemDaLista) {
            itemDaLista.querySelector('span').innerText = produto.nome;
            return;
        }
    };

    const item = document.createElement('div');

    const titulo = document.createElement('span');

    const botaoExcluir = criarButton(function() {
        deletarProduto(produto)
    }, 'assets/imagens/delete.png', 'botaoExcluirId' + produto.id);

    const botaoEditar = criarButton(function() {
        editarProduto(produto)
    }, 'assets/imagens/editar.png', 'botaoEditarId' + produto.id);


    titulo.innerText = produto.nome;
    item.classList.add("itemProduto");
    item.id = 'id' + produto.id;

    item.appendChild(titulo);
    item.appendChild(botaoExcluir);
    item.appendChild(botaoEditar);
    listaProduto.appendChild(item);

};

function criarButton(onclick, caminhoIcone, id) {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.id = id;

    botao.addEventListener('click', onclick);

    const icone = document.createElement('img');
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
    }, 'DELETE', '/produto/' + produto.id);
};

let idEditar;

function editarProduto({ id }) {
    document.forms['formProduto']['id'].value = id;
    requisicao(function(produto) {
        document.forms['formProduto']['nome'].value = produto.nome;
        document.forms['formProduto']['descricao'].value = produto.descricao;
    }, 'GET', '/produto/' + id);

    document.querySelector('#botaoEditarId' + id).style.backgroundColor = 'orange';



    if (idEditar && id !== idEditar) {
        document.querySelector('#botaoEditarId' + idEditar).style.backgroundColor = '#EFEFEF';
    }

    idEditar = id;
};

function requisicao(onload, metodo, caminho, dados) {
    const reqHttp = new XMLHttpRequest();

    reqHttp.onload = function() {
        onload(JSON.parse(reqHttp.responseText));
    }

    reqHttp.onerror = function() {
        console.log(reqHttp.responseText);
    }


    reqHttp.open(metodo, 'http://localhost:19112' + caminho);

    reqHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    reqHttp.send(dados ? JSON.stringify(dados) : null);
};