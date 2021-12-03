let order = [];
let clickedOrder = [];
let round = 0;
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const roundMenu = document.querySelector('.round');
const scoreMenu = document.querySelector('.score');

//Cria ordem aleatória de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//Acende a próxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);

    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

//Checa se os botões clicados são os mesmos da ordem gerada pelo jogo
let checkOrder = () =>  {
    for (let i in clickedOrder){
        if(clickedOrder[i] !== order[i]){
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        scoreMenu.textContent = score; 
        score = score + (round * 10);
        scoreMenu.textContent = score; 
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

//Função para clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250)
    
}

//Função que retorna a cor
let createColorElement = (color) => {

    switch (color) {
        case 0:
            return green;
        case 1: 
            return red;
        case 2:
            return yellow;
        case 3 :
            return blue;
    }

}

//Função para próximo nível do jogo
let nextLevel = () => {
    round++;
    roundMenu.textContent = round;
    shuffleOrder();
}  

//Função para game over
let gameOver = () => {
    alert(`Pontuação: ${score}\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    score = 0;
    scoreMenu.textContent = score;
    order = [];
    clickedOrder = [];
    playGame();
}

let playGame = () => {
    alert("Bem vindo ao Genius! Iniciando novo jogo.")
    round = 0;

    nextLevel();
} 

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();