import invoke from "./ankiConnectInvoke.js"; //action, version, params

const deckNames = await invoke("deckNames", 6);

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

export default ankiDeckObject;
