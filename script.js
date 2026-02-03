const newCard = document.querySelector(".newbtn button");
const dialog = document.querySelector("dialog");
const closeDia = document.querySelector(".dialog-container .X");
const subBtn = document.querySelector(".dialog-container #submitbtn");
const addBookForm = document.querySelector(".add-Book-Form")


const authorName = document.querySelector("#author");
const bookName = document.querySelector("#title");
const noOfPages = document.querySelector("#pages");
const read = document.querySelector("#read");

const myLibrary = [];

function Book(author, title, pages, read) {
  if (!new.target) {
    throw Error("You must use 'new' operator to call the constructor.");
  }
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.ID = crypto.randomUUID();
}

function addBookToLibrary(author, title, pages, read) {
  myLibrary.push(new Book(author, title, pages, read));
}

function display() {
  console.log(myLibrary);
}

newCard.addEventListener("click", (event) => {
  dialog.showModal();
});
closeDia.addEventListener("click", (event) => {
  dialog.close();
});

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const author = authorName.value;
  const title = bookName.value;
  const pages = noOfPages.value;
  const completed = read.checked;
  addBookToLibrary(author, title, pages, completed);
  display();
  addBookForm.reset();  
  dialog.close();
});
