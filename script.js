const form = document.querySelector("form");
const cardSection = document.querySelector(".card-section");
const myLibrary = [];

function Book(author, title, pages, image, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.image = image;
  this.read = read;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary(e);
  form.reset();
  form.classList.toggle("hidden");
  cardSection.classList.toggle("hidden");
  generateBookCard();
});

function addBookToLibrary() {
  let newBook = new Book(
    form.author.value,
    form.title.value,
    form.length.value,
    form.image.value,
    form.read.checked
  );
  myLibrary.push(newBook);
  updateCardsSection();
}

function updateCardsSection() {
  myLibrary.forEach((el, i) => {
    generateBookCard(el, i);
  });
}
function generateBookCard(el) {
  let card = document.createElement("div");
  card.classList.add("book-card");
  card.innerHTML = `<div class="book-image">
                <img src="${el.image}" alt="">
            </div>
            <div class="book-information">
                <div class="information-section">
                    <p class="information">Author:</p>
                    <p class="author">${el.image}</p>
                </div>
                <div class="information-section">
                    <p class="information">Title:</p>
                    <p class="title">${el.title}</p>
                </div>
                <div class="information-section">
                    <p class="information">Length:</p>
                    <p class="length">${el.pages}</p>
                </div>
                <div class="information-section">
                    <p class="information">Read:</p>
                    <p class="length">${el.read ? "Yes" : "No"}</p>
                </div>
            </div>
            <div class="book-card-bottom">
                <button class="remove-book">Delete</button>
                <button class="mark-read">Mark as read</button>
            </div>`;
  cardSection.appendChild(card);
}
