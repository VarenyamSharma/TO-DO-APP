document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const taskList = document.getElementById("taskList");
    const taskContainer = createTaskContainer(taskText);
    taskList.appendChild(taskContainer);
    taskInput.value = ""; 
    saveTasks();
  }
}

function createTaskContainer(taskText, completed = false) {
  const taskContainer = document.createElement("div");
  taskContainer.className = "task-container";

  const taskTextElement = document.createElement("span");
  taskTextElement.className = "task-text";
  taskTextElement.textContent = taskText;

  if (completed) {
    taskTextElement.classList.add("completed");
  }

  const completeButton = document.createElement("button");
  completeButton.className = "complete-button"; 
  completeButton.textContent = "Complete";
  completeButton.onclick = function () {
    taskTextElement.classList.toggle("completed");
    saveTasks();
  };

  const removeButton = document.createElement("button");
  removeButton.className = "remove-button"; 
  removeButton.textContent = "Remove";
  removeButton.onclick = function () {
    taskContainer.remove();
    saveTasks();
  };

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  buttonContainer.appendChild(completeButton);
  buttonContainer.appendChild(removeButton);

  taskContainer.appendChild(buttonContainer);
  taskContainer.appendChild(taskTextElement);

  return taskContainer;
}


function saveTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = [];

  taskList.querySelectorAll(".task-container").forEach(function (taskContainer) {
    const taskText = taskContainer.querySelector(".task-text").textContent;
    const isCompleted = taskContainer.querySelector(".task-text").classList.contains("completed");
    tasks.push({ text: taskText, completed: isCompleted });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");

  tasks.forEach(function (task) {
    const taskContainer = createTaskContainer(task.text, task.completed);
    taskList.appendChild(taskContainer);
  });
}
