import { main } from './../main.js';
/* Memory game
    whac-a-mole
    breakout
    space invader */
const scoreSpam = document.querySelector('#result');
let cardChoose = [], contador = 0, score = 0;

export const cardArray = [
        { name: 'bart', img: 'img/bart.png' },
        { name: 'cute', img: 'img/cute.png' },
        { name: 'bob', img: 'img/bob.png' },
        { name: 'heart', img: 'img/heart.png' },
        { name: 'bob', img: 'img/bob.png' },
        { name: 'homero', img: 'img/homero.png' },
        { name: 'woman', img: 'img/woman.png' },
        { name: 'cute', img: 'img/cute.png' },
        { name: 'bart', img: 'img/bart.png' },
        { name: 'woman', img: 'img/woman.png' },
        { name: 'heart', img: 'img/heart.png' },
        { name: 'homero', img: 'img/homero.png' },
    ];

    /* función que  */
    const checkMatch = (() => {
        const cards = document.querySelectorAll('.memoryImg');
        if (cardChoose[0].name === cardChoose[1].name) {
            contador += 1;
            cards[cardChoose[0].id].removeEventListener('click', flipCard);
            cards[cardChoose[1].id].removeEventListener('click', flipCard);
            score = score + (100 / 6);
            scoreSpam.textContent = parseInt(score).toString();
            if (contador === 6) {
                contador = 0;
                score = 0;
                setTimeout(() => {
                    alert("awesome!!");
                    main();
                    scoreSpam.textContent = '0';
                }, 700);
            }
        } else {
            cards[cardChoose[0].id].setAttribute('src', 'img/rainbow.png')
            cards[cardChoose[1].id].setAttribute('src', 'img/rainbow.png')
        }
        cardChoose = [];
    });

export const flipCard = ((card) => {
    card.addEventListener('click', () => {
        let dataId = card.getAttribute('data-id');
        cardChoose.push({ name: cardArray[dataId].name, id: dataId } );
        card.setAttribute('src', cardArray[dataId].img);
        if (cardChoose.length == 2) {
            setTimeout(checkMatch, 300);
        }
    });
});