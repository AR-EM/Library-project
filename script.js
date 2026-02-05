const newCard = document.querySelector(".newbtn button");
const dialog = document.querySelector("dialog");
const closeDia = document.querySelector(".dialog-container .X");
const subBtn = document.querySelector(".dialog-container #submitbtn");
const addBookForm = document.querySelector(".add-Book-Form");
const cardContainer = document.querySelector(".cards-container");

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

Book.prototype.toggleRead = function(){
  this.read = !this.read;
}

function addBookToLibrary(author, title, pages, read) {
  myLibrary.push(new Book(author, title, pages, read));
}

function display() {
  for (const book of myLibrary) {
    let alreadyDisplayed = false;
    for (const identity of displayed) {
      if (book.ID == identity) {
        alreadyDisplayed = true;
      }
    }
    if (!alreadyDisplayed) {
      const card = document.querySelector(".card");
      const htmlBlock = `
            <div class="card" data-id="${book.ID}">
              <div class="card-description">
                <h1>${book.title}</h1>
                <h3>${book.author}</h3>
                <h3>${book.pages} pages</h3>
                <h2 class="read-status">${book.read ? "Read" : "Unread"}</h2>
              </div>
              <div class="card-buttons">
                <button class="card-read-button">Toggle Read</button>
                <button class="card-remove-button">Remove</button>
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

cardContainer.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (!card) return;

  const bookID = card.dataset.id;

  if (event.target.classList.contains("card-remove-button")) {
    const index = myLibrary.findIndex(book => book.ID === bookID);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      displayed.splice(displayed.indexOf(bookID), 1);
    }
    card.remove();
  }

  if (event.target.classList.contains("card-read-button")) {
    const book = myLibrary.find(book => book.ID === bookID);
    if (!book) return;

    book.toggleRead();
    const readText = card.querySelector(".read-status");
    readText.textContent = book.read ? "Read" : "Unread";
  }
});