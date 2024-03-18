//! API call to Anki Connect
async function invokeAnkiConnectAPICall() {
  function invoke(action, version, params = {}) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("error", () => reject("failed to issue request"));
      xhr.addEventListener("load", () => {
        try {
          const response = JSON.parse(xhr.responseText);
          if (Object.getOwnPropertyNames(response).length != 2) {
            throw "response has an unexpected number of fields";
          }
          if (!response.hasOwnProperty("error")) {
            throw "response is missing required error field";
          }
          if (!response.hasOwnProperty("result")) {
            throw "response is missing required result field";
          }
          if (response.error) {
            throw response.error;
          }
          resolve(response.result);
        } catch (e) {
          reject(e);
        }
      });
      //! Change IP and Server Here
      xhr.open("POST", "http://0.0.0.0:8080");
      xhr.send(JSON.stringify({ action, version, params }));
    });
  }

  //! Get Deck
  const deckNames = await invoke("deckNames", 6);
  //! Create Deck
  // TODO make a input field to Create Deck
  // TODO make functionality for easy subDeck making
  // let createdDeckName = "Test1";
  // await invoke("createDeck", 6, { deck: createdDeckName });
  //* rerun get deck
  // await invoke("deckNames", 6);
  // ! Delete Deck
  // const deleteDeck = await invoke("deleteDeck", 6, { deck: createdDeckName });
  // rerun get deck
  // deckNames = await invoke("deckNames", 6);
  let arrayOfDecks = [];
  //   start on 1 to skip default deck
  // TODO fix default and remove only if empty? Button to switch
  for (let i = 1; i < deckNames.length; i++) {
    let singleDeckName = deckNames[i];
    let lookingFor = "::";
    eachDeck.includes(lookingFor) ? i : newArr.push(result[i]);
    arrayOfDecks.push(singleDeckName);
    newArr = eachDeck.split("::");
  }

  // ! DOM manipulation
  let app = document.getElementById("app");
  //   TODO take input of Default::Deck and return Deck inside Default in the next menu
  //   if Default::Deck::underDeck::smallest
  arrayOfDecks.map((deck) => {
    // console.log(deck.search("::"));
    let pTag = document.createElement("button");
    pTag.innerText = deck.slice(
      deck.search("::") > 0 ? deck.search("::") : deck
    );
    pTag.innerText = deck.replace(/::/g, "-");
    app.appendChild(pTag);
  });
  //   console.log(`got list of decks: ${result.keys()}`);
  console.log(arrayOfDecks);
}
invokeAnkiConnectAPICall();
// TODO Get User? (may not be required)
// TODO When "Deck Button" is clicked a drop down search to find deck is available
// TODO Get Card Type
// TODO Get Card Type fields
// TODO When Card Type is selected populate fields
// TODO Import Tags
// TODO Tags are searchable
// TODO Button to define words
// TODO Pin button (when toggled on words are kept)
// TODO Add image occlusion
// TODO Add Highlight button
// TODO Add Superscript
// TODO Works with images
// TODO Screenshot button
// TODO Bold button
// TODO Underline Button
// TODO Youtube support?
// TODO Settings Page
// TODO
// TODO
