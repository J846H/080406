const gameArea = document.getElementById('gameArea');
const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('startButton');

let score = 0;
let timeLeft = 30;
let gameInterval;
let canMoveTarget = false; // 타깃 이동 허용 여부

// 게임 시작 함수
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    startButton.disabled = true;
    gameArea.style.pointerEvents = 'auto';
    canMoveTarget = true; // 타깃 이동 허용

    target.style.display = 'block'; // 타깃을 보이게 함
    moveTarget(); // 게임 시작 시 타깃을 즉시 이동

    gameInterval = setInterval(updateTime, 1000);
}

// 남은 시간 업데이트 함수
function updateTime() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

// 타깃 이동 함수
function moveTarget() {
    if (!canMoveTarget) return; // 타깃 이동이 허용되지 않으면 반환

    const maxX = gameArea.clientWidth - target.clientWidth;
    const maxY = gameArea.clientHeight - target.clientHeight;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    target.style.left = `${newX}px`;
    target.style.top = `${newY}px`;
}

// 타깃 클릭 시 점수 증가 함수 및 즉시 새 위치로 이동
function hitTarget() {
    score++;
    scoreDisplay.textContent = score;
    moveTarget(); // 클릭 시 바로 다음 위치로 이동
}

// 게임 종료 함수
function endGame() {
    clearInterval(gameInterval);
    canMoveTarget = false; // 타깃 이동 비활성화
    target.style.display = 'none'; // 타깃을 숨김
    gameArea.style.pointerEvents = 'none';
    startButton.disabled = false;
    alert(`게임 종료! 당신의 점수는 ${score}입니다.`);
}

target.addEventListener('click', hitTarget);
startButton.addEventListener('click', startGame);

// 초기화
target.style.display = 'none'; // 초기 상태에서 타깃을 숨김
gameArea.style.pointerEvents = 'none';
