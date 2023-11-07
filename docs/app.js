document.addEventListener("DOMContentLoaded", all)

function all() {
  const main = document.getElementById("main").value;
  main = "bruh";
  /*load(main);
  setInterval(save(main),1000);*/
}

function save(text) {
    localStorage.setItem("text",text);
}

function load(main) {
    main = localStorage.text;
}