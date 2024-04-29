import invoke from "./ankiConnectInvoke.js"; //action, version, params
import ankiDeckObject from "./deckObject.js";

const listOfDecks = document.getElementById("deckList");
const handleButtonClick = (key) => {
   listOfDecks.innerHTML = "";
   if (key == []) {
      listOfDecks.innerHTML = "empty";
   }
   console.log(Object.keys(ankiDeckObject[key]));
   Object.keys(ankiDeckObject[key]).forEach((key) => {
      const button = document.createElement("button");
      button.textContent = key;
      listOfDecks.appendChild(button);
      button.addEventListener("click", () => {
         handleButtonClick(key);
      });
   });
};
Object.keys(ankiDeckObject).forEach((key) => {
   const button = document.createElement("button");
   button.textContent = key;
   listOfDecks.appendChild(button);
   button.addEventListener("click", () => {
      handleButtonClick(key);
   });
});
