// Select HTML elements
const form = document.querySelector("#search-form");
const input = document.querySelector("#word-input");
const result = document.querySelector("#result");

// Listen for form submission
form.addEventListener("submit", (event) => {
event.preventDefault();
const word = input.value.trim();

// Check for empty input
if (word === "") {
result.innerHTML = "<p>Please enter a word.</p>";
return;
}
// Show loading message
result.innerHTML = "<p>Searching...</p>";
// Search the word
searchWord(word);
});

// Function to fetch data
function searchWord(word) {

fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
.then((response) => {
if (!response.ok) {
    throw new Error("Word not found.");
}
return response.json();
})
.then((data) => {
const entry = data[0];

// Find pronunciation/audio if available
const phonetic = entry.phonetics.find(
    (item) => item.text || item.audio
) || {};

const pronunciation = phonetic.text || "N/A";
const audio = phonetic.audio || "";

const meaning = entry.meanings[0];
const definition = meaning.definitions[0];

const partOfSpeech = meaning.partOfSpeech;

const example =
    definition.example || "No example available.";

// Synonyms can be stored in different places
const synonyms =
    definition.synonyms ||
    meaning.synonyms ||
    [];

// Display results
result.innerHTML = `
    <h2>${entry.word}</h2>

    <p><strong>Pronunciation:</strong> ${pronunciation}</p>

    ${
        audio
            ? `
            <audio controls>
                <source src="${audio}" type="audio/mpeg">
                Your browser does not support audio.
            </audio>
            `
            : "<p>No pronunciation audio available.</p>"
    }

    <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>

    <p><strong>Definition:</strong> ${definition.definition}</p>

    <p><strong>Example:</strong> ${example}</p>

    <p><strong>Synonyms:</strong>
        ${
            synonyms.length
                ? synonyms.join(", ")
                : "No synonyms found."
        }
    </p>
`;

// Change background color after successful search
result.style.backgroundColor = "#e8f5e9";

// Clear the input field
input.value = "";
})

.catch((error) => {

result.innerHTML = `
    <h2>Error</h2>
    <p>${error.message}</p>
`;

result.style.backgroundColor = "#ffe6e6";
});
}