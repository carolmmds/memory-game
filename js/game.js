const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos.`);
    }

}
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);

    }
}

const revealCard = ({ target }) => {
    //parentNode é o elemento pai da Div
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }
    //se a primeira carta clicada for igual a vazio, revelamos a carta, 
    //pegamos a carta e guardamos dentro da variavel firstCard
    if (firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
   
}

const createCard = (character) => {
    //create element cria um elemento html 
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${ character }.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);

    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {
    
    const duplicateCharacters = [ ...characters, ...characters ]; //pega os elementos do array characters e espalha dentro do array duplicateCharacters

    const suffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
    
    suffledArray.forEach((character) => {  
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () => {
    //salvar uma referencia do loop para em outra função parar o loop.
    //por isso utilizamos o This (que é um objeto), para recuperar o loop em outro lugar do projeto. 
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML; //O + na frente tenta converter uma string em número
        timer.innerHTML = currentTime + 1;

    }, 1000);
};

window.onload = () => {
    
    spanPlayer.innerHTML =localStorage.getItem('player');
    startTimer();
    loadGame();
}


