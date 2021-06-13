const taskForm = document.querySelector(".taskForm");
const taskInput = document.querySelector(".taskInput");
const pendingList = document.querySelector(".pendingList");
const finishedList = document.querySelector(".finishedList");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pending = [];
let finished = [];
let newId = 0; // prevent duplication

function toFinish(event) {
    const finish = event.path[1].childNodes[2].innerHTML;
    deletePending(event);
    paintFinished(finish);
}

function toPending(event) {
    const pending = event.path[1].childNodes[2].innerHTML;
    deleteFinished(event);
    paintPending(pending);
}

function deletePending(event) {
    const btn = event.target;
    const td = btn.parentNode;
    const tr = td.parentNode;
    pendingList.removeChild(tr);

    const cleanPending = pending.filter(function(pending) {
        return pending.id !== parseInt(tr.id);
    });
    
    pending = cleanPending;
    savePending();
}

function deleteFinished(event) {
    const btn = event.target;
    const td = btn.parentNode;
    const tr = td.parentNode;
    finishedList.removeChild(tr);

    const cleanFinished = finished.filter(function(finished) {
        return finished.id !== parseInt(tr.id);
    });
    
    finished = cleanFinished;
    saveFinished();
}

function savePending() {
    localStorage.setItem(PENDING, JSON.stringify(pending));
}

function saveFinished() {
    localStorage.setItem(FINISHED, JSON.stringify(finished));
}

function paintPending(text) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const finishBtn = document.createElement("button");
    newId += 1;

    delBtn.classList.add("btn");
    delBtn.classList.add("btn-danger");
    delBtn.classList.add("btn-sm");
    delBtn.style.float = "right";
    delBtn.innerHTML = "delete";
    delBtn.addEventListener("click", deletePending);

    finishBtn.classList.add("btn");
    finishBtn.classList.add("btn-success");
    finishBtn.classList.add("btn-sm");
    finishBtn.style.float = "right";
    finishBtn.innerHTML = "finish";
    finishBtn.addEventListener("click", toFinish);

    span.innerText = text;
    td.classList.add("table-info");
    td.appendChild(finishBtn);
    td.appendChild(delBtn);
    td.appendChild(span);
    tr.appendChild(td);
    pendingList.appendChild(tr);
    tr.id = newId;

    const pendingObj = {
        text: text,
        id: newId
    }
    pending.push(pendingObj);
    savePending();
}

function paintFinished(text) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const returnBtn = document.createElement("button");
    newId += 1;

    delBtn.classList.add("btn");
    delBtn.classList.add("btn-danger");
    delBtn.classList.add("btn-sm");
    delBtn.style.float = "right";
    delBtn.innerHTML = "delete";
    delBtn.addEventListener("click", deleteFinished);

    returnBtn.classList.add("btn");
    returnBtn.classList.add("btn-warning");
    returnBtn.classList.add("btn-sm");
    returnBtn.style.float = "right";
    returnBtn.innerHTML = "return";
    returnBtn.addEventListener("click", toPending);

    span.innerText = text;
    td.classList.add("table-success");
    td.appendChild(returnBtn);
    td.appendChild(delBtn);
    td.appendChild(span);
    tr.appendChild(td);
    finishedList.appendChild(tr);
    tr.id = newId;

    const finishedObj = {
        text: text,
        id: newId
    }
    finished.push(finishedObj);
    saveFinished();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = taskInput.value;
    paintPending(currentValue);
    taskInput.value = "";
}

function loadPending() {
    const loadedPending = localStorage.getItem(PENDING);
    if(loadedPending !== null) {
        const parsedPending = JSON.parse(loadedPending);
        parsedPending.forEach(function(pending) {
            paintPending(pending.text);
        });
    }
}

function loadFinished() {
    const loadedFinished = localStorage.getItem(FINISHED);
    if(loadedFinished !== null) {
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(function(finished) {
            paintFinished(finished.text);
        });
    }
}

function init() {
    loadPending();
    loadFinished();
    taskForm.addEventListener("submit", handleSubmit);
}

init();