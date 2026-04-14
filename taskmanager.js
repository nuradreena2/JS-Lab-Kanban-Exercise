// ── STATE ────────────────
let tasks      = []; // include id, title, desc, priority, due, column
let nextId     = 1;
let editingId  = null;  
let currentColumn = null; // tracks which column opened the modal