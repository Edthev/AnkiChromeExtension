import invoke from "./ankiConnectInvoke.js"; //action, version, params
import ankiDeckObject from "./deckObject.js";

const listOfDecks = document.getElementById("deckList");
Object.keys(ankiDeckObject).forEach((key) => {
   const button = document.createElement("button");
   button.textContent = key;
   listOfDecks.appendChild(button);
});
