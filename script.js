const newCard = document.querySelector(".newbtn button");
const dialog = document.querySelector("dialog");
const closeDia = document.querySelector(".dialog-container .X");
const subBtn = document.querySelector(".dialog-container #submitbtn");
const addBookForm = document.querySelector(".add-Book-Form");

const myLibrary = [];
const displayed = [];

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
  const cardContainer = document.querySelector(".cards-container");
  // const card = document.querySelector(".card");
  // const clone = card.cloneNode(true)
  // cardContainer.appendChild(clone)

  for (const book of myLibrary) {
    let alreadyDisplayed = false;
    for (const identity of displayed) {
      if (book.ID == identity) {
        alreadyDisplayed = true;
      }
    }
    if (!alreadyDisplayed) {
      const card = document.querySelector(".card");
      const htmlBlock = `<div class="card">
          <div class="card-description">
            <h1 id="Title">${book.title}</h1>
            <h3 id="Author">${book.author}</h3>
            <h3 id="Pages">${book.pages}</h3>
            <h2 id="Read">Read</h2>
          </div>
          <div class="card-buttons">
            <button id="card-red-button">Read</button>
            <button id="card-remove-button">Remove</button>
          </div>          
        </div>`;
      displayed.push(book.ID);
      cardContainer.innerHTML += htmlBlock;
      alreadyDisplayed = true;
    }
  }
}

newCard.addEventListener("click", (event) => {
  dialog.showModal();
});
closeDia.addEventListener("click", (event) => {
  dialog.close();
});

addBookForm.addEventListener("submit", (event) => {
  const authorName = document.querySelector("#author").value;
  const bookName = document.querySelector("#title").value;
  const noOfPages = document.querySelector("#pages").value;
  const completed = document.querySelector("#read").checked;

  event.preventDefault();
  addBookToLibrary(authorName, bookName, noOfPages, completed);
  display();
  addBookForm.reset();
  dialog.close();
});
