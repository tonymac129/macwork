/*

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input");
  const saveTaskBtn = document.getElementById("add-task-btn");
  const tasks = document.getElementById("tasks");
  const audio = document.getElementById("ding");
  saveTaskBtn.addEventListener("click", function () {
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
      const taskItem = document.createElement("li");
      const edit = document.createElement("span");
      const remove = document.createElement("span");
      const complete = document.createElement("span");
      const favorite = document.createElement("span");

      remove.classList.add("remove");
      remove.innerHTML =
        '<i class="fa-solid fa-trash fa-bounce" style="color: #ffffff;"></i>';
      edit.classList.add("edit");
      edit.innerHTML =
        '<i class="fa-solid fa-pen" style="color: #ffffff;"></i>';
      complete.classList.add("complete");
      complete.innerHTML =
        '<i class="fa-regular fa-circle" style="color: #ffffff;"></i>';
      favorite.classList.add("favorite");
      favorite.innerHTML =
        '<i class="fa-regular fa-star" style="color: #ffffff;"></i>';
      taskItem.innerHTML = taskText;

      taskItem.setAttribute("data-task", taskText);

      taskList.appendChild(taskItem);
      taskItem.appendChild(remove);
      taskItem.appendChild(edit);
      taskItem.appendChild(complete);
      taskItem.appendChild(favorite);
      todoInput.value = "";

      saveTasksToStorage();
    }
  });

  taskList.addEventListener("mouseover", function (event) {
    const target = event.target;

    if (target.classList.contains("complete")) {
      target.addEventListener("mouseenter", function () {
        target.innerHTML =
          '<i class="fa-regular fa-circle-check" style="color: #ffffff;"></i>';
      });
    }
  });

  taskList.addEventListener("mouseout", function (event) {
    const target = event.target;

    if (target.classList.contains("complete")) {
      target.addEventListener("mouseleave", function () {
        target.innerHTML =
          '<i class="fa-regular fa-circle" style="color: #ffffff;"></i>';
      });
    }
  });

  taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("fa-trash")) {
      const taskItem = event.target.closest("li");
      taskList.removeChild(taskItem);
      const taskText = taskItem.getAttribute("data-task");
      const text = taskItem.innerText;
      removeTaskFromStorage(taskText);
    }
    if (event.target.classList.contains("fa-star")) {
      //CODE FOR THE FAVORITE FEATURE!!!
      if (event.target.classList.contains("fa-regular")) {
        const favorite = event.target;
        const taskItem = event.target.closest("li");
        localStorage.setItem("fav", taskItem);
        favorite.classList.remove("fa-regular");
        favorite.classList.add("fa-solid");
        taskItem.classList.add("fav"); //fix this thing
      } else {
        const favorite = event.target;
        favorite.classList.remove("fa-solid");
        favorite.classList.add("fa-regular");
        taskItem.classList.remove("fav");
      }
    }

    if (event.target.classList.contains("fa-pen")) {
      const taskItem = event.target.closest("li");
      const remove = taskItem.querySelector(".fa-trash");
      const edit = taskItem.querySelector(".fa-pen");
      const complete = taskItem.querySelector(".fa-circle");
      const favorite = taskItem.querySelector(".fa-star");
      remove.style.visibility = "hidden";
      edit.style.visibility = "hidden";
      complete.style.visibility = "hidden";
      favorite.style.visibility = "hidden";
      taskItem.visibility = "visible";

      taskItem.setAttribute("contenteditable", true);
      taskItem.focus();
      taskItem.classList.add("editing");
      taskItem.addEventListener("blur", function () {
        if (taskItem.classList.contains("editing")) {
          taskItem.setAttribute("contenteditable", false);
          const taskText2 = this.innerText;
          taskItem.setAttribute("data-task", taskText2);
          taskItem.classList.remove("editing");
          const edit = document.createElement("span");
          const remove = document.createElement("span");
          const complete = document.createElement("span");
          const favorite = document.createElement("span");

          remove.classList.add("remove");
          remove.innerHTML =
            '<i class="fa-solid fa-trash" style="color: #ffffff;"></i>';
          edit.classList.add("edit");
          edit.innerHTML =
            '<i class="fa-solid fa-pen" style="color: #ffffff;"></i>';
          complete.classList.add("complete");
          complete.innerHTML =
            '<i class="fa-regular fa-circle" style="color: #ffffff;"></i>';
          favorite.classList.add("favorite");
          favorite.innerHTML =
            '<i class="fa-regular fa-star" style="color: #ffffff;"></i>';
          taskItem.innerHTML = taskText2;

          taskList.appendChild(taskItem);
          taskItem.appendChild(remove);
          taskItem.appendChild(edit);
          taskItem.appendChild(complete);
          taskItem.appendChild(favorite);

          saveTasksToStorage();
        }
      });
    }
    if (event.target.classList.contains("fa-circle-check")) {
      audio.play();
      const taskItem = event.target.closest("li");
      taskList.removeChild(taskItem);
      const taskText = taskItem.getAttribute("data-task");
      removeTaskFromStorage(taskText);
    }
  });

  function removeTaskFromStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndexToDelete = tasks.findIndex((task) => task === taskText);

    if (taskIndexToDelete !== -1) {
      tasks.splice(taskIndexToDelete, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  function loadTasksFromStorage() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const favTasks = JSON.parse(localStorage.getItem("fav")) || [];
    favTasks.forEach(() => {
      this.classList.add("fav");
    });
    savedTasks.forEach((taskText) => {
      const taskItem = document.createElement("li");
      const edit = document.createElement("span");
      const remove = document.createElement("span");
      const complete = document.createElement("span");
      const favorite = document.createElement("span");

      remove.classList.add("remove");
      remove.innerHTML =
        '<i class="fa-solid fa-trash" style="color: #ffffff;"></i>';
      edit.classList.add("edit");
      edit.innerHTML =
        '<i class="fa-solid fa-pen" style="color: #ffffff;"></i>';
      complete.classList.add("complete");
      complete.innerHTML =
        '<i class="fa-regular fa-circle" style="color: #ffffff;"></i>';
      favorite.classList.add("favorite");
      favorite.innerHTML =
        '<i class="fa-regular fa-star" style="color: #ffffff;"></i>';
      taskItem.innerHTML = taskText;
      taskItem.setAttribute("data-task", taskText);

      taskList.appendChild(taskItem);
      taskItem.appendChild(remove);
      taskItem.appendChild(edit);
      taskItem.appendChild(complete);
      taskItem.appendChild(favorite);
      taskItem.setAttribute("draggable", true);
    });
  }

  function saveTasksToStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll("#task-list li");
    taskItems.forEach((taskItem) =>
      tasks.push(taskItem.getAttribute("data-task"))
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (taskItem.classList.contains("fav")) {
      localStorage.setItem("fav", taskItem);
    }
  }

  loadTasksFromStorage();
  const list = document.getElementById("task-list");
  let draggedItem = null;
  let placeholder = document.createElement("div");
  placeholder.classList.add("placeholder");

  list.addEventListener("dragstart", (event) => {
    draggedItem = event.target;
    draggedItem.classList.add("none");
  });

  list.addEventListener("dragover", (event) => {
    event.preventDefault();
    if (event.target.tagName === "LI" && event.target !== draggedItem) {
      const rect = event.target.getBoundingClientRect();
      const mouseY = event.clientY;
      const aboveTarget = mouseY < rect.top + rect.height / 2;

      if (placeholder.parentNode === list) {
        list.removeChild(placeholder);
      }
      event.currentTarget.classList.add("dragging");

      if (aboveTarget) {
        list.insertBefore(placeholder, event.target);
      } else {
        list.insertBefore(placeholder, event.target.nextSibling);
      }
    } else {
      list.removeChild(placeholder);
    }
  });

  list.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.tagName === "LI" && event.target !== draggedItem) {
      if (placeholder.parentNode === list) {
        list.removeChild(placeholder);
      }
      draggedItem.classList.remove("none");
      draggedItem.classList.remove("dragging");
      const rect = event.target.getBoundingClientRect();
      const mouseY = event.clientY;
      event.currentTarget.classList.remove("dragging");
      const aboveTarget = mouseY < rect.top + rect.height / 2;

      if (aboveTarget) {
        list.insertBefore(draggedItem, event.target);
      } else {
        list.insertBefore(draggedItem, event.target.nextSibling);
      }
      draggedItem.classList.remove("none");
    }
  });
});
*/
