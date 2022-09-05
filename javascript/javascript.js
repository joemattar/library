let myLibrary = [
    {
        id: 1,
        title: "Foundation",
        author: "Isaac Asimov",
        pages: 255,
        language: "english",
        yearPublished: 1951,
        readStatus: true,
    },
    {
        id: 2,
        title: "Foundation and Empire",
        author: "Isaac Asimov",
        pages: 247,
        language: "english",
        yearPublished: 1952,
        readStatus: true,
    },
    {
        id: 3,
        title: "Second Foundation",
        author: "Isaac Asimov",
        pages: 210,
        language: "english",
        yearPublished: 1953,
        readStatus: false,
    },
];

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




// TO ELABORATE
function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary() {

}

// Write a function that loops through the array and displays each book on the page.
// You can display them in some sort of table, or each on their own “card”.
// It might help for now to manually add a few books to your array so you can see the display.
function displayBooks() {

}


// Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book:
// author, title, number of pages, whether it’s been read and anything else you might want.


// Add a button on each book’s display to remove the book from the library.
    // You will need to associate your DOM elements with the actual book objects in some way.
    // One easy solution is giving them a data-attribute that corresponds to the index of the library array.


// Add a button on each book’s display to change its read status.
    // To facilitate this you will want to create the function that
    // toggles a book’s read status on your Book prototype instance.





newBook = new Book("I, Robot", "Isaac Asimov", 34, "english", 1948)

console.log(newBook);

addBookToLibrary(newBook);

console.log(myLibrary)