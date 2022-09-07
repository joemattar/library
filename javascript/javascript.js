let cardDivs = []

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
    let bookClass = checkboxElement.classList[0]; //book-3
    let bookId = Number(bookClass.substring(5)); // 3
    
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


// TO ELABORATE
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// TO ELABORATE
function removeBookFromLibrary() {

}

function displayBooks() {
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


// Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book:
// author, title, number of pages, whether it’s been read and anything else you might want.


// Add a button on each book’s display to remove the book from the library.
    // You will need to associate your DOM elements with the actual book objects in some way.
    // One easy solution is giving them a data-attribute that corresponds to the index of the library array.


// Add a button on each book’s display to change its read status.
    // To facilitate this you will want to create the function that
    // toggles a book’s read status on your Book prototype instance.

const mainDiv = document.querySelector(".main");







newBook = new Book("I, Robot", "Isaac Asimov", 34, "english", 1948)

addBookToLibrary(newBook);

console.log(myLibrary);

displayBooks();
