const main = () => {
  const root = document.getElementById("root");
  const pTag = document.createElement("p");
  pTag = pTag.innerHTML("test");
  root.appendChild(pTag);
};
main();
