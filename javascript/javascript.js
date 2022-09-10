const mainDiv = document.querySelector(".main");
let cardDivs = [];

const addBookButton = document.getElementById("add-book-button");

const modal = document.getElementById("add-book-modal");
const bookTitleInput = document.getElementById("book-title");
const bookAuthorInput = document.getElementById("book-author");
const bookPagesInput = document.getElementById("book-pages");
const bookLanguageInput = document.getElementById("book-language");
const bookYearInput = document.getElementById("book-year");
const bookReadInput = document.getElementById("book-read");
const bookInputs = document.querySelectorAll(".modal-content input");
const addBookCancelButton = document.getElementById("add-book-cancel");
const addBookSubmitButton = document.getElementById("add-book-submit");


// Would a myLibrary object with keys = book_ids be more efficient than myLibrary array?
let myLibrary = [
    {
        id: 1,
        title: "Foundation",
        author: "Isaac Asimov",
        pages: 255,
        language: "English",
        yearPublished: 1951,
        readStatus: true,
    },
    {
        id: 2,
        title: "Foundation and Empire",
        author: "Isaac Asimov",
        pages: 247,
        language: "English",
        yearPublished: 1952,
        readStatus: true,
    },
    {
        id: 3,
        title: "Second Foundation",
        author: "Isaac Asimov",
        pages: 210,
        language: "English",
        yearPublished: 1953,
        readStatus: false,
    },
];

// Constructor function for Book() object
function Book(title, author, pages, language, yearPublished, readStatus) {
    this.id = generateBookId();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.language = language;
    this.yearPublished = yearPublished;
    
    if (readStatus) {
        this.readStatus = readStatus;
    } else {
        this.readStatus = false;
    }
}

// Function to automatically generate a new book ID based on myLibrary contents
function generateBookId() {
    let maxId = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i]["id"] > maxId) {
            maxId = myLibrary[i]["id"];
        }
    }
    maxId += 1;
    return maxId
}

// Function to toggle read status of myLibrary books and of card divs
function toggleBookReadStatus(checkboxElement) {
    let bookClass = checkboxElement.classList[0]; //example: "book-3"
    let bookId = Number(bookClass.substring(5)); //example: 3
    
    for (let card of cardDivs) {
        if (card.classList[0] === bookClass && checkboxElement.checked) {
            card.classList.add("book-read");
            for (let book of myLibrary) {
                if (book["id"] === bookId) {
                    book["readStatus"] = true;
                }
            }
        } else if (card.classList[0] === bookClass && !checkboxElement.checked) {
            card.classList.remove("book-read");
            for (let book of myLibrary) {
                if (book["id"] === bookId) {
                    book["readStatus"] = false;
                }
            }
        }
    }
}

// Function to create a new book object and append it to the myLibrary array
function addBookToLibrary() {
    let title = bookTitleInput.textContent;
    let author = bookAuthorInput.textContent;
    let pages = bookPagesInput.textContent;
    let language = bookLanguageInput.textContent;
    let year = bookYearInput.textContent;
    let read = bookReadInput.checked;
    
    let newBook = new Book(title, author, pages, language, year, read)

    myLibrary.push(newBook);
}

// Function to delete a book card div and corresponding myLibrary array element 
function removeBookFromLibrary(closeButtonDiv) {
    let bookClass = closeButtonDiv.classList[0]; //example: "book-3"
    let bookId = Number(bookClass.substring(5)); //example: 3
    let bookIndex;
    let bookCard;

    for (let card of cardDivs) {
        if (card.classList[0] === bookClass) {
            bookCard = card;
            for (let book of myLibrary) {
                if (book["id"] === bookId) {
                    bookIndex = myLibrary.indexOf(book);
                }
            }
        }
    }
    if (confirm(`Are you sure you want to delete this book? (${myLibrary[bookIndex]["title"]} by ${myLibrary[bookIndex]["author"]})`)) {
        mainDiv.removeChild(bookCard);
        myLibrary.splice(bookIndex, 1);
    }
}

function displayBooks() {
    mainDiv.textContent = "";

    for (let i = 0; i < myLibrary.length; i++) {
        let newCardDiv = document.createElement("div");
        newCardDiv.classList.add(`book-${myLibrary[i]["id"]}`);
        newCardDiv.classList.add("card");
        if (myLibrary[i]["readStatus"]) {
            newCardDiv.classList.add("book-read");
        }

        let newCloseButtonDiv = document.createElement("div");
        newCloseButtonDiv.classList.add(`book-${myLibrary[i]["id"]}`);
        newCloseButtonDiv.classList.add("close");
        newCardDiv.appendChild(newCloseButtonDiv);

        newCloseButtonDiv.addEventListener("click", function () {
            removeBookFromLibrary(this);
        })

        let newImg = document.createElement("img");
        newImg.src = "./images/close_button.png";
        newCloseButtonDiv.appendChild(newImg);

        let newTitleDiv = document.createElement("div");
        newTitleDiv.classList.add("title");
        newTitleDiv.textContent = `${myLibrary[i]["title"]}`;
        newCardDiv.appendChild(newTitleDiv);

        let newAuthorDiv = document.createElement("div");
        newAuthorDiv.classList.add("author");
        newAuthorDiv.textContent = `by: ${myLibrary[i]["author"]}`;
        newCardDiv.appendChild(newAuthorDiv);

        let newPagesDiv = document.createElement("div");
        newPagesDiv.classList.add("pages");
        newPagesDiv.textContent = `Number of pages: ${myLibrary[i]["pages"]}`;
        newCardDiv.appendChild(newPagesDiv);

        let newLanguageDiv = document.createElement("div");
        newLanguageDiv.classList.add("language");
        newLanguageDiv.textContent = `Language: ${myLibrary[i]["language"]}`;
        newCardDiv.appendChild(newLanguageDiv);

        let newYearPublishedDiv = document.createElement("div");
        newYearPublishedDiv.classList.add("yearPublished");
        newYearPublishedDiv.textContent = `Year Published: ${myLibrary[i]["yearPublished"]}`;
        newCardDiv.appendChild(newYearPublishedDiv);

        let newReadStatusDiv = document.createElement("div");
        newCardDiv.appendChild(newReadStatusDiv);

        let newReadStatusLabel = document.createElement("label");
        newReadStatusLabel.textContent = "Read Status (checked for read):"
        newReadStatusDiv.appendChild(newReadStatusLabel);

        let newReadStatusInput = document.createElement("input");
        newReadStatusInput.type = "checkbox";
        newReadStatusInput.classList.add(`book-${myLibrary[i]["id"]}`);
        newReadStatusInput.classList.add("read-status");
        newReadStatusInput.checked = myLibrary[i]["readStatus"];
        newReadStatusDiv.appendChild(newReadStatusInput);

        newReadStatusInput.addEventListener("change", function () {
            toggleBookReadStatus(this);
        })
        
        mainDiv.appendChild(newCardDiv);
    }
    cardDivs = document.querySelectorAll("div.card");
}

// When the user clicks the add book button, open the modal 
addBookButton.addEventListener("click", function() {
    for (input of bookInputs) {
        input.value = "";
    }
    bookReadInput.checked = false;
    modal.style.display = "block";
})
  
// When the user clicks on the cancel button, close the modal
addBookCancelButton.addEventListener("click", function() {
    modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal content, close it
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
})

// When the user clicks on the submit book button, perform form validation then add book
addBookSubmitButton.addEventListener("click", function () {

    // ADD FORM VALIDATION??
    
    addBookToLibrary();
    displayBooks();
})




newBook = new Book("I, Robot", "Isaac Asimov", 34, "english", 1948)
addBookToLibrary(newBook);

console.log(myLibrary);

displayBooks();
