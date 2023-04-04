const blocks=document.querySelectorAll(".block");
const playerText=document.getElementById("player"); //playerkısmı değişebilir x veya y
const errorText=document.getElementById("error");
let player = "X";
let gameOver=false;
let winner;

function startGame(){ //oyunu başlatmak için
    playerText.textContent =`${player}'s Turn !`  // (turn:sıra)

    blocks.forEach(block=>block.addEventListener("click" , () =>chooseArea(block))) //chosearea:alan seç
}
function chooseArea(block){ //alanseçme kısmı
    //kutu boş ise harf ver boş değilse verme:
    if(block.textContent===""){ // blok boş ise
        block.textContent=player;
        if(player==="O"){
            block.style.color="red"
        }
        turnPlayer(); //sırayı bozmaz
    }
    else{ //bloğa ikinci kez tıkladığında:
        errorText.textContent="Heyy it's full"
        block.style.border="3px solid red"
        setTimeout(()=>{
            errorText.textContent=""
            block.style.border="1px solid black"

        },2000);
    }
    
    
    checkWin();
    checkTie();

    if(gameOver) {
        playerText.textContent=`Game is over, ${winner} Win `; //oyun bitti kazanan..
        blocks.forEach(blocks=>blocks.style.pointerEvents=`none`); //oyun bittiği zaman butonlar çalışmaz
        blocks.forEach(blocks=>blocks.style.border=`2px solid red` ); //oyun bittiği zaman butonlar kırmızı oldu
        
    }
}
function turnPlayer(){
    if(player==="X"){ //player x ise o'ya çevir
    player="O";
    playerText.textContent=`${player}'s Turn!`
    }
    else if(player==="O"){ //player o ise x'e çevir
        player="X";
        playerText.textContent=`${player}'s Turn!`

    }
}
function checkWin(){
    //win
    checkRows() //satır
    checkColumns() //sütun,kolon
    checkDiagonals() //köşegenler için

}
function checkTie(){ // (tie:beraberlik)
    //tie

    const values=[];
    blocks.forEach(block=>values.push(block.textContent))
    if(!values.includes("")){ //değerler kümesi boşluk içermiyor ise oyun bitmemiş ise beraberlik olur
        playerText.textContent="Tie !";
        blocks.forEach(block=>block.style.pointerEvents=`none`);
    }

}
function checkRows(){
    let row1 = blocks[0].textContent==blocks[1].textContent && 
    blocks[0].textContent==blocks[2].textContent //1. satırdaki 1. 2. 3. bloklar eşit ise 
    && blocks[0].textContent !== ""//ayrıca bloklar boş olmasın

    let row2=blocks[3].textContent==blocks[4].textContent &&
    blocks[3].textContent==blocks[5].textContent&&
    blocks[3].textContent !==""

    let row3=blocks[6].textContent==blocks[7].textContent&&
    blocks[6].textContent==blocks[8].textContent&&
    blocks[6].textContent !==""

    if(row1 || row2 || row3){
        gameOver=true
    } 

    if(row1) return winner = blocks[0].textContent //1 satur doğru tuttuysa
    if (row2) return winner = blocks[3].textContent
    if (row3) return winner =blocks[6].textContent
}

function checkColumns(){
    //check cols

    let col1 =blocks[0].textContent==blocks[3].textContent&&
    blocks[0].textContent==blocks[6].textContent&&
    blocks[0].textContent !==""

    let col2 =blocks[1].textContent==blocks[4].textContent&&
    blocks[1].textContent==blocks[7].textContent&&
    blocks[1].textContent !==""

    let col3 =blocks[2].textContent==blocks[5].textContent&&
    blocks[2].textContent==blocks[8].textContent&&
    blocks[2].textContent !==""

    if(col1 || col2 || col3){
        gameOver=true
    }
    if(col1) return winner =blocks[0].textContent
    if(col2) return winner =blocks[1].textContent
    if(col3) return winner =blocks[2].textContent
}
function checkDiagonals(){
    //check diag

    let diag1=blocks[0].textContent==blocks[4].textContent&&
    blocks[0].textContent==blocks[8].textContent&&
    blocks[0].textContent !==""

    let diag2=blocks[2].textContent==blocks[4].textContent&&
    blocks[2].textContent==blocks[6].textContent&&
    blocks[2].textContent !==""

    if(diag1 || diag2){
        gameOver=true
    }

    if(diag1) return winner=blocks[0].textContent
    if(diag2) return winner=blocks[2].textContent

}


startGame();