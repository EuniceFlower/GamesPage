import * as memory from './modules/memoryGame.js';
import './modules/breakGame.js';
import './modules/spaceInvader.js';
import { btnStart, showMole } from './modules/moleGame.js';
document.querySelector('.year').textContent = new Date().getFullYear();
/* Declaración nav selección */
const navigate = document.querySelectorAll('.nav-games a');

const gridComponent = document.querySelector('#grid-memory');
const sectionsGame = document.querySelectorAll('.game');

// Creamos tablero para el juego de memoria
const createBoard = (()=> {
    gridComponent.innerHTML = '';
    const content = document.createElement('div');
    content.setAttribute('class', 'content');
    for (let index = 0; index < memory.cardArray.length; index++ ) {
        const card = document.createElement('img');
        card.setAttribute('src', 'img/rainbow.png');
        card.setAttribute('alt', 'rainbow');
        card.setAttribute('class', 'memoryImg');
        card.setAttribute('data-id', index);
        memory.flipCard(card);
        content.appendChild(card);
    }
    gridComponent.appendChild(content);
});

const funcionalidadNav = (() => {
    navigate.forEach((elm) => {
        elm.addEventListener('click', () => {
            navigate.forEach(element => element.classList.remove("active"));
            elm.classList.add("active");
        });
    });
});



export const main = (() => {
    funcionalidadNav();
    memory.cardArray.sort(() => 0.5 - Math.random());
    createBoard();
});

export const mainMole = (() => {
    btnStart.addEventListener('click', () => {
        btnStart.disabled = true;
        showMole();
    });
});
const funcionObserver = entries => {
    entries.forEach(obj => {
        if (obj.isIntersecting) {
            const itemActual = Array.from(navigate).find(item => item.dataset.url == obj.target.id )
            itemActual.classList.add("active")
            for (const iterator of navigate) {
                if (iterator != itemActual) {
                    iterator.classList.remove("active")
                }
            }
        }
    })
}
const observer = new IntersectionObserver(funcionObserver, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
})
sectionsGame.forEach(section => observer.observe(section))

/* Incio de memory game */
main();
/* Inicio de whac a mole */
mainMole();

