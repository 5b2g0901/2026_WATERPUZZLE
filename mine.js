const SIZE = 10, MINES = 10;
let board = [], flags = 0, gameOver = false, firstClick = true;
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const msgElement = document.getElementById('msg');

const colors = ['', 
                'text-blue-600', 
                'text-green-600', 
                'text-red-600', 
                'text-purple-600', 
                'text-red-900',
                'text-teal-600',
                'text-black',
                'text-gray-600']

function init(){
    boardElement.innerHTML = '';
    board = Array.from({length: SIZE}, 
                () => Array.from({length: SIZE}, 
                () => ({mine:false, rev:false, flags: false})
                )
    )
}