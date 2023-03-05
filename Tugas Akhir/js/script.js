const Books = [];
const RENDER_EVENT = 'render-Books';

function addbook() {
    const bookTitle = document.getElementById('title').value;
    const bookauthor = document.getElementById('author').value;
    const bookyear = document.getElementById('year').value;
    const bookpublication = document.getElementById('year-publication').value;

    const generatedID = generatedId();
    const bookobject = generatebookobject(generatedID, bookTitle,bookauthor, bookpublication, bookyear, false);
   
    Books.push(bookobject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generatedId(){
    return +new Date();
}

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function(event) 
    {
      event.preventDefault();
      addbook();
    });
  });

function generatebookobject(id, title, author, publication, year,isCompleted){
    return{
        id,
        title,
        author,
        publication,
        year,
        isCompleted
    }
}

document.addEventListener(RENDER_EVENT, function()
{
    console.log(Books);
});

function makeBooks(bookobject){
    const titletext =document.createElement('h1');
    titletext.innerText = bookobject.title

    const authortext = document.createElement('p');
    authortext.innerText = bookobject.author;

    const publicationtext = document.createElement('p');
    publicationtext.innerText = bookobject.publication;

    const yeartext = document.createElement('p');
    yeartext.innerText = bookobject.yeartext;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(titletext, authortext, publicationtext, yeartext);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', 'Books-${Booksobject.id}')

    if (bookobject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');
     
        undoButton.addEventListener('click', function () {
          undoTaskFromCompleted(bookobject.id);
        });
     
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');
     
        trashButton.addEventListener('click', function () {
          removeTaskFromCompleted(bookobject.id);
        });
     
        container.append(undoButton, trashButton);
      } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');
        
        checkButton.addEventListener('click', function () {
          addTaskToCompleted(bookobject.id);
        });
        
        container.append(checkButton);
      }
     
    return container;
}

function addTaskToCompleted (BooksId) {
    const BooksTarget = findBooks(BooksId);
   
    if (BooksTarget == null) return;
   
    BooksTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

function findBooks(BooksId) {
    for (const Booksitem of Books) {
      if (Booksitem.id === BooksId) {
        return Books;
      }
    }
    return null;
  }
  
document.addEventListener(RENDER_EVENT, function(){
    const uncomplete = document.getElementById('Books');
    uncomplete.innerHTML= '';

    for(const Booksitem of Books){
        const BooksElement = makeBooks(Booksitem);
        if (!Booksitem.completed){
            uncomplete.append(BooksElement);
     }
    }
})