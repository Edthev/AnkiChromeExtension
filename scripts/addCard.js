import invoke from "./ankiConnectInvoke.js"; //action, version, params

const addCardFunction = async (deck) => {
   const addCardForm = document.getElementById("addCardPage");
   const deckList = document.getElementById("deckList");
   deckList.setAttribute("id", "displayNone");
   //    function for notetype
   //    function for listening to notetype change and getting input fields that correspond to that notetype
   //    function to create elements based on input fields
   //

   const labelSelectField = document.createElement("label");
   labelSelectField.setAttribute("for", "noteType");
   labelSelectField.setAttribute("name", "noteType");
   labelSelectField.innerText = "Note Type:";

   const selectField = document.createElement("select");
   selectField.setAttribute("id", "noteTypeDropdown");
   labelSelectField.setAttribute("name", "noteType");
   const noteTypeArray = await invoke("modelNames", 6);
   noteTypeArray.map((singleNoteType) => {
      const optionField = document.createElement("option");
      optionField.setAttribute("value", singleNoteType);
      optionField.innerText = singleNoteType;
      selectField.appendChild(optionField);
   });
   addCardForm.appendChild(labelSelectField);
   addCardForm.appendChild(selectField);
   const inputElements = document.createElement("div");
   inputElements.setAttribute("id", "inputElements");
   addCardForm.appendChild(inputElements);

   const handleNoteTypeInputFields = async (event) => {
      document.getElementById("inputElements").innerHTML = "";
      const noteType = document.getElementById("noteTypeDropdown").value;
      const modelFieldDescriptions = await invoke("modelFieldDescriptions", 6, {
         modelName: noteType,
      });
      const modelFieldNames = await invoke("modelFieldNames", 6, {
         modelName: noteType,
      });

      for (let i = 0; i < modelFieldNames.length; i++) {
         if (modelFieldNames[i] == "Source") {
            const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
            modelFieldDescriptions[i] = activeTab.url;
         }
      }

      modelFieldNames.map((fieldName, i) => {
         // label
         const labelInputField = document.createElement("label");
         labelInputField.setAttribute("for", "textInput");
         labelInputField.setAttribute("name", "textInput");
         labelInputField.innerText = fieldName;
         inputElements.appendChild(labelInputField);

         // input
         // TODO input field must be able to handle images,video and audio
         const inputField = document.createElement("input");
         inputField.setAttribute("type", "text");
         inputField.setAttribute("class", "inputField");
         inputField.setAttribute("id", fieldName);
         inputField.setAttribute("name", "textInput");
         inputField.setAttribute("placeholder", modelFieldDescriptions[i]);
         inputElements.appendChild(inputField);
      });
   };

   const inputFieldsOnLoad = await invoke("modelFieldNames", 6, {
      modelName: noteTypeArray[0],
   });
   handleNoteTypeInputFields(inputFieldsOnLoad);

   selectField.addEventListener("change", async (event) => {
      handleNoteTypeInputFields(event);
   });

   const button = document.createElement("button");
   button.setAttribute("type", "submit");
   button.setAttribute("id", "submitCard");
   button.innerText = "Submit";
   addCardForm.appendChild(button);

   addCardForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const inputs = document.querySelectorAll(".inputField");
      console.log("inputs:", inputs);
      let arrayOfValues = [];
      inputs.forEach((input, i) => {
         const value = input.value;
         console.log("input", value);
         arrayOfValues.push(value);
      });
      let i = 0;
      while (i < inputs.length) {
         console.log("input len", i);
         document.querySelectorAll(".inputField")[i].value = "";
         i++;
      }

      const modelFieldNames = await invoke("modelFieldNames", 6, {
         modelName: document.getElementById("noteTypeDropdown").value,
      });
      let fieldObj = {};
      for (let i = 0; i < modelFieldNames.length; i++) {
         if (modelFieldNames[i] == "Source") {
            const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const url = activeTab.url;
            console.log("URL:", url);
            fieldObj[modelFieldNames[i]] = url;
         } else {
            fieldObj[modelFieldNames[i]] = arrayOfValues[i];
         }
      }

      let noteType = document.getElementById("noteTypeDropdown").value;
      document.querySelectorAll("inputField").value = "";

      // TODO set color to yellow/orange to show work is being done
      try {
         const res = await invoke("addNote", 6, {
            note: {
               deckName: deck,
               modelName: noteType,
               fields: fieldObj,
               options: {
                  allowDuplicate: false,
                  duplicateScope: "deck",
                  duplicateScopeOptions: {
                     deckName: deck,
                     checkChildren: false,
                     checkAllModels: false,
                  },
               },
               tags: [deck],
               audio: [
                  /*
               {
                  url: "https://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kanji=猫&kana=ねこ",
                  filename: "yomichan_ねこ_猫.mp3",
                  skipHash: "7e2c2f954ef6051373ba916f000168dc",
                  fields: ["Front"],
               },
               */
               ],
               video: [
                  /*
               {
                  url: "https://www.youtube.com/watch?v=K_aVLPgpktQ",
                  filename: "countdown.mp4",
                  skipHash: "4117e8aab0d37534d9c8eac362388bbe",
                  fields: ["Back"],
               },
               */
               ],
               picture: [
                  ,/*
               {
                  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/A_black_cat_named_Tilly.jpg/220px-A_black_cat_named_Tilly.jpg",
                  filename: "black_cat.jpg",
                  skipHash: "8d6e4646dfae812bf39651b59d7429ce",
                  fields: ["Back"],
               }
               */
               ],
            },
         });
         console.log("res:", res);
      } catch (error) {
         console.log(error);
      }
      //   TODO once added show green to show it was completed
      // TODO show red error if something went wrong (null on failure)
   });
};
export default addCardFunction;
