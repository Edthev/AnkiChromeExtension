import dotenv from "dotenv";
dotenv.config();

let PORT = 8080 || 8765;
let ADDRESS = "0.0.0.0" || "127.0.0.1" || "localhost";

const invoke = (action, version, params = {}) => {
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

      xhr.open("POST", `http://${ADDRESS}:${PORT}`);
      xhr.send(JSON.stringify({ action, version, params }));
   });
};
export default invoke;
