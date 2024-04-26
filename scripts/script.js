import invoke from "./ankiConnectInvoke.js"; //action, version, params

const result = await invoke("deckNames", 6);
console.log("result", result);
