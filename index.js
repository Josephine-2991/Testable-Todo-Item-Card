// Variables for DOM elements
const dueDate = document.querySelector('[data-testid="test-todo-due-date"]');
const remainingDate = document.querySelector('[data-testid="test-todo-time-remaining"]');


const editButton = document.querySelector('[data-testid="test-todo-edit-button"]');
const editForm = document.querySelector('[data-testid="test-todo-edit-form"]');
const todoCard = document.querySelector('.todo-card');

const saveButton = document.querySelector('[data-testid="test-todo-save-button"]');
const cancelButton = document.querySelector('[data-testid="test-todo-cancel-button"]');

const editTitleInput = document.querySelector('[data-testid="test-todo-edit-title-input"]');
const editDescriptionInput = document.querySelector('[data-testid="test-todo-edit-description-input"]');
const editPrioritySelect = document.querySelector('[data-testid="test-todo-edit-priority-select"]');
const statusControl = document.querySelector('[data-testid="test-todo-status-control"]');
const editDueDateInput = document.querySelector('[data-testid="test-todo-edit-due-date-input"]');

// Card 
const todoTitle = document.querySelector('[data-testid="test-todo-title"]');
const todoDescription = document.querySelector('[data-testid="test-todo-description"]');
const todoPriority = document.querySelector('[data-testid="test-todo-priority"]');
console.log(todoPriority)
const todoStatus = document.querySelector('[data-testid="test-todo-status"]');
const todoDueDate = document.querySelector('[data-testid="test-todo-due-date"]');


// Functions for interactivity

const handleDateChange = () => {
    if (!dueDate.value) {
        remainingDate.textContent = "No date selected";
        return;
    }

    const dueDateValue = new Date(editDueDateInput.value + "T00:00:00").getTime();
    const now = Date.now();
    const remaining = dueDateValue - now;
    console.log({ remaining, dueDateValue, now });

    const s  = Math.floor(remaining / 1000);
    const m  = Math.floor(s / 60);
    const h  = Math.floor(m / 60);
    const d  = Math.floor(h / 24);
    const w  = Math.floor(d / 7);
    const mo = Math.round(d / 30);

    if (s <= 0) {
        remainingDate.textContent = "Deadline has passed!";
    } else if (s < 60) {
        remainingDate.textContent = "Due now!";
    } else if (m < 60) {
        remainingDate.textContent = `Due in ${m} minute${m === 1 ? '' : 's'}`;
    } else if (h < 24) {
        remainingDate.textContent = h === 1 
            ? 'Due in about 1 hour' 
            : `Due today (in ${h} hours)`;
    } else if (d === 1) {
        remainingDate.textContent = 'Due tomorrow';
    } else if (d <= 6) {
        remainingDate.textContent = `Due in ${d} days`;
    } else if (w === 1) {
        remainingDate.textContent = 'Due next week';
    } else if (w < 5) {
        remainingDate.textContent = `Due in ${w} weeks`;
    } else {
        remainingDate.textContent = `Due in about ${mo} month${mo === 1 ? '' : 's'}`;
    }
};


dueDate.addEventListener('change', handleDateChange);

setInterval(handleDateChange, 60000);

// EDIT BUTTON
// =======================
editButton.addEventListener('click', () => {

    // Prefill form with current values
    editTitleInput.value = todoTitle.textContent;
    editDueDateInput.value = todoDueDate.value;

    // Show form, hide card
    todoCard.style.display = "none";
    editForm.style.display = "flex";

    // Focus first input (bonus)
    editTitleInput.focus();
});


// =======================
// SAVE BUTTON
// =======================
saveButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Update card values
    todoTitle.textContent = editTitleInput.value;
    todoDescription.textContent = editDescriptionInput.value;
    todoPriority.textContent = editPrioritySelect.options[editPrioritySelect.selectedIndex].text;
    todoDueDate.value = editDueDateInput.value;
    todoStatus.textContent = statusControl.options[statusControl.selectedIndex].text;
    // Hide form, show card
    editForm.style.display = "none";
    todoCard.style.display = "flex";

    // Return focus to Edit button (bonus)
    editButton.focus();
});


// =======================
// CANCEL BUTTON
// =======================
cancelButton.addEventListener('click', () => {

    // Just close form without saving
    editForm.style.display = "none";
    todoCard.style.display = "flex";

    // Return focus
    editButton.focus();
});