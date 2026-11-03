// Get HTML Elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");

const filterButtons = document.querySelectorAll(".filter-btn");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

// Add Task
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
addTask();
}
});

function addTask() {


const text = taskInput.value.trim();

if (text === "") {
    alert("Please enter a task!");
    return;
}

const task = {
    id: Date.now(),
    text: text,
    completed: false
};

tasks.push(task);

saveTasks();
displayTasks();

taskInput.value = "";


}

// Save Tasks
function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display Tasks
function displayTasks() {


taskList.innerHTML = "";

let filteredTasks = tasks.filter(function(task) {

    if (currentFilter === "completed") {
        return task.completed;
    }

    if (currentFilter === "pending") {
        return !task.completed;
    }

    return true;
});

filteredTasks.forEach(function(task) {

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function() {
        toggleTask(task.id);
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = "task-text";

    if (task.completed) {
        span.classList.add("completed");
    }

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    editBtn.addEventListener("click", function() {
        editTask(task.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function() {
        deleteTask(task.id);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);

});

updateCounter();


}

// Complete Task
function toggleTask(id) {


tasks = tasks.map(function(task) {

    if (task.id === id) {
        task.completed = !task.completed;
    }

    return task;
});

saveTasks();
displayTasks();


}

// Delete Task
function deleteTask(id) {


tasks = tasks.filter(function(task) {
    return task.id !== id;
});

saveTasks();
displayTasks();


}

// Edit Task
function editTask(id) {


const task = tasks.find(function(task) {
    return task.id === id;
});

const newText = prompt("Edit your task:", task.text);

if (newText === null) {
    return;
}

if (newText.trim() === "") {
    alert("Task cannot be empty!");
    return;
}

task.text = newText.trim();

saveTasks();
displayTasks();


}

// Filter Tasks
filterButtons.forEach(function(button) {


button.addEventListener("click", function() {

    currentFilter = button.dataset.filter;

    filterButtons.forEach(function(btn) {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    displayTasks();
});


});

// Update Counter
function updateCounter() {


totalTasks.textContent = "Total Tasks: " + tasks.length;

const completed = tasks.filter(function(task) {
    return task.completed;
}).length;

completedTasks.textContent = "Completed: " + completed;


}

// Initial Display
displayTasks();
