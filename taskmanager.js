// --- STATE -----
let tasks      = []; // include id, title, desc, priority, due, column
let nextId     = 1;
let editingId  = null;  
let currentColumn = null; // tracks which column opened the modal

// --- DOM REFERENCES -----
const modal          = document.getElementById('modal');
const taskTitle      = document.getElementById('taskTitle');
const taskDesc       = document.getElementById('taskDesc');
const taskPriority   = document.getElementById('taskPriority');
const taskDue        = document.getElementById('taskDue');
const saveTaskBtn    = document.getElementById('saveTaskBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const filterSelect   = document.getElementById('filterPriority');
const taskCounter    = document.getElementById('taskCounter');
const clearDoneBtn   = document.getElementById('clearDoneBtn');

// column lists
const listTodo       = document.getElementById('list-todo');
const listInprogress = document.getElementById('list-inprogress');
const listDone       = document.getElementById('list-done');

function updateCounter() {
    const count = tasks.length;
    taskCounter.textContent =
        count === 1 ? '1 task' : `${count} tasks`;
}

function getListElement(column) {
    if (column === 'todo')       return listTodo;
    if (column === 'inprogress') return listInprogress;
    if (column === 'done')       return listDone;
}

function createTaskCard(taskObj) {

    // wrapper <li>
    const li = document.createElement('li');
    li.setAttribute('data-id', taskObj.id);
    li.classList.add('task-card');

    // title row
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('task-title');

    const titleSpan = document.createElement('span');
    titleSpan.textContent = taskObj.title;

    titleDiv.appendChild(titleSpan);

    // priority badge
    const badge = document.createElement('span');
    badge.classList.add('priority-badge', `priority-${taskObj.priority}`);
    badge.textContent = taskObj.priority;

    // description
    const descP = document.createElement('p');
    descP.classList.add('task-desc');
    descP.textContent = taskObj.desc || '(no description)';

    // due date
    const dueP = document.createElement('p');
    dueP.classList.add('task-due');
    dueP.textContent = taskObj.due ? `Due: ${taskObj.due}` : '';

    // edit and delete buttons
    const editBtn = document.createElement('button');
    editBtn.textContent = '✏ Edit';
    editBtn.classList.add('btn-edit');
    editBtn.setAttribute('data-action', 'edit');
    editBtn.setAttribute('data-id', taskObj.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑 Delete';
    deleteBtn.classList.add('btn-delete');
    deleteBtn.setAttribute('data-action', 'delete');
    deleteBtn.setAttribute('data-id', taskObj.id);

    // assemble the card
    li.appendChild(titleDiv);
    li.appendChild(badge);
    li.appendChild(descP);
    li.appendChild(dueP);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

function addTask(column, taskObj) {
    tasks.push(taskObj);

    const list = getListElement(column);
    const card = createTaskCard(taskObj);
    list.appendChild(card);

    updateCounter();
}

function deleteTask(taskId) {
    const ok = confirm('Delete this task?');
    if (!ok) return;

    // remove from tasks array
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) tasks.splice(index, 1);

    // find the card and fade it out
    const card = document.querySelector(`[data-id="${taskId}"]`);
    if (card) {
        card.classList.add('fade-out');
        // remove from DOM after fade ends (400ms matches CSS transition)
        setTimeout(function() {
            card.remove();
            updateCounter();
        }, 400);
    }
}

function editTask(taskId) {
    const found = tasks.find(t => t.id === taskId);
    if (!found) return;

    editingId = taskId; // flag: we are editing, not adding
    taskTitle.value    = found.title;
    taskDesc.value     = found.desc;
    taskPriority.value = found.priority;
    taskDue.value      = found.due;
    modal.classList.add('active');
    taskTitle.focus();
}

function updateTask(taskId, updatedData) {
    const found = tasks.find(t => t.id === taskId);
    if (!found) return;

    found.title    = updatedData.title;
    found.desc     = updatedData.desc;
    found.priority = updatedData.priority;
    found.due      = updatedData.due;

    const oldCard = document.querySelector(`[data-id="${taskId}"]`);
    if (oldCard) {
        const newCard = createTaskCard(found);
        oldCard.replaceWith(newCard);
    }
}