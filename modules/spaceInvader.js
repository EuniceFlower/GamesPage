const frame = document.querySelector('.grid-space');
let squares;
const squaresCover = document.createElement('div');

squaresCover.classList.add('squareCover');
frame.appendChild(squaresCover);



const drawSquares = (() => {
    squaresCover.querySelectorAll(".squares").forEach((elm) => {
        squaresCover.removeChild(elm);
    });
    let widthBody = parseInt(squaresCover.getBoundingClientRect().width) / 20;
    let heightBody = parseInt(squaresCover.getBoundingClientRect().height) / 20;
    
    for (let i = 0; i < parseInt(widthBody) * parseInt(heightBody); i ++) {
        squares = document.createElement('div');
        squares.classList.add('squares');
        squaresCover.appendChild(squares);
    }
});
const drawMesh = (() => {
    drawSquares();
});

const drawSquaresMain = (() => {
    let resizeCover = window.addEventListener('resize', drawMesh);    
    if (!resizeCover) {
        drawSquares();
    }
});

if (navigator.userAgent.match(/mobile/i)) {
    console.log("Es mobile");
}
console.log(window.matchMedia("only screen and (max-width: 393px)").matches)

drawSquaresMain();
