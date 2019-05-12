const player1 = "X";
const player2 = "O";
var gameOver = false;
var start = player1; //quem começa
var imagens = new Array();


function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}


function preloadImages(){
	for (i = 0; i < preloadImages.arguments.length; i++) {
		imagens[i] = new Image()
		imagens[i].src = preloadImages.arguments[i]
	}
}


function atualizaMostrador(){
	if (gameOver) {
		return;
	}
	if (start == player1) {
		var player = document.querySelectorAll("div#mostrador img")[0];
		player.setAttribute("src", imagens[0].src);
	} else{
		var player = document.querySelectorAll("div#mostrador img")[0];
		player.setAttribute("src", imagens[1].src);
	}
}


async function verificarVencedor(){
	var a1 = document.getElementById("a1").getAttribute("jogada");
	var a2 = document.getElementById("a2").getAttribute("jogada");
	var a3 = document.getElementById("a3").getAttribute("jogada");

	var b1 = document.getElementById("b1").getAttribute("jogada");
	var b2 = document.getElementById("b2").getAttribute("jogada");
	var b3 = document.getElementById("b3").getAttribute("jogada");

	var c1 = document.getElementById("c1").getAttribute("jogada");
	var c2 = document.getElementById("c2").getAttribute("jogada");
	var c3 = document.getElementById("c3").getAttribute("jogada");

	var vencedor = "";
	if(((a1 == b1 && a1 == c1) || (a1 == a2 && a1 == a3 ) || (a1 == b2 && a1 == c3 )) && a1 != ""  ){
		vencedor = a1;
	}else if((b2 == b1 && b2 == b3 && b2 !="" ) || (b2 == a2 && b2 == c2 && b2 !="") || (b2 == a3 && b2 == c1 && b2 != "")){
		vencedor = b2;
	}else if(((c3 == c2 && c3 == c1)||(c3 == a3 && c3 == b3)) && c3 != ""){
		vencedor = c3;
	}
	if (vencedor != "") {
		gameOver = true;
		await sleep(50);
		alert("'" + vencedor + "'" + " ganhou!");
	}
}


function inicializarEspacos(){
	var espacos = document.getElementsByClassName("espaco");
	for (var i = 0; i < espacos.length; i++) {
		espacos[i].innerHTML = "<img id='p1' src='"+imagens[0].src+"' border='0'><img id='p2' src='"+ imagens[1].src + "' border='0'>";
		espacos[i].getElementsByTagName('img')[0].style.display = "none";
		espacos[i].getElementsByTagName('img')[1].style.display = "none";
		espacos[i].addEventListener("click", function(){
			if (gameOver) {
				return;
			}
			if(this.getAttribute("jogada") == ""){
				if (start == player1) {
					this.getElementsByTagName('img')[0].style.display = "inline";
					//this.innerHTML = "<img src='"+images[0].src+"' border='0'>";
					this.setAttribute("jogada", player1);
					start = player2;
				}else{
					this.getElementsByTagName('img')[1].style.display = "inline";
					//this.innerHTML = "<img src='"+images[1].src+"' border='0'>";
					this.setAttribute("jogada", player2);
					start = player1;
				}
				atualizaMostrador();
				verificarVencedor();
			}
		});
	}
}


preloadImages("imagens/x.png", "imagens/o.png")
atualizaMostrador();
inicializarEspacos();
