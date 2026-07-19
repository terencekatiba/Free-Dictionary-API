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