const player1 = "X";
const player2 = "O";
let gameOver = false;
let start = player1; //quem começa
const imagens = [];


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function preloadImages() {
    for (let i = 0; i < preloadImages.arguments.length; i++) {
        imagens[i] = new Image();
        imagens[i].src = preloadImages.arguments[i]
    }
}

//alterar a vez
function atualizaMostrador() {
    if (gameOver) {
        return;
    }
    (start === player1) ? alterarVez(0) : alterarVez(1);

}

function alterarVez(play) {
    let player = document.querySelectorAll("div#mostrador img")[0];
    player.setAttribute("src", imagens[play].src);

}

//pegar espaços do tabuleiro
function pegarJogadas(campos) {
    let tabuleiro = {};
    campos.forEach(campo => tabuleiro[campo] = document.getElementById(campo).getAttribute("jogada"));
    return tabuleiro;
}

async function verificarVencedor() {
    const position = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c2', 'c3', 'c1'];
    const {a1, a2, a3, b1, b2, b3, c1, c2, c3,} = pegarJogadas(position);
    let vencedor = "";
    if (((a1 === b1 && a1 === c1) || (a1 === a2 && a1 === a3) || (a1 === b2 && a1 === c3)) && a1 !== "") {
        vencedor = a1;
    }
    if ((b2 === b1 && b2 === b3 && b2 !== "") || (b2 === a2 && b2 === c2 && b2 !== "") || (b2 === a3 && b2 === c1 && b2 !== "")) {
        vencedor = b2;
    }
    if (((c3 === c2 && c3 === c1) || (c3 === a3 && c3 === b3)) && c3 !== "") {
        vencedor = c3;
    }
    if (vencedor !== "") {
        gameOver = true;
        await sleep(50);
        alert("'" + vencedor + "'" + " ganhou!");
    }
}


function inicializarEspacos() {
    const espacos = document.getElementsByClassName("espaco");
    for (let i = 0; i < espacos.length; i++) {
        inicializar(espacos[i]);
    }

}

function inicializar(espacos) {
    espacos.innerHTML = `<img id='p1' src='${imagens[0].src}' border='0'><img id='p2' src='${imagens[1].src}' border='0'>`;
    espacos.getElementsByTagName('img')[0].style.display = "none";
    espacos.getElementsByTagName('img')[1].style.display = "none";
    espacos.addEventListener("click", function () {
        if (gameOver || this.getAttribute("jogada") !== "") {
            return;
        }
        if (start === player1) {
            altenarPlay(espacos, player2, player1, 0);
        } else {
            altenarPlay(espacos, player1, player2, 1);
        }
        atualizaMostrador();
        verificarVencedor();
    });
}

const atualizarMostradorAndEspacos = () => {
    atualizaMostrador();
    inicializarEspacos();
};

function altenarPlay(espacos, player, playerDaVez, index) {
    espacos.getElementsByTagName('img')[index].style.display = "inline";
    espacos.setAttribute("jogada", playerDaVez);
    start = player;
}

preloadImages("asset/img/x.png", "asset/img/o.png");
atualizarMostradorAndEspacos();
