import invoke from "./ankiConnectInvoke.js"; //action, version, params

const deckNames = await invoke("deckNames", 6);

// if a deck has a subdeck make a subarray with all the content inside [spanish,[grammar,adjectives]] | must be a subarray of subarrays
let deckObject = {};
const turnDeckArrayToObject = (arrayOfDecks) => {
   const deck = arrayOfDecks.map((deck) => deck.split("::"));
   const arrayOfNestedObjects = deck.map((array) =>
      array.reverse().reduce((res, key) => ({ [key]: res }), {})
   );

   function mergeObjects(...objs) {
      const result = {};
      objs.forEach((obj) => {
         for (const key in obj) {
            if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
               result[key] = mergeObjects(result[key], obj[key]);
            } else {
               result[key] = obj[key];
            }
         }
      });
      return result;
   }

   return mergeObjects(...arrayOfNestedObjects);
};
const ankiDeckObject = turnDeckArrayToObject(deckNames);
console.log(ankiDeckObject);
console.log(Object.keys(ankiDeckObject["ESPAÑOL"]));
