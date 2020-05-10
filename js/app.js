const showQuotes = document.querySelector('.show-random-quotes');
const userInput = document.querySelector('.userInput');
const showAuthor = document.querySelector('.show-author');
const showLength = document.querySelector('.show-length');
const timerSelector = document.querySelector('.timer');
const results = document.querySelector('.results');

const timerBtnStart = document.querySelector('.starter');
const btnPause = document.querySelector('.pause')
const next = document.querySelector('.next');

const showCounter = document.querySelector('.show-counter');

const URL = 'http://api.quotable.io/random';
function getQuotes(){
    return fetch('http://api.quotable.io/random')
    .then(res => res.json())
    .then(data => data)
}

async function displayQuotes(){
    const data = await getQuotes();
    const author = data.author;
    const length = data.length;
    const quote = data.content
    
    //display data
    showQuotes.textContent = quote;
    showAuthor.textContent = author;
    showLength.textContent = length;
    showQuotes.textContent = ''    
    quote.split('').forEach(character => {
        const spanToAddChars = document.createElement('span');
        spanToAddChars.textContent = character;
        showQuotes.appendChild(spanToAddChars);

    })

}


userInput.addEventListener('input', () =>{
    //put every letter into a span tag 
    const quotesSpans = showQuotes.querySelectorAll('span');
    //get user input values 
    const valueArray = userInput.value.split(''); 

 //to handle next challenge
    let passed = true;
    quotesSpans.forEach((characterSpan, index) => {
        const character = valueArray[index];
        if(character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            passed = false
        }else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
            
        }else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            passed = false
        }

    })
    userInput.innerText = null
    if(passed){
        clearInterval(intervalId)
        results.textContent = `Congradulations. You typed ${showLength.textContent} letters in ${timerSelector.innerText} seconds`
      
    }
    
})

let timer = 0;
let intervalId;
let total = 0;
timerBtnStart.addEventListener('click', () => {
  
    intervalId = setInterval(() => {
        timer += 1;
        timerSelector.textContent = timer;
    }, 1000)
})

btnPause.addEventListener('click', ()=> {
    clearInterval(intervalId)
    let total = timerSelector.textContent
})

next.addEventListener('click', () => {
   
    results.textContent = "";
    userInput.value = "";
    timer = 0;
    timerSelector.textContent = ''

    displayQuotes()

})

function eventTimer(){

    intervalId = setInterval(() => {
        timer += 1;
        timerSelector.textContent = timer;
    }, 1000)
}

displayQuotes()

