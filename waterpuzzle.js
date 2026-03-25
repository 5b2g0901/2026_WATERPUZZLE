document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const playButton = document.getElementById('play-button');
    const levelSelect = document.getElementById('level-select');

    const tubes = [];

    levelSelect.addEventListener('change', (event) => {
        const selectLevel = parseInt(event.target.value);
        alert('第' + selectLevel + '關');
    });
    playButton.addEventListener('click', () => {
        alert('開始遊戲');
    });
});