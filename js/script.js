const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const filterBtn = document.getElementById('filterBtn');

let tasks = [];
let filterActive = false;

function renderTasks() {
  taskList.innerHTML = '';
  let displayTasks = filterActive ? tasks.filter(t => !t.completed) : tasks;

  if (displayTasks.length === 0) {
    taskList.innerHTML = '<tr><td colspan="4" class="no-task">No task found</td></tr>';
    return;
  }

  displayTasks.forEach((task, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${task.text}</td>
      <td>${task.date || '-'}</td>
      <td>${task.completed ? 'Done' : 'Pending'}</td>
      <td class="actions">
        <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Done'}</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const date = dateInput.value;

  if (!text) return;

  tasks.push({ text, date, completed: false });
  taskInput.value = '';
  dateInput.value = '';
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteAll() {
  tasks = [];
  renderTasks();
}

function toggleFilter() {
  filterActive = !filterActive;
  filterBtn.textContent = filterActive ? 'SHOW ALL' : 'FILTER';
  renderTasks();
}

addBtn.addEventListener('click', addTask);
deleteAllBtn.addEventListener('click', deleteAll);
filterBtn.addEventListener('click', toggleFilter);

renderTasks();
