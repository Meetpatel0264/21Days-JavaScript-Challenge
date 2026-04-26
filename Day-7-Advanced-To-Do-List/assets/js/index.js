
let tasks = [];

const input = document.getElementById("todoInput");
const priority = document.getElementById("prioritySelect");
const list = document.getElementById("todoList");

// LOAD
function loadTasks() {
    const data = localStorage.getItem("tasks");
    if (data) tasks = JSON.parse(data);
}

// SAVE
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ADD
function addTask() {
    const text = input.value.trim();
    const p = parseInt(priority.value);

    if (text === "" || p === -1) {
        Swal.fire("Error","Enter task + priority","error");
        return;
    }

    tasks.push({
        id: Date.now(),
        text,
        priority: p,
        completed: false
    });

    input.value = "";
    priority.value = "-1";

    saveTasks();
    renderTasks();
}

// DELETE
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

// EDIT
function editTask(id) {
    const task = tasks.find(t => t.id === id);

    Swal.fire({
        title: "Edit Task",
        input: "text",
        inputValue: task.text,
        showCancelButton: true
    }).then(res => {
        if (res.isConfirmed) {
            task.text = res.value;
            saveTasks();
            renderTasks();
        }
    });
}

// TOGGLE COMPLETE
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

// FILTER
function getFilteredTasks() {
    const filter = document.getElementById("filterSelect").value;

    if (filter === "completed") return tasks.filter(t => t.completed);
    if (filter === "pending") return tasks.filter(t => !t.completed);

    return tasks;
}

// PRIORITY UI
function getBadge(p) {
    if (p === 1) return "badge-high";
    if (p === 2) return "badge-medium";
    return "badge-low";
}

function getLabel(p) {
    if (p === 1) return "High";
    if (p === 2) return "Medium";
    return "Low";
}

// RENDER
function renderTasks() {
    const filtered = getFilteredTasks();

    if (filtered.length === 0) {
        list.innerHTML = "<p class='text-center'>No tasks</p>";
        return;
    }

    let html = "";

    filtered.forEach(t => {
        html += `
        <div class="todo-item" data-id="${t.id}">
            <div>
                <p class="${t.completed ? 'completed' : ''}">${t.text}</p>
                <span class="badge ${getBadge(t.priority)}">${getLabel(t.priority)}</span>
            </div>

            <div class="d-flex gap-2">
                <button class="btn btn-success btn-sm" onclick="toggleTask(${t.id})">✔</button>
                <button class="btn btn-warning btn-sm" onclick="editTask(${t.id})">✏</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${t.id})">🗑</button>
            </div>
        </div>`;
    });

    list.innerHTML = html;
}

// DRAG & DROP
new Sortable(list, {
    animation:150,
    onEnd: () => {
        const newOrder = [];
        document.querySelectorAll(".todo-item").forEach(el => {
            const id = Number(el.dataset.id);
            newOrder.push(tasks.find(t => t.id === id));
        });
        tasks = newOrder;
        saveTasks();
    }
});

// ENTER KEY
input.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});

// INIT
loadTasks();
renderTasks();