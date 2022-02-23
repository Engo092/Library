let addButton = document.querySelector(".addBook");
let dark = document.querySelector(".darkened");
let myLibrary = [];
let idNum;

if (localStorage.getItem("myLibrary") === null || localStorage.getItem("myLibrary").length == 0) {
    idNum = 0;
    localStorage.setItem("idNum", JSON.stringify(idNum));
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

myLibrary = JSON.parse(localStorage.getItem("myLibrary") || "[]");
idNum = parseInt(localStorage.getItem("idNum"));


// Following code is to load all books in the page HTML
for (let i = 0; i < myLibrary.length; i++) {
    let book = document.createElement("div");
    book.classList.add("book");
    book.setAttribute("id", myLibrary[i].id);

    let pageNum = document.createElement("div");
    pageNum.classList.add("pageNum");
    pageNum.innerText = myLibrary[i].pages;

    let bookTitle = document.createElement("div");
    bookTitle.classList.add("bookTitle");
    bookTitle.innerText = myLibrary[i].title;

    let writer = document.createElement("div");
    writer.classList.add("author");
    writer.innerText = myLibrary[i].author;

    let buttonRead = document.createElement("button");
    buttonRead.setAttribute("id", myLibrary[i].id);

    if (myLibrary[i].read == true) {
        buttonRead.classList.add("read");
        buttonRead.innerText = "Read";
    }
    else{
        buttonRead.classList.add("noRead");
        buttonRead.innerText = "Not Read";
    }
    
    let removeButton = document.createElement("button");
    removeButton.setAttribute("id", myLibrary[i].id);
    removeButton.classList.add("remove");
    removeButton.innerText = "Remove";
    
    book.appendChild(pageNum);
    book.appendChild(bookTitle);
    book.appendChild(writer);
    book.appendChild(buttonRead);
    book.appendChild(removeButton);
    document.querySelector(".books").appendChild(book);
}

// Deals with book submission
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    addBookToLibrary();
    idNum++;
    localStorage.setItem("idNum", JSON.stringify(idNum));
    window.location.reload();
});

// Brings form to page
addButton.addEventListener('click', function() {
    let body = document.querySelector("body");
    let form = document.querySelector(".form");

    form.classList.remove("noDisplay");
    body.classList.add("noScroll");
    dark.style.display = "inline";

    let cancel = document.querySelector(".cancel");
    cancel.addEventListener('click', function() {
        form.classList.add("noDisplay");
        body.classList.remove("noScroll");
        dark.style.display = "none";
    });
});


// Removes books
let remove = document.querySelectorAll(".remove");
for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener("click", function() {
        for (let j = 0; j < myLibrary.length; j++) {
            if (myLibrary[j].id == remove[i].id) {
                myLibrary.splice(j, 1);
                localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
                window.location.reload();
            }
        }
        
    });
}


// Toogles between having read a book or not
let readButton = document.querySelectorAll(".read, .noRead");
for (let i = 0; i < readButton.length; i++) {
    readButton[i].addEventListener('click', function() {
        let readOrNot = this.className;
    
        if (readOrNot == "read") {
            readButton[i].classList.remove("read");
            readButton[i].classList.add("noRead");
            readButton[i].innerHTML = "Not Read";
            for (let j = 0; j < myLibrary.length; j++) {
                if (myLibrary[j].id == readButton[i].id) {
                    myLibrary[j].read = false;
                    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
                }
            }
        }
        else {
            readButton[i].classList.remove("noRead");
            readButton[i].classList.add("read");
            readButton[i].innerHTML = "Read";
            for (let j = 0; j < myLibrary.length; j++) {
                if (myLibrary[j].id == readButton[i].id) {
                    myLibrary[j].read = true;
                    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
                }
            }
        }
    });
}

const pageCountInput = document.getElementById('pageCount');
pageCountInput.addEventListener('input', () => {
    pageCountInput.setCustomValidity('');
    if (!document.getElementById('pageCount').checkValidity()) {
        pageCountInput.setCustomValidity('Please enter a number above 0');
    }
});

// Following code is a very simple form validation
const bookName = document.getElementById('bookName');
bookName.addEventListener('input', () => {
    bookName.setCustomValidity('');
    if (bookName.value === '') {
        bookName.setCustomValidity('Please enter a title');
    }
});

const bookAuthor = document.getElementById('bookAuthor');
bookAuthor.addEventListener('input', () => {
    bookAuthor.setCustomValidity('');
    if (bookAuthor.value === '') {
        bookAuthor.setCustomValidity('Please enter an author');
    }
});



class Book {
    constructor(title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }
}



function addBookToLibrary() {
    let title = document.getElementById("bookName").value;
    let author = document.getElementById("bookAuthor").value;
    let pages = document.getElementById("pageCount").value;
    let read;
    if (document.getElementById("hasItBeenRead").checked) {
        read = true;
    }
    else {
        read = false;
    }
    let newBook = new Book(title, author, pages, read, idNum);
    myLibrary.push(newBook);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}