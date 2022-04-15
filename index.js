console.log('Hello');

let mainBox = document.querySelector('.mainBox');
let searchInput = document.getElementById('searchInput');
let infoText = document.querySelector('.infoText');
let close = document.getElementById('close');
let volume = document.getElementById('volume');
let synonyms = document.querySelector('.synonyms .synoList');
let audio;


// ********* Functions ************
function data(result, word) {
    if (result.title == 'No Definitions Found') {
        infoText.innerHTML = `Can't Find the meaning of <span><b>"${word}"</b></span> ... Please put a appropriate word!!`;
        mainBox.className = 'mainBox';
    }
    else {
        synonyms.innerText = '';
        document.querySelector('.example span').innerText = "";
        // document.querySelector('.word p').innerText = "";

        // console.log(result, word);
        setTimeout(() => {
            mainBox.className = 'active';
        }, 800);
        // active.classList.remove('infoText');

        // *****For word****** 
        document.querySelector('.word p').innerText = result[0].word;

        // For Word Phonetic and part of speech
        document.getElementById('wordSpan').innerText = `${result[0].phonetics[0].text} / ${result[0].meanings[0].partOfSpeech}`;
        // for audio
        utter = new SpeechSynthesisUtterance();
        utter.lang = 'en-US';
        utter.text = result[0].word;
        utter.volume = 0.5;
        // for meaning
        document.getElementById('meaningSpan').innerText = result[0].meanings[0].definitions[0].definition;
        // for example
        if(result[0].meanings[0].definitions[1] == undefined){
            document.querySelector('.example span').innerText = '__ __';
        }
        else{
            // document.querySelector('.example span').innerText = "__ __";
            document.querySelector('.example span').innerText = result[0].meanings[0].definitions[1].example;
        }

        // synonyms.innerText = '';

        // For Word Phonetic and part of speech
        document.getElementById('wordSpan').innerText = `${result[0].phonetics[1].text} / ${result[0].meanings[0].partOfSpeech}`;
        // for audio
        utter = new SpeechSynthesisUtterance();
        utter.lang = 'en-US';
        utter.text = result[0].word;
        utter.volume = 5.9;

        let definitions = result[0].meanings[0];
       
        for(let i = 0; i < 5 ; i++){
            let list = `<span onclick=search('${definitions.definitions[0].synonyms[i]}')>${result[0].meanings[0].definitions[0].synonyms[i]} </span>      `;
            // console.log(result[0].meanings[0].synonyms[i]);
            if(result[0].meanings[0].definitions[0].synonyms[i] != undefined){
                synonyms.insertAdjacentHTML('beforeend', list);
            }
            else{
                // synonyms[i].style.display = 'none';
            }

        }
        // synonyms.innerText = '';
        
    }
}

function search(word){
    searchInput.value = word;
    fetchApi(searchInput.value);
}


function fetchApi(word) {
    // wrapper.classList.remove("active");
    // infoText.style.color = "#000";
    infoText.innerHTML = `Searching the meaning of <span><b>"${word}"</b></span> ....`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(response => response.json()).then(result => data(result, word));
}



searchInput.addEventListener('keyup', (e) => {
    if (e.key == 'Enter' && e.target.value) {
        newWord = e.target.value;
        fetchApi(e.target.value);
    }
})

close.addEventListener('click', () => {
    // console.log('Close');
    searchInput.value = "";
});

searchInput.addEventListener('click', () => {
    mainBox.className = 'mainBox';
    infoText.innerHTML = `<i>Type any existing word and press enter to get meaning, example, synonyms, etc.</i>`;
});

volume.addEventListener('click', ()=>{
    // console.log('volume');
    // speak
    window.speechSynthesis.speak(utter);
    
})
