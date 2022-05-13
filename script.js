// Global variables
const submitButton = document.getElementById('submit-button');
const userInputElement = document.getElementById('input-text');
// Reach the API
const urlBase = 'https://api.datamuse.com/words?';


// DOM manipulation
const toggleLoadIcon = resultType => {
  let parentElement = document.getElementById(`${resultType}-results`);
  let loadElement = parentElement.firstElementChild;
  loadElement.classList.toggle('hidden');
}

const listResults = (resultArr, resultType) => {
  let parentElement = document.getElementById(`${resultType}-results`);
  let listElement = parentElement.children[1];
    if (resultArr.length > 0) {
      for (let i = 0; i < resultArr.length; i++) {
        let newListItem = document.createElement('li');
        newListItem.classList.add('fade-in');
        newListItem.textContent = resultArr[i];
        listElement.append(newListItem);
      }
    } else {
      addListMessage('NO RESULT FOUND!', resultType);
    }
}

const addListMessage = (message, resultType) => {
  let parentElement = document.getElementById(`${resultType}-results`);
  let listElement = parentElement.children[1];
  let newListItem = document.createElement('li');
  newListItem.classList.add('display-text', 'fade-in');
  newListItem.textContent = message;
  listElement.append(newListItem);
}

const unlistResults = resultType => {
  let parentElement = document.getElementById(`${resultType}-results`);
  let listElement = parentElement.children[1];
  listElement.innerHTML = '';
}


// Manage JSON
const getArrayResult = response => {
  let wordsCollection = [];
    for (let i = 0; i < response.length; i++) {
      wordsCollection.push(response[i].word);
    }
  return wordsCollection;
};


// Asynchronous function
const getResult = (endpoint, resultType) => {
  unlistResults(resultType);
  toggleLoadIcon(resultType);
    fetch(endpoint).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => {
      toggleLoadIcon(resultType);
      addListMessage('REQUEST FAILED!', resultType);
      console.log(networkError.message);
    })
    .then(jsonResponse => {
      let resultsCollection = getArrayResult(jsonResponse);
      toggleLoadIcon(resultType);
      listResults(resultsCollection, resultType);
    });
};


// Prepare input
const joinWithPlus = str => {
  let splitedString = str.split(' ');
  let joinedString = splitedString.join('+');

  return joinedString;
}


// Add event listener
submitButton.addEventListener('click', () => {
  let userInput = userInputElement.value;
  let inputCode = joinWithPlus(userInput);

  let relatedEndpoint = `${urlBase}ml=${inputCode}&max=10`;
  let rhymesEndpoint = `${urlBase}rel_rhy=${inputCode}&max=10`;
  let synonymsEndpoint = `${urlBase}rel_syn=${inputCode}&max=10`;
  let antonymsEndpoint = `${urlBase}rel_ant=${inputCode}&max=10`;

  getResult(relatedEndpoint, 'related');
  getResult(rhymesEndpoint, 'rhymes');
  getResult(synonymsEndpoint, 'synonyms');
  getResult(antonymsEndpoint, 'antonyms');
});


// Mocha test export
// module.exports = joinWithPlus;