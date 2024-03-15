let arr = [1, 2, 3, 4];

let app = document.getElementById("app");
arr.map((val) => {
  app.appendChild(<div>test1</div>);
});
