const dueDate = document.querySelector('[data-testid="test-todo-due-date"]');
const remainingDate = document.querySelector('[data-testid="test-todo-time-remaining"]');

const handleDateChange = () => {
    if (!dueDate.value) {
        remainingDate.textContent = "No date selected";
        return;
    }

    const dueDateValue = new Date(dueDate.value + "T00:00:00").getTime();
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