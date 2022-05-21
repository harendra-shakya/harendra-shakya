'use strict';


const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore;

const changePlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 1 ? 0 : 1;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

const rollDice = function () {
    if (scores[activePlayer] < 100) {
        //1. genrate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        //2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3. Check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            changePlayer();
        }
    }
}

const holdScore = function () {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        diceEl.classList.add('hidden')
    } else {
        changePlayer();
    }

}

const init = function () {
    currentScore = 0;
    scores = [0, 0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--active');
    player1El.classList.remove('player--winner');

    player0El.classList.add('player--active');
    activePlayer = 0;
}

init();

btnRoll.addEventListener('click', rollDice);

btnHold.addEventListener('click', holdScore);

btnNew.addEventListener('click', init);