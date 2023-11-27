const myLibrary = [];
const newBookButton = document.querySelector(".new-book-btn");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-button");
const form = document.querySelector("#form");
const cards = document.querySelector(".main");
const readButtons = document.querySelectorAll("#readButton");
let id = 0;

function Book(title, author, pages, isRead, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = id;
}

Book.prototype.toggleRead = function (readButton) {
  if (this.isRead) {
    this.isRead = false;
    readButton.textContent = "NOT READ";
    readButton.classList.remove("read-btn");
    readButton.classList.add("not-read-btn");
  } else {
    this.isRead = true;
    readButton.textContent = "READ";
    readButton.classList.add("read-btn");
    readButton.classList.remove("not-read-btn");
  }
};

function updateLibrary() {
  const main = document.querySelector(".main");

  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }

  for (let book of myLibrary) {
    const card = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("h3");
    const pages = document.createElement("h3");
    const read = document.createElement("button");
    const remove = document.createElement("button");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    remove.textContent = "REMOVE";
    if (book.isRead) {
      read.textContent = "READ";
      read.classList.add("read-btn");
      read.setAttribute("id", "readButton");
      read.addEventListener("click", () => {
        book.toggleRead(read);
      });
    } else {
      read.textContent = "NOT READ";
      read.classList.add("not-read-btn");
      read.setAttribute("id", "readButton");
      read.addEventListener("click", () => {
        book.toggleRead(read);
      });
    }

    card.classList.add("card");
    card.setAttribute("data-attribute", id);

    remove.classList.add("remove-btn");
    remove.setAttribute("id", "removeButton");
    remove.addEventListener("click", () => {
      card.remove();
      const indexToDelete = myLibrary.findIndex((book) => {
        book.id === card.getAttribute("data-attribute");
      });
      myLibrary.splice(indexToDelete, 1);
    });

    cards.appendChild(card);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(remove);
  }
}

function addCard(book) {
  myLibrary.push(book);
  id++;
  updateLibrary();
}

newBookButton.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title-book").value;
  const author = document.querySelector("#author-book").value;
  const pages = document.querySelector("#pages-book").value;
  const isRead = document.querySelector("#read-book").checked;
  const book = new Book(title, author, pages, isRead, id);
  addCard(book);

  document.querySelector("#title-book").value = "";
  document.querySelector("#author-book").value = "";
  document.querySelector("#pages-book").value = "";
  document.querySelector("#read-book").checked = false;
  modal.close();
});
