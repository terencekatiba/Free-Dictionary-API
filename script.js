const form = document.querySelector("#search-form");
const input = document.querySelector("#word-input");
const result = document.querySelector("#result");

form.addEventListener("submit", function(event){
event.preventDefault();
});

form.addEventListener("submit",(event)=>{
event.preventDefault();
const word=input.value;
console.log(word);
});

function searchWord(word){
fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
.then(response=>response.json())
.then(data=>{
console.log(data);
})
}

searchWord(word);

const wordName=data[0].word;
const pronunciation=data[0].phonetics[0].text;
const meaning=data[0].meanings[0].definitions[0].definition;
const speech=data[0].meanings[0].partOfSpeech;
result.innerHTML=`
<h2>${wordName}</h2>
<p><strong>Pronunciation:</strong> ${pronunciation}</p>
<p><strong>Part of Speech:</strong> ${speech}</p>
<p>${meaning}</p>
`;