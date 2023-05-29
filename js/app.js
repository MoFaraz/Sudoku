import {drawBoard} from "./draw_board.js";
import {sudokuGen, sudokuCheck} from "./sudoku.js";
import {addToInputs} from "./load_board.js";
import {backtracking,CSP,solve1} from "./solve.js";
import {containsOnlyNumbers} from "./regex.js";

document.querySelector('#dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDarkMode = document.body.classList.contains('dark');
    localStorage.setItem('darkmode', isDarkMode);
    // chang mobile status bar color
    document.querySelector('meta[name="theme-color"]').setAttribute('content', isDarkMode ? '#1a1a2e' : '#fff');
});

// initial value

// screens
const start_screen = document.querySelector('#start-screen');
const game_screen = document.querySelector('#game-screen');
const pause_screen = document.querySelector('#pause-screen');
const result_screen = document.querySelector('#result-screen');
// ----------

// Button
const solve = document.getElementById('solve-btn');
const load = document.getElementById('load-btn')
// ----------


const name_input = document.querySelector('#input-name');
const player_name = document.querySelector('#player-name');
const game_level = document.querySelector('#game-level');
const game_time = document.querySelector('#game-time');

let level_index = 0;
let level = CONSTANT.LEVEL[level_index];

let timer = null;
let pause = false;
let seconds = 0;

let su = undefined;
let su_answer = undefined;

// ------------

const setPlayerName = (name) => localStorage.setItem('player_name', name);

const showTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);

const clearSudoku = () => {
    for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
        cells[i].innerHTML = '';
        cells[i].classList.remove('filled');
        cells[i].classList.remove('selected');
        cells[i].classList.remove('err')
    }
}


const resetBg = () => {
    cells.forEach(e => e.classList.remove('hover'));
}

const initSudoku = () => {
    // clear old sudoku
    clearSudoku();
    resetBg();
    // generate sudoku puzzle here
    su = sudokuGen(level);
    su_answer = [...su.question];

    seconds = 0;

    saveGameInfo();

    // show sudoku to div
    for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
        let row = Math.floor(i / CONSTANT.GRID_SIZE);
        let col = i % CONSTANT.GRID_SIZE;

        cells[i].setAttribute('data-value', su.question[row][col]);

        if (su.question[row][col] !== 0) {
            cells[i].classList.add('filled');
            cells[i].innerHTML = su.question[row][col];
        }
    }
}

const saveGameInfo = () => {
    let game = {
        level: level_index,
        seconds: seconds,
        su: {
            original: su.original,
            question: su.question,
            answer: su_answer
        }
    }
    localStorage.setItem('game', JSON.stringify(game));
}


const returnStartScreen = () => {
    clearInterval(timer);
    pause = false;
    seconds = 0;
    start_screen.classList.add('active');
    game_screen.classList.remove('active');
    pause_screen.classList.remove('active');
    result_screen.classList.remove('active');
}



const startGame = () => {
    start_screen.classList.remove('active');
    game_screen.classList.add('active');

    player_name.innerHTML = name_input.value.trim();
    setPlayerName(name_input.value.trim());

    game_level.innerHTML = CONSTANT.LEVEL_NAME[level_index];

    showTime(seconds);

    timer = setInterval(() => {
        if (!pause) {
            seconds = seconds + 1;
            game_time.innerHTML = showTime(seconds);
        }
    }, 1000);
}


document.querySelector('#btn-pause').addEventListener('click', () => {
    pause_screen.classList.add('active');
    pause = true;
});

document.querySelector('#btn-resume').addEventListener('click', () => {
    pause_screen.classList.remove('active');
    pause = false;
});

document.querySelector('#btn-new-game').addEventListener('click', () => {
    returnStartScreen();
});

document.querySelector('#btn-new-game-2').addEventListener('click', () => {
    console.log('object')
    returnStartScreen();
});

const cells = drawBoard(CONSTANT.GRID_SIZE)
let flag = true;

solve.addEventListener('click', () => {
    let temp = structuredClone(su_answer)
    if (flag) {
        if (solve1(su_answer)) {
            addToInputs(su_answer)
            console.log('solved by CSP')
            pause = true
            flag = false
        }
        else {
            backtracking(temp)
            addToInputs(temp)
            console.log('solved by backtrack')
            pause = true
            flag = false
        }
    }
});

load.addEventListener('click', () => {
        initSudoku()
        flag = true;
        pause = false
})

document.querySelector('#btn-level').addEventListener('click', (e) => {
    level_index = level_index + 1 > CONSTANT.LEVEL.length - 1 ? 0 : level_index + 1;
    level = CONSTANT.LEVEL[level_index];
    e.target.innerHTML = CONSTANT.LEVEL_NAME[level_index];
});


document.querySelector('#btn-play').addEventListener('click', () => {
    if (name_input.value.trim().length > 0 && containsOnlyNumbers(grid_size.value) && grid_size.value > 3 && grid_size.value < 15) {
        initSudoku();
        startGame();
    } else {
        name_input.classList.add('input-err');
        grid_size.classList.add('input-err')
        setTimeout(() => {
            name_input.classList.remove('input-err');
            grid_size.classList.remove('input-err')
            name_input.focus();
        }, 500);
    }
});
