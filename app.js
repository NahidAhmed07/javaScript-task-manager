
function getTag(id) {
    const tag = document.getElementById(id);
    return tag;
}

const taskParent = getTag("task-parent");
const modal = getTag('modal');
const modalInput = getTag("modal-input");

getTag("add-task").addEventListener("click", () => {
    const inputvalue = getTag("task-field");
    if (inputvalue.value == '') {
        inputvalue.style.border = '2px solid red'
    } else {
        inputvalue.style.border = 'none'
        const task = createTask(inputvalue.value);
        taskParent.appendChild(task);
        inputvalue.value = "";
        updateCounter();
    }
    
});

// done and color btn functionality
let completed = 0;

document.addEventListener('click', (event) => {
    const colorKey = event.target.dataset.color;
    const btnKey = event.target.dataset.button;
    const taskText = event.target.parentNode.previousElementSibling;

    if (btnKey == 'done') {
        event.target.innerText = 'Complate'
        event.target.setAttribute("disabled", true);
        taskText.style.color = 'red'
        completed++;
        getTag("done-task-2").innerText = completed;
        getTag('done-task').innerText = completed;
        updateCounter();
    }
    else if (btnKey == 'color') {
        const taskDiv = event.target.parentNode.parentNode;
        taskDiv.style.backgroundColor = '';
        taskDiv.style.backgroundColor = colorKey;

    } else if (btnKey == 'edit') {
        modalInput.value = taskText.innerText;
        modal.style.display = 'block';
        taskText.setAttribute('id', 'edited');

    } else if (btnKey == 'save') {
        const taskP = getTag("edited");
        taskP.innerText = modalInput.value;
        modal.style.display = "none";
        taskP.removeAttribute('id');

    }
    else if (btnKey == "close") {
        modal.style.display = "none";
    }
})

// sheach option creation 
getTag("sheach-field").addEventListener("keyup", (event) => {
    const sheachText = event.target.value;
    const tasks = document.getElementsByClassName("single-task");
    for (const task of tasks) {
    const text = task.firstElementChild.innerText;
    if (text.includes(sheachText)) {
        task.style.display = "block";
    } else {
        task.style.display = "none";
    }
}
});


// task creating function 
function createTask(text) {
    const div = document.createElement('div');
    div.className ="col p-0 m-0 single-task text-white rounded";
    const p = document.createElement('p');
    p.className = 'px-4 pt-4 pb-2 task-text'
    p.innerText = text;
    div.appendChild(p);

    const controlDiv = document.createElement('div');
    controlDiv.className = "d-flex  control-div justify-content-between";
    const btn = document.createElement('button');
    btn.innerText = 'Done';
    btn.setAttribute("data-button", "done");
    btn.className = "btn btn-primary";

    controlDiv.appendChild(btn);

    const red = document.createElement('span');
    red.className = 'bg-danger color-span rounded-circle'
    red.setAttribute('data-color', '#ff4e50');
    red.setAttribute('data-button', 'color');
    controlDiv.appendChild(red);

    const green = document.createElement('span');
    green.className = 'bg-success color-span rounded-circle'
    green.setAttribute("data-color", "#318500");
    green.setAttribute("data-button", "color");
    controlDiv.appendChild(green);

    const primary = document.createElement('span');
    primary.className = 'bg-primary color-span rounded-circle'
    primary.setAttribute("data-color", "#288ba8");
    primary.setAttribute("data-button", "color");
    controlDiv.appendChild(primary);

    const info = document.createElement('span');
    info.className = 'bg-info color-span rounded-circle'
    info.setAttribute("data-color", "#355C7D");
    info.setAttribute("data-button", "color");
    controlDiv.appendChild(info);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "btn btn-primary";
    editBtn.setAttribute("data-button", "edit");
    controlDiv.appendChild(editBtn);
    div.appendChild(controlDiv)
    return div;
}

// update total counter functionn 
function updateCounter() {
    const totalTask = taskParent.childElementCount;
    getTag("total-task-2").innerText = totalTask;
    getTag("total-task").innerText = totalTask;
    const undone = totalTask - completed;
    getTag("undone-task-2").innerText = undone;
    getTag("undone-task").innerText = undone;
}