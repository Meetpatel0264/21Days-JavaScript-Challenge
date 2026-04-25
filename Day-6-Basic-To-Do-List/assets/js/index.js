 let tasks = [];
    const todoInput = document.getElementById("todoInput");
    const prioritySelect = document.getElementById("prioritySelect");
    const todoList = document.getElementById("todoList");

    function addTask() {
        const taskText = todoInput.value.trim();
        const priority = parseInt(prioritySelect.value);

        if (taskText === "" || priority === -1) {
            Swal.fire({
                icon: "error",
                title: "Invalid Input",
                text: "Please enter a task and select a priority.",
            });
            return;
        }

        const task = {
            id: new Date().toISOString(), 
            text: taskText,
            priority: priority,
            completed: false
        };

        tasks.push(task);
        todoInput.value = "";
        prioritySelect.value = "-1";

        renderTasks();
    }
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }
    function getPriorityLabel(priority) {
        switch (priority) {
            case 1: return "High";
            case 2: return "Medium";
            case 3: return "Low";
            default: return "Unknown";
        }
    }

    function getBgColorClass(priority) {
        switch (priority) {
            case 1: return "badge-high";
            case 2: return "badge-medium";
            case 3: return "badge-low";
            default: return "badge-medium";
        }
    }

    function renderTasks() {
        if (tasks.length === 0) {
            todoList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <p>No tasks yet. Add one above!</p>
                </div>
            `;
            return;
        }

        let html = "";
        for (let i = 0; i < tasks.length; i++) {
            const t = tasks[i];
            html += `
                <div class="todo-item p-3 mb-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <p class="todo-text mb-1">${t.text}</p>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="badge ${getBgColorClass(t.priority)}">
                                ${getPriorityLabel(t.priority)}
                            </span>
                            <button class="btn btn-sm btn-danger" onclick="deleteTask('${t.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        todoList.innerHTML = html;
    }

    todoInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });