"use strict";

if (localStorage.getItem('tasks') !== null) {
    var taskList = localStorage.getItem('tasks');
    if (taskList.length > 0) {
        taskList = JSON.parse(taskList);
    } else {
        taskList = {};
    }
} else {
    var taskList = {};
}

let getTask = function() {
    let taskText = document.querySelector('.input-text');
    return taskText.value;
}

let removeTask = function(e) {
    let removeThisTask;

    if (e.target.parentNode.className == 'task-button') {
        e = e.target.parentNode
        removeThisTask = document.getElementById(e.parentNode.id);
    } else {
        removeThisTask = document.getElementById(e.target.parentNode.id);
    }

    let tasks = document.querySelector('.task-wrapper');
    removeThisTask.className += ' animated';
    removeThisTask.className += ' fadeOutRight';
    delete taskList[removeThisTask.id];
    console.log(taskList);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    setTimeout(function() {
        tasks.removeChild(removeThisTask);
    }, 1000);
}

let createInnerTaskDiv = function(text, uniqueID) {

    let taskDiv = document.querySelector('.task-wrapper');

    let innerTaskDiv = document.createElement('div');
    innerTaskDiv.className += 'tasks';
    if (uniqueID === undefined) {
        uniqueID = Date.now();
        innerTaskDiv.id = 'tasks-' + uniqueID;
    } else {
        innerTaskDiv.id = uniqueID;
    }

    let innerTaskValue = document.createElement('div');
    innerTaskValue.className += 'task-value';
    innerTaskValue.innerHTML = text;
    let innerTaskButton = document.createElement('div');
    innerTaskButton.className += 'task-button';
    innerTaskButton.innerHTML = '<i class="fa fa-paper-plane" aria-hidden="true"></i>'; //FA

    innerTaskDiv.appendChild(innerTaskValue);
    innerTaskDiv.appendChild(innerTaskButton);
    taskDiv.appendChild(innerTaskDiv);
    innerTaskDiv.className += ' animated';
    innerTaskDiv.className += ' fadeInLeft';

    innerTaskButton.addEventListener('click', removeTask);

    return 'task-' + uniqueID;

}

let addTask = function(e) {
    let taskText = getTask();
    if (taskText.length === 0) return;
    let taskID = createInnerTaskDiv(taskText);
    taskList[taskID] = taskText;
    console.log(taskList);
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

let enterTrigger = function(e) {
    if (e.keyCode !== 13) {
        return;
    } else {
        addTask();
    }
}

let today = document.querySelector('.date');
let now = document.querySelector('.time');


 today.innerText = moment().format('LL');

 setInterval("now.innerText = moment().format('LTS')", 1000);


let addButton = document.querySelector('.input-button');
addButton.addEventListener('click', addTask);

let inputBox = document.querySelector('.input-text');
inputBox.addEventListener('keydown', enterTrigger);

// let removeButton = document.querySelector('.task-button');
// removeButton.addEventListener('click', removeTask);
// console.log(addButton);

Object.keys(taskList).map((t) => {
    createInnerTaskDiv(taskList[t], t);
});
