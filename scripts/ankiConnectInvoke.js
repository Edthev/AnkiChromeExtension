// TODO update port
let PORT = 8080 || 8765;
// TODO update address
// TODO Failed to load resource: net::ERR_CONNECTION_REFUSED 0.0.0.0:8080/:1

let ADDRESS = "0.0.0.0" || "127.0.0.1" || "localhost";

const invoke = (action, version = 6, params = {}) => {
   return new Promise(async (resolve, reject) => {
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

      xhr.open("POST", `http://${ADDRESS}:${PORT}`);
      xhr.onerror = function () {
         const deckList = document.getElementById("deckList");
         const divElement = document.createElement("div");
         divElement.innerHTML = "You forgot to open anki";
         deckList.appendChild(divElement);
         console.error("Edward");
      };
      xhr.send(JSON.stringify({ action, version, params }));
   });
};
export default invoke;
