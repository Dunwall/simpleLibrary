document.addEventListener("DOMContentLoaded",function(){
    const library = [];
    // DOM elements
    const container = document.querySelector("#cardContainer");
    const form = document.querySelector("#inputForm");
    const titleInput = document.querySelector("#title");
    const authorInput = document.querySelector("#author");
    const pagesInput = document.querySelector("#title");
    const readInput = document.querySelector("#readStatus");
    var counter = 3;
    // BUTTON FOR REMOVING BOOKS
    // const delBtn = document.createElement("button");
    // delBtn.innerHTML = "Delete";

    // CONSTRUCTOR FOR CREATING BOOK OBJECTS
    function Book(title, author, pages, readStatus){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = readStatus;
        this.id = crypto.randomUUID();
    }

    // FUNCTION TO ADD OBJECTS TO LIBRARY
    function addBookToLibrary(title,author,pages,readStatus){
        const book = new Book(title,author,pages,readStatus)
        library.push(book);
    }

    // DEFAULT BOOKS ADDED
    addBookToLibrary('Watchmen','Alan Moore',420,'Yes');
    addBookToLibrary('Whatever Happened to the Man of Tomorrow?','Alan Moore',420,'Yes');
    addBookToLibrary('Saga of the Swamp Thing','Alan Moore',420,'Yes');


    // FUNCTION TO DELETE BOOK OBJECT FROM THE ARRAY
    function deleteBook(card){
        let cardId = card.dataset.id;
        for(const book of library){
            if(cardId === book.id){
                console.log(book.id);
                const index = library.indexOf(book);
                if(index>-1){
                    library.splice(index,1);
                }
            }
        }
    }

    // DISPLAY BOOKS TO THE DOCUMENT
    function displayBooksToPage(book){
        // BUTTON FOR REMOVING BOOKS
        const delBtn = document.createElement("button");
        delBtn.innerHTML = "Delete";
        delBtn.classList.add("button");

        const card = document.createElement('div');        

        const title = document.createElement('h3');
        title.textContent = `${book.title}`;

        // const author = document.createElement('h3');
        // author.textContent = 'Author';

        const authorValue = document.createElement('p');
        authorValue.textContent = `By ${book.author}`;

        const pages = document.createElement('h3');
        pages.textContent = 'Pages';

        const pagesValue = document.createElement('p');
        pagesValue.textContent = `${book.pages}`;

        const readStatus = document.createElement('h3');
        readStatus.textContent = 'Read Yet';

        const readValue = document.createElement('p');
        readValue.textContent = `${book.read}`;

        card.append(title);
        // card.append(author);
        card.append(authorValue);
        card.append(pages);
        card.append(pagesValue);
        card.append(readStatus);
        card.append(readValue);
        card.classList.add('insideCardContainer');

        container.append(card);
        card.append(delBtn);

        card.setAttribute('data-id',book.id);
        delBtn.addEventListener("click",(e)=>{
            deleteBook(card);

            // DISPLAYING AFTER DELETING BOOK
            library.forEach(displayBooksToPage);
        })
    }
    // DISPLAYING AFTER DEFAULT BOOKS
    library.forEach(displayBooksToPage);
  
    
    // EVENT LISTENER FOR WHEN FORM IS SUBMITTED
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let title = titleInput.value;
        let author = authorInput.value;
        let pages = pagesInput.value;
        let readStat = readInput.value;
        addBookToLibrary(title,author,pages,readStat);
        form.reset();

        // DISPLAYING AFTER ADDING A BOOK
        for(let i=counter;i<library.length;i++){
            displayBooksToPage(library[i]);
        }
        counter+=1;
    })
})