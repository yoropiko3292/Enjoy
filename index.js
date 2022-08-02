//変数の数々
const canvas = document.getElementById("stage");
const cvs = canvas.getContext("2d");
const p1b = document.getElementById("p1b");
const p1w = document.getElementById("p1w");
const p2 = document.getElementById("p2");
const bgf = document.getElementById("bg_fillter");
const difficult = document.getElementById("difficult");
const pass = document.getElementById("pass");
const retire = document.getElementById("retire");
const comWhere = [[100,-20,20,10,10,20,-20,100],[-20,-100,15,0,0,15,-100,-20],[20,15,20,5,5,20,15,20],[10,0,5,0,0,5,0,10],[10,0,5,0,0,5,0,10],[20,15,20,5,5,20,15,20],[-20,-100,15,0,0,15,-100,-20],[100,-20,20,10,10,20,-20,100]]
let gameDeta;
let gameWhite;
let gameBlack;
let whichPut;
let gameMoad;
let wait;
let rect;
let viewX;
let viewY;
let scaleWidth;
let scaleHeight;
let canvasX;
let canvasY;
let userSerect;
let preDeta;
let preBlack;
let preWhite;
let nowTime;
let userPointer;
let putCheck;
let comPut;
let userX;
let userY;
let strength;
let comChenge;
let comMemory;
let comBrain;
let comX;
let comY;
let anm;
let winner;
let rtd;

//イベントリスナー

p1b.addEventListener("click", function () {
    gameMoad = "black";
    gamePlay();
});

p1w.addEventListener("click", function () {
    gameMoad = "white";
    gamePlay();
});

p2.addEventListener("click", function () {
    gameMoad = "both";
    gamePlay();
});

pass.addEventListener("click" , function () {
    skip();
});

retire.addEventListener("click",function () {
    rtd = whichPut;
    clearInterval(userSerect);
    playNext();
});

canvas.addEventListener("click", (e) => {
    rect = e.target.getBoundingClientRect();
    viewX = e.clientX - rect.left,
    viewY = e.clientY - rect.top;
    scaleWidth = canvas.clientWidth / canvas.width;
    scaleHeight = canvas.clientHeight / canvas.height;
    canvasX = Math.floor(viewX / scaleWidth);
    canvasY = Math.floor(viewY / scaleHeight);
});

//実行
gameSet();
whichPut = 0;
boad();

function gamePlay() {
    gameSet();
    p1b.disabled = true;
    p1w.disabled = true;
    p2.disabled = true;
    difficult.disabled = true;
    retire.disabled = false;
    pass.disabled = false;
    boad();
    strength = difficult.value;
    rtd = 0;
    if(gameMoad == "both"){
        bgf.style.background = "#00ff0077";
    }else{
        if (strength == 1) {
            bgf.style.background = "#ffffff00";
        }else if(strength == 2){
            bgf.style.background = "#0000ff77";
        }else{
            bgf.style.background = "#ff000077";
        }
    }
    playNext();
}

function playerPut() {
    if(userPointer != canvasX && canvasY < 320) {
        userPointer == canvasX;
        userX = Math.floor(canvasX / 40);
        userY = Math.floor(canvasY / 40);
        if (userX < 0) {
            userX = 0;
        }
        if (userY < 0) {
            userY = 0;
        }
        if (userX > 7) {
            userX = 7;
        }
        if (userY > 7) {
            userY = 7;
        }
        put(userX,userY);
    }
}

function endSet() {
    if (gameBlack > gameWhite || rtd == -1) {
         winner = "Black";
    }else if (gameBlack < gameWhite || rtd == 1) {
         winner = "White";
    }else{
        winner = "none"
    }
    cvs.fillStyle = "#ff5555";
    cvs.fillRect(10,10,300,50);
    cvs.font = "25px serif";
    cvs.textBaseline = "center";
    cvs.textAlign = "center";
    cvs.fillStyle = "#ffffff";
    cvs.fillText(gameWhite + " vs " + gameBlack + ":winner " + winner, 160, 40);
    p1b.disabled = false;
    p1w.disabled = false;
    p2.disabled = false;
    difficult.disabled = false;
    retire.disabled = true;
    pass.disabled = true;
}

function playNext() {
    boad();
    if(gameBlack + gameWhite == 64 || gameBlack == 0 || gameWhite == 0 || rtd != 0){
        endSet();
    }else{
        userPointer = canvasX;
        preBlack = gameBlack;
        preWhite = gameWhite;
        if ((whichPut == 1 && gameMoad == "black") || (whichPut == -1 && gameMoad == "white") || gameMoad == "both") {
            userSerect = setInterval(playerPut,1);
        } else {
            retire.disabled = true;
            pass.disabled = true;
            setTimeout(com,900);
            retire.disabled = false;
            pass.disabled = false;
        }
    }
}

//スキップ

function skip() {
    console.log("skip");
    clearInterval(userSerect);
    preDeta = gameDeta.slice();
    gameBlack = preBlack;
    gameWhite = preWhite;
    whichPut *= -1;
    playNext();
}

//コンピュータ

function com() {
    comMemory = [0,0,0];
    comBrain = new Array(8);
    for (i = 0; i < 8; i++) {
        comBrain[i] = new Array(8);
        for (j = 0; j < 8; j++) {
            comBrain[i][j] = -100000;
        }
    }
    if (strength == "1") {
        for (i = 0; i < 8 ; i++) {
            for (j = 0; j < 8 ; j++) {
                comChenge = 0;
                for (k = -1 ; k < 2 ; k++) {
                    for (l = -1 ; l < 2 ; l++) {
                        putCheck = 0;
                        revCheck(i,j,k,l);
                        comChenge += putCheck;
                    }
                }
                if (comChenge > 0) {
                    comBrain[i][j] = Math.random() * 1000; 
                    comMemory[2] = comBrain[i][j];
                }
            }
        }
    }
    if (strength == "2") {
        for (i = 0; i < 8 ; i++) {
            for (j = 0; j < 8 ; j++) {
                comChenge = 0;
                for (k = -1 ; k < 2 ; k++) {
                    for (l = -1 ; l < 2 ; l++) {
                        putCheck = 0;
                        revCheck(i,j,k,l);
                        comChenge += putCheck;
                    }
                }
                if (comChenge == 0) {
                    comChenge = -100000;
                }
                if ((i == 1 && j == 1) || (i == 1 && j == 6) || (i == 6 && j == 1) || (i == 6 && j == 6)) {
                    comChenge -= 100;
                }
                if ((i == 0 && j == 1) || (i == 0 && j == 6) || (i == 1 && j == 0) || (i == 1 && j == 7) || (i == 6 && j == 0) || (i == 6 && j == 7) || (i == 7 && j == 1) || (i == 7 && j == 6)) {
                    comChenge -= 20;
                }
                if ((i == 0 && j == 0) || (i == 0 && j == 7) || (i == 7 && j == 0) || (i == 7 && j == 7)) {
                    comChenge += 100;
                }
                if (comChenge != -100000) {
                    comBrain[i][j] = comChenge;
                }
            }
        }
    }
    if (strength == "3") {
        for (i = 0; i < 8 ; i++) {
            for (j = 0; j < 8 ; j++) {
                comChenge = 0;
                for (k = -1 ; k < 2 ; k++) {
                    for (l = -1 ; l < 2 ; l++) {
                        putCheck = 0;
                        revCheck(i,j,k,l);
                        comChenge += putCheck * (-16.5 + gameBlack + gameWhite);
                    }
                }
                if (comChenge == 0) {
                    comChenge = -100000;
                }else{
                    comChenge += comWhere[i][j];
                }
                if (comChenge != -100000) {
                    comBrain[i][j] = comChenge;
                }
            }
        }if (strength == "4") {
        for (i = 0; i < 8 ; i++) {
            for (j = 0; j < 8 ; j++) {
                comChenge = 0;
                for (k = -1 ; k < 2 ; k++) {
                    for (l = -1 ; l < 2 ; l++) {
                        putCheck = 0;
                        revCheck(i,j,k,l);
                        comChenge += putCheck * (-16.5 + gameBlack + gameWhite);
                    }
                }
                if (comChenge == 0) {
                    comChenge = -100000;
                }
                if (comChenge != -100000) {
                    comBrain[i][j] = comChenge;
                }
            }
        }
    }
    comMemory = [0,0,-100000];
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if (comBrain[i][j] > comMemory[2]) {
                comMemory[2] = comBrain[i][j];
                comMemory[0] = i;
                comMemory[1] = j;
            }
        }
    }
    if (comMemory[2] > -99900) {
        put(comMemory[0],comMemory[1]);
    } else {
        skip();
    }
}

//駒を置いてひっくり返す
function put(x,y) {
    if (x > -1 && y > -1 && x < 8 && y < 8 && gameDeta[x][y] == 0) {
        if (whichPut == 1) {
            gameBlack++;
        } else {
            gameWhite++;
        }
        putCheck = 0;
        preDeta = gameDeta.slice();
        for (i = -1 ; i < 2 ; i++) {
            for (j = -1 ; j < 2 ; j++) {
                rev(x,y,i,j);
            }
        }
        if (putCheck > 0) {
            preDeta[x][y] = whichPut;
            gameDeta = preDeta.slice();
            whichPut *= -1;
            clearInterval(userSerect);
            console.log(x + "," + y);
            playNext();
        } else {
            x = NaN;
            y = NaN;
            preDeta = gameDeta.slice();
            gameBlack = preBlack;
            gameWhite = preWhite;
            comGo = true;
            userPointer = canvasX;
        }
    }
}

function rev(x,y,xp,yp) {
    anm = new Array(8);
    for (a = 0; a < 8; a++) {
        anm[a] = 0;
    }
    while (x + xp < 8 && x + xp > -1 && y + yp < 8 && y + yp > -1 && gameDeta[x + xp][y + yp] == whichPut * -1) {
        x += xp;
        y += yp;
    }
    if (x + xp < 8 && x + xp > -1 && y + yp < 8 && y + yp > -1 && gameDeta[x][y] == whichPut * -1 && gameDeta[x + xp][y + yp] == whichPut) {
        while (gameDeta[x][y] == whichPut * -1) {
            anm[putCheck] = [x,y]
            putCheck++;
            if (whichPut == 1) {
                gameBlack++;
                gameWhite--;
            } else {
                gameWhite++;
                gameBlack--;
            }
            preDeta[x][y] = whichPut;
            x -= xp;
            y -= yp;
        }
    }
}

function revCheck(x,y,xp,yp) {
    if (gameDeta[x][y] == 0) {
        while (x + xp < 8 && x + xp > -1 && y + yp < 8 && y + yp > -1 && gameDeta[x + xp][y + yp] == whichPut * -1 && !(xp == 0 && yp == 0 && gameDeta[x + xp][y + yp] == 0)) {
            x += xp;
            y += yp;
        }
        if (x + xp < 8 && x + xp > -1 && y + yp < 8 && y + yp > -1 && gameDeta[x][y] == whichPut * -1 && gameDeta[x + xp][y + yp] == whichPut && !(xp == 0 && yp == 0)) {
            while (gameDeta[x][y] == whichPut * -1) {
                putCheck++;
                x -= xp;
                y -= yp;
            }
        }
    }
}


//初期化
function gameSet() {
    p1b.disabled = false;
    p1w.disabled = false;
    p2.disabled = false;
    difficult.disabled = false;
    retire.disabled = true;
    pass.disabled = true;
    gameDeta = new Array(8);
    for (i = 0; i < 8; i++) {
        gameDeta[i] = new Array(8);
        for (j = 0; j < 8; j++) {
            gameDeta[i][j] = 0;
        }
    }
    gameDeta[3][3] = 1;
    gameDeta[3][4] = -1;
    gameDeta[4][3] = -1;
    gameDeta[4][4] = 1;
    whichPut = 1;
    gameBlack = 2;
    gameWhite = 2;
    boad();
}

//ボードと駒の描画
function boad() {
    cvs.clearRect(0, 0, 320, 360);
    cvs.strokeStyle = "#ffffff";
    for (i = 1; i < 9; i++) {
        drowLine(true, i * 40);
    }
    for (i = 1; i < 9; i++) {
        drowLine(i * 40, true);
    }
    cvs.fillStyle = "#000000";
    cvs.fillRect(0, 320, 320, canvas.height - 320);
    cvs.fillStyle = "#0000ff";
    cvs.fillRect(90, 330, 140, 20);
    cvs.fillStyle = "#ffff00";
    cvs.fillRect(90, 330, gameBlack / (gameBlack + gameWhite) * 140, 20);
    cvs.font = "20px serif";
    cvs.textBaseline = "center";
    cvs.textAlign = "center";
    if (whichPut == 1) {
        cvs.fillStyle = "#00ffff";
    } else {
        cvs.fillStyle = "#ffffff";
    }
    cvs.fillText("Black:" + gameBlack, 45, 350);
    if (whichPut == -1) {
        cvs.fillStyle = "#00ffff";
    } else {
        cvs.fillStyle = "#ffffff";
    }
    cvs.fillText("White:" + gameWhite, 275, 350);
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            cvs.beginPath();
            if (gameDeta[i][j] === 1) {
                cvs.fillStyle = "#000000";
                cvs.arc(i * 40 + 20, j * 40 + 20, 15, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
            } else if (gameDeta[i][j] === -1) {
                cvs.fillStyle = "#ffffff";
                cvs.arc(i * 40 + 20, j * 40 + 20, 15, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
            }
            cvs.fill();
            cvs.closePath();
        }
    }
}

//線を描く
function drowLine(x, y) {
    cvs.beginPath();
    cvs.lineWidth = 1;
    cvs.fillStyle = "#000000";
    if (x === true) {
        cvs.moveTo(0, y);
        cvs.lineTo(320, y);
    } else {
        cvs.moveTo(x, 0);
        cvs.lineTo(x, 320);
    }
    cvs.stroke();
}
