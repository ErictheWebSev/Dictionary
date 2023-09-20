document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById('search');
  const searchBtn = document.getElementById('btn')
  const fontSelect = document.getElementById('font-select')
  const msg = document.getElementById('msg')
  const content = document.getElementById('content')
  const word = document.getElementById('word')
  const phonetics = document.getElementById('phonetics')
  const speech = document.getElementById('speech')
  const definitionCon = document.getElementById('definition')
  const audioCon = document.getElementById('audio')
  
  
  searchBtn.addEventListener('click', () => {
    searchTerm = searchInput.value.trim()
     if (searchTerm === '') {
       msg.classList.toggle('hidden')
       msg.textContent = 'Enter a word'
       
       return;
     }
     
     msg.textContent = ''
     
     const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
     
     fetch(url)
     .then(response => response.json())
     .then(data => {
       if (data.length === 0) {
         msg.innerHTML = 'No results found'
       }
       
       const entry = data[0]
       word.textContent = entry.word
       phonetics.textContent = entry.phonetic
       const meaning = entry.meanings[0]
       speech.textContent = meaning.partOfSpeech;
       const def1 = meaning.definitions[0].definition
       const def2 = meaning.definitions[1].definition
       const def3 = meaning.definitions[2].definition
       
       definitionCon.innerHTML = `
        <li class="text-lg text-gray-900 list-disc">${def1}</li>
        <li class="text-lg text-gray-900 list-disc">${def2}</li>
        <li class="text-lg text-gray-900 list-disc">${def3}</li>
       `;
       console.log(entry)
       
       if (entry.phonetics[0].audio) {
        const audioElement = document.createElement("audio");
        audioElement.controls = true;
        audioElement.src = entry.phonetics[0].audio;
        audioCon.appendChild(audioElement);
        }
       
     }).catch(error => {
       console.log('error', error);
       msg.classList.remove('hidden')
       msg.innerHTML = "Couldn't find word";
     })
  })
  
  fontSelect.addEventListener("change", () => {
    const selectedFont = fontSelect.value;
    document.body.style.fontFamily = selectedFont;
  }); 
  document.body.classList.add('dark')
})