import invoke from "./ankiConnectInvoke.js"; //action, version, params
import ankiDeckObject from "./deckObject.js";
import addCardFunction from "./addCard.js";

const listOfDecks = document.getElementById("deckList");
const handleDeckObject = (obj) => {
   console.log("handleDeckObject Obj:", obj);
   Object.keys(obj).forEach((deck) => {
      const selectedDeck = obj[deck];
      const button = document.createElement("button");
      button.textContent = deck; //+ " " + Object.keys(selectedDeck).length;
      listOfDecks.appendChild(button);
      button.addEventListener("click", () => {
         listOfDecks.innerHTML = "";
         if (Object.keys(selectedDeck).length == 0) {
            console.log("end stage");
            // console.log("deck", deck);
            addCardFunction(deck);
         } else {
            handleDeckObject(selectedDeck);
         }
      });
   });
};
handleDeckObject(ankiDeckObject);
