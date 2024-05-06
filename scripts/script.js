import invoke from "./ankiConnectInvoke.js"; //action, version, params
import ankiDeckObject from "./deckObject.js";
import addCardFunction from "./addCard.js";
import addAppToPage from "./addAppToPage.js";

const listOfDecks = document.getElementById("deckList");
const handleDeckObject = (obj) => {
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
addAppToPage();
handleDeckObject(ankiDeckObject);
document.getElementById("closeButton").addEventListener("click", function () {
   // Close the pop-up
   window.close();
}); // TODO must change from html pop up to a element on the page with position absolute and z-index infinity
