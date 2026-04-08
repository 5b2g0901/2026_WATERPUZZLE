document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const playButton = document.getElementById('play-button');
    const levelSelect = document.getElementById('level-select');

    const colors=[
        
        "RoyalBlue",
        "darkgreen",
        "yellow",
        "LightPink",
        "Salmon",
        "LightSlateGray",
        "LightCoral",
        "Khaki",
        "Plum",
        "MistyRose",
        "DarkOrange",
        "HoneyDew",
        "Brown",
        "OliveDrab"

    ];
        
    const tubes = [];
    let levelCount = 1;
    let selectedTube = null;


    levelSelect.addEventListener('change', (event) => {
        levelCount = parseInt(event.target.value);
        document.getElementById('level-count').textContent = levelCount;
    });

    playButton.addEventListener('click', () => {
        tubes.length = 0;
        createTubes();
        fillTubes();
    });
    function checkGameState(){
        const allSameColor = (tube)=>{
            const waters = Array.from(tube.children);
            return(
                waters.length === 4 &&
                waters.every(
                    (water)=> water.style.backgroundColor === waters[0].style.backgroundColor
                )
            );
        }
        
        let completedTubes = 0;
        tubes.forEach((tube)=>{
            if(allSameColor(tube)) completedTubes++;
        });
        document.getElementById('completed-tubes-count').textContent = completedTubes
        if (tubes.every((tube)=>tube.childElementCount ===0 || allSameColor(tube))){
            if (levelCount === 10){
                alert('恭喜!你已經完成了!!!')
            }
            else{
                alert('你已經玩陳本關卡')
                levelCount++;
                document.getElementById('level-count').textContent = levelCount;
                document.getElementById('completed-tubes-count').textContent = 0;
                createTubes();
                fillTubes();
            }
        }
    }
    function pourWater(fromTube, toTube){
        let fromwater = fromTube.querySelector('.water:last-child');
        let towater = toTube.querySelector('.water:last-child');
        if (!towater){
            const color = fromwater ? fromwater.style.backgroundColor : null;
            while(fromwater && fromwater.style.backgroundColor === color && toTube.childElementCount < 4){
                toTube.appendChild(fromwater);
                fromwater = fromTube.querySelector('.water:last-child');
            }
        }
        else {
            while(fromwater && fromwater.style.backgroundColor === towater.style.backgroundColor && toTube.childElementCount < 4){
                toTube.appendChild(fromwater);
                fromwater = fromTube.querySelector('.water:last-child');
                towater = toTube.querySelector('.water:last-child')

            }
        }
        checkGameState();
    }
    function selectTube(tube){
        if (selectedTube){
            if(selectedTube != tube){
                pourWater(selectedTube, tube);
            }
    
            selectedTube.classList.remove('selected');
            selectedTube = null;
        } else {
            selectedTube = tube;
            tube.classList.add('selected');
        }
    }
    

    function createTubes() {
        //依照選擇的關卡來產生試管
        gameBoard.innerHTML = "";

        for (let i = 0; i < levelCount + 1; i++) {
            const tube = document.createElement('div');
            tube.classList.add('tube');
            tube.addEventListener('click', ()=>selectTube(tube))
            gameBoard.appendChild(tube);
            tubes.push(tube);

        }

        for(let i=0; i<2; i++){
            const emptyTube = document.createElement("div");
            emptyTube.classList.add("tube");
            emptyTube.addEventListener('click',()=>selectTube(emptyTube))
            gameBoard.appendChild(emptyTube);
            tubes.push(emptyTube);
        }
    }
    function fillTubes(){
        //填滿試管
        const gameColors = colors.slice(0, levelCount+1);
        const waterBlocks = [];


        gameColors.forEach((colors)=>{
            for (let i=0; i<4; i++){
                waterBlocks.push(colors);
            }

        });

        //把顏色打亂
        waterBlocks.sort(()=>0.5-Math.random());

        //把waterblock分數在下同的試管內
        let blockIndex = 0; 
        tubes.slice(0, levelCount+1).forEach((tube) =>{
            for (let i=0; i<4; i++)
            if (blockIndex < waterBlocks.length){
                const water = document.createElement("div")
                water.classList.add("water")
                water.style.backgroundColor = waterBlocks[blockIndex]
                water.style.height = '20%';
                tube.appendChild(water);
                blockIndex++;
            }

        });
       
    }
});