const addAppToPage = () => {
   const divElement = document.createElement("div");
   divElement.innerText = "Testing Edward's extension";
   divElement.setAttribute("id", "AnkiChromeExtensionParentElement");
   readingTimeElement.classList.add("", "");
   const body = document.body;
   body.insertBefore(divElement, body.firstChild);
};
export default addAppToPage;
