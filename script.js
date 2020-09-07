const form = document.querySelector('form');
const cardSection = document.querySelector('.card-section');
const container = document.querySelector('.container');
const newBook = document.querySelector('.new-book');
const myLibrary = [];

function Book(author, title, pages, image, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.image = image;
  this.read = read;
}
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary(e);
  updateCardsSection();
  form.reset();
  form.classList.toggle('hidden');
  container.classList.toggle('hidden');
});

newBook.addEventListener('click', () => {
  form.classList.toggle('hidden');
  container.classList.toggle('hidden');
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
}

function updateCardsSection() {
  cardSection.innerHTML = '';
  myLibrary.forEach((el, i) => {
    let card = document.createElement('div');
    card.classList.add('book-card');
    
    if (el.image) {
      card.innerHTML += `<div class="book-image">
                          <img src="${el.image}" alt="">
                        </div>`;
    }
    card.innerHTML += `<div class="book-information">
                          <div class="information-section">
                              <p class="information">Author:</p>
                              <p class="author">${el.author}</p>
                          </div>
                          <div class="information-section">
                              <p class="information">Title:</p>
                              <p class="title">${el.title}</p>
                          </div>`;
    if (el.pages) {
      card.querySelector('.book-information').innerHTML += `<div class="information-section">
                              <p class="information">Length:</p>
                              <p class="length">${el.pages}</p>
                          </div>`;
    }

    card.querySelector('.book-information').innerHTML += `<div class="information-section">
                              <p class="information">Read:</p>
                              <p class="length">${el.read ? 'Yes' : 'No'}</p>
                          </div>
                      </div>
                      <div class="book-card-bottom">
                          <button class="remove-book" data-cardid="${i}">Delete</button>
                          <button class="mark-read" data-cardid="${i}">Mark as read</button>
                      </div>`;

    cardSection.appendChild(card);
    card.querySelector('.remove-book').addEventListener('click', deleteBook);
    card.querySelector('.mark-read').addEventListener('click', markAsRead);
  });
}

function markAsRead(e) {
  myLibrary[e.target.dataset.cardid].toggleRead();
  updateCardsSection();
}

function deleteBook(e) {
  myLibrary.splice(e.target.dataset.cardid, 1);
  updateCardsSection();
}
