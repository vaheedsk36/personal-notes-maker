"use strict";
showNotes();
const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", function () {
  let addTxt = document.querySelector("#addTxt");
  let addTitle = document.querySelector("#titleTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    var notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let myObj = {
      title: addTitle.value,
      text:addTxt.value

  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";

  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    var notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="noteCard my-2 mx-2 card card-color" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title searchClass">${element.title}</h5>
                    <p class="card-text"> ${element.text}</p>
                    <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML =
      'No notes are present! Use "Add a Note" for making one.';
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    var notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

/* Searching feature once*/

let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";

        }

    })
})



// with search button active only issue is all the elements should match or else no result will be displayed

// let search = document.getElementById("searchTxt");
// search.addEventListener("input", function () {
//   let inputVal = search.value.toLowerCase();
//   let noteCards = document.getElementsByClassName("noteCard");
//   Array.from(noteCards).forEach(function (element) {
//     let cardTxt = element.getElementsByTagName("p")[0].innerText;
//     const searchButton = document.getElementById("search-btn");
//     searchButton.addEventListener("click", function () {
//       if (cardTxt.includes(inputVal)) {
//         element.style.display = "block";
//       } else {
//         element.style.display = "none";
//       }
//     });
//   });
// });
