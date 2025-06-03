const imagemPokemon = document.getElementById('pokemon-image'),
      inputPalpite = document.getElementById('guess-input'),
      botaoEnviar = document.getElementById('submit-btn'),
      botaoProximo = document.getElementById('next-btn');

let exibirMensagem, nomePokemonAtual = '';

const configurarExibicaoMensagem = () => {
    exibirMensagem = document.getElementById('message-display');
    if (!exibirMensagem) {
        exibirMensagem = document.createElement('p');
        exibirMensagem.id = 'message-display';
        document.querySelector('.input-container').parentNode.insertBefore(exibirMensagem, document.querySelector('.input-container').nextSibling);
    }
};

const buscarDados = async (id) => {
    try {
        let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        return resposta.ok ? await resposta.json() : null;
    } catch (erro) {
        exibirMensagem.textContent = "Erro ao carregar Pokémon.";
        exibirMensagem.style.color = 'orange';
        return null;
    }
};

const carregarPokemon = async () => {
    botaoEnviar.disabled = inputPalpite.disabled = botaoProximo.disabled = true;
    exibirMensagem.textContent = 'Carregando...';
    exibirMensagem.style.color = 'gray';
    imagemPokemon.style.filter = 'brightness(0)';

    let dados = await buscarDados(Math.floor(Math.random() * 250) + 1);

    if (dados) {
        imagemPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dados.id}.png`;
        imagemPokemon.alt = "Silhueta do Pokémon";
        nomePokemonAtual = dados.name.toLowerCase();
        inputPalpite.value = exibirMensagem.textContent = exibirMensagem.style.color = '';
        botaoEnviar.disabled = inputPalpite.disabled = botaoProximo.disabled = false;
    } else {
        exibirMensagem.textContent = 'Falha ao carregar Pokémon.';
        exibirMensagem.style.color = 'red';
        botaoProximo.disabled = false;
    }
};

const verificarPalpite = () => {
    let palpite = inputPalpite.value.toLowerCase().trim();
    botaoEnviar.disabled = inputPalpite.disabled = true;

    if (palpite === nomePokemonAtual) {
        exibirMensagem.textContent = "Parabéns! Você acertou!";
        exibirMensagem.style.color = 'green';
        imagemPokemon.style.filter = 'brightness(1)';
    } else {
        let nomeCorreto = nomePokemonAtual.charAt(0).toUpperCase() + nomePokemonAtual.slice(1);
        exibirMensagem.textContent = `Não é o Pikachu era o ${nomeCorreto}.`;
        exibirMensagem.style.color = 'red';
        imagemPokemon.style.filter = 'brightness(1)';
    }
};

botaoEnviar.addEventListener('click', verificarPalpite);
inputPalpite.addEventListener('keypress', (evento) => evento.key === 'Enter' && !botaoEnviar.disabled && verificarPalpite());
botaoProximo.addEventListener('click', carregarPokemon);

document.addEventListener('DOMContentLoaded', () => {
    configurarExibicaoMensagem();
    carregarPokemon();
});