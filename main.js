"use strict";

// inital elements
const editButton = document.querySelectorAll(".edit");
const deleteButton = document.querySelectorAll(".X");
const listText = document.querySelectorAll(".list-text");
const itemWindow = document.querySelectorAll(".edit-item-window");
const overwriteItemButton = document.querySelectorAll(".add-item-window");
const editInputWindow = document.querySelectorAll(".edit-input-window");
const addItem = document.querySelector(".add-item");
const listItems = document.querySelector(".list-items");
const listLi = document.querySelectorAll(".to-do-list-item");
const newItemBox = document.querySelector(".last-box");
let myStorage = [];

function changeListItems() {
  const editButton = document.querySelectorAll(".edit");
  const deleteButton = document.querySelectorAll(".X");
  const editInputWindow = document.querySelectorAll(".edit-input-field");
  const listLi = document.querySelectorAll(".to-do-list-item");
  const listText = document.querySelectorAll(".list-text");
  const overwriteItemButton = document.querySelectorAll(".add-item-window");
  const itemWindow = document.querySelectorAll(".edit-item-window");
  let myStorage = [];

  for (let i = 0; i < editButton.length; i++) {
    editButton[i].addEventListener("click", function () {
      itemWindow[i].classList.remove("hidden");
      listText[i].classList.add("hidden");
    });
  }

  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", function () {
      listLi[i].classList.add("hidden");
    });
  }

  for (let i = 0; i < overwriteItemButton.length; i++) {
    overwriteItemButton[i].addEventListener("click", function () {
      itemWindow[i].classList.add("hidden");
      listText[i].classList.remove("hidden");
      if (editInputWindow[i].value == "") {
        listText[i].innerText;
      } else {
        listText[i].innerText = editInputWindow[i].value;
        myStorage.push(editInputWindow[i].value);
        console.log(myStorage);
      }
    });
  }
}
changeListItems();

addItem.addEventListener("click", addNewItem);
function addNewItem() {
  let li = document.createElement("li");
  let p = document.createElement("p");
  let editDiv = document.createElement("div");
  const input = document.createElement("input");
  let addDiv = document.createElement("div");
  const btn = document.createElement("button");
  const edit = document.createElement("button");
  const X = document.createElement("button");

  li.classList.add("to-do-list-item");
  p.classList.add("list-text");
  editDiv.classList.add("edit-item-window");
  editDiv.classList.add("hidden");
  input.classList.add("edit-input-field");
  btn.classList.add("add-item-window");
  edit.classList.add("edit");
  X.classList.add("X");

  edit.innerText = "Edit";
  p.innerText = document.querySelector(".last-box").value;
  X.innerText = "X";

  input.type = "text";
  input.placeholder = "Add a new list item";

  btn.innerHTML = "Add Item";

  editDiv.appendChild(input);
  editDiv.appendChild(btn);
  addDiv.appendChild(edit);
  addDiv.appendChild(X);

  if (p.innerText == "") {
    alert("please type in a value");
  } else {
    li.innerHTML = p.outerHTML + editDiv.outerHTML + addDiv.outerHTML;
    document.querySelector(".last-box").value = "";
    listItems.appendChild(li);
  }
  changeListItems();
}
