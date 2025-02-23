const myLibrary = [];
const libraryNode = document.querySelector("#library");
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
  display(index) {
    return `<div data-index=${index} class="book card"><button class="delete"></button><h3>${this.title}</h3><h4>${this.author}</h4><p>${this.pages} pages</p><button class="toggle-read">${this.isRead ? "Already read" : "Not read yet"}</button></div>`;
  }
  toggleRead() {
    this.isRead = !this.isRead;
  }
}

function deleteBook(ev) {
  if (!ev.target.classList.contains("delete")) return;
  myLibrary.splice(ev.target.parentNode.getAttribute("data-index"), 1);
  displayBooks();
}
function toggleRead(ev) {
  if (!ev.target.classList.contains("toggle-read")) return;
  myLibrary[ev.target.parentNode.getAttribute("data-index")].toggleRead();
  displayBooks();
}
function addBook(ev) {
  ev.preventDefault();
  const inputValues = [...ev.target.querySelectorAll("input")].map((el) => {
    if (el.type === "checkbox") return el.checked;
    return el.value;
  });
  myLibrary.push(new Book(...inputValues));
  displayBooks();
}

document.querySelector("form").addEventListener("submit", addBook);
document.querySelector(".container").addEventListener("click", deleteBook);
document.querySelector(".container").addEventListener("click", toggleRead);
function displayBooks() {
  libraryNode.innerHTML = "";
  myLibrary.forEach((book, index) => {
    libraryNode.innerHTML += book.display(index);
  });
}
(function () {
  myLibrary.push(new Book("Kolobok", "Tikhoblazhenko Alena", 52, true));
  myLibrary.push(new Book("Memuary Brezhneva", "Brezhneva Alena", 4269, true));
  myLibrary.push(new Book("моя боротьба", "Biletskaja Alena", 1488, true));
  myLibrary.push(
    new Book("Seks s Garikom Potterom", "Dontsova Alena", 69420, true),
  );
  displayBooks();
})();
