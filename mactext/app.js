document.addEventListener("keydown", (event) => {
  const keyName = event.key;

  if (keyName === "Enter" && event.ctrlKey) {
    go();
  }
});

function go() {
  const select = document.querySelector(".select").value;
  if (select === "shorten") {
    shorten();
  } else if (select === "char-count") {
    charCount();
  } else if (select === "cap-all") {
    capAll();
  } else if (select === "uncap-all") {
    uncapAll();
  } else if (select === "cap") {
    cap();
  } else if (select === "lorem") {
    lorem();
  }
}

function changePlace() {
  const select = document.querySelector(".select").value;
  if (select === "lorem") {
    document.querySelector(".value").placeholder = "Max characters 5000";
  } else {
    document.querySelector(".value").placeholder = "Enter value here";
  }
  
}

function gotIt() {
  const tip = document.querySelector(".tip");
  tip.style.display = "none";
  localStorage.setItem("closed", "yes");
}

function shorten() {
  const text = document.querySelector(".text").value;
  const result = document.querySelector(".copy");
  const value = document.querySelector(".value").value;
  result.innerHTML = text.substring(0, value) + "...";
}

function charCount() {
  const text = document.querySelector(".text").value;
  const result = document.querySelector(".copy");
  result.innerHTML = text.length;
}

function capAll() {
  const text = document.querySelector(".text").value;
  const result = document.querySelector(".copy");
  result.innerHTML = text.toUpperCase();
}

function uncapAll() {
  const text = document.querySelector(".text").value;
  const result = document.querySelector(".copy");
  result.innerHTML = text.toLowerCase();
}

function cap() {
  const text = document.querySelector(".text").value;
  const result = document.querySelector(".copy");

  const modifiedText = text.replace(/\. (.)/g, (match) => {
    return match.toUpperCase();
  });
  const modified2 = modifiedText.replace(/\.(.)/g, (match) => {
    let string = match.split("");
    return string[0] + " " + string[1].toUpperCase();
  });
  let last = modified2.length;
  if (modified2.at(-1) !== ".") {
    if (modified2.at(-1) === " ") {
      let finalText = modified2.substring(0, last - 1) + ".";
      result.innerHTML = text[0].toUpperCase() + finalText.substring(1, last);
      return;
    }
    console.log("no");
    let finalText = modified2 + ".";
    last++;
    result.innerHTML = text[0].toUpperCase() + finalText.substring(1, last);
    return;
  }
  result.innerHTML = text[0].toUpperCase() + modified2.substring(1, last);
}

function lorem() {
  const result = document.querySelector(".copy");
  let value = document.querySelector(".value").value;
  
  if (value > 5000) {
    value = 5000;
  }
  let i;
  let d;
  let loremF = "";
  for (d = 0; d <= value-1; d++) {
    let random = Math.floor((Math.random() + 0.2) * 7);
    let loremT = "";
    console.log(random);
    for (i = 0; i < random; i++) {
      const alphabet = "qwertyuiopasdfghjklzxcvbnm";
      const randomIndex = Math.floor(Math.random() * 25);
      loremT += alphabet[randomIndex];
      console.log(loremT);
    }
    loremF += " " + loremT;
  }
  result.innerHTML = loremF;
}

function copy() {
  const copyText = document.querySelector(".copy").innerHTML;
  navigator.clipboard.writeText(copyText);
  const copyBtn = document.querySelector(".copy-btn");
  copyBtn.innerHTML = "Copied!";
}

