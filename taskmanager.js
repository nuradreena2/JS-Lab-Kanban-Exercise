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