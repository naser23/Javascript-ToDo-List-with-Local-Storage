"use strict";
// ----- global variables ----- //
const list = document.querySelector(".list-items");
const addItem = document.querySelector(".add-item");
const lastBox = document.querySelector(".last-box");

// --- setting up local storage --- //
const listArray = JSON.parse(localStorage.getItem("listItems")) || [];

// ----- Trying some dumbshit just because (displaying items from list array onto screen) ----- //
for (const [id, value] of listArray.entries()) {
  let li = createLi();

  // -- we are going to pass these in as arguments to let other functions access them -- //
  const p = createP(value);
  const inputDiv = createInputDiv(p);
  const editDiv = createEditDiv(inputDiv, p, li);

  li.appendChild(p);
  li.appendChild(inputDiv);
  li.appendChild(editDiv);
  list.appendChild(li);
  console.log(`the task at position ${id} is ${value} `);
}

// ----- Components but broken down into smaller functions ---- //
function createLi() {
  let li = document.createElement("li");
  li.classList.add("to-do-list-item");
  return li;
}

function createP(text) {
  let p = document.createElement("p");
  p.classList.add("list-text");
  p.textContent = text;
  // p.contentEditable = false;
  return p;
}

// ----- Components for editDiv (also appended together) ----- //
function createEdit(inputDiv, p) {
  let edit = document.createElement("button");
  edit.classList.add("edit");
  edit.textContent = "Edit";
  edit.onclick = () => handleEditClick(inputDiv, p);
  // console.log(input);
  return edit;
}

function createDelete(li, p) {
  let X = document.createElement("button");
  X.classList.add("X");
  X.textContent = "X";
  X.onclick = () => handleDeleteClick(li, p);
  return X;
}

function createEditDiv(inputDiv, p, li) {
  let editDiv = document.createElement("div");

  const edit = createEdit(inputDiv, p);
  const X = createDelete(li, p);
  editDiv.appendChild(edit);
  editDiv.appendChild(X);
  // console.log(li);
  return editDiv;
}

// ----- components for inputDiv (also appended together) ----- //
function createInput() {
  let input = document.createElement("input");
  input.classList.add("edit-input-field");
  input.placeholder = "Add a new list item";
  input.type = "text";
  return input;
}

function createSaveBtn(p, inputDiv, input) {
  let btn = document.createElement("button");
  btn.classList.add("add-item-window");
  btn.textContent = "Save Item";
  btn.onclick = () => handleSaveClick(p, inputDiv, input);
  // console.log(inputDiv);
  return btn;
}

function createInputDiv(p) {
  let inputDiv = document.createElement("div");
  inputDiv.classList.add("edit-item-window");
  inputDiv.classList.add("hidden");

  let input = createInput();
  let btn = createSaveBtn(p, inputDiv, input);
  inputDiv.appendChild(input);
  inputDiv.appendChild(btn);

  return inputDiv;
}

// ----- functionality for buttons ----- //

function handleEditClick(inputDiv, p) {
  inputDiv.classList.remove("hidden");
  p.classList.add("hidden");
  // input.value = p.textContent;
}

function handleSaveClick(p, inputDiv, input) {
  inputDiv.classList.add("hidden");
  p.classList.remove("hidden");
  if (input.value !== "") {
    listArray.splice(listArray.indexOf(p.textContent), 1, input.value);
    p.textContent = input.value;
    localStorage.setItem("listItems", JSON.stringify(listArray));
  }
}

function handleDeleteClick(li, p) {
  li.classList.add("hidden");
  listArray.splice(listArray.indexOf(p.textContent), 1);
  localStorage.setItem("listItems", JSON.stringify(listArray));
}

addItem.addEventListener("click", addNewItem);
function addNewItem() {
  let li = createLi();

  const p = createP(lastBox.value);
  const inputDiv = createInputDiv(p);
  const editDiv = createEditDiv(inputDiv, p, li);

  li.appendChild(p);
  li.appendChild(inputDiv);
  li.appendChild(editDiv);
  list.appendChild(li);

  if (lastBox.value !== "") {
    list.appendChild(li);
    listArray.push(lastBox.value);
    localStorage.setItem("listItems", JSON.stringify(listArray));
    lastBox.value = "";
  } else {
    alert("please type in a value!");
  }
}
