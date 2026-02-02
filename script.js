document.querySelector

//, title, number of pages, whether it’s been read and anything else you might want
const myLibrary = []

function Book(author, title, pages){
    if (!new.target){
        throw Error("You must use 'new' operator to call the constructor.")
    }
    this.author = author
    this.title = title
    this.pages = pages
    this.ID = crypto.randomUUID()
}

function addBookToLibrary(author, title, pages){
    myLibrary.push(new Book(author, title, pages))
}

function display(){
    
}