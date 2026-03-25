document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const playButton = document.getElementById('play-button');
    const levelSelect = document.getElementById('level-select');

    const tubes = [];
    let levelCount = 1;


    levelSelect.addEventListener('change', (event) => {
        levelCount = parseInt(event.target.value);
        document.getElementById('level-count').textContent = levelCount;
    });

    playButton.addEventListener('click', () => {
        tubes.length = 0;
        createTubes();
    });

    function createTubes() {
        //依照選擇的關卡來產生試管
        gameBoard.innerHTML = "";

        for (let i = 0; i < levelCount + 1; i++) {
            const tube = document.createElement('div');
            tube.classList.add('tube');
            gameBoard.appendChild(tube);
            tubes.push(tube);

        }
    }
});