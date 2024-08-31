const marco = document.querySelector('.grid-break');
const elementBall = document.createElement('div');
const scoreBreak = document.querySelector(".scoreBreak");
const blockWidth = 22;
const blockHeight = 8;
const gameBlockWidth = 28;
const gameBlockHeight = 7;
const startGamer = [35, 1];
let count = [...startGamer];
const startBall = [50, 8];
let startBallFlag = [...startBall];
const textScore = document.querySelector('.textScore');
const blockGamer = document.createElement('button');
const blockListCover = document.createElement('div');
/* Contador de resultados al colisionar con los bloques*/
let contResult = 0;
/* Cambiar la dirección, iniciamos en 2*/
let xDirection = 2;
let yDirection = 2;
let start;

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRigth = [xAxis + blockWidth ,yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRigth = [xAxis + blockWidth, yAxis + blockHeight];
    }
}
/** Es necesario el arreglo para posicionar los bloques en orden */
const blocks = [
    new Block(2, 90),
    new Block(26, 90),
    new Block(51, 90),
    new Block(75, 90),
    new Block(2, 80),
    new Block(26, 80),
    new Block(51, 80),
    new Block(75, 80),
    new Block(2, 70),
    new Block(26, 70),
    new Block(51, 70),
    new Block(75, 70),
    new Block(2, 60),
    new Block(26, 60),
    new Block(51, 60),
    new Block(75, 60)
]
/**
 * Necesitamos tener un arreglo auxiliar para poder reiniciar el juego
 */
let blocksAux = [...blocks];

/* Reseteamos el juego break */
const restartGameBreak = (() => {
    /* Reiniciamos el juego despues de 2 seg */
    contResult = 0;
    document.removeEventListener('keydown', moveUser);
    blockGamer.removeEventListener('click', selectGamer);
    clearInterval(start);
    blockListCover.querySelectorAll(".block").forEach((elm) => {
        blockListCover.removeChild(elm);
    })
    setTimeout(() => {
        count = [...startGamer];
        startBallFlag = [...startBall];
        xDirection = 2;
        yDirection = 2;
        blockGamer.disabled = false;
        scoreBreak.textContent = 0;
        textScore.textContent = "";
        createBlock();
        createBall();
        createGamer();
    }, 1000);
});

const moveUser = ((e) => {
    switch(e.key) {
        case ('ArrowLeft'):
            if (count[0] > 1) {
                count[0] -=2;
                blockGamer.style.left = count[0] +"%";
            }
            break;
            case ('ArrowRight'):
                if (count[0] < 100 - 31) {
                    count[0] +=2;
                    blockGamer.style.left = count[0] + "%";
                }
            break;
    }
});
/**
 * Cambiamos la dirección de la esfera si choca con los border del marco
 */
const changeDirection = (() => {
    if (xDirection == 2 && yDirection == 2) {
        yDirection = -2;
        return;
    }
        if (xDirection == 2 && yDirection == -2) {
        xDirection = -2;
        return;
    }
    if (xDirection == -2 && yDirection == -2) {
        yDirection = 2;
        return;
    }
    if (xDirection == -2 && yDirection == 2) {
        xDirection = 2;
        return;
    }
});
const checkForCollision = (() => {
    for (let i=0; i< blocksAux.length; i++) {
        if ((startBallFlag[0] + 5 > blocksAux[i].bottomLeft[0] && startBallFlag[0] < blocksAux[i].bottomRigth[0])
        && (startBallFlag[1] + 5 > blocksAux[i].bottomLeft[1] && startBallFlag[1] < blocksAux[i].topLeft[1]) ) {
            blockListCover.removeChild(blockListCover.querySelectorAll(".block")[i]);
            blocksAux.splice(i, 1);
            contResult += 1;
            scoreBreak.textContent = contResult;
            if ( contResult === 16 ) {
                textScore.textContent = "Amazing";
                /* Reinicia el juego */
                restartGameBreak();
            } else {
                changeDirection();
            } 
        }
    }

    if (((startBallFlag[0] >= count[0] || (count[0] - startBallFlag[0] >= 1 && count[0] - startBallFlag[0] <= 7  )) 
    && startBallFlag[0] <= count[0] + gameBlockWidth ) && (startBallFlag[1] >= count[1] && startBallFlag[1] <= count[1] + gameBlockHeight)) {
            changeDirection();
    }
    if (startBallFlag[0] >= 100 - ((100*49.9)/ (marco.getBoundingClientRect().width).toFixed(2) ) ||
        startBallFlag[1] >= 100 - ((100*49.9)/ (marco.getBoundingClientRect().height).toFixed(2) ) ||
        startBallFlag[0] <= 0) {
        changeDirection();
    }
    if (startBallFlag[1] <= 0) {
        clearInterval(start);
        textScore.textContent = "Loser";
        restartGameBreak();
    }
});
/** suma los ejes para mover la pelota */
const moveBall = (() => {
    startBallFlag[0] += xDirection;
    startBallFlag[1] += yDirection;
    axisBall();
    checkForCollision();
});

const axisBall = (() => {
    elementBall.style.left = startBallFlag[0]+"%";
    elementBall.style.bottom = startBallFlag[1]+"%";
});
/**
 * función necesaria para mover el bloque jugador de izq a derecha.
 */
const selectGamer = (() => {
        blockGamer.textContent = "← Move →";
        /* Deshabilitamos el boton al iniciar el juego */
        blockGamer.disabled = true;
        blockGamer.style.backgroundColor = 'rgba(0, 0, 0, 0.76)';
        blockGamer.style.color = "white";
        start = setInterval(moveBall, 40);
        document.addEventListener('keydown', moveUser);
});

/**
 * Crea y ubica los bloques en el marco.
 */
 const createBlock = (() => {
    blocksAux = [...blocks];
    for (let i = 0; i< blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.backgroundColor = "var(--verde-cielo)";
        block.style.left = blocks[i].bottomLeft[0]+'%';
        block.style.bottom = blocks[i].bottomLeft[1]+'%';
        blockListCover.classList.add('listCover');
        blockListCover.appendChild(block);
    }
    marco.appendChild(blockListCover);
});

const createBall = (() => {
    elementBall.classList.add('ballGame');
    axisBall();
    marco.appendChild(elementBall);
});

/**
 * Crea el bloque que será movido por el jugador.
 */
const createGamer = (() => {
    blockGamer.classList.add('blockGamer');
    blockGamer.textContent = "Click here";
    blockGamer.style.backgroundColor = "var(--nav)";
    blockGamer.style.border = '1px solid rgba(0, 0, 0, 0.5)';
    blockGamer.style.color = 'rgba(0, 0, 0, 0.4)';
    blockGamer.style.left = startGamer[0]+'%';
    blockGamer.style.bottom = startGamer[1]+'%';
    blockGamer.addEventListener('click', selectGamer);
    marco.appendChild(blockGamer);
});


createBlock(); //inicio
createBall(); //inicio 
createGamer(); //inicio