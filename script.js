const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyMsg = document.getElementById('emptyMsg');

function saveTasks() {
  localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    taskList.innerHTML = saved;
    emptyMsg.style.display = taskList.children.length ? 'none' : 'block';
    addEventListenersToTasks();
  }
}

function addEventListenersToTasks() {
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = () => {
      btn.parentElement.style.opacity = '0';
      btn.parentElement.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        btn.parentElement.remove();
        saveTasks();
        emptyMsg.style.display = taskList.children.length ? 'none' : 'block';
      }, 300);
    };
  });

  document.querySelectorAll('input[type="checkbox"]').forEach(chk => {
    chk.onchange = () => {
      const text = chk.parentElement.nextElementSibling;
      text.classList.toggle('completed', chk.checked);
      saveTasks();
    };
  });
}

function addTask(text) {
  if (!text.trim()) return;

  const li = document.createElement('li');
  li.className = 'task-item';
  li.innerHTML = `
    <div class="checkbox-wrapper">
      <input type="checkbox">
    </div>
    <span class="task-text">${text}</span>
    <button class="delete-btn">×</button>
  `;

  taskList.appendChild(li);
  emptyMsg.style.display = 'none';

  // Trigger animation
  setTimeout(() => {
    li.style.opacity = '1';
    li.style.transform = 'translateY(0)';
  }, 10);

  saveTasks();
  addEventListenersToTasks();
  taskInput.value = '';
  taskInput.focus();
}

// Add task events
addBtn.onclick = () => addTask(taskInput.value);

taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    addTask(taskInput.value);
  }
});

// Initialize
loadTasks();
taskInput.focus();