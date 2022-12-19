// CHECK JS LINK
console.log('JS OK');

//! TESTO
/*
 L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto 
un messaggio in console con il numero della cella cliccata.
MILESTONE 1
Prepariamo l'HTML ed il CSS per ottenere il risultato grafico che vediamo nell'immagine allegata.
MILESTONE 2
Rimuoviamo le celle che abbiamo inserito nell'HTML in modo da generarle tramite JS. Al click del bottone play,
 vengono generate 100 celle in 10 righe da 10 celle ciascuna.
MILESTONE 3
In ogni cella, deve comparire il numero corrispondente, in ordine da 1 a 100;
#MILESTONE 4
Al click sulla cella, stampiamo il numero della cella cliccata in console, poi coloriamo la cella d'azzurro!
BONUS
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe; 
 */






//* RECUPERO ELEMENTI Dal DOM

const grid = document.getElementById('grid');
const startScreen = document.getElementById('start-play');
const button = document.getElementById('button');
const select = document.getElementById('difficulty');



//* INIZIALIZZAZIONE VALIDAZIONE
let isPlaying = false;

// *CREO LOGICA AD AZIONAMENTO PULSANTE

button.addEventListener('click' , () => {


    //! FUNZIONI INTERNE ALL'EVENTO -----------------------------------


    const createCell = (number) => {
        const cell = document.createElement( 'div');
        cell.setAttribute('data-index' , number);
        cell.classList.add('cell');
        return cell;
    }
    
    const bombGenerator = (number , max) => {
        const bombPosition = [];
        let nRandom = '';
        for ( let i = 0 ; i < number ; i++){
            nRandom = Math.floor(Math.random() * (max - 1))+1;
            if (bombPosition.includes(nRandom)){
            nRandom = Math.floor(Math.random() * (max - 1))+1;
            }

            bombPosition.push (nRandom);
        }
        return bombPosition;
    }
   //!----------------------------------------------------------------------
   
//VARIABILE DI VALIDAZIONE
let choise = true;

//RENDO VISIBILE IL CAMPO E INVISIBILE LA SCRITTA INIZIALE
grid.classList.remove('disp-none');
startScreen.classList.add('disp-none');


//*VALIDAZIONE AND RESET
if(isPlaying){
    choise = confirm('Sei sicuro?');
    if (choise){

        isPlaying = false;
        startScreen.classList.remove('disp-none');
        grid.classList.add('disp-none');
        button.innerText = 'Play';
        grid.innerHTML= '';

        return;
    }   
}

//* INIZIALIZZO VALORI -------------------------------
const square = parseInt(select.value);
const totalCells = square * square ;
const bomb = bombGenerator(16, totalCells);
const maxScore = totalCells - 16;
let score = 0;
let cellClicked = [];
isPlaying = true;

button.innerText = 'Ricomincia';

console.log(bomb, maxScore);

//*GESTINSCO DIFFICOLTA
if(square === 7){
    grid.className = 'hard';
}
else if (square === 9){
    grid.className = 'medium';
}
else {
    grid.className = 'easy';
}


for(let i = 1 ; i <= totalCells ; i++) {
    //CREAZIONE CELLE
    const cell =  createCell(i);

    //* AGGIUNGO CLASSE A CLICK DELLA CELLA
    cell.addEventListener('click' , () =>{
        //ASSEGNO UN VALORE IN INDEX A OGNI CELLA
        const clicked = parseInt(cell.getAttribute('data-index'));
        // CONTROLLO VINCITA O SCONFITTA

          // IN CASO SI PRENDA LA BOMBA
        if( bomb.includes(clicked)){
            cell.classList.add('bomb');
            score = 0 ;
            alert ('you die');
        }
          // NEL CASO SI RIESCANO A CLICCARE TUTTE LE CELLE SENZA PRENDERE LE BOMBE
        else if(score === maxScore ){
            alert ('Hai vinto ');
            score = 0 ;

        }
         // AGGIUNGO IL CLICK ALLA CELLA SELZIONATA
        else {
           cell.classList.add('clicked');
           
           if (!(cellClicked.includes(i))){
           cellClicked.push(i);
           score++;
           console.log ( 'Cella cliccata: ' + i, score , maxScore);
           }
       }
    })
    
    //* INSERISCO IN PAGINA
    grid.appendChild(cell); 

}
});
