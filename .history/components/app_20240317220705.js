const main = () => {
  const root = document.getElementById("root");
  const pTag = document.createElement("p");
  pTag.innerHTML = "test";
  //   console.log(pTag);
  root.appendChild = pTag;
};
main();
